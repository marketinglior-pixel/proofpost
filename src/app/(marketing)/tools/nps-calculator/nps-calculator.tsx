"use client";

import { useState } from "react";
import {
  benchmarks,
  getNpsLabel,
  getNpsColor,
  getNpsBgColor,
} from "./benchmark-data";
import { EmailCapture } from "../components/email-capture";

export function NpsCalculator() {
  const [promoters, setPromoters] = useState("");
  const [passives, setPassives] = useState("");
  const [detractors, setDetractors] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const p = Number(promoters) || 0;
  const pa = Number(passives) || 0;
  const d = Number(detractors) || 0;
  const total = p + pa + d;

  const hasInput = total > 0;
  const nps = hasInput ? Math.round(((p - d) / total) * 100) : null;
  const pctPromoters = hasInput ? Math.round((p / total) * 100) : 0;
  const pctPassives = hasInput ? Math.round((pa / total) * 100) : 0;
  const pctDetractors = hasInput ? Math.round((d / total) * 100) : 0;

  const benchmark = benchmarks.find((b) => b.industry === selectedIndustry);

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8">
        <h2 className="text-[16px] font-semibold text-slate-900 mb-6">
          Enter your survey responses
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-[13px] font-medium text-green-600 mb-2">
              Promoters (9-10)
            </label>
            <input
              type="number"
              min="0"
              value={promoters}
              onChange={(e) => setPromoters(e.target.value)}
              placeholder="0"
              className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-yellow-600 mb-2">
              Passives (7-8)
            </label>
            <input
              type="number"
              min="0"
              value={passives}
              onChange={(e) => setPassives(e.target.value)}
              placeholder="0"
              className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-red-500 mb-2">
              Detractors (0-6)
            </label>
            <input
              type="number"
              min="0"
              value={detractors}
              onChange={(e) => setDetractors(e.target.value)}
              placeholder="0"
              className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors"
            />
          </div>
        </div>
        <p className="mt-3 text-[12px] text-slate-400">
          Total responses: {total}
        </p>
      </div>

      {/* Results Section */}
      {nps !== null && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 space-y-6">
          {/* NPS Score */}
          <div className="text-center">
            <p className="text-[13px] font-medium text-slate-400 uppercase tracking-wider mb-2">
              Your Net Promoter Score
            </p>
            <p className={`text-[64px] font-bold leading-none ${getNpsColor(nps)}`}>
              {nps > 0 ? `+${nps}` : nps}
            </p>
            <p className={`mt-2 text-[16px] font-medium ${getNpsColor(nps)}`}>
              {getNpsLabel(nps)}
            </p>
          </div>

          {/* Breakdown Bar */}
          <div>
            <div className="flex rounded-full overflow-hidden h-4">
              {pctPromoters > 0 && (
                <div
                  className="bg-green-500 transition-all duration-500"
                  style={{ width: `${pctPromoters}%` }}
                />
              )}
              {pctPassives > 0 && (
                <div
                  className="bg-yellow-400 transition-all duration-500"
                  style={{ width: `${pctPassives}%` }}
                />
              )}
              {pctDetractors > 0 && (
                <div
                  className="bg-red-500 transition-all duration-500"
                  style={{ width: `${pctDetractors}%` }}
                />
              )}
            </div>
            <div className="flex justify-between mt-2 text-[12px]">
              <span className="text-green-600 font-medium">
                {pctPromoters}% Promoters
              </span>
              <span className="text-yellow-600 font-medium">
                {pctPassives}% Passives
              </span>
              <span className="text-red-500 font-medium">
                {pctDetractors}% Detractors
              </span>
            </div>
          </div>

          {/* Formula Display */}
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-[13px] text-slate-500 text-center">
              NPS = % Promoters − % Detractors = {pctPromoters}% − {pctDetractors}% ={" "}
              <span className={`font-bold ${getNpsColor(nps)}`}>
                {nps > 0 ? `+${nps}` : nps}
              </span>
            </p>
          </div>

          {/* Industry Benchmark */}
          <div>
            <label className="block text-[13px] font-medium text-slate-700 mb-2">
              Compare with industry benchmark
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="text-[14px] text-slate-700 bg-white border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors w-full sm:w-auto"
            >
              <option value="">Select your industry</option>
              {benchmarks.map((b) => (
                <option key={b.industry} value={b.industry}>
                  {b.industry} (avg: {b.score})
                </option>
              ))}
            </select>

            {benchmark && nps !== null && (
              <div className="mt-4 bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-slate-500">Your NPS</span>
                  <span className={`text-[15px] font-bold ${getNpsColor(nps)}`}>
                    {nps > 0 ? `+${nps}` : nps}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-slate-500">
                    {benchmark.industry} average
                  </span>
                  <span className="text-[15px] font-bold text-slate-700">
                    +{benchmark.score}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-[14px] font-medium text-center">
                    {nps > benchmark.score ? (
                      <span className="text-green-600">
                        Your NPS is {nps - benchmark.score} points above the{" "}
                        {benchmark.industry} average
                      </span>
                    ) : nps === benchmark.score ? (
                      <span className="text-yellow-600">
                        Your NPS matches the {benchmark.industry} average
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Your NPS is {benchmark.score - nps} points below the{" "}
                        {benchmark.industry} average
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email Capture — shown after calculation */}
      {nps !== null && (
        <EmailCapture
          toolName="nps-calculator"
          headline="Get your full NPS report"
          description="We'll email you a detailed NPS analysis with improvement tips and industry comparisons."
          buttonText="Send My Report →"
        />
      )}
    </div>
  );
}
