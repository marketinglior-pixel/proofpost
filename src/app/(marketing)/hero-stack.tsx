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
    }, 400);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [goToNext]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div style={{ position: "relative", height: "280px" }}>
        {heroReviews.map((r, i) => {
          const offset = ((i - active + heroReviews.length) % heroReviews.length);
          const isActive = offset === 0;
          const isBehind1 = offset === 1;
          const isBehind2 = offset === 2;
          const isVisible = offset <= 2;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: "0",
                top: 0,
                transition: "all 0.5s ease-out",
                opacity: isActive ? (isAnimating ? 0 : 1) : isBehind1 ? 0.6 : isBehind2 ? 0.3 : 0,
                transform: isActive
                  ? "translateY(0) scale(1)"
                  : isBehind1
                    ? "translateY(8px) scale(0.97)"
                    : isBehind2
                      ? "translateY(16px) scale(0.94)"
                      : "translateY(24px) scale(0.91)",
                zIndex: isVisible ? (3 - offset) : 0,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <div
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(226,232,240,0.8)",
                  background: "#fff",
                  padding: "28px 24px",
                  boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ fontSize: "14px", color: "#FBBF24" }}>★</span>
                  ))}
                </div>
                {/* Quote */}
                <span style={{ fontSize: "48px", lineHeight: "0.5", color: "#10B981", opacity: 0.15, fontFamily: "Georgia, serif" }}>&ldquo;</span>
                <p style={{ fontSize: "15px", lineHeight: 1.625, color: "#334155", fontStyle: "italic", margin: "4px 0 0", minHeight: "48px" }}>
                  {r.quote}
                </p>
                {/* Reviewer */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.photo} alt="" width={40} height={40} style={{ borderRadius: "50%", objectFit: "cover", width: "40px", height: "40px" }} />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{r.name}</div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>{r.title}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{ height: "2px", background: "rgba(241,245,249,1)", overflow: "hidden", borderRadius: "1px", marginTop: "12px" }}>
        <div
          key={active}
          style={{
            height: "100%",
            backgroundColor: "#10B981",
            opacity: 0.4,
            animation: "hero-stack-progress 4s linear forwards",
            width: "0%",
          }}
        />
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "10px" }}>
        {heroReviews.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIsAnimating(true); setTimeout(() => { setActive(i); setIsAnimating(false); }, 400); }}
            style={{
              width: i === active ? "18px" : "6px",
              height: "6px",
              borderRadius: "3px",
              backgroundColor: i === active ? "#10B981" : "rgba(15,23,42,0.12)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes hero-stack-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
