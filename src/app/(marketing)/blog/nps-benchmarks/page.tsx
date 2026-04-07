import type { Metadata } from "next";
import Link from "next/link";
import { Star, ArrowRight, TrendingUp } from "lucide-react";
import { npsIndustries } from "./industry-nps-data";

export const metadata: Metadata = {
  title: "NPS Benchmarks by Industry 2026 — Complete Guide | ProofPost",
  description:
    "Compare NPS benchmarks across 15 industries in 2026. See average NPS scores, top quartile ranges, and leading companies for SaaS, e-commerce, healthcare, and more.",
  openGraph: {
    title: "NPS Benchmarks by Industry 2026 — Complete Guide",
    description:
      "Compare NPS benchmarks across 15 industries in 2026. See average NPS scores, top quartile ranges, and leading companies.",
    url: "https://proofpst.com/blog/nps-benchmarks",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/blog/nps-benchmarks",
  },
};

function getNpsColor(nps: number): string {
  if (nps >= 50) return "text-emerald";
  if (nps >= 30) return "text-amber-500";
  if (nps >= 0) return "text-orange-500";
  return "text-red-500";
}

function getNpsBgColor(nps: number): string {
  if (nps >= 50) return "bg-emerald/10 border-emerald/20";
  if (nps >= 30) return "bg-amber-50 border-amber-200/60";
  if (nps >= 0) return "bg-orange-50 border-orange-200/60";
  return "bg-red-50 border-red-200/60";
}

const sortedIndustries = [...npsIndustries].sort(
  (a, b) => b.averageNps - a.averageNps
);

export default function NpsBenchmarksIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "NPS Benchmarks by Industry 2026 — Complete Guide",
        description:
          "Compare NPS benchmarks across 15 industries in 2026. See average NPS scores, top quartile ranges, and leading companies.",
        url: "https://proofpst.com/blog/nps-benchmarks",
        datePublished: "2026-03-27",
        dateModified: "2026-03-27",
        publisher: {
          "@type": "Organization",
          name: "ProofPost",
          url: "https://proofpst.com",
        },
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
            name: "NPS Benchmarks by Industry",
            item: "https://proofpst.com/blog/nps-benchmarks",
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
          <span className="text-slate-600">NPS Benchmarks</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-white pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
              Updated for 2026
            </p>
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              NPS Benchmarks by Industry
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              How does your NPS compare? Browse average Net Promoter Scores
              across 15 industries, see which companies lead, and find
              actionable insights to improve your score.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Table */}
      <section className="bg-snow py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[1fr,auto,auto,auto] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200/80 text-[12px] font-medium text-slate-400 uppercase tracking-wider">
              <span>Industry</span>
              <span className="hidden sm:block">Bottom 25%</span>
              <span>Average</span>
              <span className="hidden sm:block">Top 25%</span>
            </div>
            {sortedIndustries.map((industry, i) => (
              <Link
                key={industry.slug}
                href={`/blog/nps-benchmarks/${industry.slug}`}
                className={`grid grid-cols-[1fr,auto,auto,auto] gap-4 px-6 py-4 items-center hover:bg-emerald/5 transition-colors group ${
                  i !== sortedIndustries.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <span className="text-[15px] font-medium text-slate-900 group-hover:text-emerald transition-colors flex items-center gap-2">
                  {industry.name}
                  <ArrowRight className="w-3 h-3 text-emerald opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <span className="text-[14px] text-orange-500 font-medium hidden sm:block">
                  {industry.bottomQuartileNps}
                </span>
                <span
                  className={`text-[15px] font-bold ${getNpsColor(industry.averageNps)}`}
                >
                  {industry.averageNps}
                </span>
                <span className="text-[14px] text-emerald font-medium hidden sm:block">
                  {industry.topQuartileNps}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-[22px] font-bold text-slate-900 mb-8">
            Browse by Industry
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {npsIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/blog/nps-benchmarks/${industry.slug}`}
                className="group border border-slate-200/80 rounded-xl p-6 hover:border-emerald/40 hover:bg-emerald/5 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[15px] font-semibold text-slate-900 group-hover:text-emerald transition-colors">
                    {industry.name}
                  </h3>
                  <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${getNpsBgColor(industry.averageNps)}`}
                  >
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    <span
                      className={`text-[13px] font-bold ${getNpsColor(industry.averageNps)}`}
                    >
                      {industry.averageNps}
                    </span>
                  </div>
                </div>
                <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2">
                  {industry.description}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[12px] text-slate-400">
                    Top: {industry.topCompanies[0]?.name} ({industry.topCompanies[0]?.nps})
                  </span>
                  <span className="inline-flex items-center gap-1 text-[12px] font-medium text-emerald opacity-0 group-hover:opacity-100 transition-opacity">
                    View details
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NPS Calculator CTA */}
      <section className="bg-snow py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12">
            <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
              Free Tool
            </p>
            <h2 className="text-[24px] sm:text-[28px] font-bold text-slate-900 leading-tight">
              Calculate Your NPS
            </h2>
            <p className="mt-4 text-[16px] text-slate-500 leading-relaxed max-w-xl mx-auto">
              Know your numbers. Use our free calculator to compute your Net
              Promoter Score and see how you compare to industry benchmarks.
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

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[13px] font-medium text-emerald uppercase tracking-wider mb-3">
            Turn promoters into proof
          </p>
          <h2 className="text-[24px] sm:text-[28px] font-bold text-white leading-tight">
            High NPS? Show it off with{" "}
            <span className="text-emerald">ProofPost</span>.
          </h2>
          <p className="mt-4 text-[16px] text-slate-400 leading-relaxed max-w-xl mx-auto">
            Collect testimonials from your happiest customers and display them
            as beautiful social proof widgets. Embed real reviews on your
            website in 60 seconds.
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
