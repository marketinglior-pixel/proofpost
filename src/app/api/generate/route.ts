import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateCarouselContent } from "@/lib/ai/generate-carousel";
import type { ReviewerInfo } from "@/lib/ai/generate-carousel";
import type { Database } from "@/types/database";
import { rateLimit } from "@/lib/rate-limit";
import { appendLeadToSheet } from "@/lib/google-sheets";
import { getEffectivePlan, getPlanLimits, type Plan } from "@/lib/plans";

type BrandKit = Database["public"]["Tables"]["brand_kits"]["Row"];

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!rateLimit(`generate:${user.id}`, { maxRequests: 10, windowMs: 60_000 }).success) {
      return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
    }

    const {
      rawInput,
      reviewerName,
      reviewerTitle,
      reviewerCompany,
      reviewerPhotoUrl,
    } = await request.json();

    if (
      !rawInput ||
      typeof rawInput !== "string" ||
      rawInput.trim().length < 20
    ) {
      return NextResponse.json(
        { error: "Review text must be at least 20 characters" },
        { status: 400 }
      );
    }

    const { data: brandKitData } = await supabase
      .from("brand_kits")
      .select("*")
      .eq("user_id", user.id)
      .single();

    const brandKit = brandKitData as BrandKit | null;

    if (!brandKit) {
      return NextResponse.json(
        { error: "Please set up your Brand Kit first" },
        { status: 400 }
      );
    }

    // Check plan
    const { data: profileData } = await supabase
      .from("profiles")
      .select("plan, trial_ends_at")
      .eq("id", user.id)
      .single();

    const rawPlan = ((profileData as { plan: string; trial_ends_at: string | null } | null)?.plan || "free") as Plan;
    const trialEndsAt = (profileData as { trial_ends_at: string | null } | null)?.trial_ends_at ?? null;
    const effectivePlan = getEffectivePlan(rawPlan, trialEndsAt);
    const limits = getPlanLimits(effectivePlan);

    if (limits.carouselsPerMonth !== null) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const { count } = await supabase
        .from("generated_content")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", startOfMonth.toISOString());

      if ((count ?? 0) >= limits.carouselsPerMonth) {
        return NextResponse.json(
          {
            error:
              `You've reached your plan limit (${limits.carouselsPerMonth}/month). Upgrade your plan for more.`,
          },
          { status: 403 }
        );
      }
    }

    // Build reviewer info
    const reviewerInfo: ReviewerInfo | undefined =
      reviewerName || reviewerTitle || reviewerCompany
        ? {
            name: reviewerName || undefined,
            title: reviewerTitle || undefined,
            company: reviewerCompany || undefined,
            photoUrl: reviewerPhotoUrl || undefined,
          }
        : undefined;

    const llmOutput = await generateCarouselContent(
      rawInput.trim(),
      brandKit.company_name,
      reviewerInfo
    );

    // Merge reviewer photo URL into the output for rendering
    const outputWithPhoto = {
      ...llmOutput,
      reviewerPhotoUrl: reviewerPhotoUrl || null,
    };

    const savePayload = {
      user_id: user.id,
      raw_input: rawInput.trim(),
      llm_output: outputWithPhoto as unknown as Record<string, unknown>,
    };

    const { data: saved, error: saveError } = await supabase
      .from("generated_content")
      .insert(savePayload as never)
      .select()
      .single();

    // Log lead to Google Sheets (fire-and-forget)
    appendLeadToSheet(user.email ?? "unknown", effectivePlan).catch((err) =>
      console.error("Google Sheets error:", err)
    );

    if (saveError) {
      console.error("Save error:", saveError);
      return NextResponse.json(
        { error: "Failed to save generated content" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: (saved as Record<string, unknown>).id,
      llmOutput: outputWithPhoto,
      brandKit: {
        companyName: brandKit.company_name,
        logoUrl: brandKit.logo_url,
        primaryColor: brandKit.primary_color,
        secondaryColor: brandKit.secondary_color,
      },
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Generate error:", errMsg, error);
    return NextResponse.json(
      { error: `Generation failed: ${errMsg}` },
      { status: 500 }
    );
  }
}
