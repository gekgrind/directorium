"use client";

import Link from "next/link";

type NavItemProps = {
  href: string;
  label: string;
  isActive: boolean;
};

export default function NavItem({ href, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-cyan-300 text-[#061426] shadow-[0_0_30px_rgba(103,232,249,0.18)]"
          : "text-white/70 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}