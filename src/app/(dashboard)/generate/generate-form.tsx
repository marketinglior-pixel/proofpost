"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import posthog from "posthog-js";
import {
  Wand2,
  Loader2,
  Copy,
  Check,
  Link as LinkIcon,
  Type,
  Globe,
  User,
  Trash2,
  Quote,
  Code2,
  ExternalLink,
  Plus,
  Camera,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

const PROOFPOST_HOST = "https://proofpst.com";

interface ReviewItem {
  contentId: string;
  hookLine: string;
  reviewerName: string;
  quote: string;
}

const EXAMPLE_REVIEW = `"We switched from HubSpot to their platform 6 months ago and it's been a game-changer. Within the first week, our sales reps were actually logging their calls and the pipeline finally reflected reality. We closed 23% more deals last quarter. Best decision we made all year."
— Sarah Chen, VP Sales at TechFlow`;

export function GenerateForm() {
  // Input state
  const [mode, setMode] = useState<"link" | "text" | "screenshot">("text");
  const [url, setUrl] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerTitle, setReviewerTitle] = useState("");
  const [reviewerPhotoUrl, setReviewerPhotoUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [loading, setLoading] = useState(false);

  // Screenshot state
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [extractedReviews, setExtractedReviews] = useState<Array<{
    reviewerName: string;
    reviewerTitle?: string;
    reviewerCompany?: string;
    reviewText: string;
    rating?: number;
    source?: string;
  }>>([]);
  const [extractingScreenshot, setExtractingScreenshot] = useState(false);
  const [selectedExtracted, setSelectedExtracted] = useState<number | null>(null);

  // Accumulated reviews
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  // Widget state
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [widgetName, setWidgetName] = useState("My Testimonials");
  const [creatingWidget, setCreatingWidget] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleExtractUrl() {
    if (!url.trim()) { toast.error("Please paste a URL"); return; }
    setExtracting(true);
    try {
      const res = await fetch("/api/extract-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Failed to extract"); return; }
      setRawInput(data.reviewText || "");
      setReviewerName(data.reviewerName || "");
      setReviewerTitle([data.reviewerTitle, data.reviewerCompany].filter(Boolean).join(", "));
      setReviewerPhotoUrl(data.reviewerPhotoUrl || "");
      posthog.capture("review_pasted", { input_mode: "link", url: url.trim() });
      toast.success("Post extracted!");
    } catch { toast.error("Failed to extract."); }
    finally { setExtracting(false); }
  }

  async function handleGenerate() {
    if (rawInput.trim().length < 20) {
      toast.error("Review text must be at least 20 characters");
      return;
    }
    setLoading(true);
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
      if (!res.ok) { toast.error(data.error || "Something went wrong"); return; }

      // Add to list
      const newReview: ReviewItem = {
        contentId: data.id,
        hookLine: data.llmOutput.hookLine || "Review",
        reviewerName: data.llmOutput.reviewer?.name || reviewerName || "Customer",
        quote: data.llmOutput.slides?.[1]?.body || rawInput.slice(0, 80),
      };
      setReviews((prev) => [...prev, newReview]);

      // Reset form for next review
      setRawInput("");
      setReviewerName("");
      setReviewerTitle("");
      setReviewerPhotoUrl("");
      setUrl("");
      setWidgetId(null); // Reset widget since list changed

      posthog.capture("carousel_generated", {
        review_count: reviews.length + 1,
        hook_line: data.llmOutput.hookLine,
        input_mode: mode,
      });

      toast.success(`Added! ${reviews.length + 1} review${reviews.length > 0 ? "s" : ""} in your carousel.`);
    } catch { toast.error("Network error."); }
    finally { setLoading(false); }
  }

  async function handleScreenshotUpload(file: File) {
    setScreenshotFile(file);
    setScreenshotPreview(URL.createObjectURL(file));
    setExtractedReviews([]);
    setSelectedExtracted(null);
  }

  async function handleExtractScreenshot() {
    if (!screenshotFile) return;
    setExtractingScreenshot(true);
    try {
      const formData = new FormData();
      formData.append("image", screenshotFile);
      const res = await fetch("/api/extract-screenshot", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Failed to extract"); return; }
      setExtractedReviews(data.reviews || []);
      posthog.capture("screenshot_extracted", { count: data.count, source: data.sourceDetected });
      toast.success(`Found ${data.count} review${data.count !== 1 ? "s" : ""}!`);
    } catch { toast.error("Failed to extract reviews."); }
    finally { setExtractingScreenshot(false); }
  }

  function handleUseExtracted(index: number) {
    const review = extractedReviews[index];
    if (!review) return;
    setRawInput(review.reviewText);
    setReviewerName(review.reviewerName);
    setReviewerTitle([review.reviewerTitle, review.reviewerCompany].filter(Boolean).join(", "));
    setSelectedExtracted(index);
    setMode("text"); // Switch to text mode to show the filled form
    toast.success("Review loaded! Click 'Add to Carousel' to generate.");
  }

  async function handleGenerateAllExtracted() {
    if (extractedReviews.length === 0) return;
    setLoading(true);
    let added = 0;
    for (const review of extractedReviews) {
      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rawInput: review.reviewText,
            reviewerName: review.reviewerName || undefined,
            reviewerTitle: review.reviewerTitle || undefined,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          const newReview: ReviewItem = {
            contentId: data.id,
            hookLine: data.llmOutput.hookLine || "Review",
            reviewerName: data.llmOutput.reviewer?.name || review.reviewerName || "Customer",
            quote: data.llmOutput.slides?.[1]?.body || review.reviewText.slice(0, 80),
          };
          setReviews((prev) => [...prev, newReview]);
          added++;
        }
      } catch {
        // Skip failed ones
      }
    }
    setWidgetId(null);
    setLoading(false);
    if (added > 0) {
      posthog.capture("bulk_screenshot_generated", { count: added });
      toast.success(`Added ${added} reviews to your carousel!`);
    } else {
      toast.error("Failed to generate carousels");
    }
  }

  function handleRemoveReview(contentId: string) {
    setReviews((prev) => prev.filter((r) => r.contentId !== contentId));
    setWidgetId(null);
  }

  async function handleCreateWidget() {
    if (reviews.length === 0) return;
    setCreatingWidget(true);
    try {
      if (reviews.length === 1) {
        // Single review: use content ID directly
        setWidgetId(reviews[0].contentId);
      } else {
        // Multiple reviews: create widget
        const res = await fetch("/api/widgets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: widgetName,
            contentIds: reviews.map((r) => r.contentId),
          }),
        });
        const data = await res.json();
        if (!res.ok) { toast.error(data.error || "Failed"); return; }
        setWidgetId(data.id);
      }
      posthog.capture("widget_created", {
        review_count: reviews.length,
        widget_name: widgetName,
      });
      toast.success("Widget ready!");
    } catch { toast.error("Failed to create widget"); }
    finally { setCreatingWidget(false); }
  }

  async function handleCopyCode() {
    if (!widgetId && reviews.length > 0) {
      await handleCreateWidget();
    }
    const embedId = widgetId || reviews[0]?.contentId;
    if (!embedId) return;
    const code = `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${embedId}"></script>`;
    await navigator.clipboard.writeText(code);
    posthog.capture("embed_code_copied", { source: "generate_form" });
    setCopied(true);
    toast.success("Embed code copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  const embedId = widgetId || (reviews.length === 1 ? reviews[0].contentId : null);
  const embedCode = embedId
    ? `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${embedId}"></script>`
    : null;

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* LEFT: Input form */}
      <div className="lg:col-span-3 space-y-6">
        {/* Mode tabs */}
        <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit">
          <button
            onClick={() => setMode("link")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-colors duration-200 ${
              mode === "link" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" aria-hidden="true" />
            Paste Link
          </button>
          <button
            onClick={() => setMode("text")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-colors duration-200 ${
              mode === "text" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Type className="w-3.5 h-3.5" aria-hidden="true" />
            Paste Text
          </button>
          <button
            onClick={() => setMode("screenshot")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-colors duration-200 ${
              mode === "screenshot" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Camera className="w-3.5 h-3.5" aria-hidden="true" />
            Screenshot
          </button>
        </div>

        {/* Screenshot input card */}
        {mode === "screenshot" && (
          <div className="rounded-xl bg-white border border-slate-200 p-6 space-y-5">
            <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
              Upload Screenshot
            </label>

            {/* Drop zone */}
            {!screenshotPreview ? (
              <label
                className="flex flex-col items-center justify-center gap-3 p-8 rounded-lg border-2 border-dashed border-slate-200 hover:border-emerald/40 hover:bg-emerald/5 transition-colors cursor-pointer"
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files[0];
                  if (file?.type.startsWith("image/")) handleScreenshotUpload(file);
                }}
              >
                <Upload className="w-8 h-8 text-slate-300" />
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600">
                    Drag & drop a screenshot or click to browse
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Supports Google Reviews, G2, LinkedIn, Trustpilot, WhatsApp, Email
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleScreenshotUpload(file);
                  }}
                />
              </label>
            ) : (
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden border border-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={screenshotPreview}
                    alt="Uploaded screenshot"
                    className="w-full max-h-64 object-contain bg-slate-50"
                  />
                  <button
                    onClick={() => {
                      setScreenshotFile(null);
                      setScreenshotPreview(null);
                      setExtractedReviews([]);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-white/90 hover:bg-white shadow text-slate-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Extract button */}
                {extractedReviews.length === 0 && (
                  <Button
                    onClick={handleExtractScreenshot}
                    disabled={extractingScreenshot}
                    className="w-full h-11 bg-navy hover:bg-navy-light text-white font-medium shadow-none"
                  >
                    {extractingScreenshot ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Extracting reviews...</>
                    ) : (
                      <><ImageIcon className="w-4 h-4 mr-2" />Extract Reviews</>
                    )}
                  </Button>
                )}
              </div>
            )}

            {/* Extracted reviews list */}
            {extractedReviews.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-emerald-dark">
                    {extractedReviews.length} review{extractedReviews.length !== 1 ? "s" : ""} found
                  </span>
                  <Button
                    onClick={handleGenerateAllExtracted}
                    disabled={loading}
                    size="sm"
                    className="h-8 text-xs bg-emerald hover:bg-emerald-dark text-white shadow-none"
                  >
                    {loading ? (
                      <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Processing...</>
                    ) : (
                      <><Plus className="w-3 h-3 mr-1" />Add All to Carousel</>
                    )}
                  </Button>
                </div>
                <div className="space-y-2">
                  {extractedReviews.map((review, i) => (
                    <button
                      key={i}
                      onClick={() => handleUseExtracted(i)}
                      className={`w-full text-left rounded-lg border p-3 transition-colors ${
                        selectedExtracted === i
                          ? "border-emerald bg-emerald/5"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-800">
                          {review.reviewerName}
                        </span>
                        {review.reviewerTitle && (
                          <span className="text-[10px] text-slate-400">
                            {review.reviewerTitle}
                            {review.reviewerCompany ? `, ${review.reviewerCompany}` : ""}
                          </span>
                        )}
                        {review.rating && (
                          <span className="text-[10px] text-amber-500">
                            {"★".repeat(review.rating)}
                          </span>
                        )}
                        {review.source && review.source !== "other" && (
                          <span className="text-[9px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {review.source}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {review.reviewText}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input card */}
        {mode !== "screenshot" && (
        <div className="rounded-xl bg-white border border-slate-200 p-6 space-y-5">
          {mode === "link" ? (
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
                <Button onClick={handleExtractUrl} disabled={extracting || !url.trim()} className="h-11 px-5 bg-navy hover:bg-navy-light text-white shadow-none">
                  {extracting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Extract"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                  Review Text
                </label>
                <button
                  onClick={() => { setRawInput(EXAMPLE_REVIEW); setReviewerName("Sarah Chen"); setReviewerTitle("VP Sales, TechFlow"); }}
                  className="text-[12px] text-emerald-dark hover:text-emerald transition-colors font-medium"
                >
                  Try an example
                </button>
              </div>
              <Textarea
                placeholder="Paste your customer review here..."
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                onPaste={() => posthog.capture("review_pasted", { input_mode: "text" })}
                rows={4}
                className="resize-none border-slate-200"
              />
            </div>
          )}

          {/* Reviewer fields */}
          {(rawInput || mode === "text") && (
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                  Reviewer
                </span>
              </div>

              {mode === "link" && rawInput && (
                <Textarea
                  value={rawInput}
                  onChange={(e) => setRawInput(e.target.value)}
                  rows={3}
                  className="resize-none text-[14px] border-slate-200"
                />
              )}

              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Name" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className="h-10 border-slate-200" />
                <Input placeholder="Title, Company" value={reviewerTitle} onChange={(e) => setReviewerTitle(e.target.value)} className="h-10 border-slate-200" />
              </div>
            </div>
          )}

          {/* Generate button */}
          <Button
            onClick={handleGenerate}
            disabled={loading || rawInput.trim().length < 20}
            className="w-full h-12 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-lg shadow-none glow-emerald disabled:opacity-40"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</>
            ) : (
              <><Plus className="w-4 h-4 mr-2" />Add to Carousel</>
            )}
          </Button>
        </div>
        )}
      </div>

      {/* RIGHT: Review list + Embed code */}
      <div className="lg:col-span-2 space-y-5">
        <h2 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-emerald" aria-hidden="true" />
          Your Carousel
          {reviews.length > 0 && (
            <span className="text-[12px] font-medium text-slate-400">
              ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
            </span>
          )}
        </h2>

        {/* Review list */}
        <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
          {reviews.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Quote className="w-8 h-8 text-slate-200 mx-auto" aria-hidden="true" />
              <p className="text-[14px] text-slate-400">
                No reviews yet. Add your first one.
              </p>
              <p className="text-[12px] text-slate-300">
                Each review becomes a slide in your carousel widget.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {reviews.map((review, i) => (
                <div key={review.contentId} className="flex items-start gap-3 px-4 py-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald/10 text-[11px] font-bold text-emerald-dark flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-slate-800 truncate">
                      {review.hookLine}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {review.reviewerName}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveReview(review.contentId)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                    aria-label="Remove review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Widget name (for multi) */}
        {reviews.length >= 2 && !widgetId && (
          <Input
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            placeholder="Widget name"
            className="h-9 text-[13px] border-slate-200"
          />
        )}

        {/* Get embed code */}
        {reviews.length > 0 && !embedCode && (
          <Button
            onClick={handleCreateWidget}
            disabled={creatingWidget}
            className="w-full h-11 bg-navy hover:bg-navy-light text-white font-medium shadow-none"
          >
            {creatingWidget ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</>
            ) : (
              <><Code2 className="w-4 h-4 mr-2" />Get Embed Code</>
            )}
          </Button>
        )}

        {/* Embed code display */}
        {embedCode && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                Embed Code
              </span>
              <a
                href={`${PROOFPOST_HOST}/embed/${embedId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-emerald-dark hover:text-emerald flex items-center gap-1 transition-colors"
              >
                Preview <ExternalLink className="w-3 h-3" />
              </a>
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
                <><Check className="w-4 h-4 mr-2" />Copied!</>
              ) : (
                <><Copy className="w-4 h-4 mr-2" />Copy Embed Code</>
              )}
            </Button>
            <p className="text-[11px] text-slate-400 text-center">
              Paste this code anywhere on your website.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
