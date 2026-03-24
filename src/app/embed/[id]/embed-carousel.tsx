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

export function EmbedCarousel({
  data,
  embedId,
}: {
  data: EmbedData;
  embedId: string;
}) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = brand?.primaryColor || "#10B981";
  const showWatermark = data.showWatermark !== false;

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

  // Auto-slide every 3.5 seconds (matches hero)
  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const timer = setInterval(goToNext, 3500);
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

  // Detect RTL from review content
  const hasRTL = reviews.some((r) =>
    /[\u0590-\u05FF\u0600-\u06FF]/.test(r.quote + r.hookLine + r.reviewer.name)
  );

  if (reviews.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#999", fontFamily: "system-ui, sans-serif" }}>
        No reviews yet
      </div>
    );
  }

  const review = reviews[current];

  return (
    <div
      ref={containerRef}
      dir={hasRTL ? "rtl" : "ltr"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#fff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(226,232,240,0.8)",
        boxShadow: "0 25px 50px -12px rgba(148,163,184,0.15)",
        direction: hasRTL ? "rtl" : "ltr",
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
        {/* Quote mark */}
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

        {/* Quote text */}
        <p
          style={{
            fontSize: "15px",
            lineHeight: 1.625,
            color: "#334155",
            margin: 0,
            fontStyle: "italic",
            minHeight: "48px",
            transition: "opacity 0.3s ease",
            opacity: isAnimating ? 0 : 1,
          }}
        >
          {review.quote}
        </p>

        {/* Reviewer - horizontal layout like hero */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transition: "opacity 0.3s ease",
            opacity: isAnimating ? 0 : 1,
          }}
        >
          {isRealPhoto(review.reviewerPhotoUrl) ? (
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
          )}
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a" }}>
              {review.reviewer.name}
            </div>
            <div style={{ fontSize: "11px", color: "#94a3b8" }}>
              {[review.reviewer.title, review.reviewer.company].filter(Boolean).join(", ")}
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
          padding: "12px 28px",
          borderTop: "1px solid rgba(241,245,249,1)",
          background: "rgba(248,250,252,0.5)",
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
              animation: paused ? "none" : "pp-progress 3.5s linear forwards",
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
