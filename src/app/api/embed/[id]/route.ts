import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Cache-Control": "public, max-age=3600",
};

interface LlmOutput {
  slides: unknown[];
  hookLine: string;
  linkedinPost: string;
  reviewer: { name: string; title: string; company: string };
  reviewerPhotoUrl?: string | null;
}

async function getContentById(id: string) {
  const { data } = await supabase
    .from("generated_content")
    .select("id, user_id, llm_output")
    .eq("id", id)
    .single();
  return data;
}

async function getBrandKit(userId: string) {
  const { data } = await supabase
    .from("brand_kits")
    .select("company_name, logo_url, primary_color, secondary_color")
    .eq("user_id", userId)
    .single();
  return data;
}

function formatReview(content: { id: string; llm_output: unknown }) {
  const llm = content.llm_output as LlmOutput;
  return {
    id: content.id,
    hookLine: llm.hookLine,
    quote: (llm.slides as { body: string }[])?.[1]?.body || llm.hookLine,
    reviewer: llm.reviewer || { name: "Customer", title: "", company: "" },
    reviewerPhotoUrl: llm.reviewerPhotoUrl || null,
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // First, check if this is a widget (multi-review)
    const { data: widget } = await supabase
      .from("widgets")
      .select("*")
      .eq("id", id)
      .single();

    if (widget) {
      // It's a widget — fetch all reviews in it
      const contentIds = widget.content_ids as string[];
      const reviews = [];

      for (const contentId of contentIds) {
        const content = await getContentById(contentId);
        if (content) {
          reviews.push(formatReview(content));
        }
      }

      const brandKit = await getBrandKit(widget.user_id);

      return NextResponse.json(
        {
          type: "widget",
          id: widget.id,
          name: widget.name,
          reviews,
          brandKit: brandKit
            ? {
                companyName: brandKit.company_name,
                logoUrl: brandKit.logo_url,
                primaryColor: brandKit.primary_color,
                secondaryColor: brandKit.secondary_color,
              }
            : null,
        },
        { headers: CORS_HEADERS }
      );
    }

    // Otherwise, it's a single content item (backward compatible)
    const content = await getContentById(id);

    if (!content) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    const brandKit = await getBrandKit(content.user_id);
    const llm = content.llm_output as LlmOutput;

    return NextResponse.json(
      {
        type: "single",
        id: content.id,
        reviews: [formatReview(content)],
        slides: llm.slides,
        hookLine: llm.hookLine,
        reviewer: llm.reviewer,
        reviewerPhotoUrl: llm.reviewerPhotoUrl || null,
        brandKit: brandKit
          ? {
              companyName: brandKit.company_name,
              logoUrl: brandKit.logo_url,
              primaryColor: brandKit.primary_color,
              secondaryColor: brandKit.secondary_color,
            }
          : null,
      },
      { headers: CORS_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
