"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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
  autoPlay?: boolean;
  animationSpeed?: number;
}

function isRealPhoto(url: string | null | undefined): boolean {
  if (!url) return false;
  if (url.includes("static.licdn.com/aero")) return false;
  if (url.includes("default-avatar")) return false;
  if (url.includes("placeholder")) return false;
  if (url.includes("/sc/h/")) return false;
  return url.startsWith("http");
}

function isReviewRTL(r: Review): boolean {
  return /[\u0590-\u05FF\u0600-\u06FF]/.test(r.quote + r.hookLine);
}

export function EmbedStack({
  data,
  embedId,
  customStyle,
}: {
  data: EmbedData;
  embedId: string;
  customStyle?: CustomStyle | Record<string, unknown> | null;
}) {
  const cs = (customStyle || {}) as CustomStyle;
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = cs.accentColor || brand?.primaryColor || "#10B981";
  const bgColor = cs.backgroundColor || "#fff";
  const textColor = cs.textColor || "#334155";
  const quoteColor = cs.quoteColor || "#334155";
  const fontFam = cs.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const borderRad = cs.borderRadius !== undefined ? `${cs.borderRadius}px` : "16px";
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

  const trackHookEvent = useCallback((review: Review, eventType: "impression" | "click") => {
    const { variantId } = getActiveHook(review);
    fetch("/api/hook-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contentId: review.id,
        widgetId: data.type === "widget" ? data.id : null,
        hookVariantId: variantId,
        eventType,
      }),
    }).catch(() => {});
  }, [data.type, data.id, getActiveHook]);

  const goToNext = useCallback(() => {
    if (reviews.length <= 1) return;
    setIsAnimating(true);
    setTimeout(() => {
      const nextIdx = (active + 1) % reviews.length;
      setActive(nextIdx);
      setIsAnimating(false);
      trackHookEvent(reviews[nextIdx], "impression");
    }, 400);
  }, [reviews, active, trackHookEvent]);

  const goToPrev = useCallback(() => {
    if (reviews.length <= 1) return;
    setIsAnimating(true);
    setTimeout(() => {
      const prevIdx = (active - 1 + reviews.length) % reviews.length;
      setActive(prevIdx);
      setIsAnimating(false);
      trackHookEvent(reviews[prevIdx], "impression");
    }, 400);
  }, [reviews, active, trackHookEvent]);

  // Track impression on mount
  useEffect(() => {
    fetch(`/api/embed/${embedId}`).catch(() => {});
    if (reviews.length > 0) {
      trackHookEvent(reviews[0], "impression");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-advance every 4s
  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const timer = setInterval(goToNext, 4000);
    return () => clearInterval(timer);
  }, [paused, goToNext, reviews.length]);

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
  }, [embedId, active]);

  if (reviews.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999", fontFamily: "system-ui, sans-serif" }}>
        No reviews yet
      </div>
    );
  }

  const review = reviews[active];
  const currentRTL = isReviewRTL(review);

  // Deterministic rotation for each card in the stack
  const getRotation = (index: number) => {
    const offsets = [-3, 2, -1.5, 3.5, -2.5];
    return offsets[index % offsets.length];
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: "480px",
        margin: "0 auto",
        padding: "24px 16px 12px",
      }}
    >
      {/* Card stack area */}
      <div
        style={{
          position: "relative",
          height: "280px",
          marginBottom: "20px",
        }}
      >
        {/* Background stacked cards (up to 2 behind) */}
        {reviews.length > 1 && reviews.map((_, i) => {
          const offset = ((i - active + reviews.length) % reviews.length);
          if (offset === 0 || offset > 2) return null;

          return (
            <div
              key={`bg-${i}`}
              style={{
                position: "absolute",
                inset: "0",
                background: bgColor,
                borderRadius: borderRad,
                border: "1px solid rgba(226,232,240,0.6)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                transform: `translateY(${offset * 8}px) scale(${1 - offset * 0.03}) rotate(${getRotation(i)}deg)`,
                opacity: 1 - offset * 0.25,
                zIndex: 10 - offset,
                transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
          );
        })}

        {/* Active card */}
        <div
          dir={currentRTL ? "rtl" : "ltr"}
          style={{
            position: "absolute",
            inset: "0",
            background: bgColor,
            borderRadius: borderRad,
            border: "1px solid rgba(226,232,240,0.8)",
            boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
            padding: "28px 24px",
            fontFamily: fontFam,
            display: "flex",
            flexDirection: "column",
            zIndex: 20,
            transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateY(-20px) scale(0.98)" : "translateY(0) scale(1)",
            direction: currentRTL ? "rtl" : "ltr",
          }}
        >
          {/* Quote mark */}
          <span
            style={{
              fontSize: "48px",
              lineHeight: "0.5",
              color: primaryColor,
              opacity: 0.15,
              fontFamily: "Georgia, serif",
              marginBottom: "12px",
            }}
          >
            &ldquo;
          </span>

          {/* Quote text */}
          <p
            dir={currentRTL ? "rtl" : "ltr"}
            style={{
              fontSize: "15px",
              lineHeight: 1.65,
              color: quoteColor,
              margin: 0,
              fontStyle: "italic",
              flex: 1,
              overflow: "hidden",
              direction: currentRTL ? "rtl" : "ltr",
              textAlign: currentRTL ? "right" : "left",
            }}
          >
            {review.quote}
          </p>

          {/* Reviewer */}
          <div
            dir="ltr"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(241,245,249,1)",
              direction: "ltr",
            }}
          >
            {isRealPhoto(review.reviewerPhotoUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={review.reviewerPhotoUrl!}
                alt=""
                width={40}
                height={40}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                  minHeight: "40px",
                  maxWidth: "40px",
                  maxHeight: "40px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {getInitials(review.reviewer.name)}
              </div>
            )}
            <div style={{ textAlign: "left" }}>
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
      </div>

      {/* Navigation */}
      <div
        dir="ltr"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 4px",
          direction: "ltr",
        }}
      >
        {/* Arrows */}
        <div style={{ display: "flex", gap: "8px" }}>
          {reviews.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid rgba(226,232,240,0.8)",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "#64748b",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.color = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "rgba(226,232,240,0.8)";
                  e.currentTarget.style.color = "#64748b";
                }}
              >
                &#8592;
              </button>
              <button
                onClick={goToNext}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid rgba(226,232,240,0.8)",
                  background: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  color: "#64748b",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.color = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "rgba(226,232,240,0.8)";
                  e.currentTarget.style.color = "#64748b";
                }}
              >
                &#8594;
              </button>
            </>
          )}
        </div>

        {/* Counter */}
        {reviews.length > 1 && (
          <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
            {active + 1} / {reviews.length}
          </span>
        )}

        {/* Watermark */}
        {showWatermark ? (
          <a
            href="https://proofpst.com?ref=stack"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "10px",
              color: primaryColor,
              textDecoration: "none",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span style={{ fontSize: "8px" }}>✦</span> ProofPost
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

      {/* Progress bar */}
      {reviews.length > 1 && (
        <div style={{ height: "2px", background: "rgba(241,245,249,1)", overflow: "hidden", marginTop: "12px", borderRadius: "1px" }}>
          <div
            key={active}
            style={{
              height: "100%",
              backgroundColor: primaryColor,
              opacity: 0.5,
              animation: paused ? "none" : "pp-stack-progress 4s linear forwards",
              width: "0%",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes pp-stack-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
