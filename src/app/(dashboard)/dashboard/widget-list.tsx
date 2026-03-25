"use client";

import { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  ExternalLink,
  Layers,
  Quote,
  ChevronDown,
  Plus,
  Loader2,
  CheckSquare,
  Square,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import posthog from "posthog-js";

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

  // Multi-select for creating combined widget
  const [multiSelect, setMultiSelect] = useState(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [widgetName, setWidgetName] = useState("My Testimonials");
  const [creating, setCreating] = useState(false);

  const selected = items.find((i) => i.id === selectedId);
  const singleItems = items.filter((i) => i.type === "single");
  const hasMultipleSingles = singleItems.length >= 2;

  function getEmbedCode(id: string, style: WidgetStyle) {
    if (style === "marquee") {
      return `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${id}" data-style="marquee" data-max-width="100%"></script>`;
    }
    return `<script src="${PROOFPOST_HOST}/embed.js" data-proofpost-id="${id}"></script>`;
  }

  function copyCode() {
    if (!selectedId) return;
    navigator.clipboard.writeText(getEmbedCode(selectedId, selectedStyle));
    posthog.capture("embed_code_copied", { source: "dashboard", style: selectedStyle });
    setCopied(true);
    toast.success("Embed code copied!");
    setTimeout(() => setCopied(false), 2000);
  }

  function toggleCheck(id: string) {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleSelectAll() {
    if (checkedIds.size === singleItems.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(singleItems.map((i) => i.id)));
    }
  }

  function exitMultiSelect() {
    setMultiSelect(false);
    setCheckedIds(new Set());
  }

  async function handleCreateWidget() {
    if (checkedIds.size < 2) {
      toast.error("Select at least 2 reviews to combine");
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: widgetName,
          contentIds: Array.from(checkedIds),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create widget");
        return;
      }

      posthog.capture("widget_created", {
        review_count: checkedIds.size,
        widget_name: widgetName,
        source: "dashboard",
      });
      toast.success(`Widget "${widgetName}" created with ${checkedIds.size} reviews!`);
      // Reload the page to show the new widget
      window.location.reload();
    } catch {
      toast.error("Failed to create widget");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-slate-400" />
          My Widgets
        </h2>
        <div className="flex items-center gap-3">
          {hasMultipleSingles && !multiSelect && (
            <button
              onClick={() => {
                setMultiSelect(true);
                setSelectedId(null);
              }}
              className="flex items-center gap-1.5 text-[12px] text-emerald-dark hover:text-emerald font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Combine Reviews
            </button>
          )}
          {multiSelect && (
            <button
              onClick={exitMultiSelect}
              className="text-[12px] text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel
            </button>
          )}
          <span className="text-[12px] text-slate-400">{items.length} items</span>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
        {/* Multi-select header */}
        {multiSelect && (
          <div className="flex items-center justify-between px-5 py-2.5 bg-emerald/5 border-b border-slate-200">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-[12px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              {checkedIds.size === singleItems.length ? (
                <CheckSquare className="w-4 h-4 text-emerald" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
              Select All ({singleItems.length})
            </button>
            <span className="text-[12px] text-slate-500">
              {checkedIds.size} selected
            </span>
          </div>
        )}

        {/* Widget selector */}
        <div className="divide-y divide-slate-100 max-h-[280px] overflow-y-auto">
          {items.map((item) => {
            const isMultiSelectable = multiSelect && item.type === "single";
            const isChecked = checkedIds.has(item.id);

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isMultiSelectable) {
                    toggleCheck(item.id);
                  } else if (!multiSelect) {
                    setSelectedId(item.id === selectedId ? null : item.id);
                  }
                }}
                className={`w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors ${
                  isChecked
                    ? "bg-emerald/5"
                    : selectedId === item.id
                      ? "bg-emerald/5"
                      : multiSelect && item.type !== "single"
                        ? "opacity-40 cursor-default"
                        : "hover:bg-slate-50"
                }`}
                disabled={multiSelect && item.type !== "single"}
              >
                {/* Checkbox in multi-select mode */}
                {multiSelect ? (
                  <div className="flex-shrink-0">
                    {item.type === "single" ? (
                      isChecked ? (
                        <CheckSquare className="w-4.5 h-4.5 text-emerald" />
                      ) : (
                        <Square className="w-4.5 h-4.5 text-slate-300" />
                      )
                    ) : (
                      <Layers className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                ) : null}

                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    item.type === "widget" ? "bg-amber-50" : "bg-emerald/10"
                  }`}
                >
                  {item.type === "widget" ? (
                    <Layers className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Quote className="w-4 h-4 text-emerald" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-slate-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item.type === "widget"
                      ? `${item.reviewCount} reviews`
                      : "Single review"}{" "}
                    ·{" "}
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {!multiSelect && (
                  <ChevronDown
                    className={`w-4 h-4 text-slate-300 transition-transform ${
                      selectedId === item.id ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Multi-select: create widget panel */}
        {multiSelect && checkedIds.size >= 2 && (
          <div className="border-t border-slate-200 bg-slate-50 p-5 space-y-3">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-slate-500">
                Widget Name
              </label>
              <Input
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                placeholder="My Testimonials"
                className="h-9 text-[13px] border-slate-200"
              />
            </div>
            <Button
              onClick={handleCreateWidget}
              disabled={creating}
              className="w-full h-10 bg-emerald hover:bg-emerald-dark text-white font-medium shadow-none glow-emerald"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Widget ({checkedIds.size} reviews)
                </>
              )}
            </Button>
          </div>
        )}

        {/* Single-select: embed code panel */}
        {!multiSelect && selected && (
          <div className="border-t border-slate-200 bg-slate-50 p-5 space-y-4">
            {/* Style selector */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-slate-500">
                Widget style:
              </span>
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
              Paste this code into your website HTML where you want the widget to
              appear.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
