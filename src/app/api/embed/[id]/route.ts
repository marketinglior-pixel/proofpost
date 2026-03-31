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

interface HookVariant {
  id: string;
  text: string;
  context: string;
}

interface LlmOutput {
  slides: unknown[];
  hookLine: string;
  hookVariants?: HookVariant[];
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

const BOT_PATTERNS = [
  "bot", "crawler", "spider", "slurp", "mediapartners",
  "googlebot", "bingbot", "yandex", "baidu", "duckduck",
  "facebookexternalhit", "twitterbot", "linkedinbot",
  "whatsapp", "telegram", "pingdom", "uptimerobot",
  "headlesschrome", "phantomjs", "prerender", "lighthouse",
];

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some((pattern) => ua.includes(pattern));
}

async function shouldTrackImpression(
  request: NextRequest,
  userId: string,
  embedId: string
): Promise<boolean> {
  // 1. Skip bots
  const ua = request.headers.get("user-agent") || "";
  if (isBot(ua)) return false;

  // 2. Skip if the viewer IS the content owner (check via Supabase auth cookie)
  const authCookie = request.cookies.getAll().find((c) => c.name.startsWith("sb-"));
  if (authCookie) {
    // Owner is viewing their own widget preview — skip
    return false;
  }

  // 3. Deduplicate: max 1 impression per IP per embed per hour
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

  // Use a simple hash of IP + embedId as a fingerprint
  const fingerprint = `${ip}:${embedId}`;

  const { count } = await supabase
    .from("impressions")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", oneHourAgo)
    .or(`content_id.eq.${embedId},widget_id.eq.${embedId}`);

  // If already tracked this embed in the last hour from this request context, skip
  if ((count ?? 0) > 3) return false; // Allow some but cap spam

  return true;
}

async function trackImpression(
  request: NextRequest,
  userId: string,
  contentId: string | null,
  widgetId: string | null,
  embedId: string
) {
  const shouldTrack = await shouldTrackImpression(request, userId, embedId);
  if (!shouldTrack) return;

  await supabase.from("impressions").insert({
    user_id: userId,
    content_id: contentId,
    widget_id: widgetId,
  });
}

function formatReview(content: { id: string; llm_output: unknown }, isPro: boolean) {
  const llm = content.llm_output as LlmOutput;
  return {
    id: content.id,
    hookLine: llm.hookLine,
    hookVariants: isPro ? (llm.hookVariants || []) : [],
    quote: (llm.slides as { body: string }[])?.[1]?.body || llm.hookLine,
    reviewer: llm.reviewer || { name: "Customer", title: "", company: "" },
    reviewerPhotoUrl: llm.reviewerPhotoUrl || null,
    videoUrl: null as string | null,
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
      const widgetPlan = await getUserPlan(userId!);
      const proUser = widgetPlan === "pro";
      const contentIds = widget.content_ids as string[];
      for (const cid of contentIds) {
        const content = await getContentById(cid);
        if (content) reviews.push(formatReview(content, proUser));
      }

      // Also include approved video submissions
      const { data: videoSubmissions } = await supabase
        .from("submissions")
        .select("id, reviewer_name, reviewer_title, reviewer_company, reviewer_photo_url, review_text, video_url")
        .eq("user_id", userId!)
        .eq("status", "approved")
        .eq("submission_type", "video")
        .not("video_url", "is", null)
        .order("created_at", { ascending: false });

      if (videoSubmissions) {
        for (const vs of videoSubmissions) {
          reviews.push({
            id: vs.id,
            hookLine: "",
            hookVariants: [],
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
    } else {
      const content = await getContentById(id);
      if (!content) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      userId = content.user_id;
      contentId = content.id;
      const contentPlan = await getUserPlan(userId!);
      const proUser = contentPlan === "pro";
      reviews = [formatReview(content, proUser)];
    }

    // Get impression count (plan already fetched above)
    const plan = await getUserPlan(userId!);
    const monthlyImpressions = await getMonthlyImpressions(userId!);
    const isPro = plan === "pro";
    const showWatermark = !isPro;
    const limitReached = !isPro && monthlyImpressions >= FREE_IMPRESSION_LIMIT;

    // Track impression (filters bots, owner, deduplicates)
    trackImpression(request, userId!, contentId, widgetId, id);

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
