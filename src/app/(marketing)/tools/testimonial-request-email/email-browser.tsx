"use client";

import { useState, useMemo } from "react";
import { Copy, Check } from "lucide-react";
import {
  emails,
  categories,
  categoryMap,
  industries,
  tones,
  categoryColors,
  categoryLabels,
  type EmailTemplate,
} from "./email-data";

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

function EmailCard({ email }: { email: EmailTemplate }) {
  const copyText = `Subject: ${email.subject}\n\n${email.body}`;

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${categoryColors[email.category]}`}
        >
          {categoryLabels[email.category]}
        </span>
        <CopyButton text={copyText} />
      </div>
      <p className="text-[14px] font-semibold text-slate-900 leading-snug mb-3">
        {email.subject}
      </p>
      <div className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line mb-4 max-h-[200px] overflow-y-auto">
        {email.body}
      </div>
      <div className="flex items-center justify-end">
        <div className="flex gap-1.5">
          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
            {email.industry}
          </span>
          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
            {email.tone}
          </span>
        </div>
      </div>
    </div>
  );
}

export function EmailBrowser() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [selectedTone, setSelectedTone] = useState("All Tones");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => {
    return emails.filter((e) => {
      if (selectedCategory !== "All Categories") {
        const mapped = categoryMap[selectedCategory];
        if (mapped && e.category !== mapped) return false;
      }
      if (
        selectedIndustry !== "All Industries" &&
        e.industry !== selectedIndustry
      )
        return false;
      if (selectedTone !== "All Tones" && e.tone !== selectedTone) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          e.subject.toLowerCase().includes(q) ||
          e.body.toLowerCase().includes(q) ||
          e.industry.toLowerCase().includes(q) ||
          e.tone.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedIndustry, selectedTone, searchQuery]);

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
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(20);
            }}
            className="flex-1 text-[13px] text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
          />
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
          Showing {visible.length} of {filtered.length} email templates
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {visible.map((e) => (
          <EmailCard key={e.id} email={e} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[15px] text-slate-400">
            No templates match your filters. Try adjusting your search.
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
