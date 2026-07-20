import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { DEFAULT_SETTINGS_INPUT, sanitizeSettingsInput, type UserSettings } from "@/lib/settings/types";
import {
  getStringMetadata,
  type SharedAuthUser,
} from "@/lib/auth/shared-session";
import {
  applySharedAuthCookieOptions,
  getSharedAuthCookieOptions,
} from "@/lib/supabase/shared-auth-cookie";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const getRequiredEnv = (name: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

const createSharedServerClient = async () => {
  const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL);
  const anonKey = getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", SUPABASE_ANON_KEY);
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, anonKey, {
    cookieOptions: getSharedAuthCookieOptions(),
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, applySharedAuthCookieOptions(options));
          });
        } catch {
          // Server Components cannot write cookies; session refresh is
          // handled by the proxy.
        }
      },
    },
  });
};

export const getSharedAccessTokenFromCookies = async () => {
  const supabase = await createSharedServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token ?? null;
};

export const getCurrentSharedAuthUser = async (): Promise<SharedAuthUser | null> => {
  const supabase = await createSharedServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const metadata =
    user.user_metadata && typeof user.user_metadata === "object"
      ? (user.user_metadata as Record<string, unknown>)
      : {};

  return {
    id: user.id,
    email: user.email ?? null,
    name: getStringMetadata(metadata, ["full_name", "name", "display_name"]),
    avatarUrl: getStringMetadata(metadata, ["avatar_url", "picture"]),
  };
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
