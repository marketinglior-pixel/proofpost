import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { ResponseBrowser } from "./response-browser";
import { industries as responseIndustries } from "./industry-response-data";

export const metadata: Metadata = {
  title:
    "100+ Google Review Response Examples — Free Templates | ProofPost",
  description:
    "Copy-paste review response templates for 1-5 star Google reviews. Professional responses for every industry. Free, no signup.",
  keywords: [
    "google review response examples",
    "positive review response examples",
    "negative review response examples",
    "review response template",
    "how to respond to google reviews",
    "review reply examples",
    "5 star review response",
    "negative review response",
  ],
  openGraph: {
    title: "100+ Google Review Response Examples — Free Templates",
    description:
      "Copy-paste review response templates for 1-5 star Google reviews. Professional responses for every industry. Free, no signup.",
    url: "https://proofpst.com/tools/review-response-examples",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/review-response-examples",
  },
};

const faqItems = [
  {
    question: "How do I respond to a positive Google review?",
    answer:
      "Thank the reviewer by name if possible, mention something specific from their review to show you read it, and invite them back. Keep it genuine and avoid generic copy-paste responses. For example: 'Thank you, Sarah! We're so glad you enjoyed the pasta — our chef will love hearing that. We hope to see you again soon!' Personalized responses show other potential customers that you care.",
  },
  {
    question: "How do I respond to a negative Google review?",
    answer:
      "Stay calm and professional. Acknowledge the issue, apologize sincerely, and offer to make it right — ideally by taking the conversation offline. Never argue, get defensive, or blame the customer publicly. A great negative review response can actually win over readers who see that you handle problems with grace and accountability.",
  },
  {
    question: "Should I respond to every Google review?",
    answer:
      "Yes. Responding to every review — positive and negative — shows that you value customer feedback. Google has confirmed that responding to reviews improves your local SEO ranking. It also signals to potential customers that you are engaged and care about the customer experience. Aim to respond within 24-48 hours.",
  },
  {
    question: "How quickly should I respond to reviews?",
    answer:
      "Ideally within 24 hours, especially for negative reviews. Fast responses show that you take feedback seriously and are actively managing your online reputation. For positive reviews, responding within 48 hours is a good benchmark. Consistency matters more than speed — make sure every review gets a thoughtful reply.",
  },
  {
    question: "Can responding to reviews improve my SEO?",
    answer:
      "Yes. Google has stated that responding to reviews is a factor in local search rankings. Review responses add fresh, keyword-rich content to your Google Business Profile. Businesses that regularly respond to reviews tend to rank higher in local search results and Google Maps. It also increases engagement, which is another positive signal.",
  },
  {
    question: "What should I never say in a review response?",
    answer:
      "Never reveal private customer information (like medical details or account numbers). Avoid being sarcastic, dismissive, or argumentative. Don't make excuses or blame the customer. Never use threatening language or imply legal action. Don't copy-paste the same generic response to every review — it looks lazy and insincere. Always maintain a professional, empathetic tone.",
  },
];

