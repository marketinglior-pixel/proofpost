import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { rateLimit } from "@/lib/rate-limit";

// Reserved words: all existing route segments that could conflict with /[username]
const RESERVED_USERNAMES = new Set([
  "login", "signup", "dashboard", "api", "blog", "wall", "collect",
  "embed", "widget-preview", "case-study", "pricing", "settings",
  "onboarding", "generate", "forms", "history", "analytics",
  "brand-kit", "widgets", "import", "go", "demo", "guide", "tools",
  "privacy", "terms", "about", "contact", "help", "support",
  "admin", "trust-card", "wall-of-love", "case-studies",
  "app", "www", "mail", "ftp", "test", "dev", "staging",
  "proofpost", "proofpst", "proof-post",
]);

const USERNAME_REGEX = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/;

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!rateLimit(`claim-username:${user.id}`, { maxRequests: 10, windowMs: 60_000 }).success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const username = (body.username || "").toLowerCase().trim();
  const displayName = (body.displayName || "").trim();

  if (!username || !USERNAME_REGEX.test(username)) {
    return NextResponse.json(
      { error: "Username must be 3-30 characters, lowercase letters, numbers, and hyphens only." },
      { status: 400 }
    );
  }

  if (RESERVED_USERNAMES.has(username)) {
    return NextResponse.json({ error: "This username is not available." }, { status: 409 });
  }

  if (!displayName || displayName.length > 100) {
    return NextResponse.json({ error: "Display name is required (max 100 characters)." }, { status: 400 });
  }

  const admin = createAdminClient();

  // Check if user already has a trust card
  const { data: existing } = await admin
    .from("trust_cards")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (existing) {
    return NextResponse.json({ error: "You already have a Trust Card. Edit it instead." }, { status: 409 });
  }

  // Check username availability
  const { data: taken } = await admin
    .from("trust_cards")
    .select("id")
    .eq("username", username)
    .limit(1)
    .single();

  if (taken) {
    return NextResponse.json({ error: "This username is already taken." }, { status: 409 });
  }

  // Create trust card + update profile username in parallel
  const [cardResult, profileResult] = await Promise.all([
    admin.from("trust_cards").insert({
      user_id: user.id,
      username,
      display_name: displayName,
    }).select("id, username").single(),
    admin.from("profiles").update({
      username,
      updated_at: new Date().toISOString(),
    }).eq("id", user.id),
  ]);

  if (cardResult.error) {
    console.error("Trust card creation error:", cardResult.error);
    if (cardResult.error.code === "23505") {
      return NextResponse.json({ error: "This username is already taken." }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create Trust Card." }, { status: 500 });
  }

  if (profileResult.error) {
    console.error("Profile update error:", profileResult.error);
  }

  return NextResponse.json({
    success: true,
    trustCard: cardResult.data,
    url: `/${username}`,
  });
}

// Check username availability
export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")?.toLowerCase().trim();

  if (!username || !USERNAME_REGEX.test(username)) {
    return NextResponse.json({ available: false, reason: "Invalid format" });
  }

  if (RESERVED_USERNAMES.has(username)) {
    return NextResponse.json({ available: false, reason: "Reserved" });
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("trust_cards")
    .select("id")
    .eq("username", username)
    .limit(1)
    .single();

  return NextResponse.json({ available: !data });
}
