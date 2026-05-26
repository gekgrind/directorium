import { NextResponse, type NextRequest } from "next/server";
import {
  buildCentralLoginUrl,
  fetchSharedAuthUser,
  parseSharedSupabaseAccessToken,
  SHARED_AUTH_COOKIE_NAME,
} from "@/lib/auth/shared-session";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function proxy(request: NextRequest) {
  const accessToken = parseSharedSupabaseAccessToken(
    request.cookies.get(SHARED_AUTH_COOKIE_NAME)?.value,
  );

  if (accessToken && SUPABASE_URL && SUPABASE_ANON_KEY) {
    const user = await fetchSharedAuthUser({
      accessToken,
      supabaseUrl: SUPABASE_URL,
      anonKey: SUPABASE_ANON_KEY,
    });

    if (user) {
      return NextResponse.next();
    }
  }

  // Build the callback URL from the declared public origin so the Entrepreneuria
  // login page always receives the trusted HTTPS URL regardless of whether the
  // deployment's reverse proxy forwards x-forwarded-proto correctly.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const callbackUrl = appUrl
    ? new URL(request.nextUrl.pathname + request.nextUrl.search, appUrl).toString()
    : request.nextUrl.toString();
  return NextResponse.redirect(buildCentralLoginUrl(callbackUrl));
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
