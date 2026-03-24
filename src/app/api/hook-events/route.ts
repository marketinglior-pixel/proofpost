import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// OPTIONS: CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// POST: Track hook impression or click (public, called from embed iframe)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contentId, widgetId, hookVariantId, eventType } = body;

    if (!contentId || !hookVariantId || !eventType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (!["impression", "click"].includes(eventType)) {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    await supabaseAdmin.from("hook_events").insert({
      content_id: contentId,
      widget_id: widgetId || null,
      hook_variant_id: hookVariantId,
      event_type: eventType,
    });

    return NextResponse.json({ ok: true }, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

// GET: Fetch hook performance data (authenticated, for dashboard)
export async function GET() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all content IDs for this user
  const { data: contents } = await supabaseAdmin
    .from("generated_content")
    .select("id, llm_output")
    .eq("user_id", user.id);

  if (!contents || contents.length === 0) {
    return NextResponse.json({ performance: [] });
  }

  const contentIds = contents.map((c) => c.id);

  // Get all hook events for this user's content
  const { data: events } = await supabaseAdmin
    .from("hook_events")
    .select("content_id, hook_variant_id, event_type")
    .in("content_id", contentIds);

  // Aggregate per content + variant
  const performanceMap: Record<string, {
    contentId: string;
    hookVariantId: string;
    hookText: string;
    impressions: number;
    clicks: number;
    ctr: number;
  }> = {};

  for (const event of events || []) {
    const key = `${event.content_id}:${event.hook_variant_id}`;
    if (!performanceMap[key]) {
      // Find hook text from LLM output
      const content = contents.find((c) => c.id === event.content_id);
      const llm = content?.llm_output as Record<string, unknown> | undefined;
      const variants = (llm?.hookVariants as Array<{ id: string; text: string }>) || [];
      const variant = variants.find((v) => v.id === event.hook_variant_id);

      performanceMap[key] = {
        contentId: event.content_id,
        hookVariantId: event.hook_variant_id,
        hookText: variant?.text || (llm?.hookLine as string) || "",
        impressions: 0,
        clicks: 0,
        ctr: 0,
      };
    }

    if (event.event_type === "impression") {
      performanceMap[key].impressions++;
    } else if (event.event_type === "click") {
      performanceMap[key].clicks++;
    }
  }

  // Calculate CTR
  const performance = Object.values(performanceMap).map((p) => ({
    ...p,
    ctr: p.impressions > 0 ? Math.round((p.clicks / p.impressions) * 10000) / 100 : 0,
  }));

  // Group by content
  const byContent: Record<string, typeof performance> = {};
  for (const p of performance) {
    if (!byContent[p.contentId]) byContent[p.contentId] = [];
    byContent[p.contentId].push(p);
  }

  // Totals
  const totalImpressions = performance.reduce((s, p) => s + p.impressions, 0);
  const totalClicks = performance.reduce((s, p) => s + p.clicks, 0);
  const overallCtr = totalImpressions > 0 ? Math.round((totalClicks / totalImpressions) * 10000) / 100 : 0;

  return NextResponse.json({
    performance,
    byContent,
    totals: { impressions: totalImpressions, clicks: totalClicks, ctr: overallCtr },
  });
}
