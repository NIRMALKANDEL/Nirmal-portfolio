"use client";

// Shared GPU-side effects for the R3F scenes. Everything here animates through
// shader uniforms or buffer attributes — no React re-renders per frame.

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const gridVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const gridFragment = /* glsl */ `
  uniform float uTime;
  uniform float uScale;
  uniform float uOpacity;
  uniform float uAspect;
  uniform vec3 uNear;
  uniform vec3 uFar;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv * uScale * vec2(uAspect, 1.0);
    p.y += uTime;
    // Anti-aliased grid lines via screen-space derivatives.
    vec2 g = abs(fract(p - 0.5) - 0.5) / fwidth(p);
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    // Fade toward the edges and the horizon.
    float edge = smoothstep(0.5, 0.15, abs(vUv.x - 0.5));
    float depth = smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
    vec3 color = mix(uNear, uFar, vUv.y);
    gl_FragColor = vec4(color, line * edge * depth * uOpacity);
  }
`;

/** A synthwave-style neon floor grid that scrolls toward the viewer. */
export function NeonGrid({
  near,
  far,
  speed = 0.6,
  opacity = 0.55,
  width = 16,
  depth = 16,
  ...props
}: { near: string; far: string; speed?: number; opacity?: number; width?: number; depth?: number } & React.ComponentProps<"mesh">) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScale: { value: 14 },
      uAspect: { value: 1 },
      uOpacity: { value: opacity },
      uNear: { value: new THREE.Color(near) },
      uFar: { value: new THREE.Color(far) },
    }),
    // Colours/opacity are synced below; uniforms are created once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((_, delta) => {
    const m = material.current;
    if (!m) return;
    // Scroll toward the camera (decreasing v), wrapped to keep precision.
    m.uniforms.uTime.value = (m.uniforms.uTime.value - delta * speed) % 1000;
    m.uniforms.uNear.value.set(near);
    m.uniforms.uFar.value.set(far);
    m.uniforms.uOpacity.value = opacity;
    // Keep grid cells square whatever the plane's proportions.
    m.uniforms.uAspect.value = width / depth;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <planeGeometry args={[width, depth]} />
      <shaderMaterial
        ref={material}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/**
 * Glowing particles that stream along curves (e.g. laptop → website windows).
 * One draw call; positions are written straight into the buffer each frame.
 */
export function DataStreams({
  paths,
  color,
  perPath = 18,
  speed = 0.35,
  size = 0.07,
}: {
  paths: [number, number, number][][];
  color: string;
  perPath?: number;
  speed?: number;
  size?: number;
}) {
  const curves = useMemo(
    () => paths.map((pts) => new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)))),
    [paths]
  );
  const count = curves.length * perPath;
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const attr = useRef<THREE.BufferAttribute>(null);
  const point = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const a = attr.current;
    if (!a) return;
    const t = state.clock.elapsedTime * speed;
    // Write through the attribute ref (refs are the sanctioned mutable escape hatch).
    const arr = a.array as Float32Array;
    curves.forEach((curve, c) => {
      for (let i = 0; i < perPath; i++) {
        // Evenly spaced along the curve, offset per path so they don't pulse in sync.
        const u = (t + i / perPath + c * 0.37) % 1;
        curve.getPointAt(u, point);
        const k = (c * perPath + i) * 3;
        arr[k] = point.x;
        arr[k + 1] = point.y;
        arr[k + 2] = point.z;
      }
    });
    a.needsUpdate = true;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute ref={attr} attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        sizeAttenuation
      />
    </points>
  );
}

const scanFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;
  void main() {
    // Fine CRT scanlines plus a bright band sweeping down the screen.
    float lines = 0.5 + 0.5 * sin(vUv.y * 420.0);
    float band = smoothstep(0.12, 0.0, abs(fract(1.0 - uTime * 0.25) - vUv.y));
    float a = lines * 0.05 + band * 0.18;
    gl_FragColor = vec4(uColor, a);
  }
`;

/** Additive scanline + sweep overlay for a screen plane. */
export function ScreenScan({ color, width, height, ...props }: { color: string; width: number; height: number } & React.ComponentProps<"mesh">) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } }), [color]);

  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh {...props}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        ref={material}
        vertexShader={gridVertex}
        fragmentShader={scanFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
