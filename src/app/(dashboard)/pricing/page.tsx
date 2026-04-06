import { createClient } from "@/lib/supabase/server";
import { Check, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { UpgradeLink } from "./upgrade-link";
import { getEffectivePlan, getPlanLimits, getPlanLabel, isPaidPlan, PLAN_PRICING, type Plan } from "@/lib/plans";

const PRODUCT_IDS = {
  "starter-monthly": process.env.DODO_STARTER_MONTHLY_ID,
  "starter-annual": process.env.DODO_STARTER_ANNUAL_ID,
  "pro-monthly": process.env.DODO_PRO_MONTHLY_ID,
  "pro-annual": process.env.DODO_PRO_ANNUAL_ID,
  "business-monthly": process.env.DODO_BUSINESS_MONTHLY_ID,
  "business-annual": process.env.DODO_BUSINESS_ANNUAL_ID,
} as const;

const features = [
  { name: "Trust Card reviews", free: "5", starter: "25", pro: "100", business: "1,000" },
  { name: "Testimonial carousels", free: "3 / month", starter: "10 / month", pro: "Unlimited", business: "Unlimited" },
  { name: "Widget impressions", free: "500 / month", starter: "2,000 / month", pro: "Unlimited", business: "Unlimited" },
  { name: "AI Hook Extraction", free: "1 hook", starter: "1 hook", pro: "3 variants", business: "Unlimited" },
  { name: "Collection Forms", free: "1", starter: "3", pro: "Unlimited", business: "Unlimited" },
  { name: "Remove watermark", free: false, starter: true, pro: true, business: true },
  { name: "Amazon & Etsy import", free: false, starter: false, pro: true, business: true },
  { name: "SEO Rich Snippets", free: false, starter: "Basic", pro: "Full", business: "Full" },
  { name: "A/B Hook Testing", free: false, starter: false, pro: true, business: true },
  { name: "Analytics dashboard", free: false, starter: "Basic", pro: "Full", business: "Full" },
  { name: "Multi-location", free: false, starter: false, pro: false, business: true },
  { name: "White-label", free: false, starter: false, pro: false, business: true },
  { name: "API access", free: false, starter: false, pro: false, business: true },
  { name: "Priority support", free: false, starter: false, pro: true, business: true },
];

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; billing?: string }>;
}) {
  const { code: discountCode, billing } = await searchParams;
  const isAnnual = billing !== "monthly";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("plan, trial_ends_at").eq("id", user!.id).single();

  const rawPlan = ((profile as { plan: string } | null)?.plan || "free") as Plan;
  const trialEndsAt = (profile as { trial_ends_at: string | null } | null)?.trial_ends_at ?? null;
  const effectivePlan = getEffectivePlan(rawPlan, trialEndsAt);

  // Get impression count
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: impressionCount } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user!.id)
    .gte("created_at", startOfMonth.toISOString());

  const limits = getPlanLimits(effectivePlan);

  const tiers: { name: string; plan: Plan; monthlyId?: string; annualId?: string }[] = [
    { name: "Starter", plan: "starter", monthlyId: PRODUCT_IDS["starter-monthly"], annualId: PRODUCT_IDS["starter-annual"] },
    { name: "Pro", plan: "pro", monthlyId: PRODUCT_IDS["pro-monthly"], annualId: PRODUCT_IDS["pro-annual"] },
    { name: "Business", plan: "business", monthlyId: PRODUCT_IDS["business-monthly"], annualId: PRODUCT_IDS["business-annual"] },
  ];

  const tierOrder: Plan[] = ["free", "starter", "pro", "business"];
  const currentTierIndex = tierOrder.indexOf(rawPlan);

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 tracking-tight">
          {isPaidPlan(rawPlan) ? `You're on ${getPlanLabel(rawPlan)}` : "Upgrade your plan"}
        </h1>
        <p className="text-[14px] sm:text-[15px] text-slate-500 mt-1">
          {isPaidPlan(rawPlan)
            ? "Manage your subscription or upgrade for more features."
            : "Unlock more reviews, imports, and marketing tools."}
        </p>
      </div>

      {discountCode && (
        <div className="rounded-lg bg-emerald/10 border border-emerald/20 px-3 sm:px-5 py-3 text-center">
          <p className="text-[14px] font-medium text-emerald">
            Discount code <span className="font-bold">{discountCode}</span> applied!
          </p>
        </div>
      )}

      {/* Usage alert */}
      <div className="rounded-lg bg-slate-100 border border-slate-200 px-3 sm:px-5 py-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[14px] font-medium text-slate-700">This month&apos;s usage</p>
          <p className="text-[13px] text-slate-500 mt-0.5">
            {impressionCount ?? 0}{limits.impressionsPerMonth ? ` / ${limits.impressionsPerMonth.toLocaleString()}` : ""} widget impressions
          </p>
        </div>
        {limits.impressionsPerMonth && (
          <div className="h-2 w-32 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald transition-all"
              style={{ width: `${Math.min(((impressionCount ?? 0) / limits.impressionsPerMonth) * 100, 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3">
        <Link
          href={`/pricing${discountCode ? `?code=${discountCode}&` : "?"}billing=monthly`}
          className={`text-sm font-medium ${!isAnnual ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
        >
          Monthly
        </Link>
        <Link
          href={`/pricing${discountCode ? `?code=${discountCode}` : ""}`}
          className={`text-sm font-medium ${isAnnual ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
        >
          Annual
        </Link>
        {isAnnual && (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/15 text-emerald">Save up to 37%</span>
        )}
      </div>

      {/* Pricing cards */}
      <div className="grid sm:grid-cols-3 gap-5">
        {tiers.map((tier) => {
          const pricing = PLAN_PRICING[tier.plan as keyof typeof PLAN_PRICING];
          const price = isAnnual ? pricing.annual : pricing.monthly;
          const isCurrent = rawPlan === tier.plan;
          const isUpgrade = tierOrder.indexOf(tier.plan) > currentTierIndex;
          const isHighlighted = tier.plan === "pro";
          const productId = isAnnual ? tier.annualId : tier.monthlyId;

          return (
            <div
              key={tier.plan}
              className={`relative rounded-xl p-7 space-y-5 ${
                isHighlighted
                  ? "bg-navy overflow-hidden"
                  : "bg-white border border-slate-200"
              } ${isCurrent ? "ring-2 ring-emerald" : ""}`}
            >
              {isHighlighted && (
                <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-emerald/12 blur-[60px]" />
              )}

              {isCurrent && (
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald/20 text-emerald">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="relative">
                <h3 className={`text-[13px] font-semibold uppercase tracking-wider ${
                  isHighlighted ? "text-emerald" : "text-slate-400"
                }`}>
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-[40px] font-bold tabular-nums ${
                    isHighlighted ? "text-white" : "text-slate-900"
                  }`}>
                    ${price}
                  </span>
                  <span className="text-slate-400">/mo</span>
                </div>
                {isAnnual && (
                  <p className="text-[13px] text-slate-400 mt-1">${pricing.annualTotal} billed annually</p>
                )}
              </div>

              {isCurrent ? (
                <Link
                  href="/settings"
                  className={`flex items-center justify-center w-full h-11 rounded-lg border text-[14px] font-medium transition-colors ${
                    isHighlighted
                      ? "border-emerald/30 text-emerald hover:bg-emerald/10"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  Manage Plan
                </Link>
              ) : isUpgrade ? (
                <UpgradeLink
                  href={`/api/checkout?productId=${productId}&email=${encodeURIComponent(user?.email || "")}${discountCode ? `&discount_code=${encodeURIComponent(discountCode)}` : ""}`}
                  plan={`${tier.plan}-${isAnnual ? "annual" : "monthly"}`}
                  className={`flex items-center justify-center w-full h-11 rounded-lg text-[14px] font-semibold transition-colors duration-200 ${
                    isHighlighted
                      ? "bg-emerald hover:bg-emerald-dark text-white glow-emerald"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  Upgrade to {tier.name}
                </UpgradeLink>
              ) : (
                <span className="flex items-center justify-center w-full h-11 rounded-lg border border-slate-100 text-[14px] text-slate-300">
                  Included in your plan
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Feature comparison */}
      <div className="rounded-xl border border-slate-200 overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-5 bg-slate-50 px-5 py-3 text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Feature</span>
            <span className="text-center">Free</span>
            <span className="text-center">Starter</span>
            <span className="text-center">Pro</span>
            <span className="text-center">Business</span>
          </div>
          {features.map((feat, i) => (
            <div key={i} className="grid grid-cols-5 px-5 py-3 border-t border-slate-100 text-[13px]">
              <span className="text-slate-700">{feat.name}</span>
              {(["free", "starter", "pro", "business"] as const).map((tier) => {
                const val = feat[tier];
                return (
                  <span key={tier} className="text-center">
                    {typeof val === "boolean" ? (
                      val ? (
                        <Check className="w-4 h-4 text-emerald mx-auto" aria-hidden="true" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 mx-auto" aria-hidden="true" />
                      )
                    ) : (
                      <span className={tier === rawPlan ? "text-slate-900 font-medium" : "text-slate-500"}>{val}</span>
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
