import type { Application } from "@splinetool/runtime";

/**
 * Runtime effects for the hive-mind boardroom Spline scene.
 *
 * Everything here works through the public Spline runtime API
 * (findObjectByName / SPEObject transforms) except screen projection,
 * which reads the internal camera matrices. All internal access is
 * guarded so a runtime update can only disable an effect, never crash
 * the dashboard.
 */

/** Names of the hand-drawn pathway meshes in the Spline file. They are
 * replaced at runtime by the animated NeuralPathways overlay. */
const LEGACY_PATH_NAMES = [
  "Path",
  "Path 2",
  "Path 3",
  "Path 4",
  "Path 5",
  "Path 6",
  "Path 7",
  "Path 8",
  "Path 9",
] as const;

export const CORE_OBJECT_NAME = "core";
export const TORUS_OBJECT_NAME = "Torus";

export function hideLegacyPathMeshes(app: Application): void {
  for (const name of LEGACY_PATH_NAMES) {
    try {
      const obj = app.findObjectByName(name);
      if (obj) obj.visible = false;
    } catch {
      // Object missing from a future scene export — nothing to hide.
    }
  }
}

/** Matches the authored pose: tilt magnitude of the original static
 * rotation (x 0.175, z 0.312), starting phase continuous with it. */
const TORUS_TILT = 0.36;
const TORUS_START_PHASE = Math.atan2(0.312, 0.175);
const TORUS_PRECESSION_SPEED = 0.35; // rad/s — full sweep ~18s

/**
 * Centers the torus on the core and drives a slow gyroscopic
 * precession around it. Returns a cleanup function.
 */
export function startTorusAnimation(app: Application): () => void {
  let frame = 0;
  try {
    const torus = app.findObjectByName(TORUS_OBJECT_NAME);
    const core = app.findObjectByName(CORE_OBJECT_NAME);
    if (!torus) return () => {};

    // "Set perfectly": ring centered on the core intelligence.
    if (core) {
      torus.position.x = core.position.x;
      torus.position.y = core.position.y;
      torus.position.z = core.position.z;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      torus.rotation.x = TORUS_TILT * Math.cos(TORUS_START_PHASE);
      torus.rotation.z = TORUS_TILT * Math.sin(TORUS_START_PHASE);
      return () => {};
    }

    const start = performance.now();
    const tick = (now: number) => {
      const phase =
        TORUS_START_PHASE + ((now - start) / 1000) * TORUS_PRECESSION_SPEED;
      try {
        torus.rotation.x = TORUS_TILT * Math.cos(phase);
        torus.rotation.z = TORUS_TILT * Math.sin(phase);
      } catch {
        return; // proxy went stale (scene disposed) — stop silently
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  } catch {
    // Torus missing — effect simply not applied.
  }
  return () => cancelAnimationFrame(frame);
}

type Matrix4Like = { elements: ArrayLike<number> };
type InternalCamera = {
  projectionMatrix: Matrix4Like;
  matrixWorldInverse: Matrix4Like;
};

export type WorldPoint = { x: number; y: number; z: number };
export type ScreenPoint = { x: number; y: number };

/**
 * Projects a world-space point to normalized [0,1] screen coordinates
 * (origin top-left) using the scene camera. Returns false when the
 * internal camera is unavailable or the point is behind the camera.
 */
export function projectToScreen(
  app: Application,
  world: WorldPoint,
  out: ScreenPoint,
): boolean {
  const cam = (app as unknown as { _camera?: InternalCamera })._camera;
  if (!cam?.projectionMatrix?.elements || !cam.matrixWorldInverse?.elements) {
    return false;
  }
  const pm = cam.projectionMatrix.elements;
  const vm = cam.matrixWorldInverse.elements;

  const vx = vm[0] * world.x + vm[4] * world.y + vm[8] * world.z + vm[12];
  const vy = vm[1] * world.x + vm[5] * world.y + vm[9] * world.z + vm[13];
  const vz = vm[2] * world.x + vm[6] * world.y + vm[10] * world.z + vm[14];

  const cx = pm[0] * vx + pm[4] * vy + pm[8] * vz + pm[12];
  const cy = pm[1] * vx + pm[5] * vy + pm[9] * vz + pm[13];
  const cw = pm[3] * vx + pm[7] * vy + pm[11] * vz + pm[15];
  if (cw <= 0) return false;

  out.x = (cx / cw) * 0.5 + 0.5;
  out.y = 1 - ((cy / cw) * 0.5 + 0.5);
  return true;
}
