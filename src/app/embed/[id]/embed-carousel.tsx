"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Slide {
  slideNumber: number;
  heading: string;
  body: string;
  footer?: string;
}

interface Reviewer {
  name: string;
  title: string;
  company: string;
}

interface BrandKit {
  companyName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
}

interface EmbedData {
  id: string;
  slides: Slide[];
  hookLine: string;
  reviewer: Reviewer;
  reviewerPhotoUrl: string | null;
  brandKit: BrandKit;
}

export function EmbedCarousel({
  data,
  embedId,
}: {
  data: EmbedData;
  embedId: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const reviewer = data.reviewer;
  const brand = data.brandKit;
  const slides = data.slides;
  const primaryColor = brand?.primaryColor || "#2563EB";

  const goToNext = useCallback(() => {
    setSlideDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 300);
  }, [slides.length]);

  function goToPrev() {
    setSlideDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 300);
  }

  function goToSlide(index: number) {
    setSlideDirection(index > current ? "left" : "right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 300);
  }

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(goToNext, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, goToNext]);

  // Pause on hover
  function handleMouseEnter() {
    setPaused(true);
  }
  function handleMouseLeave() {
    setPaused(false);
  }

  // Auto-resize for iframe
  useEffect(() => {
    function sendHeight() {
      if (containerRef.current && window.parent !== window) {
        window.parent.postMessage(
          {
            type: "proofpost-resize",
            id: embedId,
            height: containerRef.current.scrollHeight,
          },
          "*"
        );
      }
    }
    sendHeight();
    const observer = new ResizeObserver(sendHeight);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [embedId, current]);

  function getInitials(name: string): string {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  // Animation styles
  const slideStyle: React.CSSProperties = {
    transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
    opacity: isAnimating ? 0 : 1,
    transform: isAnimating
      ? `translateX(${slideDirection === "left" ? "-30px" : "30px"})`
      : "translateX(0)",
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        position: "relative",
      }}
    >
      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.08)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          color: "#1a1a2e",
          zIndex: 10,
          opacity: 0,
          transition: "opacity 0.2s",
          backdropFilter: "blur(8px)",
        }}
        className="embed-nav"
      >
        ‹
      </button>
      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.08)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          color: "#1a1a2e",
          zIndex: 10,
          opacity: 0,
          transition: "opacity 0.2s",
          backdropFilter: "blur(8px)",
        }}
        className="embed-nav"
      >
        ›
      </button>

      {/* Card Content */}
      <div style={{ padding: "36px 36px 24px" }}>
        {/* Stars */}
        <div
          style={{
            display: "flex",
            gap: "3px",
            marginBottom: "24px",
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ fontSize: "18px", color: "#e2a84b" }}>
              ★
            </span>
          ))}
        </div>

        {/* Animated Quote */}
        <div style={{ ...slideStyle, position: "relative", minHeight: "80px", marginBottom: "28px" }}>
          <span
            style={{
              position: "absolute",
              top: "-16px",
              left: "-6px",
              fontSize: "72px",
              color: primaryColor,
              opacity: 0.12,
              lineHeight: 1,
              fontFamily: "Georgia, serif",
              pointerEvents: "none",
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.65,
              color: "#1a1a2e",
              margin: 0,
              paddingLeft: "4px",
              fontStyle: "italic",
              letterSpacing: "-0.01em",
            }}
          >
            {slides[current]?.body}
          </p>
        </div>

        {/* Animated Reviewer */}
        <div
          style={{
            ...slideStyle,
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {data.reviewerPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.reviewerPhotoUrl}
              alt={reviewer?.name}
              width={48}
              height={48}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${primaryColor}20`,
              }}
            />
          ) : (
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {getInitials(reviewer?.name || "C")}
            </div>
          )}
          <div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#1a1a2e",
                letterSpacing: "-0.01em",
              }}
            >
              {reviewer?.name || "Customer"}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7094", marginTop: "1px" }}>
              {[reviewer?.title, reviewer?.company]
                .filter(Boolean)
                .join(", ")}
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
          padding: "14px 36px",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          background: "#faf8f6",
        }}
      >
        {/* Dots + Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Navigation Dots */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  width: i === current ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  backgroundColor:
                    i === current ? primaryColor : "rgba(26,26,46,0.15)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
              />
            ))}
          </div>

          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              paddingLeft: "12px",
              borderLeft: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {brand?.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={brand.logoUrl}
                alt={brand.companyName}
                width={18}
                height={18}
                style={{ borderRadius: "4px", objectFit: "contain" }}
              />
            )}
            <span
              style={{ fontSize: "11px", fontWeight: 600, color: "#9a9ab0" }}
            >
              {brand?.companyName}
            </span>
          </div>
        </div>

        {/* Powered by */}
        <a
          href="https://proofpost-alpha.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "10px",
            color: "#bbb",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          ✦ ProofPost
        </a>
      </div>

      {/* CSS for hover nav arrows */}
      <style>{`
        div:hover .embed-nav { opacity: 1 !important; }
        .embed-nav:hover { background: rgba(255,255,255,1) !important; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  );
}
