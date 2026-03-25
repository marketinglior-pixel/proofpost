"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import posthog from "posthog-js";
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  Plus,
  Layers,
  Quote,
  Trash2,
} from "lucide-react";

const PROOFPOST_HOST = "https://proofpst.com";

interface ReviewItem {
  contentId: string;
  hookLine: string;
  reviewerName: string;
}

interface EmbedCodeSectionProps {
  contentId: string;
  hookLine?: string;
  reviewerName?: string;
  onAddAnother?: () => void;
}

export function EmbedCodeSection({
  contentId,
  hookLine,
  reviewerName,
  onAddAnother,
}: EmbedCodeSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      contentId,
      hookLine: hookLine || "Review",
      reviewerName: reviewerName || "Customer",
    },
  ]);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [widgetName, setWidgetName] = useState("My Testimonials");
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState(false);

  // The embed ID is either the widget ID (multi) or the single content ID
  const embedId = widgetId || contentId;
  const embedCode = `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${embedId}"></script>`;

  function handleAddReview(id: string, hook: string, name: string) {
    if (reviews.some((r) => r.contentId === id)) {
      toast.error("This review is already added");
      return;
    }
    setReviews((prev) => [
      ...prev,
      { contentId: id, hookLine: hook, reviewerName: name },
    ]);
    // Reset widget ID since review list changed
    setWidgetId(null);
  }

  function handleRemoveReview(id: string) {
    if (reviews.length <= 1) return;
    setReviews((prev) => prev.filter((r) => r.contentId !== id));
    setWidgetId(null);
  }

  async function handleCreateWidget() {
    if (reviews.length < 2) {
      // Single review — just use the content ID directly
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: widgetName,
          contentIds: reviews.map((r) => r.contentId),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create widget");
        return;
      }

      setWidgetId(data.id);
      posthog.capture("widget_created", {
        review_count: reviews.length,
        widget_name: widgetName,
        source: "embed_section",
      });
      toast.success("Widget created with " + reviews.length + " reviews!");
    } catch {
      toast.error("Failed to create widget");
    } finally {
      setCreating(false);
    }
  }

  async function handleCopy() {
    // If multiple reviews and no widget yet, create one first
    if (reviews.length >= 2 && !widgetId) {
      await handleCreateWidget();
    }

    await navigator.clipboard.writeText(embedCode);
    posthog.capture("embed_code_copied", { source: "embed_section" });
    setCopied(true);
    toast.success("Embed code copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl bg-white border border-cream-dark p-8 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-ink flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-dark" />
            Embed on Your Website
          </h3>
          <p className="text-[14px] text-ink-muted mt-0.5">
            {reviews.length === 1
              ? "Add more reviews or embed this one"
              : `${reviews.length} reviews in this widget`}
          </p>
        </div>
        <a
          href={`${PROOFPOST_HOST}/embed/${embedId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-amber-dark hover:text-amber flex items-center gap-1 transition-colors"
        >
          Preview
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Review list */}
      <div className="space-y-2">
        {reviews.map((review, i) => (
          <div
            key={review.contentId}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-cream/50 border border-cream-dark"
          >
            <Quote className="w-3.5 h-3.5 text-amber-dark flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-ink truncate">
                {review.hookLine}
              </p>
              <p className="text-[11px] text-ink-muted">{review.reviewerName}</p>
            </div>
            {reviews.length > 1 && (
              <button
                onClick={() => handleRemoveReview(review.contentId)}
                className="text-ink-muted/40 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add another review button */}
      <Button
        variant="outline"
        onClick={onAddAnother}
        className="w-full h-10 border-dashed border-cream-dark text-ink-muted hover:text-ink hover:bg-cream/50 shadow-none"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Review
      </Button>

      {/* Widget name (only for multi) */}
      {reviews.length >= 2 && (
        <div className="space-y-1.5">
          <label className="text-[12px] font-medium text-ink-muted">
            Widget Name
          </label>
          <Input
            value={widgetName}
            onChange={(e) => {
              setWidgetName(e.target.value);
              setWidgetId(null);
            }}
            placeholder="My Testimonials"
            className="h-9 text-[13px] bg-cream/50 border-cream-dark"
          />
        </div>
      )}

      {/* Embed code */}
      <div className="rounded-lg bg-ink p-4">
        <code className="text-[13px] text-amber-light/80 font-mono break-all leading-relaxed">
          {embedCode}
        </code>
      </div>

      <Button
        onClick={handleCopy}
        disabled={creating}
        className="w-full h-11 bg-ink hover:bg-ink-light text-cream font-medium shadow-none transition-colors duration-200"
      >
        {creating ? (
          <>
            <Layers className="w-4 h-4 mr-2 animate-spin" />
            Creating widget...
          </>
        ) : copied ? (
          <>
            <Check className="w-4 h-4 mr-2 text-emerald-400" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            {reviews.length >= 2 ? "Create Widget & Copy Code" : "Copy Embed Code"}
          </>
        )}
      </Button>

      <p className="text-[12px] text-ink-muted/60 text-center">
        Works on any website. Just paste the code where you want the widget.
      </p>
    </div>
  );
}
