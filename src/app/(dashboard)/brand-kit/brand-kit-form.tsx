"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Upload, Check, ImageIcon, Wand2 } from "lucide-react";
import { extractColorsFromImage } from "@/lib/utils/extract-colors";

const brandKitSchema = z.object({
  companyName: z.string().min(1, "Company name is required").max(100),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
});

type BrandKitValues = z.infer<typeof brandKitSchema>;

interface BrandKitFormProps {
  userId: string;
  initialData?: {
    companyName: string;
    logoUrl: string | null;
    primaryColor: string;
    secondaryColor: string;
  };
}

export function BrandKitForm({ userId, initialData }: BrandKitFormProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(
    initialData?.logoUrl ?? null
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [extracting, setExtracting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BrandKitValues>({
    resolver: zodResolver(brandKitSchema),
    defaultValues: {
      companyName: initialData?.companyName ?? "",
      primaryColor: initialData?.primaryColor ?? "#2563EB",
      secondaryColor: initialData?.secondaryColor ?? "#1E293B",
    },
  });

  const primaryColor = watch("primaryColor");
  const secondaryColor = watch("secondaryColor");

  async function extractColorsFromLogo(url: string) {
    setExtracting(true);
    try {
      const [primary, secondary] = await extractColorsFromImage(url);
      setValue("primaryColor", primary, { shouldValidate: true });
      setValue("secondaryColor", secondary, { shouldValidate: true });
      toast.success("Colors extracted from your logo!");
    } catch {
      toast.error("Could not extract colors from logo");
    } finally {
      setExtracting(false);
    }
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Logo must be under 2MB");
      return;
    }

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/logo.${fileExt}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Failed to upload logo: " + uploadError.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("logos").getPublicUrl(filePath);

    setLogoUrl(publicUrl);
    setUploading(false);
    toast.success("Logo uploaded!");

    // Auto-extract colors from the uploaded logo
    await extractColorsFromLogo(publicUrl);
  }

  async function onSubmit(values: BrandKitValues) {
    setSaving(true);

    const payload = {
      user_id: userId,
      company_name: values.companyName,
      logo_url: logoUrl,
      primary_color: values.primaryColor,
      secondary_color: values.secondaryColor,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("brand_kits")
      .upsert(payload as never, { onConflict: "user_id" });

    if (error) {
      toast.error("Failed to save: " + error.message);
    } else {
      toast.success("Brand Kit saved successfully!");
    }

    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Name */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Details</CardTitle>
          <CardDescription>
            Your company name appears on every carousel slide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Acme Inc."
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500">
                {errors.companyName.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Logo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Brand Logo</CardTitle>
          <CardDescription>
            Upload your logo (PNG or SVG recommended, max 2MB). Brand colors
            will be auto-detected!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            {/* Logo Preview */}
            <div className="flex-shrink-0">
              {logoUrl ? (
                <div className="w-20 h-20 rounded-xl border-2 border-slate-200 overflow-hidden bg-white flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoUrl}
                    alt="Brand logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                {logoUrl ? "Replace Logo" : "Upload Logo"}
              </Button>
              {logoUrl && (
                <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Logo uploaded
                </p>
              )}
              {extracting && (
                <p className="text-xs text-blue-600 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Detecting brand colors...
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Colors */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Brand Colors</CardTitle>
              <CardDescription>
                Auto-detected from your logo. Fine-tune if needed.
              </CardDescription>
            </div>
            {logoUrl && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => extractColorsFromLogo(logoUrl)}
                disabled={extracting}
              >
                {extracting ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5 mr-1.5" />
                )}
                Re-detect Colors
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Color */}
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) =>
                    setValue("primaryColor", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                />
                <Input
                  id="primaryColor"
                  placeholder="#2563EB"
                  className="font-mono"
                  {...register("primaryColor")}
                />
              </div>
              {errors.primaryColor && (
                <p className="text-sm text-red-500">
                  {errors.primaryColor.message}
                </p>
              )}
            </div>

            {/* Secondary Color */}
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) =>
                    setValue("secondaryColor", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                />
                <Input
                  id="secondaryColor"
                  placeholder="#1E293B"
                  className="font-mono"
                  {...register("secondaryColor")}
                />
              </div>
              {errors.secondaryColor && (
                <p className="text-sm text-red-500">
                  {errors.secondaryColor.message}
                </p>
              )}
            </div>
          </div>

          {/* Color Preview */}
          <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-white">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
              Preview
            </p>
            <div className="flex gap-3">
              <div
                className="w-full h-16 rounded-lg shadow-sm flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: primaryColor }}
              >
                Primary
              </div>
              <div
                className="w-full h-16 rounded-lg shadow-sm flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: secondaryColor }}
              >
                Secondary
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={saving}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 px-8"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Check className="w-4 h-4 mr-2" />
          )}
          {initialData ? "Update Brand Kit" : "Save Brand Kit"}
        </Button>
      </div>
    </form>
  );
}
