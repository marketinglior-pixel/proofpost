import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { DemoCarousel } from "./demo-carousel";
import { DemoMarquee } from "./demo-marquee";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ProofPost context banner */}
      <div className="sticky top-0 z-50 bg-emerald/5 border-b border-emerald/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-emerald flex items-center justify-center">
              <Star className="w-3 h-3 text-white" />
            </div>
            <span className="text-[13px] text-slate-600">
              You&apos;re viewing a <span className="font-semibold text-slate-900">ProofPost</span> widget demo
            </span>
          </div>
          <Link
            href="/login"
            className="text-[13px] font-medium text-emerald hover:text-emerald-dark transition-colors"
          >
            Try it free &rarr;
          </Link>
        </div>
      </div>

      {/* Fake SaaS header */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600" />
            <span className="font-semibold text-gray-900 text-[15px]">
              AcmeSaaS
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="hidden sm:inline">Features</span>
            <span className="hidden sm:inline">Pricing</span>
            <span className="hidden sm:inline">Blog</span>
            <span className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-[13px] font-medium">
              Get Started
            </span>
          </div>
        </div>
      </nav>

      {/* Fake hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          The CRM that your team
          <br />
          will actually use.
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-lg mx-auto">
          Stop fighting with complex tools. Start closing more deals.
        </p>
      </section>

      {/* ── WIDGET STYLE 1: CAROUSEL ── */}
      <section className="max-w-xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
            What our customers say
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Don&apos;t take our word for it.
          </h2>
        </div>

        <DemoCarousel />

        <div className="mt-6 text-center">
          <p className="text-[13px] text-gray-400">
            ↑ Carousel widget &mdash; auto-slides, brand colors, one line of code
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* ── WIDGET STYLE 2: MARQUEE ── */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-3xl mx-auto px-6 text-center mb-8">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">
            Another style option
          </p>
          <h2 className="text-2xl font-bold text-gray-900">
            Wall of love. Always moving.
          </h2>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden">
          <DemoMarquee />
        </div>

        <div className="mt-6 text-center">
          <p className="text-[13px] text-gray-400">
            ↑ Marquee widget &mdash; horizontal scroll, two rows, hover to pause
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
            Paste a review, let AI extract the hook, embed a widget.
            60 seconds. No credit card required.
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
