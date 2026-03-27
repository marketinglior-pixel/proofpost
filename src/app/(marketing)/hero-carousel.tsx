"use client";

import { useState, useEffect, useCallback } from "react";
import { heroReviews } from "./hero-reviews";

const reviews = heroReviews;

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
        style={{
          borderRadius: "16px",
          border: "1px solid rgba(226,232,240,0.8)",
          background: "#fff",
          boxShadow: "0 25px 50px -12px rgba(148,163,184,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Card */}
        <div style={{ padding: "36px 28px 20px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {/* Quote mark */}
          <span
            style={{ fontSize: "56px", lineHeight: "0.5", color: "#10B981", opacity: 0.15, fontFamily: "Georgia, serif", marginBottom: "8px" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Quote */}
          <p
            style={{
              fontSize: "15px",
              lineHeight: 1.625,
              color: "#334155",
              fontStyle: "italic",
              minHeight: "48px",
              margin: 0,
              transition: "opacity 0.3s ease",
              opacity: isAnimating ? 0 : 1,
            }}
          >
            {r.quote}
          </p>

          {/* Reviewer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "16px",
              transition: "opacity 0.3s ease",
              opacity: isAnimating ? 0 : 1,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={r.photo}
              alt=""
              width={40}
              height={40}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>{r.name}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>{r.title}</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 28px",
            borderTop: "1px solid rgba(241,245,249,1)",
            background: "rgba(248,250,252,0.5)",
          }}
        >
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIsAnimating(true); setTimeout(() => { setCurrent(i); setIsAnimating(false); }, 300); }}
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor: i === current ? "#10B981" : "rgba(15,23,42,0.12)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
          <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 500, display: "flex", alignItems: "center", gap: "3px" }}>
            <span style={{ fontSize: "8px" }}>✦</span> ProofPost Widget
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: "2px", background: "rgba(241,245,249,1)", overflow: "hidden" }}>
          <div
            key={current}
            style={{
              height: "100%",
              backgroundColor: "#10B981",
              opacity: 0.4,
              animation: "hero-progress 3.5s linear forwards",
              width: "0%",
            }}
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
