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

  return NextResponse.redirect(buildCentralLoginUrl(request.nextUrl.toString()));
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
