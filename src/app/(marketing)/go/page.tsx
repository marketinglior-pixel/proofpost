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
  title: "ProofPost - Turn Reviews Into Trust. Plans from $19/mo",
  description:
    "Import reviews from Google, Amazon, Etsy. AI extracts the best line. Your Trust Card is live in 60 seconds. Start free, no credit card.",
};

export default function GoPage() {
  return (
    <>
      <StickyMobileCTA label="Start Free - 14 Days" />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1
                className="font-bold text-slate-900 tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
              >
                Your reviews are scattered.
                <br />
                <span className="text-emerald">Your Trust Card fixes that.</span>
              </h1>
              <p className="text-[17px] text-slate-500 leading-relaxed max-w-lg">
                Import reviews from Google, Amazon, Etsy, G2. AI pulls the one sentence
                that converts. Your proof page is live in 60 seconds. Share one link
                instead of ugly screenshots.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 h-13 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
                >
                  Start Free - 14 Days, No Card
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 60-second setup</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Verified reviews</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> No website needed</span>
                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Cancel anytime</span>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <IPhoneMockup src="https://proofpst.com/lio" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
            Sound familiar?
          </h2>
          <p className="text-[15px] text-slate-500 text-center mb-12 max-w-lg mx-auto">
            Your best clients love you. But when a prospect asks for proof,
            you scramble.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                emoji: "📱",
                title: "The DM scramble",
                text: "Prospect asks 'show me results.' You dig through old chats, screenshot a Google review, crop it in Canva. It takes 20 minutes and looks amateur.",
              },
              {
                emoji: "📄",
                title: "The Notion link",
                text: "You send a Google Doc or Notion page with pasted reviews. They click it, see a wall of text, and bounce. You never hear back.",
              },
              {
                emoji: "💸",
                title: "The lost deal",
                text: "Your competitor sent a clean proof page. Same service, higher price, but they looked more established. You lost on perception, not quality.",
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

      {/* ── Before / After ── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
          Same reviews. Different impact.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-md mx-auto">
          One looks like a draft. The other closes deals.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Before */}
          <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-6 space-y-4">
            <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold text-red-500 bg-red-100 uppercase tracking-wider">
              Before
            </span>
            <div className="rounded-lg bg-white border border-slate-200 p-4 space-y-3 font-mono text-[12px] text-slate-500">
              <div className="h-3 w-24 bg-slate-200 rounded" />
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-slate-100 rounded" />
                <div className="h-2 w-5/6 bg-slate-100 rounded" />
                <div className="h-2 w-4/6 bg-slate-100 rounded" />
              </div>
              <div className="border-t border-dashed border-slate-200 pt-3 space-y-1.5">
                <div className="h-2 w-full bg-slate-100 rounded" />
                <div className="h-2 w-3/4 bg-slate-100 rounded" />
              </div>
            </div>
            <p className="text-[13px] text-red-400">
              Google Doc with pasted reviews. No branding, no verification, no trust.
            </p>
          </div>

          {/* After */}
          <div className="rounded-xl border-2 border-emerald/30 bg-emerald/5 p-6 space-y-4">
            <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold text-emerald bg-emerald/15 uppercase tracking-wider">
              After
            </span>
            <div className="rounded-lg bg-navy p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald/20" />
                <div>
                  <div className="h-2.5 w-20 bg-slate-600 rounded" />
                  <div className="h-2 w-14 bg-slate-700 rounded mt-1" />
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-slate-600 rounded" />
                <div className="h-2 w-4/5 bg-slate-600 rounded" />
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Shield className="w-3 h-3 text-emerald" />
                <span className="text-[10px] text-emerald font-medium">Verified on Google</span>
              </div>
            </div>
            <p className="text-[13px] text-emerald">
              Trust Card with verified reviews, AI hooks, branding. One link does the job.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight text-center mb-12">
            Live in 60 seconds. Seriously.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Import,
                title: "Import from anywhere",
                text: "Google, Amazon, Etsy, G2, LinkedIn. Paste a URL or upload screenshots. We pull the reviews.",
              },
              {
                step: "2",
                icon: Sparkles,
                title: "AI extracts the hook",
                text: "Our AI reads every review and pulls the one sentence that makes prospects say 'I need this.'",
              },
              {
                step: "3",
                icon: Zap,
                title: "Share your Trust Card",
                text: "Your proof page is live at proofpst.com/yourname. Drop it in DMs, emails, proposals. Done.",
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
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
          See It in Action
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-10 max-w-md mx-auto">
          Your Trust Card. Live on desktop. Ready to share.
        </p>

        {/* Desktop: MacBook */}
        <div className="hidden md:block macbook-container" style={{ "--macbook-scale": "0.82" } as React.CSSProperties}>
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
          Everything you need to turn reviews into revenue
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-md mx-auto">
          Not just a proof page. A marketing system.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              icon: Shield,
              title: "Trust Card",
              text: "Premium proof page at proofpst.com/yourname. Glassmorphism design, animated carousel, mobile-first. No website or developer needed.",
              badge: null,
            },
            {
              icon: Sparkles,
              title: "AI Hook Extraction",
              text: "Our AI reads every review and finds the one line that converts. Up to 3 variants on Pro for A/B testing.",
              badge: null,
            },
            {
              icon: Import,
              title: "Amazon & Etsy Import",
              text: "Pull reviews from Amazon and Etsy into your Trust Card. Show '4.8 stars on Amazon' with the logo. Borrowed authority, instant trust.",
              badge: "Pro",
            },
            {
              icon: Search,
              title: "SEO & Google Visibility",
              text: "Trust Card pages are indexed by Google with rich snippets. Your reviews help you rank. Prospects find you, not just your competitors.",
              badge: "Pro",
            },
            {
              icon: BarChart3,
              title: "Analytics Dashboard",
              text: "See who views your Trust Card, which reviews get attention, and how your proof converts. Data, not guessing.",
              badge: "Starter+",
            },
            {
              icon: MessageCircle,
              title: "Collection Forms",
              text: "Send a link, get structured testimonials. AI asks follow-up questions so you get specific proof, not vague praise.",
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
            Still thinking about it?
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                q: "I don't have many testimonials yet.",
                a: "Products with just 5 reviews are 270% more likely to sell (Spiegel Research). You don't need hundreds. You need to get more out of what you have. Start with what you've got.",
              },
              {
                q: "I'm not technical.",
                a: "If you can paste a link, you can use ProofPost. No code, no design skills, no developer. 60 seconds from signup to live Trust Card. We tested it.",
              },
              {
                q: "Do I really need another subscription?",
                a: "Start with 14 days free. Plans from $12/month (annual). That's less than one coffee a week. And unlike coffee, this actually helps you close deals.",
              },
              {
                q: "How is this different from Senja?",
                a: "Senja shows your full reviews in static grids ($29/mo). ProofPost AI finds the one sentence that converts, animates it, and costs $19/mo. Plus we import from Amazon and Etsy. They don't.",
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
              a: "A Trust Card is your verified proof page at proofpst.com/yourname. It shows your best reviews in an animated carousel with source badges (Google, Amazon, Etsy). Share one link instead of screenshots.",
            },
            {
              q: "Can I import reviews from Amazon and Etsy?",
              a: "Yes. On Pro and Business plans, paste your Amazon or Etsy product URL and we pull your rating and reviews. The platform logo appears on your Trust Card for instant credibility.",
            },
            {
              q: "What happens after the 14-day trial?",
              a: "Your Trust Card stays live with 5 reviews and a watermark (free tier). To keep unlimited reviews, no watermark, and premium features, upgrade to Starter ($19/mo), Pro ($39/mo), or Business ($79/mo).",
            },
            {
              q: "Do I need a website?",
              a: "No. Your Trust Card lives at proofpst.com/yourname. Share the link in DMs, emails, proposals, or add it to your bio. No website, domain, or hosting required.",
            },
            {
              q: "Can I cancel anytime?",
              a: "One click. No calls, no hoops, no guilt trips. Your Trust Card reverts to the free tier.",
            },
            {
              q: "What makes ProofPost different from competitors?",
              a: "Three things: (1) AI Hook Extraction finds the converting sentence instead of showing full reviews. (2) Amazon and Etsy import that no competitor offers. (3) Plans from $19/mo vs $29-50/mo for Senja and Testimonial.to.",
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
            Your next prospect will ask for proof.
            <br />
            <span className="text-emerald">Will you be ready?</span>
          </h2>
          <p className="text-[15px] text-slate-400 max-w-md mx-auto">
            14 days free. No credit card. Live Trust Card in 60 seconds.
            <br />
            The only thing you lose by trying is the deals you keep losing without it.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 h-13 px-10 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Create Your Trust Card Free
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
