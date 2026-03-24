import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function upgradeUser(email: string) {
  const { data: users } = await supabase.auth.admin.listUsers();
  const user = users?.users?.find((u) => u.email === email);
  if (!user) { console.error("User not found:", email); return; }
  await supabase.from("profiles").update({ plan: "pro", updated_at: new Date().toISOString() }).eq("id", user.id);
  console.log("Upgraded to pro:", user.id);
}

async function downgradeUser(email: string) {
  const { data: users } = await supabase.auth.admin.listUsers();
  const user = users?.users?.find((u) => u.email === email);
  if (!user) return;
  await supabase.from("profiles").update({ plan: "free", updated_at: new Date().toISOString() }).eq("id", user.id);
  console.log("Downgraded to free:", user.id);
}

function verifySignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) return false;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const expected = hmac.digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("webhook-signature") || request.headers.get("x-dodo-signature") || "";
    const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY || "";

    // Always verify webhook signature in production
    if (!webhookKey) {
      console.error("DODO_PAYMENTS_WEBHOOK_KEY is not configured");
      return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
    }

    if (!verifySignature(body, signature, webhookKey)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const eventType = payload.type || payload.event_type || "";
    const email = payload.data?.customer?.email || payload.customer?.email || "";

    console.log("Dodo webhook:", eventType, email);

    if (eventType.includes("payment.succeeded") || eventType.includes("subscription.active")) {
      if (email) await upgradeUser(email);
    }

    if (eventType.includes("subscription.cancelled") || eventType.includes("subscription.expired")) {
      if (email) await downgradeUser(email);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
