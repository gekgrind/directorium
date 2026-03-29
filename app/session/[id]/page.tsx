const boardResponses = [
  {
    role: "The Strategist",
    model: "OpenAI",
    summary: "Launch with all six only if the product experience clearly explains why multi-model diversity matters.",
    body: "The strategic upside of a six-model launch is differentiation. It reinforces Directorium’s core thesis: real disagreement from genuinely different models. But that only works if the user understands the advantage immediately. If the interface or onboarding is confusing, six models becomes noise instead of value. The strategy should be: launch with all six if the framing is disciplined, visible, and unmistakably useful.",
    stance: "Conditional yes",
  },
  {
    role: "The Capitalist",
    model: "Claude",
    summary: "A six-model launch is compelling, but it increases cost complexity and monetization pressure.",
    body: "From a financial perspective, the product becomes stronger but more expensive to operate. The question is whether early-stage user willingness to pay offsets that complexity. If six models are central to the brand promise, then price positioning must reflect premium strategic value, not generic AI utility. The business model must be treated as part of the launch decision, not a downstream detail.",
    stance: "Cautious support",
  },
  {
    role: "The Growth Architect",
    model: "Gemini",
    summary: "Six models create a stronger story, stronger marketing hooks, and stronger shareability.",
    body: "This is the kind of product architecture that gives people something worth talking about. A single-model tool is easy to ignore. A boardroom made of distinct AI directors is memorable. That helps positioning, waitlist growth, demos, and launch traction. The go-to-market upside is real, especially if the board roles are visible and visually iconic inside the interface.",
    stance: "Strong yes",
  },
  {
    role: "The Operator",
    model: "Grok",
    summary: "Operationally viable only if orchestration and fallbacks are handled cleanly from day one.",
    body: "The product concept is strong, but execution risk rises fast when six model providers are involved. Reliability, response timing, formatting consistency, and failure handling all become operational concerns. A six-model system can work, but only if the orchestration layer is designed like infrastructure, not glue. Operational discipline determines whether the launch feels premium or fragile.",
    stance: "Yes with safeguards",
  },
  {
    role: "The Risk Analyst",
    model: "Perplexity",
    summary: "The biggest risk is user confusion, not technical ambition.",
    body: "There is a real possibility that the product’s sophistication exceeds the user’s mental model on first exposure. If users do not immediately grasp why six perspectives matter, they may experience the product as complex rather than intelligent. Risk mitigation should focus on onboarding, explanation, and interpretation layers so the board’s value feels clear instead of abstract.",
    stance: "Risk flagged",
  },
  {
    role: "The Contrarian",
    model: "Mistral",
    summary: "A full six-model launch may be strategically correct but tactically premature.",
    body: "There is a seductive logic to launching the whole vision at once, but that does not automatically make it the smartest move. Sometimes restraint sharpens a category. A smaller initial board with a clearly staged path to six could produce more clarity, lower complexity, and stronger learning. The burden is proving that six models at launch improves adoption more than it slows it.",
    stance: "Challenge raised",
  },
];

const tensionPoints = [
  "Strategic differentiation vs launch complexity",
  "Premium pricing potential vs provider cost pressure",
  "Full vision at launch vs staged rollout discipline",
];

const nextActions = [
  "Clarify the onboarding language that explains why multiple models matter",
  "Define a pricing model that supports multi-provider costs from day one",
  "Design fallback logic and response formatting standards for every board seat",
  "Test whether a staged rollout beats a full six-model launch in early user interviews",
];

export default function SessionResultsPage() {
  return (
    <main className="min-h-screen px-6 py-10 text-white md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
                Session results
              </div>

              <div>
                <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                  Should we launch Directorium with all 6 models?
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-7 text-white/70 md:text-lg">
                  The board reviewed the strategic upside, operational complexity,
                  monetization pressure, and user experience implications of launching
                  Directorium with the full six-model concept from day one.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75 lg:min-w-[260px]">
              <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/80">
                Session metadata
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-white/45">Decision type</p>
                  <p className="mt-1 font-medium text-white">Product Strategy</p>
                </div>
                <div>
                  <p className="text-white/45">Board seats used</p>
                  <p className="mt-1 font-medium text-white">6 of 6</p>
                </div>
                <div>
                  <p className="text-white/45">Output mode</p>
                  <p className="mt-1 font-medium text-white">
                    Board memos + synthesis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.8fr]">
          {/* Left column */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                  Board synthesis
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Consensus summary
                </h2>
              </div>

              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-5">
                <p className="text-base leading-7 text-white/85">
                  The board broadly agrees that the six-model launch is strategically
                  powerful and aligned with Directorium’s differentiation. The strongest
                  support comes from positioning and growth logic. The main concerns are
                  not whether the concept is good, but whether the launch execution,
                  onboarding clarity, and cost structure are strong enough to carry it.
                </p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/75">
                    Overall signal
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Positive with caution
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/75">
                    Strategic strength
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    High
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/75">
                    Execution risk
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    Moderate
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                  Individual board memos
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  What each director said
                </h2>
              </div>

              <div className="space-y-4">
                {boardResponses.map((response) => (
                  <article
                    key={response.role}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-200">
                          {response.role}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-white">
                          {response.summary}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2 md:justify-end">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                          {response.model}
                        </span>
                        <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
                          {response.stance}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-white/70">
                      {response.body}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Tension analysis
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Where the board disagrees
              </h2>

              <div className="mt-5 space-y-3">
                {tensionPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/75"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Recommended next steps
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                What to do now
              </h2>

              <div className="mt-5 space-y-3">
                {nextActions.map((action, index) => (
                  <div
                    key={action}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 text-sm font-semibold text-cyan-200">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-white/75">{action}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-300/14 to-white/5 p-6 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">
                Founder decision prompt
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                What decision are you ready to make?
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/75">
                The board leans toward launching the full six-model concept, but only if
                you pair it with clear framing, disciplined orchestration, and pricing that
                supports the promise.
              </p>

              <div className="mt-5 space-y-3">
                <button className="w-full rounded-xl border border-cyan-300/25 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)]">
                  Start Follow-Up Session
                </button>
                <button className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-cyan-200">
                  Save Decision Notes
                </button>
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}