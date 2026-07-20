import { NextResponse, type NextRequest } from "next/server";
import {
  buildCentralLogoutUrl,
  SHARED_AUTH_COOKIE_DOMAIN,
  SHARED_AUTH_COOKIE_NAME,
  SHARED_AUTH_COOKIE_PATH,
} from "@/lib/auth/shared-session";
import { getSharedAccessTokenFromCookies } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET(request: NextRequest) {
  const currentUrl = new URL(request.url);
  const nextUrl = new URL("/", currentUrl.origin);
  const accessToken = await getSharedAccessTokenFromCookies();

  if (accessToken && SUPABASE_URL && SUPABASE_ANON_KEY) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }).catch(() => null);
  }

  const response = NextResponse.redirect(buildCentralLogoutUrl(nextUrl.toString()));
  const expiredCookieOptions = {
    domain: SHARED_AUTH_COOKIE_DOMAIN,
    path: SHARED_AUTH_COOKIE_PATH,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    expires: new Date(0),
  };

  response.cookies.set(SHARED_AUTH_COOKIE_NAME, "", expiredCookieOptions);

  // Large sessions are chunked into `<name>.0`, `<name>.1`, ... cookies by
  // @supabase/ssr, so clear those as well.
  for (const { name } of request.cookies.getAll()) {
    if (name.startsWith(`${SHARED_AUTH_COOKIE_NAME}.`)) {
      response.cookies.set(name, "", expiredCookieOptions);
    }
  }

  return response;
}
