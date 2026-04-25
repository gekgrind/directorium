export type UserProfile = {
  fullName: string;
  email: string;
  workspace: string;
  role: string;
};

const PROFILE_STORAGE_KEY = "directorium.current-user-profile";

export const defaultCurrentUserProfile: UserProfile = {
  fullName: "Misti",
  email: "founder@entrepreneuria.io",
  workspace: "Entrepreneuria",
  role: "Founder",
};

function isUserProfile(value: unknown): value is UserProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Record<keyof UserProfile, unknown>>;

  return (
    typeof candidate.fullName === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.workspace === "string" &&
    typeof candidate.role === "string"
  );
}

export async function fetchCurrentUserProfile(): Promise<UserProfile> {
  if (typeof window === "undefined") {
    return defaultCurrentUserProfile;
  }

  const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!stored) {
    return defaultCurrentUserProfile;
  }

  try {
    const parsed = JSON.parse(stored) as unknown;
    if (!isUserProfile(parsed)) {
      return defaultCurrentUserProfile;
    }

    return {
      fullName: parsed.fullName.trim() || defaultCurrentUserProfile.fullName,
      email: parsed.email.trim() || defaultCurrentUserProfile.email,
      workspace: parsed.workspace.trim() || defaultCurrentUserProfile.workspace,
      role: parsed.role.trim() || defaultCurrentUserProfile.role,
    };
  } catch {
    return defaultCurrentUserProfile;
  }
}

export async function saveCurrentUserProfile(
  profile: UserProfile,
): Promise<UserProfile> {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }

  return profile;
}
