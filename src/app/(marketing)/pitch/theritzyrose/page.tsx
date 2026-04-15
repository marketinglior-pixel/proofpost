import Link from "next/link";
import { IPhoneMockup } from "../../go/iphone-mockup";
import { MacbookMockup } from "../../go/macbook-mockup";
import { StickyMobileCTA } from "../../sticky-mobile-cta";
import { ArrowRight, Check, Star, Shield, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProofPost x TheRitzyRose | 34,000 Five-Star Reviews. Let's Put Them to Work.",
  description:
    "TheRitzyRose has 34,000+ five-star reviews across Etsy and Amazon, but none show up on theritzyrose.com. We fix that in 30 days.",
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

const STATS = [
  { icon: Star, value: "110,042", label: "Etsy Sales" },
  { icon: Shield, value: "24,517", label: "Etsy Reviews" },
  { icon: Shield, value: "10,000+", label: "Amazon Reviews" },
  { icon: Award, value: "5.0", label: "Average Rating" },
];

const PROCESS_WEEKS = [
  {
    week: 1,
    title: "Audit + Build",
    text: "We go through your reviews on Etsy, Amazon, and Google. Our AI picks out the lines that actually sell. By the end of the week, your Trust Card is live.",
  },
  {
    week: 2,
    title: "Integrate Everywhere",
    text: "We put your proof on your website, in your email signature, on your social bios. Basically anywhere a customer might look before buying. Your reviews start working for you around the clock.",
  },
  {
    week: 3,
    title: "Campaign Launch",
    text: "Got a customer list? We send them a campaign built around your best reviews. No list? We run social and retargeting ads with your Trust Card doing the convincing.",
  },
  {
    week: 4,
    title: "Measure + Report",
    text: "We put together a before-and-after report. Click-through rates, conversion changes, traffic from your proof pages. Real numbers, not vanity metrics.",
  },
];


const PILOT_INCLUDES = [
  "Full review audit across Etsy, Amazon, and Google",
  "Trust Card built and launched at proofpst.com/theritzyrose",
  "Website integration + email signature setup",
  "Marketing campaign strategy and copy",
  "30-day results report with real metrics",
  "Direct access to Lior throughout the pilot",
];

const NEXT_STEPS = [
  "We audit your reviews across Etsy, Amazon, and Google",
  "We build your Trust Card and integrate it everywhere",
  "We launch your marketing campaign",
  "We measure and report the results",
];

export default function TheRitzyRosePitchPage() {
  return (
    <>
      <StickyMobileCTA label="Start Your 30-Day Pilot" />

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
                34,000 five-star reviews.
                <br />
                <span className="text-emerald">Let's put them to work.</span>
              </h1>

              <p className="text-[16px] text-slate-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                You've got 24,517 Etsy reviews, 10,000+ on Amazon, and over
                110,000 sales. That's a lot of trust sitting in places your
                website visitors never see. We turn those reviews into
                something that actually helps you sell more, across your
                site, your emails, and your social.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                {STATS.map((stat, i) => (
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
                  Live Trust Card at proofpst.com/theritzyrose
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
            Your reviews are a gold mine.
            <br />
            <span className="text-emerald">We help you dig.</span>
          </h2>
          <p className="text-[15px] text-slate-500 mt-5 max-w-xl mx-auto leading-relaxed">
            We take your 34,000+ reviews and turn them into things that
            actually sell: proof pages, email campaigns, SEO snippets,
            social content. All built around the words your customers
            already wrote for you.
          </p>
        </div>

        <div className="space-y-3 mb-10">
          {[
            {
              title: "More than a widget",
              text: "Most review tools stop at \"embed reviews on your site.\" We start there, but then we build campaigns, write copy, and put your proof where buyers actually look.",
            },
            {
              title: "AI-extracted money lines",
              text: "Somewhere in your 34,000+ reviews are the sentences that actually convince people to buy. Our AI finds them (things like \"arrived faster than expected\" or \"better quality than the photo\") and puts them front and center.",
            },
            {
              title: "You don't have to do anything",
              text: "We build it, we launch it, we measure it. You just approve. No learning a new tool, no hiring a marketer, no extra hours. We handle the whole thing.",
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
            Your time investment: close to zero.
          </p>
          <p className="text-[15px] text-slate-700 leading-relaxed max-w-lg mx-auto">
            We already went through your Etsy and Amazon reviews, built
            your Trust Card, and figured out which campaigns would work
            best. All you need to do is say go. We take it from there.
          </p>
        </div>
      </section>

      {/* ───────────────────────────── 3. GOLD MINE ───────────────────────────── */}
      <section className="bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-slate-900 tracking-tight leading-tight">
              Your existing customers are
              <br />
              <span className="text-emerald">your best salespeople.</span>
            </h2>
            <p className="text-[15px] text-slate-500 mt-5 max-w-xl mx-auto leading-relaxed">
              You have 110,000+ people who already bought from you and loved
              it. That's not just a nice number. That's a sales engine waiting
              to be turned on.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {/* Sell TO existing customers */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 text-[11px] font-semibold text-emerald uppercase tracking-wider">
                Sell to existing customers
              </div>
              <h3 className="text-[18px] font-bold text-slate-900">
                Bring them back to buy again
              </h3>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                Someone who bought a wedding sign probably knows someone else
                getting married. A quick email with their favorite review and
                a Trust Card link can bring them back, or send them to a
                friend.
              </p>
              <div className="space-y-2 pt-2">
                {[
                  "Re-engagement email campaigns to past buyers",
                  "\"Share with a friend\" flows built into Trust Card",
                  "Seasonal offers tied to your best-reviewed products",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sell THROUGH existing customers */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 text-[11px] font-semibold text-emerald uppercase tracking-wider">
                Sell through existing customers
              </div>
              <h3 className="text-[18px] font-bold text-slate-900">
                Turn every review into a sales rep
              </h3>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                Every review someone wrote about you is a recommendation
                that works 24/7. Right now those reviews sit on Etsy and
                Amazon. We put them where they actually close deals, on
                your site, in your DMs, in Google search results.
              </p>
              <div className="space-y-2 pt-2">
                {[
                  "Best reviews on your website (where buying happens)",
                  "Trust Card link in every email, DM, and proposal",
                  "SEO indexing so Google shows your stars in search",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tracking + SEO */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* How we track */}
            <div className="rounded-xl bg-navy p-6 space-y-4">
              <h3 className="text-[16px] font-semibold text-white">
                How we know it's working
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                Every Trust Card link is tracked. We see who visits, what
                they click, and where they go next. We can't promise exact
                sales attribution (no one honestly can), but we give you
                real numbers on traffic, clicks, and engagement.
              </p>
              <div className="space-y-2 pt-1">
                {[
                  "Trust Card views, clicks, and time on page",
                  "UTM tracking on every link to your website",
                  "Weekly report during the pilot",
                  "Before/after comparison on overall sales",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO */}
            <div className="rounded-xl bg-navy p-6 space-y-4">
              <h3 className="text-[16px] font-semibold text-white">
                Google works for you too
              </h3>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                When someone Googles "TheRitzyRose reviews," your Trust
                Card page shows up with star ratings right in the search
                results. We set up schema markup so Google knows your
                ratings are real and shows them to buyers.
              </p>
              <div className="space-y-2 pt-1">
                {[
                  "Rich snippets with stars in Google results",
                  "Trust Card pages indexed and crawlable",
                  "AggregateRating schema (already passing validation)",
                  "Organic traffic that grows over time",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                    <span className="text-[13px] text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 4. THE PROCESS ───────────────────────────── */}
      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
              Your 30-day pilot.{" "}
              <span className="text-emerald">Week by week.</span>
            </h2>
            <p className="text-[15px] text-slate-400 mt-3">
              Here's what the first 30 days look like.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_WEEKS.map((w) => (
              <div
                key={w.week}
                className="rounded-xl bg-white/5 border border-white/10 p-6 space-y-3"
              >
                <span className="text-[11px] font-bold text-emerald uppercase tracking-widest">
                  Week {w.week}
                </span>
                <h3 className="text-[16px] font-semibold text-white">{w.title}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 5. WHAT YOU GET ───────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[26px] sm:text-[30px] font-bold text-slate-900 tracking-tight">
            Here's what you actually get.
          </h2>
          <p className="text-[15px] text-slate-500 mt-3">
            Not features. Outcomes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Trust Card */}
          <div className="rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-[15px] font-bold text-slate-900">Trust Card</h3>
            <p className="text-[13px] text-slate-500">One branded page with all your proof. Send it anywhere.</p>
            <div className="space-y-1.5">
              {[
                "Reviews from Etsy, Amazon, and Google on one page",
                "Verified badges so people know they're real",
                "Press mentions (NYT, GMA, Martha Stewart)",
                "One link for DMs, emails, proposals, bios",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Money Lines */}
          <div className="rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-[15px] font-bold text-slate-900">AI Money Lines</h3>
            <p className="text-[13px] text-slate-500">The sentences from your reviews that actually sell. Ready to use.</p>
            <div className="space-y-1.5">
              {[
                "AI picks the most convincing line from each review",
                "Highlighted and ready for emails, ads, social",
                "Copy you don't have to write, your customers wrote it",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-[15px] font-bold text-slate-900">Google SEO</h3>
            <p className="text-[13px] text-slate-500">Stars in Google search results. Organic traffic that grows.</p>
            <div className="space-y-1.5">
              {[
                "Rich snippets with star ratings in search",
                "Trust Card pages indexed and crawlable",
                "Schema markup (yours already passes validation)",
                "More clicks from Google, without paying for ads",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Website Widget */}
          <div className="rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-[15px] font-bold text-slate-900">Website Widgets</h3>
            <p className="text-[13px] text-slate-500">Reviews on your site, where buying actually happens.</p>
            <div className="space-y-1.5">
              {[
                "Reviews on product pages and homepage",
                "Carousel, marquee, or grid layouts",
                "Matches your site's look and feel",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Marketing Campaign */}
          <div className="rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-[15px] font-bold text-slate-900">Marketing Campaign</h3>
            <p className="text-[13px] text-slate-500">We write the emails, the posts, the ads. You just approve.</p>
            <div className="space-y-1.5">
              {[
                "Email/SMS campaign to past customers",
                "Social content built from your best reviews",
                "\"Share with a friend\" flows",
                "Trust Card link in email signature, bio, DMs",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tracking */}
          <div className="rounded-xl border border-slate-200 p-5 space-y-3">
            <h3 className="text-[15px] font-bold text-slate-900">Tracking + Results</h3>
            <p className="text-[13px] text-slate-500">Real numbers. Not guesses. You see what's working.</p>
            <div className="space-y-1.5">
              {[
                "Trust Card views, clicks, and time on page",
                "UTM tracking on every link to your site",
                "Weekly report during the pilot",
                "Before/after comparison on sales",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── 5. DISPLAY ───────────────────────────── */}
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
            verified straight from Etsy and Amazon.
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

      {/* ───────────────────────────── 6. OFFER ───────────────────────────── */}
      <section className="bg-navy">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-8">
          <div>
            <h2 className="text-[26px] sm:text-[32px] font-bold text-white tracking-tight">
              Your customers already wrote
              <br />
              <span className="text-emerald">your best marketing.</span>
            </h2>
            <p className="text-[14px] text-slate-400 mt-4">
              Let's put it to work. 30 days. Real numbers.
            </p>
          </div>

          {/* Pilot card */}
          <div className="rounded-2xl bg-white/5 border border-emerald/20 p-8 text-center max-w-md mx-auto">
            <p className="text-[12px] text-emerald uppercase tracking-wider font-semibold mb-3">
              The Pilot
            </p>
            <p className="text-[32px] font-bold text-white leading-tight">
              30-Day Marketing Pilot
            </p>
            <p className="text-[13px] text-slate-400 mt-2">
              Marketing strategy + the tech to back it up
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 text-left">
              {PILOT_INCLUDES.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                  <span className="text-[13px] text-slate-300 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="mailto:lior@proofpst.com?subject=TheRitzyRose%2030-Day%20Pilot"
            className="inline-flex items-center justify-center gap-2 h-13 px-10 bg-emerald hover:bg-emerald-dark text-white text-[15px] font-semibold rounded-xl transition-colors duration-200 glow-emerald"
          >
            Start Your Pilot
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-4 text-[12px] text-slate-500">
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> No long-term contract
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> Results in 30 days
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald" /> We handle everything
            </span>
          </div>

          {/* Next steps */}
          <div className="pt-8 border-t border-white/10 text-left max-w-md mx-auto">
            <p className="text-[12px] text-slate-500 uppercase tracking-wider mb-4 text-center">
              Next steps
            </p>
            {NEXT_STEPS.map((step, i) => (
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
                See TheRitzyRose Trust Card
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
