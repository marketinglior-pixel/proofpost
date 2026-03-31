import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
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
          Bring your existing reviews from G2, Google, and more
        </p>
      </div>

      <ImportDashboard
        platformCounts={platformCounts}
        initialReviews={importedReviews}
      />
    </div>
  );
}
