import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { RatingCalculator } from "./rating-calculator";

export const metadata: Metadata = {
  title:
    "Free Star Rating Calculator — Calculate Your Average Review Score | ProofPost",
  description:
    "Calculate your average star rating from review data. See rating distribution, weighted average, and quality score. Free, no signup.",
  keywords: [
    "star rating calculator",
    "average rating calculator",
    "review score calculator",
    "average star rating",
    "review rating calculator",
    "weighted average rating",
  ],
  openGraph: {
    title:
      "Free Star Rating Calculator — Calculate Your Average Review Score | ProofPost",
    description:
      "Calculate your average star rating from review data. See rating distribution, weighted average, and quality score. Free, no signup.",
    url: "https://proofpst.com/tools/star-rating-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/star-rating-calculator",
  },
};

const faqItems = [
  {
    question: "How do you calculate average star rating?",
    answer:
      "To calculate the average star rating, multiply each star value (1-5) by the number of reviews at that rating, sum all the weighted values, and divide by the total number of reviews. The formula is: Average = (5\u00D7n5 + 4\u00D7n4 + 3\u00D7n3 + 2\u00D7n2 + 1\u00D7n1) / (n5 + n4 + n3 + n2 + n1). This is called a weighted average because it accounts for how many reviews each star rating received.",
  },
  {
    question: "What is a good average star rating?",
    answer:
      "An average star rating of 4.0 or above is generally considered good. Ratings between 4.0-4.4 are 'Very Good' and signal strong customer satisfaction. Ratings of 4.5-5.0 are 'Excellent' and place your business among the top performers. Most consumers consider businesses with ratings below 3.5 to be risky purchases, and below 3.0 is a major red flag for potential customers.",
  },
  {
    question: "How many reviews do you need to be credible?",
    answer:
      "Research suggests that a minimum of 20-50 reviews is needed for consumers to trust a star rating. However, the ideal number depends on your industry. For local businesses, 10+ reviews can be meaningful. For e-commerce products, 50-100 reviews provide strong social proof. The key is recency and consistency \u2014 a 4.5-star rating from 200 reviews is more credible than a 5.0 from just 3 reviews.",
  },
  {
    question: "Does star rating affect SEO?",
    answer:
      "Yes, star ratings can significantly impact SEO. Google displays review stars in search results through rich snippets, which can increase click-through rates by 15-30%. Businesses with higher ratings also tend to rank higher in local search (Google Maps). Additionally, review schema markup helps search engines understand your reputation, potentially improving visibility for branded and category searches.",
  },
  {
    question: "How do you improve your star rating?",
    answer:
      "To improve your average star rating: (1) Ask satisfied customers to leave reviews at the right moment, such as after a positive interaction. (2) Respond to negative reviews promptly and professionally, offering to resolve issues. (3) Identify patterns in low ratings and fix root causes. (4) Make the review process easy with direct links. (5) Display your best reviews on your website using tools like ProofPost to encourage more positive feedback through social proof.",
  },
];

