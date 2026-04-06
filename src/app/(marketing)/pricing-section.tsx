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
    description: "Try everything for 14 days",
    features: [
      "1 Trust Card page",
      "Up to 5 featured reviews",
      "Google & G2 import",
      "Manual upload (screenshots, DMs)",
      "Mobile-first design",
      "CTA button (Calendly, WhatsApp, link)",
      "14-day full access trial",
    ],
    cta: "Start Free Trial",
    href: "/login",
    highlighted: false,
  },
  {
    name: "Starter",
    id: "starter",
    monthly: 19,
    annual: 12,
    annualTotal: 144,
    description: "For businesses getting started",
    features: [
      "Everything in Free",
      "Up to 25 reviews",
      "No watermark",
      "10 carousels / month",
      "2,000 widget impressions / month",
      "Basic SEO indexing",
      "3 collection forms",
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
      "Everything in Starter",
      "Up to 100 reviews",
      "Amazon & Etsy import",
      "Unlimited carousels",
      "Unlimited impressions",
      "Full SEO + rich snippets",
      "3 AI hook variants",
      "A/B hook testing",
      "Full analytics dashboard",
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
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Up to 1,000 reviews",
      "Multi-location support",
      "White-label branding",
      "API access",
      "Unlimited AI hooks",
      "Unlimited forms & brand kits",
    ],
    cta: "Start 14-Day Trial",
    href: "/login",
    highlighted: false,
  },
];

export function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
        Simple, transparent pricing
      </h2>
      <p className="text-[17px] text-slate-500 text-center mb-8">
        Start free. Upgrade when you&apos;re ready. Cancel anytime.
      </p>

      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-3 mb-12">
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
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/15 text-emerald">
            Save up to 37%
          </span>
        )}
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiers.map((tier) => {
          const price = tier.monthly === 0 ? 0 : annual ? tier.annual : tier.monthly;
          const isHighlighted = tier.highlighted;

          return (
            <div
              key={tier.id}
              className={`relative rounded-2xl p-7 space-y-5 ${
                isHighlighted
                  ? "bg-navy overflow-hidden"
                  : "bg-white border border-slate-200"
              }`}
            >
              {isHighlighted && (
                <>
                  <div className="absolute top-0 right-0 w-[180px] h-[180px] rounded-full bg-emerald/10 blur-[70px]" />
                  <div className="absolute top-4 right-4">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald/20 text-emerald uppercase tracking-wider">
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
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-[40px] font-bold tabular-nums ${
                    isHighlighted ? "text-white" : "text-slate-900"
                  }`}>
                    ${price}
                  </span>
                  {tier.monthly > 0 && (
                    <span className="text-slate-400">/mo</span>
                  )}
                  {tier.monthly === 0 && (
                    <span className="text-slate-400">/14 days</span>
                  )}
                </div>
                {annual && tier.annualTotal && (
                  <p className={`text-[13px] mt-1 ${isHighlighted ? "text-slate-400" : "text-slate-400"}`}>
                    ${tier.annualTotal} billed annually
                  </p>
                )}
                <p className={`text-[13px] mt-1 ${isHighlighted ? "text-slate-400" : "text-slate-400"}`}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-2.5 relative">
                {tier.features.map((item, i) => (
                  <li key={i} className={`flex items-start gap-2 text-[13px] ${
                    isHighlighted ? "text-slate-300" : "text-slate-500"
                  }`}>
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      isHighlighted ? "text-emerald" : "text-slate-300"
                    }`} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`relative flex items-center justify-center gap-2 w-full h-11 rounded-xl text-[14px] font-semibold transition-colors duration-200 ${
                  isHighlighted
                    ? "bg-emerald hover:bg-emerald-dark text-white glow-emerald"
                    : tier.monthly === 0
                    ? "border border-slate-200 text-slate-700 hover:bg-slate-50"
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
    </section>
  );
}
