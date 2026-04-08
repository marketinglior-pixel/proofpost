import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import type { Metadata, ResolvingMetadata } from "next";
import { TrustCardHeader } from "./components/trust-card-header";
import { TrustCardStats } from "./components/trust-card-stats";
import { TrustCardMarquee } from "./components/trust-card-marquee";
import { TrustCardCta } from "./components/trust-card-cta";
import { TrustCardFooter } from "./components/trust-card-footer";
import { Star } from "lucide-react";
import { getEffectivePlan, getPlanLimits, isPaidPlan, type Plan } from "@/lib/plans";

export const revalidate = 60;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{ username: string }>;
}

async function getTrustCardData(username: string) {
  const { data: card } = await supabase
    .from("trust_cards")
    .select("*")
    .eq("username", username)
    .eq("is_published", true)
    .limit(1)
    .single();

  if (!card) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, payment_type, trial_ends_at")
    .eq("id", card.user_id)
    .limit(1)
    .single();

  const effectivePlan = getEffectivePlan(
    (profile?.plan || "free") as Plan,
    profile?.trial_ends_at ?? null
  );
  const limits = getPlanLimits(effectivePlan);
  const reviewLimit = limits.reviews;

  const { data: reviews } = await supabase
    .from("imported_reviews")
    .select("*")
    .eq("user_id", card.user_id)
    .eq("display_on_trust_card", true)
    .order("display_order", { ascending: true })
    .order("imported_at", { ascending: false })
    .limit(reviewLimit);

  return { card, profile, reviews: reviews || [], effectivePlan };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = await params;
  const data = await getTrustCardData(username);
  if (!data) return { title: "Not Found" };

  const { card } = data;
  const title = card.meta_title || `${card.display_name} — Verified Reviews`;
  const description = card.meta_description || card.headline || card.bio || `See what clients say about ${card.display_name}`;

  return {
    title,
    description,
    openGraph: { title, description, type: "profile", url: `https://proofpst.com/${username}` },
    twitter: { card: "summary", title, description },
  };
}

