import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // First, refresh the session
  const response = await updateSession(request);

  // Check auth for protected routes
  const { pathname } = request.nextUrl;
  const protectedPrefixes = [
    "/dashboard",
    "/generate",
    "/forms",
    "/wall-of-love",
    "/case-studies",
    "/history",
    "/analytics",
    "/brand-kit",
    "/billing",
    "/onboarding",
    "/widgets",
    "/trust-card",
  ];
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  const isAuthPage = pathname.startsWith("/login");

  if (isProtected || isAuthPage) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Redirect unauthenticated users away from dashboard
    if (isProtected && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Redirect authenticated users away from login → Trust Card
    if (isAuthPage && user) {
      const url = request.nextUrl.clone();
      url.pathname = "/trust-card";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
