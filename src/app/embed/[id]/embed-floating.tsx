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
  videoUrl?: string | null;
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

interface CustomStyle {
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  quoteColor?: string;
  fontFamily?: string;
  borderRadius?: number;
  showStars?: boolean;
  autoPlay?: boolean;
  animationSpeed?: number;
  floatingPosition?: "bottom-left" | "bottom-right";
}

export function EmbedFloating({
  data,
  embedId,
  customStyle,
}: {
  data: EmbedData;
  embedId: string;
  customStyle?: CustomStyle | Record<string, unknown> | null;
}) {
  const cs = (customStyle || {}) as CustomStyle;
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = cs.accentColor || brand?.primaryColor || "#10B981";
  const bgColor = cs.backgroundColor || "#ffffff";
  const textColor = cs.textColor || "#1e293b";
  const quoteColor = cs.quoteColor || "#334155";
  const fontFam = cs.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const showStars = cs.showStars !== false;
  const showWatermark = data.showWatermark !== false;
  const position = cs.floatingPosition || "bottom-left";
  const isLeft = position === "bottom-left";

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Track impression
  useEffect(() => {
    fetch(`/api/embed/${embedId}`).catch(() => {});
  }, [embedId]);

  // Auto-rotate
  useEffect(() => {
    if (dismissed || reviews.length <= 1) return;
    const speed = (cs.animationSpeed || 8) * 1000;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 300);
    }, speed);
    return () => clearInterval(interval);
  }, [dismissed, reviews.length, cs.animationSpeed]);

  // Notify parent iframe to resize
  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage(
        { type: "proofpost-floating", id: embedId, position, visible: visible && !dismissed },
        "*"
      );
    }
  }, [embedId, position, visible, dismissed]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
  }, []);

  function isRealPhoto(url: string | null | undefined): boolean {
    if (!url) return false;
    if (url.includes("default-avatar") || url.includes("placeholder")) return false;
    return url.startsWith("http");
  }

  if (reviews.length === 0 || dismissed || !visible) return null;

  const review = reviews[current];

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: "16px",
        [isLeft ? "left" : "right"]: "16px",
        zIndex: 9999,
        fontFamily: fontFam,
        maxWidth: "380px",
        width: "calc(100vw - 32px)",
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible && !dismissed ? 1 : 0,
        transform: visible && !dismissed ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: bgColor,
          borderRadius: "16px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleDismiss}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.06)",
            color: "#94a3b8",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{
          display: "flex",
          alignItems: "start",
          gap: "12px",
          padding: "16px 40px 12px 16px",
          transition: "opacity 0.3s ease",
          opacity: isAnimating ? 0 : 1,
        }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            {isRealPhoto(review.reviewerPhotoUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={review.reviewerPhotoUrl!}
                alt=""
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}44)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 700,
                color: primaryColor,
              }}>
                {review.reviewer.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ minWidth: 0, flex: 1 }}>
            {/* Stars */}
            {showStars && (
              <div style={{ display: "flex", gap: "1px", marginBottom: "6px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} style={{ color: "#F97316", fontSize: "13px", lineHeight: 1 }}>★</span>
                ))}
              </div>
            )}

            {/* Quote */}
            <p style={{
              fontSize: "13px",
              lineHeight: 1.5,
              color: quoteColor,
              margin: "0 0 8px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {review.quote}
            </p>

            {/* Reviewer */}
            <span style={{
              fontSize: "12px",
              fontWeight: 600,
              color: textColor,
            }}>
              {review.reviewer.name}
            </span>
            {(review.reviewer.title || review.reviewer.company) && (
              <span style={{
                fontSize: "11px",
                color: `${textColor}70`,
                marginLeft: "4px",
              }}>
                {review.reviewer.title}{review.reviewer.company ? `, ${review.reviewer.company}` : ""}
              </span>
            )}
          </div>
        </div>

        {/* Bottom bar: dots + watermark */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 16px 10px",
        }}>
          {/* Dots */}
          {reviews.length > 1 ? (
            <div style={{ display: "flex", gap: "4px" }}>
              {reviews.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === current ? "14px" : "5px",
                    height: "5px",
                    borderRadius: "3px",
                    backgroundColor: i === current ? primaryColor : "rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          ) : <div />}

          {/* Watermark */}
          {showWatermark && (
            <a
              href="https://proofpst.com?ref=floating"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "9px",
                color: "#cbd5e1",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              ✦ ProofPost
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
