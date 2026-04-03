import { ShieldCheck } from "lucide-react";

interface VerificationBadgeProps {
  platform: string;
  verificationUrl: string | null;
}

const platformLabels: Record<string, string> = {
  google: "Google",
  g2: "G2",
  capterra: "Capterra",
  trustpilot: "Trustpilot",
  linkedin: "LinkedIn",
  twitter: "X",
};

export function VerificationBadge({ platform, verificationUrl }: VerificationBadgeProps) {
  const label = platformLabels[platform] || platform;

  const badge = (
    <span className="inline-flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400/80 uppercase tracking-wider">
      <ShieldCheck className="w-2.5 h-2.5" />
      {label}
    </span>
  );

  if (verificationUrl) {
    return (
      <a
        href={verificationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-70 transition-opacity"
        title={`Verified on ${label}`}
      >
        {badge}
      </a>
    );
  }

  return badge;
}
