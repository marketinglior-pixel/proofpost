import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Globe,
  Palette,
  BarChart3,
  Smartphone,
  Link2,
  Check,
  X,
  Users,
  Briefcase,
  GraduationCap,
  Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Trust Card Builder — Your Reviews on One Verified Page",
  description:
    "Build a free Trust Card that proves your credibility. Pull verified reviews from Google, G2 & LinkedIn into a single page. Share anywhere. Live in 60 seconds.",
  keywords: [
    "trust card",
    "trust card builder",
    "free trust card",
    "verified reviews page",
    "trust page builder",
    "online trust card",
    "digital trust card",
    "review trust card",
  ],
  openGraph: {
    title: "Free Trust Card Builder — Your Reviews on One Verified Page",
    description:
      "Build a free Trust Card that proves your credibility. Verified reviews from Google, G2 & LinkedIn. One link. 60 seconds.",
    url: "https://proofpst.com/what-is-a-trust-card",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/what-is-a-trust-card",
  },
};

const faqItems = [
  {
    question: "What is a Trust Card?",
    answer:
      "A Trust Card is a standalone web page that aggregates your verified reviews from platforms like Google, G2, and LinkedIn into one shareable link. Unlike a generic portfolio or about page, a Trust Card focuses specifically on third-party proof — real reviews from real customers, verified at the source.",
  },
  {
    question: "Is a Trust Card different from a landing page?",
    answer:
      "Yes. A landing page is a general-purpose marketing page. A Trust Card is purpose-built for one thing: proving credibility through verified reviews. It pulls directly from Google, G2, and LinkedIn so visitors can see your reviews are real, not fabricated.",
  },
  {
    question: "Can I customize my Trust Card?",
    answer:
      "Yes. You can add your photo, name, bio, headline, and choose which reviews to display. Pro users get custom branding, unlimited reviews, and the option to connect a custom domain.",
  },
  {
    question: "Is the Trust Card free?",
    answer:
      "Yes. The free tier includes up to 5 verified reviews, a custom proofpst.com/username URL, and mobile-optimized design. Upgrade to Pro for unlimited reviews, no watermark, and custom domain support.",
  },
  {
    question: "Where should I share my Trust Card?",
    answer:
      "Anywhere you need to build trust fast: your email signature, LinkedIn bio, Instagram link in bio, client proposals, Upwork profile, or cold outreach emails. One link replaces a dozen screenshots.",
  },
  {
    question: "What platforms can I import reviews from?",
    answer:
      "Google, G2, Capterra, Trustpilot, LinkedIn recommendations, and more. You can also paste text manually, upload screenshots, or send collection forms to gather new testimonials directly.",
  },
];

