import Link from "next/link";
import { StickyMobileCTA } from "../sticky-mobile-cta";
import { IPhoneMockup } from "./iphone-mockup";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Sparkles,
  Camera,
  Link2,
  Check,
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
            Create Free Trust Card
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
              <h1 className="font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.15] text-slate-900 tracking-tight">
                Premium Service Deserves{" "}
                <span className="text-emerald hand-underline">
                  Premium Proof.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-md leading-relaxed">
                One beautiful page with your best reviews. Drop it in your bio,
                DMs, or email signature. Clients see your proof instantly. No
                website needed.
              </p>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
                >
                  Create Your Free Trust Card
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-sm text-slate-400">
                Free forever. No credit card. Set up in 60 seconds.
              </p>

              {/* Trust line — replaces fake avatars */}
              <div className="flex items-center gap-3 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald flex-shrink-0" aria-hidden="true" />
                <span className="text-[13px] text-slate-500">
                  No credit card. No website needed. Free forever.
                </span>
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

      {/* ============ HOW IT WORKS (moved above Problem) ============ */}
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
              Create Your Free Trust Card
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PROBLEM (moved below How It Works) ============ */}
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
                emoji: "⭐",
                quote: "\"I have great reviews but nowhere to show them\"",
                desc: "Your 5-star reviews are scattered across Google, WhatsApp, and email threads. Clients never see them when it matters.",
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

      {/* ============ STATS ============ */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { stat: "60s", label: "setup time", desc: "From sign-up to live Trust Card. We timed it." },
              { stat: "92%", label: "read reviews", desc: "of consumers read reviews before making a purchase decision." },
              { stat: "100%", label: "free", desc: "No credit card. No catch. Start in seconds." },
              { stat: "270%", label: "more trust", desc: "Higher conversion when visitors see real reviews." },
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

      {/* ============ WHAT YOU GET — Free + LTD ============ */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight mb-4">
            Start free. Upgrade when you&apos;re ready.
          </h2>
          <p className="text-[17px] text-slate-500 mb-12 max-w-md mx-auto">
            No pressure. Build your Trust Card for free. Go Pro when you want more.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Free tier card */}
            <div className="p-8 rounded-2xl bg-white border-2 border-slate-200 text-left">
              <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Free Forever</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-[48px] font-bold text-slate-900 tabular-nums">$0</span>
                <span className="text-slate-400 text-lg">forever</span>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  "1 Trust Card page (proofpst.com/you)",
                  "Up to 5 featured reviews",
                  "Google & G2 import",
                  "Manual upload (screenshots, DMs)",
                  "Mobile-first design",
                  "Custom CTA button",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-[14px] text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full h-14 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-2xl transition-colors duration-200 glow-emerald"
              >
                Create Your Free Trust Card
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            {/* LTD card */}
            <div className="p-8 rounded-2xl bg-emerald/5 border-2 border-emerald/30 text-left relative">
              <span className="absolute top-4 right-4 text-[11px] font-bold text-emerald bg-emerald/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Early Bird
              </span>
              <p className="text-[13px] font-semibold text-emerald uppercase tracking-wider mb-2">Lifetime Deal</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[48px] font-bold text-slate-900 tabular-nums">$69</span>
                <span className="text-slate-400 text-lg">one-time</span>
              </div>
              <p className="text-[13px] text-slate-500 mb-6">Future price: $29/mo</p>
              <div className="space-y-3 mb-8">
                {[
                  "Everything in Free, plus:",
                  "Unlimited reviews",
                  "No ProofPost watermark",
                  "\"ProofPost Approved\" badge",
                  "Analytics dashboard",
                  "All future features included",
                ].map((feature, i) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${i === 0 ? "text-emerald" : "text-emerald"}`} aria-hidden="true" />
                    <span className={`text-[14px] ${i === 0 ? "text-emerald font-semibold" : "text-slate-700"}`}>{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full h-14 bg-white border-2 border-emerald text-emerald hover:bg-emerald hover:text-white text-[16px] font-semibold rounded-2xl transition-colors duration-200"
              >
                Get Lifetime Access
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
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
                q: "Is there a free option?",
                a: "Yes. The free tier includes 1 Trust Card with up to 5 featured reviews and a small ProofPost watermark. Upgrade to the Lifetime Deal to remove the watermark and unlock unlimited reviews.",
              },
              {
                q: "What is a Trust Card?",
                a: "A standalone page that shows your verified reviews, bio, and a CTA button. Think of it as a credibility page you share via one link. Bio, DMs, email signature, business cards.",
              },
              {
                q: "Where do the reviews come from?",
                a: "Import automatically from Google Business and G2. Or upload manually: WhatsApp screenshots, DMs, video testimonials, anything. Every review gets a \"ProofPost Approved\" badge.",
              },
              {
                q: "Do I need a website?",
                a: "No. Your Trust Card is a standalone page hosted by us (proofpst.com/your-name). No coding, no hosting, no design skills needed.",
              },
              {
                q: "What does \"Lifetime Deal\" mean?",
                a: "Pay $69 once. Use it forever. No monthly fees. No yearly renewal. All future features included. We're offering this to early adopters only. Regular price will be $29/mo.",
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
            One link. Verified reviews. Real credibility. Set up in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Free Trust Card
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-[13px] text-slate-500 mt-4">
            Free forever. No credit card required.
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
