import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = process.env.FEEDBACK_EMAIL || "lior@proofpst.com";

const EASE_LABELS: Record<number, string> = {
  1: "\ud83d\ude2b Very hard",
  2: "\ud83d\ude15 Hard",
  3: "\ud83d\ude10 Okay",
  4: "\ud83d\ude42 Easy",
  5: "\ud83e\udd29 Super easy",
};

const USEFUL_LABELS: Record<string, string> = {
  ai_import: "AI review import",
  customization: "Customization options",
  trust_card_page: "The final Trust Card page",
  speed: "How fast it was",
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const questionnaire = body.questionnaire || "post_first_trust_card";
  const responses = body.responses || {};
  const completed = body.completed || false;
  const skipped = body.skipped || false;

  const { error } = await supabase
    .from("questionnaire_responses")
    .upsert(
      {
        user_id: user.id,
        questionnaire,
        responses,
        completed,
        skipped,
      },
      { onConflict: "user_id,questionnaire" }
    );

  if (error) {
    console.error("Questionnaire save error:", error);
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 });
  }

  // Send email notification on complete or skip
  if (completed || skipped) {
    sendNotificationEmail(user.email || "unknown", responses, completed, skipped).catch(
      (err) => console.error("Questionnaire notification email failed:", err)
    );
  }

  return NextResponse.json({ success: true });
}

async function sendNotificationEmail(
  userEmail: string,
  responses: Record<string, unknown>,
  completed: boolean,
  skipped: boolean
) {
  const status = completed ? "\u2705 Completed" : "\u23ed\ufe0f Skipped";
  const easeRating = responses.ease_rating
    ? EASE_LABELS[responses.ease_rating as number] || String(responses.ease_rating)
    : "—";
  const mostUseful = responses.most_useful
    ? USEFUL_LABELS[responses.most_useful as string] || String(responses.most_useful)
    : "—";
  const feedback = responses.improvement_feedback
    ? String(responses.improvement_feedback)
    : "—";
  const nps = responses.nps_score !== undefined ? String(responses.nps_score) : "—";

  const npsColor =
    typeof responses.nps_score === "number"
      ? responses.nps_score <= 6
        ? "#EF4444"
        : responses.nps_score <= 8
        ? "#F59E0B"
        : "#10B981"
      : "#64748B";

  await resend.emails.send({
    from: "ProofPost <feedback@proofpst.com>",
    to: NOTIFY_EMAIL,
    subject: `\ud83d\udccb UX Survey ${status} — ${userEmail}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px;">
        <h2 style="margin: 0 0 16px;">\ud83d\udccb Post Trust Card Survey</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 12px; font-weight: 600; color: #64748B; width: 140px;">Status</td>
            <td style="padding: 10px 12px;">${status}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 12px; font-weight: 600; color: #64748B;">User</td>
            <td style="padding: 10px 12px;">${userEmail}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 12px; font-weight: 600; color: #64748B;">Ease Rating</td>
            <td style="padding: 10px 12px;">${easeRating}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 12px; font-weight: 600; color: #64748B;">Most Useful</td>
            <td style="padding: 10px 12px;">${mostUseful}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 10px 12px; font-weight: 600; color: #64748B;">Feedback</td>
            <td style="padding: 10px 12px; white-space: pre-wrap;">${feedback}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #64748B;">NPS Score</td>
            <td style="padding: 10px 12px;"><span style="font-size: 20px; font-weight: bold; color: ${npsColor};">${nps}</span><span style="color: #94A3B8;">/10</span></td>
          </tr>
        </table>
        <p style="margin: 16px 0 0; font-size: 12px; color: #94A3B8;">${new Date().toISOString()}</p>
      </div>
    `,
  });
}
