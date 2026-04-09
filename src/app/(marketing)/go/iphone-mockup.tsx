"use client";

export function IPhoneMockup({ src, scale = 1 }: { src: string; scale?: number }) {
  return (
    <div className="relative mx-auto" style={{ width: 300 * scale, height: 614 * scale }}>
      <div
        className="absolute top-0 left-0"
        style={{ width: 300, height: 614, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
      {/* Device shadow */}
      <div className="absolute inset-0 rounded-[2.5rem] shadow-2xl shadow-slate-300/60" />

      {/* Device frame */}
      <div className="relative bg-gray-900 border-[12px] border-gray-900 rounded-[2.5rem] h-full w-full overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-gray-900 rounded-b-[1rem] z-20" />

        {/* Side buttons */}
        <div className="absolute -left-[15px] top-[120px] w-[3px] h-[32px] bg-gray-900 rounded-l-lg" />
        <div className="absolute -left-[15px] top-[164px] w-[3px] h-[46px] bg-gray-900 rounded-l-lg" />
        <div className="absolute -left-[15px] top-[218px] w-[3px] h-[46px] bg-gray-900 rounded-l-lg" />
        <div className="absolute -right-[15px] top-[160px] w-[3px] h-[64px] bg-gray-900 rounded-r-lg" />

        {/* Screen — iframe scaled to fit nicely */}
        <div className="rounded-[1.75rem] overflow-hidden w-full h-full bg-white relative">
          <iframe
            src={src}
            title="Trust Card Mobile Preview"
            className="absolute top-0 left-0 border-none"
            style={{
              width: "375px",
              height: "812px",
              transform: "scale(0.737)",
              transformOrigin: "top left",
              pointerEvents: "none",
            }}
            loading="lazy"
            scrolling="no"
          />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-gray-600 rounded-full z-20" />
      </div>
      </div>
    </div>
  );
}