export default function StarRatingCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Star Rating Calculator",
        description:
          "Calculate your average star rating from review data. See rating distribution, weighted average, and quality score.",
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
        url: "https://proofpst.com/tools/star-rating-calculator",
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
            name: "Star Rating Calculator",
            item: "https://proofpst.com/tools/star-rating-calculator",
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
          <span className="text-slate-600">Star Rating Calculator</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              Free Star Rating Calculator
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Calculate your average star rating instantly. Enter your review
              counts below and see your weighted average, rating distribution,
              and quality score.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <div className="bg-white border-b border-slate-100 py-3">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center gap-6 text-[12px] text-slate-400">
          <span>✓ Used by 2,000+ marketers</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">✓ No signup required</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">✓ 100% free</span>
        </div>
      </div>

      {/* Calculator */}
      <section className="bg-snow py-12">
        <div className="max-w-3xl mx-auto px-6">
          <RatingCalculator />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Great ratings?
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Great ratings deserve to be{" "}
            <span className="text-emerald">seen</span>.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost displays your best reviews as animated widgets on your
            website. Embed real reviews in 60 seconds. No developer needed.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Display Your Ratings Free →
          </Link>
          <div className="mt-3">
            <Link
              href="/demo"
              className="text-[13px] text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              See how it looks →
            </Link>
          </div>
          <p className="mt-3 text-[13px] text-slate-500">
            No credit card required &middot; $9/mo after trial
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
              { title: "NPS Calculator", description: "Calculate your Net Promoter Score instantly", href: "/tools/nps-calculator" },
              { title: "CSAT Calculator", description: "Calculate your Customer Satisfaction Score", href: "/tools/csat-calculator" },
              { title: "Google Review Link Generator", description: "Get your direct Google review URL", href: "/tools/google-review-link" },
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
            <h2>How to Calculate Average Star Rating</h2>
            <p>
              Calculating your average star rating uses a weighted average
              formula. Unlike a simple average, the weighted method accounts for
              how many reviews each star level received, giving you an accurate
              picture of overall customer sentiment.
            </p>
            <p>
              <strong>
                Average = (5&times;n5 + 4&times;n4 + 3&times;n3 + 2&times;n2 +
                1&times;n1) / Total Reviews
              </strong>
            </p>
            <p>
              For example, if you have 50 five-star reviews, 30 four-star, 10
              three-star, 5 two-star, and 5 one-star reviews, your weighted
              average would be (250 + 120 + 30 + 10 + 5) / 100 = 4.15 stars.
            </p>

            <h2>What Is a Good Star Rating?</h2>
            <p>
              Star ratings are the universal language of online reputation. Here
              is how different rating ranges are typically perceived:
            </p>
            <ul>
              <li>
                <strong>4.5&ndash;5.0 (Excellent):</strong> Top-tier
                businesses. Signals exceptional quality and customer experience.
                Only about 10% of businesses maintain this level.
              </li>
              <li>
                <strong>4.0&ndash;4.4 (Very Good):</strong> Strong performance.
                Most consumers consider this trustworthy and are likely to
                purchase.
              </li>
              <li>
                <strong>3.5&ndash;3.9 (Good):</strong> Above average, but some
                customers may hesitate. Room for improvement in specific areas.
              </li>
              <li>
                <strong>3.0&ndash;3.4 (Average):</strong> Neutral territory.
                Many consumers will look for alternatives with higher ratings.
              </li>
              <li>
                <strong>Below 3.0 (Below Average to Poor):</strong> A red flag
                for most shoppers. Immediate action needed to address customer
                pain points.
              </li>
            </ul>

            <h2>Why Star Ratings Matter for Your Business</h2>
            <p>
              Star ratings are one of the most powerful trust signals online.
              Research shows that 93% of consumers say online reviews influence
              their purchasing decisions, and star ratings are the first thing
              they check.
            </p>
            <p>
              Businesses with ratings above 4.0 stars see significantly higher
              conversion rates. A one-star increase on Yelp can lead to a 5-9%
              increase in revenue. On Google, businesses with 4.0+ stars receive
              substantially more clicks and calls from local search results.
            </p>
            <p>
              Star ratings also affect your visibility in search engines. Google
              uses review signals as a ranking factor for local search, and rich
              snippets with star ratings in search results can boost
              click-through rates by 15-30%.
            </p>

            <h2>How to Improve Your Average Rating</h2>
            <p>
              Improving your star rating is not about hiding bad reviews. It is
              about systematically earning more positive ones and addressing
              issues that cause negative feedback:
            </p>
            <ul>
              <li>
                <strong>Ask at the right time:</strong> Request reviews when
                customers are most satisfied, such as right after a successful
                purchase, delivery, or support interaction.
              </li>
              <li>
                <strong>Make it easy:</strong> Send direct links to your review
                profiles. The fewer clicks required, the more reviews you will
                receive.
              </li>
              <li>
                <strong>Respond to every review:</strong> Acknowledge positive
                reviews with thanks. For negative reviews, respond promptly,
                apologize, and offer to resolve the issue.
              </li>
              <li>
                <strong>Fix root causes:</strong> Analyze patterns in your
                negative reviews. If multiple customers mention the same issue,
                prioritize fixing it.
              </li>
              <li>
                <strong>Display social proof:</strong> Use tools like ProofPost
                to showcase your best reviews on your website. This encourages
                more customers to leave positive feedback and builds trust with
                new visitors.
              </li>
            </ul>
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
