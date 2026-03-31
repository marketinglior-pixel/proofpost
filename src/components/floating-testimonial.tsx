"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface Testimonial {
  quote: string;
  highlightedPart?: string;
  name: string;
  title: string;
  photoUrl?: string;
  platform?: "facebook" | "google" | "g2" | "linkedin" | "trustpilot" | "producthunt";
  rating?: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We embedded ProofPost widgets on every landing page. Conversion rate went up 23% in the first month.",
    highlightedPart: "Conversion rate went up 23%",
    name: "Sarah K.",
    title: "Head of Marketing, CloudSync",
    platform: "g2",
    rating: 5,
  },
  {
    quote: "I was screenshotting reviews like a caveman. ProofPost made me look like I have a design team. Setup took maybe 2 minutes.",
    highlightedPart: "Setup took maybe 2 minutes",
    name: "Marcus Chen",
    title: "Founder, ShipFast",
    platform: "producthunt",
    rating: 5,
  },
  {
    quote: "The AI hook extraction is the real deal. It found a line from a customer review I would have never picked. That line is now our best-performing ad.",
    highlightedPart: "That line is now our best-performing ad",
    name: "Elena Rodriguez",
    title: "Growth Lead, Appointly",
    platform: "linkedin",
    rating: 5,
  },
];

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "facebook":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "google":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      );
    case "g2":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF492C">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 3h2.7l-1.35 2.34L12.5 5zm-3.2 0h2.7l1.35 2.34H8.65L9.3 5zm-3.12 3.34h2.7L7.53 10.7 6.18 8.34zm1.35 2.36l1.35 2.34H6.18l1.35-2.34zm2.7 4.64H7.53l1.35-2.34 1.35 2.34zm1.27.32l-1.35-2.34h2.7l-1.35 2.34zm1.27-.32l1.35-2.34 1.35 2.34h-2.7zm2.7-2.34h-2.7l1.35-2.34 1.35 2.34zm-1.35-2.66L12.47 8.34h2.7l1.35 2.34-1.35 2.32zm2.7-.32h-2.7l1.35-2.34 1.35 2.34z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "trustpilot":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#00B67A">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    case "producthunt":
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#DA552F">
          <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.801 0-.993-.806-1.799-1.801-1.799zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804c2.319 0 4.2 1.88 4.2 4.199 0 2.321-1.881 4.201-4.201 4.201z" />
        </svg>
      );
    default:
      return null;
  }
}

export function FloatingTestimonial() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show after scroll or delay
  useEffect(() => {
    // Check if already dismissed this session
    if (typeof window !== "undefined" && sessionStorage.getItem("pp-testimonial-dismissed")) {
      return;
    }

    const timer = setTimeout(() => setVisible(true), 4000);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Rotate testimonials
  useEffect(() => {
    if (!visible || dismissed) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [visible, dismissed]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pp-testimonial-dismissed", "1");
    }
  }, []);

  if (dismissed || !visible) return null;

  const testimonial = TESTIMONIALS[currentIndex];

  // Highlight the key part of the quote
  const renderQuote = () => {
    if (!testimonial.highlightedPart) {
      return testimonial.quote;
    }
    const parts = testimonial.quote.split(testimonial.highlightedPart);
    if (parts.length < 2) return testimonial.quote;
    return (
      <>
        {parts[0]}
        <span className="bg-amber-100/80 px-0.5 rounded-sm">{testimonial.highlightedPart}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-4 fade-in duration-500"
      style={{ maxWidth: "380px" }}
    >
      <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-slate-200/60 overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="flex items-start gap-3.5 p-4 pr-10">
          {/* Photo */}
          <div className="flex-shrink-0 relative">
            {testimonial.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={testimonial.photoUrl}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald/20 to-emerald/40 flex items-center justify-center text-emerald font-bold text-sm">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="min-w-0 space-y-2">
            {/* Stars */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-orange-400 text-[13px] leading-none">★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-[13px] leading-relaxed text-slate-600 line-clamp-3">
              {renderQuote()}
            </p>

            {/* Reviewer + platform */}
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-medium text-slate-500">
                {testimonial.name}
              </span>
              {testimonial.platform && (
                <PlatformIcon platform={testimonial.platform} />
              )}
            </div>
          </div>
        </div>

        {/* Dots navigation */}
        {TESTIMONIALS.length > 1 && (
          <div className="flex justify-center gap-1 pb-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-4 bg-emerald" : "w-1.5 bg-slate-200"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
