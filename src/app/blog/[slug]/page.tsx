import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Star, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, meta_description, image_url")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | ProofPost Blog`,
    description: post.meta_description || undefined,
    openGraph: {
      title: post.title,
      description: post.meta_description || undefined,
      images: post.image_url ? [post.image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

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
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 px-3 py-2"
            >
              Blog
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

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Blog
        </Link>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs font-medium text-emerald bg-emerald/10 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-400">
          {post.author && <span>By {post.author}</span>}
          {post.published_at && (
            <>
              <span>&middot;</span>
              <time>
                {new Date(post.published_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </>
          )}
        </div>

        {/* Featured image */}
        {post.image_url && (
          <div className="mt-8 rounded-2xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_url}
              alt={post.image_alt || post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="mt-10 prose prose-slate prose-lg max-w-none prose-headings:font-heading prose-headings:tracking-tight prose-a:text-emerald prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content_html }}
        />
      </article>

      {/* CTA */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Turn reviews into conversions
          </h2>
          <p className="mt-2 text-slate-500">
            ProofPost extracts the best line from any review and turns it into an
            animated widget.
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 text-sm font-medium text-white bg-emerald hover:bg-emerald-dark px-6 py-3 rounded-lg transition-colors duration-200 glow-emerald"
          >
            Try Free
          </Link>
        </div>
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
