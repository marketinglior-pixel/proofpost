import type { MetadataRoute } from "next";

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

  return [
    {
      url: "https://proofpst.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://proofpst.com/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
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
  ];
}
