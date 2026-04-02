"use client";

import { useState, useEffect, useCallback } from "react";
import { X, TrendingUp, ShoppingCart, BarChart3 } from "lucide-react";

interface ProofStat {
  stat: string;
  text: string;
  source: string;
  icon: typeof TrendingUp;
}

const PROOF_STATS: ProofStat[] = [
  {
    stat: "270%",
    text: "higher conversion when visitors see reviews on your site.",
    source: "Spiegel Research Center",
    icon: TrendingUp,
  },
  {
    stat: "92%",
    text: "of buyers read online reviews before making a purchase.",
    source: "BrightLocal Consumer Survey",
    icon: ShoppingCart,
  },
  {
    stat: "15–34%",
    text: "conversion lift from displaying social proof on landing pages.",
    source: "VWO / ConversionXL studies",
    icon: BarChart3,
  },
];

export function FloatingTestimonial() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show after scroll or delay
  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("pp-testimonial-dismissed")) {
      return;
    }

    const timer = setTimeout(() => setVisible(true), 4000);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Rotate stats
  useEffect(() => {
    if (!visible || dismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROOF_STATS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [visible, dismissed]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pp-testimonial-dismissed", "1");
    }
  }, []);

  if (dismissed || !visible) return null;

  const proofStat = PROOF_STATS[currentIndex];
  const Icon = proofStat.icon;

  return (
    <div
      className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500"
      style={{ maxWidth: "360px" }}
    >
      <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-200/60 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="flex items-start gap-3.5 p-4 pr-10">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-emerald" />
          </div>

          {/* Content */}
          <div className="min-w-0 space-y-1.5">
            <p className="text-[24px] font-bold text-emerald leading-none tabular-nums">
              {proofStat.stat}
            </p>
            <p className="text-[13px] leading-relaxed text-slate-600">
              {proofStat.text}
            </p>
            <p className="text-[11px] text-slate-400">
              Source: {proofStat.source}
            </p>
          </div>
        </div>

        {/* Dots navigation */}
        {PROOF_STATS.length > 1 && (
          <div className="flex justify-center gap-1 pb-3">
            {PROOF_STATS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-4 bg-emerald" : "w-1.5 bg-slate-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
