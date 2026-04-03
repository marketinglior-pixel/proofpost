import { Star, ShieldCheck } from "lucide-react";

interface TrustCardStatsProps {
  totalReviews: number;
  avgRating: string;
  platforms: string[];
  accentColor: string;
}

const platformLabels: Record<string, string> = {
  google: "Google",
  g2: "G2",
  capterra: "Capterra",
  trustpilot: "Trustpilot",
  linkedin: "LinkedIn",
  twitter: "X",
};

export function TrustCardStats({ totalReviews, avgRating, platforms, accentColor }: TrustCardStatsProps) {
  const verifiedPlatforms = platforms
    .map((p) => platformLabels[p] || p)
    .join(" & ");

  return (
    <div className="mt-8 flex items-center justify-center gap-8 sm:gap-10">
      {/* Rating */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-1.5">
          <Star className="w-[18px] h-[18px]" style={{ color: accentColor }} fill={accentColor} />
          <span className="text-[28px] font-bold text-white tabular-nums tracking-tight">
            {avgRating}
          </span>
        </div>
        <p className="text-[11px] text-white/25 mt-0.5 uppercase tracking-widest font-medium">
          Rating
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-white/[0.08]" />

      {/* Review Count */}
      <div className="text-center">
        <span className="text-[28px] font-bold text-white tabular-nums tracking-tight">
          {totalReviews}
        </span>
        <p className="text-[11px] text-white/25 mt-0.5 uppercase tracking-widest font-medium">
          Reviews
        </p>
      </div>

      {/* Divider + Verified */}
      {verifiedPlatforms && (
        <>
          <div className="w-px h-10 bg-white/[0.08]" />
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-[18px] h-[18px]" style={{ color: accentColor }} />
              <span className="text-[14px] font-semibold text-white">
                Verified
              </span>
            </div>
            <p className="text-[11px] text-white/25 mt-0.5 uppercase tracking-widest font-medium">
              {verifiedPlatforms}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
