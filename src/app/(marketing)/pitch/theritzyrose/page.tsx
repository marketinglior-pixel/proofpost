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
  Search,
  Globe,
  MessageCircle,
  Target,
  Megaphone,
  Eye,
  MousePointerClick,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofPost x TheRitzyRose | The New Standard for Business Advertising",
  description:
    "See how ProofPost turns TheRitzyRose's 24,500 Etsy reviews into an all-in-one marketing system. Trust Card + SEO + Analytics + Review Import.",
  robots: "noindex, nofollow",
};

const REVIEWS = [
  {
    quote: "The quality was amazing and it blew my expectations away!",
    hookLine: "it blew my expectations away",
    author: "Jessica M.",
    context: "Wedding customer",
  },
  {
    quote: "These Signs are Amazing Quality, Super Fast Shipping and Perfect for my Wedding.",
    hookLine: "Amazing Quality, Super Fast Shipping and Perfect",
    author: "Amanda L.",
    context: "First-time buyer",
  },
  {
    quote: "These signs are gorgeous. I'm so impressed with how beautiful they turned out. I will definitely be ordering more in the future!",
    hookLine: "I will definitely be ordering more",
    author: "Sarah K.",
    context: "Repeat buyer",
  },
  {
    quote: "Every single guest asked where I got my reserved signs. They added such a special touch to our ceremony.",
    hookLine: "Every single guest asked",
    author: "Lauren H.",
    context: "Wedding customer",
  },
  {
    quote: "Came out perfect, very responsive to my questions. I felt like I was working with a friend, not a vendor.",
    hookLine: "working with a friend, not a vendor",
    author: "Emily W.",
    context: "Custom order",
  },
  {
    quote: "The memorial sign was absolutely perfect. It made everyone at the wedding cry happy tears.",
    hookLine: "everyone at the wedding cry happy tears",
    author: "Michelle D.",
    context: "Memorial sign",
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
      <StickyMobileCTA label="See the Full System" />

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
              <p className="text-[13px] text-emerald font-semibold uppercase tracking-wider">
                The New Standard for Business Advertising
              </p>
              <h1
                className="font-bold text-white tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
              >
                Your Reviews. Your SEO. Your Marketing.
                <br />
                <span className="text-emerald">One System.</span>
              </h1>
              <p className="text-[16px] text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                TheRitzyRose has 24,500 five-star reviews, NYT press coverage,
                and a Miranda Lambert moment. But none of that lives on your website.
                ProofPost turns all of it into a marketing system that works while you
                focus on what you do best: creating beautiful products.
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

            {/* Live Trust Card */}
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

      {/* ── The Shift ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[13px] text-emerald font-semibold uppercase tracking-wider mb-3">The shift happening right now</p>
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            Advertising is Changing. Fast.
          </h2>
          <p className="text-[15px] text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed">
            Customers don't trust ads anymore. They trust other customers.
            The brands winning today aren't the ones spending the most on advertising.
            They're the ones making their existing customers do the selling for them.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              emoji: "📢",
              old: "Old way",
              title: "Pay for every click",
              text: "Run ads, pay per click, hope people convert. The cost goes up every year and the returns keep shrinking.",
            },
            {
              emoji: "🔄",
              old: "The problem",
              title: "Reviews sit unused",
              text: "You have 24,500 five-star reviews. But they're locked on Etsy. Your website visitors, your Google searchers, your social followers never see them.",
            },
            {
              emoji: "🚀",
              old: "New standard",
              title: "Let reviews sell for you",
              text: "Turn your existing reviews into a marketing machine. On your site, in Google, in your emails. Your best customers become your best salespeople.",
            },
          ].map((card, i) => (
            <div key={i} className={`rounded-xl p-6 space-y-3 ${i === 2 ? "bg-emerald/5 border-2 border-emerald/20" : "bg-white border border-slate-200"}`}>
              <span className="text-2xl">{card.emoji}</span>
              <p className={`text-[11px] font-bold uppercase tracking-wider ${i === 2 ? "text-emerald" : "text-slate-400"}`}>{card.old}</p>
              <h3 className="text-[15px] font-semibold text-slate-900">{card.title}</h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Gap (specific to TheRitzyRose) ── */}
      <section className="bg-navy">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
              TheRitzyRose Has the Trust. The Website Doesn't Show It.
            </h2>
            <p className="text-[15px] text-slate-400 mt-4 max-w-lg mx-auto">
              We looked at every platform where TheRitzyRose has a presence. Here's what we found.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Etsy (strong) */}
            <div className="rounded-2xl bg-white/5 border border-emerald/20 p-7 space-y-5">
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
                  "Real photos from weddings and events",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px] text-slate-300">
                    <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Website (weak) */}
            <div className="rounded-2xl bg-white/5 border border-red-500/20 p-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-red-400 bg-red-500/15 uppercase tracking-wider">
                <ExternalLink className="w-3 h-3" /> What website visitors see
              </span>
              <div className="space-y-3">
                {[
                  { text: "Beautiful product photography", ok: true },
                  { text: "Strong brand identity", ok: true },
                  { text: "Clear product categories", ok: true },
                  { text: "Zero customer reviews on product pages", ok: false },
                  { text: "No star ratings in Google search results", ok: false },
                  { text: "No press mentions visible anywhere", ok: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px]">
                    {item.ok ? (
                      <Check className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <span className="w-4 h-4 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5 text-[14px] font-bold">x</span>
                    )}
                    <span className={item.ok ? "text-slate-400" : "text-red-400 font-medium"}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-xl bg-emerald/10 border border-emerald/20 p-6 text-center">
            <p className="text-[17px] text-white font-semibold">
              The trust exists. The marketing system to use it doesn't. Yet.
            </p>
          </div>
        </div>
      </section>

      {/* ── The All-in-One System ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[13px] text-emerald font-semibold uppercase tracking-wider mb-3">What ProofPost builds for you</p>
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            Your All-in-One Marketing System
          </h2>
          <p className="text-[15px] text-slate-500 mt-4 max-w-2xl mx-auto">
            Not just a review widget. A complete system that turns your existing reviews into
            traffic, trust, and sales. Here's what TheRitzyRose gets:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Shield,
              title: "Trust Card",
              text: "A verified proof page at proofpst.com/theritzyrose. Your reviews, your brand, your story. One link you can share everywhere.",
              tag: "Core",
            },
            {
              icon: Import,
              title: "Review Import",
              text: "Pull reviews from Etsy and Amazon automatically. No copy-pasting. The reviews stay synced and verified.",
              tag: "Core",
            },
            {
              icon: Sparkles,
              title: "AI Hook Extraction",
              text: "Our AI reads every review and finds the one sentence that converts. Not the full paragraph. The money line.",
              tag: "Core",
            },
            {
              icon: Search,
              title: "Google SEO",
              text: "Schema markup on your Trust Card pages so Google shows your star ratings in search results. Get found by people searching for wedding signs.",
              tag: "Marketing",
            },
            {
              icon: Globe,
              title: "Shopify Embed",
              text: "Add review widgets to any product page on theritzyrose.com. Animated, verified, beautiful. Matches your brand.",
              tag: "Marketing",
            },
            {
              icon: BarChart3,
              title: "Analytics Dashboard",
              text: "See who views your reviews, which ones get the most attention, and how they impact your sales. Data, not guessing.",
              tag: "Marketing",
            },
            {
              icon: Eye,
              title: "Visitor Insights",
              text: "Track Trust Card views, Shopify widget impressions, and click-through rates. Know exactly what's working.",
              tag: "Growth",
            },
            {
              icon: MessageCircle,
              title: "Review Collection",
              text: "Send customers a link, get structured testimonials. AI asks follow-up questions so you get specific proof, not vague praise.",
              tag: "Growth",
            },
            {
              icon: Target,
              title: "Customer Ratings",
              text: "Let visitors rate your business directly from your Trust Card. More ratings = higher ranking = more visibility.",
              tag: "Growth",
            },
          ].map((feat, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 card-hover">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald/10">
                    <feat.icon className="w-4 h-4 text-emerald" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-900">{feat.title}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  feat.tag === "Core" ? "bg-emerald/15 text-emerald" :
                  feat.tag === "Marketing" ? "bg-blue-50 text-blue-500" :
                  "bg-purple-50 text-purple-500"
                }`}>{feat.tag}</span>
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed">{feat.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-50 border border-slate-200">
            <Megaphone className="w-5 h-5 text-emerald" />
            <p className="text-[14px] text-slate-700">
              <span className="font-semibold">All of this from the reviews you already have.</span> No new content to create. No ads to run.
            </p>
          </div>
        </div>
      </section>

      {/* ── The Conversion Math ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-12">
            Why This Works (The Numbers)
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { value: "270%", label: "more conversions", detail: "when reviews are visible on product pages", source: "Spiegel Research, Northwestern", icon: TrendingUp },
              { value: "62%", label: "more revenue per visitor", detail: "when social proof is displayed on-site", source: "Bazaarvoice", icon: BarChart3 },
              { value: "93%", label: "of buyers", detail: "say reviews directly impact their purchase", source: "Podium", icon: Users },
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
            For handmade products, trust is the only thing between "nice" and "bought."
            Your 24,500 reviews are your best marketing asset. They just need a system to work through.
          </p>
        </div>
      </section>

      {/* ── Real Reviews + AI Hook ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[13px] text-emerald font-semibold uppercase tracking-wider mb-3">AI-powered review marketing</p>
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            Your Best Reviews. The AI-Extracted Money Line.
          </h2>
          <p className="text-[15px] text-slate-500 mt-4 max-w-lg mx-auto">
            Every review has one sentence that does more work than the rest. Our AI finds it.
            The <span className="text-emerald font-semibold">highlighted text</span> is what we'd use in your marketing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {REVIEWS.map((review, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 card-hover">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="flex items-center gap-1 text-[10px] text-emerald font-medium">
                  <Shield className="w-3 h-3" /> Verified on Etsy
                </span>
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
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-[10px] text-pink-600 font-bold">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-700">{review.author}</p>
                  <p className="text-[10px] text-slate-400">{review.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-[13px] text-emerald font-semibold uppercase tracking-wider mb-3">Setup</p>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
              From Zero to Full Marketing System in 30 Minutes
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Import,
                title: "We Import Everything",
                text: "Your Etsy reviews, Amazon ratings, press mentions. We pull it all in automatically. You just send us the links.",
              },
              {
                step: "2",
                icon: Sparkles,
                title: "AI Builds Your Assets",
                text: "Our AI extracts the best quotes, creates your Trust Card, generates SEO schema, and prepares your Shopify widgets.",
              },
              {
                step: "3",
                icon: Zap,
                title: "Your System Goes Live",
                text: "Trust Card live. Shopify widgets embedded. Google indexing your reviews. Analytics tracking. All working while you sleep.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald/15 mx-auto">
                  <item.icon className="w-6 h-6 text-emerald" />
                </div>
                <span className="text-[11px] font-bold text-emerald uppercase tracking-widest">
                  Step {item.step}
                </span>
                <h3 className="text-[16px] font-semibold text-white">{item.title}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Demo ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-[13px] text-emerald font-semibold uppercase tracking-wider mb-3">Live preview</p>
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            We Already Built It for You
          </h2>
          <p className="text-[15px] text-slate-500 mt-4 max-w-md mx-auto">
            This is a real, working Trust Card for TheRitzyRose. Your logo, your reviews, your brand colors. Live right now.
          </p>
        </div>
        <div className="flex justify-center">
          <IPhoneMockup src="https://proofpst.com/theritzyrose" />
        </div>
        <p className="text-[12px] text-slate-400 text-center mt-6">
          Try it yourself: <a href="https://proofpst.com/theritzyrose" target="_blank" rel="noopener noreferrer" className="text-emerald hover:underline">proofpst.com/theritzyrose</a>
        </p>
      </section>

      {/* ── Press ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
              Press Coverage That Sells
            </h2>
            <p className="text-[15px] text-slate-500 mt-4 max-w-lg mx-auto">
              Most brands spend years trying to get featured anywhere. TheRitzyRose has been in the biggest
              publications in the world. That credibility should be working for you 24/7, not buried in an archive.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {PRESS.map((name, i) => (
              <span key={i} className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-[13px] font-medium text-slate-700 shadow-sm">
                {name}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-emerald/5 border border-emerald/20 p-6 text-center">
            <p className="text-[15px] text-slate-700">
              <span className="font-semibold">NYT + GMA + Martha Stewart + Miranda Lambert + 24,500 reviews</span>
            </p>
            <p className="text-[14px] text-slate-500 mt-1">
              All visible on your Trust Card and Shopify site. This is advertising you don't have to pay for.
            </p>
          </div>
        </div>
      </section>

      {/* ── What You Get vs What You Pay ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            The Value of This System
          </h2>
          <p className="text-[15px] text-slate-500 mt-4 max-w-lg mx-auto">
            Compare what you'd pay building this yourself vs. what ProofPost delivers out of the box.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-3 bg-slate-50 px-5 py-3 text-[12px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>What you get</span>
            <span className="text-center">DIY cost</span>
            <span className="text-center">With ProofPost</span>
          </div>
          {[
            { feature: "Review import (Etsy + Amazon)", diy: "$500+/setup", pp: "Included" },
            { feature: "Branded proof page (Trust Card)", diy: "$2,000+ website", pp: "Included" },
            { feature: "AI review analysis", diy: "Not available", pp: "Included" },
            { feature: "SEO schema markup", diy: "$300+ developer", pp: "Included" },
            { feature: "Shopify review widgets", diy: "$30-50/mo app", pp: "Included" },
            { feature: "Analytics dashboard", diy: "$100+/mo tools", pp: "Included" },
            { feature: "Review collection forms", diy: "$50/mo tool", pp: "Included" },
            { feature: "Ongoing updates + support", diy: "Your time", pp: "Included" },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-3 px-5 py-3 border-t border-slate-100 text-[13px]">
              <span className="text-slate-700 font-medium">{row.feature}</span>
              <span className="text-center text-slate-400">{row.diy}</span>
              <span className="text-center text-emerald font-semibold">{row.pp}</span>
            </div>
          ))}
          <div className="grid grid-cols-3 px-5 py-4 border-t-2 border-slate-200 bg-slate-50">
            <span className="text-[14px] font-bold text-slate-900">Total</span>
            <span className="text-center text-[14px] font-bold text-slate-400">$3,000+/year</span>
            <span className="text-center text-[14px] font-bold text-emerald">$39/month</span>
          </div>
        </div>
      </section>

      {/* ── The Trial ── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-10">
            <p className="text-[13px] text-emerald font-semibold uppercase tracking-wider mb-3">Getting started</p>
            <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
              14-Day Trial. No Risk. Just Results.
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { label: "Trial", value: "14 days, full access to the entire marketing system" },
              { label: "Setup", value: "We handle everything. Import, Trust Card, widgets, SEO. You just approve." },
              { label: "What we track", value: "Trust Card views, widget impressions, click-through rates, Google indexing status" },
              { label: "After 14 days", value: "If the numbers work, Pro plan is $39/mo. If not, you walk away with zero cost." },
            ].map((row, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-6 rounded-xl bg-white/5 border border-white/10 px-5 py-4">
                <span className="text-[13px] font-bold text-emerald uppercase tracking-wider min-w-[120px]">
                  {row.label}
                </span>
                <span className="text-[14px] text-slate-300">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next Steps ── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-10">
          Next Steps
        </h2>
        <div className="space-y-4">
          {[
            "We finalize TheRitzyRose's Trust Card together (already 80% done)",
            "Import your full review catalog from Etsy and Amazon",
            "Embed review widgets on your top Shopify product pages",
            "Activate SEO schema for Google star ratings",
            "Track performance for 14 days",
            "Review the data together and decide on next steps",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4 rounded-xl bg-white border border-slate-200 px-5 py-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald/10 text-[14px] font-bold text-emerald flex-shrink-0">
                {i + 1}
              </span>
              <p className="text-[14px] text-slate-700 pt-1">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-6">
          <p className="text-[13px] text-emerald font-semibold uppercase tracking-wider">
            The New Standard for Business Advertising
          </p>
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
            Your customers already wrote your best marketing.
            <br />
            <span className="text-emerald">Let's put it to work.</span>
          </h2>
          <p className="text-[15px] text-slate-400 max-w-md mx-auto">
            24,500 five-star reviews. NYT press. A Miranda Lambert moment.
            All of it, working for you, 24/7. That's what ProofPost builds.
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
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> Full system access</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> Cancel anytime</span>
          </div>

          <div className="pt-10 border-t border-white/10 mt-10">
            <p className="text-[13px] text-slate-500">
              <span className="font-semibold text-slate-400">ProofPost</span> is the all-in-one marketing system for businesses with great reviews.
            </p>
            <p className="text-[12px] text-slate-600 mt-3">
              <a href="https://proofpst.com" className="text-emerald hover:underline">proofpst.com</a>
              {" | "}
              <a href="https://proofpst.com/theritzyrose" className="text-emerald hover:underline">See TheRitzyRose demo</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
