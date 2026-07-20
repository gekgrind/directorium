import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { buildCentralLoginUrl } from "@/lib/auth/shared-session";
import {
  applySharedAuthCookieOptions,
  getSharedAuthCookieOptions,
} from "@/lib/supabase/shared-auth-cookie";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function proxy(request: NextRequest) {
  // The shared auth cookie is scoped to .entrepreneuria.io and is never sent
  // to localhost, so skip the guard in local development. Read the Host
  // header rather than nextUrl.hostname — under self-hosted `next start`,
  // nextUrl.hostname is always "localhost" regardless of the real host.
  const hostname =
    request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return NextResponse.next();
  }

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.redirect(
      buildCentralLoginUrl(request.nextUrl.toString()),
    );
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookieOptions: getSharedAuthCookieOptions(),
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(
            name,
            value,
            applySharedAuthCookieOptions(options),
          );
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return response;
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
