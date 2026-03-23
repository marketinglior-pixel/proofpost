import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Cache-Control": "public, max-age=300",
};

const FREE_IMPRESSION_LIMIT = 500;

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

async function getUserPlan(userId: string): Promise<string> {
  const { data } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", userId)
    .single();
  return (data as { plan: string } | null)?.plan || "free";
}

async function getMonthlyImpressions(userId: string): Promise<number> {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", startOfMonth.toISOString());

  return count ?? 0;
}

async function trackImpression(
  userId: string,
  contentId: string | null,
  widgetId: string | null
) {
  await supabase.from("impressions").insert({
    user_id: userId,
    content_id: contentId,
    widget_id: widgetId,
  });
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
    // Determine owner user_id and content
    let userId: string | null = null;
    let reviews: ReturnType<typeof formatReview>[] = [];
    let isWidget = false;
    let widgetId: string | null = null;
    let contentId: string | null = null;

    // Check if widget
    const { data: widget } = await supabase
      .from("widgets")
      .select("*")
      .eq("id", id)
      .single();

    if (widget) {
      isWidget = true;
      widgetId = widget.id;
      userId = widget.user_id;
      const contentIds = widget.content_ids as string[];
      for (const cid of contentIds) {
        const content = await getContentById(cid);
        if (content) reviews.push(formatReview(content));
      }
    } else {
      const content = await getContentById(id);
      if (!content) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      userId = content.user_id;
      contentId = content.id;
      reviews = [formatReview(content)];
    }

    // Get user plan and impression count
    const plan = await getUserPlan(userId!);
    const monthlyImpressions = await getMonthlyImpressions(userId!);
    const isPro = plan === "pro";
    const showWatermark = !isPro;
    const limitReached = !isPro && monthlyImpressions >= FREE_IMPRESSION_LIMIT;

    // Track impression
    trackImpression(userId!, contentId, widgetId);

    // Get brand kit
    const brandKit = await getBrandKit(userId!);

    return NextResponse.json(
      {
        type: isWidget ? "widget" : "single",
        id,
        reviews: limitReached ? reviews.slice(0, 1) : reviews,
        brandKit: brandKit
          ? {
              companyName: brandKit.company_name,
              logoUrl: brandKit.logo_url,
              primaryColor: brandKit.primary_color,
              secondaryColor: brandKit.secondary_color,
            }
          : null,
        // Plan-based flags
        showWatermark,
        limitReached,
        impressions: {
          current: monthlyImpressions,
          limit: isPro ? null : FREE_IMPRESSION_LIMIT,
        },
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
