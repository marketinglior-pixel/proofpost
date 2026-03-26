import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FEEDBACK_TO = process.env.FEEDBACK_EMAIL || "lior@proofpst.com";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { category, message, email, pageUrl } = body;

  if (!category || !["bug", "feedback", "idea"].includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  if (typeof message !== "string" || message.trim().length < 10) {
    return NextResponse.json(
      { error: "Message must be at least 10 characters" },
      { status: 400 }
    );
  }

  const categoryLabels: Record<string, string> = {
    bug: "Bug Report",
    feedback: "Feedback",
    idea: "Feature Idea",
  };

  const categoryEmojis: Record<string, string> = {
    bug: "\u{1F41B}",
    feedback: "\u{1F4AC}",
    idea: "\u{1F4A1}",
  };

  try {
    await resend.emails.send({
      from: "ProofPost Feedback <feedback@proofpst.com>",
      to: FEEDBACK_TO,
      subject: `${categoryEmojis[category]} [${categoryLabels[category]}] New feedback from ProofPost`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="margin: 0 0 16px;">${categoryEmojis[category]} ${categoryLabels[category]}</h2>
          <div style="background: #F1F5F9; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <p style="margin: 0; white-space: pre-wrap;">${message.trim()}</p>
          </div>
          <table style="font-size: 13px; color: #64748B;">
            ${email ? `<tr><td style="padding: 2px 12px 2px 0; font-weight: 600;">Email</td><td>${email}</td></tr>` : ""}
            ${pageUrl ? `<tr><td style="padding: 2px 12px 2px 0; font-weight: 600;">Page</td><td>${pageUrl}</td></tr>` : ""}
            <tr><td style="padding: 2px 12px 2px 0; font-weight: 600;">Time</td><td>${new Date().toISOString()}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send feedback email:", error);
    return NextResponse.json(
      { error: "Failed to send feedback" },
      { status: 500 }
    );
  }
}
