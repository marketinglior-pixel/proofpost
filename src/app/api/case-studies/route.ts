import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { generateCaseStudy } from "@/lib/ai/generate-case-study";

const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface LlmOutput {
  hookLine: string;
  slides: { body: string }[];
  reviewer: { name: string; title: string; company: string };
}

// GET: List case studies for authenticated user
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: caseStudies } = await supabaseAdmin
    .from("case_studies")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ caseStudies: caseStudies || [] });
}

// POST: Generate a case study from a review
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { contentId } = body;

  if (!contentId) {
    return NextResponse.json({ error: "Content ID is required" }, { status: 400 });
  }

  // Fetch the review content
  const { data: content } = await supabaseAdmin
    .from("generated_content")
    .select("id, raw_input, llm_output, user_id")
    .eq("id", contentId)
    .eq("user_id", user.id)
    .single();

  if (!content) {
    return NextResponse.json({ error: "Content not found" }, { status: 404 });
  }

  // Get brand kit for company name
  const { data: brandKit } = await supabaseAdmin
    .from("brand_kits")
    .select("company_name")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  const llm = content.llm_output as unknown as LlmOutput;
  const reviewer = llm?.reviewer || { name: "Customer", title: "", company: "" };

  // Generate case study
  const caseStudy = await generateCaseStudy(
    content.raw_input,
    reviewer.name,
    reviewer.title,
    reviewer.company,
    brandKit?.company_name || "the product"
  );

  // Save to database
  const { data: saved, error } = await supabaseAdmin
    .from("case_studies")
    .insert({
      user_id: user.id,
      content_id: contentId,
      title: caseStudy.title,
      body: caseStudy as unknown as Record<string, unknown>,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ caseStudy: saved }, { status: 201 });
}
