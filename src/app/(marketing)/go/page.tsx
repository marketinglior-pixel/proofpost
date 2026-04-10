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
  title: "ProofPost | Stop sending screenshots. Send proof.",
  description:
    "When prospects ask 'show me results', send one link. Your Trust Card shows verified reviews with the best line highlighted by AI. Free. 60 seconds. No website needed.",
};

export default function GoPage() {
  return (
    <>
      <StickyMobileCTA label="Create Your Trust Card, Free" />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 text-[11px] font-semibold text-emerald uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Products with 5 reviews convert 270% more · Spiegel Research
              </span>
              <h1
                className="font-bold text-slate-900 tracking-tight leading-[1.1]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}
              >
                &ldquo;Show me results&rdquo;
                <br />
                <span className="text-emerald">Now you have a link for that.</span>
              </h1>
              <p className="text-[17px] text-slate-500 leading-relaxed max-w-lg">
                Stop sending screenshots and Notion pages when prospects ask for proof.
                Get a verified proof page at{" "}
                <span className="font-semibold text-slate-700">proofpst.com/yourname</span>
                {" "}and let AI highlight the sentence that actually closes deals.
                60 seconds. Free. No website needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 h-13 px-8 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
                >
                  Create Your Trust Card, Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-slate-400">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> 60-second setup</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> No credit card required</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> No website needed</span>
                <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Free plan forever</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="lg:hidden">
                <IPhoneMockup src="https://proofpst.com/lio" scale={0.75} />
              </div>
              <div className="hidden lg:block">
                <IPhoneMockup src="https://proofpst.com/lio" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Urgency Strip ── */}
      <div className="bg-navy/5 border-y border-navy/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-[13px]">
          <span className="text-slate-600 font-medium">It&apos;s 2026.</span>
          <span className="text-slate-500">Your competitor has a proof page. You have a Canva screenshot.</span>
          <Link href="/login" className="text-emerald font-semibold hover:underline whitespace-nowrap">
            Fix that in 60 seconds &rarr;
          </Link>
        </div>
      </div>

      {/* ── The Shift ── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight text-center mb-4">
            You have happy clients. Nobody can tell.
          </h2>
          <p className="text-[15px] text-slate-500 text-center mb-12 max-w-lg mx-auto">
            You charge $3-5K per client. You deliver real results. But when someone
            asks for proof, you scramble. That gap between who you are and who you
            look like? It&apos;s costing you deals every week.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                emoji: "😬",
                title: "The DM moment you dread",
                text: "Prospect says \"show me results.\" You scramble. Send a Notion page, a Google Doc, maybe some cropped screenshots. They go quiet. You probably lost them at \"let me find the link.\"",
              },
              {
                emoji: "🤳",
                title: "Screenshots anyone can fake",
                text: "You screenshot a review, crop it in Canva, paste it in the DM. 20 minutes of work that looks like you made it up. Because in 2026, anyone can.",
              },
              {
                emoji: "💸",
                title: "Your competitor looks more legit",
                text: "Same service. Maybe even higher price. But they drop one link and it shows verified reviews, star ratings, real names. You lost on perception, not skill.",
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
          What you send now vs. what you could send.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-md mx-auto">
          Same DM. Same prospect. Very different outcome.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* What you do now */}
          <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-6 space-y-4">
            <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold text-red-500 bg-red-100 uppercase tracking-wider">
              What you send today
            </span>
            <div className="space-y-2.5">
              {[
                { label: "When asked for proof", value: "\"Let me find the link...\"" },
                { label: "What they see", value: "Notion page / screenshots / Linktree" },
                { label: "Trust level", value: "Low. Anyone can fake this" },
                { label: "Mobile experience", value: "Broken formatting, slow load" },
                { label: "Result", value: "Prospect goes quiet" },
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
              With a Trust Card
            </span>
            <div className="space-y-2.5">
              {[
                { label: "When asked for proof", value: "Drop one link. Done." },
                { label: "What they see", value: "Verified reviews, best line highlighted" },
                { label: "Trust level", value: "High. Source badges, real names" },
                { label: "Mobile experience", value: "Instant load, built for DMs" },
                { label: "Result", value: "\"When can we start?\"" },
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
            <span className="font-semibold">One link. They scroll, they see proof, they decide.</span>
            {" "}
            <span className="font-semibold text-emerald">That&apos;s honestly how simple it is.</span>
          </p>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight text-center mb-3">
            Live in 60 seconds. Seriously.
          </h2>
          <p className="text-[15px] text-slate-400 text-center mb-12 max-w-md mx-auto">
            You&apos;ll spend more time reading this page than setting up your Trust Card.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Import,
                title: "Paste a review",
                text: "From Google, Amazon, Etsy, G2, or just copy-paste from a DM. Takes 10 seconds.",
              },
              {
                step: "2",
                icon: Sparkles,
                title: "AI pulls the line that sells",
                text: "Your client wrote a whole paragraph. But one sentence in there actually closes deals. The AI finds it and highlights it for you.",
              },
              {
                step: "3",
                icon: Zap,
                title: "Drop the link in your next DM",
                text: "proofpst.com/yourname is live. Next time someone asks \"show me results,\" you just send the link. That's it.",
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
          This is what your prospect sees.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-10 max-w-md mx-auto">
          Not a Notion page. Not a screenshot. A reason to hire you.
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
          Everything you need to stop looking amateur.
        </h2>
        <p className="text-[15px] text-slate-500 text-center mb-12 max-w-md mx-auto">
          No website needed. No designer. No developer. Just proof that actually works.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            {
              icon: Shield,
              title: "Your proof page, live in 60 seconds",
              text: "proofpst.com/yourname. Verified reviews, source badges, your branding. Drop it in any DM instead of scrambling for screenshots.",
              badge: null,
            },
            {
              icon: Sparkles,
              title: "AI finds the sentence that closes",
              text: "Your client wrote \"great experience with the whole process.\" Buried in there is \"doubled my revenue in 3 months.\" The AI surfaces it.",
              badge: null,
            },
            {
              icon: Import,
              title: "Import from Amazon & Etsy",
              text: "Selling on marketplaces? Pull those reviews in. The platform logo shows up on your card, so prospects see you're legit on Amazon or Etsy too.",
              badge: "Pro",
            },
            {
              icon: Search,
              title: "Show up on Google with stars",
              text: "Your Trust Card gets indexed with rich snippets. Star ratings in search results. Prospects find your proof before they find you.",
              badge: "Pro",
            },
            {
              icon: BarChart3,
              title: "See who looked at your proof",
              text: "See which prospects actually viewed your card, which reviews get the most attention, and what converts. Real data instead of guessing.",
              badge: "Starter+",
            },
            {
              icon: MessageCircle,
              title: "Collect better testimonials",
              text: "Send clients a link. AI asks follow-up questions so you get \"increased revenue 40%\" instead of \"great to work with.\"",
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
            &ldquo;Yeah, but...&rdquo;
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                q: "I only have 3-4 reviews.",
                a: "Honestly, that's enough. Products with just 5 reviews convert 270% better (Spiegel Research). You don't need hundreds. You need the right sentence from each one, and that's what the AI does. Start with what you have.",
              },
              {
                q: "I already have a Linktree.",
                a: "Does it help you close deals? Or does it just list your links? When a prospect asks \"show me results,\" Linktree has nothing to show. Your Trust Card answers that question in one scroll.",
              },
              {
                q: "I don't want another subscription.",
                a: "The free plan is free forever. 1 Trust Card, 5 reviews, no credit card. And if it helps you close even one extra client at $3-5K, the paid plan ($9/mo) pays for itself in the first hour.",
              },
              {
                q: "Can't I just build this myself?",
                a: "You could. You've been meaning to \"this weekend\" for months. A Notion page, a Carrd site, something. It hasn't happened. This takes 60 seconds and looks better than anything you'd build.",
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
              a: "Your verified proof page at proofpst.com/yourname. It shows your best reviews with the strongest sentence highlighted by AI, source badges from Google, Amazon, or Etsy, and your branding. Basically one link instead of a bunch of screenshots.",
            },
            {
              q: "Can I import reviews from Amazon and Etsy?",
              a: "Yes. On the Pro plan, paste your product URL and we pull your rating and reviews. The platform logo appears on your Trust Card. Borrowed authority, zero effort.",
            },
            {
              q: "What happens after the free trial?",
              a: "Your Trust Card stays live on the free plan. 1 card, 5 reviews, forever. No expiration, no tricks. Upgrade to Starter ($9/mo) or Pro ($19/mo) only if you want more reviews, no watermark, and analytics.",
            },
            {
              q: "Do I need a website?",
              a: "No. That's the whole point. Your Trust Card lives at proofpst.com/yourname. Drop it in DMs, your bio, emails, proposals. No domain, no hosting, no code.",
            },
            {
              q: "Can I cancel anytime?",
              a: "One click. No calls, no hoops. Your Trust Card reverts to the free plan. Your proof stays live.",
            },
            {
              q: "I'm a ghostwriter/coach. Is this for me?",
              a: "It's built for you. You close in DMs, you get asked for proof constantly, and you don't have a website that does this for you. One link that shows verified results, highlighted by AI. That's the whole product.",
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
            Tomorrow, someone will ask
            <br />
            &ldquo;show me results.&rdquo;
          </h2>
          <p className="text-[15px] text-slate-400 max-w-md mx-auto">
            You can send another screenshot. Or you can send a Trust Card.
            <br />
            <span className="text-white font-medium">Free. 60 seconds. No credit card. No reason not to.</span>
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 h-13 px-10 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Create Your Trust Card, Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500">
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> 60-second setup</span>
            <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald" /> Free plan forever</span>
          </div>
        </div>
      </section>
    </>
  );
}
