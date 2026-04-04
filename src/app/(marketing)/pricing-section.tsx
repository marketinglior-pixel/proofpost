"use client";

import { Check, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const freeFeatures = [
  "1 Trust Card page",
  "Up to 15 verified reviews",
  "Google & G2 import",
  "Manual upload (screenshots, DMs)",
  "Mobile-first design",
  "CTA button (Calendly, WhatsApp, link)",
  "ProofPost watermark",
];

const ltdFeatures = [
  "Everything in Free",
  "Unlimited reviews",
  "No watermark",
  "\"ProofPost Approved\" badge",
  "Custom accent color & theme",
  "Analytics dashboard",
  "All future features included",
  "Priority support",
];

export function PricingSection() {
  return (
    <section id="pricing" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
        One price. Forever.
      </h2>
      <p className="text-[17px] text-slate-500 text-center mb-12">
        No monthly fees. No yearly renewal. Pay once, own it for life.
      </p>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Free */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-6">
          <div>
            <h3 className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">
              Free
            </h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-[48px] font-bold text-slate-900 tabular-nums">$0</span>
              <span className="text-slate-400">/forever</span>
            </div>
            <p className="text-[13px] text-slate-400 mt-1">Get started in 60 seconds</p>
          </div>

          <ul className="space-y-3">
            {freeFeatures.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px] text-slate-500">
                <Check className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/login"
            className="flex items-center justify-center w-full h-12 rounded-xl border border-slate-200 text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
          >
            Start Free
          </Link>
        </div>

        {/* LTD */}
        <div className="relative rounded-2xl bg-navy p-8 space-y-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-emerald/10 blur-[80px]" />

          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald/20 text-emerald uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Early Bird
            </span>
          </div>

          <div className="relative">
            <h3 className="text-[13px] font-semibold text-emerald uppercase tracking-wider">
              Lifetime Deal
            </h3>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-[48px] font-bold text-white tabular-nums">$69</span>
              <span className="text-slate-500 text-sm">one-time</span>
            </div>
            <p className="text-[13px] text-slate-400 mt-1">
              Future price: $29/mo. Lock in now.
            </p>
          </div>

          <ul className="space-y-3 relative">
            {ltdFeatures.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[14px] text-slate-300">
                <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <Link
            href="/login"
            className="relative flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold transition-colors duration-200 glow-emerald"
          >
            Get Lifetime Access
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
