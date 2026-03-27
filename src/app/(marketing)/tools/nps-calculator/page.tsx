import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { NpsCalculator } from "./nps-calculator";

export const metadata: Metadata = {
  title: "Free NPS Calculator — Calculate Your Net Promoter Score",
  description:
    "Calculate your Net Promoter Score instantly. Free NPS calculator with industry benchmarks and breakdown. No signup required.",
  keywords: [
    "nps calculator",
    "net promoter score calculator",
    "nps score calculation",
    "nps formula",
    "calculate nps",
    "net promoter score formula",
  ],
  openGraph: {
    title: "Free NPS Calculator — Calculate Your Net Promoter Score",
    description:
      "Calculate your NPS instantly with industry benchmarks. Free, no signup.",
    url: "https://proofpst.com/tools/nps-calculator",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/nps-calculator",
  },
};

const faqItems = [
  {
    question: "What is NPS (Net Promoter Score)?",
    answer:
      "Net Promoter Score (NPS) is a customer loyalty metric that measures how likely your customers are to recommend your product or service. It is based on a single question: 'On a scale of 0-10, how likely are you to recommend us?' Respondents are grouped into Promoters (9-10), Passives (7-8), and Detractors (0-6).",
  },
  {
    question: "How do you calculate NPS?",
    answer:
      "NPS is calculated by subtracting the percentage of Detractors from the percentage of Promoters. The formula is: NPS = (% Promoters) - (% Detractors). For example, if 60% are Promoters and 20% are Detractors, your NPS is +40. Passives are not included in the calculation but affect the percentages.",
  },
  {
    question: "What is a good NPS score?",
    answer:
      "Generally, any NPS above 0 is considered good (more promoters than detractors). A score above 30 is great, above 50 is excellent, and above 70 is world-class. However, what counts as 'good' varies by industry — the average NPS for SaaS is 41, while E-commerce averages 62.",
  },
  {
    question: "What is the NPS scale?",
    answer:
      "NPS ranges from -100 to +100. A score of -100 means every respondent is a Detractor, while +100 means every respondent is a Promoter. Most companies score between 0 and 60. The scale groups respondents into three categories: Promoters (9-10), Passives (7-8), and Detractors (0-6).",
  },
  {
    question: "How often should you measure NPS?",
    answer:
      "Most companies measure NPS quarterly for relationship tracking (overall satisfaction) and after key interactions for transactional feedback (post-purchase, post-support). Quarterly surveys provide trend data without survey fatigue. The key is consistency — pick a cadence and stick with it so you can track changes over time.",
  },
];

export default function NpsCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free NPS Calculator",
        description:
          "Calculate your Net Promoter Score instantly with industry benchmarks.",
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
        url: "https://proofpst.com/tools/nps-calculator",
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
            name: "NPS Calculator",
            item: "https://proofpst.com/tools/nps-calculator",
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
          <span className="text-slate-600">NPS Calculator</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              Free NPS Calculator
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Calculate your Net Promoter Score instantly. Enter your survey
              responses below and get your NPS with industry benchmarks.
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
          <NpsCalculator />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            High NPS?
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            High NPS? Let your <span className="text-emerald">website</span> show it.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            Turn your best customer feedback into animated social proof widgets.
            Embed real reviews on your website in 60 seconds. No developer
            needed.
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
              { title: "CSAT Calculator", description: "Calculate your Customer Satisfaction Score", href: "/tools/csat-calculator" },
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
            <h2>What Is Net Promoter Score (NPS)?</h2>
            <p>
              Net Promoter Score is a widely used customer loyalty metric
              developed by Bain & Company. It measures customer satisfaction with
              a single question: &ldquo;On a scale of 0-10, how likely are you
              to recommend our product/service to a friend or colleague?&rdquo;
            </p>
            <p>Based on their response, customers fall into three groups:</p>
            <ul>
              <li>
                <strong>Promoters (9-10):</strong> Loyal enthusiasts who will
                keep buying and refer others, fueling growth.
              </li>
              <li>
                <strong>Passives (7-8):</strong> Satisfied but unenthusiastic
                customers who are vulnerable to competitive offerings.
              </li>
              <li>
                <strong>Detractors (0-6):</strong> Unhappy customers who can
                damage your brand through negative word-of-mouth.
              </li>
            </ul>

            <h2>How to Calculate NPS</h2>
            <p>
              The NPS formula is straightforward: subtract the percentage of
              Detractors from the percentage of Promoters. Passives count toward
              the total number of respondents but are not directly used in the
              formula.
            </p>
            <p>
              <strong>NPS = (% Promoters) &minus; (% Detractors)</strong>
            </p>
            <p>
              For example, if you surveyed 100 customers and 60 are Promoters,
              25 are Passives, and 15 are Detractors, your NPS would be 60% -
              15% = +45.
            </p>

            <h2>What Is a Good NPS Score?</h2>
            <p>NPS ranges from -100 to +100. Here is a general guide:</p>
            <ul>
              <li>
                <strong>Below 0:</strong> Needs Improvement — you have more
                detractors than promoters
              </li>
              <li>
                <strong>0-30:</strong> Good — positive territory, but room to
                grow
              </li>
              <li>
                <strong>30-50:</strong> Great — strong customer loyalty
              </li>
              <li>
                <strong>50-70:</strong> Excellent — exceptional customer
                satisfaction
              </li>
              <li>
                <strong>70+:</strong> World-Class — among the very best in any
                industry
              </li>
            </ul>
            <p>
              Keep in mind that benchmarks vary significantly by industry. A
              score of 40 might be excellent in Telecom (average: 24) but below
              average in E-commerce (average: 62).
            </p>

            <h2>NPS Benchmarks by Industry</h2>
            <p>
              Understanding where your NPS stands relative to your industry is
              crucial. Here are average NPS scores by industry based on publicly
              available benchmark data:
            </p>
            <ul>
              <li>E-commerce: 62</li>
              <li>Education: 58</li>
              <li>Technology: 57</li>
              <li>Retail: 54</li>
              <li>Hospitality: 53</li>
              <li>Consulting: 51</li>
              <li>Financial Services: 44</li>
              <li>SaaS / Software: 41</li>
              <li>Healthcare: 38</li>
              <li>Airlines: 37</li>
              <li>Telecom: 24</li>
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
