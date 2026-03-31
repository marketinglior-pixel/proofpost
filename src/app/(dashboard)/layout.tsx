import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { PostHogIdentify } from "@/components/posthog-identify";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();
  const plan = (profile as { plan: string } | null)?.plan || "free";

  return (
    <div className="flex h-screen overflow-hidden bg-snow">
      <PostHogIdentify userId={user.id} email={user.email} />
      <Sidebar plan={plan} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto max-w-5xl px-4 pt-14 pb-8 md:px-8 md:py-10 min-h-full">{children}</div>
      </main>
    </div>
  );
}
