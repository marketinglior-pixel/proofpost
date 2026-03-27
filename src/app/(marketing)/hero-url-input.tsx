"use client";

import { useState } from "react";
import { ArrowRight, Link2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const placeholders = [
  "Paste a G2 review URL...",
  "Paste a Google Reviews link...",
  "Paste a Capterra review URL...",
  "Paste a Trustpilot link...",
];

export function HeroUrlInput() {
  const [url, setUrl] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  // Cycle placeholder text every 3s
  useState(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to login with the URL as a query param so they can start immediately after signup
    if (url.trim()) {
      router.push(`/login?review_url=${encodeURIComponent(url.trim())}`);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center gap-2 bg-white rounded-2xl border-2 transition-all duration-200 shadow-sm ${
            isFocused
              ? "border-emerald shadow-lg shadow-emerald/10"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center gap-2 pl-4 text-slate-300">
            <Link2 className="w-4 h-4 flex-shrink-0" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholders[placeholderIdx]}
            className="flex-1 h-14 bg-transparent text-[15px] text-slate-900 placeholder:text-slate-300 outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-2 h-10 px-5 mr-2 bg-emerald hover:bg-emerald-dark text-white text-[13px] font-semibold rounded-xl transition-colors duration-200 glow-emerald whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            Extract Hook
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </form>

      {/* Source logos */}
      <div className="flex items-center gap-3 pl-1">
        <span className="text-[11px] text-slate-300">Works with</span>
        <div className="flex items-center gap-3 opacity-40">
          {/* G2 */}
          <svg width="18" height="18" viewBox="0 0 24 24" aria-label="G2">
            <circle cx="12" cy="12" r="11" fill="#FF492C" />
            <text x="12" y="16" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui">G2</text>
          </svg>
          {/* Capterra */}
          <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Capterra">
            <path d="M12 0L2 7v10l10 7 10-7V7L12 0z" fill="#FF9D28" />
            <path d="M12 0L2 7l10 7 10-7L12 0z" fill="#68C5ED" />
          </svg>
          {/* Trustpilot */}
          <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Trustpilot">
            <path d="M12 0l3.09 9.26H24l-7.18 5.22 2.74 8.52L12 17.77 4.44 23l2.74-8.52L0 9.26h8.91z" fill="#00B67A" />
          </svg>
          {/* Google */}
          <svg width="14" height="14" viewBox="0 0 24 24" aria-label="Google Reviews">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {/* Yelp */}
          <svg width="14" height="16" viewBox="0 0 24 24" aria-label="Yelp">
            <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.768-4.076c.564-.83 1.868-.392 1.868.627v3.02c0 .24-.12.46-.32.594l-.145.032zm-7.664 3.31l4.67 2.293c.886.435.544 1.765-.49 1.904l-3.04.408c-.243.033-.49-.05-.668-.22l-.09-.09c-.26-.26-.33-.66-.168-1l1.75-3.59c.1-.2.036-.22.036-.22v.516zm-1.12-2.53l-3.34-3.71c-.63-.7-.03-1.8.86-1.57l2.62.68c.24.063.44.22.553.437l.07.14c.173.35.1.77-.18 1.04l-3.13 2.79c-.14.12.55.19.55.19zm-.61 1.75l-4.85 1.57c-.92.3-1.56-.85-.92-1.65l1.87-2.34c.15-.19.37-.31.61-.33l.16-.01c.39-.02.74.23.87.6l1.5 4.55s-.05-.13-.06-.14l.72-2.24zm1.93-12.38v5.16c0 1-.62 1.19-1.4.43L7.73 4.88c-.78-.76-.24-2.03.78-1.82l3.01.62c.243.05.45.2.57.41l.08.15c.15.3.12.66-.07.94l.57-1.44z" fill="#D32323" />
          </svg>
          {/* LinkedIn */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" aria-label="LinkedIn">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
