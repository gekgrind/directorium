import Link from "next/link";
import { Check, ChevronRight, CreditCard, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$19/mo",
    description: "For founders getting started with structured decision support.",
    features: [
      "Single-user workspace",
      "Basic board sessions",
      "Session history",
      "Limited exports",
    ],
    current: false,
  },
  {
    name: "Founder Pro",
    price: "$49/mo",
    description: "For founders who want full multi-model boardroom firepower.",
    features: [
      "6-model board access",
      "Advanced synthesis",
      "Premium exports",
      "Board composition controls",
      "Priority features",
    ],
    current: true,
  },
  {
    name: "Scale",
    price: "$99/mo",
    description: "For teams, operators, and multi-workspace strategy workflows.",
    features: [
      "Everything in Founder Pro",
      "Shared workspaces",
      "Team collaboration",
      "Advanced permissions",
      "Expanded export options",
    ],
    current: false,
  },
];

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 text-white">
      <header className="rounded-2xl border border-cyan-400/15 bg-[#0A1B2E]/70 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
              Billing & Plan
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Manage your plan
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                View your current plan, compare upgrade options, and shape how much
                strategic horsepower your boardroom gets.
              </p>
            </div>
          </div>

          <Link
            href="/settings"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-cyan-200"
          >
            Back to Settings
            <ChevronRight size={16} />
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-cyan-300/14 to-white/5 p-6 backdrop-blur-sm md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200">
              Current plan
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Founder Pro</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75">
              You currently have access to multi-model board sessions, premium exports,
              advanced decision framing, and deeper board customization.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#061426] transition hover:shadow-[0_0_30px_rgba(103,232,249,0.25)]"
            >
              Upgrade Plan
              <Sparkles size={16} />
            </button>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-cyan-300/30 hover:text-cyan-200"
            >
              Manage Billing
              <CreditCard size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-6 backdrop-blur-sm ${
              plan.current
                ? "border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_30px_rgba(103,232,249,0.08)]"
                : "border-cyan-400/15 bg-[#0A1B2E]/70"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                  {plan.current ? "Current plan" : "Available plan"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">{plan.name}</h2>
              </div>

              {plan.current && (
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  Active
                </span>
              )}
            </div>

            <p className="mt-4 text-3xl font-semibold">{plan.price}</p>
            <p className="mt-3 text-sm leading-7 text-white/70">{plan.description}</p>

            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                    <Check size={12} />
                  </div>
                  <span className="text-sm leading-6 text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button
                type="button"
                className={`inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  plan.current
                    ? "border border-white/10 bg-white/5 text-white/80 hover:border-cyan-300/30 hover:text-cyan-200"
                    : "border border-cyan-300/25 bg-cyan-300 text-[#061426] hover:shadow-[0_0_30px_rgba(103,232,249,0.25)]"
                }`}
              >
                {plan.current ? "Current Plan" : `Choose ${plan.name}`}
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}