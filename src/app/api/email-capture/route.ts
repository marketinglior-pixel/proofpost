import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_TO = process.env.FEEDBACK_EMAIL || "lior@proofpst.com";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, toolName } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!toolName || typeof toolName !== "string") {
    return NextResponse.json({ error: "Invalid tool name" }, { status: 400 });
  }

  const toolLabels: Record<string, string> = {
    "nps-calculator": "NPS Report",
    "csat-calculator": "CSAT Improvement Guide",
    "star-rating-calculator": "Rating Improvement Playbook",
    "social-proof-scanner": "Social Proof Report",
  };

  const label = toolLabels[toolName] || "Report";

  try {
    // Send the lead a thank-you email
    await resend.emails.send({
      from: "ProofPost <hello@proofpst.com>",
      to: email,
      subject: `Your ${label} from ProofPost`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto;">
          <div style="text-align: center; padding: 32px 0 24px;">
            <div style="display: inline-block; background: #10B981; border-radius: 8px; padding: 8px; margin-bottom: 12px;">
              <span style="color: white; font-size: 18px;">&#9733;</span>
            </div>
            <h1 style="margin: 0; font-size: 22px; color: #0F172A;">Your ${label}</h1>
          </div>
          <div style="background: #F8FAFC; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <p style="margin: 0 0 16px; font-size: 15px; color: #334155; line-height: 1.6;">
              Thanks for using our free ${toolName.replace(/-/g, " ")}!
            </p>
            <p style="margin: 0 0 16px; font-size: 15px; color: #334155; line-height: 1.6;">
              Here are a few ways to take action on your results:
            </p>
            <ul style="margin: 0 0 16px; padding-left: 20px; font-size: 15px; color: #334155; line-height: 1.8;">
              <li>Benchmark against your industry regularly</li>
              <li>Track your score month-over-month</li>
              <li>Share your best scores as social proof on your website</li>
            </ul>
          </div>
          <div style="text-align: center; padding: 24px; background: #0F172A; border-radius: 12px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #10B981; text-transform: uppercase; letter-spacing: 1px;">
              Ready to show off your score?
            </p>
            <p style="margin: 0 0 16px; font-size: 16px; color: white; font-weight: 600;">
              Turn customer feedback into website social proof
            </p>
            <a href="https://proofpst.com/login" style="display: inline-block; background: #10B981; color: white; font-size: 15px; font-weight: 500; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
              Try ProofPost Free &rarr;
            </a>
            <p style="margin: 12px 0 0; font-size: 12px; color: #64748B;">
              No credit card required
            </p>
          </div>
          <p style="margin: 32px 0 0; font-size: 12px; color: #94A3B8; text-align: center;">
            You received this because you used a free tool on proofpst.com.<br/>
            <a href="https://proofpst.com" style="color: #94A3B8;">proofpst.com</a>
          </p>
        </div>
      `,
    });

    // Notify the team about the new lead
    await resend.emails.send({
      from: "ProofPost Tools <hello@proofpst.com>",
      to: NOTIFY_TO,
      subject: `New tool lead: ${email} (${toolName})`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="margin: 0 0 16px;">New Email Capture</h2>
          <table style="font-size: 14px; color: #334155;">
            <tr><td style="padding: 4px 16px 4px 0; font-weight: 600;">Email</td><td>${email}</td></tr>
            <tr><td style="padding: 4px 16px 4px 0; font-weight: 600;">Tool</td><td>${toolName}</td></tr>
            <tr><td style="padding: 4px 16px 4px 0; font-weight: 600;">Time</td><td>${new Date().toISOString()}</td></tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process email capture:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
