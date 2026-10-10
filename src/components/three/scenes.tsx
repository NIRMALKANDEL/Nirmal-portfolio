"use client";

// All React Three Fiber code lives here and is only ever loaded through
// next/dynamic (see scene-canvas.tsx), so three.js never touches the server
// bundle or blocks first paint.

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export type ScenePalette = {
  primary: string;
  secondary: string;
  tertiary: string;
  particles: string;
};

export type SceneVariant = "hero" | "knot" | "rings";

type SceneProps = {
  variant: SceneVariant;
  palette: ScenePalette;
  active: boolean;
  reduced: boolean;
  compact: boolean;
};

export default function Scene({ variant, palette, active, reduced, compact }: SceneProps) {
  return (
    <Canvas
      // Pause the render loop when off-screen; render a single still frame
      // for reduced-motion users.
      frameloop={reduced ? "demand" : active ? "always" : "never"}
      dpr={[1, compact ? 1.25 : 1.75]}
      camera={{ position: [0, 0, variant === "hero" ? 7 : 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} />
      <pointLight position={[-5, -2, 3]} intensity={40} color={palette.secondary} />
      <pointLight position={[5, 3, -2]} intensity={40} color={palette.tertiary} />
      {variant === "hero" && <HeroRig palette={palette} compact={compact} />}
      {variant === "knot" && <KnotRig palette={palette} />}
      {variant === "rings" && <RingsRig palette={palette} />}
    </Canvas>
  );
}

/** Eases a group toward the pointer so the whole scene reacts to the mouse. */
function usePointerParallax(strength = 0.35) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const k = 1 - Math.pow(0.001, delta);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * strength, k);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * strength * 0.6, k);
  });
  return ref;
}

/* ------------------------------------------------------------------ hero -- */

function HeroRig({ palette, compact }: { palette: ScenePalette; compact: boolean }) {
  const group = usePointerParallax(0.45);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const scrollGroup = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.18;
      core.current.rotation.z += delta * 0.05;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.08;
      shell.current.rotation.x += delta * 0.04;
    }
    // Scroll drives the scene: it sinks, shrinks and spins as you leave the hero.
    if (scrollGroup.current) {
      const p = Math.min(window.scrollY / window.innerHeight, 1.2);
      scrollGroup.current.position.y = THREE.MathUtils.lerp(scrollGroup.current.position.y, -p * 2.2, 0.1);
      scrollGroup.current.rotation.z = THREE.MathUtils.lerp(scrollGroup.current.rotation.z, p * 0.9, 0.1);
      const s = 1 - p * 0.35;
      scrollGroup.current.scale.setScalar(THREE.MathUtils.lerp(scrollGroup.current.scale.x, s, 0.1));
    }
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.6, 0.04);
  });

  return (
    <group ref={scrollGroup} position={[compact ? 0.9 : 1.9, compact ? 1.9 : 0, compact ? -1 : 0]}>
      <group ref={group}>
        <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh ref={core} scale={compact ? 1.05 : 1.45}>
            <icosahedronGeometry args={[1, 24]} />
            <MeshDistortMaterial
              color={palette.primary}
              roughness={0.18}
              metalness={0.25}
              emissive={palette.primary}
              emissiveIntensity={0.18}
              distort={0.42}
              speed={1.8}
            />
          </mesh>
          <mesh ref={shell} scale={compact ? 1.55 : 2.15}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color={palette.tertiary} wireframe transparent opacity={0.22} />
          </mesh>
        </Float>

        <OrbitRing radius={compact ? 2 : 2.7} tilt={[1.2, 0.2, 0]} speed={0.35} color={palette.secondary} />
        <OrbitRing radius={compact ? 2.3 : 3.1} tilt={[1.75, -0.5, 0.3]} speed={-0.22} color={palette.tertiary} />

        {!compact &&
          SATELLITES.map((s, i) => (
            <Float key={i} speed={2 + i * 0.3} rotationIntensity={2} floatIntensity={2}>
              <mesh position={s.position} scale={s.scale}>
                {s.shape === "oct" && <octahedronGeometry args={[1, 0]} />}
                {s.shape === "box" && <boxGeometry args={[1, 1, 1]} />}
                {s.shape === "tet" && <tetrahedronGeometry args={[1, 0]} />}
                <meshStandardMaterial
                  color={i % 2 ? palette.secondary : palette.tertiary}
                  metalness={0.6}
                  roughness={0.25}
                  flatShading
                />
              </mesh>
            </Float>
          ))}
      </group>
      <Sparkles
        count={compact ? 50 : 120}
        scale={[10, 7, 6]}
        size={2.2}
        speed={0.35}
        opacity={0.7}
        color={palette.particles}
      />
      <StarField count={compact ? 400 : 900} color={palette.particles} />
    </group>
  );
}