export default function TrustCardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Free Trust Card Builder",
        description:
          "Build a free Trust Card that proves your credibility with verified reviews from Google, G2 & LinkedIn.",
        url: "https://proofpst.com/what-is-a-trust-card",
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
            name: "Trust Card",
            item: "https://proofpst.com/what-is-a-trust-card",
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
            Your verified reviews. One link.
          </p>
          <h1 className="font-bold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.15] text-slate-900 tracking-tight">
            Build your Trust Card.{" "}
            <span className="text-emerald hand-underline">
              Prove credibility instantly.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            Pull your verified reviews from Google, G2 &amp; LinkedIn into one
            premium page. Share it anywhere. Set up in 60 seconds.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Trust Card Free
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Free forever. No credit card. Live in 60 seconds.
          </p>
        </div>
      </section>

      {/* What is a Trust Card */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-[13px] font-medium text-emerald uppercase tracking-wider text-center mb-4">
          The concept
        </p>
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-6">
          What is a Trust Card?
        </h2>
        <div className="text-[17px] text-slate-500 leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p>
            A Trust Card is a single web page that collects your verified
            reviews from Google, G2, LinkedIn, and other platforms into one
            shareable link. Think of it as a credibility page — built
            specifically to answer the question every prospect asks:{" "}
            <span className="text-slate-700 font-medium">
              &ldquo;Can I trust this person?&rdquo;
            </span>
          </p>
          <p>
            Unlike a portfolio or an about page, a Trust Card only shows
            third-party proof. Reviews are verified at the source, so visitors
            know they are real. No fabricated quotes. No anonymous testimonials.
            Just real customers, real platforms, real proof.
          </p>
          <p>
            Your Trust Card lives at{" "}
            <span className="font-mono text-emerald text-[15px]">
              proofpst.com/yourname
            </span>
            . Share it in your email signature, LinkedIn bio, proposals, or
            anywhere you need instant credibility.
          </p>
        </div>
      </section>

      {/* Why you need a Trust Card */}
      <section className="bg-navy py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[28px] font-bold text-white tracking-tight mb-6">
            Why you need a Trust Card.
          </h2>
          <p className="text-[17px] text-slate-400 leading-relaxed max-w-xl mx-auto mb-14">
            Prospects Google you before they buy. If they find nothing — or
            just a generic LinkedIn profile — they move on. A Trust Card gives
            them verified proof in one click.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                stat: "93%",
                label: "read reviews",
                desc: "of consumers read online reviews before making a purchase decision.",
              },
              {
                stat: "72%",
                label: "trust more",
                desc: "of buyers say positive reviews make them trust a business more.",
              },
              {
                stat: "60s",
                label: "to set up",
                desc: "Import your reviews, customize your card, and go live. Under a minute.",
              },
            ].map((s) => (
              <div key={s.label} className="space-y-2">
                <p className="text-[48px] font-bold text-emerald tabular-nums">
                  {s.stat}
                </p>
                <p className="text-[15px] font-semibold text-white uppercase tracking-wider">
                  {s.label}
                </p>
                <p className="text-[13px] text-slate-400 leading-relaxed max-w-[240px] mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <p className="text-[13px] font-medium text-emerald uppercase tracking-wider text-center mb-4">
          What&apos;s included
        </p>
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-14">
          Everything your Trust Card comes with.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: "Verified Review Badges",
              desc: "Each review shows the source platform badge (Google, G2, LinkedIn) so visitors know it is real.",
            },
            {
              icon: Globe,
              title: "Multi-Platform Import",
              desc: "Pull reviews from Google, G2, Capterra, Trustpilot, LinkedIn, or paste them manually.",
            },
            {
              icon: Palette,
              title: "Custom Branding",
              desc: "Add your photo, name, bio, headline. Pro users get full brand customization and custom domains.",
            },
            {
              icon: Smartphone,
              title: "Mobile-First Design",
              desc: "Your Trust Card looks perfect on iPhone, Android, and desktop. Responsive by default.",
            },
            {
              icon: Link2,
              title: "One Shareable Link",
              desc: "proofpst.com/yourname — one link for your email signature, bio, proposals, and outreach.",
            },
            {
              icon: BarChart3,
              title: "Analytics",
              desc: "See who views your Trust Card, which reviews get the most attention, and track clicks.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="card-hover rounded-xl bg-white border border-slate-200 p-6 space-y-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <f.icon
                  className="w-5 h-5 text-emerald-dark"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900">
                {f.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Card vs Testimonial Page */}
      <section className="bg-snow py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-4">
            Trust Card vs. Testimonial Page.
          </h2>
          <p className="text-[15px] text-slate-400 text-center mb-12">
            Not all review pages are created equal.
          </p>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Feature</span>
              <span className="text-center">Trust Card</span>
              <span className="text-center">Generic Testimonial Page</span>
            </div>
            {[
              { feature: "Verified source badges", tc: true, tp: false },
              { feature: "Multi-platform import", tc: true, tp: false },
              { feature: "Mobile-optimized", tc: true, tp: "Sometimes" },
              { feature: "Setup time", tc: "60 seconds", tp: "Hours" },
              { feature: "Shareable link", tc: true, tp: "If you build it" },
              { feature: "Analytics", tc: true, tp: false },
              { feature: "AI hook extraction", tc: true, tp: false },
              { feature: "Custom domain", tc: "Pro", tp: "DIY" },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 px-5 py-3 border-t border-slate-100 text-[13px]"
              >
                <span className="text-slate-700">{row.feature}</span>
                {[row.tc, row.tp].map((val, j) => (
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
                          j === 0
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
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Who uses a Trust Card?
        </h2>
        <p className="text-[17px] text-slate-500 text-center mb-14 max-w-lg mx-auto">
          Anyone who sells on trust. Here&apos;s how they use it.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Users,
              title: "Freelancers",
              desc: "Add your Trust Card link to Upwork, Fiverr, or cold emails. Let verified reviews close the deal.",
            },
            {
              icon: Briefcase,
              title: "Agencies",
              desc: "One Trust Card per team member or per service line. Embed in proposals and pitch decks.",
            },
            {
              icon: Rocket,
              title: "SaaS Founders",
              desc: "Import G2 and Google reviews. Share your Trust Card in outbound, on social, or in your email signature.",
            },
            {
              icon: GraduationCap,
              title: "Consultants & Coaches",
              desc: "Replace the awkward 'references available upon request' with a link to verified proof.",
            },
          ].map((uc) => (
            <div
              key={uc.title}
              className="card-hover rounded-xl bg-white border border-slate-200 p-6 space-y-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                <uc.icon
                  className="w-5 h-5 text-emerald-dark"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900">
                {uc.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                {uc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-8">
          Trust Card FAQ.
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
            href="/proof-card"
            className="text-[13px] text-slate-400 hover:text-emerald transition-colors"
          >
            Also called a Proof Card &rarr;
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
            Your Trust Card is one click away.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Import your reviews. Customize your page. Share the link. Free
            forever, upgrade when you are ready.
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Trust Card Free
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
                  <Star
                    className="w-3 h-3 text-white"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-[13px] font-semibold text-slate-700">
                  ProofPost
                </span>
              </div>
              <p className="text-[12px] text-slate-400 max-w-[240px]">
                Your verified Trust Card. One link. Instant credibility.
              </p>
            </div>
            <div className="flex gap-10">
              <div className="space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Product
                </p>
                <div className="flex flex-col gap-1.5">
                  <Link href="/trust-card" className="text-[13px] text-slate-500 hover:text-slate-900 transition-colors">Trust Card</Link>
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
