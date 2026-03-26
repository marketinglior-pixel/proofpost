import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { TestimonialBrowser } from "./testimonial-browser";
import { industries } from "./industry-data";

export const metadata: Metadata = {
  title: "100+ Testimonial Examples by Industry — Free Library | ProofPost",
  description:
    "Browse 104 real-world testimonial examples organized by industry, category, and length. Copy ready-to-use customer testimonials for your website. Free, no signup.",
  keywords: [
    "testimonial examples",
    "customer testimonial examples",
    "testimonial template",
    "sample testimonials for website",
    "review examples",
    "client testimonial examples",
    "testimonial examples for business",
  ],
  openGraph: {
    title: "100+ Testimonial Examples by Industry — Free Library",
    description:
      "104 ready-to-use testimonial examples across 12 industries. Filter by category, length, and industry. Copy with one click.",
    url: "https://proofpst.com/tools/testimonial-examples",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/testimonial-examples",
  },
};

const faqItems = [
  {
    question: "What makes a great customer testimonial?",
    answer:
      "A great testimonial is specific, authentic, and results-oriented. It mentions a concrete outcome (like '23% increase in conversions'), names the person and their role, and focuses on one key benefit rather than being vague. The best testimonials tell a mini-story: the problem, the solution, and the result.",
  },
  {
    question: "How do I collect testimonials from customers?",
    answer:
      "The best time to ask is right after a positive interaction — a completed project, a good support experience, or a milestone achievement. Send a short email with 2-3 specific questions: What problem did we solve? What results did you see? Would you recommend us? Keep it easy — most customers are happy to help, they just need a prompt.",
  },
  {
    question: "Can I use these testimonial examples on my website?",
    answer:
      "These examples are templates and inspiration for your own testimonial collection. For maximum credibility and legal compliance, always use real testimonials from actual customers. Fabricated testimonials can damage trust and may violate FTC guidelines and advertising regulations.",
  },
  {
    question: "How many testimonials should I display on my website?",
    answer:
      "Quality matters more than quantity. Start with 3-5 strong testimonials on your homepage, and create a dedicated testimonials or reviews page for a larger collection. Rotate them periodically to keep content fresh. Industry-specific testimonials work best on relevant landing pages.",
  },
  {
    question: "Where should I place testimonials on my website?",
    answer:
      "Place testimonials near decision points: next to pricing tables, on product pages, near CTAs, and on your homepage. Testimonials in the hero section can boost conversion rates by up to 34%. Also consider adding them to checkout pages to reduce cart abandonment.",
  },
  {
    question: "What is the difference between a testimonial and a review?",
    answer:
      "A testimonial is typically requested by the business and curated for marketing use — it's usually longer and more detailed. A review is unsolicited feedback left on a third-party platform like Google, Yelp, or G2. Both serve as social proof, but testimonials give you more control over presentation while reviews carry more third-party credibility.",
  },
];

