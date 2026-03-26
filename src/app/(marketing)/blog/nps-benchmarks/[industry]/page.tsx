import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight, TrendingUp, BarChart3, Target } from "lucide-react";
import { notFound } from "next/navigation";
import {
  npsIndustries,
  getNpsIndustryBySlug,
  getRelatedNpsIndustries,
  getComparisonIndustries,
} from "../industry-nps-data";

export async function generateStaticParams() {
  return npsIndustries.map((industry) => ({
    industry: industry.slug,
  }));
}

export const dynamicParams = false;

type Props = {
  params: Promise<{ industry: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const data = getNpsIndustryBySlug(industry);
  if (!data) return {};

  const title = `${data.name} NPS Benchmarks 2026 — Average Score & Top Companies | ProofPost`;
  const description = `What is a good NPS score for ${data.name.toLowerCase()}? The ${data.name.toLowerCase()} industry average NPS is ${data.averageNps}. See top quartile scores, leading companies, and how to improve.`;

  return {
    title,
    description,
    openGraph: {
      title: `${data.name} NPS Benchmarks 2026 — Average Score & Top Companies`,
      description,
      url: `https://proofpst.com/blog/nps-benchmarks/${data.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `https://proofpst.com/blog/nps-benchmarks/${data.slug}`,
    },
  };
}

function getNpsColor(nps: number): string {
  if (nps >= 50) return "text-emerald";
  if (nps >= 30) return "text-amber-500";
  if (nps >= 0) return "text-orange-500";
  return "text-red-500";
}

function getNpsBgColor(nps: number): string {
  if (nps >= 50) return "bg-emerald/10";
  if (nps >= 30) return "bg-amber-50";
  if (nps >= 0) return "bg-orange-50";
  return "bg-red-50";
}

function getNpsLabel(nps: number): string {
  if (nps >= 70) return "World-class";
  if (nps >= 50) return "Excellent";
  if (nps >= 30) return "Good";
  if (nps >= 0) return "Needs improvement";
  return "Critical";
}

export default async function IndustryNpsBenchmarkPage({ params }: Props) {
  const { industry } = await params;
  const data = getNpsIndustryBySlug(industry);

  if (!data) {
    notFound();
  }

  const relatedIndustries = getRelatedNpsIndustries(data.relatedIndustries);
  const comparisonIndustries = getComparisonIndustries(data.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${data.name} NPS Benchmarks 2026 — Average Score & Top Companies`,
        description: data.description,
        url: `https://proofpst.com/blog/nps-benchmarks/${data.slug}`,
        datePublished: "2026-03-27",
        dateModified: "2026-03-27",
        publisher: {
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
            name: "Blog",
            item: "https://proofpst.com/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "NPS Benchmarks",
            item: "https://proofpst.com/blog/nps-benchmarks",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `${data.name} NPS Benchmarks`,
            item: `https://proofpst.com/blog/nps-benchmarks/${data.slug}`,
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
          <Link
            href="/blog/nps-benchmarks"
            className="hover:text-slate-600 transition-colors"
          >
            NPS Benchmarks
          </Link>
          <span>/</span>
          <span className="text-slate-600">{data.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
              NPS Benchmarks 2026
            </p>
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              {data.name} NPS Benchmarks
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="bg-snow py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3
                  className="w-4 h-4 text-slate-400"
                  aria-hidden="true"
                />
                <span className="text-[13px] font-medium text-slate-400 uppercase tracking-wider">
                  Industry Average
                </span>
              </div>
              <p
                className={`text-[48px] font-bold leading-none ${getNpsColor(data.averageNps)}`}
              >
                {data.averageNps}
              </p>
              <p className="mt-2 text-[13px] text-slate-400">
                {getNpsLabel(data.averageNps)}
              </p>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp
                  className="w-4 h-4 text-emerald"
                  aria-hidden="true"
                />
                <span className="text-[13px] font-medium text-slate-400 uppercase tracking-wider">
                  Top Quartile
                </span>
              </div>
              <p className="text-[48px] font-bold text-emerald leading-none">
                {data.topQuartileNps}
              </p>
              <p className="mt-2 text-[13px] text-slate-400">Top 25% score</p>
            </div>
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target
                  className="w-4 h-4 text-orange-500"
                  aria-hidden="true"
                />
                <span className="text-[13px] font-medium text-slate-400 uppercase tracking-wider">
                  Bottom Quartile
                </span>
              </div>
              <p className="text-[48px] font-bold text-orange-500 leading-none">
                {data.bottomQuartileNps}
              </p>
              <p className="mt-2 text-[13px] text-slate-400">
                Bottom 25% score
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Comparison */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-8">
            How {data.name} Compares to Other Industries
          </h2>
          <div className="space-y-4 max-w-3xl">
            {comparisonIndustries.map((item) => {
              const isCurrentIndustry = item.slug === data.slug;
              const barWidth = Math.max(
                ((item.averageNps + 10) / 110) * 100,
                5
              );
              return (
                <div key={item.slug} className="flex items-center gap-4">
                  <div className="w-36 sm:w-44 shrink-0">
                    {isCurrentIndustry ? (
                      <span className="text-[14px] font-semibold text-slate-900">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={`/blog/nps-benchmarks/${item.slug}`}
                        className="text-[14px] text-slate-600 hover:text-emerald transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-6 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCurrentIndustry ? "bg-emerald" : "bg-slate-300"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span
                      className={`text-[14px] font-semibold w-8 text-right ${
                        isCurrentIndustry ? "text-emerald" : "text-slate-600"
                      }`}
                    >
                      {item.averageNps}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-[12px] text-slate-400">
            Showing average NPS scores. Higher is better. Scale: -100 to 100.
          </p>
        </div>
      </section>

      {/* Top Companies */}
      <section className="bg-snow py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-8">
            Top {data.name} Companies by NPS
          </h2>
          <div className="max-w-2xl">
            <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200/80 text-[12px] font-medium text-slate-400 uppercase tracking-wider">
                <span>Company</span>
                <span>NPS Score</span>
                <span>Rating</span>
              </div>
              {data.topCompanies.map((company, i) => (
                <div
                  key={company.name}
                  className={`grid grid-cols-[1fr,auto,auto] gap-4 px-6 py-4 items-center ${
                    i !== data.topCompanies.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <span className="text-[15px] font-medium text-slate-900">
                    {company.name}
                  </span>
                  <span
                    className={`text-[15px] font-bold ${getNpsColor(company.nps)}`}
                  >
                    {company.nps}
                  </span>
                  <span
                    className={`text-[12px] font-medium px-2.5 py-1 rounded-full ${getNpsBgColor(company.nps)} ${getNpsColor(company.nps)}`}
                  >
                    {getNpsLabel(company.nps)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-8">
            Key {data.name} NPS Insights
          </h2>
          <div className="max-w-3xl space-y-6">
            {data.keyInsights.map((insight, i) => (
              <div
                key={i}
                className="flex gap-4 items-start border border-slate-200/80 rounded-xl p-5"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[14px] font-bold text-emerald">
                    {i + 1}
                  </span>
                </div>
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: NPS Calculator */}
      <section className="bg-snow py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12">
            <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
              Free Tool
            </p>
            <h2 className="text-[24px] sm:text-[28px] font-bold text-slate-900 leading-tight">
              Calculate Your Own NPS
            </h2>
            <p className="mt-4 text-[16px] text-slate-500 leading-relaxed max-w-xl mx-auto">
              See how your {data.name.toLowerCase()} business stacks up against
              these benchmarks. Use our free NPS calculator to compute your score
              instantly.
            </p>
            <Link
              href="/tools/nps-calculator"
              className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
            >
              Try the NPS Calculator
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Industries */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-6">
            Related Industry Benchmarks
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedIndustries.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/nps-benchmarks/${related.slug}`}
                className="group border border-slate-200/80 rounded-xl p-5 hover:border-emerald/40 hover:bg-emerald/5 transition-all duration-200"
              >
                <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-emerald transition-colors">
                  {related.name} NPS
                </h3>
                <p className="mt-1.5 text-[13px] text-slate-400">
                  Average:{" "}
                  <span className={`font-semibold ${getNpsColor(related.averageNps)}`}>
                    {related.averageNps}
                  </span>
                </p>
                <span className="inline-flex items-center gap-1 mt-3 text-[12px] font-medium text-emerald opacity-0 group-hover:opacity-100 transition-opacity">
                  View benchmarks
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-snow py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-slate prose-sm max-w-none [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-slate-600 [&_li]:text-[15px] [&_li]:text-slate-600">
            <h2>
              What Is a Good NPS Score for {data.name}?
            </h2>
            <p>
              A good NPS score for {data.name.toLowerCase()} is anything above
              the industry average of {data.averageNps}. This puts you ahead of
              most competitors and indicates a healthy level of customer
              satisfaction. Scores in the top quartile ({data.topQuartileNps}+)
              are considered excellent and suggest strong customer loyalty that
              drives organic growth through referrals.
            </p>
            <p>
              Keep in mind that NPS varies significantly within{" "}
              {data.name.toLowerCase()} depending on company size, market
              segment, and geography. The most meaningful benchmark is your own
              trend over time. A company consistently improving its NPS is in a
              stronger position than one with a high but declining score.
            </p>

            <h2>How to Improve Your {data.name} NPS</h2>
            <p>
              Improving NPS in the {data.name.toLowerCase()} industry starts
              with understanding what drives satisfaction for your specific
              customers. Here are actionable strategies:
            </p>
            <ul>
              <li>
                <strong>Close the feedback loop.</strong> Follow up with
                detractors within 24-48 hours. Understanding their specific
                complaints and showing you care can recover 25-40% of
                detractors.
              </li>
              <li>
                <strong>Identify your key drivers.</strong> Analyze open-ended
                NPS comments to find the themes that correlate most strongly
                with promoter and detractor scores. Focus improvement efforts on
                these high-impact areas.
              </li>
              <li>
                <strong>Empower frontline staff.</strong> Give customer-facing
                teams the authority and tools to resolve issues on the spot.
                Escalation and wait times are among the top detractor drivers
                across all industries.
              </li>
              <li>
                <strong>Measure consistently.</strong> Send NPS surveys at
                regular intervals using the same methodology. Quarterly
                relationship NPS supplemented by transactional NPS after key
                moments gives you both trend data and actionable insights.
              </li>
              <li>
                <strong>Turn promoters into advocates.</strong> Make it easy for
                promoters to share their experience. Referral programs,
                testimonial collection, and review requests channeled to
                promoters can amplify their positive sentiment.
              </li>
            </ul>
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

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Turn feedback into growth
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            Boost your {data.name.toLowerCase()} NPS with{" "}
            <span className="text-emerald">social proof</span>
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            ProofPost helps {data.name.toLowerCase()} businesses collect
            testimonials from their happiest customers and display them as
            beautiful social proof widgets. Turn your promoters into your best
            marketing channel.
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
