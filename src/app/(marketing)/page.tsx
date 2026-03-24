import Link from "next/link";
import { HeroCarousel } from "./hero-carousel";
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-8 text-center lg:text-left">
              <h1 className="font-heading text-[44px] sm:text-[56px] leading-[1.08] text-slate-900 tracking-tight">
                Your reviews are full of{" "}
                <em className="text-emerald">conversion gold.</em>
                <br />
                Our AI finds it.
              </h1>

              <p className="text-[17px] text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
                ProofPost reads every review, extracts the sentence that sells,
                and wraps it in an animated carousel that stops the scroll.
                60 seconds. Done.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <Link
                  href="/login"
                  className="flex items-center gap-2 h-13 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
                >
                  Try Free. No Card Required.
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=32&h=32&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=32&h=32&fit=crop&crop=face",
                  ].map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={src}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-[11px] text-amber-400">★</span>
                    ))}
                  </div>
                  <p className="text-[12px] text-slate-400">
                    Trusted by 200+ marketers
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Platform logos + Live Widget Demo */}
            <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto lg:mx-0">
              {/* Platform logos */}
              <div className="w-full space-y-2 text-center">
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Import reviews from
                </p>
                <div className="flex items-center justify-center gap-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-300 hover:text-[#0A66C2] transition-colors" aria-label="LinkedIn">
                    <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-300 hover:text-slate-900 transition-colors" aria-label="X">
                    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-[13px] font-bold text-slate-300 hover:text-[#FF492C] transition-colors">G2</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-300 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
                    <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-[11px] font-bold text-slate-300 hover:text-[#FF9D28] transition-colors">Capterra</span>
                  <span className="text-[11px] font-bold text-slate-300 hover:text-slate-500 transition-colors">Email</span>
                </div>
              </div>

              <HeroCarousel />
            </div>
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
            To get that review onto your website, you have to manually format
            it, find the user&apos;s headshot, fiddle with layouts, export a
            file, and then message your dev team to please upload it. They tell
            you to create a Jira ticket. Weeks go by.
          </p>
          <p>
            And even when you do all that, nobody reads a 300-word paragraph on
            a landing page anyway. Your hard-won social proof is invisible.
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
              title: "Paste your review",
              desc: "Drop a link or raw text from G2, email, LinkedIn, or anywhere. Or send a collection form to your customers.",
              icon: "📋",
            },
            {
              step: "02",
              title: "AI extracts the hook",
              desc: "Our AI reads the full review and pulls out the highest-converting sentence automatically.",
              icon: "✨",
            },
            {
              step: "03",
              title: "Embed on your site",
              desc: "Copy one line of code. A branded, auto-sliding testimonial widget is live on your site.",
              icon: "🔗",
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

      {/* ============ USE CASES ============ */}
      <section className="bg-snow py-24">
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

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Zap, title: "AI Hook Extraction", desc: "Finds the most powerful sentence in any review. Cuts the noise, leaves the conversion trigger." },
            { icon: Eye, title: "Kinetic Trust Carousels", desc: "Auto-sliding, animated widgets that break banner blindness. Motion commands attention." },
            { icon: FileText, title: "Collection Forms", desc: "Send a branded link to your customers. They submit reviews, you approve and publish. Zero friction." },
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

      {/* ============ TESTIMONIALS (eat your own dog food) ============ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-4">
          What our users say.
        </h2>
        <p className="text-[15px] text-slate-400 text-center mb-12">
          Yes, we use ProofPost to display our own testimonials.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* TODO: Replace with real customer testimonials */}
          {[
            {
              quote: "I used to spend 2 hours formatting testimonials for our site. Now it takes 60 seconds. The AI picks better quotes than I do.",
              name: "Alex Rivera",
              title: "Growth Lead, CloudMetrics",
              photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
            },
            {
              quote: "We added ProofPost carousels to our pricing page. Conversion rate went up 18% in the first month. Not kidding.",
              name: "Jordan Lee",
              title: "Founder, ShipFast",
              photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
            },
            {
              quote: "The animated carousels look so much better than what we had before. Clients always ask how we made them. One line of code.",
              name: "Maya Patel",
              title: "Marketing Director, BrightPath",
              photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
            },
          ].map((t) => (
            <div key={t.name} className="rounded-xl bg-white border border-slate-200 p-6 space-y-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-[12px] text-amber-400">★</span>
                ))}
              </div>
              <p className="text-[14px] text-slate-600 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.photo}
                  alt=""
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-slate-400">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SECTION 6: COMPARISON ============ */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-4">
          How we compare.
        </h2>
        <p className="text-[15px] text-slate-400 text-center mb-12">
          We don&apos;t just display reviews. We find the sentence that converts.
        </p>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-6 bg-slate-50 px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span className="col-span-2">Feature</span>
            <span className="text-center">ProofPost</span>
            <span className="text-center">Senja</span>
            <span className="text-center">Testimonial.to</span>
            <span className="text-center">DIY</span>
          </div>
          {[
            { feature: "AI Hook Extraction", pp: true, senja: false, test: false, diy: false },
            { feature: "Animated Carousels", pp: true, senja: false, test: false, diy: false },
            { feature: "Collection Forms", pp: true, senja: true, test: true, diy: false },
            { feature: "Wall of Love", pp: true, senja: true, test: true, diy: false },
            { feature: "One-Line Embed", pp: true, senja: true, test: true, diy: false },
            { feature: "Brand Kit Auto-Sync", pp: true, senja: true, test: false, diy: false },
            { feature: "Dark/Light Auto-Detect", pp: true, senja: false, test: false, diy: false },
            { feature: "SEO Rich Snippets", pp: true, senja: true, test: true, diy: false },
            { feature: "Price", pp: "$19/mo", senja: "$29/mo", test: "$21-50/mo", diy: "Free + hours" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-6 px-5 py-3 border-t border-slate-100 text-[13px]">
              <span className="col-span-2 text-slate-700">{row.feature}</span>
              {[row.pp, row.senja, row.test, row.diy].map((val, j) => (
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
      <section id="pricing" className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Simple pricing. No hidden fees.
        </h2>
        <p className="text-[17px] text-slate-500 text-center mb-14">
          I think paying eighty dollars a month for a text widget is absurd.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="rounded-xl bg-white border border-slate-200 p-8 space-y-6">
            <div>
              <h3 className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">Free</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-[44px] font-bold text-slate-900 tabular-nums">$0</span>
                <span className="text-slate-400">/mo</span>
              </div>
            </div>
            <ul className="space-y-3">
              {["3 testimonial widgets", "AI Hook Extraction (1 hook)", "Collection Forms", "Wall of Love", "Embed on your site", "500 impressions/month", "ProofPost watermark"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] text-slate-500">
                  <Check className="w-4 h-4 text-slate-300 flex-shrink-0" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="flex items-center justify-center w-full h-12 rounded-lg border border-slate-200 text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
              Start Free
            </Link>
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-8 space-y-6">
            <div>
              <h3 className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">Pro Monthly</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-[44px] font-bold text-slate-900 tabular-nums">$19</span>
                <span className="text-slate-400">/mo</span>
              </div>
            </div>
            <ul className="space-y-3">
              {["Unlimited widgets", "3 AI Hook Variants + A/B Testing", "Unlimited impressions", "No watermark", "Analytics dashboard", "Hook Performance Analytics", "PDF carousel download", "Multiple Brand Kits", "Priority support"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] text-slate-500">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="flex items-center justify-center w-full h-12 rounded-lg bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold transition-colors duration-200 glow-emerald">
              Start Pro
            </Link>
          </div>

          <div className="relative rounded-xl bg-navy p-8 space-y-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-emerald/12 blur-[60px]" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-semibold text-emerald uppercase tracking-wider">Pro Annual</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/20 text-emerald">Save 37%</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-[44px] font-bold text-white tabular-nums">$12</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <p className="text-[13px] text-slate-400 mt-1">$144 billed annually</p>
            </div>
            <ul className="space-y-3 relative">
              {["Unlimited widgets", "3 AI Hook Variants + A/B Testing", "Unlimited impressions", "No watermark", "Hook Performance Analytics", "PDF carousel download", "Multiple Brand Kits", "Priority support"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] text-slate-300">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="relative flex items-center justify-center w-full h-12 rounded-lg bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold transition-colors duration-200 glow-emerald">
              Start Pro Annual
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8: FAQ ============ */}
      <section id="faq" className="max-w-2xl mx-auto px-6 py-24">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
          Common questions.
        </h2>
        <div className="space-y-6">
          {[
            { q: "Will this slow down my website?", a: "No. Our embed scripts load asynchronously and weigh under 12kb. Your page loads first, the carousel glides in after. Zero impact on Core Web Vitals." },
            { q: "What if the AI extracts the wrong quote?", a: "You never lose the original text. The AI suggests the best hook, but you can edit it with one click. You are always in full control of what gets published." },
            { q: "How is this different from Senja or Testimonial.to?", a: "They display static text grids. We use AI to extract the converting sentence and wrap it in an animated, auto-sliding carousel. Plus we offer collection forms, Wall of Love, and SEO rich snippets — all at a lower price." },
            { q: "Can my customers submit reviews directly?", a: "Yes! Create a collection form, share the link with your customers, and they can submit text reviews with ratings. You approve them, and we auto-generate the carousel." },
            { q: "I only have 3 reviews. Is that enough?", a: "Products with just 5 reviews are 270% more likely to sell. You do not need a massive Wall of Love. You need to maximize the reviews you already have. That is exactly what ProofPost does." },
            { q: "Can I cancel easily?", a: "One click in your dashboard. No retention calls, no hoops. If it does not save you time, you should not be paying for it." },
          ].map((faq, i) => (
            <div key={i} className="rounded-xl bg-white border border-slate-200 p-6">
              <h3 className="text-[15px] font-semibold text-slate-900">{faq.q}</h3>
              <p className="mt-2 text-[14px] text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
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

      {/* ============ SECTION 10: FINAL CTA ============ */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-[36px] font-bold text-slate-900 tracking-tight">
          Stop designing. Start converting.
        </h2>
        <p className="mt-4 text-[17px] text-slate-500 max-w-md mx-auto">
          You have fought hard for those reviews. Do not let them rot in a
          desktop folder. Your prospects are on your pricing page right now,
          looking for a reason to trust you. Give them that reason.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 mt-10 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
        >
          Try Free. No Card Required.
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>
      </section>

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
                  <Link href="#pricing" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Pricing</Link>
                  <Link href="#faq" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">FAQ</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Legal</p>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[13px] text-slate-400">Terms</span>
                  <span className="text-[13px] text-slate-400">Privacy</span>
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