export default async function TrustCardPage({ params }: PageProps) {
  const { username } = await params;
  const data = await getTrustCardData(username);
  if (!data) notFound();

  const { card, profile, reviews, effectivePlan } = data;
  const isPro = isPaidPlan(effectivePlan);
  const accentColor = card.accent_color || "#10B981";

  // Record view
  supabase.from("trust_card_views").insert({ trust_card_id: card.id }).then(() => {});

  // Stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / totalReviews).toFixed(1)
    : "5.0";
  const platforms = [...new Set(reviews.map((r) => r.platform))];

  // JSON-LD — per-review Review objects so each quote is individually indexable
  // (not just the aggregate star rating). Cap at 50 to keep HTML lean while
  // still giving Google a rich corpus to parse.
  const itemReviewedRef = { "@type": "Organization" as const, name: card.display_name };

  const reviewSchema = reviews
    .filter((r) => r.review_text && r.review_text !== "Screenshot review" && r.reviewer_name)
    .slice(0, 50)
    .map((r) => {
      const snippetName =
        r.hook_line ||
        (r.review_text as string).split(/[.!?]/)[0].slice(0, 80).trim() ||
        `Review by ${r.reviewer_name}`;
      return {
        "@type": "Review",
        name: snippetName,
        itemReviewed: itemReviewedRef,
        reviewBody: r.review_text,
        author: { "@type": "Person", name: r.reviewer_name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating || 5,
          bestRating: 5,
          worstRating: 1,
        },
        ...(r.platform ? { publisher: { "@type": "Organization", name: r.platform } } : {}),
        ...(r.imported_at ? { datePublished: new Date(r.imported_at).toISOString().split("T")[0] } : {}),
      };
    });

  // Collect social profile URLs for sameAs (helps Google entity resolution)
  const socialLinks = Array.isArray(card.social_links)
    ? (card.social_links as Array<{ url?: string }>)
        .map((s) => s?.url)
        .filter((u): u is string => typeof u === "string" && u.length > 0)
    : [];
  const sameAs = [...socialLinks, ...(card.cta_url ? [card.cta_url] : [])].filter(
    (v, i, a) => a.indexOf(v) === i
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: card.display_name,
    url: `https://proofpst.com/${username}`,
    ...(card.headline || card.bio ? { description: card.headline || card.bio } : {}),
    ...(card.avatar_url ? { logo: card.avatar_url, image: card.avatar_url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(totalReviews > 0 ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: avgRating,
        reviewCount: totalReviews,
        bestRating: 5,
        worstRating: 1,
      },
    } : {}),
    ...(reviewSchema.length > 0 ? { review: reviewSchema } : {}),
  };

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Subtle accent gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.06)_0%,_transparent_60%)] pointer-events-none" />

      {/* ---- Desktop: Two-column / Mobile: Stacked ---- */}
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-12">
        <div className="md:grid md:grid-cols-[380px_1fr] md:gap-12 md:items-start">

          {/* ======== LEFT: Profile Card (sticky on desktop) ======== */}
          <div className="md:sticky md:top-8">
            <div className="rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10">
              <TrustCardHeader card={card} accentColor={accentColor} />

              {totalReviews > 0 && (
                <TrustCardStats
                  totalReviews={totalReviews}
                  avgRating={avgRating}
                  platforms={platforms}
                  accentColor={accentColor}
                />
              )}

              {/* Desktop CTA */}
              {card.cta_url && (
                <div className="hidden md:block mt-8">
                  <a
                    href={card.cta_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl text-white font-semibold text-[15px] transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200 active:scale-[0.98]"
                    style={{ background: accentColor }}
                  >
                    {card.cta_label || "Book a Call"}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Business Gallery */}
            {Array.isArray(card.portfolio) && (card.portfolio as string[]).length > 0 && (
              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold mb-3">Gallery</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(card.portfolio as string[]).slice(0, 5).map((url: string, i: number) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-full aspect-square object-cover rounded-lg"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Desktop watermark */}
            <div className="hidden md:block mt-6 text-center">
              <a
                href={`https://proofpst.com/create?utm_source=watermark&utm_medium=trust-card&ref=${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-slate-400 transition-colors"
              >
                <Star className="w-3 h-3" />
                Built with ProofPost &mdash; Create yours in 60s
              </a>
            </div>
          </div>

          {/* ======== RIGHT: Reviews ======== */}
          <div className="mt-10 md:mt-0 overflow-hidden">
            {totalReviews > 0 ? (
              <TrustCardMarquee reviews={reviews} accentColor={accentColor} />
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-3 px-1">
                  <h2 className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-semibold">What clients say</h2>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>
                {/* Premium empty state — skeleton cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50/50 p-6 space-y-4 animate-pulse">
                      <div className="flex gap-1">{[1, 2, 3, 4, 5].map((s) => <div key={s} className="w-3.5 h-3.5 rounded-sm bg-slate-200" />)}</div>
                      <div className="space-y-2">
                        <div className="h-3 bg-slate-200 rounded w-full" />
                        <div className="h-3 bg-slate-200 rounded w-4/5" />
                        <div className="h-3 bg-slate-200 rounded w-3/5" />
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-slate-200" />
                        <div className="space-y-1.5">
                          <div className="h-2.5 bg-slate-200 rounded w-20" />
                          <div className="h-2 bg-slate-100 rounded w-16" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-center text-slate-300 text-[13px]">Reviews are being collected</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      {card.cta_url && (
        <div className="md:hidden">
          <TrustCardCta label={card.cta_label || "Book a Call"} url={card.cta_url} accentColor={accentColor} />
        </div>
      )}

      {/* Footer */}
      <TrustCardFooter isPro={isPro} username={username} />
    </div>
  );
}
