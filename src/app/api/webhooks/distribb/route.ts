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
    const token = authHeader.replace("Bearer ", "");
    const secret = process.env.DISTRIBB_WEBHOOK_SECRET;

    if (!secret) {
      console.error("DISTRIBB_WEBHOOK_SECRET is not configured");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
    }

    if (token !== secret) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = await request.json();

    const {
      title,
      slug,
      content_html,
      content_markdown,
      meta_description,
      image_url,
      alt_text,
      tags,
      author,
      status,
    } = payload;

    if (!title || !slug || !content_html) {
      return NextResponse.json(
        { error: "Missing required fields: title, slug, content_html" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("blog_posts").upsert(
      {
        title,
        slug,
        content_html,
        content_markdown: content_markdown || null,
        meta_description: meta_description || null,
        image_url: image_url || null,
        image_alt: alt_text || null,
        tags: tags || [],
        author: author || "ProofPost",
        status: status || "draft",
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
