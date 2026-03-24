"use client";

import { useState, useEffect, useCallback } from "react";

const reviews = [
  {
    quote: "Pasted a G2 review, got an animated carousel in 40 seconds. Our pricing page conversion jumped 22%.",
    name: "Sarah Chen",
    title: "Head of Growth, TechFlow",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "The AI pulled out the exact sentence that closes deals. We used to bury that in a 5-star wall of text.",
    name: "Marcus Johnson",
    title: "VP Marketing, Beacon AI",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Replaced our static testimonial grid with ProofPost carousels. Demo requests up 35% in the first month.",
    name: "Lisa Wang",
    title: "CEO, Momentic",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote: "Collection forms saved us hours. Customers submit reviews, AI does the rest. We just hit approve.",
    name: "Priya Patel",
    title: "Growth Lead, ScaleStack",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
  },
];

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
        className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/40"
      >
        {/* Card */}
        <div className="p-7 pb-5 flex flex-col items-center text-center">
          {/* Quote mark */}
          <span
            className="text-[56px] leading-[0.5] text-emerald/15 font-serif mb-2"
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
            className="flex items-center gap-3 transition-opacity duration-300"
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
        <div className="h-[2px] bg-slate-100 overflow-hidden">
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
