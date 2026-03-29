import Link from "next/link";
import { HeroUrlInput } from "../hero-url-input";
import { HeroWidgetShowcase } from "../hero-widget-showcase";
import { PricingSection } from "../pricing-section";
import { StickyMobileCTA } from "../sticky-mobile-cta";
import {
  ArrowRight,
  Star,
  Link2,
  Sparkles,
  Code2,
  Eye,
  Clock,
  Users,
} from "lucide-react";

export default function GoLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ============ MINIMAL HEADER — no nav links ============ */}
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
            Try Free
          </Link>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-snow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.06)_0%,_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-[1fr_minmax(0,480px)] gap-12 lg:gap-20 items-center">
            {/* Left: Headline + CTA */}
            <div className="space-y-8 min-w-0">
              <h1 className="font-bold text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.2] text-slate-900 tracking-tight">
                No Reviews on Your Site? You're{" "}
                <span className="text-emerald hand-underline">
                  Losing Money.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-md leading-relaxed">
                ProofPost turns customer feedback into high-converting social
                proof for your website in seconds.
              </p>

              {/* Desktop: URL Input */}
              <div className="hidden sm:block">
                <HeroUrlInput />
              </div>

              {/* Mobile: CTA Button */}
              <div className="sm:hidden">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 h-14 px-8 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
                >
                  Try Free — No Card Required
                  <ArrowRight className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-sm text-slate-400">
                No credit card required · Setup in 60 seconds · Cancel anytime
              </p>
            </div>

            {/* Right: Widget showcase */}
            <HeroWidgetShowcase />
          </div>
        </div>
      </section>

      {/* ============ PROBLEM CARDS ============ */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
            Sound familiar?
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                quote: '"We have 200 five-star reviews"',
                desc: "...and a landing page that says \"Trusted by 500+ companies.\" Your best social proof is invisible.",
                emoji: "⭐",
              },
              {
                quote: '"Can you make a testimonial section?"',
                desc: "Dev says: \"Add it to the backlog.\" It's been there since Q2.",
                emoji: "🗓️",
              },
              {
                quote: '"I\'ll just screenshot the review"',
                desc: "Crop it. Paste it. Realize it looks terrible. Google the same thing you Googled last time.",
                emoji: "📸",
              },
            ].map((card) => (
              <div
                key={card.quote}
                className="card-hover rounded-xl bg-white border border-slate-200 p-7 space-y-4"
              >
                <span className="text-[28px]">{card.emoji}</span>
                <p className="text-[15px] font-semibold text-slate-900 leading-snug">
                  {card.quote}
                </p>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-snow py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-14">
            <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">
              60 seconds. Three steps. Done.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Paste",
                desc: "Drop any review URL — G2, Capterra, Google, Trustpilot. Or paste the text directly.",
                icon: Link2,
              },
              {
                step: "02",
                title: "AI extracts the hook",
                desc: "Our AI reads the full review and pulls the one sentence that makes people buy. Not the whole paragraph. The money line.",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "Embed",
                desc: "Copy one line of code. Paste it anywhere. Animated carousel, live on your site.",
                icon: Code2,
              },
            ].map((s) => (
              <div
                key={s.step}
                className="card-hover rounded-xl bg-white border border-slate-200 p-7 space-y-4 text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/10 mx-auto">
                  <s.icon
                    className="w-6 h-6 text-emerald-dark"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald tabular-nums uppercase tracking-wider">
                    Step {s.step}
                  </span>
                  <h3 className="text-[16px] font-semibold text-slate-900">
                    {s.title}
                  </h3>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="text-center mt-12">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-12 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Try It Free — No Developer Needed
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ STATS / PROOF ============ */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-white tracking-tight text-center mb-14">
            The numbers.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                stat: "3x",
                label: "more attention",
                desc: "Animated widgets vs. static text blocks. Motion commands attention.",
              },
              {
                stat: "60s",
                label: "setup time",
                desc: "From raw review to live widget on your site. We timed it.",
              },
              {
                stat: "0",
                label: "developers needed",
                desc: "One line of embed code. Works everywhere. No Jira tickets required.",
              },
            ].map((s) => (
              <div key={s.label} className="space-y-2">
                <p className="text-[48px] font-bold text-emerald tabular-nums">
                  {s.stat}
                </p>
                <p className="text-[15px] font-semibold text-white uppercase tracking-wider">
                  {s.label}
                </p>
                <p className="text-[13px] text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BEFORE / AFTER ============ */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-4">
            See the difference.
          </h2>
          <p className="text-[17px] text-slate-500 text-center mb-12 max-w-lg mx-auto">
            Same review. Completely different impact.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Before */}
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 space-y-5">
              <span className="inline-block text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-200/60 px-3 py-1 rounded-full">
                Before
              </span>
              <div className="rounded-lg bg-white border border-slate-200 p-5 space-y-3 opacity-60">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  &ldquo;ProofPost has been amazing for our team. The setup was
                  quick, the support is great, and the results speak for
                  themselves. We saw a real difference in how visitors engage
                  with our testimonials compared to the static screenshots we
                  used before. Highly recommended for any SaaS company looking
                  to improve their social proof...&rdquo;
                </p>
                <p className="text-[12px] text-slate-400">— Sarah K., Head of Marketing</p>
              </div>
              <p className="text-[13px] text-slate-400 text-center italic">
                300 words. Nobody reads this.
              </p>
            </div>

            {/* After */}
            <div className="rounded-xl border-2 border-emerald/40 bg-emerald/5 p-8 space-y-5">
              <span className="inline-block text-[11px] font-bold text-emerald uppercase tracking-wider bg-emerald/10 px-3 py-1 rounded-full">
                After — with ProofPost
              </span>
              <div className="rounded-lg bg-white border border-emerald/30 p-5 space-y-3 shadow-sm">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="text-[16px] font-semibold text-slate-900 leading-snug">
                  &ldquo;We saw a real difference in how visitors engage with
                  our testimonials.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-dark" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-slate-900">Sarah K.</p>
                    <p className="text-[11px] text-slate-400">Head of Marketing</p>
                  </div>
                </div>
              </div>
              <p className="text-[13px] text-emerald-dark text-center font-medium">
                AI extracted the money line. Animated. Done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OBJECTION HANDLING ============ */}
      <section className="bg-snow py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-8">
            Quick answers.
          </h2>
          <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden bg-white">
            {[
              {
                q: "Is it hard to set up?",
                a: "One line of code. If you can paste into your website builder, you can use ProofPost. Works with Webflow, WordPress, Shopify, Framer, React, and anything that takes HTML.",
              },
              {
                q: "What if I don't have reviews on G2?",
                a: "Paste from Google, Capterra, Trustpilot — or type the review text directly. Any review works.",
              },
              {
                q: "Why not just screenshot my reviews?",
                a: "You can. But screenshots don't animate, don't auto-rotate, and look like you spent 30 seconds on them. Because you did.",
              },
              {
                q: "What does it cost?",
                a: "$19/mo for unlimited widgets. That's less than one hour of a designer's time.",
              },
            ].map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors list-none">
                  <span className="text-[14px] font-semibold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <span className="text-slate-300 group-open:rotate-45 transition-transform text-lg flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-4 -mt-1 text-[13px] text-slate-500 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <PricingSection />

      {/* ============ FINAL CTA ============ */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[36px] font-bold text-white tracking-tight">
            Your best customers already wrote your best copy.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Stop letting it sit on G2. Your prospects are on your pricing page
            right now, looking for a reason to trust you. We make that reason
            impossible to miss.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Paste Your First Review — It&apos;s Free
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <p className="text-[13px] text-slate-500">
              No credit card. 60-second setup.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
                <Star className="w-3 h-3 text-white" aria-hidden="true" />
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
