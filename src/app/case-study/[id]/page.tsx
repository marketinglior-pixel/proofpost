import { createClient } from "@supabase/supabase-js";
import { Star, Quote, TrendingUp } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface PageProps {
  params: Promise<{ id: string }>;
}

interface CaseStudyBody {
  title: string;
  summary: string;
  challenge: { heading: string; body: string };
  solution: { heading: string; body: string };
  results: { heading: string; body: string; metrics: Array<{ value: string; label: string }> };
  quote: { text: string; attribution: string };
}

export default async function PublicCaseStudyPage({ params }: PageProps) {
  const { id } = await params;

  const { data: caseStudy } = await supabase
    .from("case_studies")
    .select("*, user_id")
    .eq("id", id)
    .single();

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Case study not found.</p>
      </div>
    );
  }

  const body = caseStudy.body as unknown as CaseStudyBody;
  const userId = caseStudy.user_id as string;

  // Get brand kit
  const { data: brandKit } = await supabase
    .from("brand_kits")
    .select("company_name, logo_url, primary_color, secondary_color")
    .eq("user_id", userId)
    .limit(1)
    .single();

  const accentColor = brandKit?.primary_color || "#10B981";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-slate-200" style={{ backgroundColor: `${accentColor}08` }}>
        <div className="max-w-3xl mx-auto px-6 py-12 text-center">
          {brandKit?.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brandKit.logo_url}
              alt={brandKit.company_name || ""}
              className="h-8 mx-auto mb-6 object-contain"
            />
          ) : brandKit?.company_name ? (
            <p className="text-sm font-bold mb-6" style={{ color: accentColor }}>
              {brandKit.company_name}
            </p>
          ) : null}
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            Case Study
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            {body.title}
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            {body.summary}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        {/* Challenge */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: accentColor }}>
              1
            </span>
            {body.challenge.heading}
          </h2>
          <p className="text-slate-600 leading-relaxed pl-10">
            {body.challenge.body}
          </p>
        </section>

        {/* Solution */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: accentColor }}>
              2
            </span>
            {body.solution.heading}
          </h2>
          <p className="text-slate-600 leading-relaxed pl-10">
            {body.solution.body}
          </p>
        </section>

        {/* Results */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: accentColor }}>
              3
            </span>
            {body.results.heading}
          </h2>
          <p className="text-slate-600 leading-relaxed pl-10 mb-6">
            {body.results.body}
          </p>

          {/* Metrics */}
          {body.results.metrics && body.results.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pl-10">
              {body.results.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 p-4 text-center"
                  style={{ borderColor: `${accentColor}30` }}
                >
                  <p className="text-2xl font-bold" style={{ color: accentColor }}>
                    {m.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quote */}
        <section className="rounded-2xl p-8" style={{ backgroundColor: `${accentColor}08`, borderLeft: `4px solid ${accentColor}` }}>
          <Quote className="w-8 h-8 mb-3" style={{ color: `${accentColor}40` }} />
          <p className="text-lg font-medium text-slate-800 italic leading-relaxed">
            &ldquo;{body.quote.text}&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold" style={{ color: accentColor }}>
            — {body.quote.attribution}
          </p>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 py-6 text-center">
        <a
          href="https://proofpst.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-slate-400 transition-colors"
        >
          <Star className="w-3 h-3" />
          Generated with ProofPost
        </a>
      </div>
    </div>
  );
}
