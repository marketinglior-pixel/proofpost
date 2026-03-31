import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Database } from "@/types/database";
import { ImportDashboard } from "./import-dashboard";

type ImportedReview =
  Database["public"]["Tables"]["imported_reviews"]["Row"];

export default async function ImportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: reviews } = await supabase
    .from("imported_reviews")
    .select("*")
    .eq("user_id", user.id)
    .order("imported_at", { ascending: false });

  const importedReviews = (reviews || []) as ImportedReview[];

  // Count per platform
  const platformCounts: Record<string, number> = {};
  for (const r of importedReviews) {
    platformCounts[r.platform] = (platformCounts[r.platform] || 0) + 1;
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div>
        <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 tracking-tight">
          Import Reviews
        </h1>
        <p className="text-[14px] sm:text-[15px] text-slate-500 mt-1">
          Bulk import. Pull dozens of reviews from G2, Google, or CSV into your library.
        </p>
      </div>

      {/* Cross-link to Generate */}
      <Link
        href="/generate"
        className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-5 py-3.5 hover:border-emerald/40 hover:bg-emerald/5 transition-colors group"
      >
        <Sparkles className="w-4 h-4 text-slate-400 group-hover:text-emerald" />
        <div>
          <span className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">
            Just one review?
          </span>
          <span className="text-[12px] text-slate-400 ml-1.5">
            Paste it in Generate and get a widget in 60 seconds →
          </span>
        </div>
      </Link>

      <ImportDashboard
        platformCounts={platformCounts}
        initialReviews={importedReviews}
      />
    </div>
  );
}
