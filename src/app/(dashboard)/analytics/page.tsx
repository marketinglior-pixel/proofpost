import { createClient } from "@/lib/supabase/server";
import {
  Eye,
  TrendingUp,
  Layers,
  Code2,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
  Sparkles,
  Quote,
} from "lucide-react";
import Link from "next/link";
import type { Database, Json } from "@/types/database";

type GeneratedContent = Database["public"]["Tables"]["generated_content"]["Row"];

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("plan").eq("id", user!.id).single();
  const plan = (profile as { plan: string } | null)?.plan || "free";
  const isPro = plan === "pro";

  // Monthly impressions
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: monthlyImpressions } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .gte("created_at", startOfMonth.toISOString());

  // Last month impressions (for comparison)
  const lastMonthStart = new Date(startOfMonth);
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
  const { count: lastMonthImpressions } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .gte("created_at", lastMonthStart.toISOString())
    .lt("created_at", startOfMonth.toISOString());

  // Total impressions
  const { count: totalImpressions } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  // Total carousels
  const { count: totalCarousels } = await supabase
    .from("generated_content")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  // Total widgets
  const { count: totalWidgets } = await supabase
    .from("widgets")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  // Recent reviews for the feed
  const { data: recentData } = await supabase
    .from("generated_content")
    .select("id, llm_output, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const recentItems = (recentData ?? []) as GeneratedContent[];

  // Calculate change percentage
  const monthly = monthlyImpressions ?? 0;
  const lastMonth = lastMonthImpressions ?? 0;
  const changePercent = lastMonth > 0
    ? Math.round(((monthly - lastMonth) / lastMonth) * 100)
    : monthly > 0 ? 100 : 0;
  const isUp = changePercent >= 0;

  function getHookLine(llmOutput: Json): string {
    const obj = llmOutput as Record<string, unknown>;
    return (obj?.hookLine as string) || "Review";
  }

  function getReviewerName(llmOutput: Json): string {
    const obj = llmOutput as Record<string, unknown>;
    const reviewer = obj?.reviewer as Record<string, unknown> | undefined;
    return (reviewer?.name as string) || "Customer";
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short", day: "numeric",
    });
  }

  const impressionLimit = isPro ? null : 500;
  const usagePercent = impressionLimit
    ? Math.min((monthly / impressionLimit) * 100, 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 tracking-tight">
            Analytics
          </h1>
          <p className="text-[14px] sm:text-[15px] text-slate-500 mt-1">
            Your social proof performance at a glance.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/20">
          <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          <span className="text-[12px] font-medium text-emerald-dark">Live</span>
        </div>
      </div>

      {/* Hero stat */}
      <div className="rounded-2xl bg-gradient-to-br from-navy to-navy-light p-5 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-emerald/8 blur-[100px]" />

        <div className="relative grid sm:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            <p className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
              Widget Impressions This Month
            </p>
            <div className="flex items-baseline gap-4">
              <span className="text-[32px] sm:text-[56px] font-bold text-white tabular-nums leading-none">
                {monthly.toLocaleString()}
              </span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[12px] font-semibold ${
                isUp ? "bg-emerald/15 text-emerald" : "bg-red-500/15 text-red-400"
              }`}>
                {isUp ? (
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" aria-hidden="true" />
                )}
                {Math.abs(changePercent)}% vs last month
              </div>
            </div>
            {impressionLimit && (
              <div className="pt-3 space-y-2 max-w-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Usage</span>
                  <span className="text-slate-400 tabular-nums">{monthly} / {impressionLimit}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald transition-all"
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {[
              { label: "Total Views", value: totalImpressions ?? 0, icon: Eye },
              { label: "Carousels", value: totalCarousels ?? 0, icon: Layers },
              { label: "Widgets", value: totalWidgets ?? 0, icon: Code2 },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-4 text-center space-y-2">
                <stat.icon className="w-4 h-4 text-slate-400 mx-auto" aria-hidden="true" />
                <span className="block text-[18px] sm:text-[24px] font-bold text-white tabular-nums leading-none">
                  {stat.value.toLocaleString()}
                </span>
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Recent activity */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-[15px] font-semibold text-slate-900">
            Recent Testimonials
          </h2>
          <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
            {recentItems.length === 0 ? (
              <div className="p-8 text-center text-[14px] text-slate-400">
                No testimonials yet. Generate your first carousel.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald/10 flex-shrink-0">
                      <Quote className="w-4 h-4 text-emerald-dark" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-slate-800 truncate">
                        {getHookLine(item.llm_output)}
                      </p>
                      <p className="text-[12px] text-slate-400 mt-0.5">
                        {getReviewerName(item.llm_output)} &middot; {formatDate(item.created_at)}
                      </p>
                    </div>
                    <Link
                      href="/history"
                      className="text-[11px] font-medium text-emerald-dark hover:text-emerald transition-colors flex-shrink-0"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick stats + CTA */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-[15px] font-semibold text-slate-900">
            Quick Stats
          </h2>

          {/* Plan status */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
                Current Plan
              </span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                isPro ? "bg-emerald/15 text-emerald-dark" : "bg-slate-100 text-slate-500"
              }`}>
                {isPro ? "Pro" : "Free"}
              </span>
            </div>
            <div className="space-y-2 text-[13px] text-slate-500">
              <div className="flex justify-between">
                <span>Carousels this month</span>
                <span className="font-medium text-slate-700 tabular-nums">
                  {totalCarousels ?? 0}{!isPro ? " / 3" : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Impressions this month</span>
                <span className="font-medium text-slate-700 tabular-nums">
                  {monthly.toLocaleString()}{!isPro ? " / 500" : ""}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Active widgets</span>
                <span className="font-medium text-slate-700 tabular-nums">
                  {totalWidgets ?? 0}
                </span>
              </div>
            </div>
          </div>

          {/* Upgrade CTA or Pro features */}
          {!isPro ? (
            <div className="rounded-xl bg-navy p-6 text-center space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-emerald/10 blur-[50px]" />
              <Lock className="w-6 h-6 text-emerald/50 mx-auto relative z-10" aria-hidden="true" />
              <h3 className="text-[14px] font-semibold text-white relative z-10">
                Unlock A/B Hook Testing
              </h3>
              <p className="text-[12px] text-slate-400 relative z-10">
                3 AI hook variants per review. See which converts best.
              </p>
              <Link
                href="/pricing"
                className="relative z-10 inline-flex items-center gap-1.5 h-9 px-5 bg-emerald text-white text-[13px] font-medium rounded-lg transition-colors duration-200 hover:bg-emerald-dark glow-emerald"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Upgrade to Pro
              </Link>
            </div>
          ) : (
            <div className="rounded-xl bg-emerald/5 border border-emerald/20 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-dark" aria-hidden="true" />
                <span className="text-[13px] font-semibold text-emerald-dark">
                  A/B Hook Testing
                </span>
              </div>
              <p className="text-[12px] text-slate-500">
                Each review generates 3 AI hook variants. Your widgets automatically
                rotate them and track which one gets the most clicks.
                Check the Hook Performance section below.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Hook Performance (Pro only) */}
      {isPro && <HookPerformanceSection />}
    </div>
  );
}

