import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { importFromG2 } from "@/lib/importers/g2-importer";
import { importFromGoogle } from "@/lib/importers/google-importer";
import { processImportedReviews } from "@/lib/importers/process-import";
import { rateLimit } from "@/lib/rate-limit";

const VALID_PLATFORMS = ["g2", "google"] as const;
type Platform = (typeof VALID_PLATFORMS)[number];

const URL_PATTERNS: Record<Platform, RegExp> = {
  g2: /^https?:\/\/(www\.)?g2\.com\//,
  google: /^https?:\/\/(www\.)?(google\.com\/maps|maps\.google|search\.google)/,
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      !rateLimit(`import:${user.id}`, { maxRequests: 5, windowMs: 60_000 })
        .success
    ) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { platform, url, csv, autoGenerate, markVerified } = body as {
      platform: string;
      url?: string;
      csv?: string;
      autoGenerate?: boolean;
      markVerified?: boolean;
    };

    if (!VALID_PLATFORMS.includes(platform as Platform)) {
      return NextResponse.json(
        { error: `Invalid platform. Supported: ${VALID_PLATFORMS.join(", ")}` },
        { status: 400 }
      );
    }

    if (!url && !csv) {
      return NextResponse.json(
        { error: "Provide either a URL or CSV data" },
        { status: 400 }
      );
    }

    // Validate URL if provided
    if (url) {
      const pattern = URL_PATTERNS[platform as Platform];
      if (!pattern.test(url)) {
        return NextResponse.json(
          {
            error: `Invalid ${platform} URL. Please provide a valid ${platform} review page URL.`,
          },
          { status: 400 }
        );
      }
    }

    // Import reviews based on platform
    const inputType = csv ? "csv" : "url";
    const input = csv || url!;

    let reviews;
    if (platform === "g2") {
      reviews = await importFromG2(input, inputType);
    } else {
      reviews = await importFromGoogle(input, inputType);
    }

    if (reviews.length === 0) {
      return NextResponse.json(
        { error: "No reviews found. Check your input and try again." },
        { status: 400 }
      );
    }

    // Save to database
    const saved = await processImportedReviews(user.id, platform, reviews, {
      autoGenerate: autoGenerate ?? false,
      sourceUrl: url,
      markVerified: markVerified ?? true,
    });

    return NextResponse.json({
      imported: saved.length,
      reviews: saved,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Import error:", errMsg, error);
    return NextResponse.json(
      { error: `Import failed: ${errMsg}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("imported_reviews")
      .select("*")
      .eq("user_id", user.id)
      .order("imported_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch imports" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reviews: data });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Fetch imports error:", errMsg);
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
