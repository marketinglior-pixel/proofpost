import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { rateLimit } from "@/lib/rate-limit";

interface CategoryResult {
  score: number;
  maxScore: number;
  found: boolean;
  details: string[];
}

interface ScanResult {
  url: string;
  score: number;
  label: string;
  categories: {
    schemaMarkup: CategoryResult;
    testimonials: CategoryResult;
    trustBadges: CategoryResult;
    starRatings: CategoryResult;
    reviewWidgets: CategoryResult;
    socialProofNumbers: CategoryResult;
    videoTestimonials: CategoryResult;
  };
  recommendations: string[];
}

interface ScanError {
  url: string;
  error: string;
  errorMessage: string;
  score: null;
  label: null;
  categories: null;
  recommendations: null;
}

function getScoreLabel(score: number): string {
  if (score <= 20) return "Critical";
  if (score <= 40) return "Weak";
  if (score <= 60) return "Average";
  if (score <= 80) return "Good";
  return "Excellent";
}

// --- Detection functions ---

function detectSchemaMarkup($: cheerio.CheerioAPI): CategoryResult {
  const details: string[] = [];
  let score = 0;

  // Check JSON-LD blocks
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const text = $(el).text();
      const data = JSON.parse(text);
      const items = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];

      for (const item of items) {
        const type = item["@type"] || "";
        if (/Review|AggregateRating/i.test(type)) {
          score = 20;
          details.push(`Found schema.org ${type} in JSON-LD`);
        } else if (item.aggregateRating || item.review) {
          score = Math.max(score, 15);
          details.push("Found review data in structured data");
        } else if (type) {
          score = Math.max(score, 5);
        }
      }
    } catch {
      // malformed JSON-LD, skip
    }
  });

  // Check microdata
  const microdataReview = $('[itemtype*="schema.org/Review"], [itemtype*="schema.org/AggregateRating"]');
  if (microdataReview.length > 0) {
    score = 20;
    details.push("Found Review/AggregateRating microdata");
  }

  return { score: Math.min(score, 20), maxScore: 20, found: score > 0, details };
}

function detectTestimonials($: cheerio.CheerioAPI): CategoryResult {
  const details: string[] = [];
  let score = 0;

  // Check for blockquotes with attribution
  const blockquotes = $("blockquote");
  if (blockquotes.length > 0) {
    const withCite = blockquotes.filter((_, el) => {
      const parent = $(el).parent();
      return $(el).find("cite, footer, figcaption").length > 0 ||
        parent.find("cite, figcaption").length > 0;
    });
    if (withCite.length > 0) {
      score = 20;
      details.push(`Found ${withCite.length} testimonial blockquote(s) with attribution`);
    } else {
      score = 10;
      details.push(`Found ${blockquotes.length} blockquote(s)`);
    }
  }

  // Check for testimonial-related class/id names
  const testimonialPattern = /testimonial|customer.?(?:review|story|quote|feedback)|what.?(?:our|people|clients|customers).?say/i;
  const testimonialSections = $("[class], [id]").filter((_, el) => {
    const cls = $(el).attr("class") || "";
    const id = $(el).attr("id") || "";
    return testimonialPattern.test(cls) || testimonialPattern.test(id);
  });
  if (testimonialSections.length > 0) {
    score = Math.max(score, 15);
    details.push("Found testimonial section in page structure");
  }

  // Check headings for testimonial keywords
  const headingPattern = /testimonial|what (?:our |people |clients |customers )?say|customer (?:stories|reviews|feedback)|reviews?\b/i;
  $("h1, h2, h3, h4").each((_, el) => {
    const text = $(el).text().trim();
    if (headingPattern.test(text)) {
      score = Math.max(score, 12);
      details.push(`Found heading: "${text.substring(0, 60)}"`);
    }
  });

  return { score: Math.min(score, 25), maxScore: 25, found: score > 0, details };
}

function detectTrustBadges($: cheerio.CheerioAPI): CategoryResult {
  const details: string[] = [];
  let score = 0;

  const bodyText = $("body").text().toLowerCase();
  const trustPhrases = [
    "trusted by",
    "as seen in",
    "featured in",
    "our clients",
    "our partners",
    "companies that trust",
    "brands that trust",
    "used by",
    "loved by",
    "join over",
  ];

  for (const phrase of trustPhrases) {
    if (bodyText.includes(phrase)) {
      score = Math.max(score, 8);
      details.push(`Found "${phrase}" on page`);
      break;
    }
  }

  // Detect logo grids: sections with multiple images
  const logoPattern = /logo|partner|client|trust|badge|brand/i;
  $("section, div").each((_, el) => {
    const cls = $(el).attr("class") || "";
    const id = $(el).attr("id") || "";
    if (logoPattern.test(cls) || logoPattern.test(id)) {
      const imgs = $(el).find("img");
      if (imgs.length >= 3) {
        score = 15;
        details.push(`Found logo/trust section with ${imgs.length} images`);
        return false; // break
      }
    }
  });

  return { score: Math.min(score, 15), maxScore: 15, found: score > 0, details };
}

