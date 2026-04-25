export class PasswordUpdateProviderError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PasswordUpdateProviderError";
  }
}

type PasswordProviderPayload = {
  currentPassword: string;
  newPassword: string;
};

export async function updatePasswordWithProvider({
  currentPassword,
  newPassword,
}: PasswordProviderPayload): Promise<void> {
  const endpoint = process.env.AUTH_PASSWORD_UPDATE_URL;

  if (!endpoint) {
    throw new PasswordUpdateProviderError(
      "Password update provider is not configured.",
    );
  }

  const serviceToken = process.env.AUTH_PASSWORD_UPDATE_TOKEN;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(serviceToken ? { Authorization: `Bearer ${serviceToken}` } : {}),
    },
    body: JSON.stringify({ currentPassword, newPassword }),
    cache: "no-store",
  });

  if (response.ok) {
    return;
  }

  let providerMessage = "Password update failed.";

  try {
    const payload = (await response.json()) as { message?: string };
    if (payload?.message) {
      providerMessage = payload.message;
    }
  } catch {
    // Keep generic message to avoid leaking response body details.
  }

  throw new PasswordUpdateProviderError(providerMessage);
}
