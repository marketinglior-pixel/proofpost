"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "47 G2 reviews sat idle for months. ProofPost turned them into landing page conversion machines.",
    name: "Daniel Moreno",
    title: "CMO, Launchpad HQ",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote:
      "Animated carousels stopped the scroll. Pricing page bounce rate dropped 18% in one week.",
    name: "Emily Rhodes",
    title: "Growth Manager, Nuvio",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    quote:
      "Sent collection forms Monday, had 14 reviews live by Friday. Zero design work needed.",
    name: "James Park",
    title: "Founder, Crestline",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
];

export function SocialProofCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((p) => (p + 1) % testimonials.length);
      setIsAnimating(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(goNext, 3500);
    return () => clearInterval(timer);
  }, [goNext]);

  const t = testimonials[current];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-2xl shadow-slate-200/40">
        {/* Card */}
        <div className="p-7 pb-5 flex flex-col items-center text-center">
          <span
            className="text-[56px] leading-[0.5] text-emerald/15 font-serif mb-2"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <p
            className="text-[15px] leading-relaxed text-slate-700 italic min-h-[52px] transition-opacity duration-300"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            {t.quote}
          </p>

          <div
            className="flex items-center gap-3 transition-opacity duration-300"
            style={{ opacity: isAnimating ? 0 : 1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.photo}
              alt=""
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-[13px] font-semibold text-slate-900">
                {t.name}
              </p>
              <p className="text-[11px] text-slate-400">{t.title}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-7 py-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex gap-1.5 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrent(i);
                    setIsAnimating(false);
                  }, 300);
                }}
                className="transition-all duration-300"
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor:
                    i === current
                      ? "#10B981"
                      : "rgba(15,23,42,0.12)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                aria-label={`Go to testimonial ${i + 1}`}
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
            style={{
              animation: "social-progress 3.5s linear forwards",
              width: "0%",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes social-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
