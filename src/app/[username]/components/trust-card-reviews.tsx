import { TrustCardReviewItem } from "./trust-card-review-item";

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

interface TrustCardReviewsProps {
  reviews: Review[];
  accentColor: string;
}

export function TrustCardReviews({ reviews, accentColor }: TrustCardReviewsProps) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.2em] text-white/20 font-semibold mb-5">
        What clients say
      </p>
      <div className="columns-1 sm:columns-2 xl:columns-3 gap-3.5 space-y-3.5">
        {reviews.map((review, index) => (
          <TrustCardReviewItem
            key={review.id}
            review={review}
            accentColor={accentColor}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
