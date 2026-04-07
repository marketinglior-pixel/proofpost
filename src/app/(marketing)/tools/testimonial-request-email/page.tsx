import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { EmailBrowser } from "./email-browser";

export const metadata: Metadata = {
  title:
    "50+ Testimonial Request Email Templates — Free & Copy-Paste | ProofPost",
  description:
    "Copy-paste testimonial request email templates for every industry. Ask customers for reviews and testimonials professionally. Free, no signup.",
  keywords: [
    "testimonial request email template",
    "how to ask for testimonials",
    "testimonial request template",
    "ask for testimonial email",
    "testimonial email examples",
    "request for testimonial",
    "customer testimonial request",
    "how to ask customers for reviews",
  ],
  openGraph: {
    title: "50+ Testimonial Request Email Templates — Free & Copy-Paste",
    description:
      "Copy-paste testimonial request email templates for every industry. Ask customers for reviews and testimonials professionally. Free, no signup.",
    url: "https://proofpst.com/tools/testimonial-request-email",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/testimonial-request-email",
  },
};

const faqItems = [
  {
    question: "How do I ask a customer for a testimonial?",
    answer:
      "The best approach is to send a personalized email shortly after a positive experience or successful project. Reference specific results or moments, make the request easy to fulfill (provide prompts or questions), and express genuine gratitude. Timing matters — ask when the customer is happiest with your work. Keep the ask simple: a few sentences about their experience is all you need.",
  },
  {
    question: "When is the best time to ask for a testimonial?",
    answer:
      "The ideal time is right after a milestone or positive interaction — such as a successful product launch, a completed project, a resolved support ticket, or when a customer shares positive feedback informally. For e-commerce, 7-14 days after delivery works well. For services, ask within a week of project completion. The key is to catch customers when the positive experience is still fresh in their minds.",
  },
  {
    question: "How do I ask for a video testimonial?",
    answer:
      "Start by identifying your happiest customers. Send them a personalized invitation explaining the process and time commitment (usually 15-20 minutes). Send questions in advance so they can prepare. Offer to handle all production and editing, and guarantee final approval before publishing. Make it easy — use Zoom or a simple phone recording. Emphasize the mutual benefit: they get exposure, you get social proof.",
  },
  {
    question: "Should I offer incentives for testimonials?",
    answer:
      "Small thank-you gestures like discount codes, free upgrades, or gift cards are generally acceptable and appreciated. However, never make the incentive contingent on a positive review — that compromises authenticity. Be transparent about any incentives. The FTC requires disclosure of material connections. The best testimonials come from genuinely happy customers, so focus on delivering great experiences first.",
  },
  {
    question: "How many follow-ups should I send?",
    answer:
      "Two follow-ups is the sweet spot. Send the first follow-up about one week after your initial request, and a final gentle reminder one week after that. After two follow-ups with no response, respect their decision and move on. Each follow-up should add value — offer to draft the testimonial for their approval, provide a simpler format, or offer alternative methods like a quick phone call.",
  },
];

