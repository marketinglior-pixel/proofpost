import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const DODO_API_BASE = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
  ? "https://live.dodopayments.com"
  : "https://test.dodopayments.com";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");
  const email = request.nextUrl.searchParams.get("email");

  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  if (!rateLimit(`checkout:${email}`, { maxRequests: 5, windowMs: 60_000 }).success) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }

  try {
    // Create a payment link via Dodo API
    const res = await fetch(`${DODO_API_BASE}/payments`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        billing: { city: "", country: "US", state: "", street: "", zipcode: "" },
        customer: { email: email || "customer@example.com", name: "Customer" },
        payment_link: true,
        product_cart: [{ product_id: productId, quantity: 1 }],
        return_url: process.env.DODO_PAYMENTS_RETURN_URL || "https://proofpst.com/dashboard",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Dodo checkout error:", data);
      const errorCode = data.code || data.error || "";
      let userMessage = "Checkout failed. Please try again later.";
      if (errorCode === "MERCHANT_NOT_LIVE" || (data.message && data.message.includes("not live"))) {
        userMessage = "Payments are being set up. Please try again later.";
      } else if (errorCode === "Unauthorized" || res.status === 401) {
        userMessage = "Payment system configuration error. Please contact support.";
      }
      return NextResponse.json({ error: userMessage }, { status: res.status });
    }

    // Redirect to checkout URL
    const checkoutUrl = data.payment_link || data.checkout_url || data.url;
    if (checkoutUrl) {
      return NextResponse.redirect(checkoutUrl);
    }

    return NextResponse.json({ error: "No checkout URL returned", data }, { status: 500 });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
