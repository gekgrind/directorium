"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, Lock, ShieldCheck, TriangleAlert } from "lucide-react";
import {
  hasValidationErrors,
  validatePasswordForm,
  type PasswordFormValues,
  type PasswordValidationErrors,
} from "./password-validation";

const INITIAL_VALUES: PasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

import {
  validatePasswordStrength,
  validatePasswordUpdateInput,
} from "./password-policy";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const initialValues: FormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function PasswordSettingsPage() {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clientValidationError = useMemo(
    () =>
      validatePasswordUpdateInput({
        currentPassword: formValues.currentPassword,
        newPassword: formValues.newPassword,
        confirmPassword: formValues.confirmPassword,
      }),
    [formValues],
  );

  const isSubmitDisabled =
    isSubmitting ||
    !formValues.currentPassword ||
    !formValues.newPassword ||
    !formValues.confirmPassword ||
    Boolean(clientValidationError);

  const passwordStrengthMessage = useMemo(
    () => validatePasswordStrength(formValues.newPassword),
    [formValues.newPassword],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (clientValidationError) {
      setErrorMessage(clientValidationError);
      setSuccessMessage(null);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/account/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to update password.");
      }

      setSuccessMessage(payload.message ?? "Password updated successfully.");
      setFormValues(initialValues);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to update password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleCancel() {
    setFormValues(initialValues);
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 text-white">
      <header className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
              Security
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Password & account access
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                Keep your boardroom secure with strong credentials and smart access
                hygiene.
              </p>
            </div>
          </div>

          <Link
            href="/settings"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-cyan-200"
          >
            Back to Settings
            <ChevronRight size={16} />
          </Link>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Update password
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Change your login credentials
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
              <Lock size={20} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordField
              label="Current password"
              placeholder="Enter current password"
              value={formValues.currentPassword}
              autoComplete="current-password"
              onChange={(value) =>
                setFormValues((previous) => ({ ...previous, currentPassword: value }))
              }
            />
            <PasswordField
              label="New password"
              placeholder="Create new password"
              value={formValues.newPassword}
              autoComplete="new-password"
              onChange={(value) =>
                setFormValues((previous) => ({ ...previous, newPassword: value }))
              }
            />
            <PasswordField
              label="Confirm new password"
              placeholder="Re-enter new password"
              value={formValues.confirmPassword}
              autoComplete="new-password"
              onChange={(value) =>
                setFormValues((previous) => ({ ...previous, confirmPassword: value }))
              }
            />

            {passwordStrengthMessage && formValues.newPassword ? (
              <p className="text-sm text-amber-200">{passwordStrengthMessage}</p>
            ) : null}

            {errorMessage ? <p className="text-sm text-rose-300">{errorMessage}</p> : null}
            {successMessage ? (
              <p className="text-sm text-emerald-300">{successMessage}</p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="inline-flex items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-cyan-300/25 hover:text-cyan-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-300/14 to-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">
                  Security status
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Protected</h2>
                <p className="mt-3 text-sm leading-7 text-white/75">
                  Your Directorium account is currently secure. Updating your password
                  regularly helps keep saved sessions and account settings protected.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 text-amber-200">
                <TriangleAlert size={18} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                  Password tips
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Keep it strong</h2>
              </div>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-white/70">
              <li>Use at least 12 characters.</li>
              <li>Mix uppercase, lowercase, numbers, and symbols.</li>
              <li>Avoid reusing passwords from other accounts.</li>
              <li>Use a password manager if possible.</li>
            </ul>
          </section>
        </aside>
      </section>
    </div>
  );
}

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  error?: string;
};

function PasswordField({
  label,
  placeholder,
  value,
  onChange,
  autoComplete,
  error,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  error?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <label className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-cyan-300/75">
        {label}
      </label>
      <input
        type="password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="w-full rounded-xl border border-white/10 bg-[#081624] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/30"
      />
      {error ? <p className="mt-2 text-xs text-red-200">{error}</p> : null}
    </div>
  );
}
