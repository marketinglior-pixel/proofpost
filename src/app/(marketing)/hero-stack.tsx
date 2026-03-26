"use client";

import { useState, useEffect, useCallback } from "react";
import { heroReviews } from "./hero-reviews";

export function HeroStack() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setActive((p) => (p + 1) % heroReviews.length);
      setIsAnimating(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative h-[240px]">
        {heroReviews.map((r, i) => {
          const offset = ((i - active + heroReviews.length) % heroReviews.length);
          const isActive = offset === 0;
          const isBehind1 = offset === 1;
          const isBehind2 = offset === 2;
          const isVisible = offset <= 2;

          return (
            <div
              key={i}
              className="absolute inset-x-0 top-0 transition-all duration-500 ease-out"
              style={{
                opacity: isActive ? (isAnimating ? 0 : 1) : isBehind1 ? 0.6 : isBehind2 ? 0.3 : 0,
                transform: isActive
                  ? "translateY(0) scale(1)"
                  : isBehind1
                    ? "translateY(16px) scale(0.95)"
                    : isBehind2
                      ? "translateY(32px) scale(0.9)"
                      : "translateY(48px) scale(0.85)",
                zIndex: isVisible ? (3 - offset) : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg">
                {/* Stars */}
                <div className="flex gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-[14px] text-amber-400">★</span>
                  ))}
                </div>
                {/* Quote */}
                <span className="text-[28px] leading-none text-emerald/15 font-serif">&ldquo;</span>
                <p className="text-[13.5px] leading-relaxed text-slate-600 italic mt-1 min-h-[44px]">
                  {r.quote}
                </p>
                {/* Reviewer */}
                <div className="flex items-center gap-3 mt-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.photo} alt="" width={36} height={36} className="rounded-full object-cover w-9 h-9" />
                  <div>
                    <p className="text-[12px] font-semibold text-slate-800">{r.name}</p>
                    <p className="text-[10.5px] text-slate-400">{r.title}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {heroReviews.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsAnimating(true); setTimeout(() => { setActive(i); setIsAnimating(false); }, 300); }}
            className="transition-all duration-300"
            style={{
              width: i === active ? "18px" : "6px",
              height: "6px",
              borderRadius: "3px",
              backgroundColor: i === active ? "#10B981" : "rgba(15,23,42,0.12)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
