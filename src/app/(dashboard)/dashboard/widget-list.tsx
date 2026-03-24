"use client";

import { useState } from "react";
import { Code2, Copy, Check, ExternalLink, Layers, Quote, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const PROOFPOST_HOST = "https://proofpst.com";

interface EmbedItem {
  id: string;
  name: string;
  type: "widget" | "single";
  reviewCount: number;
  createdAt: string;
}

type WidgetStyle = "carousel" | "marquee";

export function WidgetList({ items }: { items: EmbedItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<WidgetStyle>("carousel");
  const [copied, setCopied] = useState(false);

  const selected = items.find((i) => i.id === selectedId);

  function getEmbedCode(id: string, style: WidgetStyle) {
    if (style === "marquee") {
      return `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${id}" data-style="marquee" data-max-width="100%"></script>`;
    }
    return `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${id}"></script>`;
  }

  function copyCode() {
    if (!selectedId) return;
    navigator.clipboard.writeText(getEmbedCode(selectedId, selectedStyle));
    setCopied(true);
    toast.success("Embed code copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-slate-400" />
          My Widgets
        </h2>
        <span className="text-[12px] text-slate-400">{items.length} items</span>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {/* Widget selector */}
        <div className="divide-y divide-slate-100 max-h-[280px] overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${
                selectedId === item.id ? "bg-emerald/5" : "hover:bg-slate-50"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.type === "widget" ? "bg-amber-50" : "bg-emerald/10"
              }`}>
                {item.type === "widget" ? (
                  <Layers className="w-4 h-4 text-amber-500" />
                ) : (
                  <Quote className="w-4 h-4 text-emerald" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-800 truncate">{item.name}</p>
                <p className="text-[11px] text-slate-400">
                  {item.type === "widget" ? `${item.reviewCount} reviews` : "Single review"} · {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${selectedId === item.id ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>

        {/* Embed code panel */}
        {selected && (
          <div className="border-t border-slate-200 bg-slate-50 p-5 space-y-4">
            {/* Style selector */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-slate-500">Widget style:</span>
              <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setSelectedStyle("carousel")}
                  className={`px-3 py-1.5 text-[12px] font-medium transition-colors ${
                    selectedStyle === "carousel"
                      ? "bg-emerald text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Carousel
                </button>
                <button
                  onClick={() => setSelectedStyle("marquee")}
                  className={`px-3 py-1.5 text-[12px] font-medium transition-colors border-l border-slate-200 ${
                    selectedStyle === "marquee"
                      ? "bg-emerald text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Marquee
                </button>
              </div>
            </div>

            {/* Preview link */}
            <div className="flex items-center gap-2">
              <a
                href={`${PROOFPOST_HOST}/embed/${selected.id}?style=${selectedStyle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] text-emerald hover:text-emerald-dark transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Preview widget
              </a>
            </div>

            {/* Code */}
            <div className="relative">
              <code className="block text-[11px] bg-navy text-emerald font-mono rounded-lg px-4 py-3 pr-12 overflow-x-auto whitespace-nowrap">
                {getEmbedCode(selected.id, selectedStyle)}
              </code>
              <button
                onClick={copyCode}
                className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                title="Copy embed code"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              Paste this code into your website HTML where you want the widget to appear.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