export default function ReviewResponseExamplesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Google Review Response Examples Library",
        description:
          "Browse 100+ review response examples organized by star rating, industry, and tone.",
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
        url: "https://proofpst.com/tools/review-response-examples",
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
            name: "Review Response Examples",
            item: "https://proofpst.com/tools/review-response-examples",
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
          <span className="text-slate-600">Review Response Examples</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              100+ Google Review Response Examples
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Copy-paste review response templates for 1-5 star Google reviews.
              Filter by star rating, industry, and tone. Copy any response with
              one click. Free, no signup required.
            </p>
          </div>
        </div>
      </section>

      {/* Browser */}
      <section className="bg-snow py-12">
        <div className="max-w-6xl mx-auto px-6">
          <ResponseBrowser />
        </div>
      </section>

      {/* Browse by Industry */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-2">
            Browse Review Response Examples by Industry
          </h2>
          <p className="text-[15px] text-slate-500 mb-8">
            Find review response templates tailored to your industry. Each page
            includes 8+ ready-to-use responses, tips, and FAQs.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {responseIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/tools/review-response-examples/${ind.slug}`}
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
            Beyond responding
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Great at responding to reviews? Now{" "}
            <span className="text-emerald">display</span> the best ones on your
            website.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost turns your best Google reviews into beautiful social proof
            widgets. Embed real reviews on your website in 60 seconds and let
            your happy customers sell for you.
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
              { title: "Google Review Link Generator", description: "Get your direct Google review URL", href: "/tools/google-review-link" },
              { title: "Star Rating Calculator", description: "Calculate your average star rating", href: "/tools/star-rating-calculator" },
              { title: "NPS Calculator", description: "Calculate your Net Promoter Score instantly", href: "/tools/nps-calculator" },
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
            <h2>Why Responding to Google Reviews Matters</h2>
            <p>
              Responding to Google reviews is one of the most impactful things
              you can do for your local business. According to Google, businesses
              that respond to reviews are 1.7x more trustworthy than those that
              don&apos;t. Review responses also contribute to your local SEO
              ranking, helping you appear higher in Google Maps and local search
              results.
            </p>
            <p>
              Beyond SEO, review responses are public conversations. Every
              potential customer reading your reviews also reads your responses.
              A thoughtful reply to a negative review can actually build more
              trust than a dozen 5-star ratings. It shows that you care, you
              listen, and you take action.
            </p>

            <h2>How to Respond to Positive Reviews</h2>
            <p>
              Positive reviews deserve more than a generic &ldquo;Thanks!&rdquo;
              Here&apos;s how to craft responses that strengthen the
              relationship and encourage repeat business:
            </p>
            <ul>
              <li>
                <strong>Thank them by name:</strong> Personalization shows you
                read and value their specific feedback, not just the star
                rating.
              </li>
              <li>
                <strong>Reference something specific:</strong> Mention a detail
                from their review (&ldquo;glad you loved the rooftop
                pool!&rdquo;) to show genuine engagement.
              </li>
              <li>
                <strong>Reinforce the positive:</strong> Echo the specific
                praise back — it reinforces the message for future readers.
              </li>
              <li>
                <strong>Invite them back:</strong> A warm invitation to return
                turns a one-time reviewer into a repeat customer.
              </li>
              <li>
                <strong>Keep it concise:</strong> 2-4 sentences is the sweet
                spot. Long responses can feel forced.
              </li>
            </ul>

            <h2>How to Respond to Negative Reviews</h2>
            <p>
              Negative reviews feel personal, but your response is a public
              opportunity. Here&apos;s the framework that works across every
              industry:
            </p>
            <ul>
              <li>
                <strong>Acknowledge and apologize:</strong> Start by validating
                their experience. &ldquo;We&apos;re sorry this happened&rdquo;
                goes a long way.
              </li>
              <li>
                <strong>Take responsibility:</strong> Even if the situation was
                complex, own your part. Never blame the customer publicly.
              </li>
              <li>
                <strong>Explain what you&apos;re doing:</strong> Share the
                specific steps you&apos;re taking to prevent this from happening
                again.
              </li>
              <li>
                <strong>Take it offline:</strong> Offer a direct contact (phone,
                email) to resolve the issue privately. This shows action without
                airing details publicly.
              </li>
              <li>
                <strong>Never get defensive:</strong> Future customers are
                watching. Professionalism under pressure is your strongest
                signal.
              </li>
            </ul>

            <h2>Review Response Best Practices by Industry</h2>
            <p>
              Different industries require different approaches to review
              responses:
            </p>
            <ul>
              <li>
                <strong>Restaurants &amp; Hospitality:</strong> Focus on the
                sensory experience. Reference specific dishes, ambiance, or
                staff members. For negative reviews, offer to make it right with
                a return visit.
              </li>
              <li>
                <strong>Healthcare:</strong> Be careful with HIPAA compliance —
                never reference specific medical details in your response. Keep
                it professional and invite them to contact the office directly.
              </li>
              <li>
                <strong>Home Services:</strong> Emphasize reliability,
                craftsmanship, and cleanliness. For negative reviews, offer
                concrete remediation like sending a senior technician.
              </li>
              <li>
                <strong>SaaS &amp; Technology:</strong> Acknowledge technical
                issues with specifics. Mention timelines for fixes and offer
                direct contact with support or account managers.
              </li>
              <li>
                <strong>Retail:</strong> Highlight product quality and customer
                service. For shipping or product issues, offer immediate
                solutions like free returns or replacements.
              </li>
              <li>
                <strong>Professional Services:</strong> Maintain formality and
                demonstrate expertise. Address concerns about communication,
                billing, and deadlines with specific process improvements.
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
