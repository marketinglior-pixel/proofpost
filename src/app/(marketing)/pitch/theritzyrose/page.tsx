import Link from "next/link";
import { IPhoneMockup } from "../../go/iphone-mockup";
import { StickyMobileCTA } from "../../sticky-mobile-cta";
import {
  ArrowRight,
  Check,
  Star,
  Shield,
  Sparkles,
  Import,
  Zap,
  BarChart3,
  ExternalLink,
  Award,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofPost x TheRitzyRose | Your 24,500 Reviews Deserve a Stage",
  description:
    "Custom pitch for TheRitzyRose. See how ProofPost turns your 24,500 Etsy reviews into on-site trust that converts.",
  robots: "noindex, nofollow",
};

const REVIEWS = [
  {
    quote: "The quality was amazing and it blew my expectations away!",
    hookLine: "it blew my expectations away",
    why: "Addresses the #1 fear: 'Will this be as good as the photos?'",
    author: "Verified Etsy Buyer",
    rating: 5,
  },
  {
    quote: "These Signs are Amazing Quality, Super Fast Shipping and Perfect for my Wedding.",
    hookLine: "Amazing Quality, Super Fast Shipping and Perfect",
    why: "Three objections killed in one sentence: quality, speed, fit.",
    author: "Verified Etsy Buyer",
    rating: 5,
  },
  {
    quote: "These signs are gorgeous. I'm so impressed with how beautiful they turned out. I will definitely be ordering more in the future!",
    hookLine: "I will definitely be ordering more",
    why: "Repeat purchase intent. Conversion gold for first-time visitors.",
    author: "Verified Etsy Buyer",
    rating: 5,
  },
  {
    quote: "It is so simple and absolutely beautiful.",
    hookLine: "simple and absolutely beautiful",
    why: "Short, emotional, authentic. Sometimes the best review is the simplest.",
    author: "Verified Etsy Buyer",
    rating: 5,
  },
  {
    quote: "Came out perfect, very responsive to my questions.",
    hookLine: "very responsive to my questions",
    why: "Customer service mention. Builds trust for custom orders.",
    author: "Verified Etsy Buyer",
    rating: 5,
  },
  {
    quote: "This is the first year I have ordered holiday cards from Etsy and it is definitely not the last.",
    hookLine: "definitely not the last",
    why: "Loyalty signal. Visitors see a relationship, not a transaction.",
    author: "Verified Etsy Buyer",
    rating: 5,
  },
];

const PRESS = [
  "The New York Times",
  "Good Morning America",
  "Martha Stewart Weddings",
  "People Magazine",
  "Entertainment Tonight",
  "Refinery29",
  "Teen Vogue",
  "US Weekly",
  "HuffPost",
  "Brides.com",
];

