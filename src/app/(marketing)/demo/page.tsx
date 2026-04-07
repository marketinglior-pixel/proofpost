import type { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  Plug,
  LayoutGrid,
  Code2,
  ChevronDown,
} from "lucide-react";
import { CarouselDemo, WallDemo, BadgeDemo } from "./demo-widgets";

export const metadata: Metadata = {
  title: "See ProofPost in Action — Live Widget Demo",
  description:
    "See how ProofPost turns your reviews into beautiful animated widgets. Live demo, no signup required.",
  openGraph: {
    title: "See ProofPost in Action — Live Widget Demo",
    description:
      "See how ProofPost turns your reviews into beautiful animated widgets. Live demo, no signup required.",
    url: "https://proofpst.com/demo",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/demo",
  },
};

const faqItems = [
  {
    question: "How long does setup take?",
    answer:
      "Most users are up and running in under 5 minutes. Connect a review source, pick a widget style, copy one line of code, and paste it on your site. No developer needed.",
  },
  {
    question: "Do I need a developer?",
    answer:
      "No. ProofPost generates a single script tag you can paste into any website builder — Webflow, WordPress, Shopify, Squarespace, or raw HTML. If you can paste text, you can use ProofPost.",
  },
  {
    question: "What review platforms do you support?",
    answer:
      "ProofPost works with Google Reviews, G2, Trustpilot, Capterra, Yelp, and more. You can also paste reviews manually or import from a CSV. We are adding new integrations every month.",
  },
];

const testimonials = [
  {
    quote:
      "We added ProofPost to our pricing page and saw a 34% lift in trial signups within the first week.",
    author: "Rachel Kim",
    title: "Head of Growth",
    company: "Launchpad",
  },
  {
    quote:
      "The widgets look native to our brand. Our design team was impressed — they usually reject third-party embeds.",
    author: "Daniel Voss",
    title: "Product Designer",
    company: "PixelCraft",
  },
  {
    quote:
      "Setup was absurdly fast. I connected Google Reviews and had a live widget on our site in 3 minutes.",
    author: "Maria Santos",
    title: "Marketing Manager",
    company: "GrowthLoop",
  },
];

