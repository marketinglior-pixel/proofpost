import { NextRequest, NextResponse } from "next/server";
import mql from "@microlink/mql";
import OpenAI from "openai";
import { rateLimit } from "@/lib/rate-limit";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface ExtractedPost {
  reviewerName: string;
  reviewerTitle: string;
  reviewerCompany: string;
  reviewerPhotoUrl: string | null;
  reviewText: string;
  sourceUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid URL" },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (!rateLimit(`extract:${ip}`, { maxRequests: 20, windowMs: 60_000 }).success) {
      return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
    }

    // Step 1: Use Microlink to extract metadata + screenshot
    let metadata: {
      title?: string;
      description?: string;
      author?: string;
      publisher?: string;
      image?: string;
      screenshot?: string;
    } = {};

    try {
      const { data } = await mql(url, {
        screenshot: true,
        meta: true,
      });

      metadata = {
        title: data.title ?? undefined,
        description: data.description ?? undefined,
        author: data.author ?? undefined,
        publisher: data.publisher ?? undefined,
        image: data.image?.url ?? undefined,
        screenshot: data.screenshot?.url ?? undefined,
      };
    } catch {
      console.log("Microlink extraction failed, falling back to AI-only");
    }

    // Step 2: Use AI to extract structured data from whatever we have
    const contextParts: string[] = [];
    if (metadata.title) contextParts.push(`Page title: "${metadata.title}"`);
    if (metadata.description)
      contextParts.push(`Description: "${metadata.description}"`);
    if (metadata.author) contextParts.push(`Author: "${metadata.author}"`);
    if (metadata.publisher)
      contextParts.push(`Publisher: "${metadata.publisher}"`);

    const context =
      contextParts.length > 0
        ? contextParts.join("\n")
        : `URL: ${url} (no metadata available)`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      max_tokens: 500,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You extract information from social media posts (LinkedIn, X/Twitter, Facebook, G2 reviews).
Given metadata from a URL, extract:
- reviewerName: The person's full name who wrote the review/post
- reviewerTitle: Their job title/role (e.g. "VP Sales")
- reviewerCompany: The company they work at
- reviewText: The actual review/testimonial text (the main content, cleaned up)

If information is not available, use reasonable defaults:
- reviewerName: "Customer" if unknown
- reviewerTitle: "" if unknown
- reviewerCompany: use the publisher if available
- reviewText: use the description/title content

Return valid JSON: { "reviewerName": "...", "reviewerTitle": "...", "reviewerCompany": "...", "reviewText": "..." }`,
        },
        {
          role: "user",
          content: `Extract the reviewer information from this social media post:\n\n${context}`,
        },
      ],
    });

    const aiContent = response.choices[0]?.message?.content;
    if (!aiContent) {
      throw new Error("AI extraction returned no content");
    }

    const extracted = JSON.parse(aiContent);

    const result: ExtractedPost = {
      reviewerName: extracted.reviewerName || "Customer",
      reviewerTitle: extracted.reviewerTitle || "",
      reviewerCompany: extracted.reviewerCompany || "",
      reviewerPhotoUrl: metadata.image || null,
      reviewText: extracted.reviewText || metadata.description || "",
      sourceUrl: url,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Extract error:", error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to extract post: ${errMsg}` },
      { status: 500 }
    );
  }
}
