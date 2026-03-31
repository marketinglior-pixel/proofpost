import { createClient } from "@/lib/supabase/server";
import { Settings, Crown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ManageSubscriptionButton } from "./manage-subscription-button";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, display_name, created_at")
    .eq("id", user!.id)
    .single();

  const p = profile as { plan: string; display_name: string | null; created_at: string } | null;
  const plan = p?.plan || "free";
  const isPro = plan === "pro";
  const displayName = p?.display_name || user?.email?.split("@")[0] || "";
  const memberSince = p?.created_at
    ? new Date(p.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-400" aria-hidden="true" />
          Settings
        </h1>
        <p className="text-[14px] text-slate-500 mt-1">
          Account and subscription details.
        </p>
      </div>

      {/* Account */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-[15px] font-semibold text-slate-900">Account</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-slate-500">Name</span>
            <span className="text-[14px] text-slate-900 font-medium">{displayName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-slate-500">Email</span>
            <span className="text-[14px] text-slate-900">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-slate-500">Plan</span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                isPro
                  ? "bg-emerald/15 text-emerald-dark"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {isPro ? "Pro" : "Free"}
            </span>
          </div>
          {memberSince && (
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-slate-500">Member since</span>
              <span className="text-[14px] text-slate-700">{memberSince}</span>
            </div>
          )}
        </div>
      </div>

      {/* Subscription */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-[15px] font-semibold text-slate-900">Subscription</h2>
        </div>
        <div className="px-6 py-5">
          {isPro ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-emerald" aria-hidden="true" />
                <span className="text-[14px] font-medium text-slate-900">
                  Pro Member
                </span>
              </div>
              <p className="text-[13px] text-slate-500">
                Unlimited carousels, widgets, impressions, no watermark.
              </p>
              <ManageSubscriptionButton />
              <p className="text-[11px] text-slate-400">
                Canceling will downgrade your account to Free at the end of your billing period.
                Free includes a watermark and 500 impressions/month.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[14px] text-slate-700">
                You&apos;re on the <span className="font-medium">Free plan</span>.
                Upgrade to remove watermarks, get unlimited impressions, and access analytics.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 h-9 px-4 bg-emerald text-white text-[13px] font-medium rounded-lg hover:bg-emerald-dark transition-colors"
              >
                Upgrade to Pro
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
