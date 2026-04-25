"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ChevronRight,
  CreditCard,
  Download,
  Lock,
  Settings2,
  Sparkles,
  User,
  Waypoints,
} from "lucide-react";
import {
  ALL_TONE_OPTIONS,
  getCurrentUserSettings,
} from "@/app/_data/user-settings";

type SettingsDefaults = {
  autoContrarian?: boolean;
  autoExport?: boolean;
  detailedSynthesis?: boolean;
  disagreementScore?: boolean;
};

type SettingsData = {
  enabledModels?: string[];
  defaultTone?: string[] | string;
  activeBoardRoles?: string[];
  defaultExportOptions?: string[];
  defaults?: SettingsDefaults;
  autoContrarian?: boolean;
  autoExport?: boolean;
  detailedSynthesis?: boolean;
  disagreementScore?: boolean;
};

const EMPTY_SETTINGS: SettingsData = {
  enabledModels: [],
  defaultTone: [],
  activeBoardRoles: [],
  defaultExportOptions: [],
  defaults: {
    autoContrarian: false,
    autoExport: false,
    detailedSynthesis: false,
    disagreementScore: false,
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(EMPTY_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    setSaveSuccess(null);

    try {
      const result = (await getCurrentUserSettings()) as
        | SettingsData
        | null
        | undefined;
      setSettings(result ?? EMPTY_SETTINGS);
    } catch (error) {
      console.error("Failed to load settings:", error);
      setLoadError("Unable to load settings right now.");
      setSettings(EMPTY_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const save = useCallback(async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      // TODO: Replace with real save logic when backend wiring is ready.
      await Promise.resolve();
      setSaveSuccess("Settings saved successfully.");
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaveError("Unable to save settings right now.");
    } finally {
      setIsSaving(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const normalizedDefaults = useMemo(
    () => ({
      autoContrarian:
        settings.defaults?.autoContrarian ?? settings.autoContrarian ?? false,
      autoExport: settings.defaults?.autoExport ?? settings.autoExport ?? false,
      detailedSynthesis:
        settings.defaults?.detailedSynthesis ??
        settings.detailedSynthesis ??
        false,
      disagreementScore:
        settings.defaults?.disagreementScore ??
        settings.disagreementScore ??
        false,
    }),
    [settings]
  );

  const enabledModels = settings.enabledModels ?? [];
  const activeBoardRoles = settings.activeBoardRoles ?? [];
  const defaultExportOptions = settings.defaultExportOptions ?? [];
  const defaultTone = Array.isArray(settings.defaultTone)
    ? settings.defaultTone
    : settings.defaultTone
      ? [settings.defaultTone]
      : [];

  return (
    <div className="mx-auto max-w-7xl space-y-8 text-white">
      <header className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
              Settings
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Tune the boardroom to fit how you think
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                Control your models, response tone, board composition, exports,
                and account settings from one place.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => void save()}
              disabled={isLoading || isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)] disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>

            <button
              type="button"
              onClick={() => void reload()}
              disabled={isLoading || isSaving}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-cyan-200 disabled:opacity-70"
            >
              {isLoading ? "Loading..." : "Reload Settings"}
            </button>
          </div>
        </div>

        {loadError ? (
          <p className="mt-4 text-sm text-red-300">{loadError}</p>
        ) : null}
        {saveError ? (
          <p className="mt-4 text-sm text-red-300">{saveError}</p>
        ) : null}
        {saveSuccess ? (
          <p className="mt-4 text-sm text-cyan-200">{saveSuccess}</p>
        ) : null}
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                  Profile
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Account overview
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                <User size={20} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard label="Name" value="Misti" />
              <InfoCard label="Email" value="founder@entrepreneuria.io" />
              <InfoCard label="Workspace" value="Entrepreneuria" />
              <InfoCard label="Role" value="Founder" />
            </div>

            <div className="mt-6">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                Manage profile
                <ChevronRight size={16} />
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Model preferences
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Choose your preferred model mix
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
                Directorium works best when the board has productive tension.
                These are the models currently enabled for your board sessions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {enabledModels.map((model) => (
                <span
                  key={model}
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100"
                >
                  {model}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <PreferenceCard
                title="Response depth"
                value={
                  normalizedDefaults.detailedSynthesis
                    ? "Strategic and detailed"
                    : "Strategic"
                }
              />
              <PreferenceCard
                title="Debate intensity"
                value={
                  normalizedDefaults.autoContrarian
                    ? "High tension enabled"
                    : "Balanced"
                }
              />
              <PreferenceCard
                title="Consensus style"
                value={
                  normalizedDefaults.autoContrarian
                    ? "Consensus + Contrarian"
                    : "Consensus only"
                }
              />
              <PreferenceCard
                title="Decision framing"
                value="Founder-focused"
              />
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Tone & board composition
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Shape how the board responds
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Settings2 size={18} className="text-cyan-300" />
                  <h3 className="text-lg font-semibold">Tone defaults</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {ALL_TONE_OPTIONS.map((tone) => (
                    <span
                      key={tone}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/75"
                    >
                      {tone}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-white/65">
                  Current default:{" "}
                  <span className="text-white">
                    {defaultTone.length > 0
                      ? defaultTone.join(" + ")
                      : "None selected"}
                  </span>
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <Waypoints size={18} className="text-cyan-300" />
                  <h3 className="text-lg font-semibold">Board composition</h3>
                </div>

                <div className="space-y-2">
                  {activeBoardRoles.map((role) => (
                    <div
                      key={role}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-[#081624] px-4 py-3"
                    >
                      <span className="text-sm text-white/85">{role}</span>
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-200">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Export options
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Control how decisions leave the room
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {defaultExportOptions.map((format) => (
                <div
                  key={format}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Download size={16} />
                  </div>
                  <h3 className="text-base font-semibold">{format}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Available for session summaries and board outputs.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-300/14 to-white/5 p-6 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">
              Current plan
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Founder Pro</h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Multi-model board access, exports, advanced session controls, and
              premium founder workflows.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/billing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)]"
              >
                Upgrade Plan
                <Sparkles size={16} />
              </Link>

              <Link
                href="/billing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-cyan-200"
              >
                Billing & Plan
                <CreditCard size={16} />
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
              Security
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Password & access</h2>
            <p className="mt-3 text-sm leading-7 text-white/70">
              Keep your boardroom locked down and founder-proof.
            </p>

            <div className="mt-5 space-y-3">
              <ActionRow
                href="https://entrepreneuria.io/settings/password"
                icon={<Lock size={16} />}
                title="Update password"
                subtitle="Change your password and review account access."
              />
              <ActionRow
                href="/profile"
                icon={<User size={16} />}
                title="Profile details"
                subtitle="Update your name, email, and workspace identity."
              />
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
              Defaults
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Quick preferences</h2>

            <div className="mt-5 space-y-3">
              <ToggleRow
                label="Auto-include Contrarian"
                value={normalizedDefaults.autoContrarian ? "On" : "Off"}
              />
              <ToggleRow
                label="Export summary after each session"
                value={normalizedDefaults.autoExport ? "On" : "Off"}
              />
              <ToggleRow
                label="Default to detailed synthesis"
                value={normalizedDefaults.detailedSynthesis ? "On" : "Off"}
              />
              <ToggleRow
                label="Show model disagreement score"
                value={normalizedDefaults.disagreementScore ? "On" : "Off"}
              />
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/75">
        {label}
      </p>
      <p className="mt-2 text-base font-medium text-white">{value}</p>
    </div>
  );
}

function PreferenceCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-2 text-base font-medium text-white">{value}</p>
    </div>
  );
}

function ActionRow({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/25 hover:bg-white/10"
    >
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-white/60">{subtitle}</p>
        </div>
      </div>
      <ChevronRight size={16} className="mt-1 shrink-0 text-white/45" />
    </Link>
  );
}

function ToggleRow({
  label,
  value,
  onClick,
}: {
  label: string;
  value: "On" | "Off";
  onClick?: () => void;
}) {
  const isOn = value === "On";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
    >
      <span className="text-sm text-white/85">{label}</span>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          isOn
            ? "border border-cyan-300/20 bg-cyan-300/10 text-cyan-200"
            : "border border-white/10 bg-white/5 text-white/55"
        }`}
      >
        {value}
      </span>
    </button>
  );
}
