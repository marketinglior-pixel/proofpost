"use client";

import { useState } from "react";
import { Check, ArrowRight, ArrowDown } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
  "3 testimonial widgets",
  "AI Hook Extraction (1 hook)",
  "Screenshot Import",
  "Widget Builder (presets)",
  "Collection Forms",
  "Wall of Love",
];

const freeExtras = [
  "Embed on your site",
  "500 impressions/month",
  "ProofPost watermark",
];

const proFeatures = [
  "Unlimited widgets",
  "3 AI Hook Variants + A/B Testing",
  "Widget Style Builder (full)",
  "Auto-Widget Pipeline",
  "Screenshot bulk import",
  "Unlimited impressions",
];

const proExtras = [
  "No watermark",
  "Analytics dashboard",
  "Hook Performance Analytics",
  "PDF carousel download",
  "Multiple Brand Kits",
  "Priority support",
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const proPrice = isAnnual ? 12 : 19;
  const proBilling = isAnnual ? "$144 billed annually" : "Billed monthly";

  return (
    <section id="pricing" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
        Simple pricing. No hidden fees.
      </h2>
      <p className="text-[17px] text-slate-500 text-center mb-10">
        I think paying eighty dollars a month for a text widget is absurd.
      </p>

      {/* Toggle */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-full">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer ${
              !isAnnual
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer ${
              isAnnual
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Annual
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald/10 text-emerald">
              Save 37%
            </span>
          </button>
        </div>
      </div>

      {/* Cards — Pro first on mobile, Free first on desktop */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Free */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-6 order-2 sm:order-1">
          <div>
            <h3 className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">
              Free
            </h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[48px] font-bold text-slate-900 tabular-nums">
                $0
              </span>
              <span className="text-slate-400">/mo</span>
            </div>
            <p className="text-[13px] text-slate-400 mt-1">Free forever</p>
          </div>

          <ul className="space-y-3">
            {freeFeatures.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[14px] text-slate-500"
              >
                <Check
                  className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="#comparison"
            className="flex items-center justify-center gap-1.5 text-[12px] text-slate-400 hover:text-slate-600 transition-colors"
          >
            +{freeExtras.length} more features
            <ArrowDown className="w-3 h-3" />
          </Link>

          <Link
            href="/login"
            className="flex items-center justify-center w-full h-12 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
          >
            Start Free
          </Link>
        </div>

        {/* Pro */}
        <div className="relative rounded-2xl bg-navy p-8 space-y-6 overflow-hidden order-1 sm:order-2">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-emerald/10 blur-[80px]" />

          {/* Most Popular badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald/20 text-emerald uppercase tracking-wider">
              Most Popular
            </span>
          </div>

          <div className="relative">
            <h3 className="text-[13px] font-semibold text-emerald uppercase tracking-wider">
              Pro
            </h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[48px] font-bold text-white tabular-nums">
                ${proPrice}
              </span>
              <span className="text-slate-400">/mo</span>
              {isAnnual && (
                <span className="text-[14px] text-slate-500 line-through tabular-nums">
                  $19
                </span>
              )}
            </div>
            <p className="text-[13px] text-slate-400 mt-1">{proBilling}</p>
          </div>

          <ul className="space-y-3 relative">
            {proFeatures.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-[14px] text-slate-300"
              >
                <Check
                  className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="#comparison"
            className="relative flex items-center justify-center gap-1.5 text-[12px] text-slate-500 hover:text-slate-300 transition-colors"
          >
            +{proExtras.length} more features
            <ArrowDown className="w-3 h-3" />
          </Link>

          <Link
            href="/login"
            className="relative flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold transition-colors duration-200 glow-emerald"
          >
            Start Pro
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
