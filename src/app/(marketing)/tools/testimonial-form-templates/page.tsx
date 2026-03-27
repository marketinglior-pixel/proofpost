import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { FormBrowser } from "./form-browser";

export const metadata: Metadata = {
  title:
    "40+ Testimonial Form Templates — Free Questions to Ask | ProofPost",
  description:
    "Ready-to-use testimonial form templates with the best questions to ask customers. Short forms, detailed surveys, video prompts. Free, no signup.",
  keywords: [
    "testimonial form",
    "testimonial form examples",
    "customer testimonial form",
    "client testimonial form",
    "testimonial survey template",
    "testimonial questions",
    "customer feedback form",
    "testimonial collection form",
  ],
  openGraph: {
    title: "40+ Testimonial Form Templates — Free Questions to Ask",
    description:
      "Ready-to-use testimonial form templates with the best questions to ask customers. Short forms, detailed surveys, video prompts. Free, no signup.",
    url: "https://proofpst.com/tools/testimonial-form-templates",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/testimonial-form-templates",
  },
};

const faqItems = [
  {
    question: "What questions should I ask in a testimonial form?",
    answer:
      "The best testimonial forms ask about the customer's situation before using your product, what specific problem you helped them solve, what results they achieved, and whether they would recommend you. Avoid yes/no questions — open-ended prompts like 'What was your biggest challenge before working with us?' produce more compelling, detailed responses that resonate with potential customers.",
  },
  {
    question: "How many questions should a testimonial form have?",
    answer:
      "For most use cases, 3-5 questions is the sweet spot. Short forms get higher completion rates while still capturing useful content. If you need a detailed case study, 6-10 questions work well but expect lower response rates. The key is to match the form length to your relationship with the customer — long-time clients will answer more questions than first-time buyers.",
  },
  {
    question: "What makes a good testimonial question?",
    answer:
      "Good testimonial questions are open-ended, specific, and outcome-focused. Instead of asking 'Did you like our product?' ask 'What specific results have you seen since using our product?' Questions that prompt storytelling — like asking about the before-and-after — produce testimonials that are more persuasive and relatable to potential customers.",
  },
  {
    question: "Should I use open-ended or multiple choice questions?",
    answer:
      "Use open-ended questions for testimonials. Multiple choice questions are great for surveys and NPS, but they produce data, not stories. Testimonials need to sound like real people sharing real experiences. Open-ended questions let customers express themselves in their own words, which is what makes testimonials believable and effective as social proof.",
  },
  {
    question: "How do I collect video testimonials?",
    answer:
      "Start by sending customers a short list of 3-5 prompts to guide their video. Keep prompts conversational — 'Tell us what problem you were trying to solve' works better than formal questions. Let them record on their phone in a quiet, well-lit space. Tools like ProofPost make it easy to send a link where customers can record and submit video testimonials directly, without any technical setup.",
  },
];

