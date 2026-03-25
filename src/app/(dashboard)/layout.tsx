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
    <>
      <PostHogIdentify userId={user.id} email={user.email} />
      {/* Mobile layout: no flex, main is full-width block */}
      <div className="md:hidden h-screen bg-snow">
        <Sidebar />
        <main className="w-full overflow-y-auto overflow-x-hidden">
          <div className="px-4 pt-14 pb-8 min-h-full">{children}</div>
        </main>
      </div>
      {/* Desktop layout: flex with sidebar */}
      <div className="hidden md:flex h-screen overflow-hidden bg-snow">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
          <div className="max-w-5xl mx-auto px-8 py-10 min-h-full">{children}</div>
        </main>
      </div>
    </>
  );
}
