"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, FileText, X, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ParsedReview {
  reviewer_name: string;
  reviewer_title?: string;
  reviewer_company?: string;
  review_text: string;
  rating: number;
  review_date?: string;
}

interface CSVUploadProps {
  platform: string;
  onImport: (csv: string) => Promise<void>;
  isImporting: boolean;
}

export function CSVUpload({ platform, onImport, isImporting }: CSVUploadProps) {
  const [csvText, setCsvText] = useState("");
  const [preview, setPreview] = useState<ParsedReview[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parsePreview = useCallback((text: string) => {
    setCsvText(text);
    setParseError(null);

    if (!text.trim()) {
      setPreview([]);
      return;
    }

    try {
      const lines = text.trim().split("\n");
      if (lines.length < 2) {
        setPreview([]);
        return;
      }

      const headers = lines[0]
        .split(",")
        .map((h) => h.trim().toLowerCase().replace(/^["']|["']$/g, ""));

      const fieldMap: Record<string, number> = {};
      headers.forEach((h, i) => {
        if (/name|reviewer/.test(h)) fieldMap["name"] = i;
        else if (/title|role/.test(h)) fieldMap["title"] = i;
        else if (/company|org/.test(h)) fieldMap["company"] = i;
        else if (/rating|score|stars/.test(h)) fieldMap["rating"] = i;
        else if (/review|text|comment|feedback/.test(h)) fieldMap["review"] = i;
        else if (/date|time/.test(h)) fieldMap["date"] = i;
      });

      if (fieldMap["name"] === undefined || fieldMap["review"] === undefined) {
        setParseError(
          'CSV must have "name" and "review" columns. Found: ' +
            headers.join(", ")
        );
        setPreview([]);
        return;
      }

      const reviews: ParsedReview[] = [];
      for (let i = 1; i < Math.min(lines.length, 6); i++) {
        const cols = lines[i].split(",").map((c) =>
          c.trim().replace(/^["']|["']$/g, "")
        );
        const name = cols[fieldMap["name"]]?.trim();
        const review = cols[fieldMap["review"]]?.trim();
        if (!name || !review) continue;

        const ratingStr =
          fieldMap["rating"] !== undefined
            ? cols[fieldMap["rating"]]?.trim()
            : undefined;

        reviews.push({
          reviewer_name: name,
          reviewer_title:
            fieldMap["title"] !== undefined
              ? cols[fieldMap["title"]]?.trim()
              : undefined,
          reviewer_company:
            fieldMap["company"] !== undefined
              ? cols[fieldMap["company"]]?.trim()
              : undefined,
          review_text: review,
          rating: ratingStr ? parseFloat(ratingStr) || 5.0 : 5.0,
          review_date:
            fieldMap["date"] !== undefined
              ? cols[fieldMap["date"]]?.trim()
              : undefined,
        });
      }

      setPreview(reviews);
    } catch {
      setParseError("Failed to parse CSV. Check the format and try again.");
      setPreview([]);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && (file.name.endsWith(".csv") || file.type === "text/csv")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const text = ev.target?.result as string;
          parsePreview(text);
        };
        reader.readAsText(file);
      }
    },
    [parsePreview]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const text = ev.target?.result as string;
          parsePreview(text);
        };
        reader.readAsText(file);
      }
    },
    [parsePreview]
  );

  const totalLines = csvText.trim()
    ? csvText.trim().split("\n").length - 1
    : 0;

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200",
          dragOver
            ? "border-emerald bg-emerald/5"
            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload
          className={cn(
            "w-8 h-8 mx-auto mb-2",
            dragOver ? "text-emerald" : "text-slate-400"
          )}
        />
        <p className="text-[14px] font-medium text-slate-700">
          Drop your CSV file here or click to browse
        </p>
        <p className="text-[12px] text-slate-400 mt-1">
          Columns: name, title, company, rating, review, date
        </p>
      </div>

      {/* Or paste */}
      <div className="relative">
        <div className="absolute -top-3 left-3 bg-white px-2">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider">
            Or paste CSV data
          </span>
        </div>
        <textarea
          value={csvText}
          onChange={(e) => parsePreview(e.target.value)}
          placeholder={`name,title,company,rating,review,date\nJohn Doe,VP Sales,Acme Corp,5.0,"Amazing product that changed our workflow",2024-01-15`}
          rows={5}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald/30 focus:border-emerald resize-none font-mono"
        />
      </div>

      {/* Parse error */}
      {parseError && (
        <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-100">
          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-[13px] text-red-600">{parseError}</p>
        </div>
      )}

      {/* Preview table */}
      {preview.length > 0 && (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              <span className="text-[13px] font-medium text-slate-700">
                Preview ({preview.length} of {totalLines} reviews)
              </span>
            </div>
            <button
              onClick={() => {
                setCsvText("");
                setPreview([]);
              }}
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-3 py-2 text-left font-medium text-slate-500">
                    Name
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-500">
                    Rating
                  </th>
                  <th className="px-3 py-2 text-left font-medium text-slate-500">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody>
                {preview.map((r, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="px-3 py-2 text-slate-700 whitespace-nowrap">
                      {r.reviewer_name}
                    </td>
                    <td className="px-3 py-2 text-slate-500">
                      {"★".repeat(Math.round(r.rating))}
                    </td>
                    <td className="px-3 py-2 text-slate-600 max-w-[300px] truncate">
                      {r.review_text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Import button */}
      {csvText.trim() && !parseError && (
        <button
          onClick={() => onImport(csvText)}
          disabled={isImporting || preview.length === 0}
          className={cn(
            "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200",
            isImporting || preview.length === 0
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-emerald text-white hover:bg-emerald/90 shadow-sm"
          )}
        >
          {isImporting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Importing {totalLines} reviews...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Import {totalLines} Reviews from{" "}
              {platform === "g2" ? "G2" : "Google"}
            </>
          )}
        </button>
      )}
    </div>
  );
}
