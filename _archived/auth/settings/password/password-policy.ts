export const MIN_PASSWORD_LENGTH = 12;

export function validatePasswordStrength(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!/[A-Z]/.test(password)) {
    return "New password must include at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "New password must include at least one lowercase letter.";
  }

  if (!/\d/.test(password)) {
    return "New password must include at least one number.";
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return "New password must include at least one symbol.";
  }

  return null;
}

export type PasswordUpdateInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function validatePasswordUpdateInput(input: PasswordUpdateInput): string | null {
  if (!input.currentPassword.trim()) {
    return "Current password is required.";
  }

  const strengthError = validatePasswordStrength(input.newPassword);
  if (strengthError) {
    return strengthError;
  }

  if (input.newPassword !== input.confirmPassword) {
    return "New password and confirmation password do not match.";
  }

  if (input.currentPassword === input.newPassword) {
    return "New password must be different from your current password.";
  }

  return null;
}
