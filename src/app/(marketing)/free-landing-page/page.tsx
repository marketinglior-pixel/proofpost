import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Check,
  X,
  Clock,
  Globe,
  Sparkles,
  Link2,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Landing Page for Reviews — No Code, Live in 60 Seconds",
  description:
    "Create a free landing page that showcases your best reviews. No domain, no coding, no design skills. Import from Google, G2, or LinkedIn and go live instantly.",
  keywords: [
    "free landing page",
    "free landing page builder",
    "free review landing page",
    "landing page for reviews",
    "free testimonial page",
    "create free landing page",
    "no code landing page",
  ],
  openGraph: {
    title: "Free Landing Page for Reviews — No Code, Live in 60 Seconds",
    description:
      "Create a free landing page with your verified reviews. No domain, no coding. Live in 60 seconds.",
    url: "https://proofpst.com/free-landing-page",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/free-landing-page",
  },
};

const faqItems = [
  {
    question: "Is this really a free landing page?",
    answer:
      "Yes. You get a fully functional landing page with up to 5 verified reviews, a proofpst.com/username URL, and mobile-optimized design. No credit card required, no time limit. The free tier is permanent.",
  },
  {
    question: "Do I need a domain?",
    answer:
      "No. Your landing page lives at proofpst.com/yourname. You do not need to buy a domain, set up hosting, or configure DNS. Pro users can optionally connect a custom domain.",
  },
  {
    question: "Can I use my own branding?",
    answer:
      "The free tier includes your photo, name, headline, and bio. Pro users get full brand customization including colors, fonts, and custom domain. The free tier includes a small ProofPost watermark.",
  },
  {
    question: "How many reviews can I show?",
    answer:
      "The free tier displays up to 5 reviews. Pro allows unlimited reviews. Our AI automatically extracts the most compelling quote from each review.",
  },
  {
    question: "Is this a website builder?",
    answer:
      "No. ProofPost is not a general website builder like Wix or Carrd. It is a single-purpose tool: a landing page built from your verified reviews. If you need a full website, use a website builder. If you need a trust page that converts, use ProofPost.",
  },
];

export default function FreeLandingPagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "ProofPost — Free Landing Page Builder",
        description:
          "Create a free landing page that showcases your verified reviews from Google, G2 & LinkedIn.",
        applicationCategory: "WebApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: "ProofPost",
          url: "https://proofpst.com",
        },
        url: "https://proofpst.com/free-landing-page",
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
            name: "Free Landing Page",
            item: "https://proofpst.com/free-landing-page",
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
            No code. No domain. No design skills.
          </p>
          <h1 className="font-bold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.15] text-slate-900 tracking-tight">
            A free landing page{" "}
            <span className="text-emerald hand-underline">
              built from your real reviews.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            Import your verified reviews from Google, G2, or LinkedIn.
            ProofPost turns them into a premium landing page you can share
            anywhere. Free. Live in 60 seconds.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Free Landing Page
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Free forever. No credit card required.
          </p>
        </div>
      </section>

      {/* Not another page builder */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-6">
          Not another page builder.
        </h2>
        <div className="text-[17px] text-slate-500 leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p>
            You already have Carrd, Linktree, and a dozen other builders.
            They are great at what they do. But they are general-purpose
            tools — you still have to design the page, write the copy, and
            manually add each testimonial.
          </p>
          <p>
            ProofPost is different.{" "}
            <span className="text-slate-700 font-medium">
              It is a landing page purpose-built for trust.
            </span>{" "}
            It pulls your verified reviews automatically, uses AI to extract
            the most compelling sentence from each, and gives you a
            mobile-optimized page in 60 seconds.
          </p>
          <p>
            No dragging blocks. No picking templates. No writing copy. Just
            your real reviews, presented professionally, at a link you own.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-snow py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-4">
            Generic page builder vs. ProofPost.
          </h2>
          <p className="text-[15px] text-slate-400 text-center mb-12">
            Different tools for different jobs.
          </p>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-50 px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Aspect</span>
              <span className="text-center">Generic Builder</span>
              <span className="text-center">ProofPost</span>
            </div>
            {[
              { aspect: "Purpose", generic: "Any page", pp: "Trust & proof" },
              { aspect: "Reviews", generic: "Copy-paste manually", pp: "Auto-import + verify" },
              { aspect: "Setup time", generic: "30+ minutes", pp: "60 seconds" },
              { aspect: "AI extraction", generic: false, pp: true },
              { aspect: "Source verification", generic: false, pp: true },
              { aspect: "Mobile-optimized", generic: "Template-dependent", pp: true },
              { aspect: "Custom URL", generic: "Some paid", pp: true },
              { aspect: "Price", generic: "$0-19/mo", pp: "Free forever" },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 px-5 py-3 border-t border-slate-100 text-[13px]"
              >
                <span className="text-slate-700">{row.aspect}</span>
                {[row.generic, row.pp].map((val, j) => (
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
        </div>
      </section>

      {/* What you get for free */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-14">
          What you get for free.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: ShieldCheck,
              title: "5 verified reviews",
              desc: "Import from Google, G2, LinkedIn, or paste manually. Source badges verify authenticity.",
            },
            {
              icon: Link2,
              title: "Custom URL",
              desc: "proofpst.com/yourname — claim your username. No domain or hosting needed.",
            },
            {
              icon: Sparkles,
              title: "AI hook extraction",
              desc: "AI reads each review and pulls the sentence that converts. You keep the full review too.",
            },
            {
              icon: Globe,
              title: "Mobile-optimized",
              desc: "Looks perfect on iPhone, Android, and desktop. No responsive design work needed.",
            },
            {
              icon: Zap,
              title: "60-second setup",
              desc: "Import reviews, add your info, go live. No templates to choose, no blocks to drag.",
            },
            {
              icon: Clock,
              title: "Free forever",
              desc: "Not a trial. Not a limited preview. A real landing page that works permanently.",
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

      {/* 3-step walkthrough */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-white tracking-tight text-center mb-14">
            Three steps to your free landing page.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Import reviews",
                desc: "Connect Google, G2, or LinkedIn. Or paste reviews manually. Source verification is automatic.",
              },
              {
                step: "02",
                title: "Add your info",
                desc: "Photo, name, headline, bio. AI extracts the best quote from each review. Preview instantly.",
              },
              {
                step: "03",
                title: "Share the link",
                desc: "Your landing page goes live at proofpst.com/yourname. Add it to your email, bio, proposals.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center space-y-3">
                <span className="text-[48px] font-bold text-emerald tabular-nums">
                  {s.step}
                </span>
                <h3 className="text-[16px] font-semibold text-white">
                  {s.title}
                </h3>
                <p className="text-[14px] text-slate-400 leading-relaxed">
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
          Free Landing Page FAQ.
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
            href="/free-trust-page"
            className="text-[13px] text-slate-400 hover:text-emerald transition-colors"
          >
            Free Trust Page &rarr;
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
            Your reviews deserve a landing page.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Stop screenshotting reviews. Stop copy-pasting quotes. Get a free
            landing page that does it all — automatically.
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Free Landing Page
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
                Free landing page for your verified reviews. One link.
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
