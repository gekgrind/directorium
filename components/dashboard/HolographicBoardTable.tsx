const CX = 350;
const CY = 290;
const RING_R = 165;
const LABEL_R = 226;

type Member = {
  shortName: string;
  vote: string;
  confidence: number;
  angle: number;
  voteColor: string;
  nodeColor: string;
};

const members: Member[] = [
  { shortName: "STRATEGIST",    vote: "Approve",        confidence: 87, angle: -90,  voteColor: "#10B981", nodeColor: "#36ECDE" },
  { shortName: "OPERATOR",      vote: "Revise",         confidence: 72, angle: -30,  voteColor: "#F59E0B", nodeColor: "#00D4FF" },
  { shortName: "FIN. ANALYST",  vote: "Approve",        confidence: 81, angle:  30,  voteColor: "#10B981", nodeColor: "#36ECDE" },
  { shortName: "GROWTH ADVISOR",vote: "Approve",        confidence: 91, angle:  90,  voteColor: "#10B981", nodeColor: "#67E8F9" },
  { shortName: "RISK OFFICER",  vote: "Needs Data",     confidence: 58, angle: 150,  voteColor: "#60A5FA", nodeColor: "#3B82F6" },
  { shortName: "CUST. ADVOCATE",vote: "Revise",         confidence: 76, angle: 210,  voteColor: "#F59E0B", nodeColor: "#00D4FF" },
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polar(cx: number, cy: number, r: number, deg: number) {
  return { x: cx + r * Math.cos(toRad(deg)), y: cy + r * Math.sin(toRad(deg)) };
}

function confArcPath(cx: number, cy: number, r: number, pct: number): string {
  const startDeg = -90;
  const endDeg = startDeg + 360 * (pct / 100);
  const s = polar(cx, cy, r, startDeg);
  const e = polar(cx, cy, r, endDeg);
  const large = pct > 50 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function anchor(x: number): "middle" | "start" | "end" {
  if (Math.abs(x - CX) < 30) return "middle";
  return x > CX ? "start" : "end";
}

export default function HolographicBoardTable() {
  return (
    <svg
      viewBox="0 0 700 580"
      className="w-full max-w-[580px] mx-auto block"
      style={{ filter: "drop-shadow(0 0 30px rgba(0,212,255,0.1))" }}
      aria-label="AI Board of Directors holographic table"
    >
      <defs>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0,212,255,0.18)" />
          <stop offset="100%" stopColor="rgba(4,14,28,0.96)" />
        </radialGradient>
        <radialGradient id="nodeGlow0" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(54,236,222,0.25)" />
          <stop offset="100%" stopColor="rgba(54,236,222,0)" />
        </radialGradient>
      </defs>

      {/* ── Outer decorative rings ── */}
      <circle cx={CX} cy={CY} r={218} fill="none" stroke="rgba(0,212,255,0.05)" strokeWidth="1" strokeDasharray="3 9" />
      <circle cx={CX} cy={CY} r={202} fill="none" stroke="rgba(54,236,222,0.07)" strokeWidth="0.75" />

      {/* ── Animated pulse rings ── */}
      {([0, 1, 2] as const).map((i) => (
        <circle
          key={`pr${i}`}
          cx={CX} cy={CY}
          r={RING_R + 8 + i * 14}
          fill="none"
          stroke="rgba(0,212,255,0.11)"
          strokeWidth="1"
          style={{
            animation: `board-pulse ${2.5 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}

      {/* ── Main board ring ── */}
      <circle cx={CX} cy={CY} r={RING_R} fill="none" stroke="rgba(0,212,255,0.38)" strokeWidth="1.5" />

      {/* ── Inner guide rings ── */}
      <circle cx={CX} cy={CY} r={108} fill="none" stroke="rgba(0,212,255,0.13)" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx={CX} cy={CY} r={78}  fill="none" stroke="rgba(54,236,222,0.09)" strokeWidth="0.75" />

      {/* ── Segment dividers between nodes ── */}
      {members.map((m, i) => {
        const divAngle = m.angle + 30;
        const inn = polar(CX, CY, 112, divAngle);
        const out = polar(CX, CY, RING_R, divAngle);
        return (
          <line key={`sd${i}`}
            x1={inn.x} y1={inn.y} x2={out.x} y2={out.y}
            stroke="rgba(0,212,255,0.1)" strokeWidth="0.5"
          />
        );
      })}

      {/* ── Data lines from core to each node ── */}
      {members.map((m, i) => {
        const inn = polar(CX, CY, 80, m.angle);
        const out = polar(CX, CY, RING_R - 18, m.angle);
        return (
          <line key={`dl${i}`}
            x1={inn.x} y1={inn.y} x2={out.x} y2={out.y}
            stroke={m.nodeColor} strokeWidth="0.75"
            style={{
              opacity: 0.25,
              animation: "board-data-pulse 3s ease-in-out infinite",
              animationDelay: `${i * 0.5}s`,
            }}
          />
        );
      })}

      {/* ── Orbiting particles ── */}
      <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: "board-orbit 12s linear infinite" }}>
        <circle cx={CX + RING_R + 22} cy={CY} r={3.5} fill="rgba(54,236,222,0.85)" />
      </g>
      <g style={{ transformOrigin: `${CX}px ${CY}px`, animation: "board-orbit 20s linear infinite reverse" }}>
        <circle cx={CX + RING_R + 22} cy={CY} r={2} fill="rgba(0,212,255,0.55)" />
      </g>

      {/* ── Decision Core ── */}
      <circle cx={CX} cy={CY} r={74}
        fill="url(#coreGrad)"
        stroke="rgba(0,212,255,0.4)"
        strokeWidth="1.5"
        style={{ animation: "board-core-glow 3s ease-in-out infinite" }}
      />
      <circle cx={CX} cy={CY} r={59} fill="rgba(6,20,38,0.92)" stroke="rgba(54,236,222,0.18)" strokeWidth="0.75" />
      <circle cx={CX} cy={CY} r={49} fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="0.5" strokeDasharray="2 5" />

      <text x={CX} y={CY - 15} textAnchor="middle" fill="rgba(54,236,222,0.95)" fontSize="9" fontWeight="700" letterSpacing="2.5">DECISION</text>
      <text x={CX} y={CY -  3} textAnchor="middle" fill="rgba(54,236,222,0.95)" fontSize="9" fontWeight="700" letterSpacing="2.5">CORE</text>
      <text x={CX} y={CY + 11} textAnchor="middle" fill="rgba(0,212,255,0.5)" fontSize="6.5" letterSpacing="1.5">6 ACTIVE SEATS</text>

      {/* ── Board member nodes ── */}
      {members.map((m, i) => {
        const np = polar(CX, CY, RING_R, m.angle);
        const lp = polar(CX, CY, LABEL_R, m.angle);
        const ta  = anchor(lp.x);

        return (
          <g key={`node${i}`}>
            {/* Aura glow */}
            <circle cx={np.x} cy={np.y} r={22} fill={`${m.voteColor}18`} />

            {/* Confidence progress arc */}
            <path
              d={confArcPath(np.x, np.y, 16, m.confidence)}
              fill="none"
              stroke={m.voteColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />

            {/* Node ring */}
            <circle cx={np.x} cy={np.y} r={12} fill="rgba(4,14,28,0.92)" stroke={m.nodeColor} strokeWidth="1.5" strokeOpacity="0.75" />

            {/* Node inner fill */}
            <circle cx={np.x} cy={np.y} r={7} fill={`${m.nodeColor}22`} />

            {/* Node center dot */}
            <circle cx={np.x} cy={np.y} r={3.5} fill={m.nodeColor} fillOpacity="0.9" />

            {/* Label: member name */}
            <text x={lp.x} y={lp.y - 6} textAnchor={ta}
              fill="rgba(245,251,255,0.88)" fontSize="7.5" fontWeight="600" letterSpacing="0.8">
              {m.shortName}
            </text>

            {/* Label: vote + confidence */}
            <text x={lp.x} y={lp.y + 6} textAnchor={ta}
              fill={m.voteColor} fontSize="6.5" letterSpacing="0.5">
              {m.vote} · {m.confidence}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}
