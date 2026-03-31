import Link from "next/link";
import { HeroWidgetShowcase } from "./hero-widget-showcase";
import { LandingMarquee } from "./landing-marquee";
import { HeroUrlInput } from "./hero-url-input";
import { ImpactCalculator } from "./impact-calculator";
import { StickyMobileCTA } from "./sticky-mobile-cta";
import { PricingSection } from "./pricing-section";
import { FloatingTestimonial } from "@/components/floating-testimonial";
import {
  ArrowRight,
  Zap,
  Quote,
  Check,
  Code2,
  Star,
  Clock,
  Eye,
  Palette,
  Shield,
  X,
  Users,
  Rocket,
  Briefcase,
  ShoppingCart,
  GraduationCap,
  TrendingUp,
  BarChart3,
  FileText,
  Heart,
  Camera,
  Paintbrush,
  RefreshCw,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
              <Star className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-[15px] font-semibold text-slate-900">
              ProofPost
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Blog
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              FAQ
            </Link>
            <Link
              href="/login"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-white bg-emerald hover:bg-emerald-dark px-5 py-2.5 rounded-lg transition-colors duration-200 glow-emerald"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ============ SECTION 1: HERO ============ */}
      <section className="relative overflow-hidden bg-snow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.06)_0%,_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-[1fr_minmax(0,480px)] gap-12 lg:gap-20 items-center">
            {/* Left: Headline */}
            <div className="space-y-8 min-w-0">
              <h1 className="font-bold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.2] text-slate-900 tracking-tight">
                AI Finds the One Sentence That{" "}
                <span className="text-emerald hand-underline">
                  Sells for You.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-md leading-relaxed">
                Other tools show your full reviews. Nobody reads those.
                ProofPost pulls the one line that sells and turns it into
                a live widget. 60 seconds. Video or text.
              </p>

              {/* Hero URL Input — zero-friction onboarding (desktop only) */}
              <div className="hidden sm:block">
                <HeroUrlInput />
              </div>

              {/* Mobile CTA */}
              <div className="sm:hidden">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
                >
                  Build Your First Widget Free
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-sm text-slate-300">
                Free tier. No credit card. 3 carousels/month included.
              </p>
            </div>

            {/* Right: Widget showcase */}
            <HeroWidgetShowcase />
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: PROBLEM AGITATION ============ */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-[13px] font-medium text-emerald uppercase tracking-wider text-center mb-6">
          Sound familiar?
        </p>
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-6">
          Static testimonials are dead weight.
        </h2>
        <div className="text-[17px] text-slate-500 leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p>
            You have 200 five-star reviews across Google, G2, and LinkedIn.
            You paid real money to earn them. And right now they are sitting
            in screenshots, buried in a Slack thread, or pasted as a wall of
            text that nobody scrolls past.
          </p>
          <p>
            Maybe you tried a testimonial tool. You imported your reviews,
            picked a layout, and embedded a static grid. It looked fine. But
            visitors scroll right past it. Because a block of text on a landing
            page gets the same attention as the footer: almost none.
          </p>
          <p>
            Your reviews are fine. The problem is how they&apos;re displayed.
            Nobody reads a paragraph. But one sentence, animated, in the right
            place? That stops the scroll.
          </p>
          <p className="text-slate-700 font-medium">
            That&apos;s what ProofPost does. AI finds the money line.
            Animation makes it impossible to miss.
          </p>
        </div>
      </section>

      {/* ============ BRIDGE: WHY ANIMATION WINS ============ */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-white tracking-tight text-center mb-14">
            Why ProofPost converts more than static tools.
          </h2>
          <div className="grid sm:grid-cols-4 gap-8 text-center">
            {[
              { stat: "3x", label: "more attention", desc: "Animated widgets get 3x more eye-tracking time than static text grids." },
              { stat: "60s", label: "setup time", desc: "From raw review to live animated widget on your site. We timed it." },
              { stat: "5+", label: "import sources", desc: "Pull reviews from G2, Google, Capterra, Trustpilot, LinkedIn. Video or text." },
              { stat: "$19", label: "per month", desc: "Unlimited widgets. Senja charges $29. Testimonial.to charges $50. Both static." },
            ].map((s) => (
              <div key={s.label} className="space-y-2">
                <p className="text-[48px] font-bold text-emerald tabular-nums">{s.stat}</p>
                <p className="text-[15px] font-semibold text-white uppercase tracking-wider">{s.label}</p>
                <p className="text-[13px] text-slate-400 leading-relaxed max-w-[240px] mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: HOW IT WORKS ============ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-14">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider">
            Four steps. No designer. No developer.
          </p>
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">
            How it works.
          </h2>
          <p className="text-[17px] text-slate-500 max-w-xl mx-auto">
            Import reviews from any platform. AI finds the converting
            sentence. Customize your widget, embed it. Under a minute.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Import from anywhere",
              desc: "Connect G2, Google, Capterra, or Trustpilot. Paste text. Upload a screenshot. Record a video testimonial. Send a collection form. Every format works.",
              icon: "📥",
            },
            {
              step: "02",
              title: "AI extracts the hook",
              desc: "Our AI reads every review and pulls the one sentence that makes people buy. Three hook variants for A/B testing. Works on video too.",
              icon: "✨",
            },
            {
              step: "03",
              title: "Customize your widget",
              desc: "Pick a layout: carousel, grid, or Wall of Love. Match your brand colors. Toggle dark mode. Preview it live.",
              icon: "🎨",
            },
            {
              step: "04",
              title: "Embed in one line",
              desc: "Copy one line of code. Paste it into Webflow, WordPress, Shopify, Framer, React, or any HTML page. Live in seconds.",
              icon: "🚀",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="card-hover rounded-xl bg-white border border-slate-200 p-7 space-y-4 text-center"
            >
              <span className="text-[32px]">{s.icon}</span>
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
      </section>

      {/* ============ SOCIAL PROOF / TESTIMONIALS MARQUEE ============ */}
      <section className="bg-snow py-16 overflow-hidden">
        <p className="text-[13px] font-medium text-emerald uppercase tracking-wider text-center mb-8">
          Don&apos;t take our word for it
        </p>
        <LandingMarquee />
      </section>

      {/* ============ EASY TO EMBED ============ */}
      <section className="bg-snow py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <p className="text-[13px] font-medium text-emerald uppercase tracking-wider">
              No developer? No problem.
            </p>
            <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">
              Works on every platform.
              <br />
              <span className="text-emerald">Zero dev skills needed.</span>
            </h2>
            <p className="text-[17px] text-slate-500 max-w-xl mx-auto">
              Paste one line of code. Your testimonial widget is live.
              We wrote a quick guide for every platform.
            </p>
          </div>

          {/* Platform grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {[
              { name: "Webflow", id: "webflow", color: "#4353FF" },
              { name: "WordPress", id: "wordpress", color: "#21759B" },
              { name: "Shopify", id: "shopify", color: "#96BF48" },
              { name: "Framer", id: "framer", color: "#0055FF" },
              { name: "React", id: "react", color: "#61DAFB" },
              { name: "Any HTML", id: "html", color: "#374151" },
            ].map((p) => (
              <Link
                key={p.id}
                href={`/guide#${p.id}`}
                className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald/40 hover:shadow-sm transition-all duration-200"
              >
                <div
                  className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: p.color }}
                />
                <span className="text-[13px] font-medium text-slate-600 group-hover:text-slate-900">
                  {p.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Code preview */}
          <div className="rounded-xl bg-slate-900 px-6 py-4 flex items-center justify-between gap-4 overflow-x-auto">
            <code className="text-[13px] text-amber-300/80 font-mono whitespace-nowrap">
              {'<script src="proofpst.com/embed.js" data-proofpost-id="..."></script>'}
            </code>
            <span className="text-[11px] text-slate-500 whitespace-nowrap">
              That&apos;s it.
            </span>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-emerald hover:text-emerald-dark transition-colors"
            >
              See full install guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
            Built for teams that sell on trust.
          </h2>
          <p className="text-[17px] text-slate-500 text-center mb-14 max-w-lg mx-auto">
            Software, courses, services, e-commerce. If your buyers read reviews before purchasing, ProofPost pays for itself on day one.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Rocket,
                title: "SaaS Founders",
                desc: "Import G2 and Google reviews. AI pulls the hook. Live widget on your pricing page in 60 seconds.",
              },
              {
                icon: GraduationCap,
                title: "Course Creators",
                desc: "Video testimonials from students. Auto-extracted highlights. Wall of Love that sells your next cohort.",
              },
              {
                icon: Briefcase,
                title: "Agencies",
                desc: "Branded widgets for every client. Collection forms that gather new reviews on autopilot. White-label ready.",
              },
              {
                icon: ShoppingCart,
                title: "E-Commerce",
                desc: "Product reviews next to your Add to Cart button. Animated carousels that stop the scroll. SEO rich snippets included.",
              },
            ].map((uc) => (
              <div key={uc.title} className="card-hover rounded-xl bg-white border border-slate-200 p-6 space-y-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                  <uc.icon className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
                </div>
                <h3 className="text-[15px] font-semibold text-slate-900">{uc.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SECTION 5: FEATURES (Condensed into 4 pillars) ============ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-[13px] font-medium text-emerald uppercase tracking-wider text-center mb-4">
          One tool, not ten
        </p>
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Everything you need. Nothing you don&apos;t.
        </h2>
        <p className="text-[17px] text-slate-500 text-center mb-14 max-w-lg mx-auto">
          Import, collect, extract, animate, embed, measure. One tool
          instead of five.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Pillar 1: AI-Powered Curation */}
          <div className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <Zap className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900">AI Hook Extraction</h3>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Every review has one sentence that converts. Our AI finds it and gives you three hook variants to A/B test.
              Works on text and video. Import from G2, Google, Capterra, Trustpilot, or LinkedIn.
              Or just upload a screenshot, paste text, or drop a URL.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["AI Hook Extraction", "3 Hook Variants", "Platform Import", "Screenshot OCR", "Video Analysis"].map(t => (
                <span key={t} className="text-[11px] font-medium text-emerald bg-emerald/5 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Pillar 2: Video + Animated Widgets */}
          <div className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <Paintbrush className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900">Video + Animated Widgets</h3>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Kinetic carousels that break banner blindness. Video testimonials with AI-extracted highlights.
              Visual editor with presets. Auto-detects dark/light mode. Looks like you built it in-house.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Kinetic Carousels", "Video Testimonials", "Widget Builder", "Brand Kit Sync", "Dark/Light Mode"].map(t => (
                <span key={t} className="text-[11px] font-medium text-emerald bg-emerald/5 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Pillar 3: Collect + Automate */}
          <div className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <RefreshCw className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900">Collect + Automate</h3>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Send branded collection forms. AI asks follow-up questions that turn vague praise into specific,
              useful testimonials. Reviews auto-flow into your widget. Wall of Love page included. No manual work.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["AI Collection Forms", "Smart Follow-ups", "Auto-Widget Pipeline", "Wall of Love", "Video Collection"].map(t => (
                <span key={t} className="text-[11px] font-medium text-emerald bg-emerald/5 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Pillar 4: Measure & Rank */}
          <div className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <BarChart3 className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900">Measure &amp; Rank</h3>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Track impressions and clicks per testimonial. See which hooks convert the most. A/B test variants.
              Automatic Schema.org markup gets your star ratings showing in Google search results.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Analytics Dashboard", "A/B Testing", "SEO Rich Snippets", "Hook Performance"].map(t => (
                <span key={t} className="text-[11px] font-medium text-emerald bg-emerald/5 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ IMPACT CALCULATOR ============ */}
      <section className="bg-snow py-24">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider text-center mb-4">
            See the math
          </p>
          <ImpactCalculator />
        </div>
      </section>

      {/* ============ SECTION 6: COMPARISON ============ */}
      <section id="comparison" className="max-w-4xl mx-auto px-6 py-24">
        <p className="text-[13px] font-medium text-emerald uppercase tracking-wider text-center mb-4">
          Still comparing options?
        </p>
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-4">
          ProofPost vs. Senja vs. the rest.
        </h2>
        <p className="text-[15px] text-slate-400 text-center mb-12">
          We find the sentence that converts, animate it, and charge less than the tools that don&apos;t.
        </p>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-50 px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Feature</span>
            <span className="text-center">ProofPost</span>
            <span className="text-center">Senja</span>
            <span className="text-center">DIY</span>
          </div>
          {[
            { feature: "AI Hook Extraction", pp: true, others: false, diy: false },
            { feature: "Animated Carousels", pp: true, others: false, diy: false },
            { feature: "Video Testimonials", pp: true, others: false, diy: false },
            { feature: "Import from G2, Google", pp: true, others: "Partial", diy: false },
            { feature: "AI Collection Forms", pp: true, others: "Basic", diy: false },
            { feature: "Wall of Love", pp: true, others: true, diy: false },
            { feature: "Visual Widget Builder", pp: true, others: "Basic", diy: false },
            { feature: "One-Line Embed", pp: true, others: true, diy: false },
            { feature: "SEO Rich Snippets", pp: true, others: "Some", diy: false },
            { feature: "Brand Kit Auto-Sync", pp: true, others: false, diy: false },
            { feature: "Widget Load Speed", pp: "<12kb async", others: "Known slow", diy: "Varies" },
            { feature: "Setup Time", pp: "60 seconds", others: "Under 5 min", diy: "Hours" },
            { feature: "Price", pp: "$19/mo", others: "$29-59/mo", diy: "Free + hours" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-4 px-5 py-3 border-t border-slate-100 text-[13px]">
              <span className="text-slate-700">{row.feature}</span>
              {[row.pp, row.others, row.diy].map((val, j) => (
                <span key={j} className="text-center">
                  {typeof val === "boolean" ? (
                    val ? (
                      <Check className="w-4 h-4 text-emerald mx-auto" aria-hidden="true" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" aria-hidden="true" />
                    )
                  ) : (
                    <span className={j === 0 ? "font-semibold text-slate-900" : "text-slate-500"}>{val}</span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION 7: PRICING ============ */}
      <PricingSection />

      {/* ============ SECTION 8: FAQ ============ */}
      <section id="faq" className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-8">
          Common questions.
        </h2>
        <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {[
            { q: "How is this different from Senja or Testimonial.to?", a: "Senja and Testimonial.to show your full reviews in static grids. We take a different approach: AI pulls the one sentence that actually converts, we animate it, and the whole thing costs $19/mo. They charge $29 to $50 for static text. We also do video testimonials, G2/Google import, and AI collection forms." },
            { q: "Will this slow down my website?", a: "No. Scripts load async, under 12kb. Zero impact on Core Web Vitals." },
            { q: "Can I import reviews from G2, Google, or Capterra?", a: "Yes. Connect your G2 or Google profile and we pull reviews automatically. Or paste a link from Capterra, Trustpilot, or LinkedIn. Screenshot import works too." },
            { q: "Do you support video testimonials?", a: "Yes. Record through our collection form or upload existing clips. AI pulls the highlight reel and the best quote. You can embed video widgets alongside text carousels." },
            { q: "What if the AI extracts the wrong quote?", a: "You keep the original review. Edit the hook with one click. You control what gets published." },
            { q: "Can my customers submit reviews directly?", a: "Yes. Create a collection form, share the link. AI asks follow-up questions so you get specific proof instead of vague praise. Reviews can auto-flow into your widget or wait for your approval." },
            { q: "What's the free tier?", a: "3 carousels per month, no credit card. Includes AI hook extraction, animated widgets, and one-line embed. Upgrade to Pro ($19/mo) for unlimited widgets, video, analytics, and platform import." },
            { q: "I only have 3 reviews. Is that enough?", a: "Products with 5 reviews are 270% more likely to sell. You don't need hundreds. You need to get more out of what you have. That's exactly what our AI does." },
            { q: "Can I cancel easily?", a: "One click. No calls, no hoops." },
          ].map((faq, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors list-none">
                <span className="text-[14px] font-semibold text-slate-900 pr-4">{faq.q}</span>
                <span className="text-slate-300 group-open:rotate-45 transition-transform text-lg flex-shrink-0">+</span>
              </summary>
              <p className="px-5 pb-4 -mt-1 text-[13px] text-slate-500 leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ SECTION 9: GUARANTEE ============ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-emerald/5 border border-emerald/20 p-10 text-center space-y-4">
          <Shield className="w-10 h-10 text-emerald mx-auto" aria-hidden="true" />
          <h2 className="text-[22px] font-bold text-slate-900">
            The 60-Second Guarantee
          </h2>
          <p className="text-[15px] text-slate-500 max-w-lg mx-auto leading-relaxed">
            Start Pro today. If you can&apos;t import your reviews, let AI
            extract the hooks, and embed a live carousel on your site
            in under 60 seconds, email us. Full refund, no questions. You keep
            whatever leads you generated.
          </p>
        </div>
      </section>

      {/* ============ SECTION 10: FINAL CTA (Garbage Collector) ============ */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-4">
            Still scrolling?
          </p>
          <h2 className="text-[36px] font-bold text-white tracking-tight">
            Start free. No card. Upgrade when you&apos;re ready.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Your prospects are on your pricing page right now, looking for
            a reason to trust you. Your customers already wrote that reason.
            Let AI find the sentence that closes the deal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Build Your First Widget Free
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <p className="text-[13px] text-slate-500">
              3 carousels/month free. No credit card.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Floating Testimonial Card (bottom-left, like Senja) */}
      <FloatingTestimonial />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" aria-hidden="true" />
                </div>
                <span className="text-[13px] font-semibold text-slate-700">ProofPost</span>
              </div>
              <p className="text-[12px] text-slate-400 max-w-[240px]">
                Testimonial widgets that convert. Video + text. Animated. $19/mo.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Product</p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/demo" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Demo</Link>
                  <Link href="/guide" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Install Guide</Link>
                  <Link href="#pricing" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Pricing</Link>
                  <Link href="#faq" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">FAQ</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Legal</p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/terms" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
                  <Link href="/privacy" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-[12px] text-slate-400">&copy; 2026 ProofPost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