export default function DemoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "See ProofPost in Action — Live Widget Demo",
        description:
          "See how ProofPost turns your reviews into beautiful animated widgets.",
        url: "https://proofpst.com/demo",
        creator: {
          "@type": "Organization",
          name: "ProofPost",
          url: "https://proofpst.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Nav ── */}
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
              href="/tools"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Free Tools
            </Link>
            <Link
              href="/blog"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Blog
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Pricing
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

      {/* ── Breadcrumbs ── */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-[13px] text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            ProofPost
          </Link>
          <span>/</span>
          <span className="text-slate-600">Demo</span>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="bg-white pt-16 pb-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald/5 text-emerald text-[12px] font-semibold px-3.5 py-1.5 rounded-full mb-6 border border-emerald/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            Live demo — no signup required
          </div>
          <h1 className="text-[32px] sm:text-[44px] font-bold text-slate-900 leading-tight tracking-tight">
            See ProofPost in Action
          </h1>
          <p className="mt-5 text-[17px] text-slate-500 leading-relaxed max-w-xl mx-auto">
            This is what your reviews look like as animated social proof
            widgets. Live on your website in 60 seconds.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-7 py-3 rounded-xl transition-colors duration-200 glow-emerald"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#demos"
              className="text-[14px] text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              See demos
              <ChevronDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Demo 1: Carousel ── */}
      <section id="demos" className="bg-snow py-20">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-widest mb-2">
              Widget Style 1
            </p>
            <h2 className="text-[26px] font-bold text-slate-900 tracking-tight">
              Review Carousel
            </h2>
            <p className="mt-2 text-[15px] text-slate-500">
              Auto-rotating reviews with smooth animations. Perfect for hero
              sections and landing pages.
            </p>
          </div>

          <CarouselDemo />

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-emerald hover:text-emerald-dark transition-colors"
            >
              Want this on your website?
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Demo 2: Wall ── */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-widest mb-2">
              Widget Style 2
            </p>
            <h2 className="text-[26px] font-bold text-slate-900 tracking-tight">
              Wall of Love
            </h2>
            <p className="mt-2 text-[15px] text-slate-500">
              A grid of your best reviews. Great for testimonial pages and
              social proof sections.
            </p>
          </div>

          <WallDemo />

          <div className="mt-10 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-emerald hover:text-emerald-dark transition-colors"
            >
              Want this on your website?
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Demo 3: Badge ── */}
      <section className="bg-snow py-20">
        <div className="max-w-lg mx-auto px-6">
          <div className="text-center mb-8">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-widest mb-2">
              Widget Style 3
            </p>
            <h2 className="text-[26px] font-bold text-slate-900 tracking-tight">
              Trust Badge
            </h2>
            <p className="mt-2 text-[15px] text-slate-500">
              A floating badge that shows your rating at a glance. Subtle,
              always visible, builds instant trust.
            </p>
          </div>

          <BadgeDemo />

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-emerald hover:text-emerald-dark transition-colors"
            >
              Want this on your website?
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-[13px] font-semibold text-slate-400 uppercase tracking-widest mb-10">
            Trusted by 500+ businesses
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100"
              >
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-amber-400 text-[12px]">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[14px] text-slate-700 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald/10 flex items-center justify-center text-[12px] font-bold text-emerald">
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-900">
                      {t.author}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Logo placeholders */}
          <div className="flex items-center justify-center gap-10 mt-12 opacity-25">
            {["Launchpad", "PixelCraft", "GrowthLoop", "ScaleStack", "Finova"].map(
              (name) => (
                <span
                  key={name}
                  className="text-[13px] font-bold text-slate-400 hidden sm:block"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-snow py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[26px] font-bold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="mt-2 text-[15px] text-slate-500">
              Three steps. Under 60 seconds. No developer needed.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Plug,
                title: "Connect your review sources",
                desc: "Google Reviews, G2, Trustpilot, Capterra, and more. Or paste reviews manually.",
              },
              {
                step: "2",
                icon: LayoutGrid,
                title: "Pick a widget style",
                desc: "Carousel, Wall of Love, Trust Badge. Customize colors to match your brand.",
              },
              {
                step: "3",
                icon: Code2,
                title: "Embed one line of code",
                desc: "Copy a single script tag. Works on any website — Webflow, WordPress, Shopify, or raw HTML.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-emerald/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-emerald" />
                </div>
                <p className="text-[10px] font-bold text-emerald uppercase tracking-widest mb-1">
                  Step {item.step}
                </p>
                <h3 className="text-[15px] font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[28px] font-bold text-white tracking-tight">
            $9/mo — Everything you need
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Unlimited widgets, unlimited reviews, custom branding, analytics
            dashboard, and priority support.
          </p>
          <p className="mt-2 text-[14px] text-emerald font-medium">
            14-day free trial. No credit card required.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-xl transition-colors duration-200 glow-emerald"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-snow py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-slate-200 pb-6">
                <h3 className="text-[15px] font-semibold text-slate-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-[26px] font-bold text-slate-900 tracking-tight">
            Ready to turn reviews into revenue?
          </h2>
          <p className="mt-3 text-[15px] text-slate-500 max-w-md mx-auto">
            Join 500+ businesses using ProofPost to convert visitors with
            social proof.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-xl transition-colors duration-200 glow-emerald"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="text-[14px] text-slate-400 hover:text-slate-600 transition-colors"
            >
              Learn more about ProofPost &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-50 border-t border-slate-200/60 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
              <Star className="w-3 h-3 text-white" aria-hidden="true" />
            </div>
            <span className="text-[13px] font-medium text-slate-500">
              ProofPost
            </span>
          </Link>
          <div className="flex items-center gap-6 text-[13px] text-slate-400">
            <Link
              href="/tools"
              className="hover:text-slate-600 transition-colors"
            >
              Free Tools
            </Link>
            <Link
              href="/blog"
              className="hover:text-slate-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/privacy"
              className="hover:text-slate-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-600 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