const SATELLITES: { position: [number, number, number]; scale: number; shape: "oct" | "box" | "tet" }[] = [
  { position: [-2.6, 1.6, -0.5], scale: 0.22, shape: "oct" },
  { position: [2.7, -1.5, 0.4], scale: 0.2, shape: "box" },
  { position: [-2.2, -1.9, 0.8], scale: 0.18, shape: "tet" },
  { position: [2.2, 2, -1], scale: 0.16, shape: "tet" },
  { position: [0.3, -2.6, -0.6], scale: 0.14, shape: "oct" },
];

/** A thin glowing ring with a small moon riding along it. */
function OrbitRing({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) {
  const pivot = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (pivot.current) pivot.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.012, 16, 160]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
      <group ref={pivot}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.07, 24, 24]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

/** A slowly drifting shell of points behind everything. */
function StarField({ count, color }: { count: number; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random spread on a sphere shell.
      const u = fract(Math.sin(i * 12.9898) * 43758.5453);
      const v = fract(Math.sin(i * 78.233) * 12345.6789);
      const r = 6 + fract(Math.sin(i * 3.7) * 999.1) * 8;
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 4;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color={color} transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function fract(n: number) {
  return n - Math.floor(n);
}

/* ------------------------------------------------------------------ knot -- */

function KnotRig({ palette }: { palette: ScenePalette }) {
  const group = usePointerParallax(0.6);
  const knot = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (knot.current) {
      knot.current.rotation.x += delta * 0.2;
      knot.current.rotation.y += delta * 0.3;
    }
  });
  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh ref={knot} scale={1.15}>
          <torusKnotGeometry args={[1, 0.32, 260, 36, 2, 3]} />
          <MeshDistortMaterial
            color={palette.primary}
            roughness={0.2}
            metalness={0.3}
            emissive={palette.primary}
            emissiveIntensity={0.15}
            distort={0.22}
            speed={2.2}
          />
        </mesh>
      </Float>
      <Sparkles count={60} scale={[7, 5, 4]} size={2} speed={0.4} color={palette.particles} />
    </group>
  );
}

/* ----------------------------------------------------------------- rings -- */

function RingsRig({ palette }: { palette: ScenePalette }) {
  const group = usePointerParallax(0.5);
  const rings = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!rings.current) return;
    const t = state.clock.elapsedTime;
    rings.current.children.forEach((child, i) => {
      child.rotation.x = t * (0.25 + i * 0.08);
      child.rotation.y = t * (0.18 + i * 0.05) * (i % 2 ? -1 : 1);
    });
  });
  const colors = [palette.primary, palette.tertiary, palette.secondary];
  return (
    <group ref={group}>
      <group ref={rings}>
        {[1.7, 1.25, 0.85].map((r, i) => (
          <mesh key={r}>
            <torusGeometry args={[r, 0.06, 32, 160]} />
            <meshStandardMaterial color={colors[i]} metalness={0.3} roughness={0.25} emissive={colors[i]} emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
      <Float speed={3} floatIntensity={1}>
        <mesh scale={0.42}>
          <icosahedronGeometry args={[1, 12]} />
          <MeshDistortMaterial color={palette.secondary} metalness={0.6} roughness={0.2} distort={0.5} speed={3} />
        </mesh>
      </Float>
      <Sparkles count={50} scale={[6, 5, 4]} size={2} speed={0.4} color={palette.particles} />
    </group>
  );
}
