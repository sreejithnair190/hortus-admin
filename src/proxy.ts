import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Check for the HttpOnly refresh token cookie on the server
  const hasRefreshToken = request.cookies.has("refreshToken");

  const isAuthRoute = request.nextUrl.pathname.startsWith("/sign-in");
  const isProtectedRoute = !isAuthRoute; // Update this logic if you have specific public routes

  // If trying to access sign-in page but already has a session -> redirect to Dashboard
  if (isAuthRoute && hasRefreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If trying to access a protected route (e.g. Dashboard) without a session -> redirect to Sign In
  if (isProtectedRoute && !hasRefreshToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect all routes except static assets and standard next.js internals
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
