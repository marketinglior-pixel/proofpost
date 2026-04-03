import { Sparkles } from "lucide-react";

interface TrustCardWatermarkProps {
  isPro: boolean;
  username: string;
}

export function TrustCardWatermark({ isPro, username }: TrustCardWatermarkProps) {
  if (isPro) return null;

  return (
    <div className="mt-14 text-center">
      <a
        href={`https://proofpst.com/go?ref=${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2 px-5 py-2.5 rounded-full
          bg-white/[0.03] border border-white/[0.06]
          text-[11px] text-white/20 font-medium tracking-wide
          hover:text-white/40 hover:bg-white/[0.06] hover:border-white/[0.1]
          transition-all duration-300
        "
      >
        <Sparkles className="w-3 h-3" />
        Built with ProofPost &mdash; Create yours in 60s
      </a>
    </div>
  );
}
