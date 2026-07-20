export const ENTREPRENEURIA_AUTH_ORIGIN = "https://entrepreneuria.io";
export const ENTREPRENEURIA_LOGIN_URL = `${ENTREPRENEURIA_AUTH_ORIGIN}/login`;
export const ENTREPRENEURIA_LOGOUT_URL = `${ENTREPRENEURIA_AUTH_ORIGIN}/logout`;
export const SHARED_AUTH_COOKIE_NAME = "entrepreneuria-auth-token";
export const SHARED_AUTH_COOKIE_DOMAIN = ".entrepreneuria.io";
export const SHARED_AUTH_COOKIE_PATH = "/";

export const TRUSTED_ENTREPRENEURIA_APPS = [
  "https://entrepreneuria.io",
  "https://prospra.entrepreneuria.io",
  "https://architecta.entrepreneuria.io",
  "https://directorium.entrepreneuria.io",
  "https://synceri.entrepreneuria.io",
] as const;

export type SharedAuthUser = {
  id: string;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
};

type SupabaseUserPayload = {
  id?: unknown;
  email?: unknown;
  user_metadata?: unknown;
};

const JWT_PATTERN = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

export function buildCentralLoginUrl(currentUrl: string) {
  const loginUrl = new URL(ENTREPRENEURIA_LOGIN_URL);
  loginUrl.searchParams.set("next", currentUrl);
  return loginUrl;
}

export function buildCentralLogoutUrl(nextUrl: string) {
  const logoutUrl = new URL(ENTREPRENEURIA_LOGOUT_URL);
  logoutUrl.searchParams.set("next", nextUrl);
  return logoutUrl;
}

export function parseSharedSupabaseAccessToken(cookieValue: string | undefined) {
  if (!cookieValue) {
    return null;
  }

  const normalized = safeDecodeURIComponent(cookieValue.trim());
  const candidates = [normalized];

  if (normalized.startsWith("base64-")) {
    const decoded = decodeBase64(normalized.slice("base64-".length));
    if (decoded) {
      candidates.push(decoded);
    }
  }

  for (const candidate of candidates) {
    const directToken = extractAccessToken(candidate);
    if (directToken) {
      return directToken;
    }

    try {
      const parsed = JSON.parse(candidate) as unknown;
      const parsedToken = extractAccessToken(parsed);
      if (parsedToken) {
        return parsedToken;
      }
    } catch {
      // Continue checking other supported cookie encodings.
    }
  }

  return null;
}

export async function fetchSharedAuthUser({
  accessToken,
  supabaseUrl,
  anonKey,
}: {
  accessToken: string;
  supabaseUrl: string;
  anonKey: string;
}): Promise<SharedAuthUser | null> {
  const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as SupabaseUserPayload;

  if (typeof payload.id !== "string") {
    return null;
  }

  const metadata =
    payload.user_metadata && typeof payload.user_metadata === "object"
      ? (payload.user_metadata as Record<string, unknown>)
      : {};

  return {
    id: payload.id,
    email: typeof payload.email === "string" ? payload.email : null,
    name: getStringMetadata(metadata, ["full_name", "name", "display_name"]),
    avatarUrl: getStringMetadata(metadata, ["avatar_url", "picture"]),
  };
}

export function isTrustedEntrepreneuriaUrl(value: string) {
  try {
    const url = new URL(value);
    return TRUSTED_ENTREPRENEURIA_APPS.includes(url.origin as TrustedOrigin);
  } catch {
    return false;
  }
}

type TrustedOrigin = (typeof TRUSTED_ENTREPRENEURIA_APPS)[number];

function extractAccessToken(value: unknown): string | null {
  if (typeof value === "string") {
    return JWT_PATTERN.test(value) ? value : null;
  }

  if (Array.isArray(value)) {
    return typeof value[0] === "string" ? extractAccessToken(value[0]) : null;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  return (
    extractAccessToken(record.access_token) ??
    extractAccessToken(record.accessToken) ??
    extractAccessToken(record.currentSession)
  );
}

export function getStringMetadata(
  metadata: Record<string, unknown>,
  keys: readonly string[],
) {
  for (const key of keys) {
    const value = metadata[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function safeDecodeURIComponent(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function decodeBase64(value: string) {
  try {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(normalized, "base64").toString("utf8");
  } catch {
    return null;
  }
}
