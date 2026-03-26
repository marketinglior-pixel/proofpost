"use client";

import { useState, useMemo } from "react";
import { Copy, Check, Star } from "lucide-react";
import {
  testimonials,
  industries,
  categories,
  lengths,
  type TestimonialExample,
} from "./testimonial-data";

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

function TestimonialCard({ t }: { t: TestimonialExample }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Stars count={t.stars} />
        <CopyButton text={`"${t.quote}" — ${t.name}, ${t.role} at ${t.company}`} />
      </div>
      <blockquote className="text-[14px] text-slate-700 leading-relaxed mb-4">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-medium text-slate-900">{t.name}</p>
          <p className="text-[12px] text-slate-400">
            {t.role}, {t.company}
          </p>
        </div>
        <div className="flex gap-1.5">
          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
            {t.industry}
          </span>
          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
            {t.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialBrowser() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLength, setSelectedLength] = useState("All Lengths");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => {
    return testimonials.filter((t) => {
      if (selectedIndustry !== "All Industries" && t.industry !== selectedIndustry)
        return false;
      if (selectedCategory !== "All Categories" && t.category !== selectedCategory)
        return false;
      if (selectedLength !== "All Lengths") {
        if (selectedLength.startsWith("Short") && t.length !== "short") return false;
        if (selectedLength.startsWith("Medium") && t.length !== "medium") return false;
        if (selectedLength.startsWith("Long") && t.length !== "long") return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          t.quote.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q) ||
          t.industry.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedIndustry, selectedCategory, selectedLength, searchQuery]);

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
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(20);
            }}
            className="flex-1 text-[13px] text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
          />
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
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setVisibleCount(20);
            }}
            className={selectClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={selectedLength}
            onChange={(e) => {
              setSelectedLength(e.target.value);
              setVisibleCount(20);
            }}
            className={selectClass}
          >
            {lengths.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-3 text-[12px] text-slate-400">
          Showing {visible.length} of {filtered.length} testimonial examples
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {visible.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[15px] text-slate-400">
            No testimonials match your filters. Try adjusting your search.
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
