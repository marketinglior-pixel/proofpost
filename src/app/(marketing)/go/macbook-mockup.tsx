"use client";

export function MacbookMockup({ src }: { src: string }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Screen */}
      <div className="relative bg-gray-900 rounded-t-xl border-[8px] border-gray-900 overflow-hidden shadow-2xl shadow-slate-300/50">
        {/* Camera dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700 z-10" />

        {/* Screen content — scaled iframe */}
        <div className="bg-white relative" style={{ paddingBottom: "62.5%" /* 16:10 */ }}>
          <iframe
            src={src}
            title="Trust Card Desktop Preview"
            className="absolute top-0 left-0 border-none"
            style={{
              width: "1280px",
              height: "800px",
              transform: "scale(var(--macbook-scale, 0.65))",
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
        @media (min-width: 1024px) { .macbook-container { --macbook-scale: 0.68; } }
        @media (max-width: 1023px) { .macbook-container { --macbook-scale: 0.5; } }
        @media (max-width: 640px) { .macbook-container { --macbook-scale: 0.3; } }
      `}</style>
    </div>
  );
}
