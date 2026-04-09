import OpenAI from "openai";
import type { ImportedReview } from "./g2-importer";

let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _openai;
}

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
 * Extract reviews from pasted text using OpenAI.
 * User copies reviews from Google Maps, LinkedIn, Facebook, etc. and pastes as text.
 */
async function extractFromText(text: string, sourceUrl?: string): Promise<ImportedReview[]> {
  const trimmed = text.slice(0, 30_000);

  const response = await getOpenAI().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0,
    max_tokens: 4000,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You extract customer reviews from pasted text. The text may be copied from Google Maps, LinkedIn recommendations, Facebook reviews, WhatsApp messages, emails, or any other source. Parse each individual review and return JSON: { "reviews": [{ "reviewer_name": "...", "reviewer_title": "", "reviewer_company": "", "review_text": "...", "rating": 5.0, "review_date": "..." }] }. If you can't identify distinct reviews, treat the entire text as one review. Always return at least one review if there's meaningful content.`,
      },
      {
        role: "user",
        content: `Extract all reviews from this text:\n\n${trimmed}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error("No response from AI");

  const parsed = JSON.parse(content);
  if (!parsed.reviews || parsed.reviews.length === 0) {
    throw new Error("No reviews found in the provided text. Try pasting the review text directly.");
  }

  return (parsed.reviews || []).map(
    (r: Record<string, string | number | undefined>) => ({
      reviewer_name: String(r.reviewer_name || "Customer"),
      reviewer_title: r.reviewer_title ? String(r.reviewer_title) : undefined,
      reviewer_company: r.reviewer_company ? String(r.reviewer_company) : undefined,
      review_text: String(r.review_text || ""),
      rating: typeof r.rating === "number" ? r.rating : 5.0,
      review_date: r.review_date ? String(r.review_date) : undefined,
      source_url: sourceUrl,
    })
  );
}

/**
 * Import reviews from Google Reviews via CSV data, pasted text, or URL.
 * For URLs: we now ask users to paste the review text instead of scraping.
 * The "url" type now accepts pasted text as well.
 */
export async function importFromGoogle(
  input: string,
  type: "url" | "csv"
): Promise<ImportedReview[]> {
  if (type === "csv") {
    return parseCSV(input);
  }
  // If it looks like a URL, tell user to paste text instead
  if (input.startsWith("http")) {
    throw new Error(
      "Google blocks automated review scraping. Instead, go to your Google Business page, " +
      "select and copy the review text, then paste it here. We'll parse it automatically."
    );
  }
  // Treat as pasted text
  return extractFromText(input);
}
