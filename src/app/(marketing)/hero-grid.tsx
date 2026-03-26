"use client";

import { heroReviews } from "./hero-reviews";

function GridCard({ quote, name, title, photo, isLarge }: typeof heroReviews[number] & { isLarge: boolean }) {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 ${isLarge ? "row-span-2" : ""}`}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="text-[11px] text-amber-400">★</span>
        ))}
      </div>
      {/* Quote */}
      <p className={`text-[11.5px] leading-relaxed text-slate-600 italic mb-2.5 ${isLarge ? "line-clamp-5" : "line-clamp-2"}`}>
        &ldquo;{quote}&rdquo;
      </p>
      {/* Reviewer */}
      <div className="flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" width={24} height={24} className="rounded-full object-cover w-6 h-6" />
        <div>
          <p className="text-[10px] font-semibold text-slate-800">{name}</p>
          <p className="text-[9px] text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  );
}

export function HeroGrid() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-2.5">
        {heroReviews.map((r, i) => (
          <GridCard key={i} {...r} isLarge={i === 0} />
        ))}
      </div>
    </div>
  );
}
