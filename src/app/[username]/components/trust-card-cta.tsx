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
      <div className="h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      <div className="bg-white/90 backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom))] px-5 pt-2 border-t border-slate-100">
        <div className="max-w-lg mx-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl text-white font-semibold text-[16px] transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            style={{ background: accentColor }}
          >
            {label}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
