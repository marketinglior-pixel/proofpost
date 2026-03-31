import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DODO_API_BASE =
  process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
    ? "https://live.dodopayments.com"
    : "https://test.dodopayments.com";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Find customer by email in Dodo
    const listRes = await fetch(
      `${DODO_API_BASE}/customers?email=${encodeURIComponent(user.email)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
        },
      }
    );

    if (!listRes.ok) {
      console.error("Dodo list customers error:", await listRes.text());
      return NextResponse.json({ error: "Could not find subscription" }, { status: 500 });
    }

    const customers = await listRes.json();
    // Response may be an array or { items: [...] }
    const customerList = Array.isArray(customers) ? customers : customers.items || [];
    const customer = customerList[0];

    if (!customer?.customer_id) {
      return NextResponse.json({ error: "No subscription found" }, { status: 404 });
    }

    // Create portal session
    const portalRes = await fetch(
      `${DODO_API_BASE}/customers/${customer.customer_id}/customer-portal/session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!portalRes.ok) {
      console.error("Dodo portal error:", await portalRes.text());
      // Fallback to generic customer portal
      return NextResponse.json({ url: "https://customer.dodopayments.com/" });
    }

    const portal = await portalRes.json();
    return NextResponse.json({ url: portal.link });
  } catch (error) {
    console.error("Billing portal error:", error);
    return NextResponse.json({ error: "Failed to open billing portal" }, { status: 500 });
  }
}
