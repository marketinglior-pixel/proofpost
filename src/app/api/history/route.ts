import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface LlmOutput {
  hookLine: string;
  reviewer: { name: string; title: string; company: string };
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await supabase
    .from("generated_content")
    .select("id, raw_input, llm_output, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const items = (data || []).map((c) => {
    const llm = c.llm_output as unknown as LlmOutput;
    return {
      id: c.id,
      hookLine: llm?.hookLine || "Review",
      reviewerName: llm?.reviewer?.name || "Customer",
      rawInput: c.raw_input,
      createdAt: c.created_at,
    };
  });

  return NextResponse.json({ items });
}
