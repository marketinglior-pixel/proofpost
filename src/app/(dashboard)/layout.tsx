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

  return (
    <div className="h-screen bg-snow md:flex md:overflow-hidden">
      <PostHogIdentify userId={user.id} email={user.email} />
      <Sidebar />
      <main className="h-full overflow-y-auto overflow-x-hidden md:flex-1 md:min-w-0">
        <div className="max-w-5xl mx-auto px-4 pt-14 pb-8 md:px-8 md:py-10 min-h-full">{children}</div>
      </main>
    </div>
  );
}
