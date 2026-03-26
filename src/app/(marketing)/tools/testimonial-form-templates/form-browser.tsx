"use client";

import { useState, useMemo } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import {
  templates,
  formTypes,
  formTypeMap,
  industries,
  typeColors,
  typeLabels,
  type FormTemplate,
} from "./form-data";

function CopyButton({ text, label }: { text: string; label?: string }) {
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
          {label || "Copy"}
        </>
      )}
    </button>
  );
}

function FormCard({ t }: { t: FormTemplate }) {
  const [expanded, setExpanded] = useState(false);
  const allQuestionsText = t.questions
    .map((q, i) => `${i + 1}. ${q}`)
    .join("\n");

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${typeColors[t.type]}`}
        >
          {typeLabels[t.type]}
        </span>
        <CopyButton text={allQuestionsText} label="Copy All" />
      </div>

      <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5">
        {t.title}
      </h3>
      <p className="text-[13px] text-slate-400 leading-relaxed mb-3">
        {t.description}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-700 transition-colors mb-3"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-3.5 h-3.5" />
            Hide Questions
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5" />
            Show {t.questionCount} Questions
          </>
        )}
      </button>

      {expanded && (
        <ol className="space-y-2 mb-3 pl-1">
          {t.questions.map((q, i) => (
            <li
              key={i}
              className="text-[13px] text-slate-600 leading-relaxed flex gap-2"
            >
              <span className="text-slate-300 font-medium shrink-0">
                {i + 1}.
              </span>
              {q}
            </li>
          ))}
        </ol>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
          {t.industry}
        </span>
        <span className="text-[11px] text-slate-400">
          {t.questionCount} questions
        </span>
      </div>
    </div>
  );
}

export function FormBrowser() {
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      if (selectedType !== "All Types") {
        const mappedType = formTypeMap[selectedType];
        if (mappedType && t.type !== mappedType) return false;
      }
      if (
        selectedIndustry !== "All Industries" &&
        t.industry !== selectedIndustry
      )
        return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.industry.toLowerCase().includes(q) ||
          t.questions.some((question) => question.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedType, selectedIndustry, searchQuery]);

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
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setVisibleCount(20);
            }}
            className={selectClass}
          >
            {formTypes.map((t) => (
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
        </div>
        <p className="mt-3 text-[12px] text-slate-400">
          Showing {visible.length} of {filtered.length} form templates
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {visible.map((t) => (
          <FormCard key={t.id} t={t} />
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
