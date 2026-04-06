import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getPlanFromProductId } from "@/lib/plans";

const DODO_API_BASE = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
  ? "https://live.dodopayments.com"
  : "https://test.dodopayments.com";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");
  const email = request.nextUrl.searchParams.get("email");
  const discountCode = request.nextUrl.searchParams.get("discount_code");

  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  // Validate product ID maps to a known plan
  const plan = getPlanFromProductId(productId);
  if (!plan) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  if (!rateLimit(`checkout:${email}`, { maxRequests: 5, windowMs: 60_000 }).success) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }

  try {
    const body: Record<string, unknown> = {
      billing: { city: "", country: "US", state: "", street: "", zipcode: "" },
      customer: { email, name: email.split("@")[0] },
      product_id: productId,
      quantity: 1,
      payment_link: true,
      return_url: process.env.DODO_PAYMENTS_RETURN_URL || "https://proofpst.com/dashboard",
    };

    if (discountCode) {
      body.discount_code = discountCode;
    }

    // All plans use subscriptions endpoint (LTD is deprecated)
    const endpoint = `${DODO_API_BASE}/subscriptions`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Dodo checkout error:", data);
      const msg = data.message || data.code || "";
      if (res.status === 401) {
        return NextResponse.json({ error: "Payment system configuration error. Please contact support." }, { status: 401 });
      }
      if (msg.includes("not live") || msg.includes("MERCHANT_NOT_LIVE")) {
        return NextResponse.json({ error: "Payments are being set up. Please try again later." }, { status: 503 });
      }
      return NextResponse.json({ error: "Checkout failed. Please try again later." }, { status: res.status });
    }

    // Redirect to checkout URL
    const checkoutUrl = data.payment_link;
    if (checkoutUrl) {
      return NextResponse.redirect(checkoutUrl);
    }

    return NextResponse.json({ error: "No checkout URL returned" }, { status: 500 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
