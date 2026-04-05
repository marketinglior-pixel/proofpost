import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopyButton } from "../copy-button";

const emailRecent = `Subject: Quick favor (2 min)

Hey [Name],

Really enjoyed working on [project/deliverable] together. I'm putting together a page with reviews from clients I've worked with, and I'd love to include you.

Would you be open to writing 2-3 sentences about what it was like working together? Totally fine to keep it casual. Whatever comes to mind.

If you're up for it, just reply to this email with your thoughts. That's it.

Thanks!
[Your name]`;

const emailPast = `Subject: Quick question for you

Hey [Name],

Hope things are going well! I was just thinking about the [project/result] we worked on back in [month].

I'm building a page to showcase client results, and I'd love to feature you. Would you be open to sharing a couple sentences about the experience?

No pressure at all. If you're busy, I totally get it. But if you have 2 minutes, it would mean a lot.

[Your name]`;

const emailLongTerm = `Subject: Would you like to be featured?

Hey [Name],

We've been working together for [X months] now, and I'm really proud of what we've built. I'm creating a Trust Card page where I feature my top clients and their results.

Would you be open to being featured? All I'd need is 2-3 sentences about the experience or the results you've seen.

I'll include your name, title, and company (great visibility for you too).

Let me know!
[Your name]`;

const dmInstagram = `Hey [Name]! Quick question. I'm putting together a page where I feature reviews from clients I've worked with. Would you be open to being included?

All I'd need is 2-3 sentences. Whatever comes to mind about the experience or results. Totally casual.

No worries if not!`;

const dmLinkedIn = `Hi [Name], hope you're doing well!

I'm building a professional trust page to showcase client results. Given the great work we did on [project], I'd love to feature your perspective.

Would you be open to sharing a brief testimonial? Just 2-3 sentences about the experience or outcomes. I'll credit you with your name and title.

Let me know if you're interested!`;

const followUp = `Hey [Name], just bumping this in case it got buried. Totally understand if you're swamped. If you have 2 minutes, I'd really appreciate a quick line or two. If not, no worries at all!`;

const templates = [
  {
    label: "EMAIL 1",
    title: "Recent Client (just finished a project)",
    content: emailRecent,
    context: "Send this within a week of finishing a project, while the experience is fresh.",
  },
  {
    label: "EMAIL 2",
    title: "Past Client (3-6 months ago)",
    content: emailPast,
    context: "Use this to reconnect with clients you haven't spoken to in a while. The nostalgia angle works.",
  },
  {
    label: "EMAIL 3",
    title: "Long-Term Client (ongoing relationship)",
    content: emailLongTerm,
    context: "The \"featured client\" reframe. They say yes because being featured benefits them too.",
  },
  {
    label: "DM SCRIPT 1",
    title: "Instagram DM",
    content: dmInstagram,
    context: "Keep it casual. Instagram isn't the place for formal language.",
  },
  {
    label: "DM SCRIPT 2",
    title: "LinkedIn DM",
    content: dmLinkedIn,
    context: "Slightly more professional tone for LinkedIn. Mention the specific project.",
  },
  {
    label: "FOLLOW-UP",
    title: "48-Hour Follow-Up (works for all channels)",
    content: followUp,
    context: "Send this if you don't hear back in 48 hours. One follow-up is enough. Don't chase.",
  },
];

export default async function TestimonialRequestKitPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles").select("plan").eq("id", user!.id).single();
  const plan = (profile as { plan: string } | null)?.plan || "free";
  if (plan !== "pro") redirect("/bonuses");

  return (
    <div className="flex-1 overflow-y-auto bg-snow">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          href="/bonuses"
          className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Bonuses
        </Link>

        <div className="mb-10">
          <span className="text-[11px] font-bold text-emerald uppercase tracking-wider">
            BONUS KIT
          </span>
          <h1 className="text-[24px] font-bold text-slate-900 mt-2 mb-3">
            Testimonial Request Kit
          </h1>
          <p className="text-[15px] text-slate-500 max-w-lg">
            5 ready-to-send templates that get you testimonials without the
            awkwardness. Replace [brackets] with your details, hit send.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-emerald/20 bg-emerald/5 p-5 mb-8">
          <p className="text-[13px] text-slate-700 leading-relaxed">
            <strong>The key insight:</strong> Don't ask for a "review" or
            "testimonial." Ask if they'd like to be <strong>featured</strong>.
            It reframes the ask from "do me a favor" to "here's an opportunity
            for you." Clients say yes because being featured benefits them too.
          </p>
        </div>

        <div className="space-y-6">
          {templates.map((t) => (
            <div
              key={t.title}
              className="rounded-xl bg-white border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-emerald bg-emerald/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    {t.label}
                  </span>
                  <span className="text-[14px] font-semibold text-slate-900">
                    {t.title}
                  </span>
                </div>
                <CopyButton text={t.content} />
              </div>
              <pre className="px-5 py-4 text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                {t.content}
              </pre>
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30">
                <p className="text-[12px] text-slate-400 italic">
                  {t.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
