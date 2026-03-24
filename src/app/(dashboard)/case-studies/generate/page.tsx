"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Sparkles, Quote, BookOpen } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface ReviewItem {
  id: string;
  hookLine: string;
  reviewerName: string;
  rawInput: string;
}

export default function GenerateCaseStudyPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/history");
        if (res.ok) {
          const data = await res.json();
          setReviews(data.items || []);
        }
      } catch {
        // ignore
      } finally {
        setLoadingReviews(false);
      }
    }
    fetchReviews();
  }, []);

  const handleGenerate = async () => {
    if (!selectedId) {
      toast.error("Select a testimonial first");
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/case-studies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId: selectedId }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate");
      }

      const data = await res.json();
      toast.success("Case study generated!");
      router.push("/case-studies");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl">
      <Link
        href="/case-studies"
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Case Studies
      </Link>

      <h1 className="text-2xl font-bold text-slate-900 mb-1">Generate Case Study</h1>
      <p className="text-sm text-slate-500 mb-8">
        Select a testimonial and AI will create a professional case study from it.
      </p>

      {loadingReviews ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
          <Quote className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No testimonials yet. Generate some carousels first.</p>
          <Link href="/generate" className="mt-3 inline-flex items-center gap-1 text-sm text-emerald hover:text-emerald-dark">
            Go to Generate
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-2 mb-6">
            <p className="text-sm font-medium text-slate-700">Select a testimonial:</p>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {reviews.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedId(r.id)}
                  className={`w-full text-left rounded-xl border p-4 transition-colors ${
                    selectedId === r.id
                      ? "border-emerald bg-emerald/5"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900 truncate">{r.hookLine}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{r.reviewerName}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!selectedId || generating}
            className="w-full flex items-center justify-center gap-2 py-3 bg-emerald hover:bg-emerald-dark text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {generating ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Generating case study...</>
            ) : (
              <><BookOpen className="w-4 h-4" /> Generate Case Study</>
            )}
          </button>
        </>
      )}
    </div>
  );
}
