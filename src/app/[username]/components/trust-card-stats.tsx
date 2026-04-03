import { Star, ShieldCheck } from "lucide-react";

interface TrustCardStatsProps {
  totalReviews: number;
  avgRating: string;
  platforms: string[];
  accentColor: string;
}

const platformLabels: Record<string, string> = {
  google: "Google", g2: "G2", capterra: "Capterra",
  trustpilot: "Trustpilot", linkedin: "LinkedIn", twitter: "X", manual: "Direct",
};

export function TrustCardStats({ totalReviews, avgRating, platforms, accentColor }: TrustCardStatsProps) {
  const verifiedPlatforms = platforms
    .filter((p) => p !== "manual")
    .map((p) => platformLabels[p] || p)
    .join(" & ");

  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <div className="flex items-center justify-center gap-6 sm:gap-8">
        {/* Rating */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xl font-bold text-slate-900 tabular-nums">{avgRating}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest font-medium">Rating</p>
        </div>

        <div className="w-px h-8 bg-slate-100" />

        {/* Count */}
        <div className="text-center">
          <span className="text-xl font-bold text-slate-900 tabular-nums">{totalReviews}</span>
          <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest font-medium">Reviews</p>
        </div>

        {verifiedPlatforms && (
          <>
            <div className="w-px h-8 bg-slate-100" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-sm font-semibold text-slate-900">Verified</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest font-medium">{verifiedPlatforms}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
