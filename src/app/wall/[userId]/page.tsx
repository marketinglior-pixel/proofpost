import { createClient } from "@supabase/supabase-js";
import { Star } from "lucide-react";
import { VideoTestimonialPlayer } from "./video-player";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{ userId: string }>;
}

interface LlmOutput {
  hookLine: string;
  slides: { body: string }[];
  reviewer: { name: string; title: string; company: string };
  reviewerPhotoUrl?: string | null;
}

interface WallReview {
  id: string;
  hookLine: string;
  quote: string;
  reviewer: { name: string; title: string; company: string };
  photoUrl: string | null;
  videoUrl?: string | null;
  type: "text" | "video";
}

export default async function PublicWallPage({ params }: PageProps) {
  const { userId } = await params;

  const { data: brandKit } = await supabase
    .from("brand_kits")
    .select("company_name, logo_url, primary_color, secondary_color")
    .eq("user_id", userId)
    .limit(1)
    .single();

  const { data: contents } = await supabase
    .from("generated_content")
    .select("id, llm_output")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  // Fetch approved video submissions
  const { data: videoSubmissions } = await supabase
    .from("submissions")
    .select("id, reviewer_name, reviewer_title, reviewer_company, reviewer_photo_url, review_text, video_url, submission_type, rating")
    .eq("user_id", userId)
    .eq("status", "approved")
    .eq("submission_type", "video")
    .not("video_url", "is", null)
    .order("created_at", { ascending: false });

  const reviews: WallReview[] = (contents || []).map((c) => {
    const llm = c.llm_output as unknown as LlmOutput;
    return {
      id: c.id,
      hookLine: llm?.hookLine || "",
      quote: llm?.slides?.[1]?.body || llm?.hookLine || "",
      reviewer: llm?.reviewer || { name: "Customer", title: "", company: "" },
      photoUrl: llm?.reviewerPhotoUrl || null,
      type: "text" as const,
    };
  });

  // Add video submissions
  const videoReviews: WallReview[] = (videoSubmissions || []).map((s) => ({
    id: s.id,
    hookLine: "",
    quote: s.review_text || "Video testimonial",
    reviewer: {
      name: s.reviewer_name,
      title: s.reviewer_title || "",
      company: s.reviewer_company || "",
    },
    photoUrl: s.reviewer_photo_url || null,
    videoUrl: s.video_url,
    type: "video" as const,
  }));

  const allReviews = [...videoReviews, ...reviews];
  const accentColor = brandKit?.primary_color || "#10B981";

  if (allReviews.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">No testimonials to display yet.</p>
      </div>
    );
  }

  // AggregateRating JSON-LD for SEO rich snippets in Google search
  const jsonLd = brandKit?.company_name && allReviews.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: brandKit.company_name,
    ...(brandKit.logo_url ? { image: brandKit.logo_url } : {}),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: String(allReviews.length),
      reviewCount: String(allReviews.length),
    },
    review: allReviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      reviewBody: r.quote,
      author: { "@type": "Person", name: r.reviewer.name },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-slate-50">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          {brandKit?.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brandKit.logo_url}
              alt={brandKit.company_name || ""}
              className="h-10 mx-auto mb-3 object-contain"
            />
          ) : brandKit?.company_name ? (
            <h1 className="text-xl font-bold text-slate-900 mb-3">{brandKit.company_name}</h1>
          ) : null}
          <h2 className="text-2xl font-bold text-slate-900">
            Wall of Love
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            What our customers are saying
          </p>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {allReviews.map((r) => (
            <div
              key={r.id}
              className="break-inside-avoid rounded-xl bg-white border border-slate-200 p-5 space-y-3 shadow-sm"
            >
              {/* Video player for video testimonials */}
              {r.type === "video" && r.videoUrl && (
                <VideoTestimonialPlayer videoUrl={r.videoUrl} accentColor={accentColor} />
              )}

              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-[12px] text-amber-400">&#9733;</span>
                ))}
              </div>
              {r.type === "text" && (
                <p className="text-[14px] text-slate-700 leading-relaxed italic">
                  &ldquo;{r.quote}&rdquo;
                </p>
              )}
              {r.type === "video" && r.quote && r.quote !== "Video testimonial" && (
                <p className="text-[14px] text-slate-700 leading-relaxed italic">
                  &ldquo;{r.quote}&rdquo;
                </p>
              )}
              {r.hookLine && (
                <p className="text-[13px] font-semibold" style={{ color: accentColor }}>
                  {r.hookLine}
                </p>
              )}
              <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100">
                {r.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.photoUrl} alt="" width={32} height={32} className="rounded-full object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-400">
                    {r.reviewer.name?.charAt(0) || "?"}
                  </div>
                )}
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">{r.reviewer.name}</p>
                  <p className="text-[11px] text-slate-400">
                    {r.reviewer.title}{r.reviewer.company ? `, ${r.reviewer.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="py-6 text-center">
        <a
          href="https://proofpst.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-slate-400 transition-colors"
        >
          <Star className="w-3 h-3" />
          Powered by ProofPost
        </a>
      </div>
    </div>
  );
}
