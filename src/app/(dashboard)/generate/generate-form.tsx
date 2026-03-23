"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Wand2,
  Loader2,
  Copy,
  Check,
  Quote,
  Link as LinkIcon,
  Type,
  User,
  Globe,
} from "lucide-react";
import type { CarouselOutput } from "@/lib/ai/generate-carousel";
import { CarouselPreview } from "./carousel-preview";
import { EmbedCodeSection } from "./embed-code-section";

interface ReviewerInfo {
  name: string;
  title: string;
  company: string;
  photoUrl: string | null;
}

interface GenerateResult {
  id: string;
  llmOutput: CarouselOutput & {
    reviewerPhotoUrl?: string | null;
  };
  brandKit: {
    companyName: string;
    logoUrl: string | null;
    primaryColor: string;
    secondaryColor: string;
  };
}

const EXAMPLE_REVIEW = `"We switched from HubSpot to their platform 6 months ago and it's been a game-changer. Our team was drowning in complexity. Within the first week, our sales reps were actually logging their calls and the pipeline finally reflected reality. We closed 23% more deals last quarter. Best decision we made all year."
— Sarah Chen, VP Sales at TechFlow`;

export function GenerateForm() {
  const [mode, setMode] = useState<"link" | "text">("link");
  const [url, setUrl] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerTitle, setReviewerTitle] = useState("");
  const [reviewerPhotoUrl, setReviewerPhotoUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleExtractUrl() {
    if (!url.trim()) {
      toast.error("Please paste a URL");
      return;
    }

    setExtracting(true);
    try {
      const res = await fetch("/api/extract-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to extract post");
        return;
      }

      setRawInput(data.reviewText || "");
      setReviewerName(data.reviewerName || "");
      setReviewerTitle(
        [data.reviewerTitle, data.reviewerCompany]
          .filter(Boolean)
          .join(", ")
      );
      setReviewerPhotoUrl(data.reviewerPhotoUrl || "");

      toast.success("Post extracted! Review the details and generate.");
    } catch {
      toast.error("Failed to extract. Try pasting the text manually.");
    } finally {
      setExtracting(false);
    }
  }

  async function handleGenerate() {
    if (rawInput.trim().length < 20) {
      toast.error("Review text must be at least 20 characters");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawInput: rawInput.trim(),
          reviewerName: reviewerName || undefined,
          reviewerTitle: reviewerTitle || undefined,
          reviewerPhotoUrl: reviewerPhotoUrl || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      setResult(data);
      toast.success("Carousel generated!");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyPost() {
    if (!result) return;
    await navigator.clipboard.writeText(result.llmOutput.linkedinPost);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-10">
      {/* Mode Tabs */}
      <div className="flex gap-1 p-1 bg-cream-dark/50 rounded-lg w-fit">
        <button
          onClick={() => setMode("link")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-200 ${
            mode === "link"
              ? "bg-white text-ink shadow-sm"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Paste a Link
        </button>
        <button
          onClick={() => setMode("text")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all duration-200 ${
            mode === "text"
              ? "bg-white text-ink shadow-sm"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          Paste Text
        </button>
      </div>

      {/* Input Section */}
      <div className="rounded-xl bg-white border border-cream-dark p-8 space-y-6">
        {mode === "link" ? (
          <>
            {/* Link Mode */}
            <div>
              <label className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
                Post URL
              </label>
              <p className="text-[14px] text-ink-muted mt-0.5">
                Paste a LinkedIn, X, or Facebook post URL
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted/40" />
                <Input
                  placeholder="https://linkedin.com/posts/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 h-12 text-[15px] bg-cream/50 border-cream-dark focus:border-amber focus:ring-amber/20 rounded-lg"
                />
              </div>
              <Button
                onClick={handleExtractUrl}
                disabled={extracting || !url.trim()}
                className="h-12 px-6 bg-ink hover:bg-ink-light text-cream shadow-none"
              >
                {extracting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Extract"
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Text Mode */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
                  Review Text
                </label>
                <p className="text-[14px] text-ink-muted mt-0.5">
                  Paste any testimonial or feedback
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRawInput(EXAMPLE_REVIEW);
                  setReviewerName("Sarah Chen");
                  setReviewerTitle("VP Sales, TechFlow");
                }}
                className="text-[12px] text-amber-dark hover:text-amber transition-colors duration-200 font-medium"
              >
                Try an example →
              </button>
            </div>
            <Textarea
              placeholder="Paste your customer review here..."
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              rows={5}
              className="resize-none text-[15px] bg-cream/50 border-cream-dark focus:border-amber focus:ring-amber/20 rounded-lg"
            />
          </>
        )}

        {/* Reviewer Details (shown in both modes after extraction or always in text mode) */}
        {(rawInput || mode === "text") && (
          <div className="space-y-4 pt-2 border-t border-cream-dark">
            <div className="flex items-center gap-2 pt-4">
              <User className="w-4 h-4 text-ink-muted" />
              <span className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
                Reviewer Details
              </span>
              <span className="text-[11px] text-ink-muted/50">
                (for the testimonial card)
              </span>
            </div>

            {/* Show extracted review text in link mode */}
            {mode === "link" && rawInput && (
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-ink-muted">
                  Extracted Review
                </label>
                <Textarea
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  rows={4}
                  className="resize-none text-[14px] bg-cream/50 border-cream-dark focus:border-amber focus:ring-amber/20 rounded-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-ink-muted">
                  Name
                </label>
                <Input
                  placeholder="Sarah Chen"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="h-10 text-[14px] bg-cream/50 border-cream-dark focus:border-amber focus:ring-amber/20 rounded-lg"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-ink-muted">
                  Title & Company
                </label>
                <Input
                  placeholder="VP Sales, TechFlow"
                  value={reviewerTitle}
                  onChange={(e) => setReviewerTitle(e.target.value)}
                  className="h-10 text-[14px] bg-cream/50 border-cream-dark focus:border-amber focus:ring-lg"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-ink-muted">
                Photo URL{" "}
                <span className="text-ink-muted/50">(optional)</span>
              </label>
              <Input
                placeholder="https://..."
                value={reviewerPhotoUrl}
                onChange={(e) => setReviewerPhotoUrl(e.target.value)}
                className="h-10 text-[14px] bg-cream/50 border-cream-dark focus:border-amber focus:ring-amber/20 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Character count */}
        {rawInput && (
          <p className="text-[12px] text-ink-muted tabular-nums">
            {rawInput.length} characters
          </p>
        )}

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={loading || rawInput.trim().length < 20}
          className="w-full h-12 bg-ink hover:bg-ink-light text-cream text-[15px] font-medium rounded-lg shadow-none transition-all duration-300 hover:shadow-lg hover:shadow-ink/10 disabled:opacity-40"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Testimonial Carousel
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Hook Line */}
          <div className="flex items-start gap-4 rounded-xl bg-ink p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-amber/8 blur-[60px]" />
            <Quote className="w-5 h-5 text-amber flex-shrink-0 mt-1 relative z-10" />
            <div className="relative z-10">
              <p className="text-[11px] font-medium text-amber uppercase tracking-widest mb-2">
                Hook Line
              </p>
              <p className="font-heading text-xl text-cream leading-snug">
                {result.llmOutput.hookLine}
              </p>
            </div>
          </div>

          {/* Carousel Preview */}
          <div className="rounded-xl bg-white border border-cream-dark p-8 space-y-5">
            <div>
              <h3 className="text-[15px] font-semibold text-ink">
                Testimonial Carousel
              </h3>
              <p className="text-[14px] text-ink-muted mt-0.5">
                3 slides with reviewer photo, stars, and your brand
              </p>
            </div>
            <CarouselPreview
              slides={result.llmOutput.slides}
              brand={result.brandKit}
              reviewer={
                result.llmOutput.reviewer
                  ? {
                      ...result.llmOutput.reviewer,
                      photoUrl: result.llmOutput.reviewerPhotoUrl || null,
                    }
                  : undefined
              }
            />
          </div>

          {/* LinkedIn Post Text */}
          <div className="rounded-xl bg-white border border-cream-dark p-8 space-y-4">
            <h3 className="text-[15px] font-semibold text-ink">
              LinkedIn Post Text
            </h3>
            <div className="rounded-lg bg-cream/70 border border-cream-dark p-5">
              <p className="text-[14px] text-ink/80 whitespace-pre-line leading-relaxed">
                {result.llmOutput.linkedinPost}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleCopyPost}
              className="w-full h-11 border-cream-dark text-ink-muted hover:bg-cream-dark/50 hover:text-ink shadow-none rounded-lg"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-emerald-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Post Text
                </>
              )}
            </Button>
          </div>

          {/* Embed Code */}
          <EmbedCodeSection
            contentId={result.id}
            hookLine={result.llmOutput.hookLine}
            reviewerName={result.llmOutput.reviewer?.name}
            onAddAnother={() => {
              // Scroll to top and reset form for new review
              setResult(null);
              setRawInput("");
              setReviewerName("");
              setReviewerTitle("");
              setReviewerPhotoUrl("");
              setUrl("");
              window.scrollTo({ top: 0, behavior: "smooth" });
              toast.success(
                "Add another review, then come back to the embed section"
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
