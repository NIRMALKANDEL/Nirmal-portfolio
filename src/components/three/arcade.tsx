"use client";

// Beyond Code scene: a game controller with glowing buttons, a rumble + camera
// shake on every combo and a barrel roll every few seconds, pulsing halos,
// voxel space invaders (plus a marching formation), lasers that burst on
// impact, spinning coins and a neon grid floor.

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { ScenePalette } from "./scenes";
import { NeonGrid } from "./effects";

/* ----------------------------------------------------------- controller -- */

const FACE_BUTTONS: { pos: [number, number]; color: string }[] = [
  { pos: [0, 0.19], color: "#3de0c8" }, // top
  { pos: [0.19, 0], color: "#ff4d6d" }, // right
  { pos: [0, -0.19], color: "#4d8bff" }, // bottom
  { pos: [-0.19, 0], color: "#f5b83d" }, // left
];

/** 0..1 spike each time the button combo lands on its last button. */
function comboHit(t: number) {
  return Math.max(0, Math.sin(t * 4 - 3 * 1.3) - 0.9) * 10;
}

function Controller({ palette }: { palette: ScenePalette }) {
  const buttons = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const lightBar = useRef<THREE.MeshStandardMaterial>(null);
  const shell = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Buttons pulse in sequence like someone is mashing a combo.
    buttons.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = 0.35 + Math.max(0, Math.sin(t * 4 - i * 1.3)) * 1.4;
    });
    if (lightBar.current) lightBar.current.emissiveIntensity = 1.2 + Math.sin(t * 2) * 0.6;
    // Short rumble each time the combo lands on the last button.
    const g = shell.current;
    if (g) {
      const hit = comboHit(t);
      g.position.x = (Math.random() - 0.5) * 0.05 * hit;
      g.position.y = (Math.random() - 0.5) * 0.05 * hit;
    }
  });

  const body = (
    <meshStandardMaterial color={palette.surface} metalness={0.3} roughness={0.38} emissive={palette.tertiary} emissiveIntensity={0.06} />
  );

  return (
    <group ref={shell}>
      {/* body + grips */}
      <RoundedBox args={[2.5, 1.05, 0.5]} radius={0.24} smoothness={5}>
        {body}
      </RoundedBox>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 0.95, -0.5, -0.02]} rotation={[0, 0, side * 0.45]}>
          <capsuleGeometry args={[0.36, 0.6, 8, 24]} />
          {body}
        </mesh>
      ))}

      {/* light bar */}
      <mesh position={[0, 0.5, 0.05]}>
        <boxGeometry args={[0.9, 0.06, 0.32]} />
        <meshStandardMaterial ref={lightBar} color={palette.primary} emissive={palette.primary} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>

      {/* D-pad */}
      <group position={[-0.78, 0.12, 0.27]}>
        <mesh>
          <boxGeometry args={[0.38, 0.12, 0.08]} />
          <meshStandardMaterial color="#1a1b22" roughness={0.6} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.12, 0.38, 0.08]} />
          <meshStandardMaterial color="#1a1b22" roughness={0.6} />
        </mesh>
      </group>

      {/* face buttons */}
      <group position={[0.78, 0.12, 0.27]}>
        {FACE_BUTTONS.map((b, i) => (
          <mesh key={b.color} position={[b.pos[0], b.pos[1], 0]}>
            <sphereGeometry args={[0.085, 24, 24]} />
            <meshStandardMaterial
              ref={(m) => {
                buttons.current[i] = m;
              }}
              color={b.color}
              emissive={b.color}
              emissiveIntensity={0.4}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {/* thumbsticks */}
      {[-0.38, 0.38].map((x) => (
        <group key={x} position={[x, -0.25, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.17, 0.19, 0.06, 32]} />
            <meshStandardMaterial color="#14151b" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.06, 32]} />
            <meshStandardMaterial color="#24252e" roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------- voxel invaders -- */

// Classic two-frame invader sprite (11×8). "#" = filled pixel.
const INVADER_FRAMES = [
  ["  #     #  ", "   #   #   ", "  #######  ", " ## ### ## ", "###########", "# ####### #", "# #     # #", "   ## ##   "],
  ["  #     #  ", "#  #   #  #", "# ####### #", "### ### ###", "###########", " ######### ", "  #     #  ", " #       # "],
];

function framePixels(frame: string[]) {
  const pts: [number, number][] = [];
  frame.forEach((row, y) => row.split("").forEach((c, x) => c === "#" && pts.push([x - 5, 3.5 - y])));
  return pts;
}

function Invader({ color, position, scale = 0.1, phase = 0 }: { color: string; position: [number, number, number]; scale?: number; phase?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const frames = useMemo(() => INVADER_FRAMES.map(framePixels), []);
  const max = Math.max(...frames.map((f) => f.length));
  const tmp = useMemo(() => new THREE.Object3D(), []);
  const shown = useRef(-1);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    // Classic march: hop sideways in discrete steps, back and forth.
    const step = Math.floor(state.clock.elapsedTime * 2 + phase) % 8;
    m.position.x = position[0] + ((step < 4 ? step : 8 - step) - 2) * 0.09;
    const f = Math.floor(state.clock.elapsedTime * 2 + phase) % 2;
    if (f === shown.current) return;
    shown.current = f;
    const pts = frames[f];
    for (let i = 0; i < max; i++) {
      if (i < pts.length) {
        tmp.position.set(pts[i][0], pts[i][1], 0);
        tmp.scale.setScalar(1);
      } else {
        tmp.scale.setScalar(0); // hide unused instances
      }
      tmp.updateMatrix();
      m.setMatrixAt(i, tmp.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  });

  return (
    <Float speed={2.4} rotationIntensity={0.6} floatIntensity={1.4}>
      <instancedMesh ref={mesh} args={[undefined, undefined, max]} position={position} scale={scale}>
        <boxGeometry args={[0.92, 0.92, 0.92]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} roughness={0.4} />
      </instancedMesh>
    </Float>
  );
}

/* ---------------------------------------------------------------- coins -- */

function Coin({ position, speed = 2 }: { position: [number, number, number]; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    // Spin the wrapper around the vertical axis so the coin flips edge-on.
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return (
    <Float speed={3} floatIntensity={1.2} rotationIntensity={0}>
      <group ref={ref} position={position}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshStandardMaterial color="#f5b83d" emissive="#f5b83d" emissiveIntensity={0.35} metalness={0.7} roughness={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

/* --------------------------------------------------------------- lasers -- */

/** Pixel laser shots firing upward, each bursting into a ring at the top. */
function Lasers({ color, burstColor, count = 5 }: { color: string; burstColor: string; count?: number }) {
  const shots = useRef<(THREE.Mesh | null)[]>([]);
  const bursts = useRef<(THREE.Mesh | null)[]>([]);
  const burstAge = useRef<number[]>(Array.from({ length: count }, () => 1));
  const lanes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: -1.9 + (i / (count - 1)) * 3.8,
        speed: 3 + (i % 3) * 0.8,
        offset: (i * 0.53) % 4.6,
      })),
    [count]
  );

  useFrame((_, delta) => {
    shots.current.forEach((shot, i) => {
      if (!shot) return;
      shot.position.y += delta * lanes[i].speed;
      // Burst among the invaders, below the page's navbar area.
      if (shot.position.y > 1.9) {
        // Impact: spawn a burst where the shot ended, then recycle the shot.
        const burst = bursts.current[i];
        if (burst) burst.position.set(shot.position.x, shot.position.y, shot.position.z);
        burstAge.current[i] = 0;
        shot.position.y = -2.6;
        // Jitter the lane a little so the pattern never looks mechanical.
        shot.position.x = lanes[i].x + (Math.random() - 0.5) * 0.6;
      }
    });
    bursts.current.forEach((burst, i) => {
      if (!burst) return;
      const age = (burstAge.current[i] += delta);
      const life = Math.min(age / 0.4, 1);
      burst.scale.setScalar(0.3 + life * 2.2);
      (burst.material as THREE.MeshBasicMaterial).opacity = (1 - life) * 0.9;
    });
  });

  return (
    <>
      {lanes.map((lane, i) => (
        <group key={i}>
          <mesh
            ref={(el) => {
              shots.current[i] = el;
            }}
            position={[lane.x, -2.6 + lane.offset, -0.5]}
          >
            <boxGeometry args={[0.035, 0.24, 0.035]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
          <mesh
            ref={(el) => {
              bursts.current[i] = el;
            }}
            position={[0, 10, -0.5]}
          >
            <ringGeometry args={[0.06, 0.1, 16]} />
            <meshBasicMaterial
              color={burstColor}
              transparent
              opacity={0}
              toneMapped={false}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ glow ring -- */

/** Pulsing neon halo behind the controller, kicking on every combo hit. */
function Halo({ color, radius, speed }: { color: string; radius: number; speed: number }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const r = ring.current;
    if (!r) return;
    const t = state.clock.elapsedTime;
    r.rotation.z = t * speed;
    r.scale.setScalar(1 + Math.sin(t * 2) * 0.03 + comboHit(t) * 0.12);
  });
  return (
    <mesh ref={ring} position={[0, 0, -0.7]}>
      <torusGeometry args={[radius, 0.018, 12, 128, Math.PI * 1.6]} />
      <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.85} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ rig -- */

const FORMATION = [-0.85, 0, 0.85];

export function ArcadeRig({ palette, compact }: { palette: ScenePalette; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const roll = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.pow(0.001, delta);
    const t = state.clock.elapsedTime;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, Math.sin(t * 0.6) * 0.35 + state.pointer.x * 0.5, k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.25 - state.pointer.y * 0.3, k);

    // Barrel roll every 5s (eased over 0.9s), then hold steady.
    if (roll.current) {
      const p = (t % 5) / 0.9;
      const e = p < 1 ? p * p * (3 - 2 * p) : 0;
      roll.current.rotation.z = e * Math.PI * 2;
    }

    // Tiny camera shake on each combo hit.
    const hit = comboHit(t);
    state.camera.position.x = (Math.random() - 0.5) * 0.04 * hit;
    state.camera.position.y = (Math.random() - 0.5) * 0.04 * hit;
  });

  return (
    <group>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.9}>
        <group ref={group} scale={0.95}>
          <group ref={roll}>
            <Controller palette={palette} />
          </group>
        </group>
      </Float>
      <Halo color={palette.primary} radius={1.75} speed={0.6} />
      <Halo color={palette.tertiary} radius={1.95} speed={-0.4} />
      <Invader color={palette.secondary} position={[-1.6, 1.45, -0.6]} scale={0.085} />
      <Invader color={palette.tertiary} position={[1.65, 1.3, -0.9]} scale={0.07} phase={1} />
      <Invader color={palette.primary} position={[0.2, -1.75, -0.4]} scale={0.06} phase={0.5} />
      <Coin position={[-1.8, -1.1, 0.4]} />
      <Coin position={[1.85, -0.9, 0.2]} speed={2.6} />
      <Coin position={[0.9, 1.9, -0.3]} speed={1.6} />
      {!compact && <Coin position={[-0.6, 2.1, -0.8]} speed={2.2} />}
      {/* A marching formation across the top. */}
      {!compact &&
        FORMATION.map((x) => (
          <Invader key={x} color={palette.particles} position={[x, 1.75, -2.5]} scale={0.045} phase={0.25} />
        ))}
      <Lasers color={palette.secondary} burstColor={palette.primary} count={compact ? 5 : 9} />
      {/* On phones the scene sits behind the text, so the floor is skipped there. */}
      {!compact && <NeonGrid near={palette.tertiary} far={palette.primary} position={[0, -2.1, -2]} width={5.5} depth={10} speed={0.8} opacity={0.5} />}
      <Sparkles count={compact ? 60 : 110} scale={[6, 5, 4]} size={2.2} speed={0.7} color={palette.particles} />
      <Sparkles count={compact ? 20 : 40} scale={[6, 5, 4]} size={3} speed={0.9} color={palette.secondary} />
    </group>
  );
}
