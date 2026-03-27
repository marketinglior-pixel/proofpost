import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { processApprovedSubmission } from "@/lib/process-submission";

// Public supabase client for submissions (no auth required for submitting)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST: Submit a review (public, no auth)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formId, reviewerName, reviewerTitle, reviewerCompany, reviewText, rating } = body;

  if (!formId || !reviewerName || !reviewText) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (typeof reviewText !== "string" || reviewText.trim().length < 10) {
    return NextResponse.json({ error: "Review must be at least 10 characters" }, { status: 400 });
  }

  // Verify form exists and is active, check auto_approve setting
  const { data: form } = await supabaseAdmin
    .from("collection_forms")
    .select("id, user_id, active, auto_approve, linked_widget_id")
    .eq("id", formId)
    .single();

  if (!form) return NextResponse.json({ error: "Form not found" }, { status: 404 });
  if (!form.active) return NextResponse.json({ error: "Form is no longer accepting submissions" }, { status: 400 });

  const initialStatus = form.auto_approve ? "approved" : "pending";

  const { data: submission, error } = await supabaseAdmin
    .from("submissions")
    .insert({
      form_id: formId,
      user_id: form.user_id,
      reviewer_name: reviewerName.trim(),
      reviewer_title: reviewerTitle?.trim() || null,
      reviewer_company: reviewerCompany?.trim() || null,
      review_text: reviewText.trim(),
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      status: initialStatus,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // If auto-approved, process in background (generate content + add to widget)
  if (form.auto_approve && submission) {
    processApprovedSubmission(submission as {
      id: string;
      form_id: string;
      user_id: string;
      reviewer_name: string;
      reviewer_title: string | null;
      reviewer_company: string | null;
      reviewer_photo_url: string | null;
      review_text: string;
    }).catch((err) => console.error("Auto-process error:", err));
  }

  return NextResponse.json({ submission, autoApproved: form.auto_approve }, { status: 201 });
}

// GET: List submissions for authenticated user
export async function GET(req: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formId = req.nextUrl.searchParams.get("formId");

  let query = supabaseAdmin
    .from("submissions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (formId) {
    query = query.eq("form_id", formId);
  }

  const { data: submissions, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ submissions });
}

// PATCH: Approve or reject a submission
export async function PATCH(req: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { submissionId, status } = body;

  if (!submissionId || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Verify ownership
  const { data: submission } = await supabaseAdmin
    .from("submissions")
    .select("*")
    .eq("id", submissionId)
    .eq("user_id", user.id)
    .single();

  if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });

  // Update status
  const { error: updateError } = await supabaseAdmin
    .from("submissions")
    .update({ status })
    .eq("id", submissionId);

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

  // If approved, generate carousel and add to widget
  if (status === "approved") {
    try {
      const result = await processApprovedSubmission(submission as {
        id: string;
        form_id: string;
        user_id: string;
        reviewer_name: string;
        reviewer_title: string | null;
        reviewer_company: string | null;
        reviewer_photo_url: string | null;
        review_text: string;
      });

      return NextResponse.json({
        status: "approved",
        contentId: result.contentId,
        addedToWidget: result.addedToWidget,
      });
    } catch {
      // Generation failed but approval succeeded
    }
  }

  return NextResponse.json({ status });
}
