import { VerificationBadge } from "./verification-badge";

interface Review {
  id: string;
  platform: string;
  source_url: string | null;
  reviewer_name: string;
  reviewer_title: string | null;
  reviewer_company: string | null;
  reviewer_photo_url: string | null;
  review_text: string;
  rating: number;
  verified: boolean;
  verification_url: string | null;
  image_url: string | null;
  hook_line: string | null;
}

interface TrustCardReviewItemProps {
  review: Review;
  accentColor: string;
  index: number;
}

function StarRating({ rating, accentColor }: { rating: number; accentColor: string }) {
  return (
    <div className="flex gap-[2px]">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="text-[11px]"
          style={{ color: i <= Math.round(rating || 5) ? accentColor : "rgba(255,255,255,0.1)" }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export function TrustCardReviewItem({ review, accentColor, index }: TrustCardReviewItemProps) {
  return (
    <div
      className="
        break-inside-avoid rounded-2xl p-5 space-y-3
        bg-white/[0.03] border border-white/[0.06]
        backdrop-blur-xl
        hover:bg-white/[0.06] hover:border-white/[0.1]
        transition-all duration-300
      "
      style={{
        animationDelay: `${index * 60}ms`,
        animation: "fadeInUp 0.4s ease-out both",
      }}
    >
      {/* Screenshot image */}
      {review.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={review.image_url}
          alt={`Review from ${review.reviewer_name}`}
          className="w-full rounded-xl border border-white/[0.06]"
          loading="lazy"
        />
      )}

      {/* Stars + Verification */}
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} accentColor={accentColor} />
        {review.verified && (
          <VerificationBadge
            platform={review.platform}
            verificationUrl={review.verification_url || review.source_url}
          />
        )}
      </div>

      {/* Review text (skip generic placeholder for screenshot-only reviews) */}
      {review.review_text && review.review_text !== "Screenshot review" && (
        <p className="text-[14px] leading-[1.7] text-white/60">
          &ldquo;
          {review.hook_line && review.review_text.includes(review.hook_line) ? (
            review.review_text.split(review.hook_line).map((part, idx, arr) => (
              <span key={idx}>
                {part}
                {idx < arr.length - 1 && (
                  <span
                    className="font-semibold px-1 rounded"
                    style={{
                      color: accentColor,
                      backgroundColor: `${accentColor}20`,
                    }}
                  >
                    {review.hook_line}
                  </span>
                )}
              </span>
            ))
          ) : (
            review.review_text
          )}
          &rdquo;
        </p>
      )}

      {/* Reviewer */}
      <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/[0.05]">
        {review.reviewer_photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.reviewer_photo_url}
            alt=""
            width={28}
            height={28}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-white/10"
          />
        ) : (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white/70"
            style={{ background: `${accentColor}25` }}
          >
            {review.reviewer_name?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-white/80 truncate">
            {review.reviewer_name}
          </p>
          {(review.reviewer_title || review.reviewer_company) && (
            <p className="text-[10px] text-white/25 truncate">
              {review.reviewer_title}
              {review.reviewer_company ? `, ${review.reviewer_company}` : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
