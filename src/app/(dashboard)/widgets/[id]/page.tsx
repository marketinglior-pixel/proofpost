"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Loader2, Check, Copy, ExternalLink, Palette, Type,
  Eye, EyeOff, Zap, RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  type WidgetStyle,
  DEFAULT_STYLE,
  WIDGET_PRESETS,
  FONT_OPTIONS,
  mergeStyle,
  getShadowCSS,
} from "@/lib/widget-styles";

const PROOFPOST_HOST = "https://proofpst.com";

export default function WidgetBuilderPage() {
  const params = useParams();
  const widgetId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [widgetName, setWidgetName] = useState("");
  const [style, setStyle] = useState<WidgetStyle>(DEFAULT_STYLE);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [embedStyle, setEmbedStyle] = useState<"carousel" | "marquee" | "grid" | "stack" | "badge" | "card" | "floating">("carousel");

  useEffect(() => {
    fetch("/api/widgets")
      .then((r) => r.json())
      .then((data) => {
        const widget = data.widgets?.find((w: { id: string }) => w.id === widgetId);
        if (widget) {
          setWidgetName(widget.name);
          if (widget.style) {
            setStyle(mergeStyle(DEFAULT_STYLE, widget.style));
          }
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [widgetId]);

  const updateStyle = useCallback((key: keyof WidgetStyle, value: unknown) => {
    setStyle((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }, []);

  const applyPreset = (presetId: string) => {
    const preset = WIDGET_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setStyle(mergeStyle(DEFAULT_STYLE, preset.style));
      setActivePreset(presetId);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/widgets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ widgetId, name: widgetName, style }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Widget style saved!");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const copyEmbedCode = () => {
    let code: string;
    if (embedStyle === "badge") {
      code = `<iframe src="${PROOFPOST_HOST}/embed/${widgetId}?style=badge" style="position:fixed;bottom:0;left:0;width:380px;height:500px;border:none;z-index:9999;pointer-events:auto;background:transparent;" allowtransparency="true"></iframe>`;
    } else if (embedStyle === "floating") {
      code = `<iframe src="${PROOFPOST_HOST}/embed/${widgetId}?style=floating" style="position:fixed;bottom:0;left:0;width:400px;height:200px;border:none;z-index:9999;pointer-events:auto;background:transparent;" allowtransparency="true"></iframe>`;
    } else if (embedStyle === "carousel") {
      code = `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${widgetId}"></script>`;
    } else {
      code = `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${widgetId}" data-style="${embedStyle}" data-max-width="100%"></script>`;
    }
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Embed code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl">
      <Link
        href="/dashboard"
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Widget Builder</h1>
          <p className="text-sm text-slate-500 mt-1">Customize how your testimonials look on your website</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald hover:bg-emerald-dark text-white"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
          Save Style
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Widget Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Widget Name</label>
            <Input
              value={widgetName}
              onChange={(e) => setWidgetName(e.target.value)}
              placeholder="My Testimonials"
            />
          </div>

          {/* Presets */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-slate-400" />
              Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {WIDGET_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset.id)}
                  className={`rounded-lg border p-3 text-left transition-all ${
                    activePreset === preset.id
                      ? "border-emerald ring-2 ring-emerald/20"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-4 h-4 rounded-full border border-slate-200"
                      style={{ backgroundColor: preset.style.accentColor }}
                    />
                    <span className="text-xs font-semibold text-slate-800">{preset.name}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{preset.description}</p>
                </button>
              ))}
            </div>
            <button
              onClick={() => { setStyle(DEFAULT_STYLE); setActivePreset(null); }}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset to default
            </button>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Colors</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "backgroundColor" as const, label: "Background" },
                { key: "textColor" as const, label: "Text" },
                { key: "accentColor" as const, label: "Accent" },
                { key: "quoteColor" as const, label: "Quote" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style[key]}
                    onChange={(e) => updateStyle(key, e.target.value)}
                    className="w-8 h-8 rounded-lg border border-slate-200 cursor-pointer"
                  />
                  <div>
                    <p className="text-xs font-medium text-slate-700">{label}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{style[key]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <Type className="w-4 h-4 text-slate-400" />
              Typography
            </label>
            <select
              value={style.fontFamily}
              onChange={(e) => updateStyle("fontFamily", e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
            >
              {FONT_OPTIONS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </div>

          {/* Border Radius */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Border Radius: {style.borderRadius}px
            </label>
            <input
              type="range"
              min={0}
              max={32}
              value={style.borderRadius}
              onChange={(e) => updateStyle("borderRadius", Number(e.target.value))}
              className="w-full accent-emerald"
            />
          </div>

          {/* Shadow */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Shadow</label>
            <div className="flex gap-2">
              {(["none", "subtle", "elevated"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => updateStyle("shadowStyle", s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    style.shadowStyle === s
                      ? "border-emerald bg-emerald/5 text-emerald"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Visibility Toggles */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-slate-400" />
              Show / Hide Elements
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: "showStars" as const, label: "Stars" },
                { key: "showTitle" as const, label: "Job Title" },
                { key: "showCompany" as const, label: "Company" },
                { key: "showAvatar" as const, label: "Avatar" },
                { key: "showSource" as const, label: "Source" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => updateStyle(key, !style[key])}
                  className={`flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-colors ${
                    style[key]
                      ? "border-emerald/30 bg-emerald/5 text-emerald"
                      : "border-slate-200 text-slate-400"
                  }`}
                >
                  {style[key] ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Animation */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-slate-400" />
              Animation
            </label>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600">Auto-play</span>
              <button
                onClick={() => updateStyle("autoPlay", !style.autoPlay)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  style.autoPlay ? "bg-emerald" : "bg-slate-200"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                  style.autoPlay ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
            {style.autoPlay && (
              <div className="space-y-1">
                <span className="text-xs text-slate-500">Speed: {style.animationSpeed}s</span>
                <input
                  type="range"
                  min={2}
                  max={8}
                  step={0.5}
                  value={style.animationSpeed}
                  onChange={(e) => updateStyle("animationSpeed", Number(e.target.value))}
                  className="w-full accent-emerald"
                />
              </div>
            )}
          </div>

          {/* Direction */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Direction</label>
            <div className="flex gap-2">
              {(["auto", "ltr", "rtl"] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => updateStyle("direction", d)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    style.direction === d
                      ? "border-emerald bg-emerald/5 text-emerald"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {d.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Badge Position (only when badge layout selected) */}
          {embedStyle === "badge" && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">Badge Position</label>
              <div className="grid grid-cols-2 gap-2">
                {([
                  { value: "top-left" as const, label: "↖ Top Left" },
                  { value: "top-right" as const, label: "↗ Top Right" },
                  { value: "bottom-left" as const, label: "↙ Bottom Left" },
                  { value: "bottom-right" as const, label: "↘ Bottom Right" },
                ] as const).map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateStyle("badgePosition", value)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      (style.badgePosition || "bottom-left") === value
                        ? "border-emerald bg-emerald/5 text-emerald"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <div className="sticky top-8">
            <label className="text-sm font-medium text-slate-700 mb-3 block">Live Preview</label>

            {/* Preview card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
              {embedStyle === "badge" ? (
                /* Badge preview */
                <div style={{
                  position: "relative",
                  height: "200px",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid rgba(226,232,240,0.5)",
                  overflow: "hidden",
                }}>
                  {/* Simulated page content */}
                  <div style={{ textAlign: "center", padding: "40px 20px", opacity: 0.3 }}>
                    <div style={{ width: "120px", height: "10px", background: "#cbd5e1", borderRadius: "4px", margin: "0 auto 12px" }} />
                    <div style={{ width: "180px", height: "8px", background: "#e2e8f0", borderRadius: "4px", margin: "0 auto 8px" }} />
                    <div style={{ width: "160px", height: "8px", background: "#e2e8f0", borderRadius: "4px", margin: "0 auto" }} />
                  </div>
                  {/* Badge */}
                  <div style={{
                    position: "absolute",
                    ...(style.badgePosition === "top-left" ? { top: "12px", left: "12px" } :
                        style.badgePosition === "top-right" ? { top: "12px", right: "12px" } :
                        style.badgePosition === "bottom-right" ? { bottom: "12px", right: "12px" } :
                        { bottom: "12px", left: "12px" }),
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 14px",
                      backgroundColor: style.backgroundColor,
                      borderRadius: "9999px",
                      border: "1px solid rgba(226,232,240,0.8)",
                      boxShadow: getShadowCSS(style.shadowStyle),
                      fontFamily: style.fontFamily,
                    }}>
                      {style.showStars && (
                        <div style={{ display: "flex", gap: "1px" }}>
                          {[1,2,3,4,5].map((i) => (
                            <span key={i} style={{ color: "#FBBF24", fontSize: "10px" }}>★</span>
                          ))}
                        </div>
                      )}
                      <span style={{ fontSize: "12px", fontWeight: 700, color: style.textColor }}>5.0</span>
                      <div style={{ width: "1px", height: "12px", background: "rgba(226,232,240,0.8)" }} />
                      <span style={{ fontSize: "10px", color: `${style.textColor}80` }}>from 5 reviews</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Default carousel preview */
                <div
                  style={{
                    fontFamily: style.fontFamily,
                    backgroundColor: style.backgroundColor,
                    borderRadius: `${style.borderRadius}px`,
                    boxShadow: getShadowCSS(style.shadowStyle),
                    border: "1px solid rgba(226,232,240,0.8)",
                    overflow: "hidden",
                    maxWidth: "400px",
                    margin: "0 auto",
                  }}
                >
                  {/* Preview card content */}
                  <div style={{ padding: "32px 24px 16px", textAlign: "center" }}>
                    <span style={{ fontSize: "48px", lineHeight: "0.5", color: style.accentColor, opacity: 0.15, fontFamily: "Georgia, serif" }}>
                      &ldquo;
                    </span>
                    <p style={{ fontSize: "14px", lineHeight: 1.625, color: style.quoteColor, fontStyle: "italic", margin: "8px 0 0" }}>
                      This product completely transformed how we handle customer feedback. Revenue is up 40% since we started.
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "16px" }}>
                      {style.showAvatar && (
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "50%",
                          background: `linear-gradient(135deg, ${style.accentColor}, ${style.accentColor}cc)`,
                          color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "13px", fontWeight: 700,
                        }}>
                          JS
                        </div>
                      )}
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: style.textColor }}>
                          Jane Smith
                        </div>
                        {(style.showTitle || style.showCompany) && (
                          <div style={{ fontSize: "10px", color: `${style.textColor}80` }}>
                            {style.showTitle ? "VP Marketing" : ""}
                            {style.showTitle && style.showCompany ? ", " : ""}
                            {style.showCompany ? "Acme Inc" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                    {style.showStars && (
                      <div style={{ display: "flex", justifyContent: "center", gap: "2px", marginTop: "12px" }}>
                        {[1,2,3,4,5].map((i) => (
                          <span key={i} style={{ color: "#FBBF24", fontSize: "14px" }}>&#9733;</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{
                    padding: "10px 24px",
                    borderTop: `1px solid ${style.backgroundColor === "#0f172a" ? "rgba(255,255,255,0.1)" : "rgba(241,245,249,1)"}`,
                    background: style.backgroundColor === "#0f172a" ? "rgba(255,255,255,0.03)" : "rgba(248,250,252,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {[0,1,2].map((i) => (
                        <div key={i} style={{
                          width: i === 0 ? "16px" : "5px", height: "5px",
                          borderRadius: "3px",
                          backgroundColor: i === 0 ? style.accentColor : "rgba(15,23,42,0.12)",
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: "9px", color: style.accentColor, fontWeight: 500 }}>
                      ✦ ProofPost Widget
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Embed Code */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">Layout:</span>
                <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                  {(["carousel", "marquee", "grid", "stack", "card", "floating", "badge"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setEmbedStyle(s)}
                      className={`px-3 py-1.5 text-[11px] font-medium transition-colors ${
                        embedStyle === s ? "bg-emerald text-white" : "bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {s === "badge" ? "Badge" : s === "floating" ? "Floating" : s === "card" ? "Card" : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative">
                <code className="block text-[11px] bg-slate-900 text-emerald-400 font-mono rounded-lg px-4 py-3 overflow-x-auto whitespace-nowrap">
                  {embedStyle === "badge"
                    ? `<iframe src="${PROOFPOST_HOST}/embed/${widgetId}?style=badge" style="position:fixed;bottom:0;left:0;width:380px;height:500px;border:none;z-index:9999;" allowtransparency="true"></iframe>`
                    : embedStyle === "floating"
                      ? `<iframe src="${PROOFPOST_HOST}/embed/${widgetId}?style=floating" style="position:fixed;bottom:0;left:0;width:400px;height:200px;border:none;z-index:9999;" allowtransparency="true"></iframe>`
                      : embedStyle === "carousel"
                        ? `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${widgetId}"></script>`
                        : `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${widgetId}" data-style="${embedStyle}"></script>`
                  }
                </code>
                <button
                  onClick={copyEmbedCode}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </div>

              <a
                href={`${PROOFPOST_HOST}/embed/${widgetId}?style=${embedStyle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-emerald hover:text-emerald-dark transition-colors"
              >
                <ExternalLink className="w-3 h-3" /> Preview on site
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
