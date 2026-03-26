"use client";

import { useState, useEffect, useCallback } from "react";
import { heroReviews } from "./hero-reviews";

const reviews = heroReviews;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((p) => (p + 1) % reviews.length);
      setIsAnimating(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [goNext]);

  const r = reviews[current];

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/40"
      >
        {/* Card */}
        <div className="p-7 pb-5 flex flex-col items-center text-center">
          {/* Quote mark */}
          <span
            className="text-[40px] leading-tight text-emerald/15 font-serif mb-1"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Quote */}
          <p
            className="text-[15px] leading-relaxed text-slate-700 italic min-h-[52px] transition-opacity duration-300"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            {r.quote}
          </p>

          {/* Reviewer */}
          <div
            className="flex items-center gap-3 mt-4 transition-opacity duration-300"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.photo}
              alt=""
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-[13px] font-semibold text-slate-900">{r.name}</p>
              <p className="text-[11px] text-slate-400">{r.title}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-7 py-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex gap-1.5 items-center">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIsAnimating(true); setTimeout(() => { setCurrent(i); setIsAnimating(false); }, 300); }}
                className="transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: i === current ? "#10B981" : "rgba(15,23,42,0.12)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-300 font-medium">
            ✦ ProofPost Widget
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[2px] bg-slate-100 overflow-hidden rounded-b-2xl">
          <div
            key={current}
            className="h-full bg-emerald/40"
            style={{ animation: "hero-progress 3.5s linear forwards", width: "0%" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes hero-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