export default function TheRitzyRosePitchPage() {
  return (
    <>
      <StickyMobileCTA label="See the Trust Card Demo" />

      {/* ── Hero ── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald/3 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 relative">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-[12px] font-semibold text-emerald uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Prepared exclusively for TheRitzyRose
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1
                className="font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                24,500 Five-Star Reviews.
                <br />
                <span className="text-emerald">One Problem: Nobody Sees Them.</span>
              </h1>
              <p className="text-[16px] text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                TheRitzyRose has 15+ years of trust, press from the New York Times and GMA,
                and a Miranda Lambert celebrity moment. But when someone lands on
                theritzyrose.com? They see beautiful products and zero customer reviews.
              </p>
              <p className="text-[15px] text-slate-300 font-medium">
                We can fix that in 30 minutes.
              </p>

              {/* Stats bar */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                {[
                  { icon: Star, value: "86,409+", label: "Etsy Sales" },
                  { icon: Shield, value: "24,500+", label: "5-Star Reviews" },
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

            {/* Live TheRitzyRose Trust Card (real product, iframe) */}
            <div className="hidden lg:flex justify-center relative">
              <div className="absolute inset-0 bg-pink-500/5 rounded-full blur-[80px]" />
              <div className="relative">
                <IPhoneMockup src="https://proofpst.com/theritzyrose" />
                <p className="text-[11px] text-slate-500 text-center mt-4">
                  Live Trust Card (proofpst.com/theritzyrose)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Gap ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
          The Trust Gap
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-lg mx-auto">
          What your customers see on Etsy vs. what your website visitors see.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Etsy (strong) */}
          <div className="rounded-2xl border-2 border-emerald/30 bg-emerald/5 p-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-emerald bg-emerald/15 uppercase tracking-wider">
              <Check className="w-3 h-3" /> What Etsy visitors see
            </span>
            <div className="space-y-3">
              {[
                "5.0 star rating (perfect score)",
                "24,500+ verified customer reviews",
                "86,409+ total sales",
                "Star Seller badge (earned, not bought)",
                "14+ years of consistent 5-star service",
                "Photos from real weddings and events",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Website (weak) */}
          <div className="rounded-2xl border-2 border-red-200 bg-red-50/30 p-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-red-500 bg-red-100 uppercase tracking-wider">
              <ExternalLink className="w-3 h-3" /> What website visitors see
            </span>
            <div className="space-y-3">
              {[
                "Beautiful product photography",
                "Great brand identity and design",
                "Clear product categories",
                "Zero customer reviews on product pages",
                "No Etsy ratings visible",
                "No press mentions on homepage",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px] text-slate-500">
                  {i < 3 ? (
                    <Check className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" />
                  ) : (
                    <span className="w-4 h-4 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5 text-[14px] font-bold">x</span>
                  )}
                  <span className={i >= 3 ? "text-red-500 font-medium" : ""}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-navy p-6 text-center">
          <p className="text-[17px] text-white font-semibold">
            The trust is real. It's just trapped on Etsy.
          </p>
          <p className="text-[14px] text-slate-400 mt-1">
            ProofPost brings it to your website in 30 minutes.
          </p>
        </div>
      </section>

      {/* ── Conversion Math ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-12">
            The Math on Social Proof
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                value: "270%",
                label: "more conversions",
                detail: "when products display reviews",
                source: "Spiegel Research, Northwestern",
                icon: TrendingUp,
              },
              {
                value: "62%",
                label: "more revenue per visitor",
                detail: "when reviews are visible on-site",
                source: "Bazaarvoice",
                icon: BarChart3,
              },
              {
                value: "93%",
                label: "of consumers",
                detail: "say reviews impact their purchase",
                source: "Podium",
                icon: Users,
              },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl bg-white border border-slate-200 p-6 text-center space-y-3 card-hover">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald/10 mx-auto">
                  <stat.icon className="w-5 h-5 text-emerald" />
                </div>
                <p className="text-[36px] font-bold text-slate-900 tabular-nums">{stat.value}</p>
                <p className="text-[14px] font-semibold text-slate-700">{stat.label}</p>
                <p className="text-[13px] text-slate-500">{stat.detail}</p>
                <p className="text-[11px] text-slate-400">Source: {stat.source}</p>
              </div>
            ))}
          </div>
          <p className="text-[15px] text-slate-600 text-center mt-8 max-w-lg mx-auto">
            For handmade and artisan products, trust is everything. Buyers can't touch the product before buying.
            Your 24,500 reviews are your strongest sales tool. They just need to be visible.
          </p>
        </div>
      </section>

      {/* ── Real Reviews + AI Hook ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Your Reviews. Our AI. The Converting Sentence.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-lg mx-auto">
          These are real reviews from your Etsy shop. The <span className="text-emerald font-semibold">highlighted text</span> is
          what our AI would extract as the "hook line" that converts visitors.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {REVIEWS.map((review, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 card-hover">
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[14px] text-slate-700 leading-relaxed">
                &ldquo;{review.quote.split(review.hookLine).map((part, idx) => (
                  <span key={idx}>
                    {part}
                    {idx === 0 && (
                      <span className="bg-emerald/15 text-emerald font-semibold px-1 rounded">
                        {review.hookLine}
                      </span>
                    )}
                  </span>
                ))}&rdquo;
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <Shield className="w-3.5 h-3.5 text-emerald" />
                <span className="text-[11px] text-emerald font-medium">Verified on Etsy</span>
              </div>
              <p className="text-[12px] text-slate-400 italic">{review.why}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[14px] text-slate-500">
            Our AI reads all 24,500 reviews and finds the one sentence from each that does the most work.
            <br />Not the full paragraph. <span className="font-semibold text-slate-700">The line that converts.</span>
          </p>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="bg-navy">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight text-center mb-4">
            Same Products. Different Trust Level.
          </h2>
          <p className="text-[15px] text-slate-400 text-center mb-12 max-w-md mx-auto">
            One visitor bounces. The other buys.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Before */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-4">
              <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold text-red-400 bg-red-500/15 uppercase tracking-wider">
                Before
              </span>
              <div className="rounded-lg bg-white/5 border border-white/10 p-5 space-y-4">
                <div className="h-3 w-32 bg-white/10 rounded" />
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="aspect-square rounded bg-white/8 border border-white/5" />
                  ))}
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="h-2 w-full bg-white/8 rounded" />
                  <div className="h-2 w-4/5 bg-white/8 rounded" />
                </div>
                <div className="h-10 w-28 rounded-lg bg-white/10 border border-white/5" />
              </div>
              <p className="text-[13px] text-red-400">
                Beautiful products. No reviews. Visitor thinks: "Looks nice, but can I trust this?"
              </p>
            </div>

            {/* After */}
            <div className="rounded-xl bg-white/5 border border-emerald/30 p-6 space-y-4">
              <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold text-emerald bg-emerald/15 uppercase tracking-wider">
                After (with ProofPost)
              </span>
              <div className="rounded-lg bg-white/5 border border-emerald/20 p-5 space-y-4">
                <div className="h-3 w-32 bg-white/10 rounded" />
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map(n => (
                    <div key={n} className="aspect-square rounded bg-white/8 border border-white/5" />
                  ))}
                </div>
                {/* Review widget mockup */}
                <div className="rounded-lg bg-emerald/10 border border-emerald/20 p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-emerald font-medium">24,500+ reviews</span>
                  </div>
                  <p className="text-[11px] text-slate-300 italic">
                    "The quality was amazing and it blew my expectations away!"
                  </p>
                  <div className="flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5 text-emerald" />
                    <span className="text-[9px] text-emerald">Verified on Etsy</span>
                  </div>
                </div>
                <div className="h-10 w-28 rounded-lg bg-emerald/20 border border-emerald/30" />
              </div>
              <p className="text-[13px] text-emerald">
                Same products + verified reviews + AI hooks. Visitor thinks: "24,500 people love this. I'm buying."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-12">
          Setup Takes 30 Minutes. Not Kidding.
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              icon: Import,
              title: "Import from Etsy + Amazon",
              text: "Paste your shop URL. We pull your reviews, ratings, and seller data automatically. No spreadsheets, no copy-pasting.",
            },
            {
              step: "2",
              icon: Sparkles,
              title: "AI finds the hook",
              text: "Our AI reads every review and extracts the one sentence that makes visitors buy. Not the full paragraph. The line that converts.",
            },
            {
              step: "3",
              icon: Zap,
              title: "Live on Shopify",
              text: "Embed a review widget on your product pages. Or share your Trust Card link anywhere. Animated. Verified. SEO-optimized.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald/10 mx-auto">
                <item.icon className="w-6 h-6 text-emerald" />
              </div>
              <span className="text-[11px] font-bold text-emerald uppercase tracking-widest">
                Step {item.step}
              </span>
              <h3 className="text-[16px] font-semibold text-slate-900">{item.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Trust Card Demo ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
            This Is What Your Trust Card Would Look Like
          </h2>
          <p className="text-[15px] text-slate-500 text-center mb-10 max-w-md mx-auto">
            A live demo of ProofPost in action. Imagine this with TheRitzyRose branding,
            your 24,500 reviews, and your press logos.
          </p>
          <div className="flex justify-center">
            <IPhoneMockup src="https://proofpst.com/theritzyrose" />
          </div>
          <p className="text-[12px] text-slate-400 text-center mt-6">
            Live interactive demo at proofpst.com/theritzyrose
          </p>
        </div>
      </section>

      {/* ── Press Advantage ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Press That Most Brands Dream About
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-10 max-w-lg mx-auto">
          TheRitzyRose has been featured in publications that most businesses will never reach.
          Your website visitors should see it. Right now, they don't.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {PRESS.map((name, i) => (
            <span
              key={i}
              className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] font-medium text-slate-700"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-emerald/5 border border-emerald/20 p-6 text-center">
          <p className="text-[15px] text-slate-700">
            <span className="font-semibold">NYT + GMA + Martha Stewart + Miranda Lambert + 24,500 five-star reviews</span>
          </p>
          <p className="text-[14px] text-slate-500 mt-1">
            All displayed on one Trust Card. That combination is hard to argue with.
          </p>
        </div>
      </section>

      {/* ── The Trial ── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight text-center mb-10">
            How The Trial Works
          </h2>
          <div className="space-y-4">
            {[
              { label: "Trial", value: "14 days, full access, no credit card required" },
              { label: "Setup", value: "About 30 minutes. Reviews import automatically from Etsy and Amazon." },
              { label: "What you get", value: "Trust Card page + Shopify widget + AI hook extraction + analytics dashboard" },
              { label: "After the trial", value: "If the numbers work (we think they will), Pro tier is $39/mo. Cancel anytime." },
            ].map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6 rounded-xl bg-white/5 border border-white/10 px-5 py-4">
                <span className="text-[13px] font-bold text-emerald uppercase tracking-wider min-w-[120px]">
                  {row.label}
                </span>
                <span className="text-[14px] text-slate-300">{row.value}</span>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-slate-400 text-center mt-8">
            No risk. No commitment. Just data.
          </p>
        </div>
      </section>

      {/* ── What Success Looks Like ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-10">
          What We Track in 14 Days
        </h2>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Trust Card Views", detail: "How many people visit your proof page" },
            { icon: BarChart3, label: "Widget Impressions", detail: "Review views on your Shopify pages" },
            { icon: TrendingUp, label: "Click-Through Rate", detail: "From reviews to product pages" },
            { icon: Clock, label: "Time on Page", detail: "Do visitors engage with reviews?" },
          ].map((metric, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 text-center space-y-3 card-hover">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald/10 mx-auto">
                <metric.icon className="w-5 h-5 text-emerald" />
              </div>
              <p className="text-[14px] font-semibold text-slate-900">{metric.label}</p>
              <p className="text-[12px] text-slate-500">{metric.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-slate-500 text-center mt-8 max-w-md mx-auto">
          After 14 days we regroup, look at the numbers, and decide together.
          No pressure. Just data.
        </p>
      </section>

      {/* ── Next Steps ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-10">
            Next Steps
          </h2>
          <div className="space-y-4">
            {[
              "We set up TheRitzyRose's Trust Card (takes about 30 minutes)",
              "Import your top reviews from Etsy and Amazon",
              "Share the Trust Card link for Jen to review and approve",
              "Embed a review widget on one Shopify product page as a test",
              "Track results for 14 days",
              "Regroup and decide based on data",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl bg-white border border-slate-200 px-5 py-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald/10 text-[14px] font-bold text-emerald flex-shrink-0">
                  {i + 1}
                </span>
                <p className="text-[14px] text-slate-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-6">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
            24,500 reviews are waiting
            <br />
            <span className="text-emerald">to work for you.</span>
          </h2>
          <p className="text-[15px] text-slate-400 max-w-md mx-auto">
            Your customers already did the hard part. They wrote the proof.
            Let's make sure your next website visitor actually sees it.
          </p>
          <Link
            href="https://proofpst.com/login"
            className="inline-flex items-center justify-center gap-2 h-13 px-10 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Start the 14-Day Trial
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> 30-minute setup</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> Cancel anytime</span>
          </div>

          {/* About ProofPost */}
          <div className="pt-10 border-t border-white/10 mt-10">
            <p className="text-[13px] text-slate-500">
              <span className="font-semibold text-slate-400">ProofPost</span> helps businesses turn scattered reviews into trust that converts.
              <br />
              Import from Google, Amazon, Etsy, G2. AI extracts the best line. Live in 60 seconds.
            </p>
            <p className="text-[12px] text-slate-600 mt-3">
              <a href="https://proofpst.com" className="text-emerald hover:underline">proofpst.com</a>
              {" | "}
              <a href="https://proofpst.com/theritzyrose" className="text-emerald hover:underline">See a live demo</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
