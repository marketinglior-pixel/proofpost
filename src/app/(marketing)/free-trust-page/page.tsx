import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Check,
  X,
  Smartphone,
  Link2,
  Globe,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Trust Page Builder — Verified Reviews, One Link, No Code",
  description:
    "Build a free trust page in 60 seconds. Aggregate verified reviews from Google, G2 & LinkedIn. Share one link. No coding, no domain, no design skills needed.",
  keywords: [
    "free trust page",
    "free trust page builder",
    "trust page",
    "trust page builder",
    "free review page",
    "verified reviews page free",
    "create trust page",
  ],
  openGraph: {
    title: "Free Trust Page Builder — Verified Reviews, One Link, No Code",
    description:
      "Build a free trust page in 60 seconds. Verified reviews from Google, G2 & LinkedIn. One link.",
    url: "https://proofpst.com/free-trust-page",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/free-trust-page",
  },
};

const faqItems = [
  {
    question: "Is the trust page really free forever?",
    answer:
      "Yes. The free tier is not a trial. You get a trust page with up to 5 verified reviews, a proofpst.com/username URL, and mobile-optimized design — forever. No credit card required, no expiration.",
  },
  {
    question: "What are the free tier limits?",
    answer:
      "Free trust pages display up to 5 reviews, include a small 'Built with ProofPost' watermark, and use a proofpst.com/username URL. Pro removes the watermark, allows unlimited reviews, and supports custom domains.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Yes. Plans start at $19/month (or $12/month billed annually). You keep everything from the free tier plus more reviews, no watermark, and full brand customization. Try free for 14 days.",
  },
  {
    question: "Do I need a website to use a trust page?",
    answer:
      "No. Your trust page lives at proofpst.com/yourname. You do not need a website, domain, or hosting. Just share the link wherever you need to build trust — email, social media, proposals.",
  },
  {
    question: "Will my trust page show up on Google?",
    answer:
      "Yes. Trust pages are public, indexed by Google, and optimized for search. Your name and reviews can appear in search results, helping prospects find your verified proof when they Google you.",
  },
];