async function HookPerformanceSection() {
  // This is a server component that fetches hook event data
  const supabaseAdmin = (await import("@supabase/supabase-js")).createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Get user's content
  const { data: contents } = await supabaseAdmin
    .from("generated_content")
    .select("id, llm_output")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (!contents || contents.length === 0) return null;

  const contentIds = contents.map((c) => c.id);

  // Get hook events
  const { data: events } = await supabaseAdmin
    .from("hook_events")
    .select("content_id, hook_variant_id, event_type")
    .in("content_id", contentIds) as { data: Array<{ content_id: string; hook_variant_id: string; event_type: string }> | null };

  // Aggregate
  type VariantStats = { id: string; text: string; impressions: number; clicks: number; ctr: number };
  type ContentPerf = { contentId: string; hookLine: string; reviewerName: string; variants: VariantStats[] };

  const perfData: ContentPerf[] = contents.map((c) => {
    const llm = c.llm_output as Record<string, unknown>;
    const variants = (llm?.hookVariants as Array<{ id: string; text: string }>) || [];
    const hookLine = (llm?.hookLine as string) || "Review";
    const reviewer = llm?.reviewer as Record<string, unknown> | undefined;
    const reviewerName = (reviewer?.name as string) || "Customer";

    const contentEvents = (events || []).filter((e) => e.content_id === c.id);

    const variantStats: VariantStats[] = variants.map((v) => {
      const vEvents = contentEvents.filter((e) => e.hook_variant_id === v.id);
      const impressions = vEvents.filter((e) => e.event_type === "impression").length;
      const clicks = vEvents.filter((e) => e.event_type === "click").length;
      return {
        id: v.id,
        text: v.text,
        impressions,
        clicks,
        ctr: impressions > 0 ? Math.round((clicks / impressions) * 10000) / 100 : 0,
      };
    });

    // Also count "default" events (for older content without variants)
    if (variants.length === 0) {
      const defaultEvents = contentEvents.filter((e) => e.hook_variant_id === "default");
      const impressions = defaultEvents.filter((e) => e.event_type === "impression").length;
      const clicks = defaultEvents.filter((e) => e.event_type === "click").length;
      variantStats.push({
        id: "default",
        text: hookLine,
        impressions,
        clicks,
        ctr: impressions > 0 ? Math.round((clicks / impressions) * 10000) / 100 : 0,
      });
    }

    return { contentId: c.id, hookLine, reviewerName, variants: variantStats };
  }).filter((p) => p.variants.some((v) => v.impressions > 0));

  // Overall totals
  const totalImpressions = perfData.reduce((s, p) => s + p.variants.reduce((s2, v) => s2 + v.impressions, 0), 0);
  const totalClicks = perfData.reduce((s, p) => s + p.variants.reduce((s2, v) => s2 + v.clicks, 0), 0);
  const overallCtr = totalImpressions > 0 ? Math.round((totalClicks / totalImpressions) * 10000) / 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald" aria-hidden="true" />
          Hook A/B Performance
        </h2>
        {totalImpressions > 0 && (
          <div className="text-[12px] text-slate-500">
            {totalClicks} clicks / {totalImpressions} impressions ({overallCtr}% CTR)
          </div>
        )}
      </div>

      {perfData.length === 0 ? (
        <div className="rounded-xl bg-white border border-slate-200 p-8 text-center">
          <p className="text-[14px] text-slate-400">
            No hook performance data yet. Data will appear once your widgets get views.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {perfData.map((perf) => {
            const bestVariant = perf.variants.reduce((best, v) =>
              v.ctr > best.ctr ? v : best, perf.variants[0]);

            return (
              <div key={perf.contentId} className="rounded-xl bg-white border border-slate-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-4 h-4 text-emerald" aria-hidden="true" />
                  <span className="text-[13px] font-semibold text-slate-900 truncate">
                    {perf.reviewerName}
                  </span>
                </div>
                <div className="space-y-2">
                  {perf.variants.map((v) => {
                    const isWinner = v.id === bestVariant.id && v.impressions > 10;
                    return (
                      <div
                        key={v.id}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] ${
                          isWinner ? "bg-emerald/5 border border-emerald/20" : "bg-slate-50"
                        }`}
                      >
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          v.id === "roi" ? "bg-blue-100 text-blue-600" :
                          v.id === "pain" ? "bg-red-100 text-red-600" :
                          v.id === "trust" ? "bg-purple-100 text-purple-600" :
                          "bg-slate-200 text-slate-600"
                        }`}>
                          {v.id}
                        </span>
                        <span className="flex-1 text-slate-700 truncate">{v.text}</span>
                        <span className="text-slate-400 tabular-nums text-[12px]">
                          {v.impressions} views
                        </span>
                        <span className="text-slate-400 tabular-nums text-[12px]">
                          {v.clicks} clicks
                        </span>
                        <span className={`font-semibold tabular-nums text-[12px] ${
                          isWinner ? "text-emerald" : "text-slate-500"
                        }`}>
                          {v.ctr}%
                          {isWinner && " ★"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
