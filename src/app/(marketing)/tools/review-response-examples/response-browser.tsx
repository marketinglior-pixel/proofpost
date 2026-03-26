"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Star } from "lucide-react";
import {
  responses,
  reviewTypes,
  industries,
  tones,
  type ReviewResponse,
} from "./response-data";

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

function ResponseCard({ r }: { r: ReviewResponse }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Stars count={r.stars} />
        <CopyButton text={r.responseText} />
      </div>
      <p className="text-[13px] text-slate-400 italic leading-relaxed mb-3">
        &ldquo;{r.reviewText}&rdquo;
      </p>
      <blockquote className="text-[14px] text-slate-700 leading-relaxed mb-4">
        {r.responseText}
      </blockquote>
      <div className="flex items-center justify-end">
        <div className="flex gap-1.5">
          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
            {r.industry}
          </span>
          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
            {r.tone}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ResponseBrowser() {
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedTone, setSelectedTone] = useState("All Tones");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => {
    return responses.filter((r) => {
      if (selectedType !== "All Types") {
        if (selectedType === "Positive (5-star)" && r.reviewType !== "5-star")
          return false;
        if (selectedType === "Positive (4-star)" && r.reviewType !== "4-star")
          return false;
        if (selectedType === "Neutral (3-star)" && r.reviewType !== "3-star")
          return false;
        if (selectedType === "Negative (2-star)" && r.reviewType !== "2-star")
          return false;
        if (selectedType === "Negative (1-star)" && r.reviewType !== "1-star")
          return false;
      }
      if (
        selectedIndustry !== "All Industries" &&
        r.industry !== selectedIndustry
      )
        return false;
      if (selectedTone !== "All Tones" && r.tone !== selectedTone) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          r.reviewText.toLowerCase().includes(q) ||
          r.responseText.toLowerCase().includes(q) ||
          r.industry.toLowerCase().includes(q) ||
          r.tone.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedType, selectedIndustry, selectedTone, searchQuery]);

  const visible = filtered.slice(0, visibleCount);

  const selectClass =
    "text-[13px] text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors";

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search responses..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(20);
            }}
            className="flex-1 text-[13px] text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
          />
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setVisibleCount(20);
            }}
            className={selectClass}
          >
            {reviewTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={selectedIndustry}
            onChange={(e) => {
              setSelectedIndustry(e.target.value);
              setVisibleCount(20);
            }}
            className={selectClass}
          >
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <select
            value={selectedTone}
            onChange={(e) => {
              setSelectedTone(e.target.value);
              setVisibleCount(20);
            }}
            className={selectClass}
          >
            {tones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-3 text-[12px] text-slate-400">
          Showing {visible.length} of {filtered.length} response examples
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {visible.map((r) => (
          <ResponseCard key={r.id} r={r} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[15px] text-slate-400">
            No responses match your filters. Try adjusting your search.
          </p>
        </div>
      )}

      {/* Load More */}
      {visibleCount < filtered.length && (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount((c) => c + 20)}
            className="text-[14px] font-medium text-emerald hover:text-emerald-dark border border-emerald/30 hover:border-emerald/60 px-6 py-2.5 rounded-lg transition-colors"
          >
            Load More ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