export default function FreeTrustPagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Free Trust Page Builder",
        description:
          "Build a free trust page with verified reviews from Google, G2 & LinkedIn.",
        url: "https://proofpst.com/free-trust-page",
        provider: {
          "@type": "Organization",
          name: "ProofPost",
          url: "https://proofpst.com",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ProofPost",
            item: "https://proofpst.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free Trust Page",
            item: "https://proofpst.com/free-trust-page",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
              <Star className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-[15px] font-semibold text-slate-900">
              ProofPost
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-white bg-emerald hover:bg-emerald-dark px-5 py-2.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Try Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-snow">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.06)_0%,_transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-6 pt-20 sm:pt-28 pb-16 sm:pb-24 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-4">
            Zero cost. Zero code.
          </p>
          <h1 className="font-bold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.15] text-slate-900 tracking-tight">
            Build your free trust page.{" "}
            <span className="text-emerald hand-underline">
              Zero cost. Zero code.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            Aggregate your verified reviews from Google, G2 &amp; LinkedIn into
            one shareable page. No domain, no coding, no design skills. Live in
            60 seconds.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Build Your Free Trust Page
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Free forever. No credit card. No catch.
          </p>
        </div>
      </section>

      {/* What is a trust page */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-6">
          What is a trust page?
        </h2>
        <div className="text-[17px] text-slate-500 leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p>
            A trust page is a standalone web page dedicated to one thing:
            proving your credibility. It pulls verified reviews from platforms
            like Google, G2, and LinkedIn into one place, so anyone can check
            your reputation with a single click.
          </p>
          <p>
            Unlike a testimonial section buried at the bottom of your website,
            a trust page is its own URL. You can share it in emails, proposals,
            social bios, and anywhere else you need to build confidence fast.
          </p>
          <p>
            ProofPost gives you a free trust page at{" "}
            <span className="font-mono text-emerald text-[15px]">
              proofpst.com/yourname
            </span>
            . No website required. No domain to buy. No code to write.
          </p>
        </div>
      </section>

      {/* Why free matters */}
      <section className="bg-navy py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[28px] font-bold text-white tracking-tight mb-6">
            Why free matters.
          </h2>
          <p className="text-[17px] text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">
            When you are starting out — freelancing, launching a side project,
            building a personal brand — every dollar counts. You need trust,
            but you cannot afford $50/month for a testimonial tool.
          </p>
          <p className="text-[17px] text-slate-300 leading-relaxed max-w-xl mx-auto">
            ProofPost&apos;s free tier gives you a real trust page with verified
            reviews. Not a 14-day trial. Not a crippled version.{" "}
            <span className="text-white font-medium">
              A trust page that works, forever, for free.
            </span>
          </p>
        </div>
      </section>

      {/* Free vs Pro comparison */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Free vs. Pro — honest comparison.
        </h2>
        <p className="text-[15px] text-slate-400 text-center mb-12">
          No hidden limits. No surprise paywalls.
        </p>
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Feature</span>
            <span className="text-center">Free</span>
            <span className="text-center">Pro (from $29/mo)</span>
          </div>
          {[
            { feature: "Verified reviews", free: "Up to 5", pro: "Unlimited" },
            { feature: "Custom URL", free: true, pro: true },
            { feature: "Mobile-optimized", free: true, pro: true },
            { feature: "Source badges", free: true, pro: true },
            { feature: "AI hook extraction", free: true, pro: true },
            { feature: "Custom domain", free: false, pro: true },
            { feature: "No watermark", free: false, pro: true },
            { feature: "Full brand customization", free: false, pro: true },
            { feature: "Analytics dashboard", free: false, pro: true },
            { feature: "Priority support", free: false, pro: true },
          ].map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 px-5 py-3 border-t border-slate-100 text-[13px]"
            >
              <span className="text-slate-700">{row.feature}</span>
              {[row.free, row.pro].map((val, j) => (
                <span key={j} className="text-center">
                  {typeof val === "boolean" ? (
                    val ? (
                      <Check
                        className="w-4 h-4 text-emerald mx-auto"
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        className="w-4 h-4 text-slate-300 mx-auto"
                        aria-hidden="true"
                      />
                    )
                  ) : (
                    <span
                      className={
                        j === 1
                          ? "font-semibold text-slate-900"
                          : "text-slate-500"
                      }
                    >
                      {val}
                    </span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* How to set up */}
      <section className="bg-snow py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-14">
            Set up your free trust page in 3 steps.
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Globe,
                title: "Import reviews",
                desc: "Connect Google, G2, or LinkedIn. Or paste reviews manually. We verify the source automatically.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Customize",
                desc: "Add your name, photo, and headline. Choose which reviews to display. AI pulls the best quote from each.",
              },
              {
                step: "03",
                icon: Link2,
                title: "Go live",
                desc: "Your trust page is live at proofpst.com/yourname. Share it anywhere — email, social, proposals.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="card-hover rounded-xl bg-white border border-slate-200 p-7 space-y-4 text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/10 mx-auto">
                  <s.icon
                    className="w-6 h-6 text-emerald-dark"
                    aria-hidden="true"
                  />
                </div>
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
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-8">
          Free Trust Page FAQ.
        </h2>
        <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {faqItems.map((faq, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors list-none">
                <span className="text-[14px] font-semibold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <span className="text-slate-300 group-open:rotate-45 transition-transform text-lg flex-shrink-0">
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 -mt-1 text-[13px] text-slate-500 leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Cross-links */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/what-is-a-trust-card"
            className="text-[13px] text-slate-400 hover:text-emerald transition-colors"
          >
            Trust Card &rarr;
          </Link>
          <span className="text-slate-200">|</span>
          <Link
            href="/proof-card"
            className="text-[13px] text-slate-400 hover:text-emerald transition-colors"
          >
            Proof Card &rarr;
          </Link>
          <span className="text-slate-200">|</span>
          <Link
            href="/free-landing-page"
            className="text-[13px] text-slate-400 hover:text-emerald transition-colors"
          >
            Free Landing Page &rarr;
          </Link>
          <span className="text-slate-200">|</span>
          <Link
            href="/free-digital-business-card"
            className="text-[13px] text-slate-400 hover:text-emerald transition-colors"
          >
            Free Digital Business Card &rarr;
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[36px] font-bold text-white tracking-tight">
            Your free trust page is waiting.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Import your reviews. Go live. Share the link. Upgrade when you are
            ready — or stay free forever.
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Build Your Free Trust Page
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
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
                Free trust page builder. Verified reviews. One link.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Product</p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/what-is-a-trust-card" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Trust Card</Link>
                  <Link href="/proof-card" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Proof Card</Link>
                  <Link href="/free-trust-page" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Free Trust Page</Link>
                  <Link href="/free-landing-page" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Free Landing Page</Link>
                  <Link href="/free-digital-business-card" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Digital Business Card</Link>
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
