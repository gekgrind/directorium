"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, MeshWobbleMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── Constants ─────────────────────────────────────────────────────────────

const AGENT_COLORS: Record<string, string> = {
  Axiom: "#00D4FF",
  Ledger: "#4285F4",
  Velocity: "#FF6B35",
  Forge: "#00A67E",
  Sentinel: "#8B5CF6",
  Paradox: "#FF6B6B",
};

const BOARD_MEMBERS = [
  { name: "Axiom", role: "Strategist", position: [0, 0, -320] as [number, number, number], color: "#00D4FF" },
  { name: "Ledger", role: "Capitalist", position: [277, 0, -160] as [number, number, number], color: "#4285F4" },
  { name: "Velocity", role: "Growth Architect", position: [277, 0, 160] as [number, number, number], color: "#FF6B35" },
  { name: "Forge", role: "Operator", position: [0, 0, 320] as [number, number, number], color: "#00A67E" },
  { name: "Sentinel", role: "Risk Analyst", position: [-277, 0, 160] as [number, number, number], color: "#8B5CF6" },
  { name: "Paradox", role: "Contrarian", position: [-277, 0, -160] as [number, number, number], color: "#FF6B6B" },
];

// Evenly distribute 24 nodes on a sphere surface via Fibonacci spiral
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(
      new THREE.Vector3(r * Math.cos(theta) * radius, y * radius, r * Math.sin(theta) * radius)
    );
  }
  return points;
}

// Nearest-neighbor pairs for arc connections
function buildArcPairs(points: THREE.Vector3[], neighborsPerNode = 3): [number, number][] {
  const pairs: [number, number][] = [];
  const seen = new Set<string>();
  for (let i = 0; i < points.length; i++) {
    const distances = points
      .map((p, j) => ({ j, d: points[i].distanceTo(p) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, neighborsPerNode);
    for (const { j } of distances) {
      const key = [Math.min(i, j), Math.max(i, j)].join("-");
      if (!seen.has(key)) {
        seen.add(key);
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
}

// ─── Core Sphere ───────────────────────────────────────────────────────────

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = 1 + 0.15 * Math.sin((t / 3) * Math.PI * 2);
    if (meshRef.current) meshRef.current.scale.setScalar(s);
    if (matRef.current) matRef.current.emissiveIntensity = 0.8 + 0.2 * Math.sin((t / 3) * Math.PI * 2);
  });

  return (
    <mesh ref={meshRef} name="CoreSphere" position={[0, 80, 0]}>
      <sphereGeometry args={[40, 64, 64]} />
      <meshStandardMaterial
        ref={matRef}
        color="#E8F8FF"
        emissive="#00D4FF"
        emissiveIntensity={1}
        roughness={0}
        metalness={0.1}
      />
    </mesh>
  );
}

// ─── Node Lattice ──────────────────────────────────────────────────────────

const NODE_COLORS = [
  "#00D4FF", "#00D4FF", "#00D4FF", "#00D4FF",
  "#4285F4", "#4285F4", "#4285F4", "#4285F4",
  "#FF6B35", "#FF6B35", "#FF6B35", "#FF6B35",
  "#00A67E", "#00A67E", "#00A67E", "#00A67E",
  "#8B5CF6", "#8B5CF6", "#8B5CF6", "#8B5CF6",
  "#FF6B6B", "#FF6B6B", "#FF6B6B", "#FF6B6B",
];

function NodeLattice({ positions }: { positions: THREE.Vector3[] }) {
  return (
    <>
      {positions.map((pos, i) => {
        const delay = i * 100; // 0–2300ms stagger in ms
        const duration = 1500 + (i % 10) * 100; // 1500–2400ms
        return (
          <NodeSphere
            key={i}
            position={[pos.x, pos.y + 80, pos.z]}
            color={NODE_COLORS[i]}
            name={`Node_${String(i + 1).padStart(2, "0")}`}
            delay={delay}
            duration={duration}
          />
        );
      })}
    </>
  );
}

function NodeSphere({
  position,
  color,
  name,
  delay,
  duration,
}: {
  position: [number, number, number];
  color: string;
  name: string;
  delay: number;
  duration: number;
}) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 1000 - delay;
    const cycle = (t % duration) / duration;
    const opacity = 0.5 + 0.5 * Math.abs(Math.sin(cycle * Math.PI));
    if (matRef.current) matRef.current.emissiveIntensity = opacity;
  });

  return (
    <mesh name={name} position={position}>
      <sphereGeometry args={[5, 16, 16]} />
      <meshStandardMaterial
        ref={matRef}
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        roughness={0}
      />
    </mesh>
  );
}

