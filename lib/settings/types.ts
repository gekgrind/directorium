export const MODEL_OPTIONS = [
  "OpenAI",
  "Claude",
  "Gemini",
  "Grok",
  "Perplexity",
  "Mistral",
] as const;

export const TONE_OPTIONS = [
  "Direct",
  "Strategic",
  "Supportive",
  "Analytical",
  "Contrarian",
] as const;

export const BOARD_ROLE_OPTIONS = [
  "The Strategist",
  "The Capitalist",
  "The Growth Architect",
  "The Operator",
  "The Risk Analyst",
  "The Contrarian",
] as const;

export const EXPORT_FORMAT_OPTIONS = [
  "PDF Brief",
  "Markdown",
  "Notion Export",
  "CSV Summary",
] as const;

export type ToggleDefaults = {
  autoContrarian: boolean;
  autoExport: boolean;
  detailedSynthesis: boolean;
  disagreementScore: boolean;
};

export type UserSettings = {
  user_id: string;
  models: string[];
  tone: string[];
  board_roles: string[];
  export_formats: string[];
  defaults: ToggleDefaults;
  updated_at?: string;
};

export const DEFAULT_SETTINGS_INPUT = {
  models: [...MODEL_OPTIONS],
  tone: ["Strategic", "Direct"],
  board_roles: [...BOARD_ROLE_OPTIONS],
  export_formats: [...EXPORT_FORMAT_OPTIONS],
  defaults: {
    autoContrarian: true,
    autoExport: false,
    detailedSynthesis: true,
    disagreementScore: true,
  },
} satisfies Omit<UserSettings, "user_id" | "updated_at">;

const unique = (values: string[]) => [...new Set(values)];

const filterByAllowed = (values: unknown, allowed: readonly string[]) => {
  if (!Array.isArray(values)) return [];
  return unique(values.filter((value): value is string => typeof value === "string" && allowed.includes(value)));
};

export const sanitizeSettingsInput = (
  input: unknown,
): Omit<UserSettings, "user_id" | "updated_at"> => {
  const record = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const defaults = (record.defaults && typeof record.defaults === "object"
    ? record.defaults
    : {}) as Record<string, unknown>;

  const models = filterByAllowed(record.models, MODEL_OPTIONS);
  const tone = filterByAllowed(record.tone, TONE_OPTIONS);
  const boardRoles = filterByAllowed(record.board_roles, BOARD_ROLE_OPTIONS);
  const exportFormats = filterByAllowed(record.export_formats, EXPORT_FORMAT_OPTIONS);

  return {
    models: models.length > 0 ? models : [...DEFAULT_SETTINGS_INPUT.models],
    tone: tone.length > 0 ? tone : [...DEFAULT_SETTINGS_INPUT.tone],
    board_roles: boardRoles.length > 0 ? boardRoles : [...DEFAULT_SETTINGS_INPUT.board_roles],
    export_formats: exportFormats.length > 0 ? exportFormats : [...DEFAULT_SETTINGS_INPUT.export_formats],
    defaults: {
      autoContrarian:
        typeof defaults.autoContrarian === "boolean"
          ? defaults.autoContrarian
          : DEFAULT_SETTINGS_INPUT.defaults.autoContrarian,
      autoExport:
        typeof defaults.autoExport === "boolean"
          ? defaults.autoExport
          : DEFAULT_SETTINGS_INPUT.defaults.autoExport,
      detailedSynthesis:
        typeof defaults.detailedSynthesis === "boolean"
          ? defaults.detailedSynthesis
          : DEFAULT_SETTINGS_INPUT.defaults.detailedSynthesis,
      disagreementScore:
        typeof defaults.disagreementScore === "boolean"
          ? defaults.disagreementScore
          : DEFAULT_SETTINGS_INPUT.defaults.disagreementScore,
    },
  };
};
