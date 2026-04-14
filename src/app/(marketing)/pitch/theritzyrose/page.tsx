import Link from "next/link";
import { IPhoneMockup } from "../../go/iphone-mockup";
import { MacbookMockup } from "../../go/macbook-mockup";
import { StickyMobileCTA } from "../../sticky-mobile-cta";
import { ArrowRight, Check, Star, Shield, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofPost x TheRitzyRose | Your Reviews Are Doing Nothing for Your Website",
  description:
    "TheRitzyRose has 34,000+ five-star reviews across Etsy and Amazon, but none show up on theritzyrose.com. We fix that in 30 days.",
  robots: "noindex, nofollow",
};

const PRESS = [
  "The New York Times",
  "Good Morning America",
  "Martha Stewart Weddings",
  "Refinery29",
  "Entertainment Tonight",
  "Brides.com",
];

const STATS = [
  { icon: Star, value: "110,042", label: "Etsy Sales" },
  { icon: Shield, value: "24,517", label: "Etsy Reviews" },
  { icon: Shield, value: "10,000+", label: "Amazon Reviews" },
  { icon: Award, value: "5.0", label: "Average Rating" },
];

const PROCESS_WEEKS = [
  {
    week: 1,
    title: "Audit + Build",
    text: "We pull your best reviews from Etsy, Amazon, and Google. AI extracts the sentences that sell. Your Trust Card goes live with verified badges and rich snippets.",
  },
  {
    week: 2,
    title: "Integrate Everywhere",
    text: "We embed proof on your website, add it to your email signature, update your social bios, and place it at every customer touchpoint. Your reviews start working 24/7.",
  },
  {
    week: 3,
    title: "Campaign Launch",
    text: "If you have a customer list: targeted email/SMS campaign featuring your best reviews. If not: social and retargeting ads with your Trust Card as the proof layer.",
  },
  {
    week: 4,
    title: "Measure + Report",
    text: "Before-and-after report with real numbers. Click-through rates, conversion changes, traffic from proof pages. Data you can see and act on.",
  },
];

const DELIVERABLES = [
  {
    title: "Trust Card with 3-platform reviews",
    text: "Reviews from Etsy, Amazon, and Google on one branded page with verified source badges.",
  },
  {
    title: "AI-extracted money lines",
    text: "The strongest selling sentences from every review, highlighted and ready for marketing.",
  },
  {
    title: "Google SEO rich snippets",
    text: "Schema markup that puts star ratings in search results. Already passing Google's Rich Results Test.",
  },
  {
    title: "Website widget integration",
    text: "Reviews embedded directly on your product pages and homepage.",
  },
  {
    title: "Marketing strategy + campaign copy",
    text: "Email sequences, social posts, and ad copy built around your actual customer words.",
  },
  {
    title: "30-day results report",
    text: "Before-and-after metrics: traffic, clicks, conversions. Proof that proof works.",
  },
];

const PILOT_INCLUDES = [
  "Full review audit across Etsy, Amazon, and Google",
  "Trust Card built and launched at proofpst.com/theritzyrose",
  "Website integration + email signature setup",
  "Marketing campaign strategy and copy",
  "30-day results report with real metrics",
  "Direct access to Lior throughout the pilot",
];

const NEXT_STEPS = [
  "We audit your reviews across Etsy, Amazon, and Google",
  "We build your Trust Card and integrate it everywhere",
  "We launch your marketing campaign",
  "We measure and report the results",
];

