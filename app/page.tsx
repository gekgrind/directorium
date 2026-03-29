import BoardMemberCard from "@/components/BoardMemberCard";
import Link from "next/link";

const recentSessions = [
  {
    title: "Should we launch Directorium with all 6 models?",
    meta: "Product Strategy • 6 board members",
    status: "Ready for review",
  },
  {
    title: "Pricing structure for Entrepreneuria AI apps",
    meta: "Monetization • 5 board members",
    status: "Consensus reached",
  },
  {
    title: "Architecta onboarding flow decision",
    meta: "UX Strategy • 4 board members",
    status: "Tension detected",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-12 text-white">
      {/* Top bar */}
      <header className="flex flex-col gap-6 rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
              Directorium dashboard
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Your AI-powered Board of Directors
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                Bring the decision. The board brings the pressure test. Directorium is
                built to surface strategic insight, disagreement, and next steps from
                multiple AI models working as a real advisory board.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/new-session"
              className="inline-flex items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)]"
            >
              Start Board Session
            </Link>

            <Link
              href="/history"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-cyan-200"
            >
              View Session History
            </Link>
          </div>
        </div>

        <div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/80">
              Active board
            </p>
            <p className="mt-2 text-lg font-medium">6 model-powered directors</p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/80">
              Last session
            </p>
            <p className="mt-2 text-lg font-medium">Pricing strategy review</p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/80">
              Session mode
            </p>
            <p className="mt-2 text-lg font-medium">
              Consensus + Contrarian analysis
            </p>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        {/* Left side */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                  Board overview
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Six roles. Six distinct strategic lenses.
                </h2>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <BoardMemberCard title="The Strategist" />
              <BoardMemberCard title="The Capitalist" />
              <BoardMemberCard title="The Growth Architect" />
              <BoardMemberCard title="The Operator" />
              <BoardMemberCard title="The Risk Analyst" />
              <BoardMemberCard title="The Contrarian" />
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                How it works
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                From question to decision-ready clarity
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 text-cyan-300">
                  1
                </div>
                <h3 className="text-lg font-semibold">Frame the decision</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Enter the question, context, priorities, and business constraints so
                  the board knows what it’s evaluating.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 text-cyan-300">
                  2
                </div>
                <h3 className="text-lg font-semibold">Hear the debate</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Each board member responds from a different strategic angle so blind
                  spots, conflict, and upside get surfaced fast.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/30 text-cyan-300">
                  3
                </div>
                <h3 className="text-lg font-semibold">Decide with confidence</h3>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Review consensus, tension points, and next-step recommendations before
                  you choose your move.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right side */}
        <aside className="space-y-6">
          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
              Recent sessions
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Board activity</h2>

            <div className="mt-6 space-y-4">
              {recentSessions.map((session) => (
                <div
                  key={session.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-300/25"
                >
                  <h3 className="text-base font-semibold leading-6">{session.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{session.meta}</p>
                  <div className="mt-3 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
                    {session.status}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
              Board logic
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Why multiple models matters</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Directorium is designed for model diversity, not one AI pretending to be a
              committee. The point is productive disagreement. Different training,
              different bias patterns, different strategic instincts. That tension is the
              feature.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["OpenAI", "Claude", "Gemini", "Grok", "Perplexity", "Mistral"].map(
                (model) => (
                  <span
                    key={model}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75"
                  >
                    {model}
                  </span>
                )
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-300/14 to-white/5 p-6 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">
              Ready to run a session?
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Put your next big decision in front of the board.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Product strategy, pricing, positioning, offers, hiring, risk, launches,
              pivots. Bring the mess. Directorium is built for it.
            </p>

            <Link
              href="/new-session"
              className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)]"
            >
              Start Board Session
            </Link>
          </section>
        </aside>
      </section>
    </div>
  );
}