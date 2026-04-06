import OpenAI from "openai";
import type { ImportedReview } from "./g2-importer";

export type { ImportedReview };

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const AMAZON_URL_PATTERN = /^https?:\/\/(www\.)?amazon\.(com|co\.uk|ca|de|fr|it|es|co\.jp|com\.au)/;

/**
 * Import reviews from Amazon.
 * Supports pasted text (user copies reviews from product page) and URL scraping.
 */
export async function importFromAmazon(
  input: string,
  type: "url" | "csv"
): Promise<ImportedReview[]> {
  if (type === "csv") {
    // Treat CSV as pasted text from Amazon product page
    return extractFromText(input);
  }

  // URL: fetch the page and extract with GPT
  if (AMAZON_URL_PATTERN.test(input)) {
    return extractFromURL(input);
  }

  // Fallback: treat as pasted text
  return extractFromText(input);
}

async function extractFromURL(url: string): Promise<ImportedReview[]> {
  let html: string;
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    html = await resp.text();
  } catch {
    throw new Error(
      "Could not fetch Amazon page. Try copying the reviews and pasting them instead."
    );
  }

  // Trim HTML to avoid token limits
  const trimmed = html.slice(0, 15000);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a review extraction assistant. Extract customer reviews from the given Amazon product page HTML.
Return JSON: { "reviews": [{ "reviewer_name": "...", "rating": 5.0, "review_text": "...", "review_date": "..." }] }
If no reviews are found, return { "reviews": [] }.
Extract the reviewer name, star rating (1-5), review text, and date if available.`,
      },
      {
        role: "user",
        content: `Extract all customer reviews from this Amazon page HTML:\n\n${trimmed}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) return [];

  try {
    const parsed = JSON.parse(content);
    return (parsed.reviews || []).map((r: Record<string, unknown>) => ({
      reviewer_name: String(r.reviewer_name || "Amazon Customer"),
      review_text: String(r.review_text || ""),
      rating: Number(r.rating) || 5.0,
      review_date: r.review_date ? String(r.review_date) : undefined,
      source_url: url,
    })).filter((r: ImportedReview) => r.review_text.length > 0);
  } catch {
    return [];
  }
}

async function extractFromText(text: string): Promise<ImportedReview[]> {
  const trimmed = text.trim().slice(0, 10000);
  if (!trimmed) return [];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a review extraction assistant. Extract individual customer reviews from the pasted text.
The text is copied from an Amazon product page.
Return JSON: { "reviews": [{ "reviewer_name": "...", "rating": 5.0, "review_text": "...", "review_date": "..." }] }
If no reviews are found, return { "reviews": [] }.`,
      },
      {
        role: "user",
        content: `Extract all reviews from this Amazon page text:\n\n${trimmed}`,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) return [];

  try {
    const parsed = JSON.parse(content);
    return (parsed.reviews || []).map((r: Record<string, unknown>) => ({
      reviewer_name: String(r.reviewer_name || "Amazon Customer"),
      review_text: String(r.review_text || ""),
      rating: Number(r.rating) || 5.0,
      review_date: r.review_date ? String(r.review_date) : undefined,
    })).filter((r: ImportedReview) => r.review_text.length > 0);
  } catch {
    return [];
  }
}
