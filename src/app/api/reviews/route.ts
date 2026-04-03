import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!rateLimit(`add-review:${user.id}`, { maxRequests: 20, windowMs: 60_000 }).success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const { reviewer_name, review_text, rating, image_url } = body;

  if (!reviewer_name || (!review_text && !image_url)) {
    return NextResponse.json(
      { error: "Name and either review text or image are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("imported_reviews")
    .insert({
      user_id: user.id,
      platform: "manual",
      reviewer_name: reviewer_name.trim(),
      reviewer_title: (body.reviewer_title || "").trim() || null,
      reviewer_company: (body.reviewer_company || "").trim() || null,
      review_text: (review_text || "").trim() || "Screenshot review",
      rating: rating || 5,
      image_url: image_url || null,
      verified: false,
      display_on_trust_card: true,
    } as never)
    .select()
    .single();

  if (error) {
    console.error("Manual review insert error:", error);
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }

  return NextResponse.json({ success: true, review: data });
}
