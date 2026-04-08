import Link from "next/link";
import { IPhoneMockup } from "../../go/iphone-mockup";
import { MacbookMockup } from "../../go/macbook-mockup";
import { StickyMobileCTA } from "../../sticky-mobile-cta";
import { ArrowRight, Check, Star, Shield, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofPost x TheRitzyRose | Your Reviews Are Doing Nothing for Your Website",
  description:
    "TheRitzyRose has 24,200 five-star reviews, but none of them show up on theritzyrose.com. ProofPost fixes that.",
  robots: "noindex, nofollow",
};

const PRESS = [
  "The New York Times",
  "Good Morning America",
  "Martha Stewart Weddings",
  "Refinery29",
  "Entertainment Tonight",
  "Brides.com",
];

export default function TheRitzyRosePitchPage() {
  return (
    <>
      <StickyMobileCTA label="Start 14-Day Trial" />

      {/* ───────────────────────────── 1. PROBLEM ───────────────────────────── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-[12px] font-semibold text-emerald uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                Prepared exclusively for TheRitzyRose
              </span>

              <h1
                className="font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                Your reviews are doing nothing
                <br />
                <span className="text-emerald">for your website.</span>
              </h1>

              <p className="text-[16px] text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                You have 24,200+ five-star reviews and 628+ Amazon ratings.
                Your website shows zero. When buyers Google you, they see
                beautiful products — not proof. And a buyer with doubt is a
                buyer who doesn't click Buy.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                {[
                  { icon: Star, value: "108,900+", label: "Total Sales" },
                  { icon: Shield, value: "24,200+", label: "5-Star Reviews" },
                  { icon: Shield, value: "628+", label: "Amazon Ratings" },
                  { icon: Award, value: "Star Seller", label: "Since 2010" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10"
                  >
                    <stat.icon className="w-4 h-4 text-emerald" />
                    <div>
                      <p className="text-[14px] font-bold text-white tabular-nums">{stat.value}</p>
                      <p className="text-[11px] text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: iPhone mockup */}
            <div className="hidden lg:flex justify-center relative">
              <div className="absolute inset-0 bg-emerald/5 rounded-full blur-[80px]" />
              <div className="relative">
                <IPhoneMockup src="https://proofpst.com/theritzyrose" />
                <p className="text-[11px] text-slate-500 text-center mt-4">
                  Live Trust Card — proofpst.com/theritzyrose
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 2. SOLUTION ───────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[26px] sm:text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
            One link. All your proof.
            <br />
            <span className="text-emerald">Built for you.</span>
          </h2>
          <p className="text-[15px] text-slate-500 mt-5 max-w-xl mx-auto leading-relaxed">
            A Trust Card is the page your website can't be. Every verified
            review, every press mention, every star rating — on one branded
            link you drop anywhere a customer asks{" "}
            <span className="text-slate-700 font-medium">"can I trust you?"</span>
          </p>
        </div>

        <div className="space-y-3 mb-10">
          {[
            {
              title: "Works where your website doesn't",
              text: "Instagram DMs, email signatures, WhatsApp, Pinterest bio. When a buyer says \"show me results,\" you drop one link.",
            },
            {
              title: "Verified badges your site can't have",
              text: "\"Verified on Amazon\" and \"Verified on Etsy\" carry weight because anyone can write a review on their own site. These are real.",
            },
            {
              title: "Google-validated rich snippets",
              text: "Not just stars — every individual review quote is indexable. Your Trust Card already passes Google's Rich Results Test with 9 valid structured-data items.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 px-5 py-4"
            >
              <Check className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-semibold text-slate-900">{item.title}</p>
                <p className="text-[13px] text-slate-500 mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border-2 border-emerald/30 bg-emerald/5 p-7 sm:p-8 text-center">
          <p className="text-[13px] font-semibold text-emerald uppercase tracking-wider mb-2">
            Built for TheRitzyRose. Not for everyone.
          </p>
          <p className="text-[15px] text-slate-700 leading-relaxed max-w-lg mx-auto">
            Big link-in-bio tools are built for influencers, creators, and
            everyone at once. ProofPost is built for one kind of person: the
            small business owner who lives or dies by their reputation.
          </p>
        </div>
      </section>

      {/* ───────────────────────────── 3. DISPLAY ───────────────────────────── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
              We already built yours.
            </h2>
            <p className="text-[15px] text-slate-500 mt-3">
              A real, working Trust Card for TheRitzyRose. Live right now.
            </p>
          </div>

          {/* Desktop: MacBook mockup */}
          <div
            className="hidden md:block macbook-container"
            style={{ "--macbook-scale": "0.82" } as React.CSSProperties}
          >
            <MacbookMockup src="https://proofpst.com/theritzyrose" />
          </div>

          {/* Mobile: iPhone mockup */}
          <div className="flex md:hidden justify-center">
            <IPhoneMockup src="https://proofpst.com/theritzyrose" />
          </div>

          <p className="text-[12px] text-slate-400 text-center mt-6">
            Try it:{" "}
            <a
              href="https://proofpst.com/theritzyrose"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald hover:underline"
            >
              proofpst.com/theritzyrose
            </a>
          </p>

          <p className="text-[13px] text-slate-500 text-center mt-4 max-w-md mx-auto">
            The <span className="text-emerald font-semibold">highlighted lines</span> are
            the AI-extracted sentences we'd use in your marketing. Every review
            verified from Amazon &amp; Etsy.
          </p>

          {/* Press strip */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-3">
              Your press, on your Trust Card
            </p>
            <p className="text-[13px] text-slate-600">{PRESS.join(" · ")}</p>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 4. OFFER ───────────────────────────── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-8">
          <div>
            <h2 className="text-[26px] sm:text-[32px] font-bold text-white tracking-tight">
              Your customers already wrote
              <br />
              <span className="text-emerald">your best marketing.</span>
            </h2>
            <p className="text-[14px] text-slate-400 mt-4">
              Let us put it where buyers actually see it.
            </p>
          </div>

          {/* Pricing card */}
          <div className="rounded-2xl bg-white/5 border border-emerald/20 p-8 text-center max-w-md mx-auto">
            <p className="text-[12px] text-emerald uppercase tracking-wider font-semibold mb-3">
              The offer
            </p>
            <p className="text-[48px] font-bold text-white tabular-nums leading-none">
              $19<span className="text-[18px] text-slate-400 font-normal">/month</span>
            </p>
            <p className="text-[13px] text-slate-400 mt-2">
              14-day free trial · We handle all setup
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 text-left">
              {[
                "Your 24,200+ Etsy & Amazon reviews, verified",
                "Branded Trust Card at proofpst.com/theritzyrose",
                "AI-highlighted money lines from every review",
                "Google rich snippets — validated, already passing",
                "Shopify widgets for your product pages",
                "One link that replaces your entire bio menu",
                "Full setup done by us — you don't lift a finger",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-slate-300 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="https://proofpst.com/login"
            className="inline-flex items-center justify-center gap-2 h-13 px-10 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Start the 14-Day Trial
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> No credit card
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> Full access
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> Cancel anytime
            </span>
          </div>

          {/* Next steps */}
          <div className="pt-8 border-t border-white/10 text-left max-w-md mx-auto">
            <p className="text-[12px] text-slate-500 uppercase tracking-wider mb-4 text-center">
              Next steps
            </p>
            {[
              "Polish the final details on your Trust Card together (preview is already live)",
              "Import full review catalog from Etsy",
              "Add widgets to your top Shopify pages",
              "Track for 14 days, review the data together",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 py-2">
                <span className="text-[13px] font-bold text-emerald tabular-nums">{i + 1}.</span>
                <span className="text-[13px] text-slate-400">{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-[12px] text-slate-600">
              <a href="https://proofpst.com" className="text-emerald hover:underline">
                proofpst.com
              </a>
              {" · "}
              <a
                href="https://proofpst.com/theritzyrose"
                className="text-emerald hover:underline"
              >
                See TheRitzyRose demo
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
