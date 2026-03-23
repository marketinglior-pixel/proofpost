"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Wand2, Loader2, Copy, Check, Download, Quote } from "lucide-react";
import type { CarouselOutput } from "@/lib/ai/generate-carousel";
import { CarouselPreview } from "./carousel-preview";

interface GenerateResult {
  id: string;
  llmOutput: CarouselOutput;
  brandKit: {
    companyName: string;
    logoUrl: string | null;
    primaryColor: string;
    secondaryColor: string;
  };
}

const EXAMPLE_REVIEW = `"We switched from HubSpot to their platform 6 months ago and it's been a game-changer. Our team was drowning in complexity — endless custom fields, confusing workflows, and nobody actually used the CRM properly. Within the first week, our sales reps were actually logging their calls and the pipeline finally reflected reality. We closed 23% more deals last quarter. Best decision we made all year."
— Sarah Chen, VP Sales at TechFlow`;

export function GenerateForm() {
  const [rawInput, setRawInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    if (rawInput.trim().length < 20) {
      toast.error("Please paste a review with at least 20 characters");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawInput: rawInput.trim() }),
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
      {/* Input Section */}
      <div className="rounded-xl bg-white border border-cream-dark p-8 space-y-5">
        <div>
          <label className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
            Customer Review
          </label>
          <p className="text-[14px] text-ink-muted mt-0.5">
            Paste any testimonial, G2 review, or feedback text.
          </p>
        </div>

        <Textarea
          placeholder="Paste your customer review here..."
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          rows={6}
          className="resize-none text-[15px] bg-cream/50 border-cream-dark focus:border-amber focus:ring-amber/20 rounded-lg placeholder:text-warm-gray/50"
        />

        <div className="flex items-center justify-between">
          <p className="text-[12px] text-ink-muted tabular-nums">
            {rawInput.length} characters
          </p>
          <button
            type="button"
            onClick={() => setRawInput(EXAMPLE_REVIEW)}
            className="text-[12px] text-amber-dark hover:text-amber transition-colors duration-200 font-medium"
          >
            Try an example →
          </button>
        </div>

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
              Generate Carousel
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
                Carousel Preview
              </h3>
              <p className="text-[14px] text-ink-muted mt-0.5">
                3 slides branded with your colors
              </p>
            </div>
            <CarouselPreview
              slides={result.llmOutput.slides}
              brand={result.brandKit}
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
              className="w-full h-11 border-cream-dark text-ink-muted hover:bg-cream-dark/50 hover:text-ink shadow-none rounded-lg transition-all duration-200"
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
        </div>
      )}
    </div>
  );
}
