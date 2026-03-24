"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Review {
  id: string;
  hookLine: string;
  quote: string;
  reviewer: {
    name: string;
    title: string;
    company: string;
  };
  reviewerPhotoUrl: string | null;
}

interface BrandKit {
  companyName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
}

interface EmbedData {
  type: "widget" | "single";
  id: string;
  reviews: Review[];
  brandKit: BrandKit | null;
  showWatermark?: boolean;
  limitReached?: boolean;
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
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = brand?.primaryColor || "#10B981";
  const showWatermark = data.showWatermark !== false;
  const limitReached = data.limitReached === true;

  const goToNext = useCallback(() => {
    if (reviews.length <= 1) return;
    setDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
      setIsAnimating(false);
    }, 350);
  }, [reviews.length]);

  function goToSlide(index: number) {
    if (index === current) return;
    setDirection(index > current ? "left" : "right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 350);
  }

  // Track impression on mount (client-side only)
  useEffect(() => {
    fetch(`/api/embed/${embedId}`).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, [paused, goToNext, reviews.length]);

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

  function isRealPhoto(url: string | null | undefined): boolean {
    if (!url) return false;
    // Filter out generic LinkedIn/platform default avatars
    if (url.includes("static.licdn.com/aero")) return false;
    if (url.includes("default-avatar")) return false;
    if (url.includes("placeholder")) return false;
    if (url.includes("/sc/h/")) return false;
    // Must be a reasonable image URL
    return url.startsWith("http");
  }

  if (reviews.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999" }}>
        No reviews yet
      </div>
    );
  }

  const review = reviews[current];

  const animStyle: React.CSSProperties = {
    transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isAnimating ? 0 : 1,
    transform: isAnimating
      ? `translateX(${direction === "left" ? "-40px" : "40px"})`
      : "translateX(0)",
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Content */}
      <div
        style={{
          padding: "48px 48px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Quote mark */}
        <span
          style={{
            fontSize: "72px",
            color: primaryColor,
            opacity: 0.15,
            lineHeight: 0.6,
            fontFamily: "Georgia, serif",
            marginBottom: "8px",
          }}
        >
          &ldquo;
        </span>

        {/* Animated Quote */}
        <div
          style={{
            ...animStyle,
            minHeight: "80px",
            marginBottom: "28px",
            maxWidth: "440px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.75,
              color: "#1a1a2e",
              margin: 0,
              fontStyle: "italic",
            }}
          >
            {review.quote}
          </p>
        </div>

        {/* Stars */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "24px",
            ...animStyle,
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ fontSize: "16px", color: "#e2a84b" }}>
              ★
            </span>
          ))}
        </div>

        {/* Animated Reviewer */}
        <div
          style={{
            ...animStyle,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {isRealPhoto(review.reviewerPhotoUrl) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.reviewerPhotoUrl!}
              alt={review.reviewer.name}
              width={56}
              height={56}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: `3px solid ${primaryColor}25`,
              }}
            />
          ) : (
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {getInitials(review.reviewer.name)}
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "15px", fontWeight: 600, color: "#1a1a2e" }}
            >
              {review.reviewer.name}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7094", marginTop: "3px" }}>
              {[review.reviewer.title, review.reviewer.company]
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Dots */}
          {reviews.length > 1 && (
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {reviews.map((_, i) => (
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
                    transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              paddingLeft: reviews.length > 1 ? "12px" : "0",
              borderLeft:
                reviews.length > 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
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

        {showWatermark ? (
          <a
            href="https://proofpst.com?ref=widget"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              color: "#10B981",
              textDecoration: "none",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "8px" }}>✦</span> Powered by ProofPost
          </a>
        ) : (
          <a
            href="https://proofpst.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "10px", color: "#ccc", textDecoration: "none" }}
          >
            ✦ ProofPost
          </a>
        )}
      </div>

      {/* Progress bar */}
      {reviews.length > 1 && (
        <div
          style={{
            height: "2px",
            background: "rgba(0,0,0,0.03)",
            overflow: "hidden",
          }}
        >
          <div
            key={current}
            style={{
              height: "100%",
              backgroundColor: primaryColor,
              animation: paused ? "none" : "pp-progress 5s linear forwards",
              width: "0%",
              opacity: 0.5,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes pp-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