// ─── Arc Lines ─────────────────────────────────────────────────────────────

const ARC_ACCENT_COLORS = ["#00D4FF", "#FFD166", "#FF6B6B"];

function ArcLines({
  positions,
  pairs,
}: {
  positions: THREE.Vector3[];
  pairs: [number, number][];
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const opacity = 0.2 + 0.5 * Math.abs(Math.sin((t / 4) * Math.PI * 2));
    if (groupRef.current) {
      groupRef.current.children.forEach((child) => {
        const lineObj = child as THREE.Line;
        if (lineObj.material instanceof THREE.LineBasicMaterial) {
          lineObj.material.opacity = opacity;
        }
      });
    }
  });

  const lineObjects = useMemo(() => {
    return pairs.map(([a, b], idx) => {
      const pA = new THREE.Vector3(positions[a].x, positions[a].y + 80, positions[a].z);
      const pB = new THREE.Vector3(positions[b].x, positions[b].y + 80, positions[b].z);
      const mid = new THREE.Vector3().lerpVectors(pA, pB, 0.5);
      mid.multiplyScalar(1.08);
      const curve = new THREE.QuadraticBezierCurve3(pA, mid, pB);
      const pts = curve.getPoints(20);
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const useAccent = idx % 5 === 0;
      const accentColor = ARC_ACCENT_COLORS[idx % ARC_ACCENT_COLORS.length];
      const mat = new THREE.LineBasicMaterial({
        color: useAccent ? accentColor : "#FFFFFF",
        transparent: true,
        opacity: useAccent ? 0.5 : 0.3,
      });
      return new THREE.Line(geo, mat);
    });
  }, [positions, pairs]);

  return (
    <group ref={groupRef} name="ArcLines">
      {lineObjects.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}
    </group>
  );
}

// ─── Orbital Shells ────────────────────────────────────────────────────────

