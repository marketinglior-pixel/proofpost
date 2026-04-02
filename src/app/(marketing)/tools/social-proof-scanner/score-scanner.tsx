"use client";

import { useState, useEffect, useRef } from "react";
import {
  Code2,
  Quote,
  Shield,
  Star,
  LayoutGrid,
  Hash,
  Video,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { EmailCapture } from "../components/email-capture";

interface CategoryResult {
  score: number;
  maxScore: number;
  found: boolean;
  details: string[];
}

interface ScanResult {
  url: string;
  score: number;
  label: string;
  categories: {
    schemaMarkup: CategoryResult;
    testimonials: CategoryResult;
    trustBadges: CategoryResult;
    starRatings: CategoryResult;
    reviewWidgets: CategoryResult;
    socialProofNumbers: CategoryResult;
    videoTestimonials: CategoryResult;
  };
  recommendations: string[];
}

interface ScanError {
  url: string;
  error: string;
  errorMessage: string;
  score: null;
}

const scanPhases = [
  "Fetching your website...",
  "Checking schema markup...",
  "Looking for testimonials...",
  "Detecting trust badges...",
  "Analyzing star ratings...",
  "Scanning for review widgets...",
  "Calculating your score...",
];

const categoryMeta: {
  key: keyof ScanResult["categories"];
  label: string;
  icon: typeof Code2;
}[] = [
  { key: "schemaMarkup", label: "Schema Markup", icon: Code2 },
  { key: "testimonials", label: "Testimonials", icon: Quote },
  { key: "trustBadges", label: "Trust Badges", icon: Shield },
  { key: "starRatings", label: "Star Ratings", icon: Star },
  { key: "reviewWidgets", label: "Review Widgets", icon: LayoutGrid },
  { key: "socialProofNumbers", label: "Social Proof Numbers", icon: Hash },
  { key: "videoTestimonials", label: "Video Testimonials", icon: Video },
];

function getScoreColor(label: string): string {
  switch (label) {
    case "Critical": return "text-red-500";
    case "Weak": return "text-orange-500";
    case "Average": return "text-yellow-600";
    case "Good": return "text-emerald";
    case "Excellent": return "text-green-500";
    default: return "text-slate-500";
  }
}

function getScoreBg(label: string): string {
  switch (label) {
    case "Critical": return "bg-red-500";
    case "Weak": return "bg-orange-500";
    case "Average": return "bg-yellow-500";
    case "Good": return "bg-emerald";
    case "Excellent": return "bg-green-500";
    default: return "bg-slate-300";
  }
}

function getScoreRingColor(label: string): string {
  switch (label) {
    case "Critical": return "#ef4444";
    case "Weak": return "#f97316";
    case "Average": return "#ca8a04";
    case "Good": return "#10b981";
    case "Excellent": return "#22c55e";
    default: return "#94a3b8";
  }
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = getScoreRingColor(label);

  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={radius} fill="none"
          stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-[40px] font-bold leading-none ${getScoreColor(label)}`}>
          {score}
        </span>
        <span className="text-[12px] text-slate-400 mt-1">/100</span>
      </div>
    </div>
  );
}

export function ScoreScanner() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "scanning" | "done" | "error">("idle");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [phase, setPhase] = useState(0);
  const phaseInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (phaseInterval.current) clearInterval(phaseInterval.current);
    };
  }, []);

  async function handleScan() {
    const trimmed = url.trim();
    if (!trimmed) {
      setErrorMessage("Please enter a website URL.");
      setStatus("error");
      return;
    }

    // Basic validation
    try {
      new URL(trimmed.startsWith("http") ? trimmed : "https://" + trimmed);
    } catch {
      setErrorMessage("Please enter a valid URL (e.g. example.com).");
      setStatus("error");
      return;
    }

    setStatus("scanning");
    setErrorMessage("");
    setResult(null);
    setPhase(0);

    // Cycle through scan phases
    let currentPhase = 0;
    phaseInterval.current = setInterval(() => {
      currentPhase = Math.min(currentPhase + 1, scanPhases.length - 1);
      setPhase(currentPhase);
    }, 1200);

    try {
      const res = await fetch("/api/scan-social-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      if (phaseInterval.current) clearInterval(phaseInterval.current);

      if (res.status === 429) {
        setErrorMessage("Too many scans. Please wait a minute and try again.");
        setStatus("error");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      const data = await res.json();

      // Check if it's an error response (fetching the site failed)
      if (data.error) {
        setErrorMessage(data.errorMessage || "Could not scan this website.");
        setStatus("error");
        return;
      }

      setResult(data as ScanResult);
      setStatus("done");
    } catch {
      if (phaseInterval.current) clearInterval(phaseInterval.current);
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8">
        <h2 className="text-[16px] font-semibold text-slate-900 mb-2">
          Enter your website URL
        </h2>
        <p className="text-[13px] text-slate-400 mb-6">
          We&apos;ll analyze your site for social proof elements and give you a score.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && status !== "scanning") handleScan();
            }}
            placeholder="example.com"
            disabled={status === "scanning"}
            className="flex-1 text-[16px] text-slate-900 bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald transition-colors disabled:opacity-60"
          />
          <button
            onClick={handleScan}
            disabled={status === "scanning"}
            className="text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap glow-emerald"
          >
            {status === "scanning" ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning...
              </span>
            ) : (
              "Scan My Website"
            )}
          </button>
        </div>
        {status === "error" && errorMessage && (
          <p className="mt-3 text-[13px] text-red-500">{errorMessage}</p>
        )}
      </div>

      {/* Scanning State */}
      {status === "scanning" && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-8 text-center">
          <Loader2 className="w-8 h-8 text-emerald animate-spin mx-auto mb-4" />
          <p className="text-[15px] font-medium text-slate-700">
            {scanPhases[phase]}
          </p>
          <div className="mt-4 max-w-xs mx-auto bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${((phase + 1) / scanPhases.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Results */}
      {status === "done" && result && (
        <>
          {/* Score Card */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8">
            <div className="text-center mb-8">
              <p className="text-[13px] font-medium text-slate-400 uppercase tracking-wider mb-4">
                Your Social Proof Score
              </p>
              <ScoreRing score={result.score} label={result.label} />
              <p className={`mt-3 text-[18px] font-semibold ${getScoreColor(result.label)}`}>
                {result.label}
              </p>
              <p className="mt-1 text-[13px] text-slate-400">
                {result.url}
              </p>
            </div>

            {/* Category Breakdown */}
            <div className="border-t border-slate-100 pt-6">
              <p className="text-[13px] font-medium text-slate-700 mb-4">
                Breakdown by Category
              </p>
              <div className="space-y-4">
                {categoryMeta.map(({ key, label, icon: Icon }) => {
                  const cat = result.categories[key];
                  const pct = cat.maxScore > 0 ? (cat.score / cat.maxScore) * 100 : 0;
                  return (
                    <div key={key}>
                      <div className="flex items-center gap-3 mb-1.5">
                        <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-[14px] font-medium text-slate-700 flex-1">
                          {label}
                        </span>
                        {cat.found ? (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-emerald bg-emerald/10 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Found
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3" />
                            Missing
                          </span>
                        )}
                        <span className="text-[12px] text-slate-400 w-14 text-right shrink-0">
                          {cat.score}/{cat.maxScore}
                        </span>
                      </div>
                      <div className="ml-7 flex items-center gap-3">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`${cat.found ? getScoreBg(result.label) : "bg-slate-200"} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      {cat.details.length > 0 && (
                        <div className="ml-7 mt-1.5">
                          {cat.details.map((detail, i) => (
                            <p key={i} className="text-[12px] text-slate-400 leading-relaxed">
                              {detail}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="text-[16px] font-semibold text-slate-900">
                  How to Improve Your Score
                </h3>
              </div>
              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[13px] font-bold text-emerald mt-0.5 shrink-0">
                      {i + 1}.
                    </span>
                    <p className="text-[14px] text-slate-600 leading-relaxed">
                      {rec}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-slate-900 rounded-xl p-6 sm:p-8 text-center">
            <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-2">
              Quick fix
            </p>
            <h3 className="text-[20px] font-bold text-white">
              Boost your score with ProofPost
            </h3>
            <p className="mt-2 text-[14px] text-slate-400 max-w-md mx-auto">
              Import your reviews, let AI find the best quote, and display animated testimonials on your website. 60 seconds. No developer.
            </p>
            <a
              href="/login"
              className="inline-flex items-center gap-2 mt-6 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3 rounded-lg transition-colors duration-200 glow-emerald"
            >
              Try ProofPost Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="mt-2 text-[12px] text-slate-500">
              No credit card required
            </p>
          </div>

          {/* Email Capture */}
          <EmailCapture
            toolName="social-proof-scanner"
            headline="Get your full Social Proof Report"
            description="We'll email you a detailed analysis with step-by-step recommendations to improve your social proof."
            buttonText="Send My Report"
          />
        </>
      )}
    </div>
  );
}
