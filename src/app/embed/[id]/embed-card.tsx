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
  sourcePlatform?: string | null;
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
  autoPlay?: boolean;
  animationSpeed?: number;
  cardSize?: "compact" | "default" | "large";
}

// Platform icons as inline SVG paths
const PLATFORM_ICONS: Record<string, { path: string; color: string; viewBox?: string }> = {
  facebook: {
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    color: "#1877F2",
  },
  google: {
    path: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
    color: "#4285F4",
  },
  g2: {
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5L7 13l1.4-1.4 2.1 2.1 5.1-5.1L17 10l-6.5 6.5z",
    color: "#FF492C",
  },
  linkedin: {
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    color: "#0A66C2",
  },
  trustpilot: {
    path: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    color: "#00B67A",
  },
  capterra: {
    path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    color: "#FF9D28",
  },
};

function PlatformIcon({ platform, size = 18 }: { platform: string; size?: number }) {
  const icon = PLATFORM_ICONS[platform.toLowerCase()];
  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox || "0 0 24 24"}
      fill={icon.color}
      style={{ flexShrink: 0 }}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function EmbedCard({
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const reviews = data.reviews || [];
  const brand = data.brandKit;
  const primaryColor = cs.accentColor || brand?.primaryColor || "#10B981";
  const bgColor = cs.backgroundColor || "#ffffff";
  const textColor = cs.textColor || "#1e293b";
  const quoteColor = cs.quoteColor || "#334155";
  const fontFam = cs.fontFamily || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const showStars = cs.showStars !== false;
  const radius = cs.borderRadius ?? 16;
  const showWatermark = data.showWatermark !== false;
  const cardSize = cs.cardSize || "default";

  // Size presets
  const sizes = {
    compact: { width: 340, photoSize: 80, fontSize: 13, padding: 14 },
    default: { width: 400, photoSize: 100, fontSize: 14, padding: 18 },
    large: { width: 480, photoSize: 120, fontSize: 15, padding: 22 },
  };
  const s = sizes[cardSize];

  // Track impression
  useEffect(() => {
    fetch(`/api/embed/${embedId}`).catch(() => {});
  }, [embedId]);

  // Auto-rotate reviews
  useEffect(() => {
    if (cs.autoPlay !== false && reviews.length > 1) {
      const speed = (cs.animationSpeed || 6) * 1000;
      autoPlayTimer.current = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % reviews.length);
          setIsAnimating(false);
        }, 300);
      }, speed);
      return () => {
        if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
      };
    }
  }, [reviews.length, cs.autoPlay, cs.animationSpeed]);

  // iframe resize
  useEffect(() => {
    function sendHeight() {
      if (containerRef.current && window.parent !== window) {
        window.parent.postMessage(
          { type: "proofpost-resize", id: embedId, height: containerRef.current.scrollHeight + 20 },
          "*"
        );
      }
    }
    sendHeight();
    const observer = new ResizeObserver(sendHeight);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [embedId, current]);

  const handleVideoToggle = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  if (reviews.length === 0 || dismissed) return null;

  const review = reviews[current];
  const hasVideo = !!review.videoUrl;
  const hasPhoto = !!review.reviewerPhotoUrl && review.reviewerPhotoUrl.startsWith("http");
  const platform = (review as unknown as Record<string, unknown>).sourcePlatform as string | null;

  return (
    <div ref={containerRef} style={{ fontFamily: fontFam }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "stretch",
          maxWidth: `${s.width}px`,
          backgroundColor: bgColor,
          borderRadius: `${radius}px`,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
          overflow: "hidden",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? "translateY(4px)" : "translateY(0)",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(0,0,0,0.06)",
            color: "#94a3b8",
            fontSize: "13px",
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

        {/* Left: Photo or Video */}
        <div
          style={{
            position: "relative",
            width: `${s.photoSize}px`,
            minHeight: `${s.photoSize}px`,
            flexShrink: 0,
            backgroundColor: "#f1f5f9",
            overflow: "hidden",
          }}
        >
          {hasVideo ? (
            <>
              <video
                ref={videoRef}
                src={review.videoUrl!}
                poster={review.reviewerPhotoUrl || undefined}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                playsInline
                muted
                onEnded={() => setIsPlaying(false)}
              />
              {/* Play button overlay */}
              {!isPlaying && (
                <button
                  onClick={handleVideoToggle}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.25)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={primaryColor}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
              {isPlaying && (
                <button
                  onClick={handleVideoToggle}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                />
              )}
            </>
          ) : hasPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.reviewerPhotoUrl!}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${primaryColor}22, ${primaryColor}44)`,
              fontSize: "24px",
              fontWeight: 700,
              color: primaryColor,
            }}>
              {review.reviewer.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div style={{ flex: 1, padding: `${s.padding}px`, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: "8px" }}>
          {/* Stars */}
          {showStars && (
            <div style={{ display: "flex", gap: "1px" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} style={{ color: "#F97316", fontSize: "14px", lineHeight: 1 }}>★</span>
              ))}
            </div>
          )}

          {/* Quote text */}
          <p style={{
            fontSize: `${s.fontSize}px`,
            lineHeight: 1.5,
            color: quoteColor,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {review.quote}
          </p>

          {/* Reviewer name + platform icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
            <span style={{
              fontSize: "12px",
              fontWeight: 500,
              color: `${textColor}99`,
            }}>
              {review.reviewer.name}
              {review.reviewer.title ? ` / ${review.reviewer.title}` : ""}
            </span>
            {platform && <PlatformIcon platform={platform} size={16} />}
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      {reviews.length > 1 && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "4px",
          marginTop: "8px",
        }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => { setCurrent(i); setIsAnimating(false); }, 300);
              }}
              style={{
                width: i === current ? "16px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
                backgroundColor: i === current ? primaryColor : "rgba(0,0,0,0.12)",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Watermark */}
      {showWatermark && (
        <div style={{ textAlign: "center", marginTop: "6px" }}>
          <a
            href="https://proofpst.com?ref=card"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "9px", color: "#cbd5e1", textDecoration: "none" }}
          >
            ✦ ProofPost
          </a>
        </div>
      )}
    </div>
  );
}
