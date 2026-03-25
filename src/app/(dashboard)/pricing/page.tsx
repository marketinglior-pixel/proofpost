import { createClient } from "@/lib/supabase/server";
import { Check, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { UpgradeLink } from "./upgrade-link";

const MONTHLY_ID = process.env.DODO_PRO_MONTHLY_ID;
const ANNUAL_ID = process.env.DODO_PRO_ANNUAL_ID;

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code: discountCode } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("plan").eq("id", user!.id).single();

  const currentPlan = (profile as { plan: string } | null)?.plan || "free";
  const isPro = currentPlan === "pro";

  // Get impression count
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: impressionCount } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .gte("created_at", startOfMonth.toISOString());

  if (isPro) {
    return (
      <div className="space-y-10">
        <div className="text-center">
          <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">You&apos;re on Pro</h1>
          <p className="text-[15px] text-slate-500 mt-1">Unlimited access to all features.</p>
        </div>
        <div className="rounded-xl bg-emerald/10 border border-emerald/20 p-8 text-center space-y-4">
          <Sparkles className="w-8 h-8 text-emerald mx-auto" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-slate-900">Pro Member</h2>
          <p className="text-slate-500 text-sm">Unlimited carousels, widgets, impressions, no watermark.</p>
          <Link href="/generate" className="inline-flex items-center gap-2 h-10 px-6 bg-emerald text-white text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-emerald-dark">
            Generate a Carousel
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    { name: "Testimonial carousels", free: "3 / month", pro: "Unlimited" },
    { name: "AI Hook Extraction", free: "1 hook", pro: "3 variants" },
    { name: "A/B Hook Testing", free: false, pro: true },
    { name: "Hook Performance Analytics", free: false, pro: true },
    { name: "Embed widgets", free: "Yes", pro: "Yes" },
    { name: "Widget impressions", free: "500 / month", pro: "Unlimited" },
    { name: "Collection Forms", free: "1", pro: "Unlimited" },
    { name: "Wall of Love", free: true, pro: true },
    { name: "Brand Kits", free: "1", pro: "Unlimited" },
    { name: "Remove watermark", free: false, pro: true },
    { name: "Analytics dashboard", free: false, pro: true },
    { name: "SEO Rich Snippets", free: false, pro: true },
    { name: "PDF carousel download", free: false, pro: true },
    { name: "Priority support", free: false, pro: true },
  ];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">Upgrade to Pro</h1>
        <p className="text-[15px] text-slate-500 mt-1">
          Your widgets are live on your site. Keep them running with Pro.
        </p>
      </div>

      {discountCode && (
        <div className="rounded-lg bg-emerald/10 border border-emerald/20 px-5 py-3 text-center">
          <p className="text-[14px] font-medium text-emerald">
            Discount code <span className="font-bold">{discountCode}</span> applied — 30% off forever!
          </p>
        </div>
      )}

      {/* Usage alert */}
      <div className="rounded-lg bg-slate-100 border border-slate-200 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[14px] font-medium text-slate-700">This month&apos;s usage</p>
          <p className="text-[13px] text-slate-500 mt-0.5">{impressionCount ?? 0} / 500 widget impressions</p>
        </div>
        <div className="h-2 w-32 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-emerald transition-all"
            style={{ width: `${Math.min(((impressionCount ?? 0) / 500) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Monthly */}
        <div className="rounded-xl bg-white border border-slate-200 p-8 space-y-6">
          <div>
            <h3 className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">Pro Monthly</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[44px] font-bold text-slate-900 tabular-nums">$19</span>
              <span className="text-slate-400">/mo</span>
            </div>
          </div>
          <UpgradeLink
            href={`/api/checkout?productId=${MONTHLY_ID}&email=${encodeURIComponent(user?.email || "")}${discountCode ? `&discount_code=${encodeURIComponent(discountCode)}` : ""}`}
            plan="monthly"
            className="flex items-center justify-center w-full h-12 rounded-lg bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold transition-colors duration-200 glow-emerald"
          >
            Upgrade to Pro
          </UpgradeLink>
        </div>

        {/* Annual */}
        <div className="relative rounded-xl bg-navy p-8 space-y-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-emerald/12 blur-[60px]" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-semibold text-emerald uppercase tracking-wider">Pro Annual</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/20 text-emerald">Save 37%</span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[44px] font-bold text-white tabular-nums">$12</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <p className="text-[13px] text-slate-400 mt-1">$144 billed annually</p>
          </div>
          <UpgradeLink
            href={`/api/checkout?productId=${ANNUAL_ID}&email=${encodeURIComponent(user?.email || "")}${discountCode ? `&discount_code=${encodeURIComponent(discountCode)}` : ""}`}
            plan="annual"
            className="relative flex items-center justify-center w-full h-12 rounded-lg bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold transition-colors duration-200 glow-emerald"
          >
            Upgrade Annual
          </UpgradeLink>
        </div>
      </div>

      {/* Feature comparison */}
      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-3 bg-slate-50 px-6 py-3 text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
          <span>Feature</span>
          <span className="text-center">Free</span>
          <span className="text-center">Pro</span>
        </div>
        {features.map((feat, i) => (
          <div key={i} className="grid grid-cols-3 px-6 py-3 border-t border-slate-100 text-[14px]">
            <span className="text-slate-700">{feat.name}</span>
            <span className="text-center">
              {typeof feat.free === "boolean" ? (
                feat.free ? (
                  <Check className="w-4 h-4 text-emerald mx-auto" aria-hidden="true" />
                ) : (
                  <X className="w-4 h-4 text-slate-300 mx-auto" aria-hidden="true" />
                )
              ) : (
                <span className="text-slate-500">{feat.free}</span>
              )}
            </span>
            <span className="text-center">
              {typeof feat.pro === "boolean" ? (
                feat.pro ? (
                  <Check className="w-4 h-4 text-emerald mx-auto" aria-hidden="true" />
                ) : (
                  <X className="w-4 h-4 text-slate-300 mx-auto" aria-hidden="true" />
                )
              ) : (
                <span className="text-slate-700 font-medium">{feat.pro}</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Why pay */}
      <div className="rounded-xl bg-navy p-8 text-center space-y-4">
        <h3 className="text-lg font-semibold text-white">Why keep paying?</h3>
        <p className="text-[14px] text-slate-400 max-w-lg mx-auto leading-relaxed">
          Your widgets are live on your website right now. If you cancel Pro, they&apos;ll show
          a &ldquo;Powered by ProofPost&rdquo; watermark and be limited to 500 impressions per month.
          Pro keeps them clean, unlimited, and gives you analytics on what converts.
        </p>
      </div>
    </div>
  );
}
