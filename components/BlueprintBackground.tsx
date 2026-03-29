export default function BlueprintBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base */}
      <div className="absolute inset-0 bg-[#061426]" />

      {/* Subtle gradient depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.08),transparent_35%)]" />

      {/* Micro grid (VERY faint) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px",
        }}
      />

      {/* Major grid (bigger squares) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.045) 1px, transparent 1px)
          `,
          backgroundSize: "112px 112px",
        }}
      />

      {/* Soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(0,212,255,0.08),transparent_45%)]" />

      {/* Atmospheric edges */}
      <div className="absolute -left-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-400/5 blur-3xl" />
      <div className="absolute -right-32 bottom-1/3 h-[24rem] w-[24rem] rounded-full bg-sky-400/5 blur-3xl" />

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#061426] via-[#061426]/80 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#061426] via-[#061426]/85 to-transparent" />
    </div>
  );
}