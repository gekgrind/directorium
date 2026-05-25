import HolographicBoardTable from "@/components/dashboard/HolographicBoardTable";
import Link from "next/link";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Shield,
  ArrowRight,
  Users,
  ChevronRight,
  Zap,
  BarChart2,
  Search,
} from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

const FOUNDER_QUESTION =
  "Should we launch the Prospra beta publicly next month or keep it invite-only until onboarding analytics improve?";

const FINAL_RECOMMENDATION =
  "Proceed with a controlled public beta using phased access, weekly KPI reviews, and a rollback threshold at Day-7 retention below 30%.";

type VoteType = "Approve" | "Revise" | "Needs More Data";

type BoardDetail = {
  name: string;
  vote: VoteType;
  confidence: number;
  rationale: string;
  concern: string;
  nextMove: string;
};

const BOARD_DETAILS: BoardDetail[] = [
  {
    name: "The Strategist",
    vote: "Approve",
    confidence: 87,
    rationale: "Phased launch maximizes learning while preserving competitive advantage.",
    concern: "Onboarding conversion rate below 40% signals premature readiness",
    nextMove: "Ship with waitlist + phase 2 gate; review weekly retention data",
  },
  {
    name: "The Operator",
    vote: "Revise",
    confidence: 72,
    rationale: "Execution infrastructure isn't ready for uncontrolled public traffic.",
    concern: "No support capacity plan for inbound volume spike",
    nextMove: "Cap beta at 500 users; implement daily ops monitoring dashboard",
  },
  {
    name: "The Financial Analyst",
    vote: "Approve",
    confidence: 81,
    rationale: "Early paid conversion data justifies accelerated market exposure.",
    concern: "CAC will spike without a referral or organic acquisition flywheel",
    nextMove: "Launch referral program in parallel; set CAC ceiling at $180",
  },
  {
    name: "The Growth Advisor",
    vote: "Approve",
    confidence: 91,
    rationale: "Waiting longer sacrifices first-mover positioning in a tightening window.",
    concern: "Feature differentiation is unclear to new users on first visit",
    nextMove: "Add social proof, case studies, and comparison content pre-launch",
  },
  {
    name: "The Risk Officer",
    vote: "Needs More Data",
    confidence: 58,
    rationale: "Churn risk is unquantified. Retention signals are still ambiguous.",
    concern: "Reputation damage from premature public launch is hard to reverse",
    nextMove: "Extend closed beta 30 days with NPS tracking and exit interviews",
  },
  {
    name: "The Customer Advocate",
    vote: "Revise",
    confidence: 76,
    rationale: "Onboarding friction will frustrate early users and hurt word-of-mouth.",
    concern: "No in-app guidance layer or contextual help for new user moments",
    nextMove: "Complete onboarding flow redesign before any public access opens",
  },
];

const ACTION_PLAN = [
  "Deploy with 500 beta slots using invite-code access gates",
  "Activate weekly KPI review cadence with Day-7 retention as primary signal",
  "Set rollback threshold: Day-7 retention below 30% triggers pause",
  "Launch parallel referral program to build organic growth loops",
  "Complete in-app onboarding flow audit within 14 days post-launch",
  "Schedule 30-day board review session to assess go-to-market performance",
];

