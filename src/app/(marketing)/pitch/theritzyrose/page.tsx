import Link from "next/link";
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

const REVIEWS = [
  {
    quote:
      "Every single guest asked where I got my reserved signs. They added such a special touch to our ceremony.",
    hookLine: "Every single guest asked",
    author: "Lauren H.",
    context: "Wedding customer",
  },
  {
    quote:
      "Came out perfect, very responsive to my questions. I felt like I was working with a friend, not a vendor.",
    hookLine: "working with a friend, not a vendor",
    author: "Emily W.",
    context: "Custom order",
  },
  {
    quote:
      "These signs are gorgeous. I'm so impressed with how beautiful they turned out. I will definitely be ordering more in the future!",
    hookLine: "I will definitely be ordering more",
    author: "Sarah K.",
    context: "Repeat buyer",
  },
];

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

        <div className="max-w-3xl mx-auto px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 relative text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-[12px] font-semibold text-emerald uppercase tracking-wider mb-8">
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

          <p className="text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto mt-6">
            You have 24,500 five-star reviews on Etsy, but theritzyrose.com shows zero.
            When customers Google you and land on your site, they see great products
            and no proof. So they go to Etsy. And Etsy takes 15%.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
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
      </section>

      {/* ── 2. SOLUTION ── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            ProofPost brings your Etsy reputation to your own site.
          </h2>
          <p className="text-[15px] text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
            We pull your reviews from Etsy, our AI finds the sentence that sells,
            and we put it everywhere it matters: your Shopify pages, Google search results,
            and a branded Trust Card you can share anywhere.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: Import,
              title: "Import reviews",
              text: "Your Etsy and Amazon reviews, pulled in automatically. Verified and synced.",
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
      </section>

      {/* ── 3. DISPLAY ── */}
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

          <div className="macbook-container" style={{ "--macbook-scale": "0.82" } as React.CSSProperties}>
            <MacbookMockup src="https://proofpst.com/theritzyrose" />
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

          {/* Best 3 reviews with AI highlights */}
          <div className="grid sm:grid-cols-3 gap-5 mt-12">
            {REVIEWS.map((review, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[13px] text-slate-700 leading-relaxed">
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
                <p className="text-[11px] text-slate-400">
                  {review.author}, {review.context}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-slate-400 text-center mt-4">
            <span className="text-emerald font-medium">Highlighted</span> = the AI-extracted line we'd use in your marketing
          </p>
        </div>
      </section>

      {/* ── 4. POTENTIAL ── */}
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
              ProofPost costs $39/month. That's $468/year. The ROI is 32x–64x.
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

      {/* ── 5. BENEFITS ── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-10">
          What's included.
        </h2>

        <div className="space-y-4">
          {[
            { icon: Shield, title: "Trust Card", desc: "Branded proof page at proofpst.com/theritzyrose. One link, share everywhere." },
            { icon: Import, title: "Review Import", desc: "Etsy + Amazon reviews pulled in automatically. Verified and synced." },
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
            <span className="font-bold text-emerald">$39/month</span>
            <span className="text-slate-400 mx-2">·</span>
            14-day free trial
            <span className="text-slate-400 mx-2">·</span>
            We handle all setup
          </p>
        </div>
      </section>

      {/* ── 6. FOOTER / CTA ── */}
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
