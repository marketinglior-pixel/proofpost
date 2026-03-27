import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { CsatCalculator } from "./csat-calculator";

export const metadata: Metadata = {
  title: "Free CSAT Calculator — Calculate Customer Satisfaction Score | ProofPost",
  description:
    "Calculate your Customer Satisfaction Score (CSAT) instantly. Free calculator with industry benchmarks. No signup required.",
  keywords: [
    "csat calculator",
    "customer satisfaction score calculator",
    "csat score calculation",
    "csat formula",
    "calculate csat",
    "customer satisfaction formula",
  ],
  openGraph: {
    title: "Free CSAT Calculator — Calculate Customer Satisfaction Score | ProofPost",
    description:
      "Calculate your CSAT instantly with industry benchmarks. Free, no signup.",
    url: "https://proofpst.com/tools/csat-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/csat-calculator",
  },
};

const faqItems = [
  {
    question: "What is CSAT (Customer Satisfaction Score)?",
    answer:
      "Customer Satisfaction Score (CSAT) is a key performance metric that measures how satisfied customers are with your product, service, or a specific interaction. It is typically measured by asking customers to rate their experience on a 1-5 scale, where 4 and 5 are considered 'satisfied' responses.",
  },
  {
    question: "How do you calculate CSAT?",
    answer:
      "CSAT is calculated by dividing the number of satisfied responses (ratings of 4 and 5 on a 5-point scale) by the total number of responses, then multiplying by 100 to get a percentage. The formula is: CSAT = (Number of satisfied responses / Total responses) x 100.",
  },
  {
    question: "What is a good CSAT score?",
    answer:
      "A CSAT score above 75% is generally considered good. Scores between 50-70% indicate room for improvement, while scores above 85% are excellent. However, benchmarks vary by industry — E-commerce averages 80%, while Telecom averages 68%. Always compare against your specific industry.",
  },
  {
    question: "What is the difference between CSAT and NPS?",
    answer:
      "CSAT measures satisfaction with a specific interaction or experience on a 1-5 scale, while NPS (Net Promoter Score) measures overall loyalty and likelihood to recommend on a 0-10 scale. CSAT is best for transactional feedback (post-purchase, post-support), while NPS is better for tracking long-term customer loyalty and brand advocacy.",
  },
  {
    question: "How often should you measure CSAT?",
    answer:
      "CSAT should be measured immediately after key customer interactions — such as after a purchase, support ticket resolution, or onboarding. This gives you timely, actionable feedback. For overall satisfaction tracking, quarterly surveys work well. The key is to measure consistently so you can identify trends over time.",
  },
];

export default function CsatCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free CSAT Calculator",
        description:
          "Calculate your Customer Satisfaction Score instantly with industry benchmarks.",
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
        url: "https://proofpst.com/tools/csat-calculator",
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
            name: "CSAT Calculator",
            item: "https://proofpst.com/tools/csat-calculator",
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
          <span className="text-slate-600">CSAT Calculator</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              Free CSAT Calculator
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Calculate your Customer Satisfaction Score instantly. Enter your
              survey responses below and get your CSAT with industry benchmarks.
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
          <CsatCalculator />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            High CSAT?
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            High CSAT? Let visitors see your{" "}
            <span className="text-emerald">customer satisfaction</span>.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            Turn satisfied customers into social proof with ProofPost. Embed
            real reviews on your website in 60 seconds. No developer needed.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Display Your Score Free →
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
              { title: "NPS Calculator", description: "Calculate your Net Promoter Score instantly", href: "/tools/nps-calculator" },
              { title: "Star Rating Calculator", description: "Calculate your average star rating", href: "/tools/star-rating-calculator" },
              { title: "Review Response Examples", description: "100+ review response templates", href: "/tools/review-response-examples" },
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
            <h2>What Is Customer Satisfaction Score (CSAT)?</h2>
            <p>
              Customer Satisfaction Score (CSAT) is one of the most widely used
              metrics for measuring customer satisfaction. It captures how
              satisfied customers are with your product, service, or a specific
              interaction by asking them to rate their experience on a scale
              &mdash; typically 1 to 5, where 1 means &ldquo;very
              dissatisfied&rdquo; and 5 means &ldquo;very satisfied.&rdquo;
            </p>
            <p>
              CSAT focuses on immediate satisfaction rather than long-term
              loyalty. This makes it ideal for measuring satisfaction at specific
              touchpoints — after a purchase, support interaction, onboarding
              experience, or product update.
            </p>

            <h2>How to Calculate CSAT</h2>
            <p>
              The CSAT formula is simple: divide the number of satisfied
              responses by the total number of responses, then multiply by 100
              to get a percentage.
            </p>
            <p>
              <strong>
                CSAT = (Number of satisfied responses / Total responses) &times;
                100
              </strong>
            </p>
            <p>
              &ldquo;Satisfied responses&rdquo; are typically those who rated 4
              or 5 on a 5-point scale. For example, if you surveyed 200
              customers and 160 gave a rating of 4 or 5, your CSAT would be
              (160 / 200) &times; 100 = 80%.
            </p>

            <h2>What Is a Good CSAT Score?</h2>
            <p>
              CSAT scores range from 0% to 100%. Here is a general guide:
            </p>
            <ul>
              <li>
                <strong>Below 50%:</strong> Poor — significant customer
                dissatisfaction that needs urgent attention
              </li>
              <li>
                <strong>50-70%:</strong> Average — room for improvement in your
                customer experience
              </li>
              <li>
                <strong>70-85%:</strong> Good — most customers are satisfied,
                but there is still room to grow
              </li>
              <li>
                <strong>85%+:</strong> Excellent — exceptional customer
                satisfaction that drives loyalty
              </li>
            </ul>
            <p>
              Keep in mind that benchmarks vary by industry. A CSAT of 72% might
              be above average in Telecom (average: 68%) but below average in
              E-commerce (average: 80%).
            </p>

            <h2>CSAT vs NPS: What&apos;s the Difference?</h2>
            <p>
              While both CSAT and NPS measure customer experience, they serve
              different purposes:
            </p>
            <ul>
              <li>
                <strong>CSAT</strong> measures satisfaction with a specific
                interaction or experience. It uses a 1-5 scale and produces a
                percentage score (0-100%).
              </li>
              <li>
                <strong>NPS</strong> measures overall customer loyalty and
                likelihood to recommend. It uses a 0-10 scale and produces a
                score from -100 to +100.
              </li>
            </ul>
            <p>
              Use CSAT for transactional feedback (after a purchase, support
              ticket, or feature release) and NPS for relationship tracking
              (quarterly or annual loyalty measurement). Many companies use both
              metrics together for a complete view of customer experience.
            </p>

            <h2>CSAT Benchmarks by Industry</h2>
            <p>
              Understanding where your CSAT stands relative to your industry is
              essential. Here are average CSAT scores by industry based on
              publicly available benchmark data:
            </p>
            <ul>
              <li>E-commerce: 80%</li>
              <li>Education: 79%</li>
              <li>SaaS / Software: 78%</li>
              <li>Financial Services: 78%</li>
              <li>Retail: 77%</li>
              <li>Hospitality: 76%</li>
              <li>Insurance: 75%</li>
              <li>Healthcare: 74%</li>
              <li>Airlines: 73%</li>
              <li>Telecom: 68%</li>
            </ul>
            <p>
              Use the calculator above to see exactly how your score compares to
              your industry average.
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