const RECENT_SESSIONS = [
  { title: "Prospra pricing structure decision", result: "Consensus",  date: "Apr 28", type: "Monetization" },
  { title: "Growth model for public beta launch", result: "Tension",    date: "Apr 22", type: "Growth"       },
  { title: "Architecta onboarding flow redesign", result: "Ready",      date: "Apr 18", type: "UX Strategy"  },
  { title: "Q3 engineering hiring plan",          result: "Consensus",  date: "Apr 11", type: "Operations"   },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function voteStyle(vote: string) {
  if (vote === "Approve")          return { pill: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30", bar: "bg-emerald-400", card: "border-emerald-400/18" };
  if (vote === "Revise")           return { pill: "bg-amber-400/15   text-amber-300   border-amber-400/30",  bar: "bg-amber-400",   card: "border-amber-400/18"   };
  if (vote === "Needs More Data")  return { pill: "bg-blue-400/15    text-blue-300    border-blue-400/30",   bar: "bg-blue-400",    card: "border-blue-400/18"    };
  return                                  { pill: "bg-red-400/15     text-red-300     border-red-400/30",    bar: "bg-red-400",     card: "border-red-400/18"     };
}

function confColor(n: number) {
  if (n >= 80) return "bg-emerald-400";
  if (n >= 65) return "bg-cyan-400";
  return "bg-amber-400";
}

function sessionResultStyle(r: string) {
  if (r === "Consensus") return "bg-emerald-400/12 text-emerald-300 border-emerald-400/25";
  if (r === "Tension")   return "bg-amber-400/12   text-amber-300   border-amber-400/25";
  if (r === "Ready")     return "bg-cyan-400/12    text-cyan-200    border-cyan-400/25";
  return                        "bg-white/8        text-white/60    border-white/15";
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 text-white">

      {/* ── Session command bar ── */}
      <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/75 p-5 backdrop-blur-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* Left: session identity */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10">
              <Target className="h-5 w-5 text-cyan-300" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                  DR-2026-047
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-300">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Active · 6 of 6
                </span>
              </div>
              <p className="mt-1 truncate text-base font-semibold text-white">Beta Launch Decision · Prospra</p>
            </div>
          </div>

          {/* Center: command input */}
          <div className="flex-1 max-w-sm lg:max-w-md">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
              <Search className="h-4 w-4 shrink-0 text-white/35" />
              <span className="text-sm text-white/35">Ask the board a follow-up question…</span>
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/55">
              <Clock className="h-4 w-4" />
              <span>72h window</span>
            </div>
            <Link
              href="/new-session"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/30 bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_24px_rgba(103,232,249,0.3)]"
            >
              <Zap className="h-4 w-4" />
              New Session
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main 3-column grid ── */}
      <div className="grid gap-6 xl:grid-cols-[250px_1fr_280px]">

        {/* ─ Left: Session panel ─ */}
        <aside className="space-y-4">

          {/* Founder question */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-5 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Founder Question</p>
            <p className="mt-3 text-sm leading-6 text-white/85">{FOUNDER_QUESTION}</p>
          </div>

          {/* Session context */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-5 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Context Summary</p>
            <div className="mt-3 space-y-2.5">
              {[
                ["Decision Type",  "Product Launch Strategy"],
                ["Business Stage", "Late Pre-Launch"],
                ["Risk Tolerance", "Medium"],
                ["Priority",       "Growth + Retention"],
                ["Timeline",       "Decide within 72 hours"],
              ].map(([label, val]) => (
                <div key={label} className="flex items-start justify-between gap-2">
                  <span className="text-xs text-white/45 shrink-0">{label}</span>
                  <span className="text-xs font-medium text-white/80 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Board configuration */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Board Configuration</p>
              <span className="rounded-full bg-cyan-300/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300">6 seats</span>
            </div>
            <div className="mt-3 space-y-1.5">
              {BOARD_DETAILS.map((m) => {
                const vs = voteStyle(m.vote);
                return (
                  <div key={m.name} className="flex items-center justify-between gap-2 rounded-lg border border-white/6 bg-white/4 px-3 py-2">
                    <span className="text-xs font-medium text-white/75">{m.name}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold ${vs.pill}`}>
                      {m.vote === "Needs More Data" ? "Needs Data" : m.vote}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Decision timeline */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-5 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Decision Timeline</p>
            <div className="mt-3 space-y-3">
              {[
                { step: "Board Assembled",    status: "done",    time: "2:14 PM" },
                { step: "Analysis Complete",  status: "done",    time: "2:31 PM" },
                { step: "Consensus Review",   status: "done",    time: "2:38 PM" },
                { step: "Founder Decision",   status: "current", time: "Now"     },
                { step: "Session Archived",   status: "pending", time: "—"       },
              ].map(({ step, status, time }) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`h-2 w-2 shrink-0 rounded-full ${
                    status === "done"    ? "bg-emerald-400" :
                    status === "current"? "bg-cyan-300 animate-pulse" :
                                          "bg-white/20"
                  }`} />
                  <span className={`flex-1 text-xs ${status === "pending" ? "text-white/35" : "text-white/70"}`}>{step}</span>
                  <span className="text-[10px] text-white/35">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ─ Center: Board visualization ─ */}
        <section className="flex flex-col gap-4">

          {/* Board header */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">AI Board of Directors</p>
                <h2 className="mt-1 text-lg font-semibold">Strategic Decision Session</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  <Activity className="h-3 w-3" />
                  Board in Session
                </div>
              </div>
            </div>
          </div>

          {/* Holographic board table */}
          <div className="relative rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 px-4 py-6 backdrop-blur-sm">
            {/* Corner accents */}
            <div className="pointer-events-none absolute left-3 top-3 h-4 w-4 rounded-tl-lg border-l-2 border-t-2 border-cyan-300/30" />
            <div className="pointer-events-none absolute right-3 top-3 h-4 w-4 rounded-tr-lg border-r-2 border-t-2 border-cyan-300/30" />
            <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 rounded-bl-lg border-b-2 border-l-2 border-cyan-300/30" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 rounded-br-lg border-b-2 border-r-2 border-cyan-300/30" />

            <HolographicBoardTable />
          </div>

          {/* Vote summary strip */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Approve",       count: 3, pct: "50%", color: "text-emerald-300", dot: "bg-emerald-400" },
              { label: "Revise",        count: 2, pct: "33%", color: "text-amber-300",   dot: "bg-amber-400"   },
              { label: "Needs Data",    count: 1, pct: "17%", color: "text-blue-300",    dot: "bg-blue-400"    },
            ].map(({ label, count, pct, color, dot }) => (
              <div key={label} className="rounded-xl border border-white/8 bg-white/4 p-3 text-center">
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold ${color}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                  {label}
                </div>
                <div className="mt-1 text-xl font-bold text-white">{count}</div>
                <div className="text-[10px] text-white/40">{pct} of board</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─ Right: Decision panel ─ */}
        <aside className="space-y-4">

          {/* Final recommendation */}
          <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/8 to-[#0A1B2E]/70 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">Final Recommendation</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/85">{FINAL_RECOMMENDATION}</p>
          </div>

          {/* Strategic confidence */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-5 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Strategic Confidence</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-4xl font-bold text-white">82</span>
              <span className="mb-1 text-xl font-semibold text-white/50">%</span>
              <span className="mb-1 ml-auto text-xs text-emerald-300">Board average</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            </div>
          </div>

          {/* Vote split bar */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-5 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Board Vote Split</p>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full flex gap-px">
              <div className="bg-emerald-400 rounded-l-full" style={{ width: "50%" }} />
              <div className="bg-amber-400"                  style={{ width: "33.3%" }} />
              <div className="bg-blue-400 rounded-r-full"    style={{ width: "16.7%" }} />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5 text-xs">
              <span className="text-emerald-300">● 3 Approve</span>
              <span className="text-amber-300">● 2 Revise</span>
              <span className="text-blue-300">● 1 Needs Data</span>
            </div>
          </div>

          {/* Key metrics */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-5 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Session Metrics</p>
            <div className="mt-3 space-y-3">
              {[
                { label: "Risk Level",             value: "Med-High",  color: "text-amber-300"   },
                { label: "Capital Impact",          value: "Moderate",  color: "text-amber-300"   },
                { label: "Exec. Complexity",        value: "Medium",    color: "text-blue-300"    },
                { label: "Opportunity Score",       value: "91 / 100",  color: "text-cyan-300"    },
                { label: "Time to Decision",        value: "72 hrs",    color: "text-white/75"    },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-white/45">{label}</span>
                  <span className={`text-xs font-semibold ${color}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risk summary */}
          <div className="rounded-2xl border border-amber-400/18 bg-amber-400/6 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-400" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300">Risk Flags</p>
            </div>
            <ul className="mt-3 space-y-2">
              {[
                "Retention signal insufficient for full public exposure",
                "No fallback plan if onboarding friction spikes",
                "CAC risk without organic acquisition loop",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2 text-xs leading-5 text-white/65">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-400/70" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Link
            href="/new-session"
            className="flex items-center justify-between rounded-2xl border border-cyan-300/25 bg-cyan-300 px-5 py-3.5 transition hover:shadow-[0_0_28px_rgba(103,232,249,0.3)]"
          >
            <span className="text-sm font-bold text-[#061426]">Start New Session</span>
            <ChevronRight className="h-4 w-4 text-[#061426]" />
          </Link>
        </aside>
      </div>

      {/* ── Board member detail cards ── */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Board Analysis</p>
            <h2 className="mt-1.5 text-xl font-semibold">Individual Board Responses</h2>
          </div>
          <Link href="/history" className="flex items-center gap-1 text-xs font-medium text-cyan-300/70 hover:text-cyan-300">
            View history <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {BOARD_DETAILS.map((m) => {
            const vs = voteStyle(m.vote);
            return (
              <div
                key={m.name}
                className={`group rounded-2xl border bg-[#0A1B2E]/70 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(34,211,238,0.07)] ${vs.card}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-300/60">Board Seat</p>
                    <h3 className="mt-1 text-base font-semibold text-white">{m.name}</h3>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${vs.pill}`}>
                    {m.vote}
                  </span>
                </div>

                {/* Confidence bar */}
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div className={`h-full rounded-full ${confColor(m.confidence)}`} style={{ width: `${m.confidence}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-white/65">{m.confidence}%</span>
                </div>

                {/* Rationale */}
                <p className="mt-3.5 text-sm leading-5 text-white/70">{m.rationale}</p>

                {/* Concern */}
                <div className="mt-3.5 flex items-start gap-2 rounded-lg border border-amber-400/15 bg-amber-400/8 px-3 py-2">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/80" />
                  <p className="text-xs leading-5 text-white/60">{m.concern}</p>
                </div>

                {/* Next move */}
                <div className="mt-2.5 flex items-start gap-2">
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300/70" />
                  <p className="text-xs leading-5 text-white/60">{m.nextMove}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Bottom: Action plan + sessions ── */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* Action plan */}
        <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Recommended</p>
              <h2 className="mt-1.5 text-xl font-semibold">Action Plan</h2>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
              <TrendingUp className="h-4 w-4 text-cyan-300" />
            </div>
          </div>

          <ol className="mt-5 space-y-3">
            {ACTION_PLAN.map((step, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 text-[11px] font-semibold text-cyan-300">
                  {i + 1}
                </div>
                <p className="pt-0.5 text-sm leading-6 text-white/70">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Right col: metrics + history */}
        <div className="space-y-4">

          {/* Metrics bar */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-cyan-300/70" />
              <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Decision Metrics</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Confidence",    value: "82%",      color: "text-emerald-300" },
                { label: "Board Votes",   value: "6 / 6",    color: "text-cyan-300"    },
                { label: "Risk Level",    value: "Med-High", color: "text-amber-300"   },
                { label: "Opportunity",   value: "91 pts",   color: "text-cyan-300"    },
                { label: "Capital",       value: "Moderate", color: "text-white/70"    },
                { label: "Complexity",    value: "Medium",   color: "text-white/70"    },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-xl border border-white/7 bg-white/4 px-3 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">{label}</p>
                  <p className={`mt-1.5 text-base font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent sessions */}
          <section className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-300/70" />
                <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">Board Activity</p>
              </div>
              <Link href="/history" className="text-[10px] font-medium text-cyan-300/55 hover:text-cyan-300">
                All sessions →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {RECENT_SESSIONS.map((s) => (
                <div key={s.title} className="flex items-start justify-between gap-3 rounded-xl border border-white/7 bg-white/4 p-3.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white/80">{s.title}</p>
                    <p className="mt-0.5 text-xs text-white/40">{s.type} · {s.date}</p>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${sessionResultStyle(s.result)}`}>
                    {s.result}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

    </div>
  );
}
