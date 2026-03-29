type BoardMemberCardProps = {
  title: string;
};

const roleDescriptions: Record<string, string> = {
  "The Strategist": "Sees the long game, market positioning, and strategic coherence.",
  "The Capitalist": "Pressures the numbers, profitability, and business viability.",
  "The Growth Architect": "Pushes for traction, leverage, and scalable momentum.",
  "The Operator": "Focuses on execution, systems, and operational reality.",
  "The Risk Analyst": "Surfaces downside, fragility, and blind spots before they bite.",
  "The Contrarian": "Challenges consensus and questions the obvious narrative.",
};

export default function BoardMemberCard({ title }: BoardMemberCardProps) {
  return (
    <div className="group rounded-2xl border border-cyan-400/15 bg-white/5 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]">
      <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-200">
        Board seat
      </div>

      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-white/65">
        {roleDescriptions[title] ?? "Strategic perspective"}
      </p>

      <div className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-cyan-300/75">
        Model mapped later
      </div>
    </div>
  );
}