import { NextResponse, after } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { Resend } from "resend";

const NOTIFY_TO = process.env.FEEDBACK_EMAIL || "lior@proofpst.com";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/trust-card";

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Run after the response is sent — survives serverless termination
      after(async () => {
        try {
          await notifyIfNewUser();
        } catch (e) {
          console.error("Signup notification failed:", e);
        }
      });

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Return the user to login with an error
  return NextResponse.redirect(`${origin}/login`);
}

async function notifyIfNewUser() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get the most recently created profile
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("email, plan, created_at, updated_at")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!profile) return;

  // Only notify for genuinely new users:
  // 1. Profile created within the last 24h (email confirmation can take hours)
  // 2. created_at equals updated_at (no subsequent logins yet)
  const createdAt = new Date(profile.created_at);
  const updatedAt = new Date(profile.updated_at);
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  if (createdAt < oneDayAgo) return;
  if (Math.abs(updatedAt.getTime() - createdAt.getTime()) > 60_000) return;

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "ProofPost <hello@proofpst.com>",
    to: NOTIFY_TO,
    subject: `New signup: ${profile.email}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px;">
        <h2 style="margin: 0 0 16px; font-size: 18px; color: #0F172A;">New User Signed Up</h2>
        <table style="font-size: 14px; color: #334155;">
          <tr><td style="padding: 4px 16px 4px 0; font-weight: 600;">Email</td><td>${profile.email}</td></tr>
          <tr><td style="padding: 4px 16px 4px 0; font-weight: 600;">Plan</td><td>${profile.plan}</td></tr>
          <tr><td style="padding: 4px 16px 4px 0; font-weight: 600;">Time</td><td>${createdAt.toLocaleString("he-IL", { timeZone: "Asia/Jerusalem" })}</td></tr>
        </table>
      </div>
    `,
  });
}
