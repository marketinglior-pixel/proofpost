import type { MetadataRoute } from "next";

const reviewResponseIndustries = [
  "restaurant",
  "hotel",
  "healthcare",
  "retail",
  "saas",
  "agency",
  "fitness",
  "salon-spa",
  "auto",
  "home-services",
  "dental",
  "real-estate",
  "legal",
  "ecommerce",
  "education",
];

const npsBenchmarkIndustries = [
  "saas",
  "ecommerce",
  "healthcare",
  "financial-services",
  "insurance",
  "retail",
  "hospitality",
  "technology",
  "education",
  "consulting",
  "telecom",
  "airlines",
  "automotive",
  "real-estate",
  "logistics",
];

const testimonialIndustries = [
  "saas",
  "ecommerce",
  "healthcare",
  "real-estate",
  "fitness",
  "restaurant",
  "agency",
  "education",
  "consulting",
  "professional-services",
  "financial-services",
  "insurance",
  "retail",
  "hospitality",
  "technology",
  "automotive",
  "legal",
  "construction",
  "nonprofit",
  "manufacturing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const industryPages: MetadataRoute.Sitemap = testimonialIndustries.map(
    (slug) => ({
      url: `https://proofpst.com/tools/testimonial-examples/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  const npsBenchmarkPages: MetadataRoute.Sitemap = npsBenchmarkIndustries.map(
    (slug) => ({
      url: `https://proofpst.com/blog/nps-benchmarks/${slug}`,
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [
    {
      url: "https://proofpst.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://proofpst.com/what-is-a-trust-card",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://proofpst.com/proof-card",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://proofpst.com/free-trust-page",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://proofpst.com/free-landing-page",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://proofpst.com/free-digital-business-card",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://proofpst.com/tools",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://proofpst.com/tools/short-testimonial-generator",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/tools/nps-calculator",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/tools/testimonial-examples",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/tools/google-review-link",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/tools/review-response-examples",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/tools/csat-calculator",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/tools/testimonial-request-email",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/tools/testimonial-form-templates",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/tools/star-rating-calculator",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://proofpst.com/blog/social-proof-statistics",
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://proofpst.com/blog/how-to-ask-for-testimonials",
      lastModified: new Date("2026-03-26"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/blog/good-nps-score",
      lastModified: new Date("2026-03-26"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://proofpst.com/blog/respond-to-google-reviews",
      lastModified: new Date("2026-03-26"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...industryPages,
    {
      url: "https://proofpst.com/blog/nps-benchmarks",
      lastModified: new Date("2026-03-27"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...npsBenchmarkPages,
    ...reviewResponseIndustries.map((slug) => ({
      url: `https://proofpst.com/tools/review-response-examples/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
