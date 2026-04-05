import Link from "next/link";
import { IPhoneMockup } from "../go/iphone-mockup";
import { StickyMobileCTA } from "../sticky-mobile-cta";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Sparkles,
  Upload,
  Wand2,
  Share2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Trust Card in 60 Seconds | ProofPost",
  description:
    "Import your reviews. Get a verified proof page. Share it in any DM. Free to start, no credit card required.",
};

const steps = [
  {
    icon: Upload,
    number: "1",
    title: "Import your reviews",
    desc: "Paste from Google, LinkedIn, DMs, or screenshots. We handle the rest.",
  },
  {
    icon: Wand2,
    number: "2",
    title: "AI picks your best line",
    desc: "Our AI reads every review and extracts the one sentence that sells.",
  },
  {
    icon: Share2,
    number: "3",
    title: "Share your link",
    desc: "Drop proofpst.com/yourname in any DM, bio, or email signature.",
  },
];

export default function CreateLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ============ MINIMAL HEADER ============ */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
              <Star className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-[15px] font-semibold text-slate-900">
              ProofPost
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-white bg-emerald hover:bg-emerald-dark px-5 py-2.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Start Free
          </Link>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.06)_0%,_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-16 sm:pb-20">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div className="space-y-6 min-w-0">
              <h1 className="font-bold text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.15] text-slate-900 tracking-tight">
                Create Your Trust Card{" "}
                <span className="text-emerald hand-underline">
                  in 60 Seconds
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-lg leading-relaxed">
                Import your reviews. Get a verified proof page. Share it in any
                DM.
              </p>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
                >
                  Start Free — No Credit Card
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-sm text-slate-400">
                Free plan includes 5 verified reviews. No website needed.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                {[
                  { icon: ShieldCheck, text: "Verified reviews" },
                  { icon: Sparkles, text: "AI-powered" },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-1.5 text-[13px] text-slate-500"
                  >
                    <item.icon
                      className="w-3.5 h-3.5 text-emerald"
                      aria-hidden="true"
                    />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: iPhone Mockup (desktop) */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-8 bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_transparent_70%)] rounded-full blur-2xl" />
                <IPhoneMockup src="/lio" />
              </div>
            </div>
          </div>

          {/* Mobile: Compact card preview */}
          <div className="lg:hidden mt-10">
            <div className="relative mx-auto max-w-[280px]">
              <div className="absolute -inset-4 bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_transparent_70%)] rounded-3xl blur-xl" />
              <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl shadow-slate-300/50">
                <div
                  className="rounded-[1.5rem] overflow-hidden bg-white relative"
                  style={{ height: 420 }}
                >
                  <iframe
                    src="/lio"
                    title="Trust Card Preview"
                    className="absolute top-0 left-0 border-none"
                    style={{
                      width: "375px",
                      height: "812px",
                      transform: "scale(0.7)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                    loading="lazy"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS — 3 STEPS ============ */}
      <section className="bg-snow py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
            Three steps. That&apos;s it.
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-xl bg-white border border-slate-200 p-7 space-y-4 card-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                    <step.icon
                      className="w-5 h-5 text-emerald-dark"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-[12px] font-bold text-emerald uppercase tracking-wider">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU GET (FREE) ============ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
            What&apos;s included — free
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "5 verified reviews on your page",
              "AI hook extraction — finds your money line",
              "Premium glassmorphism design",
              "Mobile-first — looks perfect in DMs",
              "Custom URL: proofpst.com/yourname",
              "Import from Google, LinkedIn, DMs, screenshots",
              "Verified badges on every review",
              "60-second setup — no code, no designer",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-2">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald/10 flex-shrink-0 mt-0.5">
                  <Sparkles
                    className="w-3 h-3 text-emerald"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-[14px] text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[36px] font-bold text-white tracking-tight">
            Your next prospect is going to ask for proof.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-lg mx-auto leading-relaxed">
            Will you send a Google Doc, or a verified Trust Card that makes
            you look like the premium service you are?
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Trust Card — Free
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-[13px] text-slate-500 mt-4">
            Free plan. No credit card. 60-second setup.
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA label="Create Your Trust Card — Free" />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
                <Star
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                />
              </div>
              <span className="text-[13px] font-semibold text-slate-700">
                ProofPost
              </span>
            </div>
            <p className="text-[12px] text-slate-400">
              &copy; 2026 ProofPost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
