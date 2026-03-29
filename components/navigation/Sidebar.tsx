"use client";

import Link from "next/link";
import NavItem from "./NavItem";
import UserMenu from "./UserMenu";

type SidebarProps = {
  pathname: string;
};

export default function Sidebar({ pathname }: SidebarProps) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#071a2d]/70 backdrop-blur-xl md:flex md:flex-col">
      <div className="border-b border-white/10 px-6 py-6">
        <Link href="/" className="block">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Directorium
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-white">Boardroom</h1>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            Your AI-powered Board of Directors
          </p>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
        <NavItem href="/" label="Dashboard" isActive={pathname === "/"} />
        <NavItem
          href="/new-session"
          label="New Session"
          isActive={pathname === "/new-session"}
        />
        <NavItem
          href="/history"
          label="History"
          isActive={pathname === "/history"}
        />
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <UserMenu />
      </div>
    </aside>
  );
}