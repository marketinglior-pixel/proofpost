"use client";

import { useState } from "react";
import { EmailCapture } from "../components/email-capture";

function getRatingLabel(avg: number): string {
  if (avg < 2.0) return "Poor";
  if (avg < 3.0) return "Below Average";
  if (avg < 3.5) return "Average";
  if (avg < 4.0) return "Good";
  if (avg < 4.5) return "Very Good";
  return "Excellent";
}

function getRatingColor(avg: number): string {
  if (avg < 2.0) return "text-red-500";
  if (avg < 3.0) return "text-orange-500";
  if (avg < 3.5) return "text-yellow-500";
  if (avg < 4.5) return "text-green-500";
  return "text-emerald-500";
}

function getRatingBarColor(avg: number): string {
  if (avg < 2.0) return "bg-red-500";
  if (avg < 3.0) return "bg-orange-500";
  if (avg < 3.5) return "bg-yellow-500";
  if (avg < 4.5) return "bg-green-500";
  return "bg-emerald-500";
}

function StarDisplay({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  const empty = 5 - full - (partial > 0 ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`full-${i}`} className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {partial > 0 && (
        <div className="relative w-7 h-7">
          <svg className="w-7 h-7 text-slate-200 absolute" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <div className="overflow-hidden absolute" style={{ width: `${partial * 100}%` }}>
            <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`empty-${i}`} className="w-7 h-7 text-slate-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const starLabels = [
  { stars: 5, label: "5-star reviews", emoji: "\u2B50\u2B50\u2B50\u2B50\u2B50" },
  { stars: 4, label: "4-star reviews", emoji: "\u2B50\u2B50\u2B50\u2B50" },
  { stars: 3, label: "3-star reviews", emoji: "\u2B50\u2B50\u2B50" },
  { stars: 2, label: "2-star reviews", emoji: "\u2B50\u2B50" },
  { stars: 1, label: "1-star reviews", emoji: "\u2B50" },
];

const barColors = [
  "bg-emerald-500",
  "bg-green-500",
  "bg-yellow-400",
  "bg-orange-400",
  "bg-red-500",
];

export function RatingCalculator() {
  const [counts, setCounts] = useState<Record<number, string>>({
    5: "",
    4: "",
    3: "",
    2: "",
    1: "",
  });

  const getCount = (star: number) => Number(counts[star]) || 0;
  const total = [5, 4, 3, 2, 1].reduce((sum, s) => sum + getCount(s), 0);
  const weightedSum = [5, 4, 3, 2, 1].reduce(
    (sum, s) => sum + s * getCount(s),
    0
  );
  const hasInput = total > 0;
  const average = hasInput ? weightedSum / total : null;
  const averageDisplay = average !== null ? average.toFixed(2) : null;

  const handleChange = (star: number, value: string) => {
    setCounts((prev) => ({ ...prev, [star]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8">
        <h2 className="text-[16px] font-semibold text-slate-900 mb-6">
          Enter your review counts
        </h2>
        <div className="space-y-4">
          {starLabels.map((item, idx) => (
            <div key={item.stars} className="flex items-center gap-4">
              <span className="text-[14px] w-32 sm:w-40 shrink-0">
                <span className="hidden sm:inline">{item.emoji} </span>
                <span className="font-medium text-slate-700">
                  {item.label}
                </span>
              </span>
              <input
                type="number"
                min="0"
                value={counts[item.stars]}
                onChange={(e) => handleChange(item.stars, e.target.value)}
                placeholder="0"
                className="w-full max-w-[140px] text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12px] text-slate-400">
          Total reviews: {total}
        </p>
      </div>

      {/* Results Section */}
      {average !== null && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Average Rating */}
          <div className="text-center">
            <p className="text-[13px] font-medium text-slate-400 uppercase tracking-wider mb-2">
              Your Average Star Rating
            </p>
            <p
              className={`text-[64px] font-bold leading-none ${getRatingColor(average)}`}
            >
              {averageDisplay}
            </p>
            <div className="flex justify-center mt-3">
              <StarDisplay rating={average} />
            </div>
            <p
              className={`mt-2 text-[16px] font-medium ${getRatingColor(average)}`}
            >
              {getRatingLabel(average)}
            </p>
          </div>

          {/* Distribution Bars */}
          <div>
            <p className="text-[13px] font-medium text-slate-700 mb-4">
              Rating Distribution
            </p>
            <div className="space-y-3">
              {starLabels.map((item, idx) => {
                const count = getCount(item.stars);
                const pct = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-[13px] font-medium text-slate-600 w-12 shrink-0">
                      {item.stars} star
                    </span>
                    <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${barColors[idx]} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[12px] text-slate-500 w-20 text-right shrink-0">
                      {Math.round(pct)}% ({count})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formula Display */}
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-[13px] text-slate-500 text-center">
              Average = (5&times;{getCount(5)} + 4&times;{getCount(4)} + 3&times;
              {getCount(3)} + 2&times;{getCount(2)} + 1&times;{getCount(1)}) /{" "}
              {total} ={" "}
              <span className={`font-bold ${getRatingColor(average)}`}>
                {averageDisplay}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Email Capture — shown after calculation */}
      {average !== null && (
        <EmailCapture
          toolName="star-rating-calculator"
          headline="Get your rating improvement playbook"
          description="We'll send you proven strategies to improve your star rating and get more 5-star reviews."
          buttonText="Send My Playbook →"
        />
      )}
    </div>
  );
}
