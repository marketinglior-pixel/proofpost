import { createClient } from "@/lib/supabase/server";
import { Palette, ArrowRight, Wand2, TrendingUp, Zap, Clock, Quote } from "lucide-react";
import Link from "next/link";
import type { Database, Json } from "@/types/database";

type GeneratedContent = Database["public"]["Tables"]["generated_content"]["Row"];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: brandKit } = await supabase
    .from("brand_kits").select("*").eq("user_id", user!.id).single();

  const { count: contentCount } = await supabase
    .from("generated_content")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  // Recent carousels for activity feed
  const { data: recentData } = await supabase
    .from("generated_content")
    .select("id, llm_output, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const recentItems = (recentData ?? []) as GeneratedContent[];

  function getHookLine(llmOutput: Json): string {
    const obj = llmOutput as Record<string, unknown>;
    return (obj?.hookLine as string) || "Carousel";
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric",
    });
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-[15px] text-slate-500 mt-1">Your social proof command center.</p>
      </div>

      {/* Brand Kit CTA */}
      {!brandKit && (
        <Link href="/brand-kit" className="block">
          <div className="card-hover rounded-xl border-2 border-dashed border-emerald/30 bg-emerald/5 p-6 flex items-center gap-5">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/15">
              <Palette className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-slate-900">Set Up Your Brand Kit</h3>
              <p className="text-sm text-slate-500 mt-0.5">Upload your logo and colors to start generating</p>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-dark" aria-hidden="true" />
          </div>
        </Link>
      )}

      {/* Main CTA */}
      {brandKit && (
        <Link href="/generate" className="block">
          <div className="card-hover relative rounded-2xl bg-gradient-to-br from-navy to-navy-light p-8 flex items-center gap-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-emerald/10 blur-[100px]" />
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald/15 border border-emerald/20">
              <Wand2 className="w-6 h-6 text-emerald" aria-hidden="true" />
            </div>
            <div className="relative flex-1">
              <h3 className="text-[18px] font-semibold text-white">Start My LinkedIn Content</h3>
              <p className="text-[14px] text-slate-400 mt-1">Paste a review and get branded slides in seconds</p>
            </div>
            <ArrowRight className="relative w-5 h-5 text-emerald/60" aria-hidden="true" />
          </div>
        </Link>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="card-hover rounded-xl bg-white border border-slate-200 p-7">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">Carousels Created</span>
            <TrendingUp className="w-4 h-4 text-slate-300" aria-hidden="true" />
          </div>
          <span className="text-[56px] font-bold text-slate-900 tabular-nums leading-none">
            {contentCount ?? 0}
          </span>
        </div>
        <div className="card-hover rounded-xl bg-white border border-slate-200 p-7">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">Current Plan</span>
            <Zap className="w-4 h-4 text-emerald/50" aria-hidden="true" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-[56px] font-bold text-slate-900 leading-none">Free</span>
            <span className="text-sm text-slate-400">3 / month</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {recentItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" aria-hidden="true" />
              Recent Activity
            </h2>
            <Link href="/history" className="text-[13px] text-emerald-dark hover:text-emerald transition-colors">
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {recentItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-4 py-3 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors">
                <Quote className="w-4 h-4 text-emerald/50 flex-shrink-0" aria-hidden="true" />
                <p className="text-[14px] text-slate-700 flex-1 truncate">
                  {getHookLine(item.llm_output)}
                </p>
                <span className="text-[12px] text-slate-400 tabular-nums flex-shrink-0">
                  {formatDate(item.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
