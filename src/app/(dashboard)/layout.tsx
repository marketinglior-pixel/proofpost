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
    <div className="min-h-screen bg-snow md:flex md:h-screen md:overflow-hidden">
      <PostHogIdentify userId={user.id} email={user.email} />
      <Sidebar />
      <main className="w-full overflow-x-hidden md:flex-1 md:min-w-0 md:overflow-y-auto">
        <div className="px-4 pt-14 pb-8 md:max-w-5xl md:mx-auto md:px-8 md:py-10 min-h-full">{children}</div>
      </main>
    </div>
  );
}
