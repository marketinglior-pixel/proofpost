import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Globe,
  Sparkles,
  Smartphone,
  Link2,
  Zap,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Proof Card — Showcase Your Verified Reviews in One Link",
  description:
    "Create a free Proof Card that combines your Google, G2, and LinkedIn reviews into a single shareable page. Set up in 60 seconds. No code, no domain needed.",
  keywords: [
    "proof card",
    "proofcard",
    "free proof card",
    "proof card builder",
    "verified reviews card",
    "review proof card",
    "online proof card",
    "digital proof card",
  ],
  openGraph: {
    title: "Free Proof Card — Showcase Your Verified Reviews in One Link",
    description:
      "Create a free Proof Card with your verified reviews. Google, G2, LinkedIn — one link. 60 seconds.",
    url: "https://proofpst.com/proof-card",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/proof-card",
  },
};

const faqItems = [
  {
    question: "What is a Proof Card?",
    answer:
      "A Proof Card is a standalone page that gathers your verified reviews from Google, G2, LinkedIn, and other platforms into one shareable link. It is designed to give prospects instant proof of your credibility — real reviews, from real platforms, verified at the source.",
  },
  {
    question: "Is a Proof Card free?",
    answer:
      "Yes. The free tier includes up to 5 verified reviews, a custom proofpst.com/username URL, and mobile-optimized design. No credit card required. Upgrade to Pro for unlimited reviews, custom domains, and no watermark.",
  },
  {
    question: "How do I share my Proof Card?",
    answer:
      "Your Proof Card lives at proofpst.com/yourname. Share the link in your email signature, LinkedIn bio, Instagram link in bio, proposals, invoices, or cold emails. One link replaces scattered screenshots and review links.",
  },
  {
    question: "What is the difference between a Proof Card and a Trust Card?",
    answer:
      "They are the same product. Some people search for 'proof card' and others for 'trust card.' ProofPost creates a verified review page that serves both purposes — proving your credibility with third-party reviews in one shareable link.",
  },
  {
    question: "Can I customize my Proof Card?",
    answer:
      "Yes. Add your photo, name, headline, and bio. Choose which reviews to feature and in what order. Pro users can customize colors, add a custom domain, and remove the ProofPost watermark.",
  },
];

