"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    id: "free",
    monthly: 0,
    annual: 0,
    description: "See if it fits",
    features: [
      "1 Trust Card",
      "5 reviews",
      "Google & G2 import",
      "Manual upload",
      "CTA button",
      "14-day full access",
    ],
    cta: "Start Free",
    href: "/login",
    highlighted: false,
  },
  {
    name: "Starter",
    id: "starter",
    monthly: 19,
    annual: 12,
    annualTotal: 144,
    description: "For solopreneurs",
    features: [
      "25 reviews",
      "No watermark",
      "10 carousels / month",
      "Basic SEO indexing",
      "3 collection forms",
      "Analytics",
    ],
    cta: "Start 14-Day Trial",
    href: "/login",
    highlighted: false,
  },
  {
    name: "Pro",
    id: "pro",
    monthly: 39,
    annual: 29,
    annualTotal: 348,
    description: "For growing businesses",
    features: [
      "100 reviews",
      "Amazon & Etsy import",
      "Unlimited carousels",
      "Full SEO + rich snippets",
      "AI hook variants + A/B testing",
      "Full analytics",
      "Priority support",
    ],
    cta: "Start 14-Day Trial",
    href: "/login",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Business",
    id: "business",
    monthly: 79,
    annual: 59,
    annualTotal: 708,
    description: "For teams & agencies",
    features: [
      "1,000 reviews",
      "Multi-location",
      "White-label branding",
      "API access",
      "Unlimited AI hooks",
      "Unlimited forms",
    ],
    cta: "Start 14-Day Trial",
    href: "/login",
    highlighted: false,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="bg-slate-50/80 border-y border-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-3">
          Pick a plan. Start in 60 seconds.
        </h2>
        <p className="text-[16px] text-slate-500 text-center mb-8">
          All plans include a 14-day free trial. No credit card required.
        </p>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <span className={`text-sm font-medium ${!annual ? "text-slate-900" : "text-slate-400"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${annual ? "bg-emerald" : "bg-slate-300"}`}
            aria-label="Toggle annual billing"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${annual ? "translate-x-6" : ""}`}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-slate-900" : "text-slate-400"}`}>
            Annual
          </span>
          {annual && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald/15 text-emerald">
              Save up to 37%
            </span>
          )}
        </div>

        {/* Cards — 3 columns on desktop (Free hidden, shown as text below) */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.filter(t => t.monthly > 0).map((tier) => {
            const price = annual ? tier.annual : tier.monthly;
            const isHighlighted = tier.highlighted;

            return (
              <div
                key={tier.id}
                className={`relative rounded-2xl space-y-6 ${
                  isHighlighted
                    ? "bg-navy p-8 ring-2 ring-emerald/30 overflow-hidden scale-[1.02]"
                    : "bg-white border border-slate-200 p-8"
                }`}
              >
                {isHighlighted && (
                  <>
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-emerald/10 blur-[80px]" />
                    <div className="absolute -top-px left-1/2 -translate-x-1/2">
                      <span className="flex items-center gap-1 px-4 py-1.5 rounded-b-xl text-[11px] font-bold bg-emerald text-white uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" />
                        {tier.badge}
                      </span>
                    </div>
                  </>
                )}

                <div className="relative">
                  <h3 className={`text-[13px] font-semibold uppercase tracking-wider ${
                    isHighlighted ? "text-emerald" : "text-slate-400"
                  }`}>
                    {tier.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={`text-[48px] font-bold tabular-nums leading-none ${
                      isHighlighted ? "text-white" : "text-slate-900"
                    }`}>
                      ${price}
                    </span>
                    <span className={`text-[15px] ${isHighlighted ? "text-slate-400" : "text-slate-400"}`}>/mo</span>
                  </div>

                  {annual && tier.annualTotal && (
                    <p className="text-[13px] text-slate-400 mt-2">
                      ${tier.annualTotal}/year billed annually
                    </p>
                  )}
                  <p className={`text-[14px] mt-1 ${isHighlighted ? "text-slate-400" : "text-slate-500"}`}>
                    {tier.description}
                  </p>
                </div>

                <div className={`h-px ${isHighlighted ? "bg-white/10" : "bg-slate-100"}`} />

                <ul className="space-y-3 relative">
                  {tier.features.map((item, i) => (
                    <li key={i} className={`flex items-start gap-2.5 text-[14px] ${
                      isHighlighted ? "text-slate-300" : "text-slate-600"
                    }`}>
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        isHighlighted ? "text-emerald" : "text-emerald/60"
                      }`} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`relative flex items-center justify-center gap-2 w-full h-12 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                    isHighlighted
                      ? "bg-emerald hover:bg-emerald-dark text-white glow-emerald"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  {tier.cta}
                  {isHighlighted && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Free tier — compact text below */}
        <div className="mt-8 text-center">
          <p className="text-[14px] text-slate-400">
            Not ready to commit?{" "}
            <Link href="/login" className="text-emerald font-semibold hover:underline">
              Start free with 5 reviews
            </Link>
            {" "}and upgrade when you're ready.
          </p>
        </div>
      </div>
    </section>
  );
}
