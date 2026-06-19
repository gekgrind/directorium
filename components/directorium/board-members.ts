export type BoardMemberSplineName =
  | "claude"
  | "gemini"
  | "perplexity"
  | "chatgpt"
  | "mistral"
  | "grok";

export type BoardMember = {
  splineName: BoardMemberSplineName;
  persona: string;
  model: string;
  role: string;
  accent: string;
};

export const BOARD_MEMBERS: Record<BoardMemberSplineName, BoardMember> = {
  claude: {
    splineName: "claude",
    persona: "Axiom",
    model: "Claude",
    role: "Principle / reasoning",
    accent: "#00D4FF",
  },
  gemini: {
    splineName: "gemini",
    persona: "Ledger",
    model: "Gemini",
    role: "Data / analysis",
    accent: "#4F8CFF",
  },
  perplexity: {
    splineName: "perplexity",
    persona: "Velocity",
    model: "Perplexity",
    role: "Research / live information",
    accent: "#00B4A0",
  },
  chatgpt: {
    splineName: "chatgpt",
    persona: "Forge",
    model: "OpenAI",
    role: "Build / execution",
    accent: "#19C37D",
  },
  mistral: {
    splineName: "mistral",
    persona: "Sentinel",
    model: "Mistral",
    role: "Risk / guardrails",
    accent: "#FF6B6B",
  },
  grok: {
    splineName: "grok",
    persona: "Paradox",
    model: "Grok",
    role: "Contrarian / devil's advocate",
    accent: "#FFD166",
  },
};

export const BOARD_MEMBER_NAMES = Object.keys(
  BOARD_MEMBERS,
) as BoardMemberSplineName[];

export const isBoardMemberName = (
  name: string | undefined | null,
): name is BoardMemberSplineName =>
  !!name && (BOARD_MEMBER_NAMES as string[]).includes(name);
