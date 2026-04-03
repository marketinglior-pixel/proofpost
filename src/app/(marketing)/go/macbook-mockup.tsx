"use client";

export function MacbookMockup({ src }: { src: string }) {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Screen */}
      <div className="relative bg-gray-900 rounded-t-xl border-[8px] border-gray-900 overflow-hidden shadow-2xl shadow-slate-300/50">
        {/* Camera dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700 z-10" />

        {/* Screen content */}
        <div className="bg-white aspect-[16/10] overflow-hidden">
          <iframe
            src={src}
            title="Trust Card Desktop Preview"
            className="w-full h-full border-none"
            loading="lazy"
            scrolling="no"
            style={{ pointerEvents: "none" }}
          />
        </div>
      </div>

      {/* Keyboard base */}
      <div className="relative mx-auto">
        {/* Hinge */}
        <div className="h-[12px] bg-gradient-to-b from-gray-800 to-gray-700 rounded-b-sm mx-[10%]" />
        {/* Bottom plate */}
        <div className="h-[8px] bg-gray-600 rounded-b-xl mx-[5%]" />
      </div>
    </div>
  );
}
