import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  LISTING_PAGE_PATH,
  SIGN_IN_PAGE_PATH,
  SIGN_UP_PAGE_PATH,
} from "./shared/router/router-paths";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If authenticated but trying to access auth pages, redirect to dashboard
  const authPaths = [SIGN_IN_PAGE_PATH, SIGN_UP_PAGE_PATH];

  const isAuthPath = authPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Public routes that don't require authentication
  const publicPaths = [
    "/",
    SIGN_IN_PAGE_PATH,
    SIGN_UP_PAGE_PATH,
    LISTING_PAGE_PATH,
  ];
  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // If it's a public path, just continue
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Redirect to signin if not authenticated
  if (!token) {
    return NextResponse.redirect(new URL(SIGN_IN_PAGE_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api/ routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
