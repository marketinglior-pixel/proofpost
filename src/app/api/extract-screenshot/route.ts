import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { extractReviewsFromScreenshot, ExtractionError } from "@/lib/ai/extract-from-screenshot";
import { rateLimit } from "@/lib/rate-limit";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const maxDuration = 30;
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!rateLimit(`extract-screenshot:${user.id}`, { maxRequests: 10, windowMs: 60_000 }).success) {
      return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
    }

    let formData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json({ error: "Failed to read the uploaded file. The image may be too large." }, { status: 400 });
    }

    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Image too large (max 10MB)" }, { status: 400 });
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif", "image/heic", "image/heif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: `Unsupported image format (${file.type || "unknown"}). Use PNG, JPEG, or WebP.` }, { status: 400 });
    }

    // HEIC/HEIF from iOS — treat as JPEG for OpenAI (the binary is re-encoded client-side)
    const mimeType = file.type === "image/heic" || file.type === "image/heif" ? "image/jpeg" : file.type;

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");

    // Extract reviews using GPT-4o Vision
    const result = await extractReviewsFromScreenshot(base64, mimeType);

    if (!result.reviews || result.reviews.length === 0) {
      return NextResponse.json({
        error: "No reviews found in this image. Try a clearer screenshot with visible review text.",
      }, { status: 400 });
    }

    return NextResponse.json({
      reviews: result.reviews,
      sourceDetected: result.sourceDetected || "unknown",
      count: result.reviews.length,
    });
  } catch (error) {
    console.error("Screenshot extraction error:", error);

    if (error instanceof ExtractionError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { error: "Failed to extract reviews from screenshot. Please try again." },
      { status: 500 }
    );
  }
}
