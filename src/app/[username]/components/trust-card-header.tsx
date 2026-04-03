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

const platformLabels: Record<string, string> = {
  twitter: "𝕏", x: "𝕏", linkedin: "in", github: "GH",
  website: "🌐", instagram: "IG", youtube: "YT", tiktok: "TT",
};

export function TrustCardHeader({ card, accentColor }: TrustCardHeaderProps) {
  const socialLinks = Array.isArray(card.social_links) ? card.social_links as SocialLink[] : [];

  return (
    <div className="text-center">
      {/* Avatar */}
      {card.avatar_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={card.avatar_url}
          alt={card.display_name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full mx-auto mb-5 object-cover ring-4 ring-white shadow-lg"
        />
      ) : (
        <div
          className="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-3xl font-bold text-white shadow-lg"
          style={{ background: accentColor }}
        >
          {card.display_name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Name */}
      <h1 className="text-[2rem] sm:text-[2.25rem] font-bold text-slate-900 tracking-tight leading-tight">
        {card.display_name}
      </h1>

      {/* Headline */}
      {card.headline && (
        <p className="mt-2 text-[15px] text-slate-500 font-medium">
          {card.headline}
        </p>
      )}

      {/* Bio */}
      {card.bio && (
        <p className="mt-3 text-[14px] leading-relaxed text-slate-400 max-w-sm mx-auto">
          {card.bio}
        </p>
      )}

      {/* Social Links */}
      {socialLinks.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 flex items-center justify-center text-xs font-bold transition-colors"
              title={link.platform}
            >
              {platformLabels[link.platform.toLowerCase()] || "🔗"}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
