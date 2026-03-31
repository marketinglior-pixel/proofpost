import OpenAI from "openai";
import type { ImportedReview } from "./g2-importer";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Parse Google Reviews data from CSV/pasted text.
 *
 * Expected columns: name, title, company, rating, review, date
 * (Same format as G2 for consistency)
 */
function parseCSV(csv: string): ImportedReview[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().toLowerCase().replace(/^["']|["']$/g, ""));

  const fieldMap: Record<string, string> = {};
  for (const [i, h] of headers.entries()) {
    const idx = String(i);
    if (/name|reviewer|author/.test(h)) fieldMap["name"] = idx;
    else if (/title|role|position/.test(h)) fieldMap["title"] = idx;
    else if (/company|business|org/.test(h)) fieldMap["company"] = idx;
    else if (/rating|score|stars/.test(h)) fieldMap["rating"] = idx;
    else if (/review|text|comment|feedback|content/.test(h))
      fieldMap["review"] = idx;
    else if (/date|time|when/.test(h)) fieldMap["date"] = idx;
  }

  if (!fieldMap["name"] || !fieldMap["review"]) {
    throw new Error(
      'CSV must have at least "name" and "review" columns. Found: ' +
        headers.join(", ")
    );
  }

  const reviews: ImportedReview[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = parseCSVLine(line);

    const name = cols[Number(fieldMap["name"])]?.trim();
    const reviewText = cols[Number(fieldMap["review"])]?.trim();

    if (!name || !reviewText) continue;

    const ratingStr = fieldMap["rating"]
      ? cols[Number(fieldMap["rating"])]?.trim()
      : undefined;
    const rating = ratingStr ? parseFloat(ratingStr) : 5.0;

    reviews.push({
      reviewer_name: name,
      reviewer_title: fieldMap["title"]
        ? cols[Number(fieldMap["title"])]?.trim() || undefined
        : undefined,
      reviewer_company: fieldMap["company"]
        ? cols[Number(fieldMap["company"])]?.trim() || undefined
        : undefined,
      review_text: reviewText,
      rating: isNaN(rating) ? 5.0 : Math.min(5, Math.max(0, rating)),
      review_date: fieldMap["date"]
        ? cols[Number(fieldMap["date"])]?.trim() || undefined
        : undefined,
    });
  }

  return reviews;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"' && (i === 0 || line[i - 1] !== "\\")) {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim().replace(/^["']|["']$/g, ""));
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim().replace(/^["']|["']$/g, ""));
  return result;
}

/**
 * Extract reviews from a Google Maps business page using OpenAI.
 */
async function extractFromURL(url: string): Promise<ImportedReview[]> {
  let html: string;
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(10_000),
    });
    html = await resp.text();
  } catch {
    throw new Error(
      "Could not fetch the Google Reviews page. " +
        "Try exporting your reviews as CSV and uploading instead."
    );
  }

  const trimmed = html.slice(0, 60_000);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    max_tokens: 4000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You extract customer reviews from Google Maps/Business HTML content. Return JSON: { "reviews": [{ "reviewer_name": "...", "reviewer_title": "", "reviewer_company": "", "review_text": "...", "rating": 5.0, "review_date": "..." }] }. If you can't find reviews, return { "reviews": [], "error": "reason" }.`,
      },
      {
        role: "user",
        content: `Extract all customer reviews from this Google page HTML:\n\n${trimmed}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from OpenAI");

  const parsed = JSON.parse(content);
  if (parsed.error && (!parsed.reviews || parsed.reviews.length === 0)) {
    throw new Error(
      `Could not extract reviews: ${parsed.error}. Try CSV upload instead.`
    );
  }

  return (parsed.reviews || []).map(
    (r: Record<string, string | number | undefined>) => ({
      reviewer_name: String(r.reviewer_name || "Unknown"),
      reviewer_title: r.reviewer_title ? String(r.reviewer_title) : undefined,
      reviewer_company: r.reviewer_company
        ? String(r.reviewer_company)
        : undefined,
      review_text: String(r.review_text || ""),
      rating: typeof r.rating === "number" ? r.rating : 5.0,
      review_date: r.review_date ? String(r.review_date) : undefined,
      source_url: url,
    })
  );
}

/**
 * Import reviews from Google Reviews via CSV data or URL.
 */
export async function importFromGoogle(
  input: string,
  type: "url" | "csv"
): Promise<ImportedReview[]> {
  if (type === "csv") {
    return parseCSV(input);
  }
  return extractFromURL(input);
}
