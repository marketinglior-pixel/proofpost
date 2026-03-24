import { NextRequest, NextResponse } from "next/server";

const DODO_API_BASE = process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode"
  ? "https://live.dodopayments.com"
  : "https://test.dodopayments.com";

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");
  const email = request.nextUrl.searchParams.get("email");

  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
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
        return_url: process.env.DODO_PAYMENTS_RETURN_URL || "https://proofpost-alpha.vercel.app/dashboard",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Dodo checkout error:", data);
      return NextResponse.json(
        { error: data.message || data.error || "Checkout failed" },
        { status: res.status }
      );
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
