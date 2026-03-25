import Link from "next/link";
import { ArrowLeft, ArrowRight, Star, Check } from "lucide-react";
import { EmbedCarousel } from "../../embed/[id]/embed-carousel";
import { EmbedMarquee } from "../../embed/[id]/embed-marquee";
import { demoData } from "./demo-data";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ProofPost context banner */}
      <div className="sticky top-0 z-50 bg-emerald/5 border-b border-emerald/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
            <div className="w-px h-4 bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-emerald flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <span className="text-[13px] text-slate-600">
                You&apos;re viewing a{" "}
                <span className="font-semibold text-slate-900">ProofPost</span>{" "}
                widget demo
              </span>
            </div>
          </div>
          <Link
            href="/login"
            className="text-[13px] font-medium text-emerald hover:text-emerald-dark transition-colors"
          >
            Try it free &rarr;
          </Link>
        </div>
      </div>

      {/* ── FAKE SAAS SITE ── */}

      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-[13px] font-bold">A</span>
              </div>
              <span className="font-bold text-gray-900 text-[16px] tracking-tight">
                AcmeSaaS
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-[14px] text-gray-500">
              <span className="hover:text-gray-900 cursor-pointer transition-colors">
                Product
              </span>
              <span className="hover:text-gray-900 cursor-pointer transition-colors">
                Solutions
              </span>
              <span className="hover:text-gray-900 cursor-pointer transition-colors">
                Pricing
              </span>
              <span className="hover:text-gray-900 cursor-pointer transition-colors">
                Resources
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[14px] text-gray-500 hover:text-gray-900 cursor-pointer transition-colors">
              Log in
            </span>
            <span className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg text-[13px] font-semibold cursor-pointer transition-colors">
              Start free trial
            </span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/60 via-white to-white" />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 text-[12px] font-semibold px-3.5 py-1.5 rounded-full mb-6 border border-violet-100">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            New: AI-powered pipeline scoring
          </div>

          <h1 className="text-[44px] sm:text-[56px] font-bold text-gray-900 tracking-tight leading-[1.08]">
            The CRM that your team
            <br />
            <span className="text-violet-600">will actually use.</span>
          </h1>
          <p className="mt-5 text-[17px] text-gray-500 max-w-lg mx-auto leading-relaxed">
            Close more deals with a CRM built for speed.
            No training manuals, no bloat, no Jira tickets to update a field.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <span className="bg-violet-600 text-white px-7 py-3 rounded-xl text-[15px] font-semibold cursor-pointer hover:bg-violet-700 transition-colors">
              Start free trial
            </span>
            <span className="text-[14px] text-gray-500 hover:text-gray-900 cursor-pointer transition-colors flex items-center gap-1.5">
              Watch demo
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=28&h=28&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=28&h=28&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=28&h=28&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=28&h=28&fit=crop&crop=face",
              ].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-[10px] text-amber-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-400">
                2,400+ teams switched this year
              </p>
            </div>
          </div>

          {/* Trust logos */}
          <div className="flex items-center justify-center gap-8 mt-12 opacity-30">
            {["Stripe", "Notion", "Linear", "Vercel", "Figma"].map((name) => (
              <span
                key={name}
                className="text-[14px] font-bold text-gray-400"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-center gap-8 flex-wrap text-[13px] text-gray-500">
          {[
            "2-day onboarding",
            "AI pipeline scoring",
            "Built-in calling",
            "Custom dashboards",
          ].map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-violet-500" />
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* ── WIDGET STYLE 1: CAROUSEL ── */}
      <section className="max-w-xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-[11px] font-semibold text-violet-500 uppercase tracking-widest mb-2">
            Customer stories
          </p>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">
            Don&apos;t take our word for it.
          </h2>
          <p className="mt-2 text-[15px] text-gray-500 max-w-md mx-auto">
            See why thousands of sales teams made the switch.
          </p>
        </div>

        <div className="max-w-[500px] mx-auto">
          <EmbedCarousel data={demoData} embedId="demo" />
        </div>

        <div className="mt-8 text-center">
          <p className="text-[12px] text-gray-400">
            ↑ This is a ProofPost carousel widget — auto-slides, brand colors,
            one line of code
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* ── WIDGET STYLE 2: MARQUEE ── */}
      <section className="py-20 bg-gray-50/30">
        <div className="max-w-3xl mx-auto px-6 text-center mb-10">
          <p className="text-[11px] font-semibold text-violet-500 uppercase tracking-widest mb-2">
            Wall of love
          </p>
          <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">
            Hear it from our customers.
          </h2>
          <p className="mt-2 text-[15px] text-gray-500 max-w-md mx-auto">
            Real results from real teams who switched to AcmeSaaS.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <EmbedMarquee data={demoData} embedId="demo" />
        </div>

        <div className="mt-8 text-center">
          <p className="text-[12px] text-gray-400">
            ↑ This is a ProofPost marquee widget — horizontal scroll, two rows,
            hover to pause
          </p>
        </div>
      </section>

      {/* ── EMBED CODE ── */}
      <section className="max-w-xl mx-auto px-6 py-16 text-center space-y-4">
        <p className="text-[15px] font-semibold text-gray-900">
          Both styles. One line of code.
        </p>
        <div className="inline-block rounded-lg bg-gray-900 px-5 py-3">
          <code className="text-[12px] text-amber-300/80 font-mono">
            {'<script src="proofpost.app/embed.js" data-proofpost-id="...">'}
            {"</script>"}
          </code>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-[28px] font-bold text-white tracking-tight">
            Ready to add social proof to your site?
          </h2>
          <p className="text-[16px] text-slate-400 max-w-md mx-auto">
            Paste a review, let AI extract the hook, embed a widget. 60 seconds.
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="flex items-center gap-2 h-13 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="text-[14px] text-slate-400 hover:text-white transition-colors"
            >
              Learn more about ProofPost &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