function OrbitalShell({
  name,
  radius,
  duration,
  rotationAxes,
}: {
  name: string;
  radius: number;
  duration: number;
  rotationAxes: { x?: number; y?: number; z?: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const speed = (Math.PI * 2) / (duration / 1000);
    if (rotationAxes.x) meshRef.current.rotation.x += rotationAxes.x * speed * delta;
    if (rotationAxes.y) meshRef.current.rotation.y += rotationAxes.y * speed * delta;
    if (rotationAxes.z) meshRef.current.rotation.z += rotationAxes.z * speed * delta;
  });

  return (
    <mesh ref={meshRef} name={name} position={[0, 80, 0]}>
      <sphereGeometry args={[radius / 2, 24, 24]} />
      <meshStandardMaterial
        color="#00D4FF"
        transparent
        opacity={0.08}
        wireframe
        roughness={1}
        metalness={0}
        emissive="#00D4FF"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// ─── Floor Disc ────────────────────────────────────────────────────────────

function FloorDisc() {
  return (
    <mesh name="FloorDisc" rotation={[-Math.PI / 2, 0, 0]} position={[0, -80, 0]} receiveShadow>
      <circleGeometry args={[450, 128]} />
      <meshStandardMaterial
        color="#0A0E27"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
}

// Blueprint grid overlay via line segments
function BlueprintGrid() {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const step = 56;
    const size = 450;
    for (let x = -size; x <= size; x += step) {
      vertices.push(x, -79, -size, x, -79, size);
    }
    for (let z = -size; z <= size; z += step) {
      vertices.push(-size, -79, z, size, -79, z);
    }
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#00D4FF" transparent opacity={0.08} />
    </lineSegments>
  );
}

// ─── Avatar ────────────────────────────────────────────────────────────────

function Avatar({
  member,
  index,
}: {
  member: (typeof BOARD_MEMBERS)[0];
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const hoveredRef = useRef(false);
  const targetScale = useRef(1);

  const floatDelay = index * 0.5;
  const rotDir = index % 2 === 0 ? 1 : -1;
  const [px, , pz] = member.position;

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Float
    if (groupRef.current) {
      groupRef.current.position.y = 100 + 15 * Math.sin((t + floatDelay) * (Math.PI * 2) / 3);
    }

    // Rotate
    if (meshRef.current) {
      meshRef.current.rotation.y += rotDir * (Math.PI * 2) / 8 * delta;
    }

    // Scale
    const ts = targetScale.current;
    if (groupRef.current) {
      const cs = groupRef.current.scale.x;
      const ns = cs + (ts - cs) * 0.1;
      groupRef.current.scale.setScalar(ns);
    }

    // Glow pulse
    if (matRef.current) {
      matRef.current.emissiveIntensity = hoveredRef.current ? 2 : 0.8 + 0.2 * Math.sin(t * 2);
    }
  });

  const color = new THREE.Color(member.color);

  return (
    <group position={[px, 0, pz]}>
      <group ref={groupRef} position={[0, 100, 0]}>
        <mesh
          ref={meshRef}
          name={member.name}
          castShadow
          onPointerEnter={() => {
            hoveredRef.current = true;
            targetScale.current = 1.4;
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            hoveredRef.current = false;
            targetScale.current = 1;
            document.body.style.cursor = "default";
          }}
        >
          <boxGeometry args={[60, 60, 60]} />
          <meshStandardMaterial
            ref={matRef}
            color={member.color}
            emissive={member.color}
            emissiveIntensity={0.8}
            transparent
            opacity={0.85}
            roughness={0.1}
            metalness={0.5}
          />
        </mesh>

        {/* Wireframe outline layer */}
        <mesh>
          <boxGeometry args={[62, 62, 62]} />
          <meshBasicMaterial color={member.color} wireframe transparent opacity={0.3} />
        </mesh>

        {/* Name label */}
        <Text
          position={[0, 80, 0]}
          fontSize={8}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineColor={member.color}
          outlineWidth={0.5}
          maxWidth={200}
          textAlign="center"
        >
          {`${member.name}\n${member.role}`}
        </Text>

        {/* Avatar accent light */}
        <pointLight
          color={member.color}
          intensity={0.4}
          distance={200}
          position={[0, 100, 0]}
          castShadow={false}
        />
      </group>
    </group>
  );
}

// ─── Camera Intro ──────────────────────────────────────────────────────────

function CameraIntro() {
  const { camera } = useThree();
  const startTime = useRef<number | null>(null);
  const done = useRef(false);

  const startPos = new THREE.Vector3(0, 500, 900);
  const endPos = new THREE.Vector3(0, 350, 700);
  const target = new THREE.Vector3(0, 80, 0);

  useFrame(({ clock }) => {
    if (done.current) return;
    if (!startTime.current) startTime.current = clock.getElapsedTime();
    const elapsed = clock.getElapsedTime() - startTime.current;
    const duration = 5;
    const t = Math.min(elapsed / duration, 1);
    // easeInOutCubic
    const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Orbit 180 degrees while moving to final position
    const angle = (1 - ease) * Math.PI;
    const radius = startPos.z + (endPos.z - startPos.z) * ease;
    const height = startPos.y + (endPos.y - startPos.y) * ease;

    camera.position.set(Math.sin(angle) * radius, height, Math.cos(angle) * radius);
    camera.lookAt(target);

    if (t >= 1) done.current = true;
  });

  return null;
}

// ─── Scene Root ────────────────────────────────────────────────────────────

function Scene() {
  const nodePositions = useMemo(() => fibonacciSphere(24, 140), []);
  const arcPairs = useMemo(() => buildArcPairs(nodePositions, 3), [nodePositions]);

  return (
    <>
      <CameraIntro />

      {/* Lighting */}
      <ambientLight color="#0A1A3A" intensity={0.3} />
      <directionalLight
        name="Main light"
        color="#ffffff"
        intensity={0.8}
        position={[200, 400, 200]}
        castShadow
      />
      <pointLight
        color="#00D4FF"
        intensity={1.2}
        position={[0, 80, 0]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight color="#FFD166" intensity={0.4} position={[0, 200, 0]} />

      {/* Quantum Neural Table */}
      <CoreSphere />
      <NodeLattice positions={nodePositions} />
      <ArcLines positions={nodePositions} pairs={arcPairs} />

      <OrbitalShell name="Shell_Inner" radius={320} duration={20000} rotationAxes={{ y: 1 }} />
      <OrbitalShell name="Shell_Mid" radius={380} duration={28000} rotationAxes={{ y: -1, x: 0.3 }} />
      <OrbitalShell name="Shell_Outer" radius={440} duration={35000} rotationAxes={{ y: 1, z: 0.2 }} />

      {/* Environment */}
      <FloorDisc />
      <BlueprintGrid />

      {/* Board Members */}
      {BOARD_MEMBERS.map((member, i) => (
        <Avatar key={member.name} member={member} index={i} />
      ))}

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={1.5}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// ─── Public Export ─────────────────────────────────────────────────────────

export default function BoardroomScene({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 500, 900], fov: 55, near: 1, far: 5000 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "#050A1A" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