export default function TestimonialExamplesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Testimonial Examples Library",
        description:
          "Browse 104 testimonial examples organized by industry, category, and length.",
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
        url: "https://proofpst.com/tools/testimonial-examples",
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
            name: "Testimonial Examples",
            item: "https://proofpst.com/tools/testimonial-examples",
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
          <span className="text-slate-600">Testimonial Examples</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              100+ Testimonial Examples
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Browse 104 real-world customer testimonial examples across 12
              industries. Filter by category, length, and industry. Copy any
              testimonial with one click.
            </p>
          </div>
        </div>
      </section>

      {/* Browser */}
      <section className="bg-snow py-12">
        <div className="max-w-6xl mx-auto px-6">
          <TestimonialBrowser />
        </div>
      </section>

      {/* Browse by Industry */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-2">
            Browse Testimonial Examples by Industry
          </h2>
          <p className="text-[15px] text-slate-500 mb-8">
            Find testimonial examples tailored to your industry. Each page
            includes 10+ ready-to-use examples, collection tips, and FAQs.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/tools/testimonial-examples/${ind.slug}`}
                className="group flex items-center gap-3 border border-slate-200/80 rounded-lg px-4 py-3 hover:border-emerald/40 hover:bg-emerald/5 transition-all duration-200"
              >
                <span className="text-[14px] font-medium text-slate-700 group-hover:text-emerald transition-colors">
                  {ind.name}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-emerald ml-auto transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Stop using templates
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Collect <span className="text-emerald">real</span> testimonials
            instead.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost helps you collect, manage, and display authentic customer
            testimonials as beautiful social proof widgets. Embed real reviews on
            your website in 60 seconds.
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

      {/* Related Tools */}
      <section className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-[20px] font-bold text-slate-900 mb-6">
            Related Free Tools
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Short Testimonial Generator", description: "60+ short testimonial samples by industry", href: "/tools/short-testimonial-generator" },
              { title: "Testimonial Form Templates", description: "40+ testimonial form question templates", href: "/tools/testimonial-form-templates" },
              { title: "Testimonial Request Emails", description: "50+ testimonial request email templates", href: "/tools/testimonial-request-email" },
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
            <h2>Why Customer Testimonials Matter</h2>
            <p>
              Customer testimonials are one of the most powerful forms of social
              proof. According to research, 92% of consumers read online reviews
              before making a purchase, and testimonials can increase conversion
              rates by up to 34%. They build trust, reduce perceived risk, and
              help prospects see themselves in your existing customers&apos;
              success stories.
            </p>

            <h2>Types of Customer Testimonials</h2>
            <p>
              Not all testimonials are created equal. Here are the most effective
              formats:
            </p>
            <ul>
              <li>
                <strong>Quote testimonials:</strong> Direct quotes from
                customers, displayed with their name, photo, and role. Simple
                and versatile.
              </li>
              <li>
                <strong>Case study testimonials:</strong> Detailed stories
                showing the before-and-after of using your product. Best for
                complex B2B sales.
              </li>
              <li>
                <strong>Star rating testimonials:</strong> Short reviews with a
                1-5 star rating. Familiar format from e-commerce that works well
                for quick trust signals.
              </li>
              <li>
                <strong>Video testimonials:</strong> Customers sharing their
                experience on camera. Highest trust factor but requires more
                effort to produce.
              </li>
              <li>
                <strong>Social media testimonials:</strong> Screenshots or
                embeds of organic praise from Twitter, LinkedIn, or other
                platforms. Feels authentic because it&apos;s public.
              </li>
            </ul>

            <h2>How to Write a Testimonial Request Email</h2>
            <p>
              The key to getting great testimonials is making it easy for
              customers to respond. Here&apos;s a proven formula:
            </p>
            <ul>
              <li>
                Start with gratitude — thank them for being a customer
              </li>
              <li>
                Mention a specific win or milestone they achieved
              </li>
              <li>
                Ask 2-3 specific questions (don&apos;t ask for a &ldquo;testimonial&rdquo; — ask about their experience)
              </li>
              <li>
                Keep the ask short — aim for a response they can write in 2
                minutes
              </li>
              <li>
                Offer to draft something for their approval if they&apos;re busy
              </li>
            </ul>

            <h2>Testimonial Examples by Industry</h2>
            <p>
              This library includes testimonial examples across 12 industries:
              SaaS & Software, E-commerce, Marketing Agency, Healthcare,
              Education, Financial Services, Real Estate, Consulting, Fitness &
              Wellness, Food & Restaurant, Legal, and Construction & Home. Each
              example is categorized by theme (ROI & Results, Customer Support,
              Ease of Use, etc.) and length (short, medium, long).
            </p>
            <p>
              Use the filters above to find testimonial templates that match your
              industry and use case. While these are example templates, the best
              testimonials always come from real customers with real experiences.
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