function detectStarRatings($: cheerio.CheerioAPI): CategoryResult {
  const details: string[] = [];
  let score = 0;

  // Check for star-related class names
  const starElements = $("[class*='star'], [class*='rating'], [class*='stars']");
  if (starElements.length > 0) {
    score = 5;
    details.push("Found star/rating elements in CSS");
  }

  const bodyText = $("body").text();

  // Check for rating patterns like "4.8/5" or "4.8 out of 5"
  const ratingPattern = /\d+\.?\d*\s*(?:\/\s*5|out\s+of\s+5)/i;
  if (ratingPattern.test(bodyText)) {
    score = 10;
    details.push("Found rating score (e.g. X/5) on page");
  }

  // Unicode stars
  if (/[\u2605\u2606\u2B50]/.test(bodyText)) {
    score = Math.max(score, 5);
    details.push("Found star characters on page");
  }

  return { score: Math.min(score, 10), maxScore: 10, found: score > 0, details };
}

function detectReviewWidgets($: cheerio.CheerioAPI): CategoryResult {
  const details: string[] = [];
  let score = 0;

  const widgetProviders: Record<string, RegExp> = {
    "Trustpilot": /trustpilot\.com|trustpilot-widget/i,
    "G2": /g2\.com|g2crowd/i,
    "Capterra": /capterra\.com/i,
    "Yelp": /yelp\.com\/biz/i,
    "Bazaarvoice": /bazaarvoice|bvapi/i,
    "Yotpo": /yotpo\.com|staticw2\.yotpo/i,
    "Judge.me": /judge\.me/i,
    "Stamped": /stamped\.io/i,
    "ProofPost": /proofpst\.com/i,
    "Testimonial.to": /testimonial\.to/i,
  };

  const allSrcs: string[] = [];
  $("script[src], iframe[src], link[href]").each((_, el) => {
    const src = $(el).attr("src") || $(el).attr("href") || "";
    allSrcs.push(src);
  });

  // Also check class attributes for widget markers
  const allClasses = $("[class]").map((_, el) => $(el).attr("class") || "").get().join(" ");

  const srcText = allSrcs.join(" ") + " " + allClasses;

  for (const [name, pattern] of Object.entries(widgetProviders)) {
    if (pattern.test(srcText)) {
      score = 15;
      details.push(`Detected ${name} widget`);
    }
  }

  return { score: Math.min(score, 15), maxScore: 15, found: score > 0, details };
}

function detectSocialProofNumbers($: cheerio.CheerioAPI): CategoryResult {
  const details: string[] = [];
  let score = 0;

  const bodyText = $("body").text();

  // Pattern: "500+ customers", "1,000+ reviews", "10,000 users"
  const countPattern = /[\d,]+\+?\s*(?:reviews?|customers?|clients?|users?|companies|businesses|ratings?|happy|satisfied)/gi;
  const matches = bodyText.match(countPattern);
  if (matches && matches.length > 0) {
    score = matches.length >= 2 ? 10 : 5;
    details.push(`Found social proof number: "${matches[0].trim().substring(0, 40)}"`);
  }

  // Pattern: "rated 4.8/5"
  const ratedPattern = /rated\s+\d+\.?\d*\s*(?:\/\s*5|out\s+of\s+5|stars?)/i;
  if (ratedPattern.test(bodyText)) {
    score = Math.max(score, 7);
    details.push("Found explicit rating claim on page");
  }

  return { score: Math.min(score, 10), maxScore: 10, found: score > 0, details };
}

