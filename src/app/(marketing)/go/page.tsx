import Link from "next/link";
import { StickyMobileCTA } from "../sticky-mobile-cta";
import { IPhoneMockup } from "./iphone-mockup";
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Sparkles,
  Check,
  Gift,
  Zap,
  BadgeCheck,
  MessageSquareText,
  Send,
  MapPin,
  Clock,
  DollarSign,
  CreditCard,
} from "lucide-react";

const valueStack = [
  {
    label: "CORE",
    icon: Star,
    title: "Your ProofPost Trust Card",
    value: "$497",
    featured: true,
    bullets: [
      "Premium verified proof page at proofpst.com/yourname",
      "Live in 60 seconds — no code, no designer, no hosting",
      "Glassmorphism design, mobile-first, animated carousel",
      "Import reviews from anywhere (Google, G2, screenshots, DMs)",
      "Clean URL you can drop in any DM or bio",
    ],
  },
  {
    label: "INCLUDED",
    icon: Zap,
    title: "AI Hook Extraction",
    value: "$197",
    featured: false,
    bullets: [
      "AI reads every review and pulls the one sentence that sells",
      "Turns bland \"great to work with\" into specific, compelling proof",
      "You don't pick — the algorithm finds your money line",
    ],
  },
  {
    label: "INCLUDED",
    icon: BadgeCheck,
    title: "Verified Trust Badges",
    value: "$149",
    featured: false,
    bullets: [
      "Every testimonial displays a Verified badge with source attribution",
      "Prospects know it's real — not fabricated, not a screenshot",
      "Can't be faked. Can't be DIY'd. Built into every Trust Card",
    ],
  },
  {
    label: "BONUS",
    icon: MessageSquareText,
    title: "Testimonial Request Kit",
    value: "$97",
    featured: false,
    bullets: [
      "3 email templates + 2 DM scripts to get 5 reviews this week",
      "The \"featured client\" reframe — clients say yes because it benefits them",
      "Exact follow-up message if they don't respond in 48 hours",
    ],
  },
  {
    label: "BONUS",
    icon: Send,
    title: "DM Drop Playbook",
    value: "$67",
    featured: false,
    bullets: [
      "4 copy-paste scripts: cold DM, warm reply, \"show me results,\" proposal follow-up",
      "Share your proof naturally in any conversation — without feeling salesy",
    ],
  },
  {
    label: "BONUS",
    icon: MapPin,
    title: "7 Trust Touchpoints Checklist",
    value: "$47",
    featured: false,
    bullets: [
      "The 7 places your Trust Card link should live — so proof works 24/7",
      "IG bio, email signature, Calendly, LinkedIn, and 3 more most people miss",
    ],
  },
];

const objections = [
  {
    icon: MessageSquareText,
    objection: "I don't have testimonials yet",
    answer:
      "The Testimonial Request Kit gets you 5 this week. We give you the exact scripts.",
  },
  {
    icon: Clock,
    objection: "I'm not technical",
    answer:
      "60-second setup. Zero code. If you can copy-paste a link, you can use ProofPost.",
  },
  {
    icon: DollarSign,
    objection: "It's too expensive",
    answer:
      "One closed $3K client = 43x ROI. This pays for itself with a single deal.",
  },
  {
    icon: CreditCard,
    objection: "I don't want another subscription",
    answer:
      "One payment. Forever. No monthly fees. No annual renewal. It's yours for life.",
  },
];

const faqs = [
  {
    q: "What is The DM Closer Kit?",
    a: "It's a bundle: your own verified Trust Card page, AI-powered hook extraction, verified badges, plus 3 bonus kits (Testimonial Request Kit, DM Drop Playbook, and 7 Trust Touchpoints). Everything you need to close high-ticket clients from DMs.",
  },
  {
    q: "What is a Trust Card?",
    a: "A standalone page that shows your verified reviews, bio, and a CTA button — hosted at proofpst.com/yourname. Think of it as a credibility page you drop in any DM, bio, or email signature. No website needed.",
  },
  {
    q: "Where do the reviews come from?",
    a: "Import automatically from Google Business and G2. Or upload manually: WhatsApp screenshots, DMs, video testimonials — anything. Every review gets a verified badge.",
  },
  {
    q: "What does \"Lifetime Deal\" mean?",
    a: "Pay $69 once. Use it forever. No monthly fees. No yearly renewal. All future features included. We're offering this to early adopters only — regular price will be $29/mo.",
  },
  {
    q: "Do I need a website?",
    a: "No. Your Trust Card is a standalone page hosted by us. No coding, no hosting, no domain needed. It works on its own.",
  },
  {
    q: "What if I don't have enough testimonials?",
    a: "The Testimonial Request Kit (included as a bonus) gives you 3 email templates and 2 DM scripts designed to get you 5 testimonials this week. Most people have happy clients — they just haven't asked the right way.",
  },
];

