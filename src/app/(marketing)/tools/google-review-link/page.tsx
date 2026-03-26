import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { LinkGenerator } from "./link-generator";

export const metadata: Metadata = {
  title:
    "Free Google Review Link Generator — Get Your Direct Review URL | ProofPost",
  description:
    "Generate a direct Google review link for your business in seconds. Share with customers via email, SMS, or QR code. Free, no signup required.",
  keywords: [
    "google review link generator",
    "google review link",
    "google review url",
    "google review qr code",
    "get google reviews",
    "google place id",
  ],
  openGraph: {
    title:
      "Free Google Review Link Generator — Get Your Direct Review URL | ProofPost",
    description:
      "Generate a direct Google review link for your business in seconds. Free, no signup.",
    url: "https://proofpst.com/tools/google-review-link",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/tools/google-review-link",
  },
};

const faqItems = [
  {
    question: "What is a Google review link?",
    answer:
      "A Google review link is a direct URL that takes customers straight to the review form for your Google Business Profile. Instead of asking customers to search for your business on Google Maps and navigate to the review section, you give them a one-click link that opens the review popup immediately. This removes friction and dramatically increases the number of reviews you receive.",
  },
  {
    question: "How do I find my Google Place ID?",
    answer:
      'Your Google Place ID is a unique identifier for your business on Google. The easiest way to find it is to visit the Google Place ID Finder (developers.google.com/maps/documentation/places/web-service/place-id), search for your business name, and copy the Place ID shown in the results. It starts with "ChI" and is a long alphanumeric string.',
  },
  {
    question: "Why should I use a direct Google review link?",
    answer:
      "Businesses that share direct review links see significantly more reviews than those that simply ask customers to leave feedback. The reason is simple: every extra step a customer has to take reduces the likelihood they will follow through. A direct link eliminates searching, navigating, and finding the review button — it opens the review form in one click.",
  },
  {
    question: "Where should I share my Google review link?",
    answer:
      "The most effective places to share your review link are: follow-up emails after a purchase or service, SMS messages, printed QR codes at your physical location, your website thank-you page, email signatures, receipts, and social media bios. The key is to ask at the moment when the customer is most satisfied with your service.",
  },
  {
    question: "Can I use this link in a QR code?",
    answer:
      "Yes. The generated Google review link works perfectly with any QR code generator. Simply copy the link and paste it into a QR code tool to create a scannable code. Many businesses print QR codes on table tents, receipts, business cards, and in-store signage so customers can leave a review on the spot from their phone.",
  },
];

export default function GoogleReviewLinkPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Google Review Link Generator",
        description:
          "Generate a direct Google review link for your business in seconds.",
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
        url: "https://proofpst.com/tools/google-review-link",
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
            name: "Google Review Link Generator",
            item: "https://proofpst.com/tools/google-review-link",
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
          <span className="text-slate-600">Google Review Link Generator</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              Free Google Review Link Generator
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Generate a direct Google review link for your business in seconds.
              Share it with customers via email, SMS, or QR code to get more
              reviews.
            </p>
          </div>
        </div>
      </section>

      {/* Generator */}
      <section className="bg-snow py-12">
        <div className="max-w-3xl mx-auto px-6">
          <LinkGenerator />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Getting more Google reviews?
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Display the best ones on your{" "}
            <span className="text-emerald">website</span>.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            Turn your best Google reviews into animated social proof widgets.
            Embed real reviews on your website in 60 seconds. No developer
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
            <h2>What Is a Google Review Link?</h2>
            <p>
              A Google review link is a special URL that opens the Google review
              form directly for your business. Instead of asking customers to
              search for you on Google Maps, find your business, scroll down to
              the reviews section, and click &ldquo;Write a review,&rdquo; you
              give them a single link that skips every step and opens the review
              popup immediately.
            </p>
            <p>
              The link format uses your Google Place ID &mdash; a unique
              identifier assigned to every location on Google Maps. When a
              customer clicks the link, Google recognizes the Place ID and opens
              the review form for that specific business.
            </p>

            <h2>How to Find Your Google Place ID</h2>
            <p>
              Your Google Place ID is a unique string that identifies your
              business on Google. Here is how to find it:
            </p>
            <ul>
              <li>
                <strong>Google Place ID Finder:</strong> Visit{" "}
                <a
                  href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google&apos;s official Place ID Finder
                </a>
                , type your business name in the search bar, and your Place ID
                will appear in the info window.
              </li>
              <li>
                <strong>Google Maps:</strong> Search for your business on Google
                Maps, click on it, and look at the URL. The Place ID is often
                embedded in the URL after &ldquo;place/&rdquo;.
              </li>
              <li>
                <strong>Google Business Profile:</strong> If you manage your
                listing through Google Business Profile, your Place ID is
                available in the dashboard settings under the &ldquo;Info&rdquo;
                section.
              </li>
            </ul>
            <p>
              Place IDs start with &ldquo;ChI&rdquo; followed by a long
              alphanumeric string. For example:{" "}
              <code>ChIJN1t_tDeuEmsRUsoyG83frY4</code>.
            </p>

            <h2>Why Direct Review Links Get More Reviews</h2>
            <p>
              Every extra step in the review process costs you reviews. Research
              shows that reducing friction in the customer journey can increase
              conversion rates by 20-30%. Here is why direct links work:
            </p>
            <ul>
              <li>
                <strong>One-click access:</strong> Customers go straight to the
                review form without searching or navigating.
              </li>
              <li>
                <strong>Mobile-friendly:</strong> The link works on any device
                and opens the native Google review experience.
              </li>
              <li>
                <strong>No confusion:</strong> Customers do not need to figure
                out where to leave a review. The form is right there.
              </li>
              <li>
                <strong>Timely delivery:</strong> You can send the link
                immediately after a positive interaction when the customer is
                most likely to leave a good review.
              </li>
            </ul>

            <h2>Best Practices for Sharing Your Review Link</h2>
            <p>
              Generating the link is just the first step. How and when you share
              it makes all the difference:
            </p>
            <ul>
              <li>
                <strong>Ask at the right moment:</strong> Send the link right
                after a successful purchase, completed project, or positive
                customer interaction.
              </li>
              <li>
                <strong>Use multiple channels:</strong> Share via email, SMS,
                WhatsApp, printed QR codes, and in-person requests. Different
                customers prefer different channels.
              </li>
              <li>
                <strong>Keep the message short:</strong> A brief, personal
                message with the link works better than a long email. Something
                like &ldquo;Thanks for choosing us! Would you mind sharing your
                experience?&rdquo; followed by the link.
              </li>
              <li>
                <strong>Add it to your email signature:</strong> Include a small
                &ldquo;Leave us a review&rdquo; link in every email your team
                sends.
              </li>
              <li>
                <strong>Print QR codes:</strong> Place QR codes (generated from
                this link) on receipts, business cards, table tents, and
                in-store signage.
              </li>
              <li>
                <strong>Do not incentivize reviews:</strong> Google&apos;s
                policies prohibit offering discounts or rewards in exchange for
                reviews. Keep it genuine.
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