export default function ProofCardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Free Proof Card Builder",
        description:
          "Create a free Proof Card that combines your verified reviews into one shareable link.",
        url: "https://proofpst.com/proof-card",
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
            name: "Proof Card",
            item: "https://proofpst.com/proof-card",
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
            Every verified review. One link.
          </p>
          <h1 className="font-bold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.15] text-slate-900 tracking-tight">
            Your Proof Card:{" "}
            <span className="text-emerald hand-underline">
              verified reviews, one link.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            Combine your Google, G2, and LinkedIn reviews into a single,
            shareable Proof Card. Set up in 60 seconds. No code, no domain
            needed.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Proof Card Free
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Free forever. No credit card required.
          </p>
        </div>
      </section>

      {/* What is a Proof Card */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-[13px] font-medium text-emerald uppercase tracking-wider text-center mb-4">
          The concept
        </p>
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-6">
          What is a Proof Card?
        </h2>
        <div className="text-[17px] text-slate-500 leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p>
            A Proof Card is a dedicated page that aggregates your verified
            reviews from third-party platforms — Google, G2, LinkedIn, Capterra,
            Trustpilot — into one clean, shareable link.
          </p>
          <p>
            It is not a portfolio. It is not an about page. A Proof Card exists
            for one purpose:{" "}
            <span className="text-slate-700 font-medium">
              to prove you are who you say you are, with verified reviews as
              evidence.
            </span>
          </p>
          <p>
            Every review on your Proof Card shows the source platform badge, so
            visitors can verify it themselves. No anonymous quotes. No
            screenshots that could be faked. Just real proof from real
            platforms.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-snow py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
            Create your Proof Card in 60 seconds.
          </h2>
          <p className="text-[17px] text-slate-500 text-center mb-14 max-w-xl mx-auto">
            Three steps. No designer. No developer. No domain needed.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: Globe,
                title: "Import your reviews",
                desc: "Connect Google, G2, LinkedIn, or paste reviews manually. We pull them in automatically with source verification.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Customize your card",
                desc: "Add your photo, name, headline, and bio. Choose which reviews to feature. AI extracts the best quote from each review.",
              },
              {
                step: "03",
                icon: Link2,
                title: "Share your link",
                desc: "Your Proof Card goes live at proofpst.com/yourname. Share it in your bio, email signature, proposals — anywhere.",
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

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-14">
          What your Proof Card includes.
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: "Verified source badges",
              desc: "Google, G2, LinkedIn badges on every review. Visitors can see the proof is real.",
            },
            {
              icon: Zap,
              title: "AI hook extraction",
              desc: "Our AI reads each review and pulls the single sentence that converts. You keep the full review too.",
            },
            {
              icon: Smartphone,
              title: "Mobile-first design",
              desc: "Optimized for iPhone and Android. Looks premium on every screen size.",
            },
            {
              icon: Link2,
              title: "Custom URL",
              desc: "proofpst.com/yourname — claim your username and share it everywhere.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-white"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10 flex-shrink-0">
                <f.icon
                  className="w-5 h-5 text-emerald-dark"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">
                  {f.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mt-1">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free vs Pro */}
      <section className="bg-navy py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-white tracking-tight text-center mb-12">
            Free vs. Pro Proof Card.
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-8 space-y-4">
              <h3 className="text-[18px] font-bold text-white">
                Free
              </h3>
              <p className="text-[13px] text-slate-400">Forever free</p>
              <ul className="space-y-2">
                {[
                  "Up to 5 reviews",
                  "proofpst.com/username URL",
                  "Mobile-optimized design",
                  "Verified source badges",
                  "Shareable link",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[14px] text-slate-300">
                    <Check className="w-4 h-4 text-emerald flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-8 space-y-4 relative">
              <span className="absolute top-3 right-3 text-[10px] font-bold text-emerald bg-emerald/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Popular
              </span>
              <h3 className="text-[18px] font-bold text-white">
                Pro — from $29/mo
              </h3>
              <p className="text-[13px] text-slate-400">Billed annually ($348/year)</p>
              <ul className="space-y-2">
                {[
                  "Unlimited reviews",
                  "No watermark",
                  "Custom domain",
                  "Full brand customization",
                  "Analytics dashboard",
                  "Priority support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[14px] text-slate-300">
                    <Check className="w-4 h-4 text-emerald flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-8">
          Proof Card FAQ.
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
            Also called a Trust Card &rarr;
          </Link>
          <span className="text-slate-200">|</span>
          <Link
            href="/free-trust-page"
            className="text-[13px] text-slate-400 hover:text-emerald transition-colors"
          >
            Free Trust Page &rarr;
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
            Create your Proof Card. Free. Now.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Your reviews already exist. Your Proof Card makes them work for
            you — one link, instant credibility, 60 seconds.
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Proof Card Free
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
                <span className="text-[13px] font-semibold text-slate-700">
                  ProofPost
                </span>
              </div>
              <p className="text-[12px] text-slate-400 max-w-[240px]">
                Your verified Proof Card. One link. Instant credibility.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Product
                </p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/what-is-a-trust-card" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Trust Card</Link>
                  <Link href="/proof-card" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Proof Card</Link>
                  <Link href="/free-trust-page" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Free Trust Page</Link>
                  <Link href="/free-landing-page" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Free Landing Page</Link>
                  <Link href="/free-digital-business-card" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Digital Business Card</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Legal
                </p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/terms" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Terms</Link>
                  <Link href="/privacy" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Privacy</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-[12px] text-slate-400">
              &copy; 2026 ProofPost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
