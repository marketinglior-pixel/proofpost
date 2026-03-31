"use client";

import { useState, useCallback } from "react";
import { ImportCard } from "./import-card";
import { Star, Globe, Award, MessageSquare, Briefcase, Wand2 } from "lucide-react";
import type { Database } from "@/types/database";
import { cn } from "@/lib/utils";

type ImportedReview =
  Database["public"]["Tables"]["imported_reviews"]["Row"];

interface ImportDashboardProps {
  platformCounts: Record<string, number>;
  initialReviews: ImportedReview[];
}

export function ImportDashboard({
  platformCounts: initialCounts,
  initialReviews,
}: ImportDashboardProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [counts, setCounts] = useState(initialCounts);

  const refreshReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/import-reviews");
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
        const newCounts: Record<string, number> = {};
        for (const r of data.reviews as ImportedReview[]) {
          newCounts[r.platform] = (newCounts[r.platform] || 0) + 1;
        }
        setCounts(newCounts);
      }
    } catch {
      // silent fail
    }
  }, []);

  return (
    <>
      {/* Platform cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <ImportCard
          platform="g2"
          platformLabel="G2"
          icon={<Star className="w-5 h-5 text-green-600" />}
          accentColor="text-green-700"
          accentBg="bg-green-50"
          enabled={true}
          urlPlaceholder="https://www.g2.com/products/your-product/reviews"
          importCount={counts["g2"] || 0}
          onImportComplete={refreshReviews}
        />

        <ImportCard
          platform="google"
          platformLabel="Google Reviews"
          icon={<Globe className="w-5 h-5 text-blue-600" />}
          accentColor="text-blue-700"
          accentBg="bg-blue-50"
          enabled={true}
          urlPlaceholder="https://www.google.com/maps/place/your-business"
          importCount={counts["google"] || 0}
          onImportComplete={refreshReviews}
        />

        <ImportCard
          platform="capterra"
          platformLabel="Capterra"
          icon={<Award className="w-5 h-5 text-slate-300" />}
          accentColor="text-orange-700"
          accentBg="bg-orange-50"
          enabled={false}
          importCount={0}
          onImportComplete={refreshReviews}
        />

        <ImportCard
          platform="trustpilot"
          platformLabel="Trustpilot"
          icon={<MessageSquare className="w-5 h-5 text-slate-300" />}
          accentColor="text-teal-700"
          accentBg="bg-teal-50"
          enabled={false}
          importCount={0}
          onImportComplete={refreshReviews}
        />

        <ImportCard
          platform="linkedin"
          platformLabel="LinkedIn"
          icon={<Briefcase className="w-5 h-5 text-slate-300" />}
          accentColor="text-sky-700"
          accentBg="bg-sky-50"
          enabled={false}
          importCount={0}
          onImportComplete={refreshReviews}
        />
      </div>

      {/* Imported reviews table */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-slate-800">
              Imported Reviews
            </h2>
            <span className="text-[13px] text-slate-400">
              {reviews.length} total
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 text-left font-medium text-slate-500">
                      Platform
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-500">
                      Reviewer
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-500">
                      Rating
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-500">
                      Review
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-500">
                      Content
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-500">
                      Imported
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review) => (
                    <tr
                      key={review.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex px-2 py-0.5 text-[11px] font-medium rounded-full uppercase",
                            review.platform === "g2"
                              ? "bg-green-50 text-green-700"
                              : review.platform === "google"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-slate-100 text-slate-500"
                          )}
                        >
                          {review.platform}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-slate-700">
                            {review.reviewer_name}
                          </p>
                          {(review.reviewer_title ||
                            review.reviewer_company) && (
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {[review.reviewer_title, review.reviewer_company]
                                .filter(Boolean)
                                .join(" at ")}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-amber-500 whitespace-nowrap">
                        {"★".repeat(Math.round(review.rating))}
                      </td>
                      <td className="px-4 py-3 max-w-[300px]">
                        <p className="text-slate-600 line-clamp-2">
                          {review.review_text}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        {review.generated_content_id ? (
                          <a
                            href={`/history`}
                            className="inline-flex items-center gap-1 text-[12px] text-emerald hover:underline"
                          >
                            <Wand2 className="w-3 h-3" />
                            Generated
                          </a>
                        ) : (
                          <span className="text-[12px] text-slate-300">
                            &mdash;
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-[12px]">
                        {new Date(review.imported_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
