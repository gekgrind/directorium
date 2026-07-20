import type { CookieOptions, CookieOptionsWithName } from "@supabase/ssr";
import {
  SHARED_AUTH_COOKIE_DOMAIN,
  SHARED_AUTH_COOKIE_NAME,
  SHARED_AUTH_COOKIE_PATH,
} from "@/lib/auth/shared-session";

export function getSharedAuthCookieOptions(): CookieOptionsWithName {
  return {
    name: SHARED_AUTH_COOKIE_NAME,
    domain:
      process.env.NEXT_PUBLIC_ENTREPRENEURIA_COOKIE_DOMAIN?.trim() ||
      SHARED_AUTH_COOKIE_DOMAIN,
    path: SHARED_AUTH_COOKIE_PATH,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };
}

export function applySharedAuthCookieOptions(
  options: CookieOptions = {},
): CookieOptions {
  const sharedOptions = getSharedAuthCookieOptions();

  return {
    ...options,
    domain: sharedOptions.domain,
    path: sharedOptions.path,
    sameSite: sharedOptions.sameSite,
    secure: sharedOptions.secure,
  };
}
