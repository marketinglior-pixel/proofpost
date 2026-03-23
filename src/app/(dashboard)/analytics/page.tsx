import { createClient } from "@/lib/supabase/server";
import { Eye, TrendingUp, Calendar, Lock } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">Analytics</h1>
        <p className="text-[15px] text-slate-500 mt-1">Track your widget performance.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Monthly Impressions", value: monthlyImpressions ?? 0, icon: Eye, limit: isPro ? null : 500 },
          { label: "Total Impressions", value: totalImpressions ?? 0, icon: TrendingUp, limit: null },
          { label: "Carousels", value: totalCarousels ?? 0, icon: Calendar, limit: null },
          { label: "Widgets", value: totalWidgets ?? 0, icon: Calendar, limit: null },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-slate-300" aria-hidden="true" />
            </div>
            <span className="text-[32px] font-bold text-slate-900 tabular-nums leading-none">
              {stat.value.toLocaleString()}
            </span>
            {stat.limit && (
              <div className="space-y-1">
                <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald"
                    style={{ width: `${Math.min((stat.value / stat.limit) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">{stat.value} / {stat.limit}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pro gate for detailed analytics */}
      {!isPro && (
        <div className="rounded-xl bg-navy p-8 text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-emerald/8 blur-[80px]" />
          <Lock className="w-8 h-8 text-emerald/50 mx-auto relative z-10" aria-hidden="true" />
          <h3 className="text-lg font-semibold text-white relative z-10">Detailed Analytics on Pro</h3>
          <p className="text-[14px] text-slate-400 max-w-md mx-auto relative z-10">
            See which testimonials convert the most, daily impression trends,
            click-through rates, and top-performing widgets.
          </p>
          <Link
            href="/pricing"
            className="relative z-10 inline-flex items-center gap-2 h-10 px-6 bg-emerald text-white text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-emerald-dark glow-emerald"
          >
            Upgrade to Pro
          </Link>
        </div>
      )}
    </div>
  );
}