export default function TestimonialFormTemplatesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Testimonial Form Templates Library",
        description:
          "Browse 40+ testimonial form templates organized by type and industry. Copy questions with one click.",
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
        url: "https://proofpst.com/tools/testimonial-form-templates",
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
            name: "Testimonial Form Templates",
            item: "https://proofpst.com/tools/testimonial-form-templates",
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
          <span className="text-slate-600">Testimonial Form Templates</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              40+ Testimonial Form Templates
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Ready-to-use testimonial form templates with the best questions to
              ask your customers. Filter by form type and industry. Copy all
              questions with one click. Free, no signup required.
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

      {/* Browser */}
      <section className="bg-snow py-12">
        <div className="max-w-6xl mx-auto px-6">
          <FormBrowser />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Beyond the questions
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Got the questions? Now{" "}
            <span className="text-emerald">collect and showcase</span> the
            answers.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost helps you collect, manage, and showcase testimonials on
            your website. Send collection links, gather video and text
            testimonials, and display them beautifully — all in one tool.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Start Showcasing Reviews →
          </Link>
          <div className="mt-3">
            <Link
              href="/demo"
              className="text-[13px] text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
            >
              See live demo →
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
              { title: "Testimonial Request Emails", description: "50+ testimonial request email templates", href: "/tools/testimonial-request-email" },
              { title: "Testimonial Examples Library", description: "100+ full-length testimonial examples", href: "/tools/testimonial-examples" },
              { title: "Short Testimonial Generator", description: "60+ short testimonial samples by industry", href: "/tools/short-testimonial-generator" },
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
            <h2>What Is a Testimonial Form?</h2>
            <p>
              A testimonial form is a structured set of questions designed to
              collect feedback from customers that can be used as social proof
              on your website, marketing materials, and sales pages. Unlike
              generic feedback surveys, testimonial forms are crafted to elicit
              specific, story-driven responses that highlight the
              customer&apos;s journey — from their initial problem to the
              results they achieved with your product or service.
            </p>
            <p>
              The best testimonial forms guide customers to share their
              experience in a way that naturally addresses the concerns and
              questions your prospects have. A well-designed form turns even
              brief responses into compelling proof that your business delivers
              results.
            </p>

            <h2>How to Create an Effective Testimonial Form</h2>
            <p>
              Creating a testimonial form that actually gets responses requires
              balancing depth with brevity. Here are the principles that drive
              the highest completion rates and the most usable responses:
            </p>
            <ul>
              <li>
                <strong>Start with the problem:</strong> Always open with a
                question about the customer&apos;s situation before they found
                you. This sets up the narrative arc that makes testimonials
                persuasive.
              </li>
              <li>
                <strong>Ask for specifics:</strong> Questions like &ldquo;What
                specific result have you seen?&rdquo; produce better content
                than &ldquo;How do you feel about our product?&rdquo;
              </li>
              <li>
                <strong>Keep it short:</strong> 3-5 questions is ideal for most
                situations. Every additional question reduces completion rates
                by roughly 10-15%.
              </li>
              <li>
                <strong>End with the recommendation:</strong> Closing with
                &ldquo;Would you recommend us? What would you say?&rdquo;
                produces the quotable one-liners perfect for marketing.
              </li>
              <li>
                <strong>Make it easy to submit:</strong> Use a simple form
                tool, not a long email thread. The fewer clicks, the more
                responses you&apos;ll get.
              </li>
            </ul>

            <h2>Best Testimonial Questions by Industry</h2>
            <p>
              Different industries benefit from different types of testimonial
              questions. Here&apos;s what works best in each:
            </p>
            <ul>
              <li>
                <strong>SaaS &amp; Technology:</strong> Focus on workflow
                improvements, time saved, and ROI. Ask about the evaluation
                process and what made them choose you over competitors.
                Quantifiable results like &ldquo;saved 10 hours per week&rdquo;
                are gold.
              </li>
              <li>
                <strong>E-commerce:</strong> Ask about product quality,
                unboxing experience, and comparison to alternatives. Photo and
                video testimonials are especially powerful for physical
                products.
              </li>
              <li>
                <strong>Agencies &amp; Consulting:</strong> Emphasize
                collaboration, communication, and measurable outcomes. Ask
                clients to describe the working relationship and the impact on
                their business metrics.
              </li>
              <li>
                <strong>Healthcare:</strong> Keep questions HIPAA-friendly —
                focus on the care experience, staff professionalism, and
                quality of life improvements without asking for medical details.
              </li>
              <li>
                <strong>Real Estate:</strong> Ask about the agent&apos;s
                responsiveness, market knowledge, and how the outcome compared
                to expectations. Emotional moments like getting the keys work
                well in video testimonials.
              </li>
              <li>
                <strong>Fitness &amp; Wellness:</strong> Transformation stories
                are powerful. Ask about starting point, journey, and current
                results. Before-and-after context makes these testimonials
                highly shareable.
              </li>
            </ul>

            <h2>Short Form vs Detailed Form: When to Use Each</h2>
            <p>
              Short forms (3-5 questions) work best when you need a high volume
              of testimonials, when your customers are busy, or when you&apos;re
              collecting feedback from recent purchasers who may not have deep
              experience with your product yet. They&apos;re ideal for
              post-purchase emails, in-app prompts, and quick follow-ups after
              a positive interaction.
            </p>
            <p>
              Detailed forms (6-10 questions) are better suited for long-term
              clients, enterprise customers, or case study candidates. These
              produce richer content that can be repurposed into blog posts,
              landing page copy, and sales enablement materials. Use detailed
              forms when you have a strong relationship with the customer and
              they&apos;ve seen significant, measurable results from your
              product or service.
            </p>
            <p>
              Video prompt forms work in both scenarios — keep them to 3-5
              questions maximum, since recording video requires more effort than
              typing. The key is making prompts conversational rather than
              formal, so the customer speaks naturally on camera.
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
