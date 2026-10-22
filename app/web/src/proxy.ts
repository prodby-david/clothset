import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userToken =
    request.cookies.get("clothset_token")?.value ||
    request.cookies.get("clothset_refresh_token")?.value;
  const adminToken = request.cookies.get("clothset_admin_token")?.value;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      if (adminToken) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/closets")) {
    if (!userToken) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }

  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (userToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/closets/:path*",
    "/admin/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
