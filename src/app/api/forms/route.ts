import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: forms, error } = await supabase
    .from("collection_forms")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ forms });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, questions, autoApprove, linkedWidgetId, thankYouMessage } = body;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  // Validate linked widget ownership if provided
  if (linkedWidgetId) {
    const { data: widget } = await supabase
      .from("widgets")
      .select("id")
      .eq("id", linkedWidgetId)
      .eq("user_id", user.id)
      .single();

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 400 });
    }
  }

  // Generate slug from title
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  const { data: form, error } = await supabase
    .from("collection_forms")
    .insert({
      user_id: user.id,
      title: title.trim(),
      description: description?.trim() || null,
      questions: questions || ["What do you like most about our product?", "How has it helped your business?"],
      slug,
      active: true,
      auto_approve: autoApprove || false,
      linked_widget_id: linkedWidgetId || null,
      thank_you_message: thankYouMessage?.trim() || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ form }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { formId, autoApprove, linkedWidgetId, thankYouMessage, active } = body;

  if (!formId) {
    return NextResponse.json({ error: "Form ID is required" }, { status: 400 });
  }

  // Verify ownership
  const { data: existing } = await supabase
    .from("collection_forms")
    .select("id")
    .eq("id", formId)
    .eq("user_id", user.id)
    .single();

  if (!existing) return NextResponse.json({ error: "Form not found" }, { status: 404 });

  // Validate linked widget ownership if provided
  if (linkedWidgetId) {
    const { data: widget } = await supabase
      .from("widgets")
      .select("id")
      .eq("id", linkedWidgetId)
      .eq("user_id", user.id)
      .single();

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 400 });
    }
  }

  const updates: Record<string, unknown> = {};
  if (autoApprove !== undefined) updates.auto_approve = autoApprove;
  if (linkedWidgetId !== undefined) updates.linked_widget_id = linkedWidgetId || null;
  if (thankYouMessage !== undefined) updates.thank_you_message = thankYouMessage?.trim() || null;
  if (active !== undefined) updates.active = active;

  const { data: form, error } = await supabase
    .from("collection_forms")
    .update(updates)
    .eq("id", formId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ form });
}