export default function TheRitzyRosePitchPage() {
  return (
    <>
      <StickyMobileCTA label="Start Your 30-Day Pilot" />

      {/* ───────────────────────────── 1. PROBLEM ───────────────────────────── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-[12px] font-semibold text-emerald uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                Prepared exclusively for TheRitzyRose
              </span>

              <h1
                className="font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                Your reviews are doing nothing
                <br />
                <span className="text-emerald">for your website.</span>
              </h1>

              <p className="text-[16px] text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                We help you drive sales by turning your 24,517 Etsy reviews,
                10,000+ Amazon reviews, and 110,042 sales into a marketing
                system that works across your website, emails, and social —
                so every buyer sees your proof before they click Buy.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10"
                  >
                    <stat.icon className="w-4 h-4 text-emerald" />
                    <div>
                      <p className="text-[14px] font-bold text-white tabular-nums">{stat.value}</p>
                      <p className="text-[11px] text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: iPhone mockup */}
            <div className="hidden lg:flex justify-center relative">
              <div className="absolute inset-0 bg-emerald/5 rounded-full blur-[80px]" />
              <div className="relative">
                <IPhoneMockup src="https://proofpst.com/theritzyrose" />
                <p className="text-[11px] text-slate-500 text-center mt-4">
                  Live Trust Card — proofpst.com/theritzyrose
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 2. SOLUTION ───────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[26px] sm:text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
            We don't just display your reviews.
            <br />
            <span className="text-emerald">We turn them into a marketing system.</span>
          </h2>
          <p className="text-[15px] text-slate-500 mt-5 max-w-xl mx-auto leading-relaxed">
            A Trust Card is one piece. The real value is a 30-day marketing
            process where we audit your reviews, build your proof assets,
            integrate them into every customer touchpoint, and measure the
            results. You get a marketing strategist and the technology to back
            it up.
          </p>
        </div>

        <div className="space-y-3 mb-10">
          {[
            {
              title: "More than a widget",
              text: "Most review tools stop at \"embed reviews on your site.\" We start there — then build campaigns, write copy, and place your proof everywhere buyers look.",
            },
            {
              title: "AI-extracted money lines",
              text: "Your 34,000+ reviews contain sentences that sell. Our AI finds the exact phrases — \"arrived faster than expected,\" \"better quality than the photo\" — and puts them front and center.",
            },
            {
              title: "Hands-on, not hands-off",
              text: "This isn't a self-serve tool you'll forget about. We work directly with your team for 30 days to build, launch, and measure a real marketing campaign around your reviews.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 px-5 py-4"
            >
              <Check className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-semibold text-slate-900">{item.title}</p>
                <p className="text-[13px] text-slate-500 mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border-2 border-emerald/30 bg-emerald/5 p-7 sm:p-8 text-center">
          <p className="text-[13px] font-semibold text-emerald uppercase tracking-wider mb-2">
            Built for TheRitzyRose. Not a generic tool.
          </p>
          <p className="text-[15px] text-slate-700 leading-relaxed max-w-lg mx-auto">
            We've already analyzed your Etsy and Amazon reviews, built your
            Trust Card, and identified the campaigns that will move the needle.
            This proposal is ready to execute.
          </p>
        </div>
      </section>

      {/* ───────────────────────────── 3. THE PROCESS ───────────────────────────── */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
              Your 30-day pilot.{" "}
              <span className="text-emerald">Week by week.</span>
            </h2>
            <p className="text-[15px] text-slate-400 mt-3">
              Here's exactly what happens after you say go.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_WEEKS.map((w) => (
              <div
                key={w.week}
                className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-3"
              >
                <span className="text-[11px] font-bold text-emerald uppercase tracking-widest">
                  Week {w.week}
                </span>
                <h3 className="text-[16px] font-semibold text-white">{w.title}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 4. WHAT YOU GET ───────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            Everything included in your pilot.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {DELIVERABLES.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 px-5 py-4"
            >
              <Check className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-semibold text-slate-900">{item.title}</p>
                <p className="text-[13px] text-slate-500 mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────────── 5. DISPLAY ───────────────────────────── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
              We already built yours.
            </h2>
            <p className="text-[15px] text-slate-500 mt-3">
              A real, working Trust Card for TheRitzyRose. Live right now.
            </p>
          </div>

          {/* Desktop: MacBook mockup */}
          <div
            className="hidden md:block macbook-container"
            style={{ "--macbook-scale": "0.82" } as React.CSSProperties}
          >
            <MacbookMockup src="https://proofpst.com/theritzyrose" />
          </div>

          {/* Mobile: iPhone mockup */}
          <div className="flex md:hidden justify-center">
            <IPhoneMockup src="https://proofpst.com/theritzyrose" />
          </div>

          <p className="text-[12px] text-slate-400 text-center mt-6">
            Try it:{" "}
            <a
              href="https://proofpst.com/theritzyrose"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald hover:underline"
            >
              proofpst.com/theritzyrose
            </a>
          </p>

          <p className="text-[13px] text-slate-500 text-center mt-4 max-w-md mx-auto">
            The <span className="text-emerald font-semibold">highlighted lines</span> are
            the AI-extracted sentences we'd use in your marketing. Every review
            verified straight from Etsy and Amazon.
          </p>

          {/* Press strip */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-3">
              Your press, on your Trust Card
            </p>
            <p className="text-[13px] text-slate-600">{PRESS.join(" · ")}</p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 6. OFFER ───────────────────────────── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-8">
          <div>
            <h2 className="text-[26px] sm:text-[32px] font-bold text-white tracking-tight">
              Your customers already wrote
              <br />
              <span className="text-emerald">your best marketing.</span>
            </h2>
            <p className="text-[14px] text-slate-400 mt-4">
              Let's put it to work. 30 days, measurable results.
            </p>
          </div>

          {/* Pilot card */}
          <div className="rounded-2xl bg-white/5 border border-emerald/20 p-8 text-center max-w-md mx-auto">
            <p className="text-[12px] text-emerald uppercase tracking-wider font-semibold mb-3">
              The Pilot
            </p>
            <p className="text-[32px] font-bold text-white leading-tight">
              30-Day Marketing Pilot
            </p>
            <p className="text-[13px] text-slate-400 mt-2">
              Hands-on marketing strategy + ProofPost technology
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 text-left">
              {PILOT_INCLUDES.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-slate-300 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="mailto:lior@proofpst.com?subject=TheRitzyRose%2030-Day%20Pilot"
            className="inline-flex items-center justify-center gap-2 h-13 px-10 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Start Your Pilot
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> No long-term contract
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> Results in 30 days
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> We handle everything
            </span>
          </div>

          {/* Next steps */}
          <div className="pt-8 border-t border-white/10 text-left max-w-md mx-auto">
            <p className="text-[12px] text-slate-500 uppercase tracking-wider mb-4 text-center">
              Next steps
            </p>
            {NEXT_STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <span className="text-[13px] font-bold text-emerald tabular-nums">{i + 1}.</span>
                <span className="text-[13px] text-slate-400">{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-[12px] text-slate-600">
              <a href="https://proofpst.com" className="text-emerald hover:underline">
                proofpst.com
              </a>
              {" · "}
              <a
                href="https://proofpst.com/theritzyrose"
                className="text-emerald hover:underline"
              >
                See TheRitzyRose Trust Card
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
