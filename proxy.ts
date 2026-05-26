import { NextResponse, type NextRequest } from "next/server";
import {
  buildCentralLoginUrl,
  parseSharedSupabaseAccessToken,
  SHARED_AUTH_COOKIE_NAME,
} from "@/lib/auth/shared-session";

// Optimistic check: verify the shared auth cookie contains a valid JWT.
// Full session validation happens in server components via getCurrentSharedAuthUser().
// Calling fetchSharedAuthUser here would validate the token against Directorium's
// own Supabase project, which rejects tokens issued by the central auth project.
export function proxy(request: NextRequest) {
  const accessToken = parseSharedSupabaseAccessToken(
    request.cookies.get(SHARED_AUTH_COOKIE_NAME)?.value,
  );

  if (accessToken) {
    return NextResponse.next();
  }

  return NextResponse.redirect(buildCentralLoginUrl(buildCallbackUrl(request)));
}

function buildCallbackUrl(request: NextRequest): string {
  // Prefer the declared public origin to guarantee a trusted HTTPS callback URL.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (appUrl) {
    return new URL(
      request.nextUrl.pathname + request.nextUrl.search,
      appUrl,
    ).toString();
  }

  // When NEXT_PUBLIC_APP_URL is absent, reconstruct HTTPS from x-forwarded-proto
  // set by the upstream TLS-terminating reverse proxy.
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedProto === "https" && request.nextUrl.protocol === "http:") {
    const url = new URL(request.nextUrl.toString());
    url.protocol = "https:";
    return url.toString();
  }

  return request.nextUrl.toString();
}

export const config = {
  matcher: [
    "/",
    "/new-session/:path*",
    "/session/:path*",
    "/history/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/billing/:path*",
  ],
};
