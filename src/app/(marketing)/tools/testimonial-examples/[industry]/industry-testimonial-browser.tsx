"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Star } from "lucide-react";
import type { IndustryTestimonial } from "../industry-data";

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
          Copy
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

function TestimonialCard({ t }: { t: IndustryTestimonial }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Stars count={t.rating} />
        <CopyButton
          text={`"${t.quote}" — ${t.author}, ${t.role} at ${t.company}`}
        />
      </div>
      <blockquote className="text-[14px] text-slate-700 leading-relaxed mb-4">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div>
        <p className="text-[13px] font-medium text-slate-900">{t.author}</p>
        <p className="text-[12px] text-slate-400">
          {t.role}, {t.company}
        </p>
      </div>
    </div>
  );
}

const ratingFilters = ["All", "5-star", "4-star", "3-star"] as const;

export function IndustryTestimonialBrowser({
  testimonials,
}: {
  testimonials: IndustryTestimonial[];
}) {
  const [selectedRating, setSelectedRating] = useState<string>("All");

  const filtered = useMemo(() => {
    if (selectedRating === "All") return testimonials;
    const rating = parseInt(selectedRating);
    return testimonials.filter((t) => t.rating === rating);
  }, [testimonials, selectedRating]);

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
          Showing {filtered.length} of {testimonials.length} testimonial
          examples
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[15px] text-slate-400">
            No testimonials match this rating filter. Try selecting a different
            rating.
          </p>
        </div>
      )}
    </div>
  );
}
