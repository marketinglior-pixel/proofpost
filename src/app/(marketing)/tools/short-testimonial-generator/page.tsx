import type { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  ArrowLeft,
  FileText,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { TestimonialFilter } from "./testimonial-filter";

export const metadata: Metadata = {
  title: "Free Short Testimonial Examples & Generator",
  description:
    "Browse 60+ short testimonial samples by industry. Copy ready-to-use customer testimonial examples for your website. Free, no signup required.",
  keywords: [
    "short testimonial sample",
    "testimonial examples",
    "customer testimonial template",
    "sample testimonials",
    "example testimonials",
  ],
  openGraph: {
    title: "Free Short Testimonial Examples & Generator",
    description:
      "60+ ready-to-use testimonial samples organized by industry. Copy and customize for your website.",
    url: "https://proofpst.com/tools/short-testimonial-generator",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/short-testimonial-generator",
  },
};

const faqItems = [
  {
    question: "What is a testimonial example?",
    answer:
      "A testimonial example is a sample quote from a satisfied customer that demonstrates the value of a product or service. Businesses use testimonial examples as templates or inspiration for collecting and displaying social proof on their websites.",
  },
  {
    question: "How long should a short testimonial be?",
    answer:
      "A short testimonial should be 1-2 sentences, typically 15-30 words. The most effective short testimonials focus on one specific result or outcome rather than trying to cover everything. For example: 'Cut our onboarding time in half. The team was productive from day one.'",
  },
  {
    question: "Can I use these testimonial examples on my website?",
    answer:
      "These examples are templates meant to inspire your own testimonial collection. For maximum credibility, you should collect real testimonials from your actual customers. Using fabricated testimonials can damage trust and may violate advertising regulations in many jurisdictions.",
  },
  {
    question: "How do I collect testimonials from customers?",
    answer:
      "The best approaches include: sending a short email after a positive interaction, adding a testimonial request to your post-purchase flow, making it easy with a simple form or one-click review link, and asking specific questions instead of open-ended ones (e.g., 'What specific result did you achieve?' rather than 'How was your experience?').",
  },
  {
    question: "What makes a testimonial effective?",
    answer:
      "Effective testimonials include specific numbers or results ('increased revenue by 23%'), mention the person's name and role for credibility, focus on the transformation (before vs. after), and are concise enough to read in under 10 seconds. Short testimonials often outperform long ones because visitors actually read them.",
  },
];

export default function ShortTestimonialGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Short Testimonial Examples & Generator",
        description:
          "Browse 60+ short testimonial samples by industry. Copy ready-to-use customer testimonial examples for your website.",
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
        url: "https://proofpst.com/tools/short-testimonial-generator",
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
            name: "Short Testimonial Examples",
            item: "https://proofpst.com/tools/short-testimonial-generator",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Schema */}
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
          <span className="text-slate-600">Short Testimonial Examples</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              Free Short Testimonial Examples
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Browse 60+ ready-to-use testimonial samples organized by industry.
              Click to copy any example and customize it for your website.
            </p>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <section className="bg-snow py-12">
        <div className="max-w-6xl mx-auto px-6">
          <TestimonialFilter />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Go beyond samples
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            These are samples. Your{" "}
            <span className="text-emerald">real reviews</span> convert 3x
            better.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost turns your actual customer reviews into animated widgets
            you can embed on your website. Live in 60 seconds. No developer
            needed.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Try ProofPost Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-3 text-[13px] text-slate-500">
            No credit card required &middot; $19/mo after trial
          </p>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-slate prose-sm max-w-none [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-slate-600 [&_li]:text-[15px] [&_li]:text-slate-600">
            <h2>What Is a Short Testimonial?</h2>
            <p>
              A short testimonial is a brief customer endorsement, typically 1-2
              sentences long, that highlights a specific benefit or result. Unlike
              lengthy case studies, short testimonials are designed to be scanned
              quickly — perfect for landing pages, pricing pages, and signup
              flows where visitors make fast decisions.
            </p>
            <p>
              The best short testimonials include a specific metric (&ldquo;saved
              us 15 hours a week&rdquo;), name the person and their role for
              credibility, and focus on transformation rather than features.
            </p>

            <h2>Why Short Testimonials Convert Better</h2>
            <p>
              Research shows that website visitors spend an average of 5.59
              seconds looking at written content. Long testimonials get skipped.
              Short ones get read.
            </p>
            <p>Here is why concise social proof outperforms lengthy reviews:</p>
            <ul>
              <li>
                <strong>They get read.</strong> A 15-word testimonial takes 3
                seconds to process. A 150-word review takes 30 seconds — and
                most visitors won&apos;t invest that time.
              </li>
              <li>
                <strong>They&apos;re more memorable.</strong> One sharp sentence
                sticks better than a paragraph of praise.
              </li>
              <li>
                <strong>They fit everywhere.</strong> Short testimonials work in
                hero sections, pricing cards, CTAs, emails, and ads.
              </li>
              <li>
                <strong>They feel more authentic.</strong> Overly polished,
                lengthy reviews can feel manufactured. Brief, specific quotes
                feel real.
              </li>
            </ul>

            <h2>How to Write a Great Short Testimonial</h2>
            <p>
              Whether you&apos;re guiding customers to write testimonials or
              editing existing reviews, follow these principles:
            </p>
            <ul>
              <li>
                <strong>Lead with the result.</strong> Start with what changed,
                not what the product does. &ldquo;Cut our onboarding time in
                half&rdquo; beats &ldquo;Great onboarding tool.&rdquo;
              </li>
              <li>
                <strong>Include a number.</strong> Specific metrics create
                instant credibility: &ldquo;23% more conversions,&rdquo;
                &ldquo;saved $2,400/month,&rdquo; &ldquo;in 15 minutes.&rdquo;
              </li>
              <li>
                <strong>Keep it to one idea.</strong> The best short testimonials
                make a single, powerful point. Don&apos;t try to cover
                everything.
              </li>
              <li>
                <strong>Use the customer&apos;s own words.</strong> Natural
                language is more convincing than polished copy. Light editing is
                fine; rewriting is not.
              </li>
            </ul>

            <h2>Short Testimonial Examples by Industry</h2>
            <p>
              The examples above are organized by industry so you can find
              templates relevant to your business. Each testimonial follows the
              principles of effective social proof: specific results, real names,
              and concise language that gets read.
            </p>
            <p>
              Use these as inspiration to collect and format your own customer
              testimonials. For maximum impact, display them as animated widgets
              on your website — studies show that moving elements receive 3x more
              attention than static text.
            </p>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="bg-snow py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[20px] font-bold text-slate-900 mb-8">
            More Free Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 opacity-60">
              <FileText
                className="w-5 h-5 text-emerald mb-3"
                aria-hidden="true"
              />
              <h3 className="text-[15px] font-semibold text-slate-900">
                Testimonial Examples Library
              </h3>
              <p className="text-[13px] text-slate-400 mt-1">
                100+ full-length testimonial examples by industry
              </p>
              <span className="text-[12px] text-slate-300 mt-3 block">
                Coming soon
              </span>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 opacity-60">
              <BarChart3
                className="w-5 h-5 text-emerald mb-3"
                aria-hidden="true"
              />
              <h3 className="text-[15px] font-semibold text-slate-900">
                NPS Calculator
              </h3>
              <p className="text-[13px] text-slate-400 mt-1">
                Calculate your Net Promoter Score with industry benchmarks
              </p>
              <span className="text-[12px] text-slate-300 mt-3 block">
                Coming soon
              </span>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 opacity-60">
              <MessageSquare
                className="w-5 h-5 text-emerald mb-3"
                aria-hidden="true"
              />
              <h3 className="text-[15px] font-semibold text-slate-900">
                Review Response Generator
              </h3>
              <p className="text-[13px] text-slate-400 mt-1">
                AI-powered responses to positive and negative reviews
              </p>
              <span className="text-[12px] text-slate-300 mt-3 block">
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, i) => (
              <div key={i} className="border-b border-slate-100 pb-6">
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
