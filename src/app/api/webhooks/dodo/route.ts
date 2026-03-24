import { Webhooks } from "@dodopayments/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function upgradeUser(email: string) {
  const { data: users } = await supabase.auth.admin.listUsers();
  const user = users?.users?.find((u) => u.email === email);
  if (!user) {
    console.error("User not found for email:", email);
    return;
  }
  await supabase
    .from("profiles")
    .update({ plan: "pro", updated_at: new Date().toISOString() })
    .eq("id", user.id);
  console.log("User upgraded to pro:", user.id);
}

async function downgradeUser(email: string) {
  const { data: users } = await supabase.auth.admin.listUsers();
  const user = users?.users?.find((u) => u.email === email);
  if (!user) return;
  await supabase
    .from("profiles")
    .update({ plan: "free", updated_at: new Date().toISOString() })
    .eq("id", user.id);
  console.log("User downgraded to free:", user.id);
}

export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY!,

  onPaymentSucceeded: async (payload) => {
    console.log("Payment succeeded:", payload.data?.payment_id);
    const email = payload.data?.customer?.email;
    if (email) await upgradeUser(email);
  },

  onSubscriptionActive: async (payload) => {
    console.log("Subscription active:", payload.data?.subscription_id);
    const email = payload.data?.customer?.email;
    if (email) await upgradeUser(email);
  },

  onSubscriptionCancelled: async (payload) => {
    console.log("Subscription cancelled:", payload.data?.subscription_id);
    const email = payload.data?.customer?.email;
    if (email) await downgradeUser(email);
  },

  onSubscriptionExpired: async (payload) => {
    console.log("Subscription expired:", payload.data?.subscription_id);
    const email = payload.data?.customer?.email;
    if (email) await downgradeUser(email);
  },
});
