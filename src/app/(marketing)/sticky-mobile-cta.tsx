"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero (roughly 600px)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200/60 px-4 py-3 safe-area-pb">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full h-12 bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
        >
          Try Free — No Card Required
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
