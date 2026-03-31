"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
}

function getShadow(style: string): string {
  switch (style) {
    case "none": return "none";
    case "subtle": return "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)";
    case "elevated": return "0 25px 50px -12px rgba(148,163,184,0.15)";
    default: return "0 25px 50px -12px rgba(148,163,184,0.15)";
  }
}

export function EmbedCarousel({
  data,
  embedId,
  customStyle,
}: {
  data: EmbedData;
  embedId: string;
  customStyle?: CustomStyle | Record<string, unknown> | null;
}) {
  const cs = (customStyle || {}) as CustomStyle;
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = cs.accentColor || brand?.primaryColor || "#10B981";
  const showWatermark = data.showWatermark !== false;
  const bgColor = cs.backgroundColor || "#fff";
  const textColor = cs.textColor || "#334155";
  const quoteColor = cs.quoteColor || "#334155";
  const fontFam = cs.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const borderRad = cs.borderRadius !== undefined ? `${cs.borderRadius}px` : "16px";
  const shadow = cs.shadowStyle ? getShadow(cs.shadowStyle) : "0 25px 50px -12px rgba(148,163,184,0.15)";
  const showStars = cs.showStars !== false;
  const showTitle = cs.showTitle !== false;
  const showCompany = cs.showCompany !== false;
  const showAvatar = cs.showAvatar !== false;
  const autoPlayEnabled = cs.autoPlay !== false;
  const slideInterval = (cs.animationSpeed || 3.5) * 1000;

  // A/B Testing: select hook variant for each review
  const selectedVariants = useRef<Record<string, string>>({});
  const getActiveHook = useCallback((review: Review): { text: string; variantId: string } => {
    const variants = review.hookVariants || [];
    if (variants.length === 0) {
      return { text: review.hookLine, variantId: "default" };
    }
    if (!selectedVariants.current[review.id]) {
      const idx = Math.floor(Math.random() * variants.length);
      selectedVariants.current[review.id] = variants[idx].id;
    }
    const selectedId = selectedVariants.current[review.id];
    const variant = variants.find((v) => v.id === selectedId) || variants[0];
    return { text: variant.text, variantId: variant.id };
  }, []);

  // Track hook events
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
      const nextIdx = (current + 1) % reviews.length;
      setCurrent(nextIdx);
      setIsAnimating(false);
      trackHookEvent(reviews[nextIdx], "impression");
    }, 300);
  }, [reviews, current, trackHookEvent]);

  // Track impression on mount
  useEffect(() => {
    fetch(`/api/embed/${embedId}`).catch(() => {});
    if (reviews.length > 0) {
      trackHookEvent(reviews[0], "impression");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-slide
  useEffect(() => {
    if (!autoPlayEnabled || paused || reviews.length <= 1) return;
    const timer = setInterval(goToNext, slideInterval);
    return () => clearInterval(timer);
  }, [autoPlayEnabled, paused, goToNext, reviews.length, slideInterval]);

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
  }, [embedId, current]);

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

  // Detect RTL per current review (not entire widget)
  function isReviewRTL(r: Review): boolean {
    return /[\u0590-\u05FF\u0600-\u06FF]/.test(r.quote + r.hookLine);
  }

  if (reviews.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999", fontFamily: "system-ui, sans-serif" }}>
        No reviews yet
      </div>
    );
  }

  const review = reviews[current];
  const currentRTL = isReviewRTL(review);

  return (
    <div
      ref={containerRef}
      dir={currentRTL ? "rtl" : "ltr"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        fontFamily: fontFam,
        background: bgColor,
        borderRadius: borderRad,
        overflow: "hidden",
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: shadow,
        direction: currentRTL ? "rtl" : "ltr",
        maxWidth: "448px",
        margin: "0 auto",
      }}
    >
      {/* Card content */}
      <div
        style={{
          padding: "36px 28px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Video player for video testimonials */}
        {review.videoUrl && (
          <div style={{ width: "100%", marginBottom: "12px", transition: "opacity 0.3s ease", opacity: isAnimating ? 0 : 1 }}>
            <EmbedVideoPlayer videoUrl={review.videoUrl} accentColor={primaryColor} />
          </div>
        )}

        {/* Quote mark */}
        {!review.videoUrl && (
          <span
            style={{
              fontSize: "56px",
              lineHeight: "0.5",
              color: primaryColor,
              opacity: 0.15,
              fontFamily: "Georgia, serif",
              marginBottom: "8px",
            }}
          >
            &ldquo;
          </span>
        )}

        {/* Quote text */}
        {(!review.videoUrl || (review.quote && review.quote !== "Video testimonial")) && (
          <p
            dir={currentRTL ? "rtl" : "ltr"}
            style={{
              fontSize: review.videoUrl ? "13px" : "15px",
              lineHeight: 1.625,
              color: quoteColor,
              margin: 0,
              fontStyle: "italic",
              minHeight: review.videoUrl ? "auto" : "48px",
              transition: "opacity 0.3s ease",
              opacity: isAnimating ? 0 : 1,
              direction: currentRTL ? "rtl" : "ltr",
              textAlign: "center",
            }}
          >
            {review.videoUrl ? review.quote : review.quote}
          </p>
        )}

        {/* Reviewer - horizontal layout like hero */}
        <div
          dir="ltr"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transition: "opacity 0.3s ease",
            opacity: isAnimating ? 0 : 1,
            marginTop: "16px",
            direction: "ltr",
          }}
        >
          {showAvatar && (
            isRealPhoto(review.reviewerPhotoUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={review.reviewerPhotoUrl!}
                alt=""
                width={40}
                height={40}
                style={{ borderRadius: "50%", objectFit: "cover" }}
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
                }}
              >
                {getInitials(review.reviewer.name)}
              </div>
            )
          )}
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: textColor }}>
              {review.reviewer.name}
            </div>
            <div style={{ fontSize: "11px", color: `${textColor}80` }}>
              {[
                showTitle ? review.reviewer.title : null,
                showCompany ? review.reviewer.company : null,
              ].filter(Boolean).join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar - always LTR */}
      <div
        dir="ltr"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 28px",
          borderTop: "1px solid rgba(241,245,249,1)",
          background: "rgba(248,250,252,0.5)",
          direction: "ltr",
        }}
      >
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {reviews.length > 1 && reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => { setCurrent(i); setIsAnimating(false); }, 300);
              }}
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: i === current ? primaryColor : "rgba(15,23,42,0.12)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {showWatermark ? (
          <a
            href="https://proofpst.com?ref=widget"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackHookEvent(review, "click")}
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

      {/* Progress bar */}
      {reviews.length > 1 && (
        <div style={{ height: "2px", background: "rgba(241,245,249,1)", overflow: "hidden" }}>
          <div
            key={current}
            style={{
              height: "100%",
              backgroundColor: primaryColor,
              opacity: 0.4,
              animation: paused || !autoPlayEnabled ? "none" : `pp-progress ${cs.animationSpeed || 3.5}s linear forwards`,
              width: "0%",
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
