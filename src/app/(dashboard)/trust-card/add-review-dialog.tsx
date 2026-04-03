"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Camera,
  Loader2,
  Plus,
  Star,
  Upload,
  X,
} from "lucide-react";

interface AddReviewDialogProps {
  userId: string;
  onReviewAdded: () => void;
}

export function AddReviewDialog({ userId, onReviewAdded }: AddReviewDialogProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [reviewerName, setReviewerName] = useState("");
  const [reviewerTitle, setReviewerTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function reset() {
    setReviewerName("");
    setReviewerTitle("");
    setReviewText("");
    setRating(5);
    setImageUrl(null);
    setImagePreview(null);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to Supabase Storage
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${userId}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("review-images")
      .upload(path, file, { contentType: file.type });

    if (error) {
      toast.error("Upload failed: " + error.message);
      setImagePreview(null);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("review-images")
      .getPublicUrl(path);

    setImageUrl(publicUrl);
    setUploading(false);
  }

  async function handleSubmit() {
    if (!reviewerName.trim()) {
      toast.error("Customer name is required");
      return;
    }
    if (!reviewText.trim() && !imageUrl) {
      toast.error("Add review text or upload a screenshot");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewer_name: reviewerName,
          reviewer_title: reviewerTitle,
          review_text: reviewText || "Screenshot review",
          rating,
          image_url: imageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to add review");
        return;
      }
      toast.success("Review added!");
      reset();
      setOpen(false);
      onReviewAdded();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        <Plus className="w-4 h-4 mr-1.5" />
        Add Review Manually
      </Button>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Add Review</h3>
        <button onClick={() => { setOpen(false); reset(); }} className="p-1 hover:bg-slate-100 rounded">
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Screenshot Upload */}
      <div>
        <label className="text-xs text-slate-500 mb-1.5 block">Screenshot (optional)</label>
        {imagePreview ? (
          <div className="relative rounded-lg overflow-hidden border border-slate-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-cover" />
            <button
              onClick={() => { setImagePreview(null); setImageUrl(null); }}
              className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <X className="w-3 h-3" />
            </button>
            {uploading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-24 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
          >
            <Camera className="w-5 h-5" />
            <span className="text-xs font-medium">Upload WhatsApp screenshot, DM, or review</span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {/* Name */}
      <div>
        <label className="text-xs text-slate-500 mb-1 block">Customer name *</label>
        <Input
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          placeholder="Sarah Chen"
          maxLength={100}
        />
      </div>

      {/* Title/Role */}
      <div>
        <label className="text-xs text-slate-500 mb-1 block">Title / Company</label>
        <Input
          value={reviewerTitle}
          onChange={(e) => setReviewerTitle(e.target.value)}
          placeholder="CEO at TechFlow"
          maxLength={100}
        />
      </div>

      {/* Review text */}
      <div>
        <label className="text-xs text-slate-500 mb-1 block">Review text {imageUrl ? "(optional with screenshot)" : "*"}</label>
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="What did your customer say?"
          className="min-h-[60px] resize-none"
          maxLength={500}
        />
      </div>

      {/* Star Rating */}
      <div>
        <label className="text-xs text-slate-500 mb-1.5 block">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              onClick={() => setRating(i)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-6 h-6 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={saving || uploading || !reviewerName.trim()}
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
      >
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (
          <><Upload className="w-4 h-4 mr-1.5" /> Add to Trust Card</>
        )}
      </Button>
    </div>
  );
}
