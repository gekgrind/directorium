"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { SplineEvent } from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import {
  isBoardMemberName,
  type BoardMemberSplineName,
} from "./board-members";
import NeuralPathways, { type MemberActivity } from "./NeuralPathways";
import {
  hideLegacyPathMeshes,
  startTorusAnimation,
} from "@/lib/directorium/hive-scene-effects";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

const SCENE_URL =
  "https://prod.spline.design/N5U3zPEEuVA6yauh/scene.splinecode";

type HiveSceneProps = {
  activeMember: BoardMemberSplineName | null;
  memberActivity: MemberActivity;
  onMemberClick: (name: BoardMemberSplineName) => void;
  onDeselect: () => void;
};

export default function HiveScene({
  activeMember,
  memberActivity,
  onMemberClick,
  onDeselect,
}: HiveSceneProps) {
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    if (!app) return;
    hideLegacyPathMeshes(app);
    return startTorusAnimation(app);
  }, [app]);

  const handleMouseDown = (event: SplineEvent) => {
    const name = event.target?.name;
    if (isBoardMemberName(name)) {
      onMemberClick(name);
    } else {
      onDeselect();
    }
  };

  return (
    <div className="relative h-full w-full">
      {!app && <SceneSkeleton />}
      <Spline
        scene={SCENE_URL}
        onLoad={setApp}
        onSplineMouseDown={handleMouseDown}
        style={{
          width: "100%",
          height: "100%",
          opacity: app ? 1 : 0,
          transition: "opacity 400ms ease-out",
        }}
      />
      {app && (
        <NeuralPathways
          app={app}
          activeMember={activeMember}
          memberActivity={memberActivity}
        />
      )}
    </div>
  );
}

function SceneSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#050A1A]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full border border-cyan-300/30" />
          <div className="absolute inset-2 rounded-full border border-cyan-300/50" />
          <div className="absolute inset-5 rounded-full bg-cyan-300/40 blur-sm" />
        </div>
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-cyan-300/80">
          Convening the board
        </p>
      </div>
    </div>
  );
}
