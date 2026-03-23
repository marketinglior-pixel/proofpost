"use client";

import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    quote:
      "We switched from HubSpot 6 months ago and it's been a game-changer. Our sales reps are actually logging calls now. We closed 23% more deals last quarter.",
    name: "Sarah Chen",
    title: "VP Sales",
    company: "TechFlow",
    initials: "SC",
    color: "#7c3aed",
  },
  {
    quote:
      "I was skeptical at first, but within two weeks our pipeline accuracy went from 40% to 92%. The team finally trusts the data. That alone was worth switching.",
    name: "Marcus Johnson",
    title: "Head of Revenue",
    company: "Beacon AI",
    initials: "MJ",
    color: "#2563eb",
  },
  {
    quote:
      "We tried 4 CRMs before this one. The onboarding took 2 days, not 2 months. Our AEs actually asked if they could use it more. Never happened before.",
    name: "Priya Patel",
    title: "CRO",
    company: "ScaleStack",
    initials: "PP",
    color: "#059669",
  },
  {
    quote:
      "Reduced our sales cycle from 45 days to 28 days. Not because the tool is magic, but because reps stopped wasting time on data entry and started selling.",
    name: "Tom Andersson",
    title: "Sales Director",
    company: "NordCloud",
    initials: "TA",
    color: "#dc2626",
  },
  {
    quote:
      "Our board asked what changed in Q3. The answer was embarrassingly simple: we switched CRMs and people actually used it. Revenue up 31%.",
    name: "Lisa Wang",
    title: "CEO",
    company: "Momentic",
    initials: "LW",
    color: "#d97706",
  },
];

export function DemoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [paused, setPaused] = useState(false);

  const goToNext = useCallback(() => {
    setDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setIsAnimating(false);
    }, 350);
  }, []);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [paused, goToNext]);

  function goToSlide(index: number) {
    if (index === current) return;
    setDirection(index > current ? "left" : "right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 350);
  }

  const t = testimonials[current];

  const animStyle: React.CSSProperties = {
    transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isAnimating ? 0 : 1,
    transform: isAnimating
      ? `translateX(${direction === "left" ? "-40px" : "40px"})`
      : "translateX(0)",
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        background: "#fff",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Content */}
      <div style={{ padding: "40px 40px 28px" }}>
        {/* Stars */}
        <div style={{ display: "flex", gap: "3px", marginBottom: "28px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ fontSize: "19px", color: "#e2a84b" }}>
              ★
            </span>
          ))}
        </div>

        {/* Animated Quote */}
        <div
          style={{
            ...animStyle,
            position: "relative",
            minHeight: "110px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-20px",
              left: "-8px",
              fontSize: "80px",
              color: t.color,
              opacity: 0.1,
              lineHeight: 1,
              fontFamily: "Georgia, serif",
              pointerEvents: "none",
              transition: "color 0.45s ease",
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.7,
              color: "#1a1a2e",
              margin: 0,
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            {t.quote}
          </p>
        </div>

        {/* Animated Reviewer */}
        <div
          style={{
            ...animStyle,
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)`,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "17px",
              fontWeight: 700,
              flexShrink: 0,
              transition: "background 0.45s ease",
            }}
          >
            {t.initials}
          </div>
          <div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#1a1a2e",
              }}
            >
              {t.name}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#6b7094",
                marginTop: "2px",
              }}
            >
              {t.title}, {t.company}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 40px",
          borderTop: "1px solid rgba(0,0,0,0.04)",
          background: "#faf9f7",
        }}
      >
        {/* Dots + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  width: i === current ? "28px" : "7px",
                  height: "7px",
                  borderRadius: "4px",
                  backgroundColor:
                    i === current
                      ? testimonials[current].color
                      : "rgba(26,26,46,0.12)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              paddingLeft: "16px",
              borderLeft: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "4px",
                background:
                  "linear-gradient(135deg, #7c3aed, #9333ea)",
              }}
            />
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: "#aaa",
              }}
            >
              AcmeSaaS
            </span>
          </div>
        </div>

        <a
          href="https://proofpost-alpha.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "10px",
            color: "#ccc",
            textDecoration: "none",
          }}
        >
          ✦ ProofPost
        </a>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: "2px",
          background: "rgba(0,0,0,0.03)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          key={current}
          style={{
            height: "100%",
            backgroundColor: t.color,
            animation: paused ? "none" : "progress 4s linear forwards",
            width: "0%",
            opacity: 0.6,
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
