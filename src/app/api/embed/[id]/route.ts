import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service role to bypass RLS for public embed reads
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch the generated content
    const { data: content, error } = await supabase
      .from("generated_content")
      .select("id, user_id, llm_output, created_at")
      .eq("id", id)
      .single();

    if (error || !content) {
      return NextResponse.json(
        { error: "Content not found" },
        { status: 404 }
      );
    }

    // Fetch the user's brand kit
    const { data: brandKit } = await supabase
      .from("brand_kits")
      .select("company_name, logo_url, primary_color, secondary_color")
      .eq("user_id", content.user_id)
      .single();

    // Parse LLM output
    const llm = content.llm_output as Record<string, unknown>;

    return NextResponse.json(
      {
        id: content.id,
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
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Cache-Control": "public, max-age=3600",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
