import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { ScoreScanner } from "./score-scanner";

export const metadata: Metadata = {
  title:
    "Free Social Proof Scanner — Check Your Website Score | ProofPost",
  description:
    "Scan your website for social proof elements. Get a free score (0-100) with a breakdown of testimonials, reviews, trust badges, and more. No signup required.",
  keywords: [
    "social proof scanner",
    "social proof checker",
    "website trust score",
    "testimonial checker",
    "review widget checker",
    "social proof audit",
    "website credibility score",
  ],
  openGraph: {
    title:
      "Free Social Proof Scanner — Check Your Website Score | ProofPost",
    description:
      "Scan any website for social proof. Get a score (0-100) with actionable recommendations. Free, no signup.",
    url: "https://proofpst.com/tools/social-proof-scanner",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/social-proof-scanner",
  },
};

const faqItems = [
  {
    question: "What is social proof?",
    answer:
      "Social proof is the psychological phenomenon where people follow the actions and opinions of others. On websites, it includes customer testimonials, star ratings, review counts, trust badges, client logos, and third-party review widgets. Social proof helps visitors trust your brand and makes them more likely to buy, sign up, or take action.",
  },
  {
    question: "How does the Social Proof Scanner work?",
    answer:
      "The scanner fetches your website's HTML and analyzes it for seven categories of social proof: schema.org markup, testimonial sections, trust badges, star ratings, review widgets, social proof numbers, and video testimonials. Each category is scored based on what's detected, and the scores are combined into an overall Social Proof Score from 0 to 100.",
  },
  {
    question: "What is a good Social Proof Score?",
    answer:
      "A score of 61-80 is 'Good' and means you have a solid social proof foundation. Scores above 80 are 'Excellent' and indicate a strong social proof strategy. Most websites score between 20-50. The goal isn't necessarily 100 — it's about having the right social proof elements for your audience and converting visitors into customers.",
  },
  {
    question: "Why is schema markup important for social proof?",
    answer:
      "Schema.org Review and AggregateRating markup tells search engines about your reviews. When properly implemented, Google can display star ratings directly in search results (rich snippets), which increases click-through rates by 15-30%. It's one of the highest-impact social proof optimizations you can make.",
  },
  {
    question: "How can I improve my Social Proof Score quickly?",
    answer:
      "The fastest wins are: (1) Add a testimonial section with real customer quotes and names. (2) Add a 'Trusted by' section with client logos. (3) Embed a review widget from a platform like ProofPost, Trustpilot, or G2. (4) Add schema.org Review markup to your testimonials. These four changes can take your score from Critical to Good in a single afternoon.",
  },
  {
    question: "Does social proof actually improve conversions?",
    answer:
      "Yes. Research consistently shows that social proof increases conversion rates. According to studies, 92% of consumers read online reviews before purchasing, and displaying reviews can increase conversions by 270%. Testimonials with photos convert 35% better than text-only, and video testimonials are the most persuasive format of all.",
  },
];

