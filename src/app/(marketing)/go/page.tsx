import Link from "next/link";
import { StickyMobileCTA } from "../sticky-mobile-cta";
import { IPhoneMockup } from "./iphone-mockup";
import { MacbookMockup } from "./macbook-mockup";
import { PricingSection } from "../pricing-section";
import {
  ArrowRight,
  Check,
  Clock,
  Shield,
  Star,
  Sparkles,
  Search,
  BarChart3,
  Import,
  Zap,
  MessageCircle,
  Globe,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofPost — The Trust Card. Linktree showed your links. This sells for you.",
  description:
    "Your Linktree lists links. Your Trust Card shows proof. Import reviews from Google, Amazon, Etsy. AI finds the sentence that converts. Live in 60 seconds.",
};

export default function GoPage() {
  return (
    <>
      <StickyMobileCTA label="Get Your Trust Card" />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-[11px] font-semibold text-emerald uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                The new standard for 2026
              </span>
              <h1
                className="font-bold text-slate-900 tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
              >
                Linktree showed your links.
                <br />
                <span className="text-emerald">Your Trust Card sells for you.</span>
              </h1>
              <p className="text-[17px] text-slate-500 leading-relaxed max-w-lg">
                People stopped clicking link lists. They want proof. Your Trust Card
                pulls reviews from Google, Amazon, Etsy, and shows the one sentence
                that makes people buy. One link, in your bio, that actually converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 h-13 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
                >
                  Get Your Trust Card Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 60-second setup</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Verified reviews</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> No website needed</span>
                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> 14 days free</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <IPhoneMockup src="https://proofpst.com/lio" />
            </div>
          </div>
        </div>
      </section>

      {/* ── The Shift ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
            Links don't sell. Proof does.
          </h2>
          <p className="text-[15px] text-slate-500 text-center mb-12 max-w-lg mx-auto">
            In 2024, everyone got a Linktree. In 2026, everyone needs a Trust Card.
            Because your customers don't want another list of links. They want to
            know why they should trust you.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                emoji: "📱",
                title: "Your bio link is a dead end",
                text: "You send people to a Linktree. They see 5 links, click maybe one, and forget you. No reviews, no proof, no reason to buy.",
              },
              {
                emoji: "📄",
                title: "Screenshots look fake",
                text: "You screenshot a Google review, crop it in Canva, paste it in a DM. It takes 20 minutes and looks like you made it up. Because anyone can.",
              },
              {
                emoji: "💸",
                title: "Your competitor looks more legit",
                text: "Same service, higher price, but they have a clean proof page with verified reviews. You lost on perception, not quality. That one stings.",
              },
            ].map((card, i) => (
              <div key={i} className="rounded-xl bg-white border border-slate-200 p-6 space-y-3">
                <span className="text-2xl">{card.emoji}</span>
                <h3 className="text-[15px] font-semibold text-slate-900">{card.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Linktree vs Trust Card ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Same spot in your bio. Very different results.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-md mx-auto">
          One lists your links. The other closes your deals.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Linktree */}
          <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-6 space-y-4">
            <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold text-red-500 bg-red-100 uppercase tracking-wider">
              Linktree
            </span>
            <div className="space-y-2.5">
              {[
                { label: "What visitors see", value: "A list of links" },
                { label: "Reviews", value: "None" },
                { label: "Trust signals", value: "None" },
                { label: "SEO value", value: "Zero (noindex)" },
                { label: "Converts?", value: "Sends clicks, not customers" },
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
            <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold text-emerald bg-emerald/15 uppercase tracking-wider">
              Trust Card
            </span>
            <div className="space-y-2.5">
              {[
                { label: "What visitors see", value: "Your proof, your story" },
                { label: "Reviews", value: "Verified from Google, Amazon, Etsy" },
                { label: "Trust signals", value: "Badges, ratings, press mentions" },
                { label: "SEO value", value: "Google rich snippets with stars" },
                { label: "Converts?", value: "AI highlights the line that sells" },
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
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight text-center mb-12">
            Live in 60 seconds. Not exaggerating.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Import,
                title: "Import your reviews",
                text: "Google, Amazon, Etsy, G2, LinkedIn. Paste a URL or upload screenshots. We pull everything in.",
              },
              {
                step: "2",
                icon: Sparkles,
                title: "AI finds the money line",
                text: "Every review has one sentence that converts. Our AI finds it and highlights it. That's your new marketing.",
              },
              {
                step: "3",
                icon: Zap,
                title: "Drop it in your bio",
                text: "Your Trust Card is live at proofpst.com/yourname. Replace your Linktree. Every visitor now sees proof, not a menu.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/15 mx-auto">
                  <item.icon className="w-5 h-5 text-emerald" />
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

      {/* ── Desktop Preview ── */}
      <section className="px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
          This is what your customers see.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-10 max-w-md mx-auto">
          Not a list of links. A reason to buy.
        </p>

        {/* Desktop: MacBook */}
        <div className="hidden md:block">
          <MacbookMockup src="https://proofpst.com/lio" />
        </div>

        {/* Mobile: iPhone */}
        <div className="flex md:hidden justify-center">
          <IPhoneMockup src="https://proofpst.com/lio" />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
          What you get. No fluff.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-md mx-auto">
          Everything a Linktree doesn't do. And a few things nobody else does either.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              icon: Shield,
              title: "Trust Card",
              text: "Your proof page at proofpst.com/yourname. Verified reviews, press mentions, social links. One link that actually converts.",
              badge: null,
            },
            {
              icon: Sparkles,
              title: "AI Hook Extraction",
              text: "Every review has one sentence that does the selling. Our AI finds it. You stop guessing which quote to use.",
              badge: null,
            },
            {
              icon: Import,
              title: "Amazon & Etsy Import",
              text: "Pull reviews from Amazon and Etsy. The platform logo shows up on your card. Borrowed authority that you already earned.",
              badge: "Pro",
            },
            {
              icon: Search,
              title: "Google SEO",
              text: "Your Trust Card gets indexed with rich snippets. Star ratings in Google search results. Free traffic, no ads.",
              badge: "Pro",
            },
            {
              icon: BarChart3,
              title: "Analytics",
              text: "Who viewed your card, which reviews get attention, what converts. Real data instead of hoping for the best.",
              badge: "Starter+",
            },
            {
              icon: MessageCircle,
              title: "Review Collection",
              text: "Send a link, get back a structured testimonial. AI asks follow-up questions so you get specific proof, not \"great to work with.\"",
              badge: null,
            },
          ].map((feat, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 card-hover">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald/10">
                  <feat.icon className="w-4 h-4 text-emerald" />
                </div>
                <h3 className="text-[15px] font-semibold text-slate-900">{feat.title}</h3>
                {feat.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald/15 text-emerald">
                    {feat.badge}
                  </span>
                )}
              </div>
              <p className="text-[13px] text-slate-500 leading-relaxed">{feat.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <PricingSection />

      {/* ── Objection Killers ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-12">
            Yeah, but...
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                q: "I only have a few reviews.",
                a: "Products with just 5 reviews are 270% more likely to sell (Spiegel Research). You don't need hundreds. You need the right sentence from each one. That's what the AI does.",
              },
              {
                q: "I already have a Linktree.",
                a: "Keep it if you want. But ask yourself: does it actually help you close deals? Or does it just organize your links? Your Trust Card goes in the same spot, but it sells for you.",
              },
              {
                q: "Do I need another subscription?",
                a: "14 days free, plans from $7/month (annual). That's less than one coffee a week. And unlike coffee, this actually helps you make money while you sleep.",
              },
              {
                q: "What about Senja or Testimonial.to?",
                a: "They show your full reviews in static grids ($29-50/mo). We find the one sentence that converts, highlight it, and add Amazon/Etsy import. For $9/mo. They're review walls. We're a sales tool.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl bg-white border border-slate-200 p-6 space-y-3">
                <h3 className="text-[15px] font-semibold text-slate-900">&ldquo;{item.q}&rdquo;</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-12">
          Questions
        </h2>
        <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {[
            {
              q: "What is a Trust Card?",
              a: "Your verified proof page at proofpst.com/yourname. It shows your best reviews with AI-highlighted converting sentences, source badges (Google, Amazon, Etsy), and your branding. One link instead of screenshots.",
            },
            {
              q: "Can I import reviews from Amazon and Etsy?",
              a: "Yes. On the Pro plan, paste your product URL and we pull your rating and reviews. The platform logo appears on your Trust Card. Borrowed authority, zero effort.",
            },
            {
              q: "What happens after the 14-day trial?",
              a: "Your Trust Card stays live with 5 reviews and a watermark (free tier). To keep unlimited reviews, no watermark, and premium features, upgrade to Starter ($9/mo) or Pro ($19/mo).",
            },
            {
              q: "Do I need a website?",
              a: "No. That's kind of the point. Your Trust Card lives at proofpst.com/yourname. Put it in your bio, DMs, emails, proposals. No website, no domain, no hosting.",
            },
            {
              q: "Can I cancel anytime?",
              a: "One click. No calls, no hoops. Your Trust Card reverts to free tier.",
            },
            {
              q: "Why not just use Linktree?",
              a: "Linktree lists your links. It doesn't show reviews, doesn't have verified badges, doesn't get indexed by Google, and doesn't help anyone decide to buy from you. Different tools, different jobs. Linktree organizes. Trust Card converts.",
            },
          ].map((faq, i) => (
            <details key={i} className="group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors list-none">
                <span className="text-[14px] font-medium text-slate-700 pr-4">{faq.q}</span>
                <span className="text-slate-300 text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-[13px] text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-6">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
            Your Linktree lists links.
            <br />
            <span className="text-emerald">Your Trust Card closes deals.</span>
          </h2>
          <p className="text-[15px] text-slate-400 max-w-md mx-auto">
            Same spot in your bio. Very different results.
            14 days free, 60 seconds to set up. The only risk is staying invisible.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 h-13 px-10 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Get Your Trust Card Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> 60-second setup</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> Cancel anytime</span>
          </div>
        </div>
      </section>
    </>
  );
}
