import { EmbedCarousel } from "./embed-carousel";
import { EmbedMarquee } from "./embed-marquee";
import { EmbedGrid } from "./embed-grid";
import { EmbedStack } from "./embed-stack";
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
  const widgetStyle = style || "carousel"; // "carousel", "marquee", "grid", or "stack"

  // Fetch directly from Supabase (no self-calling API)
  let data = null;

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
        .select("plan")
        .eq("id", widget.user_id)
        .single();

      const isPro = (profile as { plan: string } | null)?.plan === "pro";

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
        showWatermark: !isPro,
        limitReached: false,
        customStyle: widget.style || null,
      };
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
          .select("plan")
          .eq("id", content.user_id)
          .single();

        const isPro = (profile as { plan: string } | null)?.plan === "pro";

        data = {
          type: "single" as const,
          id: content.id,
          reviews: [{
            id: content.id,
            hookLine: llm.hookLine,
            quote: llm.slides?.[1]?.body || llm.hookLine,
            reviewer: llm.reviewer || { name: "Customer", title: "", company: "" },
            reviewerPhotoUrl: llm.reviewerPhotoUrl || null,
          }],
          brandKit: brandKit ? {
            companyName: brandKit.company_name,
            logoUrl: brandKit.logo_url,
            primaryColor: brandKit.primary_color,
            secondaryColor: brandKit.secondary_color,
          } : null,
          showWatermark: !isPro,
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

  // Build JSON-LD structured data for SEO
  const jsonLd = data.reviews.map((review) => ({
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd) }}
      />
      {widgetStyle === "marquee" ? (
        <EmbedMarquee data={data} embedId={id} />
      ) : widgetStyle === "grid" ? (
        <EmbedGrid data={data} embedId={id} />
      ) : widgetStyle === "stack" ? (
        <EmbedStack data={data} embedId={id} />
      ) : (
        <EmbedCarousel data={data} embedId={id} customStyle={(data as Record<string, unknown>).customStyle as Record<string, unknown> | null} />
      )}
    </>
  );
}
