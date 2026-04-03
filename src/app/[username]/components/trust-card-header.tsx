import { ExternalLink } from "lucide-react";

interface SocialLink {
  platform: string;
  url: string;
}

interface TrustCardHeaderProps {
  card: {
    display_name: string;
    headline: string | null;
    bio: string | null;
    avatar_url: string | null;
    social_links: SocialLink[] | unknown;
  };
  accentColor: string;
}

const platformIcons: Record<string, string> = {
  twitter: "\ud835\udd4f",
  x: "\ud835\udd4f",
  linkedin: "in",
  github: "GH",
  website: "\ud83c\udf10",
  instagram: "IG",
  youtube: "YT",
  tiktok: "TT",
};

export function TrustCardHeader({ card, accentColor }: TrustCardHeaderProps) {
  const socialLinks = Array.isArray(card.social_links) ? card.social_links as SocialLink[] : [];

  return (
    <div className="text-center">
      {/* Avatar with ring glow */}
      <div className="relative inline-block mb-6">
        {/* Glow behind avatar */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-30 scale-150"
          style={{ background: accentColor }}
        />
        {card.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.avatar_url}
            alt={card.display_name}
            width={104}
            height={104}
            className="relative w-26 h-26 rounded-full object-cover ring-[3px] ring-white/10 shadow-2xl"
          />
        ) : (
          <div
            className="relative w-26 h-26 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl ring-[3px] ring-white/10"
            style={{ background: `linear-gradient(135deg, ${accentColor}cc, ${accentColor}44)` }}
          >
            {card.display_name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name — gradient text */}
      <h1 className="text-[2.25rem] sm:text-[2.75rem] font-bold tracking-tight leading-[1.1] bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">
        {card.display_name}
      </h1>

      {/* Headline */}
      {card.headline && (
        <p className="mt-3 text-[17px] text-white/45 font-medium tracking-wide">
          {card.headline}
        </p>
      )}

      {/* Bio */}
      {card.bio && (
        <p className="mt-4 max-w-sm mx-auto text-[15px] leading-relaxed text-white/30">
          {card.bio}
        </p>
      )}

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex items-center justify-center gap-2.5 mt-6">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold
                bg-white/[0.06] border border-white/[0.08] text-white/50
                hover:bg-white/[0.12] hover:text-white hover:border-white/[0.15]
                transition-all duration-200 hover:scale-110
              "
              title={link.platform}
            >
              {platformIcons[link.platform.toLowerCase()] || <ExternalLink className="w-3.5 h-3.5" />}
            </a>
          ))}
        </div>
      )}

      {/* Divider line */}
      <div className="mt-8 mb-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </div>
  );
}
