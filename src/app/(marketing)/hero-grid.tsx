"use client";

import { heroReviews } from "./hero-reviews";

function GridCard({
  quote,
  name,
  title,
  photo,
}: typeof heroReviews[number]) {
  return (
    <div
      style={{
        padding: "12px",
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ fontSize: "11px", color: "#FBBF24" }}>
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <div>
        <span
          style={{
            fontSize: "18px",
            lineHeight: "0.8",
            color: "#10B981",
            opacity: 0.2,
            fontFamily: "Georgia, serif",
          }}
        >
          &ldquo;
        </span>
        <p
          style={{
            fontSize: "11.5px",
            lineHeight: 1.65,
            color: "#334155",
            margin: "2px 0 0",
            fontStyle: "italic",
          }}
        >
          {quote}
        </p>
      </div>

      {/* Reviewer */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt=""
          width={28}
          height={28}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            width: "28px",
            height: "28px",
            minWidth: "28px",
            minHeight: "28px",
          }}
        />
        <div>
          <div
            style={{ fontSize: "10.5px", fontWeight: 600, color: "#0f172a" }}
          >
            {name}
          </div>
          <div style={{ fontSize: "9px", color: "#94a3b8" }}>{title}</div>
        </div>
      </div>
    </div>
  );
}

export function HeroGrid() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          gridAutoRows: "auto",
        }}
      >
        {heroReviews.map((r, i) => (
          <GridCard key={i} {...r} />
        ))}
      </div>
    </div>
  );
}
