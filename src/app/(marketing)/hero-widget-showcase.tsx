"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { RotateCw, MoveHorizontal, LayoutGrid, Layers, Paintbrush } from "lucide-react";
import { HeroCarousel } from "./hero-carousel";
import { HeroMarquee } from "./hero-marquee";
import { HeroGrid } from "./hero-grid";
import { HeroStack } from "./hero-stack";
import { HeroBuilderDemo } from "./hero-builder-demo";

const widgetTypes = [
  { key: "carousel", label: "Carousel", icon: RotateCw },
  { key: "marquee", label: "Marquee", icon: MoveHorizontal },
  { key: "grid", label: "Grid", icon: LayoutGrid },
  { key: "stack", label: "Stack", icon: Layers },
  { key: "builder", label: "Builder", icon: Paintbrush },
] as const;

export function HeroWidgetShowcase() {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIdx, setNextIdx] = useState(0);
  const pauseRef = useRef(false);
  const lastInteraction = useRef(0);

  const switchTo = useCallback(
    (idx: number) => {
      if (idx === active && !isTransitioning) return;
      setIsTransitioning(true);
      setNextIdx(idx);
      setTimeout(() => {
        setActive(idx);
        setIsTransitioning(false);
      }, 300);
    },
    [active, isTransitioning]
  );

  const handleTabClick = useCallback(
    (idx: number) => {
      lastInteraction.current = Date.now();
      switchTo(idx);
    },
    [switchTo]
  );

  // Auto-rotate every 8s, pause on hover or after manual interaction
  useEffect(() => {
    const timer = setInterval(() => {
      if (pauseRef.current) return;
      if (Date.now() - lastInteraction.current < 8000) return;
      setIsTransitioning(true);
      const next = (active + 1) % widgetTypes.length;
      setNextIdx(next);
      setTimeout(() => {
        setActive(next);
        setIsTransitioning(false);
      }, 300);
    }, 8000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div
      className="flex flex-col items-center gap-4"
      onMouseEnter={() => { pauseRef.current = true; }}
      onMouseLeave={() => { pauseRef.current = false; }}
    >
      {/* Social proof sources */}
      <div className="flex items-center justify-center gap-5 opacity-40">
        {/* G2 */}
        <svg width="22" height="22" viewBox="0 0 24 24" aria-label="G2"><circle cx="12" cy="12" r="11" fill="#FF492C"/><text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="system-ui">G2</text></svg>
        {/* LinkedIn */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        {/* Facebook */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" aria-label="Facebook"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        {/* X */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000" aria-label="X"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        {/* Reddit */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF4500" aria-label="Reddit"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
        {/* Trustpilot */}
        <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Trustpilot"><path d="M12 0l3.09 9.26H24l-7.18 5.22 2.74 8.52L12 17.77 4.44 23l2.74-8.52L0 9.26h8.91z" fill="#00B67A"/></svg>
        {/* Google */}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Google"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1.5 p-1 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-sm">
        {widgetTypes.map((wt, i) => {
          const Icon = wt.icon;
          const isActive = i === active;
          return (
            <button
              key={wt.key}
              onClick={() => handleTabClick(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-emerald text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="w-3 h-3" />
              <span className="hidden sm:inline">{wt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Widget demo area */}
      <div className="w-full min-h-[300px] flex items-start justify-center">
        <div
          className="w-full transition-opacity duration-300"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          {active === 0 && <HeroCarousel />}
          {active === 1 && <HeroMarquee />}
          {active === 2 && <HeroGrid />}
          {active === 3 && <HeroStack />}
          {active === 4 && <HeroBuilderDemo />}
        </div>
      </div>
    </div>
  );
}
