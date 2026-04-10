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
  Mail,
  QrCode,
  Users,
  Briefcase,
  MessageSquare,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Digital Business Card with Verified Reviews",
  description:
    "Create a free digital business card that goes beyond contact info — show verified reviews from Google, G2 & LinkedIn. Share via link, QR code, or email signature.",
  keywords: [
    "free digital business card",
    "free business card",
    "digital business card",
    "online business card",
    "business card with reviews",
    "free digital business card maker",
    "digital business card builder",
    "virtual business card",
  ],
  openGraph: {
    title: "Free Digital Business Card with Verified Reviews",
    description:
      "A digital business card that proves you are the real deal. Verified reviews + contact info. One link.",
    url: "https://proofpst.com/free-digital-business-card",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/free-digital-business-card",
  },
};

const faqItems = [
  {
    question: "Is this digital business card really free?",
    answer:
      "Yes. The free tier includes your profile, up to 5 verified reviews, a proofpst.com/username URL, and mobile-optimized design. No credit card required, no expiration. Upgrade to Pro for unlimited reviews, custom domain, and no watermark.",
  },
  {
    question: "Can I add a QR code?",
    answer:
      "Your digital business card URL (proofpst.com/yourname) works with any QR code generator. Create a QR code for your card and add it to your physical business card, email signature, or presentation slides.",
  },
  {
    question: "Can I customize the design?",
    answer:
      "The free tier lets you add your photo, name, headline, and bio. Pro users get full brand customization including colors, fonts, and a custom domain. Both tiers are mobile-optimized and look professional out of the box.",
  },
  {
    question: "What makes this different from Linktree or HiHello?",
    answer:
      "Linktree and HiHello show your links and contact info. ProofPost shows your verified reviews. It is a credibility-first business card — not just a link hub. Prospects see real reviews from real platforms (Google, G2, LinkedIn) instead of just your social links.",
  },
  {
    question: "Can I use it as my link in bio?",
    answer:
      "Absolutely. proofpst.com/yourname works as your Instagram, TikTok, or LinkedIn link in bio. When someone clicks it, they see your verified reviews — much more powerful than a list of links.",
  },
];

export default function FreeDigitalBusinessCardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Free Digital Business Card with Verified Reviews",
        description:
          "Create a free digital business card that showcases verified reviews from Google, G2 & LinkedIn.",
        url: "https://proofpst.com/free-digital-business-card",
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
            name: "Free Digital Business Card",
            item: "https://proofpst.com/free-digital-business-card",
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
            More than contact info
          </p>
          <h1 className="font-bold text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.15] text-slate-900 tracking-tight">
            A digital business card{" "}
            <span className="text-emerald hand-underline">
              that proves you&apos;re the real deal.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
            Most digital business cards show your name and links. Yours shows
            verified reviews from Google, G2 &amp; LinkedIn. One link. Instant
            credibility.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Free Business Card
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Free forever. No credit card. Live in 60 seconds.
          </p>
        </div>
      </section>

      {/* Why your card needs reviews */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-6">
          Why your business card needs reviews.
        </h2>
        <div className="text-[17px] text-slate-500 leading-relaxed space-y-5 max-w-2xl mx-auto">
          <p>
            You hand someone your business card — digital or physical. They
            look at your name, your title, maybe your website. Then what?
          </p>
          <p>
            They Google you. They check if you are legit. They look for
            reviews, testimonials, proof that you deliver what you promise.
          </p>
          <p>
            <span className="text-slate-700 font-medium">
              What if your business card already showed that proof?
            </span>{" "}
            Not just your name and links, but verified reviews from real
            clients on real platforms. That is what ProofPost gives you — a
            digital business card that builds trust on contact.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-snow py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-14">
            What your digital business card includes.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Users,
                title: "Your profile",
                desc: "Photo, name, headline, bio. Everything a prospect needs to know who you are.",
              },
              {
                icon: ShieldCheck,
                title: "Verified reviews",
                desc: "Google, G2, LinkedIn reviews with source badges. Real proof from real platforms.",
              },
              {
                icon: Link2,
                title: "Custom URL",
                desc: "proofpst.com/yourname — your personal, shareable link. No domain needed.",
              },
              {
                icon: Smartphone,
                title: "Mobile-first",
                desc: "Optimized for iPhone and Android. Looks premium on every screen.",
              },
              {
                icon: QrCode,
                title: "QR code ready",
                desc: "Generate a QR code for your URL. Add it to physical cards, slides, or print materials.",
              },
              {
                icon: Mail,
                title: "Email signature ready",
                desc: "Drop your link into your email signature. Every email becomes a trust signal.",
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
        </div>
      </section>

      {/* Use cases */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Where to use your digital business card.
        </h2>
        <p className="text-[17px] text-slate-500 text-center mb-14 max-w-lg mx-auto">
          One link. Everywhere you need trust.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              icon: Globe,
              title: "Link in bio",
              desc: "Instagram, TikTok, LinkedIn, Twitter. Replace your generic link page with a trust page that converts.",
            },
            {
              icon: Mail,
              title: "Email signature",
              desc: "Add your ProofPost link to every email you send. Prospects click, see your reviews, and trust you before the meeting.",
            },
            {
              icon: Briefcase,
              title: "Client proposals",
              desc: "Include your digital business card link in proposals and pitch decks. Let verified reviews do the selling.",
            },
            {
              icon: MessageSquare,
              title: "Cold outreach",
              desc: "Add your link to cold emails and DMs. Instead of 'check my website,' send 'check my reviews.'",
            },
          ].map((uc) => (
            <div
              key={uc.title}
              className="flex gap-4 p-5 rounded-xl border border-slate-200 bg-white"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10 flex-shrink-0">
                <uc.icon
                  className="w-5 h-5 text-emerald-dark"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-[15px] font-semibold text-slate-900">
                  {uc.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mt-1">
                  {uc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-navy py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-white tracking-tight text-center mb-4">
            ProofPost vs. traditional digital business cards.
          </h2>
          <p className="text-[15px] text-slate-400 text-center mb-12">
            Different purpose. Different results.
          </p>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 bg-white/5 px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Feature</span>
              <span className="text-center">HiHello / Popl</span>
              <span className="text-center">ProofPost</span>
            </div>
            {[
              { feature: "Contact info", hh: true, pp: true },
              { feature: "Social links", hh: true, pp: true },
              { feature: "Verified reviews", hh: false, pp: true },
              { feature: "AI hook extraction", hh: false, pp: true },
              { feature: "Source verification", hh: false, pp: true },
              { feature: "Free tier", hh: "Limited", pp: true },
              { feature: "Custom URL", hh: "Paid", pp: true },
              { feature: "Trust-first design", hh: false, pp: true },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 px-5 py-3 border-t border-white/5 text-[13px]"
              >
                <span className="text-slate-300">{row.feature}</span>
                {[row.hh, row.pp].map((val, j) => (
                  <span key={j} className="text-center">
                    {typeof val === "boolean" ? (
                      val ? (
                        <Check
                          className="w-4 h-4 text-emerald mx-auto"
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className="w-4 h-4 text-slate-600 mx-auto"
                          aria-hidden="true"
                        />
                      )
                    ) : (
                      <span className="text-slate-400">{val}</span>
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-step setup */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight text-center mb-14">
          Create your digital business card in 3 steps.
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: Globe,
              title: "Import your reviews",
              desc: "Connect Google, G2, or LinkedIn. Or paste reviews manually. Source badges are added automatically.",
            },
            {
              step: "02",
              icon: Users,
              title: "Add your profile",
              desc: "Photo, name, headline, bio. Choose which reviews to feature. AI extracts the best quote from each.",
            },
            {
              step: "03",
              icon: Link2,
              title: "Share everywhere",
              desc: "Your card goes live at proofpst.com/yourname. Share in your bio, email sig, QR code, or proposals.",
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
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-8">
          Digital Business Card FAQ.
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
            href="/free-landing-page"
            className="text-[13px] text-slate-400 hover:text-emerald transition-colors"
          >
            Free Landing Page &rarr;
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[36px] font-bold text-white tracking-tight">
            Your next business card should come with proof.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-md mx-auto leading-relaxed">
            Name, title, and links are not enough anymore. Show verified
            reviews. Build trust on first contact.
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Create Your Free Business Card
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
                Digital business card with verified reviews. One link.
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
