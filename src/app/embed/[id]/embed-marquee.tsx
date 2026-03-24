"use client";

import { useEffect, useRef, useCallback } from "react";

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

function TestimonialCard({
  review,
  primaryColor,
}: {
  review: Review;
  primaryColor: string;
}) {
  return (
    <div
      style={{
        flex: "0 0 auto",
        width: "320px",
        padding: "24px",
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: "flex",
        flexDirection: "column" as const,
        gap: "16px",
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ fontSize: "14px", color: "#FBBF24" }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: "#334155",
          margin: 0,
          fontStyle: "italic",
          flex: 1,
        }}
      >
        &ldquo;{review.quote}&rdquo;
      </p>

      {/* Reviewer */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
            }}
          >
            {getInitials(review.reviewer.name)}
          </div>
        )}
        <div>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
            {review.reviewer.name}
          </div>
          <div style={{ fontSize: "11px", color: "#94a3b8" }}>
            {[review.reviewer.title, review.reviewer.company].filter(Boolean).join(", ")}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmbedMarquee({
  data,
  embedId,
}: {
  data: EmbedData;
  embedId: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = brand?.primaryColor || "#10B981";
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

  // Duplicate reviews for seamless loop (need at least enough to fill the viewport)
  const duped = [...reviews, ...reviews, ...reviews, ...reviews];

  // Split into two rows
  const mid = Math.ceil(reviews.length / 2);
  const row1Reviews = reviews.length >= 2
    ? [...reviews.slice(0, mid), ...reviews.slice(0, mid), ...reviews.slice(0, mid), ...reviews.slice(0, mid)]
    : duped;
  const row2Reviews = reviews.length >= 2
    ? [...reviews.slice(mid), ...reviews.slice(mid), ...reviews.slice(mid), ...reviews.slice(mid)]
    : duped;

  const speed = 40; // seconds for full loop

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: "hidden",
        position: "relative",
        padding: "24px 0",
      }}
    >
      {/* Row 1 - scrolls left */}
      <div
        className="marquee-row"
        style={{
          display: "flex",
          gap: "16px",
          width: "max-content",
          animation: `marquee-left ${speed}s linear infinite`,
          marginBottom: "16px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {row1Reviews.map((review, i) => (
          <TestimonialCard key={`r1-${i}`} review={review} primaryColor={primaryColor} />
        ))}
      </div>

      {/* Row 2 - scrolls right */}
      <div
        className="marquee-row"
        style={{
          display: "flex",
          gap: "16px",
          width: "max-content",
          animation: `marquee-right ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {row2Reviews.map((review, i) => (
          <TestimonialCard key={`r2-${i}`} review={review} primaryColor={primaryColor} />
        ))}
      </div>

      {/* Edge fade gradients */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "80px",
          height: "100%",
          background: "linear-gradient(to right, white 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "80px",
          height: "100%",
          background: "linear-gradient(to left, white 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

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
            href="https://proofpst.com?ref=marquee"
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
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
