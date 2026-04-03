"use client";

export function IPhoneMockup({ src }: { src: string }) {
  return (
    <div className="relative mx-auto" style={{ width: 300, height: 614 }}>
      {/* Device shadow */}
      <div className="absolute inset-0 rounded-[2.5rem] shadow-2xl shadow-slate-300/60" />

      {/* Device frame */}
      <div className="relative bg-gray-900 border-[12px] border-gray-900 rounded-[2.5rem] h-full w-full overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-gray-900 rounded-b-[1rem] z-20" />

        {/* Side buttons */}
        <div className="absolute -left-[15px] top-[120px] w-[3px] h-[32px] bg-gray-900 rounded-l-lg" />
        <div className="absolute -left-[15px] top-[164px] w-[3px] h-[46px] bg-gray-900 rounded-l-lg" />
        <div className="absolute -left-[15px] top-[218px] w-[3px] h-[46px] bg-gray-900 rounded-l-lg" />
        <div className="absolute -right-[15px] top-[160px] w-[3px] h-[64px] bg-gray-900 rounded-r-lg" />

        {/* Screen */}
        <div className="rounded-[1.75rem] overflow-hidden w-full h-full bg-white">
          <iframe
            src={src}
            title="Trust Card Mobile Preview"
            className="w-full h-full border-none"
            loading="lazy"
            scrolling="no"
            style={{ pointerEvents: "none" }}
          />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-gray-600 rounded-full z-20" />
      </div>
    </div>
  );
}
