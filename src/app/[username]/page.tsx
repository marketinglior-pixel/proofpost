import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import type { Metadata, ResolvingMetadata } from "next";
import { TrustCardHeader } from "./components/trust-card-header";
import { TrustCardStats } from "./components/trust-card-stats";
import { TrustCardReviews } from "./components/trust-card-reviews";
import { TrustCardCta } from "./components/trust-card-cta";
import { TrustCardWatermark } from "./components/trust-card-watermark";

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
    .select("plan, payment_type")
    .eq("id", card.user_id)
    .limit(1)
    .single();

  const reviewLimit = profile?.plan === "pro" ? 1000 : 15;

  const { data: reviews } = await supabase
    .from("imported_reviews")
    .select("*")
    .eq("user_id", card.user_id)
    .eq("display_on_trust_card", true)
    .order("display_order", { ascending: true })
    .order("imported_at", { ascending: false })
    .limit(reviewLimit);

  return {
    card,
    profile,
    reviews: reviews || [],
  };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = await params;
  const data = await getTrustCardData(username);

  if (!data) {
    return { title: "Not Found" };
  }

  const { card, reviews } = data;
  const title = card.meta_title || `${card.display_name} — Verified Reviews`;
  const description = card.meta_description || card.headline || card.bio || `See what clients say about ${card.display_name}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://proofpst.com/${username}`,
      ...(card.avatar_url ? { images: [{ url: card.avatar_url }] } : {}),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function TrustCardPage({ params }: PageProps) {
  const { username } = await params;
  const data = await getTrustCardData(username);

  if (!data) notFound();

  const { card, profile, reviews } = data;
  const isPro = profile?.plan === "pro";
  const accentColor = card.accent_color || "#10B981";
  const isDark = card.theme === "dark";

  // Record view (fire-and-forget)
  supabase.from("trust_card_views").insert({ trust_card_id: card.id }).then(() => {});

  // Compute stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / totalReviews).toFixed(1)
    : "5.0";
  const platforms = [...new Set(reviews.map((r) => r.platform))];

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: card.display_name,
    ...(card.headline ? { jobTitle: card.headline } : {}),
    ...(card.avatar_url ? { image: card.avatar_url } : {}),
    ...(card.bio ? { description: card.bio } : {}),
    ...(totalReviews > 0 ? {
      review: reviews.slice(0, 10).map((r) => ({
        "@type": "Review",
        reviewBody: r.review_text,
        author: { "@type": "Person", name: r.reviewer_name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating || 5,
          bestRating: 5,
        },
      })),
    } : {}),
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-white selection:bg-emerald-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---- Ambient background ---- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Primary glow — top right */}
        <div
          className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] lg:w-[1000px] lg:h-[1000px] rounded-full opacity-[0.12] blur-[120px] lg:blur-[160px]"
          style={{ background: accentColor }}
        />
        {/* Secondary glow — bottom left */}
        <div
          className="absolute top-[55%] -left-[10%] w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] rounded-full opacity-[0.08] blur-[100px] lg:blur-[140px]"
          style={{ background: "#6366f1" }}
        />
        {/* Accent glow — center right (desktop filler) */}
        <div
          className="absolute top-[25%] right-[30%] w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full opacity-[0.05] blur-[80px] lg:blur-[120px]"
          style={{ background: accentColor }}
        />
        {/* Subtle noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }} />
      </div>

      {/* ---- Main content ---- */}
      <div className="relative max-w-6xl mx-auto px-5 pt-16 pb-36 sm:pt-24">
        <div className="md:grid md:grid-cols-[360px_1fr] md:gap-8 md:items-start">

          {/* Left column — Profile card (sticky on desktop) */}
          <div className="md:sticky md:top-8">
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-black/20">

              <TrustCardHeader
                card={card}
                accentColor={accentColor}
              />

              {totalReviews > 0 && (
                <TrustCardStats
                  totalReviews={totalReviews}
                  avgRating={avgRating}
                  platforms={platforms}
                  accentColor={accentColor}
                />
              )}

              {/* Desktop-only inline CTA */}
              {card.cta_url && (
                <div className="hidden md:block mt-8">
                  <a
                    href={card.cta_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center justify-center gap-2 w-full
                      py-3.5 px-6 rounded-2xl
                      text-white font-semibold text-[15px]
                      transition-all duration-300
                      hover:scale-[1.02] active:scale-[0.98]
                      shadow-[0_0_40px_-8px_var(--glow)]
                      hover:shadow-[0_0_60px_-4px_var(--glow)]
                    "
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
                      "--glow": `${accentColor}50`,
                    } as React.CSSProperties}
                  >
                    {card.cta_label || "Book a Call"}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Watermark under profile card on desktop */}
            <div className="hidden md:block">
              <TrustCardWatermark isPro={isPro} username={username} />
            </div>
          </div>

          {/* Right column — Reviews */}
          <div className="mt-10 md:mt-0">
            {totalReviews > 0 ? (
              <TrustCardReviews
                reviews={reviews}
                accentColor={accentColor}
              />
            ) : (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                </div>
                <p className="text-white/25 text-[15px] font-medium">Reviews coming soon</p>
                <p className="text-white/15 text-[13px] mt-1">Import from Google or G2 to populate your Trust Card</p>
              </div>
            )}

            {/* Watermark on mobile only */}
            <div className="md:hidden">
              <TrustCardWatermark isPro={isPro} username={username} />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA — mobile only (desktop has inline CTA in profile card) */}
      {card.cta_url && (
        <div className="md:hidden">
          <TrustCardCta
            label={card.cta_label || "Book a Call"}
            url={card.cta_url}
            accentColor={accentColor}
          />
        </div>
      )}
    </div>
  );
}
