const sessions = [
  {
    id: "1",
    title: "Should we launch Directorium with all 6 models?",
    meta: "Product Strategy • 6 board members",
    status: "Ready for review",
    date: "Today",
  },
  {
    id: "2",
    title: "Pricing model for Entrepreneuria AI apps",
    meta: "Monetization • 5 board members",
    status: "Consensus reached",
    date: "Yesterday",
  },
  {
    id: "3",
    title: "Architecta onboarding flow decision",
    meta: "UX Strategy • 4 board members",
    status: "Tension detected",
    date: "2 days ago",
  },
  {
    id: "4",
    title: "Synceri positioning vs competitors",
    meta: "Positioning • 6 board members",
    status: "In progress",
    date: "Last week",
  },
];

import Link from "next/link";

export default function HistoryPage() {
  return (
    <main className="min-h-screen px-6 py-10 text-white md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <header className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
                Session history
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Your past board sessions
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                Every decision you’ve run through Directorium lives here. Revisit,
                compare, and build on previous thinking instead of starting from zero.
              </p>
            </div>

            <Link
              href="/new-session"
              className="rounded-xl border border-cyan-300/30 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)] inline-flex items-center justify-center"
            >
              New Session
            </Link>
          </div>
        </header>

        {/* Filters (visual only for now) */}
        <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-5 backdrop-blur-sm md:p-6">
          <div className="flex flex-wrap gap-3">
            {["All", "Product", "Growth", "Pricing", "UX", "Risk"].map(
              (filter) => (
                <button
                  key={filter}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 transition hover:border-cyan-300/30 hover:text-cyan-200"
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </section>

        {/* Sessions list */}
        <section className="space-y-4">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/session/${session.id}`}
              className="block rounded-2xl border border-white/10 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm transition hover:border-cyan-300/25 hover:bg-[#0A1B2E]/90"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Left */}
                <div>
                  <h2 className="text-lg font-semibold text-white md:text-xl">
                    {session.title}
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    {session.meta}
                  </p>

                  <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
                    <span>{session.date}</span>
                  </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      session.status === "Consensus reached"
                        ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                        : session.status === "Tension detected"
                        ? "border border-amber-400/30 bg-amber-400/10 text-amber-300"
                        : session.status === "In progress"
                        ? "border border-blue-400/30 bg-blue-400/10 text-blue-300"
                        : "border border-cyan-300/30 bg-cyan-300/10 text-cyan-200"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}