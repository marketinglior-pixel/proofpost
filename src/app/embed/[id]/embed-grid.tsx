"use client";

import { useEffect, useRef, useCallback } from "react";
import { EmbedVideoPlayer } from "./embed-video-player";

interface HookVariant {
  id: string;
  text: string;
  context: string;
}

interface Review {
  id: string;
  hookLine: string;
  hookVariants?: HookVariant[];
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

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function isRealPhoto(url: string | null | undefined): boolean {
  if (!url) return false;
  if (url.includes("static.licdn.com/aero")) return false;
  if (url.includes("default-avatar")) return false;
  if (url.includes("placeholder")) return false;
  if (url.includes("/sc/h/")) return false;
  return url.startsWith("http");
}

interface CustomStyle {
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  quoteColor?: string;
  fontFamily?: string;
  borderRadius?: number;
  showStars?: boolean;
  showTitle?: boolean;
  showCompany?: boolean;
  showAvatar?: boolean;
}

function isReviewRTL(r: Review): boolean {
  return /[\u0590-\u05FF\u0600-\u06FF]/.test(r.quote + r.hookLine);
}

function GridCard({
  review,
  primaryColor,
  cs,
}: {
  review: Review;
  primaryColor: string;
  cs: CustomStyle;
}) {
  const rtl = isReviewRTL(review);
  const bgColor = cs.backgroundColor || "#fff";
  const textColor = cs.textColor || "#334155";
  const quoteColor = cs.quoteColor || "#334155";
  const fontFam = cs.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const radius = cs.borderRadius !== undefined ? `${cs.borderRadius}px` : "16px";

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      style={{
        padding: "24px",
        background: bgColor,
        borderRadius: radius,
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        fontFamily: fontFam,
        display: "flex",
        flexDirection: "column" as const,
        gap: "16px",
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
      {/* Video player */}
      {review.videoUrl && (
        <EmbedVideoPlayer videoUrl={review.videoUrl} accentColor={primaryColor} />
      )}

      {/* Stars */}
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ fontSize: "14px", color: "#FBBF24" }}>&#9733;</span>
        ))}
      </div>

      {/* Quote */}
      {(!review.videoUrl || (review.quote && review.quote !== "Video testimonial")) && (
        <div style={{ flex: 1 }}>
          {!review.videoUrl && (
            <span
              style={{
                fontSize: "28px",
                lineHeight: "0.8",
                color: primaryColor,
                opacity: 0.2,
                fontFamily: "Georgia, serif",
              }}
            >
              &ldquo;
            </span>
          )}
          <p
            dir={rtl ? "rtl" : "ltr"}
            style={{
              fontSize: "14px",
              lineHeight: 1.65,
              color: quoteColor,
              margin: "4px 0 0",
              fontStyle: "italic",
              direction: rtl ? "rtl" : "ltr",
            }}
          >
            {review.quote}
          </p>
        </div>
      )}

      {/* Reviewer */}
      <div dir="ltr" style={{ display: "flex", alignItems: "center", gap: "10px", direction: "ltr" }}>
        {isRealPhoto(review.reviewerPhotoUrl) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.reviewerPhotoUrl!}
            alt=""
            width={36}
            height={36}
            style={{
              borderRadius: "50%",
              objectFit: "cover" as const,
              width: "36px",
              height: "36px",
              minWidth: "36px",
              minHeight: "36px",
              maxWidth: "36px",
              maxHeight: "36px",
            }}
          />
        ) : (
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {getInitials(review.reviewer.name)}
          </div>
        )}
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: textColor }}>
            {review.reviewer.name}
          </div>
          <div style={{ fontSize: "11px", color: `${textColor}80` }}>
            {[
              cs.showTitle !== false ? review.reviewer.title : null,
              cs.showCompany !== false ? review.reviewer.company : null,
            ].filter(Boolean).join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmbedGrid({
  data,
  embedId,
  customStyle,
}: {
  data: EmbedData;
  embedId: string;
  customStyle?: CustomStyle | Record<string, unknown> | null;
}) {
  const cs = (customStyle || {}) as CustomStyle;
  const containerRef = useRef<HTMLDivElement>(null);
  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = cs.accentColor || brand?.primaryColor || "#10B981";
  const showWatermark = data.showWatermark !== false;

  // A/B Testing
  const selectedVariants = useRef<Record<string, string>>({});
  const getActiveHook = useCallback((review: Review): { variantId: string } => {
    const variants = review.hookVariants || [];
    if (variants.length === 0) return { variantId: "default" };
    if (!selectedVariants.current[review.id]) {
      const idx = Math.floor(Math.random() * variants.length);
      selectedVariants.current[review.id] = variants[idx].id;
    }
    return { variantId: selectedVariants.current[review.id] };
  }, []);

  // Track impression on mount
  useEffect(() => {
    fetch(`/api/embed/${embedId}`).catch(() => {});
    if (reviews.length > 0) {
      const { variantId } = getActiveHook(reviews[0]);
      fetch("/api/hook-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: reviews[0].id,
          widgetId: data.type === "widget" ? data.id : null,
          hookVariantId: variantId,
          eventType: "impression",
        }),
      }).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, [embedId]);

  if (reviews.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999", fontFamily: "system-ui" }}>
        No reviews yet
      </div>
    );
  }

  // Determine grid columns based on review count
  const cols = reviews.length <= 2 ? reviews.length : reviews.length <= 4 ? 2 : 3;

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: "16px",
      }}
    >
      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "16px",
          gridAutoRows: "auto",
        }}
      >
        {reviews.map((review, i) => (
          <GridCard
            key={review.id}
            review={review}
            primaryColor={primaryColor}
            cs={cs}
          />
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 0 0",
          gap: "8px",
        }}
      >
        {showWatermark ? (
          <a
            href="https://proofpst.com?ref=grid"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "11px",
              color: primaryColor,
              textDecoration: "none",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "8px" }}>✦</span> ProofPost Widget
          </a>
        ) : (
          <a
            href="https://proofpst.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "10px", color: "#cbd5e1", textDecoration: "none" }}
          >
            ✦ ProofPost
          </a>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
