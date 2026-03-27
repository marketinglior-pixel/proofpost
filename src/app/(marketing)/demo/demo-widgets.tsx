"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Review data ─── */
const reviews = [
  {
    stars: 5,
    quote:
      "ProofPost increased our conversion rate by 34%. The widgets look native to our site and load instantly.",
    author: "Sarah Chen",
    company: "TechFlow",
    title: "VP Marketing",
  },
  {
    stars: 5,
    quote:
      "Setup took literally 2 minutes. We embedded the carousel on our pricing page and saw results the same day.",
    author: "Marcus Johnson",
    company: "Beacon AI",
    title: "Head of Growth",
  },
  {
    stars: 5,
    quote:
      "We tested 5 social proof tools. ProofPost was the only one that didn't slow down our site. Zero impact on Core Web Vitals.",
    author: "Priya Patel",
    company: "ScaleStack",
    title: "CTO",
  },
  {
    stars: 5,
    quote:
      "Our sales team loves the Wall of Love page. We send it to prospects and it closes deals faster than any case study.",
    author: "Tom Andersson",
    company: "NordCloud",
    title: "Sales Director",
  },
];

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-sm">
          ★
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Demo 1 — Animated Review Carousel
   ═══════════════════════════════════════════════ */
export function CarouselDemo() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const [dark, setDark] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      setFade(false);
      setTimeout(() => {
        setCurrent(idx);
        setFade(true);
      }, 300);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const r = reviews[current];

  return (
    <div className="space-y-4">
      {/* Theme toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setDark(!dark)}
          className="text-[12px] font-medium px-3 py-1.5 rounded-full border transition-colors duration-200
            border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300"
        >
          {dark ? "☀ Light" : "● Dark"}
        </button>
      </div>

      <div
        className={`rounded-2xl p-8 transition-colors duration-500 shadow-lg ${
          dark
            ? "bg-slate-900 border border-slate-700/50"
            : "bg-white border border-slate-200/80"
        }`}
      >
        <div
          className={`transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <Stars count={r.stars} />
          <p
            className={`mt-4 text-[16px] leading-relaxed font-medium ${
              dark ? "text-white" : "text-slate-800"
            }`}
          >
            &ldquo;{r.quote}&rdquo;
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold ${
                dark
                  ? "bg-emerald/20 text-emerald"
                  : "bg-emerald/10 text-emerald"
              }`}
            >
              {r.author[0]}
            </div>
            <div>
              <p
                className={`text-[14px] font-semibold ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                {r.author}
              </p>
              <p
                className={`text-[12px] ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {r.title}, {r.company}
              </p>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-emerald w-6"
                  : dark
                  ? "bg-slate-600 hover:bg-slate-500"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Demo 2 — Review Wall Grid
   ═══════════════════════════════════════════════ */
const wallReviews = [
  {
    stars: 5,
    quote:
      "The best social proof tool we've tried. Simple, fast, beautiful.",
    author: "Emily Rodriguez",
    company: "Finova",
  },
  {
    stars: 5,
    quote:
      "Added the carousel to our homepage. Bounce rate dropped 18% in a week.",
    author: "James Park",
    company: "CloudBase",
  },
  {
    stars: 5,
    quote:
      "No developer needed. I set it up myself in under 5 minutes.",
    author: "Nina Kowalski",
    company: "DesignLab",
  },
  {
    stars: 5,
    quote:
      "Our Wall of Love page replaced our testimonials page. Looks 10x better.",
    author: "David Kim",
    company: "SalesOS",
  },
  {
    stars: 5,
    quote:
      "Finally a widget that matches our brand perfectly. The customization is great.",
    author: "Anna Lindgren",
    company: "BrightPath",
  },
  {
    stars: 5,
    quote:
      "We embedded ProofPost on our pricing page. Trial signups jumped 27%.",
    author: "Carlos Mendez",
    company: "PayFlow",
  },
];

export function WallDemo() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {wallReviews.map((r, i) => (
        <div
          key={i}
          onMouseEnter={() => setHoveredIdx(i)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`bg-white rounded-xl border border-slate-200/80 p-5 transition-all duration-300 ${
            hoveredIdx === i
              ? "shadow-lg -translate-y-1 border-emerald/30"
              : "shadow-sm"
          }`}
        >
          <Stars count={r.stars} />
          <p className="mt-3 text-[14px] text-slate-700 leading-relaxed">
            &ldquo;{r.quote}&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center text-[12px] font-bold text-emerald">
              {r.author[0]}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-900">
                {r.author}
              </p>
              <p className="text-[11px] text-slate-400">{r.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Demo 3 — Floating Trust Badge
   ═══════════════════════════════════════════════ */
export function BadgeDemo() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-48 bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden flex items-center justify-center">
      {/* Simulated page content */}
      <div className="text-center opacity-40 select-none">
        <div className="w-32 h-3 bg-slate-300 rounded mx-auto mb-3" />
        <div className="w-48 h-2 bg-slate-200 rounded mx-auto mb-2" />
        <div className="w-40 h-2 bg-slate-200 rounded mx-auto mb-2" />
        <div className="w-44 h-2 bg-slate-200 rounded mx-auto" />
      </div>

      {/* The badge */}
      <div
        className={`absolute bottom-4 right-4 transition-all duration-700 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="bg-white rounded-full px-4 py-2.5 shadow-xl border border-slate-200/80 flex items-center gap-2.5">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-amber-400 text-[11px]">
                ★
              </span>
            ))}
          </div>
          <span className="text-[13px] font-bold text-slate-900">
            4.9
          </span>
          <div className="w-px h-4 bg-slate-200" />
          <span className="text-[12px] text-slate-500">
            from 127 reviews
          </span>
        </div>
      </div>

      {/* Replay button */}
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => setVisible(true), 600);
        }}
        className="absolute top-3 right-3 text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
      >
        Replay ↻
      </button>
    </div>
  );
}
