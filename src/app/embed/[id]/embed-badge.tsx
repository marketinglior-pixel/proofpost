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
  shadowStyle?: "none" | "subtle" | "elevated";
  showStars?: boolean;
  showTitle?: boolean;
  showCompany?: boolean;
  showAvatar?: boolean;
  autoPlay?: boolean;
  animationSpeed?: number;
  direction?: "ltr" | "rtl" | "auto";
  badgePosition?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

function getShadow(style: string): string {
  switch (style) {
    case "none": return "none";
    case "subtle": return "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)";
    case "elevated": return "0 25px 50px -12px rgba(148,163,184,0.15)";
    default: return "0 4px 24px rgba(0,0,0,0.12)";
  }
}

export function EmbedBadge({
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
  const [expanded, setExpanded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = cs.accentColor || brand?.primaryColor || "#10B981";
  const bgColor = cs.backgroundColor || "#fff";
  const textColor = cs.textColor || "#334155";
  const quoteColor = cs.quoteColor || "#334155";
  const fontFam = cs.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const showStars = cs.showStars !== false;
  const showTitle = cs.showTitle !== false;
  const showCompany = cs.showCompany !== false;
  const showAvatar = cs.showAvatar !== false;
  const showWatermark = data.showWatermark !== false;
  const position = cs.badgePosition || "bottom-left";

  // Calculate average rating (all reviews are 5-star in ProofPost)
  const avgRating = 5.0;
  const reviewCount = reviews.length;

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Track impression on mount
  useEffect(() => {
    fetch(`/api/embed/${embedId}`).catch(() => {});
  }, [embedId]);

  // Auto-resize for iframe
  useEffect(() => {
    function sendHeight() {
      if (containerRef.current && window.parent !== window) {
        window.parent.postMessage(
          { type: "proofpost-resize", id: embedId, height: containerRef.current.scrollHeight },
          "*"
        );
      }
    }
    sendHeight();
    const observer = new ResizeObserver(sendHeight);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [embedId, expanded]);

  const goTo = useCallback((idx: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 250);
  }, []);

  const goNext = useCallback(() => {
    if (reviews.length <= 1) return;
    goTo((current + 1) % reviews.length);
  }, [current, reviews.length, goTo]);

  const goPrev = useCallback(() => {
    if (reviews.length <= 1) return;
    goTo((current - 1 + reviews.length) % reviews.length);
  }, [current, reviews.length, goTo]);

  function isRealPhoto(url: string | null | undefined): boolean {
    if (!url) return false;
    if (url.includes("static.licdn.com/aero")) return false;
    if (url.includes("default-avatar")) return false;
    if (url.includes("placeholder")) return false;
    if (url.includes("/sc/h/")) return false;
    return url.startsWith("http");
  }

  function getInitials(name: string): string {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  }

  if (reviews.length === 0) return null;

  // Position styles
  const positionStyles: Record<string, React.CSSProperties> = {
    "bottom-left": { bottom: "16px", left: "16px" },
    "bottom-right": { bottom: "16px", right: "16px" },
    "top-left": { top: "16px", left: "16px" },
    "top-right": { top: "16px", right: "16px" },
  };

  const isBottom = position.startsWith("bottom");
  const review = reviews[current];

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        ...positionStyles[position],
        zIndex: 9999,
        fontFamily: fontFam,
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : isBottom ? "translateY(16px)" : "translateY(-16px)",
      }}
    >
      {/* Expanded mini-carousel */}
      {expanded && (
        <div
          style={{
            position: "absolute",
            [isBottom ? "bottom" : "top"]: "100%",
            left: position.endsWith("left") ? "0" : "auto",
            right: position.endsWith("right") ? "0" : "auto",
            marginBottom: isBottom ? "8px" : undefined,
            marginTop: !isBottom ? "8px" : undefined,
            width: "320px",
            backgroundColor: bgColor,
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
            overflow: "hidden",
            animation: "pp-badge-expand 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              border: "none",
              background: "rgba(0,0,0,0.06)",
              color: textColor,
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

          {/* Review card */}
          <div style={{
            padding: "24px 20px 16px",
            textAlign: "center",
            transition: "opacity 0.25s ease",
            opacity: isAnimating ? 0 : 1,
          }}>
            {/* Stars */}
            {showStars && (
              <div style={{ display: "flex", justifyContent: "center", gap: "2px", marginBottom: "12px" }}>
                {[1,2,3,4,5].map((i) => (
                  <span key={i} style={{ color: "#FBBF24", fontSize: "14px" }}>★</span>
                ))}
              </div>
            )}

            {/* Quote */}
            <p style={{
              fontSize: "14px",
              lineHeight: 1.6,
              color: quoteColor,
              fontStyle: "italic",
              margin: "0 0 16px",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              &ldquo;{review.quote}&rdquo;
            </p>

            {/* Reviewer */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}>
              {showAvatar && (
                isRealPhoto(review.reviewerPhotoUrl) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={review.reviewerPhotoUrl!}
                    alt=""
                    width={32}
                    height={32}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}>
                    {getInitials(review.reviewer.name)}
                  </div>
                )
              )}
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: textColor }}>
                  {review.reviewer.name}
                </div>
                {(showTitle || showCompany) && (
                  <div style={{ fontSize: "10px", color: `${textColor}80` }}>
                    {[
                      showTitle ? review.reviewer.title : null,
                      showCompany ? review.reviewer.company : null,
                    ].filter(Boolean).join(", ")}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          {reviews.length > 1 && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 16px",
              borderTop: "1px solid rgba(241,245,249,1)",
              background: "rgba(248,250,252,0.5)",
            }}>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: primaryColor,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  lineHeight: 1,
                }}
              >
                ‹
              </button>
              <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                {reviews.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === current ? "16px" : "5px",
                      height: "5px",
                      borderRadius: "3px",
                      backgroundColor: i === current ? primaryColor : "rgba(15,23,42,0.12)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: primaryColor,
                  padding: "4px 8px",
                  borderRadius: "6px",
                  lineHeight: 1,
                }}
              >
                ›
              </button>
            </div>
          )}

          {/* Watermark */}
          <div style={{
            padding: "6px 16px",
            borderTop: reviews.length > 1 ? "none" : "1px solid rgba(241,245,249,1)",
            textAlign: "center",
          }}>
            {showWatermark ? (
              <a
                href="https://proofpst.com?ref=badge"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "9px",
                  color: primaryColor,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ✦ ProofPost Widget
              </a>
            ) : (
              <a
                href="https://proofpst.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "9px", color: "#cbd5e1", textDecoration: "none" }}
              >
                ✦ ProofPost
              </a>
            )}
          </div>
        </div>
      )}

      {/* Badge pill */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 16px",
          backgroundColor: bgColor,
          borderRadius: "9999px",
          border: "1px solid rgba(226,232,240,0.8)",
          boxShadow: getShadow(cs.shadowStyle || "elevated"),
          cursor: "pointer",
          fontFamily: fontFam,
          transition: "box-shadow 0.2s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)";
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = getShadow(cs.shadowStyle || "elevated");
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {/* Stars */}
        {showStars && (
          <div style={{ display: "flex", gap: "1px" }}>
            {[1,2,3,4,5].map((i) => (
              <span key={i} style={{ color: "#FBBF24", fontSize: "12px", lineHeight: 1 }}>★</span>
            ))}
          </div>
        )}

        {/* Rating number */}
        <span style={{ fontSize: "14px", fontWeight: 700, color: textColor, lineHeight: 1 }}>
          {avgRating.toFixed(1)}
        </span>

        {/* Divider */}
        <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(226,232,240,0.8)" }} />

        {/* Review count */}
        <span style={{ fontSize: "12px", color: `${textColor}80`, lineHeight: 1, whiteSpace: "nowrap" }}>
          from {reviewCount} review{reviewCount !== 1 ? "s" : ""}
        </span>
      </button>

      <style>{`
        @keyframes pp-badge-expand {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(${isBottom ? "8px" : "-8px"});
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
