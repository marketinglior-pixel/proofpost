import Link from "next/link";
import { IPhoneMockup } from "../../go/iphone-mockup";
import { MacbookMockup } from "../../go/macbook-mockup";
import { StickyMobileCTA } from "../../sticky-mobile-cta";
import {
  ArrowRight,
  Check,
  Star,
  Shield,
  Sparkles,
  Import,
  BarChart3,
  Award,
  Search,
  Globe,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofPost x TheRitzyRose | Your Reviews Are Doing Nothing for Your Website",
  description:
    "TheRitzyRose has 24,500 five-star Etsy reviews, but none of them show up on theritzyrose.com. ProofPost fixes that.",
  robots: "noindex, nofollow",
};

const PRESS = [
  "The New York Times",
  "Good Morning America",
  "Martha Stewart Weddings",
  "People Magazine",
  "Entertainment Tonight",
  "Brides.com",
];

export default function TheRitzyRosePitchPage() {
  return (
    <>
      <StickyMobileCTA label="Start 14-Day Trial" />

      {/* ── 1. PROBLEM ── */}
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
                You have 24,500+ five-star reviews on Etsy and 628+ ratings on Amazon,
                but theritzyrose.com shows zero. When customers Google you and land on
                your site, they see great products and no proof. So they go to Etsy.
                And Etsy takes 15%.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                {[
                  { icon: Star, value: "86,409+", label: "Etsy Sales" },
                  { icon: Shield, value: "24,500+", label: "5-Star Reviews (Etsy)" },
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

      {/* ── 2. DISPLAY (right after hero) ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
              We already built yours.
            </h2>
            <p className="text-[15px] text-slate-500 mt-3">
              This is a real, working Trust Card for TheRitzyRose. Live right now.
            </p>
          </div>

          {/* Desktop: MacBook mockup */}
          <div className="hidden md:block macbook-container" style={{ "--macbook-scale": "0.82" } as React.CSSProperties}>
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

          <p className="text-[13px] text-slate-500 text-center mt-6 max-w-md mx-auto">
            The <span className="text-emerald font-semibold">highlighted lines</span> are
            the AI-extracted sentences we'd use in your marketing. All reviews verified from Amazon &amp; Etsy.
          </p>
        </div>
      </section>

      {/* ── 3. WHY A TRUST CARD ── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            Your website sells your product.
            <br />
            Your Trust Card sells your reputation.
          </h2>
          <p className="text-[15px] text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
            When someone asks "why should I trust you?" your website doesn't answer that.
            Your Trust Card does. One link with all your verified reviews, press mentions,
            and ratings from every platform. Think of it as Linktree, but for proof.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {[
            {
              question: "\"What do you sell?\"",
              answer: "Your website",
              detail: "Products, photos, prices, categories",
              good: false,
            },
            {
              question: "\"Can I trust you?\"",
              answer: "Your Trust Card",
              detail: "Verified reviews, press, ratings, proof",
              good: true,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 space-y-2 ${
                item.good
                  ? "bg-emerald/5 border-2 border-emerald/20"
                  : "bg-slate-50 border border-slate-200"
              }`}
            >
              <p className="text-[14px] text-slate-400 font-medium">{item.question}</p>
              <p className={`text-[18px] font-bold ${item.good ? "text-emerald" : "text-slate-700"}`}>
                → {item.answer}
              </p>
              <p className="text-[13px] text-slate-500">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 mb-14">
          {[
            {
              title: "Works where your website doesn't",
              text: "Instagram DMs, email signatures, WhatsApp, Pinterest bio. When someone asks \"show me results,\" you drop one link.",
            },
            {
              title: "Verified badges your site can't have",
              text: "\"Verified on Amazon\" and \"Verified on Etsy\" carry weight because anyone can write a review on their own site. These are real.",
            },
            {
              title: "Stars in Google search results",
              text: "Schema markup so your 5-star rating shows up before anyone clicks. Free organic traffic to your site, not Etsy.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 px-5 py-4">
              <Check className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-semibold text-slate-900">{item.title}</p>
                <p className="text-[13px] text-slate-500 mt-0.5">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Linktree vs Trust Card comparison */}
        <div className="mb-4">
          <h3 className="text-[20px] sm:text-[22px] font-bold text-slate-900 tracking-tight text-center mb-2">
            Your Linktree vs. Your Trust Card
          </h3>
          <p className="text-[14px] text-slate-400 text-center mb-8">
            Right now, your Instagram bio links to{" "}
            <a href="https://linktr.ee/theritzyrose" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">
              linktr.ee/theritzyrose
            </a>
            . Here's what each one actually does for your business.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Linktree */}
            <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-red-500 bg-red-100 px-2.5 py-1 rounded uppercase tracking-wider">
                  Linktree
                </span>
                <span className="text-[11px] text-red-400">linktr.ee/theritzyrose</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "What it does", value: "Lists links to Instagram, Amazon, Etsy, Email" },
                  { label: "Reviews shown", value: "Zero" },
                  { label: "Star ratings", value: "None" },
                  { label: "Press mentions", value: "None" },
                  { label: "SEO value", value: "None (noindex)" },
                  { label: "Drives sales?", value: "Sends traffic, doesn't convert it" },
                  { label: "Trust building", value: "None — just a list of links" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between text-[13px]">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="text-red-400 font-medium text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Card */}
            <div className="rounded-xl border-2 border-emerald/30 bg-emerald/5 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-emerald bg-emerald/15 px-2.5 py-1 rounded uppercase tracking-wider">
                  Trust Card
                </span>
                <span className="text-[11px] text-emerald">proofpst.com/theritzyrose</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "What it does", value: "Shows your proof, drives purchases" },
                  { label: "Reviews shown", value: "24,500+ from Etsy & Amazon" },
                  { label: "Star ratings", value: "5.0 verified, visible in Google" },
                  { label: "Press mentions", value: "NYT, GMA, Martha Stewart & more" },
                  { label: "SEO value", value: "Schema markup, Google rich snippets" },
                  { label: "Drives sales?", value: "AI highlights the line that converts" },
                  { label: "Trust building", value: "Verified badges, real proof, branded" },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between text-[13px]">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="text-emerald font-semibold text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
            <p className="text-[14px] text-slate-700">
              <span className="font-semibold">Linktree tells people where to go.</span>
              {" "}
              <span className="font-semibold text-emerald">Trust Card tells people why to buy.</span>
            </p>
            <p className="text-[13px] text-slate-400 mt-1">
              Replace the link in your Instagram bio and every visitor sees proof, not a menu.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            How ProofPost builds yours.
          </h2>
          <p className="text-[15px] text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
            We pull your reviews from Etsy and Amazon, our AI finds the sentence
            that sells, and we put it everywhere it matters.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: Import,
              title: "Import from Etsy & Amazon",
              text: "25,000+ verified reviews pulled in automatically. Each one tagged with its source.",
            },
            {
              icon: Sparkles,
              title: "AI finds the money line",
              text: "Every review has one sentence that converts. Our AI extracts it.",
            },
            {
              icon: Globe,
              title: "Live on your site + Google",
              text: "Shopify widgets, SEO schema for Google star ratings, branded Trust Card.",
            },
          ].map((item, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald/10">
                <item.icon className="w-5 h-5 text-emerald" />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900">{item.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ── 5. POTENTIAL ── */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight text-center mb-10">
            The math.
          </h2>

          {/* Etsy ROI */}
          <div className="rounded-2xl bg-white/5 border border-emerald/20 p-8 text-center space-y-4 mb-10">
            <p className="text-[15px] text-slate-300 leading-relaxed max-w-lg mx-auto">
              If ProofPost moves just 10% of your Etsy sales to your own site,
              you save <span className="text-emerald font-bold text-[20px]">$15,000–$30,000/year</span> in Etsy fees.
            </p>
            <p className="text-[14px] text-slate-400">
              ProofPost costs $19/month. That's $228/year. The ROI is 66x–132x.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: "270%", label: "more conversions with reviews on product pages", source: "Spiegel Research" },
              { value: "62%", label: "more revenue per visitor with social proof on-site", source: "Bazaarvoice" },
              { value: "93%", label: "of buyers say reviews impact their purchase", source: "Podium" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-[32px] sm:text-[36px] font-bold text-white tabular-nums">{stat.value}</p>
                <p className="text-[12px] text-slate-400 mt-1 leading-snug">{stat.label}</p>
                <p className="text-[10px] text-slate-500 mt-1">{stat.source}</p>
              </div>
            ))}
          </div>

          {/* Press mentions */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-3">Featured in</p>
            <p className="text-[13px] text-slate-400">
              {PRESS.join(" · ")}
            </p>
            <p className="text-[12px] text-slate-500 mt-2">
              All visible on your Trust Card. Advertising money can't buy.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. BENEFITS ── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-10">
          What's included.
        </h2>

        <div className="space-y-4">
          {[
            { icon: Shield, title: "Trust Card", desc: "Branded proof page at proofpst.com/theritzyrose. One link, share everywhere." },
            { icon: Import, title: "Review Import", desc: "Etsy + Amazon reviews pulled in automatically. Each tagged \"Verified Amazon\" or \"Verified Etsy\"." },
            { icon: Sparkles, title: "AI Hook Extraction", desc: "Finds the one sentence in each review that converts." },
            { icon: Search, title: "Google SEO", desc: "Schema markup so your star ratings show up in Google search results." },
            { icon: Globe, title: "Shopify Widgets", desc: "Animated review widgets on your product pages. Branded to match your look." },
            { icon: BarChart3, title: "Analytics", desc: "Track views, impressions, click-throughs. Know what's working." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl bg-white border border-slate-200 px-5 py-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald/10 flex-shrink-0 mt-0.5">
                <item.icon className="w-4 h-4 text-emerald" />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-slate-900">{item.title}</h3>
                <p className="text-[13px] text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[15px] text-slate-700">
            <span className="font-bold text-emerald">$19/month</span>
            <span className="text-slate-400 mx-2">·</span>
            14-day free trial
            <span className="text-slate-400 mx-2">·</span>
            We handle all setup
          </p>
        </div>
      </section>

      {/* ── 7. FOOTER / CTA ── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-6">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
            Your customers already wrote your best marketing.
          </h2>

          <Link
            href="https://proofpst.com/login"
            className="inline-flex items-center justify-center gap-2 h-13 px-10 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Start the 14-Day Trial
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> Full access</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> Cancel anytime</span>
          </div>

          {/* Next steps */}
          <div className="pt-8 border-t border-white/10 mt-8 text-left max-w-md mx-auto">
            <p className="text-[12px] text-slate-500 uppercase tracking-wider mb-4 text-center">Next steps</p>
            {[
              "Finalize your Trust Card (already 80% done)",
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

          <div className="pt-8 border-t border-white/10 mt-4">
            <p className="text-[12px] text-slate-600">
              <a href="https://proofpst.com" className="text-emerald hover:underline">proofpst.com</a>
              {" · "}
              <a href="https://proofpst.com/theritzyrose" className="text-emerald hover:underline">See TheRitzyRose demo</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
