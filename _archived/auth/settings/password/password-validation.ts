export const PASSWORD_MIN_LENGTH = 12;

const HAS_UPPERCASE = /[A-Z]/;
const HAS_LOWERCASE = /[a-z]/;
const HAS_NUMBER = /\d/;
const HAS_SYMBOL = /[^A-Za-z0-9]/;

export type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type PasswordValidationErrors = Partial<Record<keyof PasswordFormValues, string>>;

export function validatePasswordStrength(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `New password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  }

  if (!HAS_UPPERCASE.test(password)) {
    return "New password must include at least one uppercase letter.";
  }

  if (!HAS_LOWERCASE.test(password)) {
    return "New password must include at least one lowercase letter.";
  }

  if (!HAS_NUMBER.test(password)) {
    return "New password must include at least one number.";
  }

  if (!HAS_SYMBOL.test(password)) {
    return "New password must include at least one symbol.";
  }

  return null;
}

export function validatePasswordForm(values: PasswordFormValues): PasswordValidationErrors {
  const errors: PasswordValidationErrors = {};

  if (!values.currentPassword.trim()) {
    errors.currentPassword = "Current password is required.";
  }

  const strengthError = validatePasswordStrength(values.newPassword);
  if (strengthError) {
    errors.newPassword = strengthError;
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your new password.";
  } else if (values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "Confirmation does not match the new password.";
  }

  return errors;
}

export function hasValidationErrors(errors: PasswordValidationErrors): boolean {
  return Object.values(errors).some(Boolean);
}
