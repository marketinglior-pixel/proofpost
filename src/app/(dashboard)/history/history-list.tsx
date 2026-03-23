"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Quote,
  FileText,
  Calendar,
  Wand2,
} from "lucide-react";
import type { Database, Json } from "@/types/database";
import { CarouselPreview } from "../generate/carousel-preview";
import Link from "next/link";

type GeneratedContent =
  Database["public"]["Tables"]["generated_content"]["Row"];
type BrandKit = Database["public"]["Tables"]["brand_kits"]["Row"];

interface LlmOutput {
  slides: Array<{
    slideNumber: number;
    heading: string;
    body: string;
    footer?: string;
  }>;
  linkedinPost: string;
  hookLine: string;
}

interface HistoryListProps {
  items: GeneratedContent[];
  brandKit: BrandKit | null;
}

export function HistoryList({ items, brandKit }: HistoryListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-cream-dark bg-white p-12 text-center space-y-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber/10 mx-auto">
          <Wand2 className="w-6 h-6 text-amber-dark" />
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-ink">
            No carousels yet
          </h3>
          <p className="text-sm text-ink-muted mt-1">
            Generate your first carousel and it will show up here.
          </p>
        </div>
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 h-10 px-5 bg-ink hover:bg-ink-light text-cream text-sm font-medium rounded-lg transition-colors duration-200"
        >
          <Wand2 className="w-4 h-4" />
          Generate Carousel
        </Link>
      </div>
    );
  }

  function parseLlmOutput(json: Json): LlmOutput | null {
    try {
      const obj = json as Record<string, unknown>;
      if (obj && obj.slides && obj.linkedinPost && obj.hookLine) {
        return obj as unknown as LlmOutput;
      }
      return null;
    } catch {
      return null;
    }
  }

  async function handleCopy(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied!");
    setTimeout(() => setCopiedId(null), 2000);
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const llm = parseLlmOutput(item.llm_output);
        const isExpanded = expandedId === item.id;

        return (
          <div
            key={item.id}
            className="rounded-xl bg-white border border-cream-dark overflow-hidden transition-colors duration-200"
          >
            {/* Collapsed Header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className="w-full flex items-center gap-4 p-5 text-left hover:bg-cream/50 transition-colors duration-150"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber/10 flex-shrink-0">
                <Quote className="w-4 h-4 text-amber-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-ink truncate">
                  {llm?.hookLine ?? item.raw_input.slice(0, 60) + "..."}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-3 h-3 text-ink-muted/50" />
                  <span className="text-[12px] text-ink-muted">
                    {formatDate(item.created_at)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {llm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.id, llm.linkedinPost);
                    }}
                    className="h-8 px-3 text-[12px] text-ink-muted hover:text-ink"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 mr-1" />
                    )}
                    Copy Post
                  </Button>
                )}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-ink-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-ink-muted" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && llm && (
              <div className="border-t border-cream-dark p-5 space-y-6 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Hook Line */}
                <div className="flex items-start gap-3 rounded-lg bg-ink p-4">
                  <Quote className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                  <p className="font-heading text-lg text-cream">
                    {llm.hookLine}
                  </p>
                </div>

                {/* LinkedIn Post */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-ink-muted" />
                    <span className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
                      LinkedIn Post
                    </span>
                  </div>
                  <div className="rounded-lg bg-cream/70 border border-cream-dark p-4">
                    <p className="text-[14px] text-ink/80 whitespace-pre-line leading-relaxed">
                      {llm.linkedinPost}
                    </p>
                  </div>
                </div>

                {/* Re-render slides if brand kit exists */}
                {brandKit && (
                  <div className="space-y-2">
                    <span className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
                      Slides
                    </span>
                    <CarouselPreview
                      slides={llm.slides}
                      brand={{
                        companyName: brandKit.company_name,
                        logoUrl: brandKit.logo_url,
                        primaryColor: brandKit.primary_color,
                        secondaryColor: brandKit.secondary_color,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
