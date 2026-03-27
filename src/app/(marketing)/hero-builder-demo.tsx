"use client";

import { useState } from "react";

const PRESETS = [
  { id: "modern", label: "Modern", bg: "#ffffff", accent: "#6366f1", text: "#334155", radius: 20, shadow: "0 25px 50px -12px rgba(99,102,241,0.15)", font: "'Inter', system-ui" },
  { id: "classic", label: "Classic", bg: "#ffffff", accent: "#0ea5e9", text: "#1e293b", radius: 8, shadow: "0 1px 3px rgba(0,0,0,0.08)", font: "Georgia, serif" },
  { id: "minimal", label: "Minimal", bg: "#ffffff", accent: "#94a3b8", text: "#64748b", radius: 0, shadow: "none", font: "system-ui" },
  { id: "bold", label: "Bold", bg: "#0f172a", accent: "#f59e0b", text: "#e2e8f0", radius: 16, shadow: "0 25px 50px -12px rgba(245,158,11,0.2)", font: "system-ui" },
];

export function HeroBuilderDemo() {
  const [activePreset, setActivePreset] = useState(0);
  const [customAccent, setCustomAccent] = useState<string | null>(null);
  const [customRadius, setCustomRadius] = useState<number | null>(null);

  const preset = PRESETS[activePreset];
  const accent = customAccent || preset.accent;
  const radius = customRadius !== null ? customRadius : preset.radius;
  const bg = preset.bg;
  const text = preset.text;
  const shadow = preset.shadow;
  const font = preset.font;

  function selectPreset(idx: number) {
    setActivePreset(idx);
    setCustomAccent(null);
    setCustomRadius(null);
  }

  return (
    <div style={{ display: "flex", gap: "12px", width: "100%", fontFamily: "system-ui, sans-serif" }}>
      {/* Controls */}
      <div style={{
        flex: "0 0 140px",
        background: "#f8fafc",
        borderRadius: "12px",
        border: "1px solid rgba(226,232,240,0.8)",
        padding: "14px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        fontSize: "11px",
      }}>
        {/* Presets */}
        <div>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Presets</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px", marginTop: "6px" }}>
            {PRESETS.map((p, i) => (
              <button
                key={p.id}
                onClick={() => selectPreset(i)}
                style={{
                  padding: "5px 0",
                  borderRadius: "6px",
                  border: activePreset === i ? `2px solid ${p.accent}` : "1px solid #e2e8f0",
                  background: activePreset === i ? `${p.accent}10` : "#fff",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: activePreset === i ? p.accent : "#64748b",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Accent</span>
          <div style={{ display: "flex", gap: "4px", marginTop: "6px", flexWrap: "wrap" }}>
            {["#10B981", "#6366f1", "#f59e0b", "#ef4444", "#0ea5e9", "#ec4899"].map((c) => (
              <button
                key={c}
                onClick={() => setCustomAccent(c)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: c,
                  border: accent === c ? "2px solid #0f172a" : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Radius: {radius}px
          </span>
          <input
            type="range"
            min={0}
            max={24}
            value={radius}
            onChange={(e) => setCustomRadius(Number(e.target.value))}
            style={{ width: "100%", marginTop: "6px", accentColor: accent }}
          />
        </div>

        {/* Live indicator */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "9px",
          color: "#10B981",
          fontWeight: 600,
        }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#10B981", animation: "sparkle-pulse 2s infinite" }} />
          Live Preview
        </div>
      </div>

      {/* Preview Card */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: font,
            background: bg,
            borderRadius: `${radius}px`,
            overflow: "hidden",
            border: "1px solid rgba(226,232,240,0.8)",
            boxShadow: shadow,
            width: "100%",
            maxWidth: "320px",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ padding: "28px 20px 14px", textAlign: "center" }}>
            <span style={{ fontSize: "40px", lineHeight: "0.5", color: accent, opacity: 0.15, fontFamily: "Georgia, serif" }}>
              &ldquo;
            </span>
            <p style={{
              fontSize: "13px",
              lineHeight: 1.625,
              color: bg === "#0f172a" ? "#f1f5f9" : text,
              fontStyle: "italic",
              margin: "6px 0 0",
              transition: "color 0.3s",
            }}>
              This product completely transformed how we handle customer feedback. Revenue is up 40% since we started.
            </p>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "14px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                transition: "background 0.3s",
              }}>
                JS
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, color: bg === "#0f172a" ? "#f1f5f9" : "#0f172a", transition: "color 0.3s" }}>
                  Jane Smith
                </div>
                <div style={{ fontSize: "9px", color: bg === "#0f172a" ? "#94a3b8" : "#94a3b8" }}>
                  VP Marketing, Acme Inc
                </div>
              </div>
            </div>
          </div>
          <div style={{
            padding: "8px 20px",
            borderTop: `1px solid ${bg === "#0f172a" ? "rgba(255,255,255,0.1)" : "rgba(241,245,249,1)"}`,
            background: bg === "#0f172a" ? "rgba(255,255,255,0.03)" : "rgba(248,250,252,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.3s",
          }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: i === 0 ? "14px" : "5px",
                  height: "5px",
                  borderRadius: "3px",
                  backgroundColor: i === 0 ? accent : "rgba(15,23,42,0.12)",
                  transition: "background-color 0.3s",
                }} />
              ))}
            </div>
            <span style={{ fontSize: "8px", color: accent, fontWeight: 500, transition: "color 0.3s" }}>
              ✦ ProofPost
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
