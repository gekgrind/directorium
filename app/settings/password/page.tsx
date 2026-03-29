import Link from "next/link";
import { ChevronRight, Lock, ShieldCheck, TriangleAlert } from "lucide-react";

export default function PasswordSettingsPage() {
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

          <div className="space-y-4">
            <PasswordField label="Current password" placeholder="Enter current password" />
            <PasswordField label="New password" placeholder="Create new password" />
            <PasswordField
              label="Confirm new password"
              placeholder="Re-enter new password"
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)]"
            >
              Update Password
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/75 transition hover:border-cyan-300/25 hover:text-cyan-200"
            >
              Cancel
            </button>
          </div>
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

function PasswordField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <label className="mb-3 block text-[11px] uppercase tracking-[0.2em] text-cyan-300/75">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-[#081624] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan-300/30"
      />
    </div>
  );
}