"use client";

import { heroReviews } from "./hero-reviews";

function MarqueeCard({ quote, name, title, photo }: typeof heroReviews[number]) {
  return (
    <div className="flex-shrink-0 w-[260px] rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      {/* Stars */}
      <div className="flex gap-0.5 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="text-[13px] text-amber-400">★</span>
        ))}
      </div>
      {/* Quote */}
      <p className="text-[12.5px] leading-relaxed text-slate-600 italic line-clamp-3 mb-3">
        &ldquo;{quote}&rdquo;
      </p>
      {/* Reviewer */}
      <div className="flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={28} height={28} className="rounded-full object-cover w-7 h-7" />
        <div>
          <p className="text-[11px] font-semibold text-slate-800">{name}</p>
          <p className="text-[10px] text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  );
}

export function HeroMarquee() {
  // Double the items for seamless loop
  const items = [...heroReviews, ...heroReviews];

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-snow to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-snow to-transparent z-10 pointer-events-none" />

      <div className="flex gap-4 hero-marquee-scroll hover:[animation-play-state:paused]">
        {items.map((r, i) => (
          <MarqueeCard key={i} {...r} />
        ))}
      </div>

      <style>{`
        .hero-marquee-scroll {
          animation: hero-marquee-slide 20s linear infinite;
        }
        @keyframes hero-marquee-slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
