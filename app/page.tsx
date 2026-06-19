"use client";

import { useCallback, useState } from "react";
import HiveScene from "@/components/directorium/HiveScene";
import BoardMemberPanel from "@/components/directorium/BoardMemberPanel";
import {
  BOARD_MEMBERS,
  type BoardMemberSplineName,
} from "@/components/directorium/board-members";

export default function DirectoriumDashboardPage() {
  const [activeMember, setActiveMember] =
    useState<BoardMemberSplineName | null>(null);

  const handleMemberClick = useCallback((name: BoardMemberSplineName) => {
    setActiveMember(name);
  }, []);

  const handleDeselect = useCallback(() => {
    setActiveMember(null);
  }, []);

  const member = activeMember ? BOARD_MEMBERS[activeMember] : null;

  return (
    <div
      className="relative -mx-4 -my-6 h-[calc(100vh-9rem)] overflow-hidden rounded-2xl border border-white/5 sm:-mx-6 md:-mx-10 md:-my-10 md:h-[calc(100vh-7rem)]"
      style={{
        background:
          "radial-gradient(ellipse at center, #11161F 0%, #090C12 55%, #04060A 100%)",
      }}
    >
      <HiveScene
        onMemberClick={handleMemberClick}
        onDeselect={handleDeselect}
      />

      {member && (
        <div className="pointer-events-none absolute left-4 top-4 z-30 rounded-full border border-cyan-300/30 bg-[#0A1B2E]/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-md">
          Selected: {member.persona}
        </div>
      )}

      <BoardMemberPanel member={member} onClose={handleDeselect} />
    </div>
  );
}
