"use client";

export function MacbookMockup({ src }: { src: string }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: "1400px" }}>
      {/* Screen */}
      <div className="relative bg-gray-900 rounded-t-2xl border-[10px] border-gray-900 overflow-hidden shadow-2xl shadow-slate-400/30">
        {/* Camera dot */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gray-700 z-10" />

        {/* Screen content — full-width iframe with scrolling disabled */}
        <div className="bg-white relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
          <iframe
            src={src}
            title="Trust Card Desktop Preview"
            className="absolute inset-0 border-none"
            style={{
              width: "250%",
              height: "250%",
              transform: "scale(0.4)",
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
    </div>
  );
}
