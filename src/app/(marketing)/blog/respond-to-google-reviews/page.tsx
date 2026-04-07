import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title:
    "How to Respond to Google Reviews (With Examples) | ProofPost",
  description:
    "Learn how to respond to positive, negative, and neutral Google reviews with real examples and templates. Boost your reputation and win more customers.",
  keywords: [
    "how to respond to google reviews",
    "google review response examples",
    "how to reply to reviews",
    "respond to negative reviews",
    "respond to positive reviews",
    "google review response template",
    "review response examples",
  ],
  openGraph: {
    title: "How to Respond to Google Reviews (With Examples)",
    description:
      "Learn how to respond to positive, negative, and neutral Google reviews with real examples and templates. Boost your reputation and win more customers.",
    url: "https://proofpst.com/blog/respond-to-google-reviews",
    type: "article",
    publishedTime: "2026-03-26T00:00:00Z",
    authors: ["ProofPost Team"],
  },
  alternates: {
    canonical: "https://proofpst.com/blog/respond-to-google-reviews",
  },
};

export default function RespondToGoogleReviewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "How to Respond to Google Reviews (With Examples)",
        description:
          "Learn how to respond to positive, negative, and neutral Google reviews with real examples and templates. Boost your reputation and win more customers.",
        datePublished: "2026-03-26T00:00:00Z",
        dateModified: "2026-03-26T00:00:00Z",
        author: {
          "@type": "Organization",
          name: "ProofPost Team",
          url: "https://proofpst.com",
        },
        publisher: {
          "@type": "Organization",
          name: "ProofPost",
          url: "https://proofpst.com",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://proofpst.com/blog/respond-to-google-reviews",
        },
        url: "https://proofpst.com/blog/respond-to-google-reviews",
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
            name: "Blog",
            item: "https://proofpst.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "How to Respond to Google Reviews",
            item: "https://proofpst.com/blog/respond-to-google-reviews",
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
            href="/blog"
            className="hover:text-slate-600 transition-colors"
          >
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-600">
            How to Respond to Google Reviews
          </span>
        </nav>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
          How to Respond to Google Reviews (With Examples)
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
          <span>By ProofPost Team</span>
          <span>&middot;</span>
          <time dateTime="2026-03-26">March 26, 2026</time>
        </div>

        <div className="mt-10 prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-emerald prose-a:no-underline hover:prose-a:underline [&_h2]:text-[22px] [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-[18px] [&_h3]:text-slate-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-slate-600 [&_li]:text-[15px] [&_li]:text-slate-600">
          <p>
            Google reviews are the front door to your business. 93% of consumers say online reviews influence their purchasing decisions, and Google is where most of them start. How you respond to those reviews — both positive and negative — shapes your reputation, builds trust, and directly impacts whether new customers choose you.
          </p>
          <p>
            This guide gives you a complete framework for responding to every type of Google review, with real examples you can adapt for your business.
          </p>

          <h2>Why Responding to Google Reviews Matters</h2>
          <p>
            Many businesses treat Google reviews as a passive metric. They check their star rating occasionally but never engage with reviewers. This is a missed opportunity. Here is why responding matters:
          </p>
          <ul>
            <li><strong>It improves your local SEO.</strong> Google has confirmed that responding to reviews is a factor in local search rankings. Businesses that actively engage with reviews rank higher in Google Maps and local search results.</li>
            <li><strong>It builds trust with prospective customers.</strong> When prospects read your reviews, they also read your responses. A thoughtful, professional response shows you care about customer experience — even when things go wrong.</li>
            <li><strong>It turns negative experiences around.</strong> A well-crafted response to a negative review can change the reviewer&apos;s mind. Many customers update their ratings after a business responds constructively.</li>
            <li><strong>It encourages more reviews.</strong> When customers see that you read and respond to reviews, they are more likely to leave their own. It signals that their feedback matters.</li>
            <li><strong>It gives you the last word.</strong> An unanswered negative review tells your story from one side. A response lets you share context, correct inaccuracies, and demonstrate professionalism.</li>
          </ul>

          <h2>How to Respond to Positive Reviews</h2>
          <p>
            Positive reviews deserve attention too. A quick, genuine response reinforces the customer&apos;s positive experience and shows future readers that you value feedback.
          </p>

          <h3>5-Star Review Response Examples</h3>
          <p>
            Five-star reviews are your strongest assets. Respond with warmth, specificity, and gratitude:
          </p>
          <blockquote>
            <p>
              &quot;Thank you so much, [Name]! We are thrilled to hear that you had a great experience with [specific product/service]. Your kind words mean a lot to our team. We look forward to serving you again!&quot;
            </p>
          </blockquote>
          <blockquote>
            <p>
              &quot;[Name], this made our day! We are glad that [specific detail from the review] exceeded your expectations. It is customers like you that make what we do worthwhile. Thank you for taking the time to share your experience.&quot;
            </p>
          </blockquote>
          <blockquote>
            <p>
              &quot;What a wonderful review, [Name]! We put a lot of care into [specific aspect they mentioned], so it is incredibly rewarding to hear it resonated with you. Thanks for the recommendation — we truly appreciate it.&quot;
            </p>
          </blockquote>

          <h3>4-Star Review Response Examples</h3>
          <p>
            Four-star reviews often contain both praise and constructive feedback. Acknowledge the positive, and gently address what could be improved:
          </p>
          <blockquote>
            <p>
              &quot;Thank you for the great review, [Name]! We are glad you enjoyed [positive aspect]. We noticed you mentioned [area for improvement] — that is valuable feedback and something we are actively working on. We would love to earn that 5th star next time!&quot;
            </p>
          </blockquote>
          <blockquote>
            <p>
              &quot;Thanks for sharing your experience, [Name]. We are happy to hear [specific positive]. We take your feedback about [specific point] to heart and are always looking for ways to improve. Hope to see you again soon!&quot;
            </p>
          </blockquote>

          <h2>How to Respond to Negative Reviews</h2>
          <p>
            Negative reviews are uncomfortable, but they are also opportunities. A professional, empathetic response can turn a critic into an advocate — and shows prospective customers how you handle adversity.
          </p>
          <p>
            The golden rules for responding to negative reviews:
          </p>
          <ul>
            <li><strong>Respond quickly.</strong> Aim for within 24 to 48 hours. A fast response shows you take feedback seriously.</li>
            <li><strong>Stay calm and professional.</strong> Never get defensive, sarcastic, or argumentative. Even if the review is unfair, your response is being read by hundreds of prospective customers.</li>
            <li><strong>Acknowledge their experience.</strong> Start by thanking them for their feedback and acknowledging their frustration. Validation goes a long way.</li>
            <li><strong>Take it offline.</strong> Provide a direct contact (email or phone) so you can resolve the issue privately. Public back-and-forth rarely ends well.</li>
            <li><strong>Offer a solution.</strong> Where possible, explain what you are doing to fix the issue and offer to make it right.</li>
          </ul>

          <h3>1-Star Review Response Examples</h3>
          <blockquote>
            <p>
              &quot;[Name], thank you for bringing this to our attention. We are sorry to hear that your experience did not meet your expectations. This is not the standard we hold ourselves to. I would like to personally look into this and make it right. Could you reach out to us at [email/phone]? We want to resolve this for you.&quot;
            </p>
          </blockquote>
          <blockquote>
            <p>
              &quot;We appreciate your honest feedback, [Name]. We take every review seriously, and we are sorry about [specific issue mentioned]. We have already [action taken or planned] to prevent this from happening again. Please contact us directly at [email] so we can address your concerns. Thank you for giving us the opportunity to improve.&quot;
            </p>
          </blockquote>

          <h3>2-Star Review Response Examples</h3>
          <blockquote>
            <p>
              &quot;Thank you for your feedback, [Name]. We are disappointed that we fell short on [specific issue]. We have shared your comments with our team and are taking steps to improve. We value your business and would welcome the chance to provide a better experience. Feel free to reach out to us at [email/phone].&quot;
            </p>
          </blockquote>
          <blockquote>
            <p>
              &quot;[Name], we hear you and we are sorry. A 2-star experience is not what we aim for. We are looking into [specific concern] and making changes. If you are willing, we would love a second chance to show you what we are capable of. Please reach out to [email] and we will take care of you personally.&quot;
            </p>
          </blockquote>

          <h2>How to Respond to Neutral Reviews (3-Star)</h2>
          <p>
            Three-star reviews are tricky because the customer was neither thrilled nor upset. They are on the fence — and your response can tip them in either direction.
          </p>
          <blockquote>
            <p>
              &quot;Thank you for your honest review, [Name]. We are glad that [positive aspect] worked for you, and we appreciate your candid feedback about [area for improvement]. We are always working to improve and your input helps us get better. We would love to earn a higher rating next time — feel free to reach out if there is anything we can do.&quot;
            </p>
          </blockquote>
          <blockquote>
            <p>
              &quot;[Name], thank you for taking the time to share your thoughts. A 3-star review tells us we have work to do, and we take that seriously. We have noted your feedback about [specific point] and are working on it. If you have any additional suggestions, we are all ears at [email]. We hope to exceed your expectations next time.&quot;
            </p>
          </blockquote>

          <h2>Review Response Do&apos;s and Don&apos;ts</h2>

          <h3>Do</h3>
          <ul>
            <li>Respond to every review — positive, negative, and neutral.</li>
            <li>Personalize each response. Use the reviewer&apos;s name and reference specific details from their review.</li>
            <li>Respond within 24 to 48 hours. Speed demonstrates that you care.</li>
            <li>Thank the reviewer, even for negative feedback. Gratitude is disarming.</li>
            <li>Take negative conversations offline with a direct email or phone number.</li>
            <li>Keep responses concise. Two to four sentences is usually enough for positive reviews. Negative reviews may need slightly longer responses.</li>
            <li>Use your business name and relevant keywords naturally in responses. This helps with local SEO.</li>
          </ul>

          <h3>Don&apos;t</h3>
          <ul>
            <li>Don&apos;t get defensive or argumentative. You are writing for the hundreds of prospects who will read this, not just the reviewer.</li>
            <li>Don&apos;t copy-paste the same generic response for every review. Customers notice, and it looks lazy.</li>
            <li>Don&apos;t offer incentives for changing a review. This violates Google&apos;s policies and erodes trust.</li>
            <li>Don&apos;t ignore negative reviews. Silence is worse than a bad response because it signals you do not care.</li>
            <li>Don&apos;t share private customer information in your response. Keep it professional and general.</li>
            <li>Don&apos;t blame the customer. Even when they are wrong, take the high road.</li>
          </ul>

          <h2>Get Your Google Review Link</h2>
          <p>
            Before you can respond to reviews, you need customers leaving them. The easiest way to get more Google reviews is to share a direct link that takes customers straight to the review form.
          </p>
          <p>
            <Link href="/tools/google-review-link">Use our free Google Review Link Generator</Link>{" "}
            to create a shareable link for your business in seconds. Add it to your email signature, post-purchase emails, invoices, and website.
          </p>

          <h2>Review Response Templates</h2>
          <p>
            Need more templates beyond the examples in this guide?{" "}
            <Link href="/tools/review-response-examples">Browse our library of review response examples</Link>{" "}
            organized by star rating, industry, and tone. Copy and customize any template with one click.
          </p>
          <p>
            You can also check your overall review performance with our{" "}
            <Link href="/tools/star-rating-calculator">star rating calculator</Link>{" "}
            to understand your average rating and how it compares to competitors.
          </p>

          <h2>Display Your Best Reviews on Your Website</h2>
          <p>
            Responding to Google reviews is essential, but don&apos;t stop there. Your best reviews should be working for you on your own website — on landing pages, pricing pages, and everywhere prospects make buying decisions.
          </p>
          <p>
            The problem is that most businesses either do not display reviews at all, or display them as static text that visitors scroll past. The solution is animated social proof widgets that grab attention and build trust in real time.
          </p>
          <p>
            <strong>ProofPost turns your best Google reviews into animated social proof widgets</strong>{" "}
            that you can embed on any page of your website. Extract the most powerful line from a review, pair it with the reviewer&apos;s name and star rating, and display it as an eye-catching widget — all in under 60 seconds.
          </p>
        </div>
      </article>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Great reviews deserve great display
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Showcase your best reviews as{" "}
            <span className="text-emerald">social proof widgets</span>.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost turns customer reviews into animated social proof
            widgets for your website. Embed real reviews in 60 seconds and
            let your happy customers sell for you.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Try ProofPost Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-3 text-[13px] text-slate-500">
            No credit card required &middot; $9/mo after trial
          </p>
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
