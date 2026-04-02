import type { Metadata } from "next";
import Link from "next/link";
import {
  Star,
  FileText,
  BarChart3,
  MessageSquare,
  ArrowRight,
  LinkIcon,
  Calculator,
  Mail,
  ClipboardList,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Marketing Tools",
  description:
    "Free tools for marketers: testimonial generators, NPS calculators, review response templates, and more. No signup required.",
  openGraph: {
    title: "Free Marketing Tools | ProofPost",
    description: "Free tools to boost your social proof and conversions.",
    url: "https://proofpst.com/tools",
  },
  alternates: {
    canonical: "https://proofpst.com/tools",
  },
};

const tools = [
  {
    title: "Social Proof Scanner",
    description:
      "Scan any website for social proof elements. Get a free score (0-100) with recommendations.",
    href: "/tools/social-proof-scanner",
    icon: Search,
    badge: "Live",
  },
  {
    title: "Short Testimonial Examples",
    description:
      "Browse 60+ short testimonial samples by industry. Copy and customize for your website.",
    href: "/tools/short-testimonial-generator",
    icon: FileText,
    badge: "Live",
  },
  {
    title: "Testimonial Examples Library",
    description:
      "100+ full-length testimonial examples organized by industry and use case.",
    href: "/tools/testimonial-examples",
    icon: FileText,
    badge: "Live",
  },
  {
    title: "NPS Calculator",
    description:
      "Calculate your Net Promoter Score instantly with industry benchmarks.",
    href: "/tools/nps-calculator",
    icon: BarChart3,
    badge: "Live",
  },
  {
    title: "Google Review Link Generator",
    description:
      "Generate a direct Google review link for your business. Share via email, SMS, or QR code.",
    href: "/tools/google-review-link",
    icon: LinkIcon,
    badge: "Live",
  },
  {
    title: "Review Response Examples",
    description:
      "100+ copy-paste review response templates for 1-5 star Google reviews by industry.",
    href: "/tools/review-response-examples",
    icon: MessageSquare,
    badge: "Live",
  },
  {
    title: "CSAT Calculator",
    description:
      "Calculate your Customer Satisfaction Score with industry benchmarks.",
    href: "/tools/csat-calculator",
    icon: Calculator,
    badge: "Live",
  },
  {
    title: "Testimonial Request Emails",
    description:
      "50+ copy-paste email templates for requesting testimonials from customers.",
    href: "/tools/testimonial-request-email",
    icon: Mail,
    badge: "Live",
  },
  {
    title: "Testimonial Form Templates",
    description:
      "40+ testimonial form templates with the best questions to ask customers.",
    href: "/tools/testimonial-form-templates",
    icon: ClipboardList,
    badge: "Live",
  },
  {
    title: "Star Rating Calculator",
    description:
      "Calculate your average star rating from review data with distribution breakdown.",
    href: "/tools/star-rating-calculator",
    icon: Star,
    badge: "Live",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white">
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
              className="text-sm text-emerald font-medium transition-colors duration-200 px-3 py-2 hidden sm:block"
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

      {/* Hero */}
      <section className="bg-snow py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-[32px] sm:text-[40px] font-bold text-slate-900 leading-tight tracking-tight">
              Free Marketing Tools
            </h1>
            <p className="mt-4 text-[17px] text-slate-500 leading-relaxed">
              Practical tools for marketers who want better social proof and
              higher conversions. No signup required.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {tools.map((tool) => {
              const isLive = tool.badge === "Live";
              const Icon = tool.icon;

              const cardContent = (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <Icon
                      className="w-6 h-6 text-emerald"
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                        isLive
                          ? "bg-emerald/10 text-emerald"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  </div>
                  <h2 className="text-[18px] font-semibold text-slate-900 mb-2">
                    {tool.title}
                  </h2>
                  <p className="text-[14px] text-slate-500 leading-relaxed">
                    {tool.description}
                  </p>
                  {isLive && (
                    <div className="mt-4 flex items-center gap-1.5 text-[13px] font-medium text-emerald group-hover:gap-2.5 transition-all duration-200">
                      Use tool
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </>
              );

              const className = `group border border-slate-200/80 rounded-xl p-8 transition-all duration-200 ${
                isLive
                  ? "hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                  : "opacity-60"
              }`;

              return isLive ? (
                <Link key={tool.title} href={tool.href} className={className}>
                  {cardContent}
                </Link>
              ) : (
                <div key={tool.title} className={className}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[24px] font-bold text-white">
            Need more than free tools?
          </h2>
          <p className="mt-3 text-[16px] text-slate-400">
            ProofPost turns your real customer reviews into animated widgets that
            boost conversions. Live in 60 seconds.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 mt-8 text-[15px] font-medium text-white bg-emerald hover:bg-emerald-dark px-8 py-3.5 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Try ProofPost Free
            <ArrowRight className="w-4 h-4" />
          </Link>
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
