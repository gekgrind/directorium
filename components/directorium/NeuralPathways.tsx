"use client";

import { useEffect, useRef } from "react";
import type { Application } from "@splinetool/runtime";
import {
  BOARD_MEMBERS,
  BOARD_MEMBER_NAMES,
  type BoardMemberSplineName,
} from "./board-members";
import {
  CORE_OBJECT_NAME,
  projectToScreen,
  type ScreenPoint,
} from "@/lib/directorium/hive-scene-effects";

/**
 * Animated neural pathways between the core intelligence and each AI
 * brain. Anchored to the live 3D positions (projected every frame), so
 * the links track any camera movement in the Spline scene.
 */

/** Per-member activity level (0..1). Members generating output in a
 * live board session surge their pathway; absent members are idle. */
export type MemberActivity = Partial<Record<BoardMemberSplineName, number>>;

type NeuralPathwaysProps = {
  app: Application;
  activeMember: BoardMemberSplineName | null;
  memberActivity: MemberActivity;
};

/** World-space lift from a brain group's origin to its sphere center. */
const BRAIN_ANCHOR_LIFT = 35;
/** Skip the first stretch of each curve so it emerges from the torus
 * ring instead of overdrawing the core. */
const CURVE_START_T = 0.14;
const MAX_DPR = 2;
const OUTBOUND_PULSES = 2;
const PULSE_PERIOD_S = 2.6;
/** Consecutive projection failures before the overlay disables itself. */
const MAX_FAILURES = 120;
/** First-load reveal: per-path delay and fade duration. */
const INTRO_STAGGER_S = 0.28;
const INTRO_FADE_S = 0.8;

type PathwayState = {
  name: BoardMemberSplineName;
  accent: string;
  /** deterministic curve side: alternate around the ring */
  side: 1 | -1;
  /** smoothed emphasis 0..1 driven by selection state */
  energy: number;
  /** smoothed live-session activity 0..1 */
  activity: number;
  /** accumulated pulse travel so speed changes stay continuous */
  pulsePhase: number;
};

