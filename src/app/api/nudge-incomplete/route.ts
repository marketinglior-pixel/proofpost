import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

/**
 * POST /api/nudge-incomplete
 *
 * Finds users who signed up but never created a Trust Card, and sends them
 * a nudge email. Safe to call multiple times — each user is only sent once
 * (tracked via `nudge_sent_at` column on profiles, added automatically).
 *
 * Query params:
 *   ?dry_run=true — preview who would be emailed without sending
 *   ?hours=24     — only nudge users who signed up at least N hours ago (default: 24)
 *   ?secret=X     — auth token (must match CRON_SECRET env var)
 *
 * Can also pass secret via x-cron-secret header.
 */

const CRON_SECRET = process.env.CRON_SECRET || "nudge-secret-change-me";

export async function POST(req: NextRequest) {
  // Simple auth
  const authHeader =
    req.headers.get("x-cron-secret") ||
    req.nextUrl.searchParams.get("secret");
  if (authHeader !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dryRun = req.nextUrl.searchParams.get("dry_run") === "true";
  const minHours = parseInt(
    req.nextUrl.searchParams.get("hours") || "24",
    10
  );

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Ensure nudge_sent_at column exists (idempotent)
  await ensureNudgeColumn(supabase);

  const cutoff = new Date(
    Date.now() - minHours * 60 * 60 * 1000
  ).toISOString();

  // Get all profiles created before cutoff
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, email, display_name, created_at, nudge_sent_at")
    .lt("created_at", cutoff)
    .is("nudge_sent_at", null)
    .order("created_at", { ascending: false });

  if (profilesError) {
    // If nudge_sent_at column doesn't exist yet, fall back
    if (profilesError.message.includes("nudge_sent_at")) {
      const { data: fallbackProfiles } = await supabase
        .from("profiles")
        .select("id, email, display_name, created_at")
        .lt("created_at", cutoff)
        .order("created_at", { ascending: false });

      return await processNudge(
        supabase,
        resend,
        fallbackProfiles || [],
        dryRun,
        false // can't track nudge
      );
    }
    return NextResponse.json(
      { error: profilesError.message },
      { status: 500 }
    );
  }

  return await processNudge(
    supabase,
    resend,
    profiles || [],
    dryRun,
    true // can track nudge
  );
}

async function ensureNudgeColumn(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any
) {
  // Try adding the column — if it already exists, Postgres ignores it
  try {
    await supabase.rpc("exec_sql", {
      query:
        "ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS nudge_sent_at timestamptz DEFAULT NULL;",
    });
  } catch {
    // RPC doesn't exist or no permission — that's fine,
    // the column either exists or we'll handle it in the fallback above
  }
}

async function processNudge(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  resend: Resend,
  profiles: Array<{
    id: string;
    email: string;
    display_name: string | null;
    created_at: string;
  }>,
  dryRun: boolean,
  canTrackNudge: boolean
) {
  if (profiles.length === 0) {
    return NextResponse.json({ message: "No users to nudge", nudged: 0 });
  }

  // Get all user_ids that DO have a trust card
  const { data: trustCards } = await supabase
    .from("trust_cards")
    .select("user_id");

  const usersWithCard = new Set(
    (trustCards || []).map((tc: { user_id: string }) => tc.user_id)
  );

  // Filter to only users WITHOUT a trust card
  const toNudge = profiles.filter((p) => !usersWithCard.has(p.id));

  // Skip emails that look like test/internal accounts
  const internalPatterns = [
    "lior",
    "marketinglior",
    "kirill",
    "moyalmusic",
    "revreclaim",
    "proofpst.com",
    "moyalstudio.com",
  ];
  const realUsers = toNudge.filter(
    (p) =>
      !internalPatterns.some((pat) => p.email.toLowerCase().includes(pat))
  );

  if (dryRun) {
    return NextResponse.json({
      dry_run: true,
      would_nudge: realUsers.map((p) => ({
        email: p.email,
        name: p.display_name,
        signed_up: p.created_at,
      })),
      skipped_internal: toNudge.length - realUsers.length,
      total_without_card: toNudge.length,
    });
  }

  // Send nudge emails
  const results: {
    email: string;
    status: "sent" | "failed";
    error?: string;
  }[] = [];

  for (const user of realUsers) {
    const displayName = user.display_name?.split("@")[0] || "there";
    const firstName = displayName.split(" ")[0];

    try {
      await resend.emails.send({
        from: "Lior from ProofPost <hello@proofpst.com>",
        to: user.email,
        subject: "Your Trust Card is waiting",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 24px 0;">
            <p style="font-size: 16px; color: #1E293B; line-height: 1.6; margin: 0 0 16px;">
              Hey ${firstName},
            </p>
            <p style="font-size: 16px; color: #1E293B; line-height: 1.6; margin: 0 0 16px;">
              I noticed you signed up for ProofPost but didn't get to finish setting up your Trust Card.
            </p>
            <p style="font-size: 16px; color: #1E293B; line-height: 1.6; margin: 0 0 16px;">
              It takes about 60 seconds — pick a username, add a few reviews, and you'll have a professional proof page you can share with prospects.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://proofpst.com/login?mode=login" style="display: inline-block; background: #10B981; color: white; font-size: 16px; font-weight: 600; padding: 14px 32px; border-radius: 10px; text-decoration: none;">
                Finish Setting Up &rarr;
              </a>
            </div>
            <p style="font-size: 16px; color: #1E293B; line-height: 1.6; margin: 0 0 16px;">
              If something was confusing or broken, just reply to this email — I read every message.
            </p>
            <p style="font-size: 16px; color: #1E293B; line-height: 1.6; margin: 0;">
              — Lior
            </p>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 32px 0 16px;" />
            <p style="font-size: 12px; color: #94A3B8; text-align: center;">
              You signed up for ProofPost on ${new Date(user.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}.<br/>
              <a href="https://proofpst.com" style="color: #94A3B8;">proofpst.com</a>
            </p>
          </div>
        `,
      });

      // Mark as nudged (if column exists)
      if (canTrackNudge) {
        await supabase
          .from("profiles")
          .update({ nudge_sent_at: new Date().toISOString() })
          .eq("id", user.id);
      }

      results.push({ email: user.email, status: "sent" });
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "Unknown error";
      results.push({
        email: user.email,
        status: "failed",
        error: errorMessage,
      });
    }
  }

  // Notify team
  const sentCount = results.filter((r) => r.status === "sent").length;
  if (sentCount > 0) {
    try {
      await resend.emails.send({
        from: "ProofPost <hello@proofpst.com>",
        to: process.env.FEEDBACK_EMAIL || "lior@proofpst.com",
        subject: `Nudge sent to ${sentCount} users`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px;">
            <h2>Nudge Email Report</h2>
            <p>${sentCount} users nudged, ${results.filter((r) => r.status === "failed").length} failed.</p>
            <table style="font-size: 13px; border-collapse: collapse;">
              <tr style="background: #f8f9fa;"><th style="padding: 6px 12px; text-align: left;">Email</th><th style="padding: 6px 12px;">Status</th></tr>
              ${results.map((r) => `<tr><td style="padding: 6px 12px; border-top: 1px solid #eee;">${r.email}</td><td style="padding: 6px 12px; border-top: 1px solid #eee;">${r.status}</td></tr>`).join("")}
            </table>
          </div>
        `,
      });
    } catch {
      // Non-critical
    }
  }

  return NextResponse.json({
    nudged: sentCount,
    failed: results.filter((r) => r.status === "failed").length,
    results,
  });
}
