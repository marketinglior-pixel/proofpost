"use client";

import { ShieldCheck, Star } from "lucide-react";

interface Review {
  id: string;
  platform: string;
  reviewer_name: string;
  reviewer_title: string | null;
  reviewer_company: string | null;
  reviewer_photo_url: string | null;
  review_text: string;
  rating: number;
  verified: boolean;
  image_url: string | null;
}

interface TrustCardMarqueeProps {
  reviews: Review[];
  accentColor: string;
}

function ReviewCard({ review, accentColor }: { review: Review; accentColor: string }) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] rounded-2xl bg-white border border-slate-100 p-6 space-y-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-200">
      {/* Screenshot image */}
      {review.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={review.image_url}
          alt={`Review from ${review.reviewer_name}`}
          className="w-full h-auto rounded-xl object-contain"
          loading="lazy"
        />
      )}

      {/* Stars */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i <= Math.round(review.rating || 5) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
            />
          ))}
        </div>
        {/* ProofPost Approved badge */}
        <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
          style={{ background: `${accentColor}15`, color: accentColor }}
        >
          <ShieldCheck className="w-2.5 h-2.5" />
          Approved
        </span>
      </div>

      {/* Review text */}
      {review.review_text && review.review_text !== "Screenshot review" && (
        <p className="text-[14px] text-slate-600 leading-relaxed">
          &ldquo;{review.review_text}&rdquo;
        </p>
      )}

      {/* Reviewer info */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
        {review.reviewer_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={review.reviewer_photo_url} alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-white"
            style={{ background: accentColor }}
          >
            {review.reviewer_name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-slate-900 truncate">{review.reviewer_name}</p>
          {(review.reviewer_title || review.reviewer_company) && (
            <p className="text-[11px] text-slate-400 truncate">
              {review.reviewer_title}{review.reviewer_company ? `, ${review.reviewer_company}` : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TrustCardMarquee({ reviews, accentColor }: TrustCardMarqueeProps) {
  if (reviews.length === 0) return null;

  // Split reviews into two rows for the marquee
  const mid = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, mid);
  const row2 = reviews.slice(mid);

  // Duplicate for seamless infinite scroll
  const duped1 = [...row1, ...row1, ...row1, ...row1];
  const duped2 = row2.length > 0 ? [...row2, ...row2, ...row2, ...row2] : [];

  return (
    <div className="space-y-6">
      {/* Section label */}
      <div className="flex items-center gap-3 px-1">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
          What clients say
        </h2>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      {/* Marquee container with edge masks */}
      <div className="relative" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)" }}>
        {/* Row 1 — scrolls left */}
        <div className="flex gap-4 mb-4 w-max animate-marquee-left">
          {duped1.map((r, i) => (
            <ReviewCard key={`r1-${i}`} review={r} accentColor={accentColor} />
          ))}
        </div>

        {/* Row 2 — scrolls right */}
        {duped2.length > 0 && (
          <div className="flex gap-4 w-max animate-marquee-right">
            {duped2.map((r, i) => (
              <ReviewCard key={`r2-${i}`} review={r} accentColor={accentColor} />
            ))}
          </div>
        )}

        <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marquee-left 45s linear infinite;
          }
          .animate-marquee-right {
            animation: marquee-right 45s linear infinite;
          }
          .animate-marquee-left:hover,
          .animate-marquee-right:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </div>
  );
}
