"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface TrustCardFooterProps {
  isPro: boolean;
  username: string;
}

export function TrustCardFooter({ isPro, username }: TrustCardFooterProps) {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  if (isIframe) return null;

  return (
    <footer className="border-t border-slate-100 py-8 mt-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-center">
        {isPro ? (
          <p className="text-[11px] text-slate-300">
            Verified trust page
          </p>
        ) : (
          <a
            href={`https://proofpst.com/go?ref=${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12px] text-slate-400 hover:text-slate-500 transition-colors"
          >
            <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center">
              <Star className="w-2.5 h-2.5 text-white" />
            </div>
            <span>
              Built with <span className="font-semibold">ProofPost</span> — Create your trust page in 60s
            </span>
          </a>
        )}
      </div>
    </footer>
  );
}
