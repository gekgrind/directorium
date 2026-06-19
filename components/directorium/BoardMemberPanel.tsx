"use client";

import { useEffect } from "react";
import type { BoardMember } from "./board-members";
import { useBoardMemberOutput } from "@/lib/directorium/use-board-member-output";

type BoardMemberPanelProps = {
  member: BoardMember | null;
  onClose: () => void;
};

export default function BoardMemberPanel({
  member,
  onClose,
}: BoardMemberPanelProps) {
  const output = useBoardMemberOutput(member?.splineName ?? null);

  useEffect(() => {
    if (!member) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [member, onClose]);

  const isOpen = !!member;

  return (
    <aside
      aria-hidden={!isOpen}
      aria-label={member ? `${member.persona} board member panel` : undefined}
      className={`pointer-events-none fixed inset-y-0 right-0 z-40 flex w-full max-w-md transform flex-col p-4 transition-transform duration-300 ease-out sm:p-6 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {member && (
        <div
          className="pointer-events-auto flex h-full flex-col overflow-hidden rounded-2xl border bg-[#0A1B2E]/85 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          style={{ borderColor: `${member.accent}40` }}
        >
          <header
            className="flex items-start justify-between gap-4 border-b border-white/10 p-6"
            style={{
              background: `linear-gradient(180deg, ${member.accent}1A 0%, transparent 100%)`,
            }}
          >
            <div className="min-w-0 space-y-2">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{
                  borderColor: `${member.accent}40`,
                  backgroundColor: `${member.accent}1A`,
                  color: member.accent,
                }}
              >
                Board seat
              </div>
              <h2 className="truncate text-2xl font-semibold text-white">
                {member.persona}
              </h2>
              <p className="text-sm text-white/65">
                {member.model} · {member.role}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close panel"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-cyan-300/30 hover:text-cyan-200"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            <section className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Role on the board
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                {member.role}
              </p>
            </section>

            <section className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-300/80">
                Latest output
              </p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                {output.status === "loading" && "Generating response…"}
                {output.status === "error" &&
                  (output.error ?? "Something went wrong.")}
                {output.status === "ready" && output.content}
                {output.status === "idle" &&
                  "No output yet for this session."}
              </p>
            </section>
          </div>
        </div>
      )}
    </aside>
  );
}
