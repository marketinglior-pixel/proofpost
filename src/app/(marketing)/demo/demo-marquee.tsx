"use client";

const testimonials = [
  {
    quote:
      "We switched from HubSpot 6 months ago and it's been a game-changer. Our sales reps are actually logging calls now.",
    name: "Sarah Chen",
    title: "VP Sales, TechFlow",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote:
      "Within two weeks our pipeline accuracy went from 40% to 92%. The team finally trusts the data.",
    name: "Marcus Johnson",
    title: "Head of Revenue, Beacon AI",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote:
      "We tried 4 CRMs before this one. The onboarding took 2 days, not 2 months.",
    name: "Priya Patel",
    title: "CRO, ScaleStack",
    photo:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote:
      "Reduced our sales cycle from 45 days to 28 days. Reps stopped wasting time on data entry.",
    name: "Tom Andersson",
    title: "Sales Director, NordCloud",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote:
      "Our board asked what changed in Q3. The answer was embarrassingly simple: we switched CRMs.",
    name: "Lisa Wang",
    title: "CEO, Momentic",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote:
      "Finally, a CRM that doesn't require a 3-month implementation. We were live in a weekend.",
    name: "Alex Rivera",
    title: "COO, Gridline",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
  },
];

function Card({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: "320px",
        borderRadius: "16px",
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ display: "flex", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} style={{ fontSize: "13px", color: "#e2a84b" }}>
            ★
          </span>
        ))}
      </div>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.65,
          color: "#374151",
          margin: 0,
          fontStyle: "italic",
        }}
      >
        &ldquo;{t.quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.photo}
          alt={t.name}
          width={36}
          height={36}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            width: "36px",
            height: "36px",
          }}
        />
        <div>
          <div
            style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}
          >
            {t.name}
          </div>
          <div style={{ fontSize: "11px", color: "#9ca3af" }}>{t.title}</div>
        </div>
      </div>
    </div>
  );
}

export function DemoMarquee() {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3);
  const duped1 = [...row1, ...row1, ...row1, ...row1];
  const duped2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Row 1 */}
      <div
        className="demo-marquee-row1"
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "16px",
          width: "max-content",
        }}
      >
        {duped1.map((t, i) => (
          <Card key={`r1-${i}`} t={t} />
        ))}
      </div>

      {/* Row 2 */}
      <div
        className="demo-marquee-row2"
        style={{
          display: "flex",
          gap: "16px",
          width: "max-content",
        }}
      >
        {duped2.map((t, i) => (
          <Card key={`r2-${i}`} t={t} />
        ))}
      </div>

      {/* Edge fades */}
      <div
        style={{
          position: "absolute",
          inset: "0",
          left: 0,
          width: "60px",
          background: "linear-gradient(to right, #f9fafb, transparent)",
          pointerEvents: "none",
          zIndex: 10,
          top: 0,
          bottom: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          width: "60px",
          background: "linear-gradient(to left, #f9fafb, transparent)",
          pointerEvents: "none",
          zIndex: 10,
          top: 0,
          bottom: 0,
        }}
      />

      {/* Watermark bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          padding: "0 4px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "4px",
              background: "linear-gradient(135deg, #7c3aed, #9333ea)",
            }}
          />
          <span
            style={{ fontSize: "11px", fontWeight: 600, color: "#aaa" }}
          >
            AcmeSaaS
          </span>
        </div>
        <a
          href="https://proofpst.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "10px", color: "#ccc", textDecoration: "none" }}
        >
          ✦ ProofPost
        </a>
      </div>

      <style>{`
        @keyframes demo-marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes demo-marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .demo-marquee-row1 {
          animation: demo-marquee-left 35s linear infinite;
        }
        .demo-marquee-row1:hover {
          animation-play-state: paused;
        }
        .demo-marquee-row2 {
          animation: demo-marquee-right 35s linear infinite;
        }
        .demo-marquee-row2:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