function detectVideoTestimonials($: cheerio.CheerioAPI): CategoryResult {
  const details: string[] = [];
  let score = 0;

  // Check for video elements or YouTube/Vimeo iframes near testimonial sections
  const testimonialPattern = /testimonial|review|customer|feedback/i;

  $("section, div").each((_, el) => {
    const cls = $(el).attr("class") || "";
    const id = $(el).attr("id") || "";
    if (!testimonialPattern.test(cls) && !testimonialPattern.test(id)) return;

    const hasVideo = $(el).find("video").length > 0;
    const hasYoutube = $(el).find('iframe[src*="youtube"], iframe[src*="vimeo"]').length > 0;

    if (hasVideo || hasYoutube) {
      score = 5;
      details.push("Found video content in testimonial section");
      return false; // break
    }
  });

  // Also check for class names combining video + testimonial
  const videoTestimonialEls = $("[class*='video'][class*='testimonial'], [class*='video'][class*='review']");
  if (videoTestimonialEls.length > 0) {
    score = 5;
    details.push("Found video testimonial elements");
  }

  return { score: Math.min(score, 5), maxScore: 5, found: score > 0, details };
}

// --- Main ---

async function fetchHTML(url: string): Promise<{ html: string | null; error: string | null; errorMessage: string | null }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ProofPostBot/1.0; +https://proofpst.com)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        return { html: null, error: "blocked", errorMessage: "This website blocked our scanner. Try scanning a specific page URL instead." };
      }
      if (res.status === 404) {
        return { html: null, error: "not_found", errorMessage: "Page not found. Check the URL and try again." };
      }
      return { html: null, error: "http_error", errorMessage: `Website returned an error (${res.status}). Try a different URL.` };
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml")) {
      return { html: null, error: "not_html", errorMessage: "This URL doesn't point to a web page. Please enter a website URL." };
    }

    // Read up to 2MB
    const reader = res.body?.getReader();
    if (!reader) {
      return { html: null, error: "fetch_failed", errorMessage: "Could not read the website content." };
    }

    const chunks: Uint8Array[] = [];
    let totalSize = 0;
    const maxSize = 2 * 1024 * 1024;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      totalSize += value.length;
      if (totalSize >= maxSize) break;
    }

    reader.cancel();
    const html = new TextDecoder().decode(Buffer.concat(chunks));
    return { html, error: null, errorMessage: null };
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof DOMException && err.name === "AbortError") {
      return { html: null, error: "timeout", errorMessage: "This website took too long to respond. Try again or use a different URL." };
    }
    return { html: null, error: "fetch_failed", errorMessage: "Could not reach the website. Check the URL and try again." };
  }
}

function buildRecommendations(categories: ScanResult["categories"]): string[] {
  const recs: string[] = [];

  if (categories.schemaMarkup.score < 10) {
    recs.push("Add schema.org Review or AggregateRating markup to get star-rich snippets in Google search results.");
  }
  if (categories.testimonials.score < 12) {
    recs.push("Add a dedicated testimonial section with real customer quotes and names to build visitor trust.");
  }
  if (categories.trustBadges.score < 8) {
    recs.push("Add a 'Trusted by' section with client logos to establish credibility instantly.");
  }
  if (categories.starRatings.score < 5) {
    recs.push("Display star ratings on your website to create instant visual trust signals.");
  }
  if (categories.reviewWidgets.score === 0) {
    recs.push("Embed a live review widget (from G2, Trustpilot, or ProofPost) to show real-time social proof.");
  }
  if (categories.socialProofNumbers.score < 5) {
    recs.push("Add social proof numbers ('500+ customers', '4.8/5 rating') to quantify your credibility.");
  }
  if (categories.videoTestimonials.score === 0) {
    recs.push("Add video testimonials for maximum authenticity and engagement.");
  }

  return recs;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Please provide a URL" }, { status: 400 });
    }

    // Normalize URL
    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Rate limit
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(`scan:${ip}`, { maxRequests: 10, windowMs: 60_000 }).success) {
      return NextResponse.json({ error: "Too many scans. Please wait a minute and try again." }, { status: 429 });
    }

    // Fetch HTML
    const { html, error, errorMessage } = await fetchHTML(url);

    if (!html) {
      return NextResponse.json({
        url,
        error,
        errorMessage,
        score: null,
        label: null,
        categories: null,
        recommendations: null,
      } satisfies ScanError);
    }

    // Parse
    const $ = cheerio.load(html);

    const categories = {
      schemaMarkup: detectSchemaMarkup($),
      testimonials: detectTestimonials($),
      trustBadges: detectTrustBadges($),
      starRatings: detectStarRatings($),
      reviewWidgets: detectReviewWidgets($),
      socialProofNumbers: detectSocialProofNumbers($),
      videoTestimonials: detectVideoTestimonials($),
    };

    const score = Object.values(categories).reduce((sum, c) => sum + c.score, 0);
    const label = getScoreLabel(score);
    const recommendations = buildRecommendations(categories);

    const result: ScanResult = { url, score, label, categories, recommendations };
    return NextResponse.json(result);
  } catch (err) {
    console.error("Scan error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
