import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { widgetId, name, style } = await request.json();
    if (!widgetId) {
      return NextResponse.json({ error: "Widget ID is required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (name !== undefined) updates.name = name;
    if (style !== undefined) updates.style = style;

    const { data, error } = await supabase
      .from("widgets")
      .update(updates)
      .eq("id", widgetId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ widget: data });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: widgets, error } = await supabase
      .from("widgets")
      .select("id, name, content_ids, style, created_at, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ widgets: widgets || [] });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

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

    const { name, contentIds, style } = await request.json();

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
      style: style || null,
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
