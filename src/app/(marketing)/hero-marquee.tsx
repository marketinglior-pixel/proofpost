"use client";

import { heroReviews } from "./hero-reviews";

function MarqueeCard({ quote, name, title, photo }: typeof heroReviews[number]) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "320px",
        borderRadius: "16px",
        border: "1px solid rgba(226,232,240,0.8)",
        background: "#fff",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ fontSize: "14px", color: "#FBBF24" }}>★</span>
        ))}
      </div>
      {/* Quote */}
      <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#334155", fontStyle: "italic", marginBottom: "14px", margin: "0 0 14px 0" }}>
        &ldquo;{quote}&rdquo;
      </p>
      {/* Reviewer */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={36} height={36} style={{ borderRadius: "50%", objectFit: "cover", width: "36px", height: "36px" }} />
        <div>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: 0 }}>{name}</p>
          <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{title}</p>
        </div>
      </div>
    </div>
  );
}

export function HeroMarquee() {
  // Quadruple for seamless loop
  const items = [...heroReviews, ...heroReviews, ...heroReviews, ...heroReviews];

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden relative">
      {/* Edge fades */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #F8FAFC, transparent)", zIndex: 10, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #F8FAFC, transparent)", zIndex: 10, pointerEvents: "none" }} />

      <div className="flex gap-4 hero-marquee-scroll hover:[animation-play-state:paused]">
        {items.map((r, i) => (
          <MarqueeCard key={i} {...r} />
        ))}
      </div>

      <style>{`
        .hero-marquee-scroll {
          animation: hero-marquee-slide 25s linear infinite;
        }
        @keyframes hero-marquee-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
