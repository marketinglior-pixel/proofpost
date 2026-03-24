"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  Copy,
  Globe,
  ImageIcon,
  Link as LinkIcon,
  Loader2,
  Palette,
  Plus,
  Sparkles,
  Star,
  Type,
  Upload,
  Wand2,
} from "lucide-react";
import { extractColorsFromImage } from "@/lib/utils/extract-colors";

const PROOFPOST_HOST = "https://proofpst.com";

const STEPS = [
  { number: 1, label: "Brand Kit" },
  { number: 2, label: "First Carousel" },
  { number: 3, label: "Embed" },
];

const EXAMPLE_REVIEW = `"We switched from HubSpot to their platform 6 months ago and it's been a game-changer. Within the first week, our sales reps were actually logging their calls and the pipeline finally reflected reality. We closed 23% more deals last quarter."
— Sarah Chen, VP Sales at TechFlow`;

interface OnboardingWizardProps {
  userId: string;
  initialStep: number;
}

export function OnboardingWizard({ userId, initialStep }: OnboardingWizardProps) {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(initialStep);

  // Step 1: Brand Kit
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [companyName, setCompanyName] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState("#2563EB");
  const [secondaryColor, setSecondaryColor] = useState("#1E293B");
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [savingBrand, setSavingBrand] = useState(false);

  // Step 2: Generate
  const [inputMode, setInputMode] = useState<"text" | "link">("text");
  const [url, setUrl] = useState("");
  const [extractingUrl, setExtractingUrl] = useState(false);
  const [rawInput, setRawInput] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerTitle, setReviewerTitle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  const [hookLine, setHookLine] = useState("");

  // Step 3: Embed
  const [copied, setCopied] = useState(false);

  // ----- Step 1 handlers -----

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

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

    const { error: uploadError } = await supabase.storage
      .from("logos")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Failed to upload logo");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("logos").getPublicUrl(filePath);

    setLogoUrl(publicUrl);
    setUploading(false);
    toast.success("Logo uploaded!");

    // Auto-extract colors
    setExtracting(true);
    try {
      const [primary, secondary] = await extractColorsFromImage(publicUrl);
      setPrimaryColor(primary);
      setSecondaryColor(secondary);
      toast.success("Colors detected from your logo!");
    } catch {
      // Keep defaults
    } finally {
      setExtracting(false);
    }
  }

  async function handleSaveBrandKit() {
    if (!companyName.trim()) {
      toast.error("Please enter your company name");
      return;
    }

    setSavingBrand(true);
    const { error } = await supabase.from("brand_kits").upsert(
      {
        user_id: userId,
        company_name: companyName.trim(),
        logo_url: logoUrl,
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        updated_at: new Date().toISOString(),
      } as never,
      { onConflict: "user_id" }
    );

    if (error) {
      toast.error("Failed to save brand kit");
      setSavingBrand(false);
      return;
    }

    toast.success("Brand kit saved!");
    setSavingBrand(false);
    setStep(2);
  }

  // ----- Step 2 handlers -----

  async function handleExtractUrl() {
    if (!url.trim()) {
      toast.error("Please paste a URL");
      return;
    }
    setExtractingUrl(true);
    try {
      const res = await fetch("/api/extract-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to extract");
        return;
      }
      setRawInput(data.reviewText || "");
      setReviewerName(data.reviewerName || "");
      setReviewerTitle(
        [data.reviewerTitle, data.reviewerCompany].filter(Boolean).join(", ")
      );
      toast.success("Post extracted!");
    } catch {
      toast.error("Failed to extract");
    } finally {
      setExtractingUrl(false);
    }
  }

  async function handleGenerate() {
    if (rawInput.trim().length < 20) {
      toast.error("Review text must be at least 20 characters");
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawInput: rawInput.trim(),
          reviewerName: reviewerName || undefined,
          reviewerTitle: reviewerTitle || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      setContentId(data.id);
      setHookLine(data.llmOutput?.hookLine || "Your Carousel");
      toast.success("Carousel generated!");
      setStep(3);
    } catch {
      toast.error("Network error");
    } finally {
      setGenerating(false);
    }
  }

  // ----- Step 3 handlers -----

  const embedCode = contentId
    ? `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${contentId}"></script>`
    : null;

  async function handleCopyCode() {
    if (!embedCode) return;
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Embed code copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center px-4">
      {/* Header */}
      <div className="w-full max-w-xl pt-8 pb-6">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-7 h-7 rounded-lg bg-emerald flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-white" aria-hidden="true" />
          </div>
          <span className="text-[14px] font-semibold text-slate-900 tracking-tight">
            ProofPost
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-2">
          {STEPS.map((s, i) => (
            <div key={s.number} className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold transition-colors duration-300 ${
                    step > s.number
                      ? "bg-emerald text-white"
                      : step === s.number
                        ? "bg-navy text-white"
                        : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {step > s.number ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    s.number
                  )}
                </div>
                <span
                  className={`text-[13px] font-medium transition-colors duration-300 ${
                    step >= s.number ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 transition-colors duration-300 ${
                    step > s.number ? "bg-emerald" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-xl">
        {/* Step 1: Brand Kit */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">
                Set up your brand
              </h1>
              <p className="text-[15px] text-slate-500 mt-1">
                Your logo and colors will appear on every carousel you create.
              </p>
            </div>

            <div className="rounded-xl bg-white border border-slate-200 p-6 space-y-6">
              {/* Company name */}
              <div className="space-y-2">
                <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                  Company Name
                </label>
                <Input
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-11 border-slate-200"
                />
              </div>

              {/* Logo */}
              <div className="space-y-3">
                <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                  Logo
                </label>
                <div className="flex items-center gap-4">
                  {logoUrl ? (
                    <div className="w-16 h-16 rounded-xl border-2 border-slate-200 overflow-hidden bg-white flex items-center justify-center p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoUrl}
                        alt="Brand logo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-slate-300" aria-hidden="true" />
                    </div>
                  )}
                  <div>
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
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? (
                        <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5 mr-1.5" />
                      )}
                      {logoUrl ? "Replace" : "Upload Logo"}
                    </Button>
                    {extracting && (
                      <p className="text-[11px] text-emerald-dark mt-1.5 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Detecting brand colors...
                      </p>
                    )}
                    {logoUrl && !extracting && (
                      <p className="text-[11px] text-emerald-dark mt-1.5 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Logo uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                    Brand Colors
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="text-[12px] text-slate-500">Primary</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-9 font-mono text-[13px] border-slate-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-[12px] text-slate-500">Secondary</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-10 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                      />
                      <Input
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="h-9 font-mono text-[13px] border-slate-200"
                      />
                    </div>
                  </div>
                </div>
                {/* Color preview */}
                <div className="flex gap-2 pt-1">
                  <div
                    className="h-8 flex-1 rounded-lg"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div
                    className="h-8 flex-1 rounded-lg"
                    style={{ backgroundColor: secondaryColor }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                Skip for now
              </button>
              <Button
                onClick={handleSaveBrandKit}
                disabled={savingBrand || !companyName.trim()}
                className="h-11 px-6 bg-emerald hover:bg-emerald-dark text-white font-medium rounded-lg shadow-none glow-emerald"
              >
                {savingBrand ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Generate Carousel */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">
                Create your first carousel
              </h1>
              <p className="text-[15px] text-slate-500 mt-1">
                Paste a customer review and we will turn it into a branded carousel.
              </p>
            </div>

            {/* Mode tabs */}
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit">
              <button
                onClick={() => setInputMode("link")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-colors duration-200 ${
                  inputMode === "link"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
                Paste Link
              </button>
              <button
                onClick={() => setInputMode("text")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-colors duration-200 ${
                  inputMode === "text"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Type className="w-3.5 h-3.5" aria-hidden="true" />
                Paste Text
              </button>
            </div>

            <div className="rounded-xl bg-white border border-slate-200 p-6 space-y-5">
              {inputMode === "link" ? (
                <div className="space-y-3">
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                    Post URL
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" aria-hidden="true" />
                      <Input
                        placeholder="https://linkedin.com/posts/..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="pl-10 h-11 border-slate-200"
                      />
                    </div>
                    <Button
                      onClick={handleExtractUrl}
                      disabled={extractingUrl || !url.trim()}
                      className="h-11 px-5 bg-navy hover:bg-navy-light text-white shadow-none"
                    >
                      {extractingUrl ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Extract"
                      )}
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Works with LinkedIn, Twitter/X, G2, Capterra, and more
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                      Review Text
                    </label>
                    <button
                      onClick={() => {
                        setRawInput(EXAMPLE_REVIEW);
                        setReviewerName("Sarah Chen");
                        setReviewerTitle("VP Sales, TechFlow");
                      }}
                      className="text-[12px] text-emerald-dark hover:text-emerald transition-colors font-medium"
                    >
                      Try an example
                    </button>
                  </div>
                  <Textarea
                    placeholder="Paste your customer review here..."
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    rows={5}
                    className="resize-none border-slate-200"
                  />
                </div>
              )}

              {/* Extracted text (shown in link mode after extraction) */}
              {inputMode === "link" && rawInput && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                    Extracted Review
                  </label>
                  <Textarea
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    rows={3}
                    className="resize-none text-[14px] border-slate-200"
                  />
                </div>
              )}

              {/* Reviewer fields */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[12px] text-slate-500">
                    Reviewer Name
                  </label>
                  <Input
                    placeholder="Sarah Chen"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="h-10 border-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] text-slate-500">
                    Title, Company
                  </label>
                  <Input
                    placeholder="VP Sales, TechFlow"
                    value={reviewerTitle}
                    onChange={(e) => setReviewerTitle(e.target.value)}
                    className="h-10 border-slate-200"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generating || rawInput.trim().length < 20}
                className="w-full h-12 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-lg shadow-none glow-emerald disabled:opacity-40"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Carousel
                  </>
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setStep(3);
                  setContentId(null);
                }}
                className="text-[13px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Embed Code */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center pt-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald/10 mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-emerald-dark" aria-hidden="true" />
              </div>
              <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">
                {contentId ? "Your carousel is ready!" : "You are all set!"}
              </h1>
              <p className="text-[15px] text-slate-500 mt-1">
                {contentId
                  ? "Copy the embed code and paste it into your website."
                  : "Head to your dashboard to start creating carousels."}
              </p>
            </div>

            {embedCode && (
              <div className="rounded-xl bg-white border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                    Embed Code
                  </span>
                  {hookLine && (
                    <span className="text-[12px] text-slate-500 truncate max-w-[200px]">
                      {hookLine}
                    </span>
                  )}
                </div>

                <div className="rounded-lg bg-navy p-4">
                  <code className="text-[12px] text-emerald-light/80 font-mono break-all leading-relaxed">
                    {embedCode}
                  </code>
                </div>

                <Button
                  onClick={handleCopyCode}
                  className="w-full h-11 bg-emerald hover:bg-emerald-dark text-white font-medium shadow-none glow-emerald"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Embed Code
                    </>
                  )}
                </Button>
              </div>
            )}

            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full h-12 bg-navy hover:bg-navy-light text-white text-[15px] font-medium rounded-lg shadow-none"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
