import Link from "next/link";
import { HeroWidgetShowcase } from "./hero-widget-showcase";
import { LandingMarquee } from "./landing-marquee";
import { HeroUrlInput } from "./hero-url-input";
import { ImpactCalculator } from "./impact-calculator";
import { StickyMobileCTA } from "./sticky-mobile-cta";
import { PricingSection } from "./pricing-section";
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
                No Reviews on Your Site? You're{" "}
                <span className="text-emerald hand-underline">
                  Losing Money.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-md leading-relaxed">
                ProofPost turns customer feedback into high-converting social
                proof for your website in seconds.
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
                  Try Free. No Card Required.
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-sm text-slate-300">
                Loved by early adopters
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
          The manual process is broken.
        </h2>
        <div className="text-[17px] text-slate-500 leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p>
            Here is what actually happens when a customer says something nice
            about your product. You read it. You smile. You drop it in Slack.
            Everyone reacts with the fire emoji. And then... nothing.
          </p>
          <p>
            You have hundreds of reviews on Google, G2, and LinkedIn — stuck as
            screenshots in your Downloads folder. Asking customers to write new
            ones? You send one email, get three replies, and give up.
          </p>
          <p>
            And even when you do manually format a testimonial, nobody reads a
            300-word paragraph on a landing page. Your hard-won social proof
            is invisible.
          </p>
          <p className="text-slate-700 font-medium">
            But here&apos;s the thing — your visitors won&apos;t read a wall of text.
            They will stop scrolling for something that moves.
          </p>
        </div>
      </section>

      {/* ============ BRIDGE: WHY ANIMATION WINS ============ */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-white tracking-tight text-center mb-14">
            Why animated carousels beat static text grids.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { stat: "3x", label: "more attention", desc: "Animated widgets command 3x more eye-tracking time than static text blocks." },
              { stat: "60s", label: "setup time", desc: "From raw review to live widget on your site. We timed it." },
              { stat: "0", label: "developers needed", desc: "One line of embed code. Works everywhere. No Jira tickets required." },
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
            Creating these used to require a designer. Now it takes 3 clicks.
          </p>
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">
            How it works.
          </h2>
          <p className="text-[17px] text-slate-500 max-w-xl mx-auto">
            AI reads your reviews and finds the one sentence that actually
            sells. Then wraps it in a premium widget. 60 seconds, start to
            finish.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Add your reviews",
              desc: "Upload a screenshot, paste text, drop a link — or send a collection form to your customers. We pull in every review automatically.",
              icon: "📋",
            },
            {
              step: "02",
              title: "AI finds the hook",
              desc: "Our AI reads each review and extracts the one sentence that converts. Three hook variants for A/B testing.",
              icon: "✨",
            },
            {
              step: "03",
              title: "Customize & embed",
              desc: "Style your widget with our visual builder. Pick a preset or match your brand. One line of code — live on your site.",
              icon: "🎨",
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
            Built for teams that live on trust.
          </h2>
          <p className="text-[17px] text-slate-500 text-center mb-14 max-w-lg mx-auto">
            Whether you sell software, courses, services, or products — your reviews deserve better than a static text block.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Rocket,
                title: "SaaS Founders",
                desc: "Turn G2 and Capterra reviews into conversion widgets on your pricing page.",
              },
              {
                icon: GraduationCap,
                title: "Course Creators",
                desc: "Let student testimonials sell your next cohort. Animated proof beats screenshots.",
              },
              {
                icon: Briefcase,
                title: "Agencies",
                desc: "Impress clients with polished, branded proof that matches their site perfectly.",
              },
              {
                icon: ShoppingCart,
                title: "E-Commerce",
                desc: "Product reviews that actually get read. Animated carousels next to your Add to Cart.",
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
          We did not build a bloated platform. We built exactly what a growth
          marketer needs to get the job done fast.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Pillar 1: AI-Powered Curation */}
          <div className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <Zap className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900">AI-Powered Curation</h3>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Our AI reads every review and extracts the one sentence that converts. Three hook variants for A/B testing.
              Upload screenshots from Google, G2, LinkedIn, or WhatsApp — AI extracts everything automatically.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["AI Hook Extraction", "Screenshot Import", "3 Hook Variants"].map(t => (
                <span key={t} className="text-[11px] font-medium text-emerald bg-emerald/5 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Pillar 2: Beautiful, Branded Widgets */}
          <div className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <Paintbrush className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900">Beautiful, Branded Widgets</h3>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Animated carousels that break banner blindness. Visual editor with presets — change colors, fonts, shadows.
              Auto-detects dark/light mode. Widgets look like you built them in-house.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Kinetic Carousels", "Widget Builder", "Brand Kit Sync", "Dark/Light Mode"].map(t => (
                <span key={t} className="text-[11px] font-medium text-emerald bg-emerald/5 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Pillar 3: Fully Automated Pipeline */}
          <div className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <RefreshCw className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900">Fully Automated Pipeline</h3>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Send a branded collection form to your customers. They submit reviews, AI extracts the hook,
              and your widget updates automatically. Wall of Love page included. Zero manual work.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Collection Forms", "Auto-Widget Pipeline", "Wall of Love", "Auto-Approve"].map(t => (
                <span key={t} className="text-[11px] font-medium text-emerald bg-emerald/5 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>

          {/* Pillar 4: Measure & Optimize */}
          <div className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <BarChart3 className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[17px] font-semibold text-slate-900">Measure &amp; Optimize</h3>
            </div>
            <p className="text-[14px] text-slate-500 leading-relaxed">
              Track impressions and see which testimonials convert the most. A/B test hook variants.
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
          How we compare.
        </h2>
        <p className="text-[15px] text-slate-400 text-center mb-12">
          We don&apos;t just display reviews. We find the sentence that converts.
        </p>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-4 bg-slate-50 px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Feature</span>
            <span className="text-center">ProofPost</span>
            <span className="text-center">Other Tools</span>
            <span className="text-center">DIY</span>
          </div>
          {[
            { feature: "AI Hook Extraction", pp: true, others: false, diy: false },
            { feature: "Animated Carousels", pp: true, others: false, diy: false },
            { feature: "Screenshot Import", pp: true, others: false, diy: false },
            { feature: "Visual Widget Builder", pp: true, others: "Basic", diy: false },
            { feature: "Auto-Widget Pipeline", pp: true, others: false, diy: false },
            { feature: "Collection Forms", pp: true, others: "Some", diy: false },
            { feature: "Wall of Love", pp: true, others: "Some", diy: false },
            { feature: "One-Line Embed", pp: true, others: true, diy: false },
            { feature: "Brand Kit Auto-Sync", pp: true, others: "Partial", diy: false },
            { feature: "SEO Rich Snippets", pp: true, others: "Some", diy: false },
            { feature: "Price", pp: "$19/mo", others: "$21-50/mo", diy: "Free + hours" },
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
            { q: "Will this slow down my website?", a: "No. Scripts load async, under 12kb. Zero impact on Core Web Vitals." },
            { q: "What if the AI extracts the wrong quote?", a: "You keep the original. Edit the hook with one click. You control what gets published." },
            { q: "How is this different from other testimonial tools?", a: "They show static text grids. We use AI to find the converting sentence and animate it. Plus collection forms, Wall of Love, SEO snippets — at a lower price." },
            { q: "Can I import reviews from a screenshot?", a: "Yes. Upload a screenshot from Google Reviews, G2, LinkedIn, Trustpilot, WhatsApp, or email. Our AI extracts every review — names, ratings, and text — in seconds." },
            { q: "Can my customers submit reviews directly?", a: "Yes. Create a collection form, share the link. Reviews can auto-approve and flow straight to your widget — or you approve manually. AI generates the carousel automatically." },
            { q: "I only have 3 reviews. Is that enough?", a: "Products with 5 reviews are 270% more likely to sell. You don't need hundreds. You need to maximize what you have." },
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
            Start Pro today. If you cannot paste your reviews, let the AI
            extract the hooks, and embed a live carousel on your site in under
            60 seconds, email us and we refund you instantly. No questions. You
            keep whatever leads you generated.
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
            Your reviews are waiting.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Your prospects are on your pricing page right now, looking for
            a reason to trust you. Your customers already wrote that reason.
            We just make it impossible to miss.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Embed your first widget — free
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
                AI-powered testimonial widgets that actually convert. Turn reviews into revenue.
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
