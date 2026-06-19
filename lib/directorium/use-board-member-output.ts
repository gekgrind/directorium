import type { BoardMemberSplineName } from "@/components/directorium/board-members";

export type BoardMemberOutputState = {
  status: "idle" | "loading" | "ready" | "error";
  content: string | null;
  error: string | null;
};

const IDLE_STATE: BoardMemberOutputState = {
  status: "idle",
  content: null,
  error: null,
};

/**
 * Stub hook for fetching an individual board member's AI output.
 *
 * TODO(directorium-backend): wire this to the real data layer.
 *   - Persisted output: read from a `board_member_outputs` row keyed by
 *     (session_id, spline_name) via the REST pattern in
 *     `lib/supabase/server.ts` (service-role + shared-session auth).
 *   - Live generation: stream from a new `app/api/directorium/[name]/route.ts`
 *     handler that fans out to the corresponding model provider.
 *   - Auth: use `getCurrentSharedAuthUser()` from `lib/supabase/server.ts`.
 *   - Schema: not yet defined — coordinate with the Supabase migration step.
 */
export function useBoardMemberOutput(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _splineName: BoardMemberSplineName | null,
): BoardMemberOutputState {
  // TODO(directorium-backend): replace with real fetch keyed on _splineName.
  return IDLE_STATE;
}
