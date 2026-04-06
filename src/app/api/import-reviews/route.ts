import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { importFromG2 } from "@/lib/importers/g2-importer";
import { importFromGoogle } from "@/lib/importers/google-importer";
import { importFromAmazon } from "@/lib/importers/amazon-importer";
import { importFromEtsy } from "@/lib/importers/etsy-importer";
import { processImportedReviews } from "@/lib/importers/process-import";
import { rateLimit } from "@/lib/rate-limit";
import { getEffectivePlan, getPlanLimits, type Plan } from "@/lib/plans";

const VALID_PLATFORMS = ["g2", "google", "amazon", "etsy"] as const;
type Platform = (typeof VALID_PLATFORMS)[number];

const URL_PATTERNS: Record<Platform, RegExp> = {
  g2: /^https?:\/\/(www\.)?g2\.com\//,
  google: /^https?:\/\/(www\.)?(google\.com\/maps|maps\.google|search\.google)/,
  amazon: /^https?:\/\/(www\.)?amazon\.(com|co\.uk|ca|de|fr|it|es|co\.jp|com\.au)/,
  etsy: /^https?:\/\/(www\.)?etsy\.com\//,
};

// Platforms that require a paid plan (Pro or Business)
const PRO_ONLY_PLATFORMS: Platform[] = ["amazon", "etsy"];

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
    const { platform, url, csv, text, autoGenerate, markVerified } = body as {
      platform: string;
      url?: string;
      csv?: string;
      text?: string;
      autoGenerate?: boolean;
      markVerified?: boolean;
    };

    if (!VALID_PLATFORMS.includes(platform as Platform)) {
      return NextResponse.json(
        { error: `Invalid platform. Supported: ${VALID_PLATFORMS.join(", ")}` },
        { status: 400 }
      );
    }

    // Check plan for Pro-only platforms (Amazon, Etsy)
    if (PRO_ONLY_PLATFORMS.includes(platform as Platform)) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan, trial_ends_at")
        .eq("id", user.id)
        .single();

      const rawPlan = ((profile as { plan: string } | null)?.plan || "free") as Plan;
      const trialEndsAt = (profile as { trial_ends_at: string | null } | null)?.trial_ends_at ?? null;
      const effectivePlan = getEffectivePlan(rawPlan, trialEndsAt);
      const limits = getPlanLimits(effectivePlan);

      if (!limits.hasAmazonEtsyImport) {
        return NextResponse.json(
          { error: `${platform.charAt(0).toUpperCase() + platform.slice(1)} import is available on Pro and Business plans. Upgrade to access this feature.` },
          { status: 403 }
        );
      }
    }

    if (!url && !csv && !text) {
      return NextResponse.json(
        { error: "Provide a URL, CSV data, or pasted review text" },
        { status: 400 }
      );
    }

    // Validate URL if provided (skip validation for pasted text)
    if (url && !text) {
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

    // Import reviews based on platform and input type
    const inputType = csv ? "csv" : "url";
    const input = text || csv || url!;

    let reviews;
    switch (platform) {
      case "g2":
        reviews = await importFromG2(input, inputType);
        break;
      case "google":
        reviews = await importFromGoogle(input, text ? "url" : inputType);
        break;
      case "amazon":
        reviews = await importFromAmazon(input, inputType);
        break;
      case "etsy":
        reviews = await importFromEtsy(input, inputType);
        break;
      default:
        return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
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
