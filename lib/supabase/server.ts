import { cookies } from "next/headers";
import { DEFAULT_SETTINGS_INPUT, sanitizeSettingsInput, type UserSettings } from "@/lib/settings/types";
import {
  fetchSharedAuthUser,
  parseSharedSupabaseAccessToken,
  SHARED_AUTH_COOKIE_NAME,
} from "@/lib/auth/shared-session";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const getRequiredEnv = (name: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const getSharedAccessTokenFromCookies = async () => {
  const cookieStore = await cookies();
  return parseSharedSupabaseAccessToken(
    cookieStore.get(SHARED_AUTH_COOKIE_NAME)?.value,
  );
};

export const getCurrentSharedAuthUser = async () => {
  const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL);
  const anonKey = getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", SUPABASE_ANON_KEY);
  const accessToken = await getSharedAccessTokenFromCookies();

  if (!accessToken) {
    return null;
  }

  return fetchSharedAuthUser({ accessToken, supabaseUrl, anonKey });
};

export const getAuthenticatedSupabaseUserId = async () => {
  const user = await getCurrentSharedAuthUser();
  return user?.id ?? null;
};

const settingsBaseUrl = () =>
  `${getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL)}/rest/v1/user_settings`;

const serviceHeaders = () => ({
  apikey: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY", SUPABASE_SERVICE_ROLE_KEY),
  Authorization: `Bearer ${getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY", SUPABASE_SERVICE_ROLE_KEY)}`,
  "Content-Type": "application/json",
});

export const getOrCreateUserSettings = async (
  userId: string,
): Promise<UserSettings> => {
  const response = await fetch(
    `${settingsBaseUrl()}?user_id=eq.${userId}&select=*`,
    {
      headers: serviceHeaders(),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to load user settings.");
  }

  const payload = (await response.json()) as unknown;
  const rows = Array.isArray(payload) ? payload : [];

  if (rows.length > 0) {
    const existing = rows[0] as Record<string, unknown>;
    return {
      user_id: userId,
      ...sanitizeSettingsInput(existing),
      updated_at: typeof existing.updated_at === "string" ? existing.updated_at : undefined,
    };
  }

  return upsertUserSettings(userId, DEFAULT_SETTINGS_INPUT);
};

export const upsertUserSettings = async (
  userId: string,
  input: unknown,
): Promise<UserSettings> => {
  const sanitized = sanitizeSettingsInput(input);

  const response = await fetch(`${settingsBaseUrl()}?on_conflict=user_id`, {
    method: "POST",
    headers: {
      ...serviceHeaders(),
      Prefer: "return=representation,resolution=merge-duplicates",
    },
    body: JSON.stringify([
      {
        user_id: userId,
        ...sanitized,
      },
    ]),
  });

  if (!response.ok) {
    throw new Error("Failed to save user settings.");
  }

  const payload = (await response.json()) as unknown;
  const row = Array.isArray(payload) ? payload[0] : null;

  if (!row || typeof row !== "object") {
    return { user_id: userId, ...sanitized };
  }

  const record = row as Record<string, unknown>;
  return {
    user_id: userId,
    ...sanitizeSettingsInput(record),
    updated_at: typeof record.updated_at === "string" ? record.updated_at : undefined,
  };
};
