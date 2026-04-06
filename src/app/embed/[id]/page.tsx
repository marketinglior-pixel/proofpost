import { EmbedCarousel } from "./embed-carousel";
import { EmbedMarquee } from "./embed-marquee";
import { EmbedGrid } from "./embed-grid";
import { EmbedStack } from "./embed-stack";
import { EmbedBadge } from "./embed-badge";
import { EmbedCard } from "./embed-card";
import { EmbedFloating } from "./embed-floating";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

interface LlmOutput {
  slides: { body: string }[];
  hookLine: string;
  reviewer: { name: string; title: string; company: string };
  reviewerPhotoUrl?: string | null;
}

export default async function EmbedPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { style } = await searchParams;
  const widgetStyle = style || "carousel"; // "carousel", "marquee", "grid", "stack", "badge", or "card"

  // Fetch directly from Supabase (no self-calling API)
  let data = null;
  let widgetCustomStyle: unknown = null;

  try {
    // Check widget first
    const { data: widget } = await supabase
      .from("widgets")
      .select("*")
      .eq("id", id)
      .single();

    if (widget) {
      const contentIds = widget.content_ids as string[];
      const reviews = [];
      for (const cid of contentIds) {
        const { data: content } = await supabase
          .from("generated_content")
          .select("id, user_id, llm_output")
          .eq("id", cid)
          .single();
        if (content) {
          const llm = content.llm_output as unknown as LlmOutput;
          reviews.push({
            id: content.id,
            hookLine: llm.hookLine,
            quote: llm.slides?.[1]?.body || llm.hookLine,
            reviewer: llm.reviewer || { name: "Customer", title: "", company: "" },
            reviewerPhotoUrl: llm.reviewerPhotoUrl || null,
            videoUrl: null as string | null,
          });
        }
      }

      // Also fetch approved video submissions for this user
      const { data: videoSubmissions } = await supabase
        .from("submissions")
        .select("id, reviewer_name, reviewer_title, reviewer_company, reviewer_photo_url, review_text, video_url")
        .eq("user_id", widget.user_id)
        .eq("status", "approved")
        .eq("submission_type", "video")
        .not("video_url", "is", null)
        .order("created_at", { ascending: false });

      if (videoSubmissions) {
        for (const vs of videoSubmissions) {
          reviews.push({
            id: vs.id,
            hookLine: "",
            quote: vs.review_text || "Video testimonial",
            reviewer: {
              name: vs.reviewer_name,
              title: vs.reviewer_title || "",
              company: vs.reviewer_company || "",
            },
            reviewerPhotoUrl: vs.reviewer_photo_url || null,
            videoUrl: vs.video_url as string,
          });
        }
      }

      const { data: brandKit } = await supabase
        .from("brand_kits")
        .select("company_name, logo_url, primary_color, secondary_color")
        .eq("user_id", widget.user_id)
        .single();

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, trial_ends_at")
        .eq("id", widget.user_id)
        .single();

      const { getEffectivePlan, getPlanLimits } = await import("@/lib/plans");
      const ep = getEffectivePlan(
        ((profile as { plan: string } | null)?.plan || "free") as import("@/lib/plans").Plan,
        (profile as { trial_ends_at: string | null } | null)?.trial_ends_at ?? null
      );

      data = {
        type: "widget" as const,
        id: widget.id,
        reviews,
        brandKit: brandKit ? {
          companyName: brandKit.company_name,
          logoUrl: brandKit.logo_url,
          primaryColor: brandKit.primary_color,
          secondaryColor: brandKit.secondary_color,
        } : null,
        showWatermark: getPlanLimits(ep).showWatermark,
        limitReached: false,
      };
      widgetCustomStyle = widget.style || null;
    } else {
      // Single content
      const { data: content } = await supabase
        .from("generated_content")
        .select("id, user_id, llm_output")
        .eq("id", id)
        .single();

      if (content) {
        const llm = content.llm_output as unknown as LlmOutput;
        const { data: brandKit } = await supabase
          .from("brand_kits")
          .select("company_name, logo_url, primary_color, secondary_color")
          .eq("user_id", content.user_id)
          .single();

        const { data: profile } = await supabase
          .from("profiles")
          .select("plan, trial_ends_at")
          .eq("id", content.user_id)
          .single();

        const { getEffectivePlan: gep2, getPlanLimits: gpl2 } = await import("@/lib/plans");
        const ep2 = gep2(
          ((profile as { plan: string } | null)?.plan || "free") as import("@/lib/plans").Plan,
          (profile as { trial_ends_at: string | null } | null)?.trial_ends_at ?? null
        );

        data = {
          type: "single" as const,
          id: content.id,
          reviews: [{
            id: content.id,
            hookLine: llm.hookLine,
            quote: llm.slides?.[1]?.body || llm.hookLine,
            reviewer: llm.reviewer || { name: "Customer", title: "", company: "" },
            reviewerPhotoUrl: llm.reviewerPhotoUrl || null,
            videoUrl: null as string | null,
          }],
          brandKit: brandKit ? {
            companyName: brandKit.company_name,
            logoUrl: brandKit.logo_url,
            primaryColor: brandKit.primary_color,
            secondaryColor: brandKit.secondary_color,
          } : null,
          showWatermark: gpl2(ep2).showWatermark,
          limitReached: false,
        };
      }
    }
  } catch {
    // Will show error state
  }

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
          fontFamily: "system-ui, sans-serif",
          color: "#999",
          fontSize: "14px",
        }}
      >
        Testimonial not found
      </div>
    );
  }

  // Build JSON-LD structured data for SEO (individual reviews + aggregate)
  const reviewJsonLd = data.reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: review.quote,
    author: {
      "@type": "Person",
      name: review.reviewer?.name || "Customer",
      jobTitle: review.reviewer?.title || undefined,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: 5,
      bestRating: 5,
    },
    ...(data.brandKit?.companyName
      ? {
          itemReviewed: {
            "@type": "Product",
            name: data.brandKit.companyName,
          },
        }
      : {}),
  }));

  // AggregateRating schema for star snippets in Google search
  const aggregateRating = data.brandKit?.companyName && data.reviews.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.brandKit.companyName,
    ...(data.brandKit.logoUrl ? { image: data.brandKit.logoUrl } : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: String(data.reviews.length),
      reviewCount: String(data.reviews.length),
    },
    review: reviewJsonLd.map((r) => ({
      "@type": "Review",
      reviewBody: r.reviewBody,
      author: r.author,
      reviewRating: r.reviewRating,
    })),
  } : null;

  const jsonLd = aggregateRating || (reviewJsonLd.length === 1 ? reviewJsonLd[0] : reviewJsonLd);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {widgetStyle === "floating" ? (
        <EmbedFloating data={data} embedId={id} customStyle={widgetCustomStyle as Record<string, unknown> | null} />
      ) : widgetStyle === "card" ? (
        <EmbedCard data={data} embedId={id} customStyle={widgetCustomStyle as Record<string, unknown> | null} />
      ) : widgetStyle === "badge" ? (
        <EmbedBadge data={data} embedId={id} customStyle={widgetCustomStyle as Record<string, unknown> | null} />
      ) : widgetStyle === "marquee" ? (
        <EmbedMarquee data={data} embedId={id} customStyle={widgetCustomStyle as Record<string, unknown> | null} />
      ) : widgetStyle === "grid" ? (
        <EmbedGrid data={data} embedId={id} customStyle={widgetCustomStyle as Record<string, unknown> | null} />
      ) : widgetStyle === "stack" ? (
        <EmbedStack data={data} embedId={id} customStyle={widgetCustomStyle as Record<string, unknown> | null} />
      ) : (
        <EmbedCarousel data={data} embedId={id} customStyle={widgetCustomStyle as Record<string, unknown> | null} />
      )}
    </>
  );
}
