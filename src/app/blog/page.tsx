import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Star, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const metadata: Metadata = {
  title: "Blog — Social Proof Tips & Insights | ProofPost",
  description:
    "Tips and insights on social proof, customer reviews, testimonials, NPS, and conversion optimization for SaaS founders and marketers.",
  openGraph: {
    title: "Blog — Social Proof Tips & Insights | ProofPost",
    description:
      "Tips and insights on social proof, customer reviews, testimonials, NPS, and conversion optimization.",
    url: "https://proofpst.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://proofpst.com/blog",
  },
};

const staticPosts = [
  {
    slug: "social-proof-statistics",
    title:
      "75+ Social Proof Statistics for 2026 — Reviews, Testimonials & Trust Data",
    meta_description:
      "The most comprehensive collection of social proof statistics for 2026. Review stats, testimonial data, and consumer trust research. Updated monthly.",
    published_at: "2026-03-27",
    tags: ["Social Proof", "Statistics"],
  },
  {
    slug: "nps-benchmarks",
    title: "NPS Benchmarks by Industry 2026 — Complete Guide",
    meta_description:
      "Compare NPS benchmarks across 15 industries in 2026. See average NPS scores, top quartile ranges, and leading companies for SaaS, e-commerce, healthcare, and more.",
    published_at: "2026-03-27",
    tags: ["NPS", "Benchmarks"],
  },
  {
    slug: "how-to-ask-for-testimonials",
    title: "How to Ask for Testimonials: 7 Proven Methods + Templates",
    meta_description:
      "Learn how to ask customers for testimonials with 7 proven methods, email templates, and timing tips. Get more social proof for your business today.",
    published_at: "2026-03-26",
    tags: ["Testimonials", "Social Proof"],
  },
  {
    slug: "good-nps-score",
    title: "What Is a Good NPS Score? Benchmarks by Industry (2026)",
    meta_description:
      "Find out what a good NPS score is with industry benchmarks for 2026. Includes NPS ranges, how to calculate NPS, and tips to improve your score.",
    published_at: "2026-03-26",
    tags: ["NPS", "Customer Success"],
  },
  {
    slug: "respond-to-google-reviews",
    title: "How to Respond to Google Reviews (With Examples)",
    meta_description:
      "Learn how to respond to positive, negative, and neutral Google reviews with real examples and templates. Boost your reputation and win more customers.",
    published_at: "2026-03-26",
    tags: ["Reviews", "Reputation"],
  },
];

export default async function BlogPage() {
  const { data: dbPosts } = await supabase
    .from("blog_posts")
    .select("title, slug, meta_description, image_url, published_at, tags")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  // Merge static posts with Supabase posts, static first
  const allPosts = [
    ...staticPosts.map((p) => ({ ...p, image_url: null })),
    ...(dbPosts || []),
  ];

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
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2 hidden sm:block"
            >
              Free Tools
            </Link>
            <Link
              href="/blog"
              className="text-sm text-slate-900 font-medium px-3 py-2"
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
              className="text-sm font-medium text-white bg-emerald hover:bg-emerald-dark px-5 py-2.5 rounded-lg transition-colors duration-200 glow-emerald"
            >
              Try Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Blog
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
          Tips on social proof, customer reviews, and conversion optimization.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {allPosts.length === 0 ? (
          <p className="text-center text-slate-400 py-12">
            No posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-slate-200 overflow-hidden hover:border-emerald/40 hover:shadow-lg transition-all duration-200"
              >
                {post.image_url && (
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {post.tags.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-xs font-medium text-emerald bg-emerald/10 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald transition-colors">
                    {post.title}
                  </h2>
                  {post.meta_description && (
                    <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                      {post.meta_description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </span>
                    <span className="text-sm font-medium text-emerald flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

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
