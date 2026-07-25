import { NextRequest, NextResponse } from "next/server";

/**
 * Admin Route Guard Middleware
 * Protects /admin/dashboard routes.
 * Checks for session cookies set by Supabase auth.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/dashboard")) {
    const cookies = request.cookies.getAll();
    const hasAuthCookie = cookies.some(
      (c) =>
        c.name === "sb-admin-session" ||
        (c.name.startsWith("sb-") && c.name.endsWith("-auth-token") && c.value.length > 5)
    );

    if (!hasAuthCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
