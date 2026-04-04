"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AddReviewDialog } from "./add-review-dialog";
import {
  ArrowUpRight,
  Camera,
  Check,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  ImagePlus,
  Loader2,
  Save,
  BarChart3,
  X,
} from "lucide-react";

const PROOFPOST_HOST = "https://proofpst.com";

const ACCENT_COLORS = [
  "#10B981", "#6366F1", "#F59E0B", "#EF4444", "#8B5CF6",
  "#EC4899", "#14B8A6", "#3B82F6", "#F97316", "#06B6D4",
];

interface TrustCard {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  portfolio: unknown;
  cta_label: string;
  cta_url: string | null;
  cta_type: string;
  accent_color: string;
  theme: string;
  is_published: boolean;
}

interface Review {
  id: string;
  reviewer_name: string;
  review_text: string;
  rating: number;
  platform: string;
  verified: boolean;
  display_on_trust_card: boolean;
  display_order: number;
}

interface TrustCardEditorProps {
  trustCard: TrustCard;
  reviews: Review[];
  viewCount: number;
}

export function TrustCardEditor({ trustCard, reviews: initialReviews, viewCount }: TrustCardEditorProps) {
  const supabase = createClient();

  const [displayName, setDisplayName] = useState(trustCard.display_name);
  const [headline, setHeadline] = useState(trustCard.headline || "");
  const [bio, setBio] = useState(trustCard.bio || "");
  const [ctaUrl, setCtaUrl] = useState(trustCard.cta_url || "");
  const [ctaLabel, setCtaLabel] = useState(trustCard.cta_label || "Book a Call");
  const [accentColor, setAccentColor] = useState(trustCard.accent_color || "#10B981");
  const [theme, setTheme] = useState(trustCard.theme || "dark");
  const [avatarUrl, setAvatarUrl] = useState(trustCard.avatar_url || "");
  const [portfolio, setPortfolio] = useState<string[]>(
    Array.isArray(trustCard.portfolio) ? (trustCard.portfolio as string[]) : []
  );
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const trustCardUrl = `${PROOFPOST_HOST}/${trustCard.username}`;

  async function uploadImage(file: File, folder: string): Promise<string | null> {
    if (!file.type.startsWith("image/")) { toast.error("Please upload an image"); return null; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB"); return null; }

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${trustCard.user_id}/${folder}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("review-images")
      .upload(path, file, { contentType: file.type });

    if (error) { toast.error("Upload failed: " + error.message); return null; }

    const { data: { publicUrl } } = supabase.storage.from("review-images").getPublicUrl(path);
    return publicUrl;
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    const url = await uploadImage(file, "avatar");
    if (url) setAvatarUrl(url);
    setUploadingAvatar(false);
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    if (portfolio.length + files.length > 5) {
      toast.error("Maximum 5 gallery photos");
      return;
    }
    setUploadingGallery(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadImage(file, "gallery");
      if (url) newUrls.push(url);
    }
    setPortfolio((prev) => [...prev, ...newUrls]);
    setUploadingGallery(false);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  }

  function removeGalleryImage(index: number) {
    setPortfolio((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("trust_cards")
        .update({
          display_name: displayName,
          headline: headline || null,
          bio: bio || null,
          avatar_url: avatarUrl || null,
          portfolio: portfolio,
          cta_url: ctaUrl || null,
          cta_label: ctaLabel || "Book a Call",
          accent_color: accentColor,
          theme,
          updated_at: new Date().toISOString(),
        })
        .eq("id", trustCard.id);

      if (error) throw error;
      toast.success("Trust Card updated!");
    } catch {
      toast.error("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleReviewVisibility(reviewId: string, currentState: boolean) {
    const { error } = await supabase
      .from("imported_reviews")
      .update({ display_on_trust_card: !currentState })
      .eq("id", reviewId);

    if (error) {
      toast.error("Failed to update review");
      return;
    }

    setReviews((prev) =>
      prev.map((r) => r.id === reviewId ? { ...r, display_on_trust_card: !currentState } : r)
    );
  }

  async function copyUrl() {
    await navigator.clipboard.writeText(trustCardUrl);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Trust Card</h1>
          <p className="text-sm text-slate-500 mt-1">Edit your public trust page</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`/${trustCard.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
          >
            <ExternalLink className="w-4 h-4" />
            Preview
          </a>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1.5" />}
            Save
          </Button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs">Page Views</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{viewCount.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            <Eye className="w-4 h-4" />
            <span className="text-xs">Reviews Shown</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {reviews.filter((r) => r.display_on_trust_card).length}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 cursor-pointer" onClick={copyUrl}>
          <div className="flex items-center gap-2 text-slate-400 mb-1">
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span className="text-xs">{copied ? "Copied!" : "Your Link"}</span>
          </div>
          <p className="text-sm font-mono text-slate-700 truncate">{trustCardUrl}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Edit form */}
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Profile</h2>

            {/* Avatar / Logo upload */}
            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Profile photo / Logo</label>
              <div className="flex items-center gap-4">
                {avatarUrl ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-slate-200" />
                    <button
                      onClick={() => setAvatarUrl("")}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                    <Camera className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={uploadingAvatar}
                    className="text-sm text-emerald-500 hover:text-emerald-600 font-medium"
                  >
                    {uploadingAvatar ? "Uploading..." : avatarUrl ? "Change photo" : "Upload photo"}
                  </button>
                  <p className="text-[11px] text-slate-400 mt-0.5">JPG, PNG. Max 5MB.</p>
                </div>
                <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Display name</label>
              <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={100} />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Headline</label>
              <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Your professional tagline" maxLength={120} />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Bio</label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Short description about you" className="min-h-[80px] resize-none" maxLength={300} />
            </div>
          </div>

          {/* Business Gallery */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Business Gallery</h2>
              <span className="text-[11px] text-slate-400">{portfolio.length}/5 photos</span>
            </div>

            {/* Gallery grid */}
            {portfolio.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {portfolio.map((url, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-square group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload button */}
            {portfolio.length < 5 && (
              <>
                <button
                  onClick={() => galleryInputRef.current?.click()}
                  disabled={uploadingGallery}
                  className="w-full h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center gap-2 text-slate-400 hover:border-emerald-300 hover:text-emerald-500 transition-colors"
                >
                  {uploadingGallery ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ImagePlus className="w-5 h-5" />
                      <span className="text-xs font-medium">Add photos of your work, office, or team</span>
                    </>
                  )}
                </button>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryUpload}
                />
              </>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Call to Action</h2>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Button text</label>
              <Input value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} maxLength={30} />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Button URL</label>
              <Input value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} placeholder="https://calendly.com/you" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Appearance</h2>

            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Accent color</label>
              <div className="flex gap-2 flex-wrap">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={`w-7 h-7 rounded-full transition-all ${accentColor === color ? "ring-2 ring-slate-900 ring-offset-2 scale-110" : "hover:scale-110"}`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1.5 block">Theme</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${theme === "dark" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${theme === "light" ? "bg-white text-slate-900 border-slate-900" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}
                >
                  Light
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Review management */}
        <div className="space-y-4">
          {/* Manual upload */}
          <AddReviewDialog
            userId={trustCard.user_id || ""}
            onReviewAdded={() => window.location.reload()}
          />

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Reviews ({reviews.length})</h2>
              <a href="/import" className="text-xs text-emerald-500 hover:text-emerald-600 font-medium flex items-center gap-1">
                Import from Google/G2 <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm">No reviews yet.</p>
                <p className="text-slate-400 text-xs mt-1">Add manually above or import from Google/G2</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                      review.display_on_trust_card
                        ? "border-slate-200 bg-white"
                        : "border-slate-100 bg-slate-50 opacity-50"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-900 truncate">{review.reviewer_name}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{review.review_text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-slate-400 uppercase">{review.platform}</span>
                        {review.verified && (
                          <span className="text-[10px] text-emerald-500 font-medium">Verified</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleReviewVisibility(review.id, review.display_on_trust_card)}
                      className="shrink-0 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                      title={review.display_on_trust_card ? "Hide from Trust Card" : "Show on Trust Card"}
                    >
                      {review.display_on_trust_card ? (
                        <Eye className="w-4 h-4 text-slate-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-slate-300" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
