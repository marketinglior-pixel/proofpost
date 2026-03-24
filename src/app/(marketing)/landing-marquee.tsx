"use client";

const testimonials = [
  {
    quote: "47 G2 reviews sat idle for months. ProofPost turned them into landing page conversion machines.",
    name: "Daniel Moreno",
    title: "CMO, Launchpad HQ",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote: "Animated carousels stopped the scroll. Pricing page bounce rate dropped 18% in one week.",
    name: "Emily Rhodes",
    title: "Growth Manager, Nuvio",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote: "Sent collection forms Monday, had 14 reviews live by Friday. Zero design work needed.",
    name: "James Park",
    title: "Founder, Crestline",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote: "The AI picks better hooks than I do. Setup took 60 seconds. Our sales page finally has proof.",
    name: "Sarah Chen",
    title: "VP Sales, TechFlow",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote: "Pipeline accuracy went from 40% to 92%. The team finally trusts the numbers on our site.",
    name: "Marcus Johnson",
    title: "Head of Revenue, Beacon AI",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote: "One line of code, branded carousel, live in under a minute. Clients always ask how we made them.",
    name: "Priya Patel",
    title: "CRO, ScaleStack",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
  },
];

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] rounded-2xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
      <p className="text-[14px] text-slate-600 leading-relaxed italic">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.photo}
          alt=""
          width={36}
          height={36}
          className="rounded-full object-cover w-9 h-9 min-w-[36px]"
        />
        <div>
          <p className="text-[13px] font-semibold text-slate-900">{t.name}</p>
          <p className="text-[11px] text-slate-400">{t.title}</p>
        </div>
      </div>
    </div>
  );
}

export function LandingMarquee() {
  // Duplicate for seamless loop
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3);
  const duped1 = [...row1, ...row1, ...row1, ...row1];
  const duped2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div className="relative">
      {/* Row 1 - scrolls left */}
      <div
        className="flex gap-4 mb-4 w-max animate-marquee-left hover:[animation-play-state:paused]"
      >
        {duped1.map((t, i) => (
          <Card key={`r1-${i}`} t={t} />
        ))}
      </div>

      {/* Row 2 - scrolls right */}
      <div
        className="flex gap-4 w-max animate-marquee-right hover:[animation-play-state:paused]"
      >
        {duped2.map((t, i) => (
          <Card key={`r2-${i}`} t={t} />
        ))}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-snow to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-snow to-transparent z-10" />

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