export default function GoLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ============ MINIMAL HEADER ============ */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
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
            Get The DM Closer Kit
          </Link>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.06)_0%,_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 sm:pt-24 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div className="space-y-6 min-w-0">
              <h1 className="font-bold text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.15] text-slate-900 tracking-tight">
                You Charge Premium Prices.{" "}
                <span className="text-emerald hand-underline">
                  Your Proof Should Match.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-lg leading-relaxed">
                The DM Closer Kit gives you a verified proof page, AI-powered
                hooks, and done-for-you templates — so your next &quot;show me
                results&quot; DM ends with &quot;when can we start?&quot;
              </p>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-base font-semibold rounded-full transition-colors duration-200 glow-emerald"
                >
                  Get The DM Closer Kit — $69
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-sm text-slate-400">
                One payment. Lifetime access. 60-second setup.
              </p>

              {/* Trust line */}
              <div className="flex items-center gap-3 pt-2">
                <ShieldCheck
                  className="w-4 h-4 text-emerald flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[13px] text-slate-500">
                  Verified reviews. No website needed. Set up in 60 seconds.
                </span>
              </div>
            </div>

            {/* Right: iPhone Mockup (desktop) */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-8 bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_transparent_70%)] rounded-full blur-2xl" />
                <IPhoneMockup src="/lio" />
              </div>
            </div>
          </div>

          {/* Mobile: Compact card preview below hero text */}
          <div className="lg:hidden mt-10">
            <div className="relative mx-auto max-w-[280px]">
              <div className="absolute -inset-4 bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_0%,_transparent_70%)] rounded-3xl blur-xl" />
              <div className="relative bg-gray-900 rounded-[2rem] p-2 shadow-2xl shadow-slate-300/50">
                <div
                  className="rounded-[1.5rem] overflow-hidden bg-white relative"
                  style={{ height: 420 }}
                >
                  <iframe
                    src="/lio"
                    title="Trust Card Preview"
                    className="absolute top-0 left-0 border-none"
                    style={{
                      width: "375px",
                      height: "812px",
                      transform: "scale(0.7)",
                      transformOrigin: "top left",
                      pointerEvents: "none",
                    }}
                    loading="lazy"
                    scrolling="no"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROBLEM / PAIN AGITATION ============ */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
            Sound familiar?
          </h2>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                emoji: "\uD83D\uDCC4",
                quote:
                  "\"I pitch in DMs. They ask for proof. I send a Google Doc.\"",
                desc: "While your competitor drops a polished proof page that makes $3K feel like a steal. Same skill. Different packaging. Different close rate.",
              },
              {
                emoji: "\uD83D\uDCCB",
                quote:
                  "\"My Notion page looks like a homework assignment, not a $3K service.\"",
                desc: "You spent months getting results. Your proof page took 5 minutes. Prospects notice the gap between your pitch and your presentation.",
              },
              {
                emoji: "\uD83D\uDCB8",
                quote:
                  "\"I KNOW I'm losing deals because my proof doesn't match my price.\"",
                desc: "That prospect who ghosted after \"show me results\"? They didn't leave because you're not good. They left because your proof didn't match your pitch.",
              },
            ].map((card) => (
              <div
                key={card.quote}
                className="card-hover rounded-xl bg-white border border-slate-200 p-7 space-y-4"
              >
                <span className="text-[28px]">{card.emoji}</span>
                <p className="text-[15px] font-semibold text-slate-900 leading-snug">
                  {card.quote}
                </p>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUE STACK ============ */}
      <section className="bg-snow py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center space-y-4 mb-14">
            <span className="text-[11px] font-bold text-emerald uppercase tracking-wider">
              THE DM CLOSER KIT
            </span>
            <h2 className="text-[36px] font-bold text-slate-900 tracking-tight">
              Here&apos;s Everything You Get
            </h2>
          </div>

          <div className="space-y-5">
            {valueStack.map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl p-8 ${
                  item.featured
                    ? "border-2 border-emerald/30 bg-emerald/5"
                    : "border border-slate-200 bg-white card-hover"
                }`}
              >
                {/* Top row: badge + value */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald/10">
                      <item.icon
                        className="w-5 h-5 text-emerald-dark"
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        item.label === "BONUS"
                          ? "text-amber-600 bg-amber-50"
                          : "text-emerald bg-emerald/10"
                      }`}
                    >
                      {item.label === "BONUS" && (
                        <Gift
                          className="w-3 h-3 inline-block mr-1 -mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[14px] font-semibold text-slate-400">
                    Value: {item.value}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-bold text-slate-900 mb-4">
                  {item.title}
                </h3>

                {/* Bullets */}
                <div className="space-y-2.5">
                  {item.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-[14px] text-slate-600 leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICE REVEAL ============ */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-[11px] font-bold text-emerald uppercase tracking-wider">
            TOTAL VALUE
          </span>
          <p className="text-[48px] sm:text-[56px] font-bold text-slate-500 line-through tabular-nums mt-2">
            $1,054
          </p>

          <div className="mt-8">
            <span className="text-[13px] font-semibold text-slate-400 uppercase tracking-wider">
              YOUR PRICE
            </span>
            <p className="text-[72px] sm:text-[96px] font-bold text-white tabular-nums leading-none mt-2">
              $69
            </p>
            <p className="text-[20px] font-semibold text-emerald mt-3">
              One time. Forever.
            </p>
            <p className="text-[15px] text-slate-400 mt-2 max-w-md mx-auto">
              Not $69/month. One payment. Your Trust Card is yours for life. All
              future features included.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Get The DM Closer Kit — $69
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-[13px] text-slate-500 mt-4">
            60-second setup. Lifetime access. No recurring fees.
          </p>
        </div>
      </section>

      {/* ============ GUARANTEE ============ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
            Zero risk. Two guarantees.
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* 5-Review Promise */}
            <div className="rounded-2xl border-2 border-emerald/20 bg-emerald/5 p-8 space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/10">
                <ShieldCheck
                  className="w-6 h-6 text-emerald-dark"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-[18px] font-bold text-slate-900">
                The 5-Review Promise
              </h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                Import 5 reviews. Share your Trust Card in 3 conversations. If
                your prospects don&apos;t react differently — if nobody treats
                you more seriously — email us for a full refund. No hoops. No
                forms. No guilt trip.
              </p>
            </div>

            {/* Founders Guarantee */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 space-y-4 card-hover">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald/10">
                <Sparkles
                  className="w-6 h-6 text-emerald-dark"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-[18px] font-bold text-slate-900">
                Founders Guarantee{" "}
                <span className="text-[12px] font-semibold text-emerald">
                  (First 100)
                </span>
              </h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                If your Trust Card isn&apos;t converting, we&apos;ll personally
                rewrite your hooks, rearrange your layout, and optimize it until
                it works. You paid $69 — we&apos;ll put in $500 worth of work if
                that&apos;s what it takes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OBJECTION KILLERS ============ */}
      <section className="bg-snow py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-12">
            Still on the fence?
          </h2>

          <div className="grid sm:grid-cols-2 gap-5">
            {objections.map((item) => (
              <div
                key={item.objection}
                className="card-hover rounded-xl bg-white border border-slate-200 p-6 space-y-3"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald/10">
                  <item.icon
                    className="w-5 h-5 text-emerald-dark"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[15px] font-semibold text-slate-900 italic">
                  &quot;{item.objection}&quot;
                </p>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-white py-20">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight text-center mb-8">
            Questions? Answers.
          </h2>
          <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden bg-white">
            {faqs.map((faq, i) => (
              <details key={i} className="group">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-50/50 transition-colors list-none">
                  <span className="text-[14px] font-semibold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <span className="text-slate-300 group-open:rotate-45 transition-transform text-lg flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-4 -mt-1 text-[13px] text-slate-500 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[36px] font-bold text-white tracking-tight">
            Other ghostwriters are already building their proof pages.
          </h2>
          <p className="mt-4 text-[17px] text-slate-400 max-w-lg mx-auto leading-relaxed">
            The question isn&apos;t whether you need this. It&apos;s whether
            you&apos;ll have it before your next &quot;show me results&quot; DM
            — or after you lose that deal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 h-14 px-10 bg-emerald hover:bg-emerald-dark text-white text-[16px] font-semibold rounded-full transition-colors duration-200 glow-emerald"
            >
              Get The DM Closer Kit — $69
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-[13px] text-slate-500 mt-4">
            One payment. Lifetime access. 60-second setup.
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA label="Get The DM Closer Kit — $69" />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
                <Star
                  className="w-3 h-3 text-white"
                  aria-hidden="true"
                />
              </div>
              <span className="text-[13px] font-semibold text-slate-700">
                ProofPost
              </span>
            </div>
            <p className="text-[12px] text-slate-400">
              &copy; 2026 ProofPost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
