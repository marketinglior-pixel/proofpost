"use client";

import { useState } from "react";
import {
  csatBenchmarks,
  getCsatLabel,
  getCsatColor,
} from "./csat-data";

type InputMode = "simple" | "detailed";

export function CsatCalculator() {
  const [mode, setMode] = useState<InputMode>("simple");

  // Simple mode
  const [totalResponses, setTotalResponses] = useState("");
  const [satisfiedResponses, setSatisfiedResponses] = useState("");

  // Detailed mode
  const [rating1, setRating1] = useState("");
  const [rating2, setRating2] = useState("");
  const [rating3, setRating3] = useState("");
  const [rating4, setRating4] = useState("");
  const [rating5, setRating5] = useState("");

  const [selectedIndustry, setSelectedIndustry] = useState("");

  // Calculate values based on mode
  let total = 0;
  let satisfied = 0;
  let r1 = 0, r2 = 0, r3 = 0, r4 = 0, r5 = 0;

  if (mode === "simple") {
    total = Number(totalResponses) || 0;
    satisfied = Number(satisfiedResponses) || 0;
  } else {
    r1 = Number(rating1) || 0;
    r2 = Number(rating2) || 0;
    r3 = Number(rating3) || 0;
    r4 = Number(rating4) || 0;
    r5 = Number(rating5) || 0;
    total = r1 + r2 + r3 + r4 + r5;
    satisfied = r4 + r5;
  }

  const hasInput = total > 0;
  const csat = hasInput ? Math.round((satisfied / total) * 100) : null;

  // Percentages for detailed breakdown
  const pct1 = hasInput && mode === "detailed" ? Math.round((r1 / total) * 100) : 0;
  const pct2 = hasInput && mode === "detailed" ? Math.round((r2 / total) * 100) : 0;
  const pct3 = hasInput && mode === "detailed" ? Math.round((r3 / total) * 100) : 0;
  const pct4 = hasInput && mode === "detailed" ? Math.round((r4 / total) * 100) : 0;
  const pct5 = hasInput && mode === "detailed" ? Math.round((r5 / total) * 100) : 0;

  const benchmark = csatBenchmarks.find((b) => b.industry === selectedIndustry);

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[16px] font-semibold text-slate-900">
            Enter your survey data
          </h2>
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => setMode("simple")}
              className={`text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                mode === "simple"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => setMode("detailed")}
              className={`text-[12px] font-medium px-3 py-1.5 rounded-md transition-colors ${
                mode === "detailed"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Detailed
            </button>
          </div>
        </div>

        {mode === "simple" ? (
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-medium text-slate-700 mb-2">
                Total survey responses
              </label>
              <input
                type="number"
                min="0"
                value={totalResponses}
                onChange={(e) => setTotalResponses(e.target.value)}
                placeholder="0"
                className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-green-600 mb-2">
                Satisfied responses (4-5)
              </label>
              <input
                type="number"
                min="0"
                value={satisfiedResponses}
                onChange={(e) => setSatisfiedResponses(e.target.value)}
                placeholder="0"
                className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-red-500 mb-2 text-center">
                1 star
              </label>
              <input
                type="number"
                min="0"
                value={rating1}
                onChange={(e) => setRating1(e.target.value)}
                placeholder="0"
                className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-colors text-center"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-orange-500 mb-2 text-center">
                2 stars
              </label>
              <input
                type="number"
                min="0"
                value={rating2}
                onChange={(e) => setRating2(e.target.value)}
                placeholder="0"
                className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors text-center"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-yellow-600 mb-2 text-center">
                3 stars
              </label>
              <input
                type="number"
                min="0"
                value={rating3}
                onChange={(e) => setRating3(e.target.value)}
                placeholder="0"
                className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-colors text-center"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-green-500 mb-2 text-center">
                4 stars
              </label>
              <input
                type="number"
                min="0"
                value={rating4}
                onChange={(e) => setRating4(e.target.value)}
                placeholder="0"
                className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors text-center"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-emerald mb-2 text-center">
                5 stars
              </label>
              <input
                type="number"
                min="0"
                value={rating5}
                onChange={(e) => setRating5(e.target.value)}
                placeholder="0"
                className="w-full text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors text-center"
              />
            </div>
          </div>
        )}
        <p className="mt-3 text-[12px] text-slate-400">
          Total responses: {total}
          {hasInput && mode === "simple" && ` · Satisfied: ${satisfied}`}
        </p>
      </div>

      {/* Results Section */}
      {csat !== null && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 space-y-6">
          {/* CSAT Score */}
          <div className="text-center">
            <p className="text-[13px] font-medium text-slate-400 uppercase tracking-wider mb-2">
              Your Customer Satisfaction Score
            </p>
            <p className={`text-[64px] font-bold leading-none ${getCsatColor(csat)}`}>
              {csat}%
            </p>
            <p className={`mt-2 text-[16px] font-medium ${getCsatColor(csat)}`}>
              {getCsatLabel(csat)}
            </p>
          </div>

          {/* Breakdown Bar */}
          {mode === "detailed" && (
            <div>
              <div className="flex rounded-full overflow-hidden h-4">
                {pct5 > 0 && (
                  <div
                    className="bg-emerald transition-all duration-500"
                    style={{ width: `${pct5}%` }}
                  />
                )}
                {pct4 > 0 && (
                  <div
                    className="bg-green-500 transition-all duration-500"
                    style={{ width: `${pct4}%` }}
                  />
                )}
                {pct3 > 0 && (
                  <div
                    className="bg-yellow-400 transition-all duration-500"
                    style={{ width: `${pct3}%` }}
                  />
                )}
                {pct2 > 0 && (
                  <div
                    className="bg-orange-400 transition-all duration-500"
                    style={{ width: `${pct2}%` }}
                  />
                )}
                {pct1 > 0 && (
                  <div
                    className="bg-red-500 transition-all duration-500"
                    style={{ width: `${pct1}%` }}
                  />
                )}
              </div>
              <div className="flex justify-between mt-2 text-[12px]">
                <span className="text-emerald font-medium">
                  {pct5}% (5)
                </span>
                <span className="text-green-500 font-medium">
                  {pct4}% (4)
                </span>
                <span className="text-yellow-600 font-medium">
                  {pct3}% (3)
                </span>
                <span className="text-orange-500 font-medium">
                  {pct2}% (2)
                </span>
                <span className="text-red-500 font-medium">
                  {pct1}% (1)
                </span>
              </div>
            </div>
          )}

          {/* Formula Display */}
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-[13px] text-slate-500 text-center">
              CSAT = (Satisfied responses / Total responses) &times; 100 = ({satisfied} / {total}) &times; 100 ={" "}
              <span className={`font-bold ${getCsatColor(csat)}`}>
                {csat}%
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
              {csatBenchmarks.map((b) => (
                <option key={b.industry} value={b.industry}>
                  {b.industry} (avg: {b.score}%)
                </option>
              ))}
            </select>

            {benchmark && csat !== null && (
              <div className="mt-4 bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-slate-500">Your CSAT</span>
                  <span className={`text-[15px] font-bold ${getCsatColor(csat)}`}>
                    {csat}%
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-slate-500">
                    {benchmark.industry} average
                  </span>
                  <span className="text-[15px] font-bold text-slate-700">
                    {benchmark.score}%
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <p className="text-[14px] font-medium text-center">
                    {csat > benchmark.score ? (
                      <span className="text-green-600">
                        Your CSAT is {csat - benchmark.score} points above the{" "}
                        {benchmark.industry} average
                      </span>
                    ) : csat === benchmark.score ? (
                      <span className="text-yellow-600">
                        Your CSAT matches the {benchmark.industry} average
                      </span>
                    ) : (
                      <span className="text-red-500">
                        Your CSAT is {benchmark.score - csat} points below the{" "}
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
    </div>
  );
}
