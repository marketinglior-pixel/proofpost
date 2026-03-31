"use client";

import { useState } from "react";
import {
  Link2,
  Check,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CSVUpload } from "./csv-upload";

interface ImportCardProps {
  platform: string;
  platformLabel: string;
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
  enabled: boolean;
  urlPlaceholder?: string;
  urlPattern?: string;
  importCount?: number;
  onImportComplete?: () => void;
}

export function ImportCard({
  platform,
  platformLabel,
  icon,
  accentColor,
  accentBg,
  enabled,
  urlPlaceholder,
  importCount = 0,
  onImportComplete,
}: ImportCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<"url" | "csv">("csv");
  const [url, setUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleURLImport = async () => {
    if (!url.trim()) return;
    setIsImporting(true);
    setResult(null);

    try {
      const res = await fetch("/api/import-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ type: "error", message: data.error });
        return;
      }

      setResult({
        type: "success",
        message: `Successfully imported ${data.imported} reviews!`,
      });
      setUrl("");
      onImportComplete?.();
    } catch {
      setResult({
        type: "error",
        message: "Import failed. Please try again.",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleCSVImport = async (csv: string) => {
    setIsImporting(true);
    setResult(null);

    try {
      const res = await fetch("/api/import-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, csv }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ type: "error", message: data.error });
        return;
      }

      setResult({
        type: "success",
        message: `Successfully imported ${data.imported} reviews!`,
      });
      onImportComplete?.();
    } catch {
      setResult({
        type: "error",
        message: "Import failed. Please try again.",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-200",
        enabled
          ? "border-slate-200 bg-white hover:shadow-md"
          : "border-slate-100 bg-slate-50/50"
      )}
    >
      {/* Card header */}
      <button
        onClick={() => enabled && setExpanded(!expanded)}
        disabled={!enabled}
        className={cn(
          "w-full flex items-center gap-4 px-5 py-4",
          enabled && "cursor-pointer"
        )}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            enabled ? accentBg : "bg-slate-100"
          )}
        >
          {icon}
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                "text-[15px] font-semibold",
                enabled ? "text-slate-800" : "text-slate-400"
              )}
            >
              {platformLabel}
            </h3>
            {!enabled && (
              <span className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-400 rounded-full uppercase tracking-wide">
                Coming Soon
              </span>
            )}
          </div>
          {importCount > 0 && (
            <p className="text-[12px] text-slate-400 mt-0.5">
              {importCount} review{importCount !== 1 ? "s" : ""} imported
            </p>
          )}
        </div>

        {enabled && (
          <div className="flex-shrink-0 text-slate-400">
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        )}
      </button>

      {/* Expanded content */}
      {enabled && expanded && (
        <div className="px-5 pb-5 space-y-4">
          <div className="border-t border-slate-100 pt-4" />

          {/* Mode toggle */}
          <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setMode("csv")}
              className={cn(
                "flex-1 py-1.5 text-[13px] font-medium rounded-md transition-all",
                mode === "csv"
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              CSV Upload
            </button>
            <button
              onClick={() => setMode("url")}
              className={cn(
                "flex-1 py-1.5 text-[13px] font-medium rounded-md transition-all",
                mode === "url"
                  ? "bg-white text-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              URL Import
            </button>
          </div>

          {mode === "url" ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={
                      urlPlaceholder ||
                      `Paste your ${platformLabel} review page URL`
                    }
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald bg-white"
                  />
                </div>
                <button
                  onClick={handleURLImport}
                  disabled={isImporting || !url.trim()}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 flex-shrink-0",
                    isImporting || !url.trim()
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : `${accentBg} ${accentColor} hover:opacity-90`
                  )}
                >
                  {isImporting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Import"
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                We&apos;ll attempt to extract reviews from the page. If it
                doesn&apos;t work, try CSV upload instead.
              </p>
            </div>
          ) : (
            <CSVUpload
              platform={platform}
              onImport={handleCSVImport}
              isImporting={isImporting}
            />
          )}

          {/* Result message */}
          {result && (
            <div
              className={cn(
                "flex items-start gap-2 px-3 py-2.5 rounded-lg",
                result.type === "success"
                  ? "bg-emerald/5 border border-emerald/20"
                  : "bg-red-50 border border-red-100"
              )}
            >
              {result.type === "success" ? (
                <Check className="w-4 h-4 text-emerald mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <p
                className={cn(
                  "text-[13px]",
                  result.type === "success" ? "text-emerald" : "text-red-600"
                )}
              >
                {result.message}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
