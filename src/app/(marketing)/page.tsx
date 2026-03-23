import Link from "next/link";
import { ArrowRight, Zap, Quote, Check, Code2, Star } from "lucide-react";

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
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-snow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />

        <div className="relative max-w-4xl mx-auto px-6 pt-28 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 mb-8">
            <Zap className="w-3.5 h-3.5 text-emerald-dark" aria-hidden="true" />
            <span className="text-[13px] font-medium text-emerald-dark">
              From review to carousel in 10 seconds
            </span>
          </div>

          <h1 className="font-heading text-[56px] sm:text-[72px] leading-[1.05] text-slate-900 tracking-tight">
            Stop letting reviews
            <br />
            <em className="text-emerald">collect dust.</em>
          </h1>

          <p className="mt-8 text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            You have great customer reviews sitting in emails and G2. We turn
            them into embeddable testimonial widgets and LinkedIn carousels that
            actually convert visitors into leads.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
            >
              Start Free
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
            <a
              href="#how"
              className="flex items-center gap-2 h-14 px-6 text-[15px] text-slate-400 hover:text-slate-700 transition-colors duration-200"
            >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* Visual Steps */}
      <section className="max-w-5xl mx-auto px-6 -mt-8 pb-24">
        <div className="rounded-2xl bg-navy p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-navy/20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald/8 blur-[120px]" />
          <div className="relative grid sm:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Paste a review", desc: "From email, G2, LinkedIn, anywhere. Copy-paste or drop a link." },
              { step: "02", title: "AI does the work", desc: "Extracts the hook, creates branded slides with your logo and colors." },
              { step: "03", title: "Embed or download", desc: "Widget for your site or slides for LinkedIn. One line of code." },
            ].map((item) => (
              <div key={item.step} className="rounded-xl bg-white/5 border border-white/10 p-7 space-y-3">
                <span className="text-[13px] font-bold text-emerald tabular-nums">{item.step}</span>
                <h3 className="text-[17px] font-semibold text-white">{item.title}</h3>
                <p className="text-[14px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section id="how" className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-[34px] font-bold text-slate-900 tracking-tight">You know the problem.</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Great reviews exist. But turning them into content takes forever.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="rounded-xl bg-slate-100 border border-slate-200 p-7 space-y-5">
            <h3 className="text-[12px] font-semibold text-slate-400 uppercase tracking-wider">What you do now</h3>
            <ul className="space-y-3">
              {["Screenshot reviews (looks terrible)", "Design in Canva (takes 30 min)", "Repost same quote (boring)", "Just don\u2019t post at all"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-slate-500">
                  <span className="text-slate-300 mt-0.5" aria-hidden="true">&times;</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-navy text-white p-7 space-y-5">
            <h3 className="text-[12px] font-semibold text-emerald uppercase tracking-wider">With ProofPost</h3>
            <ul className="space-y-3">
              {["Paste review \u2192 widget in 10 sec", "Branded with your logo and colors", "Embed anywhere with one line of code", "Auto-sliding testimonial carousel"].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-slate-300">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-[34px] font-bold text-slate-900 tracking-tight">Everything you need. Nothing you don&apos;t.</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { icon: Zap, title: "10-Second Carousels", desc: "Paste a review, click generate. AI creates 3 branded slides. Faster than coffee." },
            { icon: Code2, title: "One-Line Embed", desc: "Script tag. Paste on site. Auto-sliding testimonial widget with photos and stars." },
            { icon: Quote, title: "Smart Extraction", desc: "Paste a LinkedIn or X link. We pull the name, photo, title, and best quote." },
          ].map((feat) => (
            <div key={feat.title} className="card-hover rounded-xl bg-white border border-slate-200 p-8 space-y-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald/10">
                <feat.icon className="w-5 h-5 text-emerald-dark" aria-hidden="true" />
              </div>
              <h3 className="text-[16px] font-semibold text-slate-900">{feat.title}</h3>
              <p className="text-[14px] text-slate-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="rounded-2xl bg-navy p-10 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full bg-emerald/8 blur-[80px]" />
          <Quote className="w-8 h-8 text-emerald/30 mb-6 relative z-10" aria-hidden="true" />
          <blockquote className="relative z-10">
            <p className="font-heading text-[24px] sm:text-[28px] text-white leading-snug">
              I had 47 reviews on G2 and posted maybe 3 of them. Now I paste them in and post. My impressions went from 2K to 15K per week.
            </p>
            <footer className="mt-8 flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-emerald/20 flex items-center justify-center text-emerald text-sm font-bold">SC</div>
              <div>
                <p className="text-sm font-medium text-white">Sarah Chen</p>
                <p className="text-[13px] text-slate-400">VP Sales, TechFlow</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-[34px] font-bold text-slate-900 tracking-tight">Simple pricing.</h2>
          <p className="text-lg text-slate-500">No per-seat nonsense. No feature gates.</p>
        </div>
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
              {["3 carousels per month", "1 Brand Kit", "Embed widget", "PNG download"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] text-slate-500">
                  <Check className="w-4 h-4 text-slate-300 flex-shrink-0" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="flex items-center justify-center w-full h-12 rounded-lg border border-slate-200 text-[14px] font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200">
              Get Started
            </Link>
          </div>
          <div className="relative rounded-xl bg-navy p-8 space-y-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-emerald/12 blur-[60px]" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-semibold text-emerald uppercase tracking-wider">Pro</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/20 text-emerald">Popular</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-[44px] font-bold text-white tabular-nums">$29</span>
                <span className="text-slate-400">/mo</span>
              </div>
            </div>
            <ul className="space-y-3 relative">
              {["Unlimited carousels", "Multiple Brand Kits", "No watermark", "PDF download", "Priority support"].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5 text-[14px] text-slate-300">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="relative flex items-center justify-center w-full h-12 rounded-lg bg-emerald hover:bg-emerald-dark text-white text-[14px] font-semibold transition-colors duration-200 glow-emerald">
              Start Pro — Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-[38px] font-bold text-slate-900 tracking-tight">Try it. 10 seconds.</h2>
        <p className="mt-4 text-lg text-slate-500 max-w-md mx-auto">
          Paste one review. If it&apos;s bad, you lost 10 seconds. If it&apos;s good, you&apos;ve got a new lead machine.
        </p>
        <Link href="/login" className="inline-flex items-center gap-2 mt-10 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-xl transition-colors duration-200 glow-emerald">
          Start Free <ArrowRight className="w-5 h-5" aria-hidden="true" />
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
          <p className="text-[13px] text-slate-400">&copy; 2026 ProofPost</p>
        </div>
      </footer>
    </div>
  );
}
