import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Palette,
  ArrowRight,
  Wand2,
  TrendingUp,
  Eye,
  Layers,
  Clock,
  Quote,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Check,
} from "lucide-react";
import Link from "next/link";
import type { Database, Json } from "@/types/database";
import { WidgetList } from "./widget-list";

type GeneratedContent = Database["public"]["Tables"]["generated_content"]["Row"];
type BrandKit = Database["public"]["Tables"]["brand_kits"]["Row"];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: brandKitData } = await supabase
    .from("brand_kits").select("*").eq("user_id", user!.id).single();
  const brandKit = brandKitData as BrandKit | null;

  const { count: contentCount } = await supabase
    .from("generated_content")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  // Check if user has a Trust Card — if not, send them to create one
  const { data: trustCard } = await supabase
    .from("trust_cards")
    .select("id")
    .eq("user_id", user!.id)
    .limit(1)
    .single();

  if (!trustCard) {
    redirect("/trust-card/setup");
  }

  // Monthly impressions
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: monthlyImpressions } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .gte("created_at", startOfMonth.toISOString());

  const { count: totalImpressions } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id);

  // Recent carousels
  const { data: recentData } = await supabase
    .from("generated_content")
    .select("id, llm_output, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const recentItems = (recentData ?? []) as GeneratedContent[];

  // Widgets with content details
  const { data: widgetsData } = await supabase
    .from("widgets")
    .select("id, name, content_ids, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  // Also get single content items (not in widgets) for embed
  const { data: singleContent } = await supabase
    .from("generated_content")
    .select("id, llm_output, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(20);

  const embedItems = [
    ...(widgetsData || []).map((w) => ({
      id: w.id,
      name: w.name || "Widget",
      type: "widget" as const,
      reviewCount: (w.content_ids as string[])?.length || 0,
      createdAt: w.created_at,
    })),
    ...(singleContent || []).map((c) => {
      const llm = c.llm_output as Record<string, unknown>;
      const reviewer = llm?.reviewer as Record<string, unknown> | undefined;
      return {
        id: c.id,
        name: (llm?.hookLine as string) || "Carousel",
        type: "single" as const,
        reviewCount: 1,
        createdAt: c.created_at,
      };
    }),
  ];

  const { data: profile } = await supabase
    .from("profiles").select("plan, trial_ends_at").eq("id", user!.id).single();
  const rawPlan = ((profile as { plan: string } | null)?.plan || "free") as import("@/lib/plans").Plan;
  const trialEndsAt = (profile as { trial_ends_at: string | null } | null)?.trial_ends_at ?? null;
  const { getEffectivePlan: gep, getPlanLimits: gpl, isPaidPlan: ipp, getPlanLabel: gplb } = await import("@/lib/plans");
  const effectivePlan = gep(rawPlan, trialEndsAt);
  const limits = gpl(effectivePlan);
  const isPro = ipp(effectivePlan);

  function getHookLine(llmOutput: Json): string {
    const obj = llmOutput as Record<string, unknown>;
    return (obj?.hookLine as string) || "Carousel";
  }

  function getReviewerName(llmOutput: Json): string {
    const obj = llmOutput as Record<string, unknown>;
    const reviewer = obj?.reviewer as Record<string, unknown> | undefined;
    return (reviewer?.name as string) || "Customer";
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  const monthly = monthlyImpressions ?? 0;
  const carousels = contentCount ?? 0;
  const total = totalImpressions ?? 0;

  return (
    <div className="space-y-8">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-[14px] sm:text-[15px] text-slate-500 mt-0.5">Welcome back. Here is your social proof overview.</p>
        </div>
        <Link
          href="/generate"
          className="flex items-center justify-center gap-2 h-10 px-5 bg-emerald hover:bg-emerald-dark text-white text-[14px] font-medium rounded-lg transition-colors duration-200 glow-emerald w-full sm:w-auto whitespace-nowrap"
        >
          <Wand2 className="w-4 h-4" aria-hidden="true" />
          New Carousel
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Monthly Views", value: monthly, icon: Eye, color: "text-emerald", bg: "bg-emerald/10", suffix: limits.impressionsPerMonth ? ` / ${limits.impressionsPerMonth.toLocaleString()}` : "" },
          { label: "Total Impressions", value: total, icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Carousels", value: carousels, icon: Layers, color: "text-violet-500", bg: "bg-violet-50" },
        ].map((stat) => (
          <div key={stat.label} className="card-hover rounded-xl bg-white border border-slate-200 p-3 sm:p-5 overflow-hidden">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.color}`} aria-hidden="true" />
              </div>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-300 hidden sm:block" aria-hidden="true" />
            </div>
            <span className="text-[22px] sm:text-[32px] font-bold text-slate-900 tabular-nums leading-none">
              {stat.value.toLocaleString()}
            </span>
            <p className="text-[11px] sm:text-[12px] text-slate-400 mt-1.5 truncate">
              {stat.label}{stat.suffix}
            </p>
          </div>
        ))}
      </div>

      {/* Getting Started Checklist — shown for new users */}
      {(() => {
        const hasLogo = !!brandKit?.logo_url;
        const hasFewCarousels = carousels < 3;
        const completedItems = [
          carousels > 0, // Created first carousel
          embedItems.length > 0, // Has an embed
          hasLogo, // Uploaded logo
          carousels >= 3, // Created 3+ carousels
        ];
        const completedCount = completedItems.filter(Boolean).length;
        const showChecklist = completedCount < 4;

        return showChecklist ? (
          <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald" aria-hidden="true" />
                Getting Started
              </h2>
              <span className="text-[12px] text-slate-400 font-medium">{completedCount}/4 complete</span>
            </div>
            <div className="space-y-2">
              {[
                { done: carousels > 0, label: "Create your first carousel", href: "/generate" },
                { done: embedItems.length > 0, label: "Get your embed code", href: "/generate" },
                { done: hasLogo, label: "Upload your logo", href: "/brand-kit" },
                { done: carousels >= 3, label: "Create 3 carousels for a rich widget", href: "/generate" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.done ? "#" : item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    item.done
                      ? "text-slate-400 cursor-default"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 ${
                    item.done ? "bg-emerald" : "border-2 border-slate-300"
                  }`}>
                    {item.done && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-[13px] ${item.done ? "line-through" : "font-medium"}`}>
                    {item.label}
                  </span>
                  {!item.done && (
                    <ArrowRight className="w-3 h-3 text-slate-300 ml-auto" />
                  )}
                </Link>
              ))}
            </div>
            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald transition-all duration-500"
                style={{ width: `${(completedCount / 4) * 100}%` }}
              />
            </div>
          </div>
        ) : null;
      })()}

      {/* My Widgets */}
      {embedItems.length > 0 && (
        <WidgetList items={embedItems} />
      )}

      {/* Two columns */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent activity */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" aria-hidden="true" />
              Recent Activity
            </h2>
            <Link href="/history" className="text-[13px] text-emerald-dark hover:text-emerald transition-colors">
              View all
            </Link>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
            {recentItems.length === 0 ? (
              <div className="p-10 text-center space-y-3">
                <Quote className="w-8 h-8 text-slate-200 mx-auto" aria-hidden="true" />
                <p className="text-[14px] text-slate-400">No carousels yet.</p>
                <Link href="/generate" className="inline-flex items-center gap-2 h-9 px-4 bg-emerald text-white text-[13px] font-medium rounded-lg transition-colors hover:bg-emerald-dark">
                  <Wand2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Create your first
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Plan card */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">Plan</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${isPro ? "bg-emerald/15 text-emerald-dark" : "bg-slate-100 text-slate-500"}`}>
                {gplb(effectivePlan)}
              </span>
            </div>
            <div className="space-y-2.5 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Carousels</span>
                <span className="font-medium text-slate-700 tabular-nums">{carousels}{limits.carouselsPerMonth ? ` / ${limits.carouselsPerMonth}` : ""}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Impressions</span>
                <span className="font-medium text-slate-700 tabular-nums">{monthly.toLocaleString()}{limits.impressionsPerMonth ? ` / ${limits.impressionsPerMonth.toLocaleString()}` : ""}</span>
              </div>
              {!isPro && (
                <div className="pt-2">
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-emerald" style={{ width: `${Math.min((monthly / 500) * 100, 100)}%` }} />
                  </div>
                </div>
              )}
            </div>
            {!isPro && (
              <Link
                href="/billing"
                className="flex items-center justify-center w-full h-9 rounded-lg bg-navy hover:bg-navy-light text-white text-[13px] font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                Upgrade to Pro
              </Link>
            )}
          </div>

          {/* Quick actions */}
          <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-3">
            <span className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">Quick Actions</span>
            {[
              { label: "Generate Carousel", href: "/generate", icon: Wand2 },
              { label: "View History", href: "/history", icon: Clock },
              { label: "Brand Kit", href: "/brand-kit", icon: Palette },
              { label: "Analytics", href: "/analytics", icon: TrendingUp },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <action.icon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                {action.label}
                <ArrowRight className="w-3 h-3 text-slate-300 ml-auto" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
