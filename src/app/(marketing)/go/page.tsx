import Link from "next/link";
import { StickyMobileCTA } from "../sticky-mobile-cta";
import { IPhoneMockup } from "./iphone-mockup";
import { MacbookMockup } from "./macbook-mockup";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  Sparkles,
  Camera,
  Link2,
  Check,
  Zap,
} from "lucide-react";

export default function GoLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ============ MINIMAL HEADER ============ */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
              <Star className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-[15px] font-semibold text-slate-900">ProofPost</span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-white bg-emerald hover:bg-emerald-dark px-5 py-2.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Try Free
          </Link>
        </div>
      </header>

      {/* ============ HERO — Two-column with iPhone mockup ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.06)_0%,_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div className="space-y-6 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 text-emerald text-[12px] font-semibold">
                <Zap className="w-3.5 h-3.5" />
                Early Bird — $69 Lifetime Deal (Limited)
              </div>

              <h1 className="font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.15] text-slate-900 tracking-tight">
                Clients Google you before they call.{" "}
                <span className="text-emerald hand-underline">
                  What do they find?
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-md leading-relaxed">
                No domain. No tech skills. Just your reviews on a premium page
                that closes deals. One link in your bio. Live in 60 seconds.
              </p>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
                >
                  Create Your Trust Card for Free
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-sm text-slate-400">
                Free tier available. No credit card required. Future price: $29/mo.
              </p>

              {/* Social proof strip */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex -space-x-2">
                  {["bg-blue-500", "bg-emerald-500", "bg-purple-500", "bg-amber-500"].map((bg, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 rounded-full ${bg} border-2 border-white flex items-center justify-center`}
                    >
                      <span className="text-[10px] font-bold text-white">
                        {["S", "M", "J", "A"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                  <span className="text-[12px] text-slate-400 ml-1">
                    Trusted by freelancers &amp; agencies
                  </span>
                </div>
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

          {/* Mobile: Compact card preview below hero text */}
          <div className="lg:hidden mt-10">
            <div className="relative mx-auto max-w-[280px]">
              <div className="absolute -inset-4 bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_transparent_70%)] rounded-3xl blur-xl" />
              <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl shadow-slate-300/50">
                <div className="rounded-[1.5rem] overflow-hidden bg-white relative" style={{ height: 420 }}>
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

      {/* ============ NO DOMAIN, NO TECH — Trust Strip ============ */}
      <section className="bg-white border-y border-slate-100 py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
            {[
              { icon: "🚫", label: "No Domain", sub: "We host it for you" },
              { icon: "🔌", label: "No Tech Skills", sub: "Zero code required" },
              { icon: "⚡", label: "Live in 60s", sub: "Faster than making coffee" },
              { icon: "📈", label: "Boost Sales", sub: "Proof that closes deals" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <span className="text-[28px]">{item.icon}</span>
                <p className="text-[15px] font-semibold text-slate-900">{item.label}</p>
                <p className="text-[12px] text-slate-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
            Your reviews are 5-star. Your credibility page is missing.
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                emoji: "📱",
                quote: "\"I just copy-paste WhatsApp screenshots\"",
                desc: "Messy, unprofessional, and impossible to update. Your premium service deserves better than a cropped screenshot.",
              },
              {
                emoji: "🔗",
                quote: "\"My Linktree has zero social proof\"",
                desc: "A list of links doesn't build trust. Clients want to see real reviews before they book a call.",
              },
              {
                emoji: "💸",
                quote: "\"I pay $29/mo for a widget nobody sees\"",
                desc: "Static testimonial grids buried on your website. You need proof where clients actually look — in your bio link.",
              },
            ].map((card) => (
              <div
                key={card.quote}
                className="card-hover rounded-xl bg-white border border-slate-200 p-7 space-y-4"
              >
                <span className="text-[28px]">{card.emoji}</span>
                <p className="text-[15px] font-semibold text-slate-900 leading-snug">{card.quote}</p>
                <p className="text-[14px] text-slate-500 leading-relaxed">{card.desc}</p>
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
              No domain. No developer. No problem.
            </h2>
            <p className="text-[17px] text-slate-500 max-w-md mx-auto">
              Upload your reviews, customize the look, share one link. That&apos;s it.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Import or upload",
                desc: "Pull verified reviews from Google & G2 automatically. Or upload WhatsApp screenshots, DMs, and video testimonials.",
                icon: Camera,
              },
              {
                step: "02",
                title: "Customize your card",
                desc: "Add your name, headline, CTA button, and brand colors. Choose your accent. Your Trust Card adapts to your brand.",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "Share one link",
                desc: "Drop your Trust Card URL in your bio, email signature, DMs, or business cards. Clients see your proof instantly.",
                icon: Link2,
              },
            ].map((s) => (
              <div key={s.step} className="card-hover rounded-xl bg-white border border-slate-200 p-7 space-y-4 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/10 mx-auto">
                  <s.icon className="w-6 h-6 text-emerald-dark" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald tabular-nums uppercase tracking-wider">Step {s.step}</span>
                  <h3 className="text-[16px] font-semibold text-slate-900">{s.title}</h3>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-12 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Trust Card Free
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ DESKTOP PREVIEW — MacBook Mockup (hidden on mobile) ============ */}
      <section className="hidden md:block bg-white py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
              Looks incredible on every screen.
            </h2>
            <p className="text-[17px] text-slate-500 mt-3 max-w-md mx-auto">
              Premium design that adapts from mobile to desktop. Your clients see credibility instantly.
            </p>
          </div>
          <MacbookMockup src="/lio" />
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { stat: "60s", label: "setup time", desc: "From sign-up to live Trust Card. We timed it." },
              { stat: "92%", label: "read reviews", desc: "Before making a purchase decision. Source: BrightLocal" },
              { stat: "$69", label: "one-time", desc: "Lifetime access. No monthly fees. No hidden costs." },
              { stat: "270%", label: "more trust", desc: "Higher conversion when visitors see real reviews. Source: Spiegel" },
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

      {/* ============ WHAT YOU GET ============ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight mb-4">
            Everything you need. One price. Forever.
          </h2>
          <p className="text-[17px] text-slate-500 mb-12 max-w-md mx-auto">
            The Early Bird Lifetime Deal includes everything. No upsells.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            {[
              "Your own Trust Card page (proofpst.com/you)",
              "Verified reviews from Google & G2",
              "Manual upload — WhatsApp, DMs, screenshots",
              "\"ProofPost Approved\" badge on every review",
              "Custom CTA button (Calendly, WhatsApp, link)",
              "Mobile-first premium design",
              "Unlimited reviews (no caps)",
              "No ProofPost watermark",
              "Analytics dashboard",
              "All future features included",
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-2.5 py-2">
                <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-[14px] text-slate-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-emerald/5 border border-emerald/20 max-w-md mx-auto">
            <p className="text-[13px] font-semibold text-emerald uppercase tracking-wider mb-2">Early Bird Lifetime Deal</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-[56px] font-bold text-slate-900 tabular-nums">$69</span>
              <span className="text-slate-400 text-lg">one-time</span>
            </div>
            <p className="text-[13px] text-slate-500 mt-2">Future price: $29/mo. Lock in lifetime access now.</p>
            <Link
              href="/login"
              className="mt-6 flex items-center justify-center gap-2 w-full h-14 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-2xl transition-colors duration-200 glow-emerald"
            >
              Get Lifetime Access
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <p className="text-[12px] text-slate-400 mt-3">
              Or start free — upgrade when you are ready.
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-snow py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-8">
            Quick answers.
          </h2>
          <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden bg-white">
            {[
              {
                q: "What is a Trust Card?",
                a: "A premium, standalone page that showcases your verified reviews, bio, and a CTA button. Think of it as a credibility landing page you share via one link — in your bio, DMs, email signature, or business cards.",
              },
              {
                q: "Where do the reviews come from?",
                a: "Import automatically from Google Business and G2. Or upload manually — WhatsApp screenshots, DMs, video testimonials, anything. Every review gets a \"ProofPost Approved\" badge.",
              },
              {
                q: "Do I need a website?",
                a: "No. Your Trust Card is a standalone page hosted by us (proofpst.com/your-name). No coding, no hosting, no design skills needed.",
              },
              {
                q: "What does \"Lifetime Deal\" mean?",
                a: "Pay $69 once. Use it forever. No monthly fees. No yearly renewal. All future features included. We're offering this price to early adopters only — the regular price will be $18/month.",
              },
              {
                q: "Is there a free option?",
                a: "Yes. The free tier includes 1 Trust Card with up to 15 reviews and a small ProofPost watermark. Upgrade to the LTD to remove the watermark and unlock unlimited reviews.",
              },
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
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[36px] font-bold text-white tracking-tight">
            Your best clients already trust you. Show the rest.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            One link. Verified reviews. Premium credibility. Set up in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Get Lifetime Access — $69
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-[13px] text-slate-500 mt-4">
            Free tier available. No credit card required.
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
                <Star className="w-3 h-3 text-white" aria-hidden="true" />
              </div>
              <span className="text-[13px] font-semibold text-slate-700">ProofPost</span>
            </div>
            <p className="text-[12px] text-slate-400">&copy; 2026 ProofPost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
