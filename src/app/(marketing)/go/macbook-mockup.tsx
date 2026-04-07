"use client";

export function MacbookMockup({ src }: { src: string }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: "min(100%, 1100px)" }}>
      {/* Screen */}
      <div className="relative bg-gray-900 rounded-t-2xl border-[10px] border-gray-900 overflow-hidden shadow-2xl shadow-slate-400/30">
        {/* Camera dot */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gray-700 z-10" />

        {/* Screen content — iframe scaled to fill */}
        <div className="bg-white relative overflow-hidden" style={{ height: "clamp(400px, 55vw, 680px)" }}>
          <iframe
            src={src}
            title="Trust Card Desktop Preview"
            className="absolute top-0 left-0 border-none"
            style={{
              width: "1440px",
              height: "900px",
              transform: "scale(var(--macbook-scale, 0.76))",
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
            loading="lazy"
            scrolling="no"
          />
        </div>
      </div>

      {/* Keyboard base */}
      <div className="relative mx-auto">
        <div className="h-[14px] bg-gradient-to-b from-gray-800 to-gray-700 rounded-b-sm mx-[8%]" />
        <div className="h-[10px] bg-gray-600 rounded-b-2xl mx-[3%]" />
      </div>

      {/* Responsive scale */}
      <style>{`
        .macbook-container { --macbook-scale: 0.76; }
        @media (min-width: 1200px) { .macbook-container { --macbook-scale: 0.76; } }
        @media (max-width: 1199px) and (min-width: 1024px) { .macbook-container { --macbook-scale: 0.65; } }
        @media (max-width: 1023px) and (min-width: 768px) { .macbook-container { --macbook-scale: 0.52; } }
        @media (max-width: 767px) { .macbook-container { --macbook-scale: 0.35; } }
      `}</style>
    </div>
  );
}
