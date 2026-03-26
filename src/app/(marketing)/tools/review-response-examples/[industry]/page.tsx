import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import {
  industries,
  getIndustryBySlug,
  getResponsesForIndustry,
  getRelatedIndustries,
} from "../industry-response-data";
import { IndustryResponseBrowser } from "./industry-response-browser";

export async function generateStaticParams() {
  return industries.map((industry) => ({
    industry: industry.slug,
  }));
}

export const dynamicParams = false;

type Props = {
  params: Promise<{ industry: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const data = getIndustryBySlug(industry);
  if (!data) return {};

  const title = `${data.name} Review Response Examples — Free Templates | ProofPost`;
  const description = `Copy-paste ${data.name.toLowerCase()} review response templates for 1-5 star reviews. Professional responses tailored for ${data.name.toLowerCase()}. Free.`;

  return {
    title,
    description,
    keywords: data.keywords,
    openGraph: {
      title: `${data.name} Review Response Examples — Free Templates`,
      description,
      url: `https://proofpst.com/tools/review-response-examples/${data.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `https://proofpst.com/tools/review-response-examples/${data.slug}`,
    },
  };
}

export default async function IndustryReviewResponsePage({ params }: Props) {
  const { industry } = await params;
  const data = getIndustryBySlug(industry);

  if (!data) {
    notFound();
  }

  const responses = getResponsesForIndustry(industry);
  const relatedIndustries = getRelatedIndustries(data.relatedIndustries);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${data.name} Review Response Examples`,
        description: data.description,
        url: `https://proofpst.com/tools/review-response-examples/${data.slug}`,
        creator: {
          "@type": "Organization",
          name: "ProofPost",
          url: "https://proofpst.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faq.map((item) => ({
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
          {
            "@type": "ListItem",
            position: 4,
            name: `${data.name} Review Response Examples`,
            item: `https://proofpst.com/tools/review-response-examples/${data.slug}`,
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
          <Link
            href="/tools/review-response-examples"
            className="hover:text-slate-600 transition-colors"
          >
            Review Response Examples
          </Link>
          <span>/</span>
          <span className="text-slate-600">{data.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              {data.name} Review Response Examples
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Response Browser */}
      <section className="bg-snow py-12">
        <div className="max-w-6xl mx-auto px-6">
          <IndustryResponseBrowser responses={responses} />
        </div>
      </section>

      {/* Related Industries */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-6">
            Browse More Industries
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedIndustries.map((related) => (
              <Link
                key={related.slug}
                href={`/tools/review-response-examples/${related.slug}`}
                className="group border border-slate-200/80 rounded-xl p-5 hover:border-emerald/40 hover:bg-emerald/5 transition-all duration-200"
              >
                <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-emerald transition-colors">
                  {related.name} Review Response Examples
                </h3>
                <p className="mt-1.5 text-[13px] text-slate-400 leading-relaxed line-clamp-2">
                  {related.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-[12px] font-medium text-emerald opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse examples
                  <ArrowRight className="w-3 h-3" />
                </span>
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
            Great at responding to {data.name.toLowerCase()} reviews? Now{" "}
            <span className="text-emerald">display</span> the best ones.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost helps {data.name.toLowerCase()} businesses collect, manage,
            and display authentic customer reviews as beautiful social proof
            widgets. Embed real reviews on your website in 60 seconds.
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
            <h2>Why Responding to {data.name} Reviews Matters</h2>
            <p>{data.whyMatters}</p>

            <h2>Tips for Responding to {data.name} Reviews</h2>
            <p>
              Crafting the right response to {data.name.toLowerCase()} reviews
              requires a balance of professionalism, empathy, and brand voice.
              Here are proven strategies:
            </p>
            <ul>
              {data.respondingTips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
            <p>
              Use these {data.name.toLowerCase()} review response examples as
              starting templates, then customize them with specific details from
              each review. The most effective responses are personalized,
              genuine, and show that you actually read what the customer wrote.
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
            {data.faq.map((item, i) => (
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