export default function TestimonialRequestEmailPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Testimonial Request Email Template Library",
        description:
          "Browse 50+ testimonial request email templates organized by category, industry, and tone.",
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
        url: "https://proofpst.com/tools/testimonial-request-email",
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
            name: "Testimonial Request Email Templates",
            item: "https://proofpst.com/tools/testimonial-request-email",
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
          <span className="text-slate-600">
            Testimonial Request Email Templates
          </span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              50+ Testimonial Request Email Templates
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Copy-paste email templates for requesting testimonials from
              customers. Filter by category, industry, and tone. Copy any
              template with one click. Free, no signup required.
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
          <EmailBrowser />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Collecting testimonials?
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Collecting testimonials?{" "}
            <span className="text-emerald">Display them beautifully</span> on your site.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost turns customer testimonials into animated social proof
            widgets for your website. Embed real testimonials in 60 seconds and
            let your happy customers sell for you.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Create Your Widget Free →
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
              { title: "Testimonial Form Templates", description: "40+ testimonial form question templates", href: "/tools/testimonial-form-templates" },
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
            <h2>Why Testimonial Request Emails Matter</h2>
            <p>
              Testimonials are the most powerful form of social proof. According
              to research, 92% of consumers read testimonials before making a
              purchase decision. But here&apos;s the catch — most happy
              customers won&apos;t leave a testimonial unless you ask. A
              well-crafted testimonial request email bridges that gap.
            </p>
            <p>
              The right email at the right time can turn a satisfied customer
              into a public advocate. Testimonial request emails are not just
              about collecting quotes — they&apos;re about strengthening your
              relationship with customers, showing them you value their opinion,
              and building a library of authentic social proof that converts
              prospects into buyers.
            </p>

            <h2>How to Write the Perfect Testimonial Request</h2>
            <p>
              The best testimonial request emails share a few key
              characteristics. They&apos;re personal, specific, and make it easy
              for the customer to respond. Here&apos;s the formula:
            </p>
            <ul>
              <li>
                <strong>Personalize the message:</strong> Use their name,
                reference their specific purchase or project, and mention a real
                result or interaction. Generic requests get ignored.
              </li>
              <li>
                <strong>Explain why it matters:</strong> Tell them how their
                testimonial helps — whether it&apos;s helping other customers
                make decisions or supporting your small business.
              </li>
              <li>
                <strong>Provide prompts:</strong> Give 2-3 specific questions
                they can answer. This removes the blank-page anxiety and results
                in more detailed, useful testimonials.
              </li>
              <li>
                <strong>Make it easy:</strong> Let them reply directly to the
                email. Don&apos;t require logins, forms, or multiple steps.
                Friction kills response rates.
              </li>
              <li>
                <strong>Keep it short:</strong> Your request email should be
                scannable in 30 seconds. Respect their time.
              </li>
            </ul>

            <h2>When to Send Your Testimonial Request</h2>
            <p>
              Timing is everything when asking for testimonials. Send your
              request too early and the customer hasn&apos;t experienced the full
              value. Send it too late and the excitement has faded. Here are the
              optimal windows by business type:
            </p>
            <ul>
              <li>
                <strong>SaaS:</strong> 30 days after onboarding, after a
                successful support interaction, or after a major feature
                adoption milestone.
              </li>
              <li>
                <strong>E-commerce:</strong> 7-14 days after delivery, giving
                the customer time to use the product but while the experience is
                still fresh.
              </li>
              <li>
                <strong>Agencies &amp; Services:</strong> Within one week of
                project completion or deliverable handoff, ideally after sharing
                positive results.
              </li>
              <li>
                <strong>Healthcare:</strong> After a follow-up visit or when a
                patient expresses gratitude verbally.
              </li>
              <li>
                <strong>Education:</strong> Upon course completion or after a
                student achieves a notable outcome.
              </li>
            </ul>

            <h2>Testimonial Request Best Practices</h2>
            <p>
              Follow these best practices to maximize your testimonial collection
              rate and quality:
            </p>
            <ul>
              <li>
                <strong>Ask your happiest customers first:</strong> Start with
                customers who have given you positive feedback, high NPS scores,
                or repeat business. They&apos;re most likely to say yes.
              </li>
              <li>
                <strong>Offer to draft it for them:</strong> Many customers want
                to help but struggle with writing. Offering to draft a
                testimonial based on your conversations dramatically increases
                response rates.
              </li>
              <li>
                <strong>Follow up (but not too much):</strong> Send a maximum of
                two follow-ups, spaced one week apart. After that, respect their
                decision and move on.
              </li>
              <li>
                <strong>Make it multi-format:</strong> Some customers prefer
                writing, others prefer speaking. Offer a phone call, video
                recording, or simple email reply. Flexibility increases
                participation.
              </li>
              <li>
                <strong>Get permission to publish:</strong> Always confirm
                how and where you&apos;ll use the testimonial. Include their
                name, title, and company only with explicit approval.
              </li>
              <li>
                <strong>Say thank you:</strong> Whether it&apos;s a discount
                code, a handwritten note, or a simple email — always thank
                customers who share testimonials. It strengthens the
                relationship and encourages future advocacy.
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
