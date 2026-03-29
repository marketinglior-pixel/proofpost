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
                Your reviews are making G2 rich.{" "}
                <span className="text-emerald hand-underline">
                  Not you.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-md leading-relaxed">
                AI pulls the best line from any review and turns it into an
                animated widget on your site. 60 seconds. No developer.
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

      {/* ============ WORKS WITH ============ */}
      <section className="bg-white py-6">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] font-medium text-slate-300 uppercase tracking-wider text-center mb-5">
            One line of code. Works everywhere.
          </p>
          <div className="flex items-center justify-center gap-10 sm:gap-14 flex-wrap opacity-40 hover:opacity-60 transition-opacity">
            {/* Webflow */}
            <svg width="90" height="20" viewBox="0 0 200 40" aria-label="Webflow">
              <text x="0" y="30" fill="#4353FF" fontFamily="system-ui" fontWeight="700" fontSize="28">Webflow</text>
            </svg>
            {/* Framer */}
            <svg width="75" height="20" viewBox="0 0 160 40" aria-label="Framer">
              <text x="0" y="30" fill="#0055FF" fontFamily="system-ui" fontWeight="700" fontSize="28">Framer</text>
            </svg>
            {/* WordPress */}
            <div className="flex items-center gap-1.5">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-label="WordPress">
                <path fill="#21759B" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.007 17.667L7.168 8.29c.573-.03 1.088-.065 1.088-.065.512-.06.452-.812-.06-.783 0 0-1.54.121-2.535.121-.179 0-.39-.005-.61-.014C6.81 4.86 9.24 3.2 12 3.2c2.054 0 3.926.784 5.33 2.068-.034-.002-.066-.008-.1-.008-1.001 0-1.712.872-1.712 1.808 0 .84.484 1.55.998 2.39.39.675.838 1.54.838 2.79 0 .867-.334 1.872-.778 3.273l-1.02 3.408-3.563-10.63zm8.203-5.458c0 1.253-.047 2.15-.263 3.1l-2.67 7.712c2.633-1.533 4.408-4.385 4.408-7.67 0-1.53-.388-2.97-1.07-4.227.04.423.06.856.06 1.085zm-7.63 1.66l2.98 8.15c.02.044.043.085.068.123-1.098.383-2.27.59-3.495.59-.914 0-1.796-.119-2.637-.34l2.8-8.13.284-.393zm-8.6-4.636A8.751 8.751 0 0 0 3.2 12c0 3.2 1.722 5.997 4.293 7.52L3.966 9.233z"/>
              </svg>
              <span className="text-[14px] font-bold text-[#21759B]">WordPress</span>
            </div>
            {/* Shopify */}
            <svg width="75" height="22" viewBox="0 0 160 44" aria-label="Shopify">
              <text x="0" y="32" fill="#96BF48" fontFamily="system-ui" fontWeight="700" fontSize="28">Shopify</text>
            </svg>
            {/* React */}
            <div className="flex items-center gap-1.5">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-label="React">
                <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
                <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1"/>
                <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)"/>
                <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)"/>
              </svg>
              <span className="text-[14px] font-bold text-[#61DAFB]">React</span>
            </div>
            {/* Next.js */}
            <div className="flex items-center gap-1.5">
              <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Next.js">
                <circle cx="12" cy="12" r="12" fill="#000"/>
                <path d="M9.5 8v8l6.5-4z" fill="#fff"/>
              </svg>
              <span className="text-[14px] font-bold text-slate-900">Next.js</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 2: PROBLEM AGITATION ============ */}
      <section className="max-w-3xl mx-auto px-6 py-24">
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
        </div>
      </section>

      {/* ============ SECTION 3: HOW IT WORKS ============ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-14">
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
        <LandingMarquee />
      </section>

      {/* ============ EASY TO EMBED ============ */}
      <section className="bg-snow py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
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

      {/* ============ SECTION 5: FEATURES ============ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Everything you need. Nothing you don&apos;t.
        </h2>
        <p className="text-[17px] text-slate-500 text-center mb-14 max-w-lg mx-auto">
          We did not build a bloated platform. We built exactly what a growth
          marketer needs to get the job done fast.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Zap, title: "AI Hook Extraction", desc: "Finds the most powerful sentence in any review. Cuts the noise, leaves the conversion trigger." },
            { icon: Eye, title: "Kinetic Trust Carousels", desc: "Auto-sliding, animated widgets that break banner blindness. Motion commands attention." },
            { icon: Camera, title: "Screenshot Import", desc: "Upload a screenshot from Google, G2, LinkedIn, or WhatsApp. AI extracts all reviews automatically." },
            { icon: Paintbrush, title: "Widget Style Builder", desc: "Visual editor with presets. Change colors, fonts, borders, and shadows. Live preview as you design." },
            { icon: FileText, title: "Collection Forms", desc: "Send a branded link to your customers. They submit reviews, you approve and publish. Zero friction." },
            { icon: RefreshCw, title: "Auto-Widget Pipeline", desc: "Collection form → auto-approve → AI hook extraction → widget updated. Fully automated review pipeline." },
            { icon: Heart, title: "Wall of Love", desc: "A beautiful, public page showcasing all your best reviews. Share it or embed it anywhere." },
            { icon: Code2, title: "One-Click Embed", desc: "Works on Webflow, Framer, WordPress, React. One line of code. No dev team needed." },
            { icon: Palette, title: "Brand Kit Auto-Sync", desc: "Your logo, your colors, automatically applied. Widgets look like you built them in-house." },
            { icon: Clock, title: "Dark/Light Mode", desc: "Auto-detects your site theme. No custom CSS. Looks native everywhere." },
            { icon: Shield, title: "Analytics Dashboard", desc: "Track impressions, see which testimonials convert the most. Data-driven social proof." },
            { icon: BarChart3, title: "SEO Rich Snippets", desc: "Automatic Schema.org markup. Get star ratings showing in Google search results." },
          ].map((feat) => (
            <div key={feat.title} className="card-hover rounded-xl bg-white border border-slate-200 p-7 space-y-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <feat.icon className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900">{feat.title}</h3>
              <p className="text-[14px] text-slate-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ RESULTS / STATS ============ */}
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

      {/* ============ IMPACT CALCULATOR ============ */}
      <section className="bg-snow py-24">
        <div className="max-w-5xl mx-auto px-6">
          <ImpactCalculator />
        </div>
      </section>

      {/* ============ SECTION 6: COMPARISON ============ */}
      <section id="comparison" className="max-w-4xl mx-auto px-6 py-24">
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
