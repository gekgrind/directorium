export const ALL_MODELS = [
  "OpenAI",
  "Claude",
  "Gemini",
  "Grok",
  "Perplexity",
  "Mistral",
] as const;

export const ALL_BOARD_ROLES = [
  "The Strategist",
  "The Capitalist",
  "The Growth Architect",
  "The Operator",
  "The Risk Analyst",
  "The Contrarian",
] as const;

export const ALL_EXPORT_FORMATS = [
  "PDF Brief",
  "Markdown",
  "Notion Export",
  "CSV Summary",
] as const;

export const ALL_TONE_OPTIONS = [
  "Direct",
  "Strategic",
  "Supportive",
  "Analytical",
  "Contrarian",
] as const;

export type ModelName = (typeof ALL_MODELS)[number];
export type BoardRoleName = (typeof ALL_BOARD_ROLES)[number];
export type ExportFormat = (typeof ALL_EXPORT_FORMATS)[number];
export type ToneOption = (typeof ALL_TONE_OPTIONS)[number];

export type DefaultTone = readonly ToneOption[];

export type DirectoriumSettings = {
  enabledModels: readonly ModelName[];
  defaultTone: DefaultTone;
  activeBoardRoles: readonly BoardRoleName[];
  defaultExportOptions: readonly ExportFormat[];
  autoContrarian: boolean;
  autoExport: boolean;
  detailedSynthesis: boolean;
  disagreementScore: boolean;
};

const FALLBACK_SETTINGS: DirectoriumSettings = {
  enabledModels: ALL_MODELS,
  defaultTone: ["Strategic", "Direct"],
  activeBoardRoles: ALL_BOARD_ROLES,
  defaultExportOptions: ALL_EXPORT_FORMATS,
  autoContrarian: true,
  autoExport: false,
  detailedSynthesis: true,
  disagreementScore: true,
};

// Reuses the settings fetch layer for app routes while keeping a safe fallback.
export async function getCurrentUserSettings(): Promise<DirectoriumSettings> {
  const saved = await fetchSavedSettings();

  return {
    enabledModels: sanitizeList(saved.enabledModels, ALL_MODELS, FALLBACK_SETTINGS.enabledModels),
    defaultTone: sanitizeList(saved.defaultTone, ALL_TONE_OPTIONS, FALLBACK_SETTINGS.defaultTone),
    activeBoardRoles: sanitizeList(saved.activeBoardRoles, ALL_BOARD_ROLES, FALLBACK_SETTINGS.activeBoardRoles),
    defaultExportOptions: sanitizeList(saved.defaultExportOptions, ALL_EXPORT_FORMATS, FALLBACK_SETTINGS.defaultExportOptions),
    autoContrarian: saved.autoContrarian ?? FALLBACK_SETTINGS.autoContrarian,
    autoExport: saved.autoExport ?? FALLBACK_SETTINGS.autoExport,
    detailedSynthesis: saved.detailedSynthesis ?? FALLBACK_SETTINGS.detailedSynthesis,
    disagreementScore: saved.disagreementScore ?? FALLBACK_SETTINGS.disagreementScore,
  };
}

export function getEffectiveBoardRoles(settings: DirectoriumSettings): readonly BoardRoleName[] {
  if (settings.autoContrarian && !settings.activeBoardRoles.includes("The Contrarian")) {
    return [...settings.activeBoardRoles, "The Contrarian"];
  }

  return settings.activeBoardRoles;
}

type SavedSettingsPayload = Partial<DirectoriumSettings>;

async function fetchSavedSettings(): Promise<SavedSettingsPayload> {
  // Existing data layer placeholder from prior task; values mimic persisted user settings.
  return {
    enabledModels: ALL_MODELS,
    defaultTone: ["Strategic", "Direct"],
    activeBoardRoles: ALL_BOARD_ROLES,
    defaultExportOptions: ["PDF Brief", "Markdown"],
    autoContrarian: true,
    autoExport: false,
    detailedSynthesis: true,
    disagreementScore: true,
  };
}

function sanitizeList<const T extends readonly string[]>(
  candidate: readonly string[] | undefined,
  allowed: T,
  fallback: readonly T[number][],
): readonly T[number][] {
  if (!candidate || candidate.length === 0) {
    return fallback;
  }

  const allowedSet = new Set<string>(allowed);
  const filtered = candidate.filter((value): value is T[number] => allowedSet.has(value));

  return filtered.length > 0 ? filtered : fallback;
}
