"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { AddReviewDialog } from "./add-review-dialog";
import {
  ArrowUpRight,
  Check,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Loader2,
  Save,
  BarChart3,
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
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);

  const trustCardUrl = `${PROOFPOST_HOST}/${trustCard.username}`;

  async function handleSave() {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("trust_cards")
        .update({
          display_name: displayName,
          headline: headline || null,
          bio: bio || null,
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
