import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    const { name, contentIds } = await request.json();

    if (!contentIds || !Array.isArray(contentIds) || contentIds.length === 0) {
      return NextResponse.json(
        { error: "At least one review is required" },
        { status: 400 }
      );
    }

    const payload = {
      user_id: user.id,
      name: name || "My Testimonials",
      content_ids: contentIds,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("widgets")
      .insert(payload as never)
      .select()
      .single();

    if (error) {
      console.error("Widget create error:", error);
      return NextResponse.json(
        { error: "Failed to create widget" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: (data as Record<string, unknown>).id,
      name: (data as Record<string, unknown>).name,
    });
  } catch (error) {
    console.error("Widget error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
