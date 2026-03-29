"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "./globals.css";
import BlueprintBackground from "@/components/BlueprintBackground";
import Sidebar from "@/components/navigation/Sidebar";
import NavItem from "@/components/navigation/NavItem";
import UserMenu from "@/components/navigation/UserMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getPageLabel(pathname: string) {
  if (pathname === "/") return "Dashboard";
  if (pathname === "/new-session") return "New Session";
  if (pathname === "/history") return "History";
  if (pathname.startsWith("/session/")) return "Session Results";
  return "Directorium";
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const currentPage = getPageLabel(pathname);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="relative min-h-screen overflow-x-hidden bg-[#061426] text-[#F5FBFF] antialiased">
        <BlueprintBackground />

        <div className="relative z-10 flex min-h-screen">
          <Sidebar pathname={pathname} />

          <div className="flex min-h-screen flex-1 flex-col">
            <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071a2d]/80 backdrop-blur-xl">
              <div className="flex items-center justify-between px-4 py-4 sm:px-6 md:px-10">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/80 md:hidden">
                    Directorium
                  </p>
                  <p className="truncate text-base font-semibold text-white md:text-lg">
                    {currentPage}
                  </p>
                </div>

                <div className="md:hidden">
                  <UserMenu mobile />
                </div>
              </div>

              <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:hidden">
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
            </header>

            <main className="flex-1 px-4 py-6 sm:px-6 md:px-10 md:py-10">
              <div className="mb-6 text-sm text-white/45">
                Directorium /{" "}
                <span className="font-medium text-cyan-300">{currentPage}</span>
              </div>

              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}