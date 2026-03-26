"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Star } from "lucide-react";
import type { IndustryReviewResponse } from "../industry-response-data";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400 hover:text-emerald transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          Copy response
        </>
      )}
    </button>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < count
              ? "text-yellow-400 fill-yellow-400"
              : "text-slate-200 fill-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function ResponseCard({ r }: { r: IndustryReviewResponse }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Stars count={r.stars} />
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          {r.tone}
        </span>
      </div>
      <p className="text-[13px] text-slate-500 leading-relaxed italic mb-4">
        &ldquo;{r.reviewText}&rdquo;
      </p>
      <div className="bg-emerald/5 border border-emerald/10 rounded-lg p-4 mb-3">
        <p className="text-[11px] font-semibold text-emerald uppercase tracking-wider mb-2">
          Response Template
        </p>
        <p className="text-[14px] text-slate-700 leading-relaxed">
          {r.responseText}
        </p>
      </div>
      <CopyButton text={r.responseText} />
    </div>
  );
}

const ratingFilters = [
  "All",
  "5-star",
  "4-star",
  "3-star",
  "2-star",
  "1-star",
] as const;

export function IndustryResponseBrowser({
  responses,
}: {
  responses: IndustryReviewResponse[];
}) {
  const [selectedRating, setSelectedRating] = useState<string>("All");

  const filtered = useMemo(() => {
    if (selectedRating === "All") return responses;
    const rating = parseInt(selectedRating);
    return responses.filter((r) => r.stars === rating);
  }, [responses, selectedRating]);

  return (
    <div className="space-y-6">
      {/* Rating Filter */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-medium text-slate-500 mr-2">
            Filter by rating:
          </span>
          {ratingFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedRating(filter)}
              className={`text-[13px] font-medium px-3.5 py-1.5 rounded-lg border transition-colors ${
                selectedRating === filter
                  ? "bg-emerald text-white border-emerald"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-slate-400">
          Showing {filtered.length} of {responses.length} response examples
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <ResponseCard key={r.id} r={r} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[15px] text-slate-400">
            No responses match this rating filter. Try selecting a different
            rating.
          </p>
        </div>
      )}
    </div>
  );
}
