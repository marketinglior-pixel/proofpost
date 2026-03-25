import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Star, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const metadata: Metadata = {
  title: "Blog | ProofPost",
  description:
    "Tips and insights on social proof, customer reviews, and conversion optimization for SaaS founders.",
};

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("title, slug, meta_description, image_url, published_at, tags")
    .eq("status", "published")
    .order("published_at", { ascending: false });

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
        {!posts || posts.length === 0 ? (
          <p className="text-center text-slate-400 py-12">
            No posts yet. Check back soon!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
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
      <div className="border-t border-slate-200 py-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-slate-400 transition-colors"
        >
          <Star className="w-3 h-3" />
          ProofPost
        </Link>
      </div>
    </div>
  );
}
