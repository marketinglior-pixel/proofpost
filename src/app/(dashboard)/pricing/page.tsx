import { createClient } from "@/lib/supabase/server";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const MONTHLY_ID = process.env.POLAR_PRO_MONTHLY_ID;
const ANNUAL_ID = process.env.POLAR_PRO_ANNUAL_ID;

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get current plan
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user!.id)
    .single();

  const currentPlan = (profile as { plan: string } | null)?.plan || "free";
  const isPro = currentPlan === "pro";

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="font-heading text-[28px] text-ink tracking-tight">
          {isPro ? "You're on Pro" : "Upgrade to Pro"}
        </h1>
        <p className="text-[15px] text-ink-muted mt-1">
          {isPro
            ? "You have unlimited access to all features."
            : "Unlock unlimited carousels, no watermark, and more."}
        </p>
      </div>

      {isPro ? (
        <div className="rounded-xl bg-amber/10 border border-amber/20 p-8 text-center space-y-4">
          <Sparkles className="w-8 h-8 text-amber mx-auto" />
          <h2 className="text-lg font-semibold text-ink">
            You&apos;re a Pro member!
          </h2>
          <p className="text-ink-muted text-sm">
            Unlimited carousels, no watermark, multiple brand kits.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 h-10 px-6 bg-ink text-cream text-sm font-medium rounded-lg transition-all duration-200 hover:bg-ink-light"
          >
            Generate a carousel
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Monthly */}
          <div className="rounded-xl bg-white border border-cream-dark p-8 space-y-6">
            <div>
              <h3 className="text-[12px] font-medium text-ink-muted uppercase tracking-wider">
                Monthly
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-heading text-[40px] text-ink">$29</span>
                <span className="text-ink-muted">/mo</span>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Unlimited carousels",
                "No watermark",
                "Multiple Brand Kits",
                "PDF download",
                "Embed widgets",
                "Priority support",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-[14px] text-ink-muted"
                >
                  <Check className="w-4 h-4 text-amber flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/api/checkout?products=${MONTHLY_ID}&customerEmail=${user?.email}`}
              className="flex items-center justify-center w-full h-11 rounded-lg bg-ink hover:bg-ink-light text-cream text-[14px] font-medium transition-all duration-200"
            >
              Subscribe Monthly
            </Link>
          </div>

          {/* Annual */}
          <div className="relative rounded-xl bg-ink p-8 space-y-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-amber/10 blur-[60px]" />

            <div className="relative">
              <div className="flex items-center gap-2">
                <h3 className="text-[12px] font-medium text-amber uppercase tracking-wider">
                  Annual
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber/20 text-amber">
                  Save $58
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-heading text-[40px] text-cream">
                  $290
                </span>
                <span className="text-cream/40">/year</span>
              </div>
              <p className="text-[13px] text-cream/40 mt-1">
                $24.17/mo billed annually
              </p>
            </div>
            <ul className="space-y-3 relative">
              {[
                "Everything in Monthly",
                "Save $58/year",
                "Locked-in price",
                "Annual billing",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 text-[14px] text-cream/70"
                >
                  <Check className="w-4 h-4 text-amber flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/api/checkout?products=${ANNUAL_ID}&customerEmail=${user?.email}`}
              className="relative flex items-center justify-center w-full h-11 rounded-lg bg-amber hover:bg-amber-light text-ink text-[14px] font-semibold transition-all duration-200"
            >
              Subscribe Annual
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