export default function SocialProofScannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Social Proof Scanner",
        description:
          "Scan any website for social proof elements and get a score from 0 to 100 with actionable recommendations.",
        applicationCategory: "BusinessApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        creator: {
          "@type": "Organization",
          name: "ProofPost",
          url: "https://proofpst.com",
        },
        url: "https://proofpst.com/tools/social-proof-scanner",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ProofPost",
            item: "https://proofpst.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free Tools",
            item: "https://proofpst.com/tools",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Social Proof Scanner",
            item: "https://proofpst.com/tools/social-proof-scanner",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald flex items-center justify-center">
              <Star className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-[15px] font-semibold text-slate-900">
              ProofPost
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Free Tools
            </Link>
            <Link
              href="/blog"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Blog
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-white bg-emerald hover:bg-emerald-dark px-5 py-2.5 rounded-lg transition-colors duration-200 glow-emerald"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <nav className="flex items-center gap-2 text-[13px] text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">
            ProofPost
          </Link>
          <span>/</span>
          <Link
            href="/tools"
            className="hover:text-slate-600 transition-colors"
          >
            Free Tools
          </Link>
          <span>/</span>
          <span className="text-slate-600">Social Proof Scanner</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              Free Social Proof Scanner
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Enter any website URL and get a Social Proof Score from 0 to 100.
              See exactly what&apos;s working, what&apos;s missing, and how to
              improve your conversions.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-6 text-[12px] text-slate-400">
          <span>&#10003; Scans 7 social proof categories</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">&#10003; No signup required</span>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">&#10003; 100% free</span>
        </div>
      </div>

      {/* Scanner */}
      <section className="bg-snow py-12">
        <div className="max-w-3xl mx-auto px-6">
          <ScoreScanner />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Low score?
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Fix it in <span className="text-emerald">60 seconds</span>
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost turns your existing customer reviews into animated social
            proof widgets. Import reviews, let AI find the best quote, and embed
            it on your website. No developer needed.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Boost My Score Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="mt-3">
            <Link
              href="/demo"
              className="text-[13px] text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              See how it looks &rarr;
            </Link>
          </div>
          <p className="mt-3 text-[13px] text-slate-500">
            No credit card required &middot; $19/mo after trial
          </p>
        </div>
      </section>

      {/* Related Tools */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[20px] font-bold text-slate-900 mb-6">
            Related Free Tools
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                title: "Short Testimonial Examples",
                description: "60+ short testimonial samples by industry",
                href: "/tools/short-testimonial-generator",
              },
              {
                title: "NPS Calculator",
                description: "Calculate your Net Promoter Score",
                href: "/tools/nps-calculator",
              },
              {
                title: "Star Rating Calculator",
                description: "Calculate your average star rating",
                href: "/tools/star-rating-calculator",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="border border-slate-200/80 rounded-lg p-4 hover:border-emerald/40 hover:shadow-sm transition-all group"
              >
                <p className="text-[14px] font-semibold text-slate-900 group-hover:text-emerald transition-colors">
                  {tool.title}
                </p>
                <p className="mt-1 text-[12px] text-slate-400 leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-slate prose-sm max-w-none [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-slate-600 [&_li]:text-[15px] [&_li]:text-slate-600">
            <h2>What Is Social Proof?</h2>
            <p>
              Social proof is the psychological principle that people look to
              others&apos; actions and opinions when making decisions. On your
              website, social proof includes customer testimonials, star ratings,
              review counts, trust badges, client logos, and embedded review
              widgets.
            </p>
            <p>
              When visitors see that other people &mdash; especially people like
              them &mdash; trust your product or service, they&apos;re more likely
              to trust you too. It&apos;s one of the most powerful conversion
              levers available, and most websites dramatically underuse it.
            </p>

            <h2>Why Social Proof Matters for Conversions</h2>
            <p>
              The numbers are clear: 92% of consumers read online reviews before
              making a purchase. Displaying reviews on your website can increase
              conversions by up to 270%. And pages with testimonials convert 34%
              better than pages without them.
            </p>
            <p>
              Yet most websites either have no social proof at all, or they use
              generic badges like &ldquo;Trusted by 500+ companies&rdquo; with
              zero specifics. The Social Proof Scanner helps you identify exactly
              where your gaps are and what to fix first.
            </p>

            <h2>How the Social Proof Scanner Works</h2>
            <p>
              Our scanner analyzes your website across seven categories of social
              proof:
            </p>
            <ul>
              <li>
                <strong>Schema Markup (0-20 pts):</strong> Checks for
                schema.org Review and AggregateRating structured data that
                enables Google rich snippets.
              </li>
              <li>
                <strong>Testimonials (0-25 pts):</strong> Detects customer quote
                sections, blockquotes with attribution, and testimonial-related
                page sections.
              </li>
              <li>
                <strong>Trust Badges (0-15 pts):</strong> Looks for
                &ldquo;Trusted by&rdquo; sections, client logo grids, and
                credibility indicators.
              </li>
              <li>
                <strong>Star Ratings (0-10 pts):</strong> Identifies visible
                star displays, rating numbers, and review scores.
              </li>
              <li>
                <strong>Review Widgets (0-15 pts):</strong> Detects embedded
                widgets from Trustpilot, G2, Capterra, Yotpo, and other review
                platforms.
              </li>
              <li>
                <strong>Social Proof Numbers (0-10 pts):</strong> Finds
                quantified claims like &ldquo;500+ customers&rdquo; or
                &ldquo;rated 4.8/5.&rdquo;
              </li>
              <li>
                <strong>Video Testimonials (0-5 pts):</strong> Checks for video
                content within testimonial sections.
              </li>
            </ul>

            <h2>How to Improve Your Score</h2>
            <p>
              The fastest way to improve your Social Proof Score is to focus on
              the highest-impact categories first:
            </p>
            <ul>
              <li>
                <strong>Add real testimonials:</strong> Use actual customer
                quotes with names, titles, and photos. Generic praise
                doesn&apos;t convert &mdash; specific results do.
              </li>
              <li>
                <strong>Add schema markup:</strong> Implement schema.org Review
                markup to get star ratings in Google search results. This alone
                can increase click-through rates by 15-30%.
              </li>
              <li>
                <strong>Show trust badges:</strong> Add a &ldquo;Trusted
                by&rdquo; section with recognizable client logos.
              </li>
              <li>
                <strong>Embed a review widget:</strong> Use a tool like
                ProofPost to display animated, auto-updating testimonials from
                your existing reviews.
              </li>
            </ul>
            <p>
              Most websites can go from a Critical score (0-20) to a Good score
              (61-80) in a single afternoon with the right tools.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-snow py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-slate-200 pb-6">
                <h3 className="text-[15px] font-semibold text-slate-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200/60 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald flex items-center justify-center">
              <Star className="w-3 h-3 text-white" aria-hidden="true" />
            </div>
            <span className="text-[13px] font-medium text-slate-500">
              ProofPost
            </span>
          </Link>
          <div className="flex items-center gap-6 text-[13px] text-slate-400">
            <Link
              href="/tools"
              className="hover:text-slate-600 transition-colors"
            >
              Free Tools
            </Link>
            <Link
              href="/blog"
              className="hover:text-slate-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/privacy"
              className="hover:text-slate-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-600 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