export default function NeuralPathways({
  app,
  activeMember,
  memberActivity,
}: NeuralPathwaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(activeMember);
  const activityRef = useRef(memberActivity);

  useEffect(() => {
    activeRef.current = activeMember;
  }, [activeMember]);

  useEffect(() => {
    activityRef.current = memberActivity;
  }, [memberActivity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const paths: PathwayState[] = BOARD_MEMBER_NAMES.map((name, i) => ({
      name,
      accent: BOARD_MEMBERS[name].accent,
      side: i % 2 === 0 ? 1 : -1,
      energy: 0.7,
      activity: 0,
      pulsePhase: i * 0.17,
    }));

    let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = host.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    const corePoint: ScreenPoint = { x: 0, y: 0 };
    const brainPoint: ScreenPoint = { x: 0, y: 0 };
    let frame = 0;
    let lastNow = performance.now();
    let failures = 0;

    // SPEObject proxies read through to live entities — safe to cache.
    const lookup = (name: string) => {
      try {
        return app.findObjectByName(name);
      } catch {
        return undefined;
      }
    };
    const core = lookup(CORE_OBJECT_NAME);
    const brains = new Map(
      BOARD_MEMBER_NAMES.map((name) => [name, lookup(name)]),
    );
    const introStart = performance.now();

    const draw = (now: number) => {
      const dt = Math.min((now - lastNow) / 1000, 0.1);
      lastNow = now;
      const t = now / 1000;
      const w = canvas.width;
      const h = canvas.height;

      if (!core || !projectToScreen(app, core.position, corePoint)) {
        failures += 1;
        if (failures > MAX_FAILURES) {
          canvas.style.display = "none";
          return; // stop the loop entirely
        }
        frame = requestAnimationFrame(draw);
        return;
      }
      failures = 0;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const cx = corePoint.x * w;
      const cy = corePoint.y * h;
      const active = activeRef.current;

      for (const path of paths) {
        const idx = paths.indexOf(path);
        const brain = brains.get(path.name);
        if (!brain) continue;

        // Staggered first-load reveal, one pathway after another.
        const intro = reducedMotion
          ? 1
          : smoothstep(
              ((now - introStart) / 1000 - idx * INTRO_STAGGER_S) /
                INTRO_FADE_S,
            );
        if (intro <= 0) continue;

        const anchor = {
          x: brain.position.x,
          y: brain.position.y + BRAIN_ANCHOR_LIFT,
          z: brain.position.z,
        };
        if (!projectToScreen(app, anchor, brainPoint)) continue;
        const bx = brainPoint.x * w;
        const by = brainPoint.y * h;

        // Selection emphasis, eased for smooth transitions.
        const target = active === path.name ? 1 : active ? 0.3 : 0.7;
        path.energy += (target - path.energy) * Math.min(1, dt * 5);
        const energy = path.energy;

        // Live-session activity surge (member generating output), eased.
        const targetActivity = activityRef.current[path.name] ?? 0;
        path.activity += (targetActivity - path.activity) * Math.min(1, dt * 3);
        const act = path.activity;

        // Subtle asynchronous "breathing" per pathway.
        const breath = reducedMotion
          ? 1
          : 0.78 + 0.22 * Math.sin(t * 0.7 + idx * 1.05);

        const dx = bx - cx;
        const dy = by - cy;
        const len = Math.hypot(dx, dy) || 1;
        const midX = cx + dx * 0.5 + (-dy / len) * len * 0.09 * path.side;
        const midY = cy + dy * 0.5 + (dx / len) * len * 0.09 * path.side;

        const startX = quad(cx, midX, bx, CURVE_START_T);
        const startY = quad(cy, midY, by, CURVE_START_T);

        // Base filament with a core->accent gradient and soft glow.
        const glowBoost = 1 + 0.35 * act;
        const gradient = ctx.createLinearGradient(cx, cy, bx, by);
        gradient.addColorStop(0, withAlpha("#9BEBFF", 0.06 * energy * intro));
        gradient.addColorStop(
          0.4,
          withAlpha(path.accent, 0.55 * energy * breath * glowBoost * intro),
        );
        gradient.addColorStop(
          1,
          withAlpha(path.accent, 0.34 * energy * breath * glowBoost * intro),
        );
        ctx.strokeStyle = gradient;
        ctx.lineWidth = (1.4 + 1.4 * energy + 0.6 * act) * dpr;
        ctx.lineCap = "round";
        ctx.shadowColor = path.accent;
        ctx.shadowBlur = 9 * dpr * energy * glowBoost;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        // Quadratic segment from CURVE_START_T to 1 (split control point).
        ctx.quadraticCurveTo(
          lerp(midX, bx, CURVE_START_T),
          lerp(midY, by, CURVE_START_T),
          bx,
          by,
        );
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Terminal node glint at the brain.
        drawNode(
          ctx,
          bx,
          by,
          (2.4 + 2 * energy + 1.5 * act) * dpr,
          path.accent,
          0.8 * energy * breath * intro,
        );

        if (reducedMotion) continue;

        // Traveling pulses: outbound from the core, plus one inbound on
        // alternating paths — the hive mind talks both ways. Phase is
        // integrated so speed changes (selection, activity) stay smooth.
        const speedScale =
          (active === path.name ? 1.55 : 1) * (1 + 1.1 * act);
        path.pulsePhase += (dt * speedScale) / PULSE_PERIOD_S;
        const pulseGlow = energy * (1 + 0.35 * act) * intro;
        for (let p = 0; p < OUTBOUND_PULSES; p++) {
          const phase = path.pulsePhase + p / OUTBOUND_PULSES;
          const pt = phase - Math.floor(phase);
          drawPulse(ctx, cx, cy, midX, midY, bx, by, pt, path.accent, pulseGlow, dpr);
        }
        if (path.side === 1) {
          const phase = path.pulsePhase / 1.35 + 0.5;
          const pt = 1 - (phase - Math.floor(phase));
          drawPulse(ctx, cx, cy, midX, midY, bx, by, pt, "#9BEBFF", pulseGlow * 0.6, dpr);
        }
      }

      ctx.globalCompositeOperation = "source-over";
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [app]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Clamped smoothstep easing over [0,1]. */
function smoothstep(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

/** Point on a quadratic bezier a -> ctrl -> b. */
function quad(a: number, ctrl: number, b: number, t: number): number {
  const inv = 1 - t;
  return inv * inv * a + 2 * inv * t * ctrl + t * t * b;
}

function withAlpha(hex: string, alpha: number): string {
  const clamped = Math.max(0, Math.min(1, alpha));
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${clamped.toFixed(3)})`;
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string,
  alpha: number,
) {
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
  glow.addColorStop(0, withAlpha(color, alpha));
  glow.addColorStop(1, withAlpha(color, 0));
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawPulse(
  ctx: CanvasRenderingContext2D,
  ax: number,
  ay: number,
  ctrlX: number,
  ctrlY: number,
  bx: number,
  by: number,
  t: number,
  color: string,
  energy: number,
  dpr: number,
) {
  if (t < CURVE_START_T) return;
  const x = quad(ax, ctrlX, bx, t);
  const y = quad(ay, ctrlY, by, t);
  // Fade in/out at the ends of the run.
  const fade = Math.sin(Math.PI * ((t - CURVE_START_T) / (1 - CURVE_START_T)));
  const alpha = 0.85 * fade * energy;
  const radius = (2.2 + 1.4 * energy) * dpr;
  const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.6);
  glow.addColorStop(0, withAlpha("#FFFFFF", alpha * 0.9));
  glow.addColorStop(0.35, withAlpha(color, alpha));
  glow.addColorStop(1, withAlpha(color, 0));
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, radius * 2.6, 0, Math.PI * 2);
  ctx.fill();
}
