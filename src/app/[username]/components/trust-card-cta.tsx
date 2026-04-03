"use client";

import { ArrowRight } from "lucide-react";

interface TrustCardCtaProps {
  label: string;
  url: string;
  accentColor: string;
}

export function TrustCardCta({ label, url, accentColor }: TrustCardCtaProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient fade from transparent to dark */}
      <div className="h-8 bg-gradient-to-t from-[#08080c] to-transparent pointer-events-none" />
      <div className="bg-[#08080c]/90 backdrop-blur-xl pb-[max(1rem,env(safe-area-inset-bottom))] px-5 pt-2">
        <div className="max-w-[640px] mx-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center justify-center gap-2.5 w-full
              py-4 px-6 rounded-2xl
              text-white font-semibold text-[16px] tracking-[-0.01em]
              transition-all duration-300
              hover:scale-[1.02] active:scale-[0.98]
              shadow-[0_0_40px_-8px_var(--glow)]
              hover:shadow-[0_0_60px_-4px_var(--glow)]
            "
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
              "--glow": `${accentColor}50`,
            } as React.CSSProperties}
          >
            {label}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
