"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_SETTINGS_INPUT,
  sanitizeSettingsInput,
  type UserSettings,
} from "@/lib/settings/types";

type State = {
  settings: Omit<UserSettings, "user_id" | "updated_at">;
  isLoading: boolean;
  isSaving: boolean;
  loadError: string | null;
  saveError: string | null;
  saveSuccess: string | null;
};

const INITIAL_STATE: State = {
  settings: DEFAULT_SETTINGS_INPUT,
  isLoading: true,
  isSaving: false,
  loadError: null,
  saveError: null,
  saveSuccess: null,
};

export const useUserSettings = () => {
  const [state, setState] = useState<State>(INITIAL_STATE);

  const load = useCallback(async () => {
    setState((previous) => ({ ...previous, isLoading: true, loadError: null }));

    try {
      const response = await fetch("/api/settings", { cache: "no-store" });
      const payload = (await response.json()) as {
        settings?: unknown;
        error?: string;
      };

      if (!response.ok || !payload.settings) {
        throw new Error(payload.error ?? "Unable to load settings.");
      }

      setState((previous) => ({
        ...previous,
        settings: sanitizeSettingsInput(payload.settings),
        isLoading: false,
        loadError: null,
      }));
    } catch (error) {
      setState((previous) => ({
        ...previous,
        isLoading: false,
        loadError: error instanceof Error ? error.message : "Unable to load settings.",
      }));
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const setSettings = useCallback(
    (updater: (current: State["settings"]) => State["settings"]) => {
      setState((previous) => ({
        ...previous,
        settings: updater(previous.settings),
        saveSuccess: null,
      }));
    },
    [],
  );

  const save = useCallback(async () => {
    setState((previous) => ({
      ...previous,
      isSaving: true,
      saveError: null,
      saveSuccess: null,
    }));

    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.settings),
      });

      const payload = (await response.json()) as {
        settings?: unknown;
        error?: string;
      };

      if (!response.ok || !payload.settings) {
        throw new Error(payload.error ?? "Unable to save settings.");
      }

      setState((previous) => ({
        ...previous,
        settings: sanitizeSettingsInput(payload.settings),
        isSaving: false,
        saveError: null,
        saveSuccess: "Settings saved.",
      }));
    } catch (error) {
      setState((previous) => ({
        ...previous,
        isSaving: false,
        saveError: error instanceof Error ? error.message : "Unable to save settings.",
      }));
    }
  }, [state.settings]);

  return useMemo(
    () => ({
      ...state,
      setSettings,
      save,
      reload: load,
    }),
    [load, save, setSettings, state],
  );
};
