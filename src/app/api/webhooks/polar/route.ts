import { Webhooks } from "@polar-sh/nextjs";
import { createClient } from "@supabase/supabase-js";

// Use service role to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,

  onOrderPaid: async (payload) => {
    console.log("Order paid:", payload.data.id);

    const email = payload.data.customer?.email;
    if (!email) {
      console.error("No customer email in order");
      return;
    }

    // Find user by email in Supabase
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find((u) => u.email === email);

    if (!user) {
      console.error("User not found for email:", email);
      return;
    }

    // Update their plan to 'pro'
    const { error } = await supabase
      .from("profiles")
      .update({ plan: "pro", updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (error) {
      console.error("Failed to update plan:", error);
    } else {
      console.log("User upgraded to pro:", user.id);
    }
  },

  onSubscriptionCreated: async (payload) => {
    console.log("Subscription created:", payload.data.id);
  },

  onSubscriptionUpdated: async (payload) => {
    console.log("Subscription updated:", payload.data.id, payload.data.status);

    // If subscription is canceled or revoked, downgrade to free
    if (
      payload.data.status === "canceled" ||
      payload.data.status === "revoked"
    ) {
      const email = payload.data.customer?.email;
      if (!email) return;

      const { data: users } = await supabase.auth.admin.listUsers();
      const user = users?.users?.find((u) => u.email === email);

      if (user) {
        await supabase
          .from("profiles")
          .update({ plan: "free", updated_at: new Date().toISOString() })
          .eq("id", user.id);
        console.log("User downgraded to free:", user.id);
      }
    }
  },
});
