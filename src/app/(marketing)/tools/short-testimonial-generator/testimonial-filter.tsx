"use client";

import { useState } from "react";
import { TestimonialCard } from "./testimonial-card";
import {
  testimonials,
  industries,
  type Industry,
  type TestimonialLength,
} from "./testimonial-data";

export function TestimonialFilter() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | "All">(
    "All"
  );
  const [selectedLength, setSelectedLength] = useState<
    TestimonialLength | "All"
  >("All");

  const filtered = testimonials.filter((t) => {
    if (selectedIndustry !== "All" && t.industry !== selectedIndustry)
      return false;
    if (selectedLength !== "All" && t.length !== selectedLength) return false;
    return true;
  });

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={selectedIndustry}
          onChange={(e) =>
            setSelectedIndustry(e.target.value as Industry | "All")
          }
          className="text-[14px] text-slate-700 bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
        >
          <option value="All">All Industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>

        <select
          value={selectedLength}
          onChange={(e) =>
            setSelectedLength(e.target.value as TestimonialLength | "All")
          }
          className="text-[14px] text-slate-700 bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
        >
          <option value="All">All Lengths</option>
          <option value="short">Short (1-2 sentences)</option>
          <option value="medium">Medium (3-4 sentences)</option>
        </select>

        <span className="text-[13px] text-slate-400 self-center ml-2">
          {filtered.length} testimonial{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Testimonial Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-[15px]">
            No testimonials match your filters. Try adjusting your selection.
          </p>
        </div>
      )}
    </>
  );
}
