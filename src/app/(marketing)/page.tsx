import Link from "next/link";
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 mb-8">
            <Zap className="w-3.5 h-3.5 text-emerald-dark" aria-hidden="true" />
            <span className="text-[13px] font-medium text-emerald-dark">
              From static archives to kinetic trust capital
            </span>
          </div>

          <h1 className="font-heading text-[48px] sm:text-[64px] leading-[1.08] text-slate-900 tracking-tight">
            Your best reviews are
            <br />
            <em className="text-emerald">collecting dust.</em>
          </h1>

          <p className="mt-8 text-[19px] text-slate-500 leading-relaxed max-w-2xl mx-auto">
            You probably have dozens of great customer reviews sitting in emails
            and G2. And they just... sit there. We turn them into auto-animated
            website widgets that actually convert visitors into buyers. Takes
            about 60 seconds.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
            >
              Try Free. No Card Required.
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-[13px] text-slate-400">
            Free plan available. Pro starts at $19/mo.
          </p>
        </div>
      </section>

      {/* ============ SECTION 2: PROBLEM AGITATION ============ */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-6">
          The &ldquo;Canva Tax&rdquo; is killing your productivity.
        </h2>
        <div className="text-[17px] text-slate-500 leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p>
            Here is what actually happens when a customer says something nice
            about your product. You read it. You smile. You drop it in Slack.
            Everyone reacts with the fire emoji. And then... nothing.
          </p>
          <p>
            To get that review onto your website, you have to open Canva, paste
            the text, find the user&apos;s headshot, fiddle with fonts and
            padding, export a PNG, and then message your dev team to please
            upload it. They tell you to create a Jira ticket. Weeks go by.
          </p>
          <p>
            And even when you do all that, nobody reads a 300-word paragraph on
            a landing page anyway. Your hard-won social proof is invisible.
          </p>
        </div>
      </section>

      {/* ============ SECTION 3: MECHANISM REVEAL ============ */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="rounded-2xl bg-navy p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald/8 blur-[120px]" />

          <div className="relative space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/15 border border-emerald/25">
              <Zap className="w-3 h-3 text-emerald" aria-hidden="true" />
              <span className="text-[12px] font-semibold text-emerald uppercase tracking-wider">
                The Golden Hook Engine
              </span>
            </div>

            <h2 className="text-[30px] font-bold text-white leading-tight">
              AI that reads your reviews and finds the one sentence that
              actually sells.
            </h2>

            <p className="text-[16px] text-slate-400 leading-relaxed">
              When a customer writes a long review, there is usually only one
              sentence that matters. The exact 12 words that prove ROI. Our AI
              finds that sentence, strips away the fluff, and wraps it in a
              premium, auto-sliding carousel. Your brand colors, your logo,
              zero code.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {[
                { step: "01", title: "Paste", desc: "Drop a link or raw text. G2, email, LinkedIn, anything." },
                { step: "02", title: "AI extracts", desc: "Golden Hook Engine finds the highest-converting sentence." },
                { step: "03", title: "Embed", desc: "Copy one line of code. Widget is live on your site." },
              ].map((s) => (
                <div key={s.step} className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-2">
                  <span className="text-[12px] font-bold text-emerald tabular-nums">{s.step}</span>
                  <h3 className="text-[15px] font-semibold text-white">{s.title}</h3>
                  <p className="text-[13px] text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SECTION 4: SOCIAL PROOF ============ */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
          Growth architects who stopped paying the Canva Tax.
        </h2>

        <div className="space-y-5">
          {[
            {
              quote: "I used to dread updating our customer love page. ProofPost entirely removed my developer from the equation. I updated our entire pricing page in ten minutes on a Tuesday morning.",
              name: "Sarah K.",
              title: "Growth Lead, Series A SaaS",
              photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
            },
            {
              quote: "The Canva fatigue was real. My team was spending hours every week designing little squares with quotes. The Kinetic Carousels look way more professional than our static images ever did.",
              name: "Mark R.",
              title: "Founder, Growth Agency",
              photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
            },
            {
              quote: "Since we added the scrolling carousel to our demo booking page, our conversion rate bumped up by about fourteen percent. For nineteen dollars a month, it is the most obvious software purchase I have made all year.",
              name: "Elena T.",
              title: "Marketing Director, B2B SaaS",
              photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
            },
          ].map((t, i) => (
            <div key={i} className="flex gap-5 p-6 rounded-xl bg-white border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.photo} alt="" width={48} height={48} className="rounded-full object-cover flex-shrink-0 mt-1" />
              <div>
                <p className="text-[15px] text-slate-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-3 text-[13px] font-medium text-slate-900">{t.name}</p>
                <p className="text-[12px] text-slate-400">{t.title}</p>
              </div>
            </div>
          ))}
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
            { icon: Code2, title: "One-Click Embed", desc: "Works on Webflow, Framer, WordPress, React. One line of code. No dev team needed." },
            { icon: Palette, title: "Brand Kit Auto-Sync", desc: "Your logo, your colors, automatically applied. Widgets look like you built them in-house." },
            { icon: Clock, title: "Dark/Light Mode", desc: "Auto-detects your site theme. No custom CSS. Looks native everywhere." },
            { icon: Shield, title: "Analytics Dashboard", desc: "Track impressions, see which testimonials convert the most. Data-driven social proof." },
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

      {/* ============ SECTION 6: COMPARISON ============ */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
          How we compare.
        </h2>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-5 bg-slate-50 px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span className="col-span-2">Feature</span>
            <span className="text-center">ProofPost</span>
            <span className="text-center">Senja</span>
            <span className="text-center">Canva</span>
          </div>
          {[
            { feature: "AI Hook Extraction", pp: true, senja: false, canva: false },
            { feature: "Auto-Animated Carousels", pp: true, senja: false, canva: false },
            { feature: "One-Line Embed Code", pp: true, senja: true, canva: false },
            { feature: "No Developer Needed", pp: true, senja: true, canva: false },
            { feature: "Mobile Responsive", pp: true, senja: true, canva: false },
            { feature: "Price", pp: "$19/mo", senja: "$19-39/mo", canva: "$13/mo + time" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-5 px-5 py-3 border-t border-slate-100 text-[13px]">
              <span className="col-span-2 text-slate-700">{row.feature}</span>
              {[row.pp, row.senja, row.canva].map((val, j) => (
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
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Simple pricing. No hidden fees.
        </h2>
        <p className="text-[17px] text-slate-500 text-center mb-14">
          I think paying eighty dollars a month for a text widget is absurd.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="rounded-xl bg-white border border-slate-200 p-8 space-y-6">
            <div>
              <h3 className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">Free</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-[44px] font-bold text-slate-900 tabular-nums">$0</span>
                <span className="text-slate-400">/mo</span>
              </div>
            </div>
            <ul className="space-y-3">
              {["3 testimonial widgets", "AI Hook Extraction", "Embed on your site", "500 impressions/month", "ProofPost watermark"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] text-slate-500">
                  <Check className="w-4 h-4 text-slate-300 flex-shrink-0" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="flex items-center justify-center w-full h-12 rounded-lg border border-slate-200 text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
              Start Free
            </Link>
          </div>

          <div className="relative rounded-xl bg-navy p-8 space-y-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-emerald/12 blur-[60px]" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-semibold text-emerald uppercase tracking-wider">Pro</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/20 text-emerald">Most Popular</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-[44px] font-bold text-white tabular-nums">$19</span>
                <span className="text-slate-400">/mo</span>
              </div>
            </div>
            <ul className="space-y-3 relative">
              {["Unlimited widgets", "Unlimited impressions", "No watermark", "Analytics dashboard", "PDF carousel download", "Multiple Brand Kits", "Priority support"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] text-slate-300">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="relative flex items-center justify-center w-full h-12 rounded-lg bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold transition-colors duration-200 glow-emerald">
              Start Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SECTION 8: FAQ ============ */}
      <section className="max-w-2xl mx-auto px-6 py-24">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
          Common questions.
        </h2>
        <div className="space-y-6">
          {[
            { q: "Will this slow down my website?", a: "No. Our embed scripts load asynchronously and weigh under 12kb. Your page loads first, the carousel glides in after. Zero impact on Core Web Vitals." },
            { q: "What if the AI extracts the wrong quote?", a: "You never lose the original text. The AI suggests the best hook, but you can edit it with one click. You are always in full control of what gets published." },
            { q: "How is this different from Senja or Testimonial.to?", a: "They display static text grids. We use AI to extract the converting sentence and wrap it in an animated, auto-sliding carousel. It is a fundamentally different approach to social proof." },
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
            The 60-Second Canva-Killer Guarantee
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
      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
              <Star className="w-3 h-3 text-white" aria-hidden="true" />
            </div>
            <span className="text-[13px] font-semibold text-slate-400">ProofPost</span>
          </div>
          <p className="text-[13px] text-slate-400">&copy; 2026 ProofPost. Turn reviews into revenue.</p>
        </div>
      </footer>
    </div>
  );
}
