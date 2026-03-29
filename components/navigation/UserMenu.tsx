"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  ChevronUp,
  CreditCard,
  Lock,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react";

type UserMenuProps = {
  mobile?: boolean;
};

export default function UserMenu({ mobile = false }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (mobile) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-white"
          aria-label="Open user menu"
          aria-expanded={open}
        >
          <User size={18} />
        </button>

        {open && (
          <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0A1B2E]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                Your account
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Misti</p>
                  <p className="text-sm text-white/55">Founder Pro</p>
                </div>
              </div>
            </div>

            <div className="border-b border-white/10 px-5 py-4">
              <div className="flex items-start justify-between gap-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/85">
                    Current plan
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">Founder Pro</p>
                  <p className="mt-1 text-sm leading-6 text-white/60">
                    Multi-model board access, exports, and advanced session tools.
                  </p>
                </div>

                <Link
                  href="/billing"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300 px-3 py-2 text-xs font-semibold text-[#061426] transition hover:shadow-[0_0_24px_rgba(103,232,249,0.22)]"
                >
                  Upgrade
                  <Sparkles size={14} />
                </Link>
              </div>
            </div>

            <div className="px-3 py-3">
              <div className="space-y-1">
                <MenuLink href="/profile" icon={<User size={16} />} label="Profile" />
                <MenuLink
                  href="/settings"
                  icon={<Settings size={16} />}
                  label="Settings"
                />
                <MenuLink
                  href="/settings/preferences"
                  icon={<Settings size={16} />}
                  label="Model Preferences"
                />
                <MenuLink
                  href="/settings/password"
                  icon={<Lock size={16} />}
                  label="Update Password"
                />
                <MenuLink
                  href="/billing"
                  icon={<CreditCard size={16} />}
                  label="Billing & Plan"
                />
              </div>

              <div className="my-3 border-t border-white/10" />

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <LogOut size={16} />
                  Sign Out
                </span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-cyan-300/25 hover:bg-white/10"
        aria-label="Open user menu"
        aria-expanded={open}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
          <User size={16} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">Misti</p>
          <p className="truncate text-xs text-white/55">Founder Pro</p>
        </div>

        <ChevronUp
          size={16}
          className={`text-white/45 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute bottom-16 left-0 z-50 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A1B2E]/95 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
              Your account
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Misti</p>
                <p className="text-sm text-white/55">founder@entrepreneuria.io</p>
              </div>
            </div>
          </div>

          <div className="border-b border-white/10 px-5 py-4">
            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/85">
                Current plan
              </p>
              <p className="mt-2 text-lg font-semibold text-white">Founder Pro</p>
              <p className="mt-1 text-sm leading-6 text-white/60">
                Multi-model board access, exports, and advanced session tools.
              </p>

              <Link
                href="/billing"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300 px-3 py-2 text-xs font-semibold text-[#061426] transition hover:shadow-[0_0_24px_rgba(103,232,249,0.22)]"
              >
                Upgrade
                <Sparkles size={14} />
              </Link>
            </div>
          </div>

          <div className="px-3 py-3">
            <div className="space-y-1">
              <MenuLink href="/profile" icon={<User size={16} />} label="Profile" />
              <MenuLink
                href="/settings"
                icon={<Settings size={16} />}
                label="Settings"
              />
              <MenuLink
                href="/settings/preferences"
                icon={<Settings size={16} />}
                label="Model Preferences"
              />
              <MenuLink
                href="/settings/password"
                icon={<Lock size={16} />}
                label="Update Password"
              />
              <MenuLink
                href="/billing"
                icon={<CreditCard size={16} />}
                label="Billing & Plan"
              />
            </div>

            <div className="my-3 border-t border-white/10" />

            <button
              type="button"
              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-white/65 transition hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-3">
                <LogOut size={16} />
                Sign Out
              </span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl px-3 py-3 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
    >
      <span className="flex items-center gap-3">
        {icon}
        {label}
      </span>
      <ChevronRight size={16} />
    </Link>
  );
}