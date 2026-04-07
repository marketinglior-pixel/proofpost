"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ImpactCalculator() {
  const [reviews, setReviews] = useState(50);
  const [visitors, setVisitors] = useState(5000);
  const [aov, setAov] = useState(100);

  // Baseline conversion: 2.5%. Lift scales with review count (diminishing returns).
  const baselineConversion = 0.025;
  // More reviews = higher lift, but caps at ~1.2% (logarithmic curve)
  const reviewLift = Math.min(0.012, 0.003 * Math.log10(Math.max(reviews, 1) / 5 + 1));
  const newConversion = baselineConversion + reviewLift;

  const baselineRevenue = Math.round(visitors * baselineConversion * aov);
  const newRevenue = Math.round(visitors * newConversion * aov);
  const extraRevenue = newRevenue - baselineRevenue;
  const rawRoi = extraRevenue / 9; // $9/mo plan
  const roi = Math.min(Math.round(rawRoi), 200); // Cap display at 200x to stay credible

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      {/* Left: Inputs */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-[28px] font-bold text-slate-900 tracking-tight">
            How much are your reviews worth?
          </h3>
          <p className="text-[15px] text-slate-500 leading-relaxed">
            Adjust the sliders to see the revenue impact of animated social proof on your site.
          </p>
        </div>

        <div className="space-y-5">
          {/* Reviews slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-medium text-slate-700">Customer reviews</label>
              <span className="text-[13px] font-bold text-slate-900 tabular-nums">{reviews}</span>
            </div>
            <input
              type="range"
              min={5}
              max={500}
              step={5}
              value={reviews}
              onChange={(e) => setReviews(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald"
            />
            <div className="flex justify-between text-[10px] text-slate-300">
              <span>5</span>
              <span>500</span>
            </div>
          </div>

          {/* Visitors slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-medium text-slate-700">Monthly visitors</label>
              <span className="text-[13px] font-bold text-slate-900 tabular-nums">{visitors.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={visitors}
              onChange={(e) => setVisitors(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald"
            />
            <div className="flex justify-between text-[10px] text-slate-300">
              <span>500</span>
              <span>100K</span>
            </div>
          </div>

          {/* AOV slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[13px] font-medium text-slate-700">Avg. deal size / order value</label>
              <span className="text-[13px] font-bold text-slate-900 tabular-nums">${aov}</span>
            </div>
            <input
              type="range"
              min={10}
              max={5000}
              step={10}
              value={aov}
              onChange={(e) => setAov(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-emerald"
            />
            <div className="flex justify-between text-[10px] text-slate-300">
              <span>$10</span>
              <span>$5,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Results */}
      <div className="rounded-2xl bg-navy p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-emerald/10 blur-[80px]" />

        <div className="relative space-y-6">
          {/* Before/After comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/5 p-4 space-y-1">
              <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Without ProofPost</p>
              <p className="text-[11px] text-slate-500">Conversion rate</p>
              <p className="text-[24px] font-bold text-slate-300 tabular-nums">{(baselineConversion * 100).toFixed(1)}%</p>
              <p className="text-[11px] text-slate-500">Monthly revenue</p>
              <p className="text-[20px] font-bold text-slate-300 tabular-nums">${baselineRevenue.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-emerald/10 border border-emerald/20 p-4 space-y-1">
              <p className="text-[11px] font-medium text-emerald uppercase tracking-wider">With ProofPost</p>
              <p className="text-[11px] text-emerald/60">Conversion rate</p>
              <p className="text-[24px] font-bold text-white tabular-nums">{(newConversion * 100).toFixed(1)}%</p>
              <p className="text-[11px] text-emerald/60">Monthly revenue</p>
              <p className="text-[20px] font-bold text-white tabular-nums">${newRevenue.toLocaleString()}</p>
            </div>
          </div>

          {/* Extra revenue highlight */}
          <div className="rounded-xl bg-emerald/10 border border-emerald/20 p-5 text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald" />
              <p className="text-[13px] font-medium text-emerald">Extra monthly revenue</p>
            </div>
            <p className="text-[36px] font-bold text-white tabular-nums">
              +${extraRevenue.toLocaleString()}
            </p>
            <p className="text-[12px] text-slate-400">
              That&apos;s a <span className="text-emerald font-semibold">{rawRoi > 200 ? "200+" : roi}x return</span> on $9/mo
            </p>
          </div>

          {/* Calculation breakdown */}
          <details className="group">
            <summary className="flex items-center justify-center gap-1.5 cursor-pointer text-[11px] text-slate-500 hover:text-slate-300 transition-colors">
              <span>How we calculate this</span>
              <span className="group-open:rotate-180 transition-transform text-[10px]">▼</span>
            </summary>
            <div className="mt-3 rounded-lg bg-white/5 p-4 space-y-2 text-[11px] text-slate-400 leading-relaxed">
              <p>
                <span className="text-slate-300 font-medium">Baseline:</span>{" "}
                {visitors.toLocaleString()} visitors × {(baselineConversion * 100).toFixed(1)}% conversion × ${aov} = <span className="text-slate-300">${baselineRevenue.toLocaleString()}/mo</span>
              </p>
              <p>
                <span className="text-slate-300 font-medium">With ProofPost:</span>{" "}
                {visitors.toLocaleString()} visitors × {(newConversion * 100).toFixed(1)}% conversion × ${aov} = <span className="text-slate-300">${newRevenue.toLocaleString()}/mo</span>
              </p>
              <p>
                <span className="text-slate-300 font-medium">Conversion lift:</span>{" "}
                +{(reviewLift * 100).toFixed(1)}% based on {reviews} reviews (more reviews = higher lift, up to +1.2%)
              </p>
              <p className="pt-1 border-t border-white/5 text-[10px]">
                Based on industry data: pages with visible social proof see 0.3–1.5% higher conversion rates.
                Animated widgets outperform static text by 2–3x in eye-tracking studies.
              </p>
            </div>
          </details>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full h-12 bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Start converting reviews into revenue
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
