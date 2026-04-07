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

function PlatformIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  const cls = "w-4 h-4";

  switch (p) {
    case "facebook":
    case "fb":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "instagram":
    case "ig":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "twitter":
    case "x":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "youtube":
    case "yt":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "tiktok":
    case "tt":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      );
    case "etsy":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.559 2.445c0-.103.064-.167.168-.167h7.267c.252 0 .478.155.586.387l1.136 2.445a.66.66 0 01-.586.933H13.36c-.104 0-.168.064-.168.167v4.085c0 .103.064.167.168.167h3.062c.252 0 .478.155.586.387l1.136 2.445a.66.66 0 01-.586.933H13.36c-.104 0-.168.064-.168.167v4.422c0 .103.064.167.168.167h4.77c.252 0 .478.155.586.387l1.136 2.445a.66.66 0 01-.586.933H8.559c-.104 0-.168-.064-.168-.167V2.445h.168z" />
        </svg>
      );
    case "amazon":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
          <path d="M.045 18.02c.072-.116.187-.124.348-.064 2.272 1.307 4.784 1.96 7.536 1.96 2.157 0 4.253-.468 6.287-1.404.616-.28.96-.165 1.032.346.072.511-.264.895-.804 1.155-2.193 1.003-4.56 1.504-7.1 1.504-3.016 0-5.692-.736-8.028-2.208-.084-.052-.148-.1-.204-.148-.14-.116-.14-.276-.068-.42v.28zm21.108-2.588c-.256-.324-.784-.456-1.584-.396-1.091.084-2.24.384-2.948.684-.232.1-.316-.02-.224-.236.7-1.732.624-3.244-.24-3.5-.86-.26-2.04.388-2.88 1.5-.344.456-.624 1.02-.86 1.5-.012.024-.04.048-.072.048-.028 0-.048-.02-.048-.048.016-.784.084-1.576.196-2.344.076-.564-.196-.892-.812-.94-.128-.012-.256-.012-.384-.012-.468 0-1.016.06-1.52.176-.284.064-.348.224-.196.476.324.544.5 1.684.5 3.364v.252c-.024.512-.048 1.02-.048 1.556 0 .064.024.116.072.144a.16.16 0 00.164 0c1.028-.652 1.932-1.5 2.58-2.592.648-1.088 1.028-1.572 1.392-1.572.232 0 .324.208.288.62-.024.24-.06.5-.06.772 0 1.024.456 1.54 1.344 1.54.796 0 1.516-.36 2.304-1.1.044-.04.04-.1-.012-.132l-.004.004z" />
        </svg>
      );
    default:
      // Generic link icon
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      );
  }
}

export function TrustCardHeader({ card, accentColor }: TrustCardHeaderProps) {
  const socialLinks = Array.isArray(card.social_links) ? card.social_links as SocialLink[] : [];

  return (
    <div className="text-center">
      {/* Avatar */}
      {card.avatar_url ? (
        (() => {
          const isLogo = card.avatar_url!.endsWith(".png") || card.avatar_url!.endsWith(".svg");
          return isLogo ? (
            <div className="w-28 h-28 rounded-full mx-auto mb-5 ring-4 ring-white shadow-lg bg-white flex items-center justify-center p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.avatar_url!}
                alt={card.display_name}
                width={104}
                height={104}
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto mb-5 ring-4 ring-white shadow-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.avatar_url!}
                alt={card.display_name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })()
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
              <PlatformIcon platform={link.platform} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
