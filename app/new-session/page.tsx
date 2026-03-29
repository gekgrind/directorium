import Link from "next/link";

const boardMembers = [
  {
    title: "The Strategist",
    desc: "Long-range positioning, market logic, and competitive direction.",
  },
  {
    title: "The Capitalist",
    desc: "Revenue logic, margins, pricing, and financial viability.",
  },
  {
    title: "The Growth Architect",
    desc: "Acquisition, leverage, momentum, and scalable expansion.",
  },
  {
    title: "The Operator",
    desc: "Execution, systems, workflows, and operational feasibility.",
  },
  {
    title: "The Risk Analyst",
    desc: "Downside exposure, vulnerabilities, and blind spots.",
  },
  {
    title: "The Contrarian",
    desc: "Challenges consensus and pressure-tests the obvious answer.",
  },
];

const decisionTypes = [
  "Product Strategy",
  "Pricing",
  "Positioning",
  "Launch Strategy",
  "Offer Design",
  "Growth Strategy",
  "Operational Decision",
  "Hiring",
  "Risk Review",
  "Other",
];

const businessStages = [
  "Idea Stage",
  "Pre-Launch",
  "Early Revenue",
  "Growth Stage",
  "Established Business",
  "Pivot / Transition",
];

const outputStyles = [
  "Executive Summary",
  "Detailed Board Memos",
  "Action Plan",
  "Debate + Consensus View",
];

export default function NewSessionPage() {
  return (
    <main className="min-h-screen px-6 py-10 text-white md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
              New board session
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Bring the decision to the board
            </h1>
            <p className="text-base leading-7 text-white/70 md:text-lg">
              Frame the problem clearly, give the board the right context, and
              let six distinct strategic perspectives pressure-test your next move.
            </p>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.8fr]">
          {/* Left column */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                  Session brief
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Decision framing
                </h2>
              </div>

              <div className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/85">
                      Session title
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Should we launch Directorium with all 6 models?"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/35 focus:bg-white/[0.07]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/85">
                      Company / project
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Entrepreneuria / Directorium"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/35 focus:bg-white/[0.07]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/85">
                      Decision type
                    </label>
                    <select className="w-full rounded-xl border border-white/10 bg-[#10243A] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35">
                      {decisionTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/85">
                      Business stage
                    </label>
                    <select className="w-full rounded-xl border border-white/10 bg-[#10243A] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35">
                      {businessStages.map((stage) => (
                        <option key={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/85">
                      Output style
                    </label>
                    <select className="w-full rounded-xl border border-white/10 bg-[#10243A] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/35">
                      {outputStyles.map((style) => (
                        <option key={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/85">
                    Core question / decision
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Describe the strategic decision the board needs to evaluate."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/35 focus:bg-white/[0.07]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/85">
                    Context / background
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Add the facts, constraints, current situation, resources, timing, and any relevant business context."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/35 focus:bg-white/[0.07]"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/85">
                      Priorities
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ex: Speed to market, founder simplicity, lower dev complexity, strong differentiation"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/35 focus:bg-white/[0.07]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/85">
                      Risk tolerance
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ex: Moderate risk is fine, but avoid decisions that create major technical debt or a confusing launch"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-300/35 focus:bg-white/[0.07]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                  Board configuration
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Select board members
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  All six are selected by default. Later, this will map to real
                  model/provider orchestration.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {boardMembers.map((member) => (
                  <label
                    key={member.title}
                    className="group cursor-pointer rounded-2xl border border-cyan-400/15 bg-white/5 p-5 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-3">
                        <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-200">
                          Board seat
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white">
                            {member.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-white/65">
                            {member.desc}
                          </p>
                        </div>
                      </div>

                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-cyan-300"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Session settings
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Run configuration
              </h2>

              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/75">
                    Response mode
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Individual board memos + synthesis
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/75">
                    Tension detection
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Enabled
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/75">
                    Consensus summary
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Enabled
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/75">
                    Provider mode
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Mock orchestration for now
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Output preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                What you’ll get back
              </h2>

              <ul className="mt-5 space-y-3 text-sm leading-6 text-white/70">
                <li>• One response from each selected board member</li>
                <li>• Strategic consensus summary</li>
                <li>• Tension / disagreement analysis</li>
                <li>• Recommended next steps</li>
                <li>• Founder decision prompt</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-300/14 to-white/5 p-6 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">
                Ready to brief the board?
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Run this session
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/75">
                This first version can route to a mocked results page next. The
                structure is what matters right now.
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  href="/session/demo"
                  className="block w-full rounded-xl border border-cyan-300/25 bg-cyan-300 px-5 py-3 text-center text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)]"
                >
                  Run Board Session
                </Link>
                <button className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-cyan-200">
                  Save Draft
                </button>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}