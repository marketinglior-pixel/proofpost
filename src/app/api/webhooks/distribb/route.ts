import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Verify Bearer token
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    const secret = process.env.DISTRIBB_WEBHOOK_SECRET;

    console.log("Distribb webhook auth header:", authHeader ? `${authHeader.substring(0, 20)}...` : "(empty)");

    if (!secret) {
      console.error("DISTRIBB_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
    }

    if (!token || token !== secret) {
      console.error("Distribb webhook auth mismatch. Token length:", token.length, "Secret length:", secret.length);
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = await request.json();
    console.log("Distribb webhook payload keys:", Object.keys(payload));

    const title = payload.title || payload.name || "";
    const rawSlug = payload.slug || payload.url_slug || "";
    const slug = rawSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const content_html = payload.content_html || payload.content || payload.body || payload.html || "";
    const content_markdown = payload.content_markdown || payload.markdown || null;
    const meta_description = payload.meta_description || payload.description || payload.excerpt || null;
    const image_url = payload.image_url || payload.featured_image || payload.cover_image || null;
    const image_alt = payload.alt_text || payload.image_alt || null;
    const tags = payload.tags || payload.categories || [];
    const author = payload.author || "ProofPost";
    const status = payload.status || "draft";

    if (!title || !content_html) {
      console.error("Distribb webhook missing fields. Payload:", JSON.stringify(payload).substring(0, 500));
      return NextResponse.json(
        { error: "Missing required fields: title and content_html (or content/body/html)" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("blog_posts").upsert(
      {
        title,
        slug,
        content_html,
        content_markdown,
        meta_description,
        image_url,
        image_alt,
        tags: Array.isArray(tags) ? tags : [],
        author,
        status,
        published_at:
          status === "published" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (error) {
      console.error("Distribb webhook DB error:", error);
      return NextResponse.json(
        { error: "Failed to save article" },
        { status: 500 }
      );
    }

    console.log("Distribb article received:", slug);
    return NextResponse.json({ received: true, slug });
  } catch (error) {
    console.error("Distribb webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
