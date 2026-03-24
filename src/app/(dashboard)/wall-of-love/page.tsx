import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Heart, ExternalLink, Code2, Copy } from "lucide-react";
import Link from "next/link";

interface LlmOutput {
  hookLine: string;
  slides: { body: string }[];
  reviewer: { name: string; title: string; company: string };
  reviewerPhotoUrl?: string | null;
}

export default async function WallOfLovePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: contents } = await supabase
    .from("generated_content")
    .select("id, llm_output, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const reviews = (contents || []).map((c) => {
    const llm = c.llm_output as unknown as LlmOutput;
    return {
      id: c.id,
      hookLine: llm?.hookLine || "",
      quote: llm?.slides?.[1]?.body || llm?.hookLine || "",
      reviewer: llm?.reviewer || { name: "Customer", title: "", company: "" },
      photoUrl: llm?.reviewerPhotoUrl || null,
    };
  });

  const wallUrl = `/wall/${user.id}`;
  const embedCode = `<iframe src="${process.env.NEXT_PUBLIC_APP_URL || "https://proofpst.com"}/wall/${user.id}" width="100%" height="600" frameborder="0" style="border:none;"></iframe>`;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-400" />
            Wall of Love
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            A public page showcasing all your testimonials. Share it or embed it.
          </p>
        </div>
        <a
          href={wallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald hover:bg-emerald-dark text-white text-sm font-medium rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Public Wall
        </a>
      </div>

      {/* Share & Embed */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <ExternalLink className="w-4 h-4 text-slate-400" />
            Public URL
          </div>
          <code className="block text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 font-mono break-all">
            {process.env.NEXT_PUBLIC_APP_URL || "https://proofpst.com"}{wallUrl}
          </code>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Code2 className="w-4 h-4 text-slate-400" />
            Embed Code
          </div>
          <code className="block text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 font-mono break-all">
            {embedCode}
          </code>
        </div>
      </div>

      {/* Preview */}
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Preview ({reviews.length} testimonials)
      </h2>

      {reviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-700 mb-1">No testimonials yet</h3>
          <p className="text-sm text-slate-500 mb-4">
            Generate some carousels first, and they will appear here.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald hover:bg-emerald-dark text-white text-sm font-medium rounded-lg transition-colors"
          >
            Generate a Carousel
          </Link>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 gap-4 space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="break-inside-avoid rounded-xl border border-slate-200 bg-white p-5 space-y-3"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-[11px] text-amber-400">★</span>
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed italic">
                &ldquo;{r.quote}&rdquo;
              </p>
              <p className="text-xs font-semibold text-emerald">
                {r.hookLine}
              </p>
              <div className="flex items-center gap-2 pt-1">
                {r.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.photoUrl} alt="" width={28} height={28} className="rounded-full object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {r.reviewer.name?.charAt(0) || "?"}
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold text-slate-900">{r.reviewer.name}</p>
                  <p className="text-[10px] text-slate-400">
                    {r.reviewer.title}{r.reviewer.company ? `, ${r.reviewer.company}` : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
