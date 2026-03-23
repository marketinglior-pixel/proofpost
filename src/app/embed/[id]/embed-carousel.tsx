"use client";

import { useState, useEffect, useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const testimonialSlide = data.slides[1]; // Slide 2 has the quote
  const reviewer = data.reviewer;
  const brand = data.brandKit;

  // Collect all slides as testimonial cards for the carousel
  // For embed, show all slides as individual testimonial quotes
  const slides = data.slides;

  // Auto-resize message to parent
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

  const primaryColor = brand?.primaryColor || "#2563EB";

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e8e4dc",
      }}
    >
      {/* Card Content */}
      <div style={{ padding: "32px" }}>
        {/* Stars */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: "20px",
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} style={{ fontSize: "20px", color: "#e2a84b" }}>
              ★
            </span>
          ))}
        </div>

        {/* Quote */}
        <div style={{ position: "relative", marginBottom: "24px" }}>
          <span
            style={{
              position: "absolute",
              top: "-10px",
              left: "-5px",
              fontSize: "60px",
              color: primaryColor,
              opacity: 0.15,
              lineHeight: 1,
              fontFamily: "Georgia, serif",
            }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "#1a1a2e",
              margin: 0,
              paddingLeft: "8px",
              fontStyle: "italic",
              transition: "opacity 0.3s ease",
            }}
          >
            {slides[current]?.body || testimonialSlide?.body}
          </p>
        </div>

        {/* Reviewer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          {/* Avatar */}
          {data.reviewerPhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.reviewerPhotoUrl}
              alt={reviewer?.name}
              width={44}
              height={44}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: primaryColor,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 700,
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
              }}
            >
              {reviewer?.name || "Customer"}
            </div>
            <div style={{ fontSize: "13px", color: "#6b7094" }}>
              {[reviewer?.title, reviewer?.company]
                .filter(Boolean)
                .join(", ")}
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        {slides.length > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor:
                    i === current ? primaryColor : "rgba(26,26,46,0.12)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 32px",
          borderTop: "1px solid #f0ece4",
          background: "#faf8f4",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {brand?.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brand.logoUrl}
              alt={brand.companyName}
              width={20}
              height={20}
              style={{ borderRadius: "4px", objectFit: "contain" }}
            />
          )}
          <span
            style={{ fontSize: "12px", fontWeight: 600, color: "#6b7094" }}
          >
            {brand?.companyName}
          </span>
        </div>

        {/* Powered by */}
        <a
          href="https://proofpost-alpha.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "11px",
            color: "#9a9ab0",
            textDecoration: "none",
          }}
        >
          powered by ProofPost
        </a>
      </div>
    </div>
  );
}
