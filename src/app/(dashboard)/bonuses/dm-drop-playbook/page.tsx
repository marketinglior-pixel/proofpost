import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopyButton } from "../copy-button";

const coldDM = `Hey [Name], I came across your [post/content/profile] and really liked [specific thing you noticed].

I do [what you do] for [type of client]. If you're ever looking for help with [their pain point], I'd love to chat.

Here's a page with results from clients I've worked with: [Trust Card URL]

No pressure. Just thought it might be relevant!`;

const warmReply = `Thanks! Really appreciate that.

If you're curious about the kind of work I do, here's a quick look at what my clients have said: [Trust Card URL]

Happy to chat more if any of that resonates.`;

const showMeResults = `Great question. Here you go: [Trust Card URL]

All verified reviews from real clients. Should give you a solid picture of what working together looks like.

Let me know if you have any questions after checking it out!`;

const proposalFollowUp = `Hey [Name], really enjoyed our call today. Wanted to follow up while it's fresh.

I put together a quick overview of the kind of results I've delivered for clients in a similar situation: [Trust Card URL]

Take a look when you get a chance. I think [specific result from Trust Card] is especially relevant to what we discussed about [their specific challenge].

Looking forward to hearing your thoughts!`;

const scripts = [
  {
    label: "SCRIPT 1",
    title: "Cold DM",
    subtitle: "Someone you've never spoken to before",
    content: coldDM,
    when: "When you find a potential client through hashtags, comments, or explore. Always lead with something specific about them, not about you.",
    doNot: "Don't open with your Trust Card link. Build a tiny bit of context first. The link comes at the end, almost as an afterthought.",
  },
  {
    label: "SCRIPT 2",
    title: "Warm Reply",
    subtitle: "Someone who engaged with your content",
    content: warmReply,
    when: "When someone comments on your post, replies to your story, or DMs you about something you shared. They already showed interest.",
    doNot: "Don't over-explain. They engaged with you for a reason. Keep it short. The Trust Card does the heavy lifting.",
  },
  {
    label: "SCRIPT 3",
    title: "\"Show Me Results\" Response",
    subtitle: "When a prospect asks for proof",
    content: showMeResults,
    when: "This is the moment your Trust Card was built for. A prospect asks \"who have you worked with?\" or \"can you show me examples?\" and you have one link ready.",
    doNot: "Don't send 5 screenshots and a Google Doc. One link. Clean. Professional. Let the Trust Card close for you.",
  },
  {
    label: "SCRIPT 4",
    title: "Proposal Follow-Up",
    subtitle: "After a discovery call, while you're top of mind",
    content: proposalFollowUp,
    when: "Within 2 hours of a discovery call. Speed matters. Reference something specific from the conversation to show you were listening.",
    doNot: "Don't just send the link with no context. Connect a specific result on your Trust Card to their specific challenge.",
  },
];

export default async function DMDropPlaybookPage() {
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
            DM Drop Playbook
          </h1>
          <p className="text-[15px] text-slate-500 max-w-lg">
            4 scripts for sharing your Trust Card naturally in any DM
            conversation. Replace [brackets] with your details.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-emerald/20 bg-emerald/5 p-5 mb-8">
          <p className="text-[13px] text-slate-700 leading-relaxed">
            <strong>The rule:</strong> Never lead with your Trust Card link.
            Build context first, drop the link second. The link should feel
            like a natural next step, not a sales pitch. Think "here's more
            info if you're curious" not "look at how great I am."
          </p>
        </div>

        <div className="space-y-6">
          {scripts.map((s) => (
            <div
              key={s.title}
              className="rounded-xl bg-white border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-emerald bg-emerald/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    {s.label}
                  </span>
                  <div>
                    <span className="text-[14px] font-semibold text-slate-900">
                      {s.title}
                    </span>
                    <span className="text-[12px] text-slate-400 ml-2">
                      {s.subtitle}
                    </span>
                  </div>
                </div>
                <CopyButton text={s.content} />
              </div>
              <pre className="px-5 py-4 text-[13px] text-slate-700 leading-relaxed whitespace-pre-wrap font-sans">
                {s.content}
              </pre>
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/30 space-y-2">
                <p className="text-[12px] text-slate-500">
                  <strong className="text-slate-600">When to use:</strong>{" "}
                  {s.when}
                </p>
                <p className="text-[12px] text-slate-500">
                  <strong className="text-slate-600">Watch out:</strong>{" "}
                  {s.doNot}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
