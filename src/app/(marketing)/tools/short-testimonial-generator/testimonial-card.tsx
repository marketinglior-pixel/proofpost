"use client";

import { useState } from "react";
import { Copy, Check, Quote } from "lucide-react";
import type { Testimonial } from "./testimonial-data";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `"${testimonial.text}" — ${testimonial.author}, ${testimonial.role} at ${testimonial.company}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative bg-white border border-slate-200/80 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <Quote className="w-5 h-5 text-emerald/30 mb-3" aria-hidden="true" />

      <p className="text-[15px] text-slate-700 leading-relaxed mb-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold text-slate-900">
            {testimonial.author}
          </p>
          <p className="text-[12px] text-slate-400">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[12px] text-slate-400 hover:text-emerald px-2.5 py-1.5 rounded-md hover:bg-emerald/5 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          aria-label="Copy testimonial"
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
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100">
        <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
          {testimonial.industry}
        </span>
        <span className="text-[11px] text-slate-300 ml-2">
          {testimonial.length === "short" ? "1-2 sentences" : "3-4 sentences"}
        </span>
      </div>
    </div>
  );
}
