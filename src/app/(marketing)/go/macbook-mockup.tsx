"use client";

export function MacbookMockup({ src }: { src: string }) {
  return (
    <div className="relative mx-auto max-w-6xl">
      {/* Screen */}
      <div className="relative bg-gray-900 rounded-t-xl border-[8px] border-gray-900 overflow-hidden shadow-2xl shadow-slate-300/50">
        {/* Camera dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700 z-10" />

        {/* Screen content — scaled iframe */}
        <div className="bg-white relative" style={{ paddingBottom: "75%" /* taller to show full Trust Card */ }}>
          <iframe
            src={src}
            title="Trust Card Desktop Preview"
            className="absolute top-0 left-0 border-none w-full h-full"
            style={{
              width: "1440px",
              height: "1080px",
              transform: "scale(var(--macbook-scale, 0.75))",
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
        <div className="h-[12px] bg-gradient-to-b from-gray-800 to-gray-700 rounded-b-sm mx-[10%]" />
        <div className="h-[8px] bg-gray-600 rounded-b-xl mx-[5%]" />
      </div>

      {/* Scale CSS variable based on container width */}
      <style>{`
        @media (min-width: 1280px) { .macbook-container { --macbook-scale: 0.8; } }
        @media (min-width: 1024px) and (max-width: 1279px) { .macbook-container { --macbook-scale: 0.7; } }
        @media (min-width: 768px) and (max-width: 1023px) { .macbook-container { --macbook-scale: 0.55; } }
        @media (max-width: 767px) { .macbook-container { --macbook-scale: 0.35; } }
      `}</style>
    </div>
  );
}
