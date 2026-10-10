"use client";

// Hero scene: a laptop live-coding a React component, keys lighting up as it
// types, a terminal running the build + deploy, data streaming out to floating
// website mock-ups, code tokens rising behind and a neon grid floor. All text is
// drawn onto <canvas> textures, so no 3D font files are downloaded.

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { ScenePalette } from "./scenes";
import { DataStreams, NeonGrid, ScreenScan } from "./effects";

/* --------------------------------------------------------- code content -- */

const SYNTAX = {
  plain: "#d6deeb",
  keyword: "#c792ea",
  fn: "#82aaff",
  string: "#c3e88d",
  tag: "#ff6b35",
  attr: "#3de0c8",
  comment: "#637777",
  number: "#f78c6c",
} as const;

type Token = [string, keyof typeof SYNTAX];

// The code typed on the laptop screen, pre-tokenised for highlighting.
const CODE: Token[][] = [
  [["import", "keyword"], [" { motion } ", "plain"], ["from", "keyword"], [' "motion/react"', "string"], [";", "plain"]],
  [],
  [["// building something remarkable", "comment"]],
  [["export function", "keyword"], [" Portfolio", "fn"], ["() {", "plain"]],
  [["  const", "keyword"], [" [projects] = ", "plain"], ["useGitHub", "fn"], ["(", "plain"], ['"NIRMALKANDEL"', "string"], [");", "plain"]],
  [],
  [["  return", "keyword"], [" (", "plain"]],
  [["    <", "plain"], ["motion.main", "tag"], [" animate", "attr"], ["={{ ", "plain"], ["opacity", "attr"], [": ", "plain"], ["1", "number"], [" }}>", "plain"]],
  [["      <", "plain"], ["Hero", "tag"], [" name", "attr"], ["=", "plain"], ['"Nirmal Kandel"', "string"], [" />", "plain"]],
  [["      <", "plain"], ["Stack", "tag"], [" items", "attr"], ["={[", "plain"], ['"React"', "string"], [", ", "plain"], ['"Node"', "string"], ["]} />", "plain"]],
  [["      {projects.", "plain"], ["map", "fn"], ["(p => <", "plain"], ["Card", "tag"], [" {...p} />)}", "plain"]],
  [["    </", "plain"], ["motion.main", "tag"], [">", "plain"]],
  [["  );", "plain"]],
  [["}", "plain"]],
];

const TOTAL_CHARS = CODE.reduce((n, line) => n + line.reduce((m, [text]) => m + text.length, 0) + 1, 0);

function drawEditor(ctx: CanvasRenderingContext2D, typed: number, caretOn: boolean) {
  const { width: W, height: H } = ctx.canvas;
  ctx.fillStyle = "#0b0f19";
  ctx.fillRect(0, 0, W, H);

  // title bar
  ctx.fillStyle = "#121829";
  ctx.fillRect(0, 0, W, 54);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(30 + i * 26, 27, 8, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#0b0f19";
  ctx.fillRect(120, 12, 210, 42);
  ctx.fillStyle = "#d6deeb";
  ctx.font = "500 20px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText("Portfolio.tsx", 140, 40);
  ctx.fillStyle = "#ff6b35";
  ctx.fillRect(120, 52, 210, 2);

  // sidebar
  ctx.fillStyle = "#0e1322";
  ctx.fillRect(0, 54, 150, H - 54);
  ctx.font = "16px ui-monospace, Menlo, Consolas, monospace";
  ["src", "  app", "  components", "  lib", "public"].forEach((f, i) => {
    ctx.fillStyle = i === 2 ? "#82aaff" : "#5a6787";
    ctx.fillText(f, 16, 92 + i * 30);
  });

  // code
  ctx.font = "22px ui-monospace, Menlo, Consolas, monospace";
  const lineH = 38;
  let left = typed;
  // Assigned inside the forEach callback, which TS can't see through.
  let caret = null as [number, number] | null;
  CODE.forEach((line, row) => {
    const y = 98 + row * lineH;
    ctx.fillStyle = "#3b4561";
    ctx.fillText(String(row + 1).padStart(2, " "), 168, y);
    let x = 214;
    for (const [text, kind] of line) {
      if (left <= 0) break;
      const shown = text.slice(0, left);
      ctx.fillStyle = SYNTAX[kind];
      ctx.fillText(shown, x, y);
      x += ctx.measureText(shown).width;
      left -= shown.length;
    }
    if (left > 0) left -= 1;
    else if (!caret) caret = [x, y];
  });
  if (caretOn && caret) {
    const [cx, cy] = caret;
    ctx.fillStyle = "#ff6b35";
    ctx.fillRect(cx + 2, cy - 20, 11, 26);
  }

  // status bar
  ctx.fillStyle = "#ff6b35";
  ctx.fillRect(0, H - 30, W, 30);
  ctx.fillStyle = "#0b0b10";
  ctx.font = "600 16px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText("main  ✓ build passing   TypeScript   UTF-8", 16, H - 10);
}

/** A website wireframe for the floating "design" windows. */
function drawSite(ctx: CanvasRenderingContext2D, accent: string, layout: 0 | 1) {
  const { width: W, height: H } = ctx.canvas;
  const r = (x: number, y: number, w: number, h: number, c: string | CanvasGradient, rad = 10) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, rad);
    ctx.fill();
  };
  r(0, 0, W, H, "#10131f", 24);
  r(0, 0, W, 46, "#181d2e", 24);
  ctx.fillRect(0, 30, W, 16);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(26 + i * 22, 23, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  r(110, 12, W - 140, 22, "#0b0e18", 11);
  ctx.fillStyle = "#6c7799";
  ctx.font = "14px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText(layout === 0 ? "nirmal-portfolio-eta.vercel.app" : "nirmal-portfolio-eta.vercel.app/projects", 126, 28);

  if (layout === 0) {
    const g = ctx.createLinearGradient(30, 80, W - 30, 230);
    g.addColorStop(0, accent);
    g.addColorStop(1, "#8b7bff");
    r(30, 76, W - 60, 150, g, 16);
    r(52, 110, 220, 22, "rgba(255,255,255,0.9)", 6);
    r(52, 144, 160, 14, "rgba(255,255,255,0.55)", 6);
    r(52, 180, 90, 28, "#0b0b10", 14);
    [0, 1, 2].forEach((i) => r(30 + i * ((W - 60) / 3 + 6), 246, (W - 60) / 3 - 12, 90, "#1c2236", 12));
  } else {
    [0, 1].forEach((col) =>
      [0, 1].forEach((row) => {
        const x = 30 + col * ((W - 60) / 2 + 8);
        const y = 72 + row * 136;
        r(x, y, (W - 60) / 2 - 8, 124, "#1c2236", 14);
        r(x + 12, y + 12, (W - 60) / 2 - 32, 60, row === col ? accent : "#3de0c8", 10);
        r(x + 12, y + 84, 110, 12, "rgba(255,255,255,0.6)", 6);
      })
    );
  }
}

function makeCanvasTexture(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return { canvas, ctx: canvas.getContext("2d")!, texture };
}

/* --------------------------------------------------------------- laptop -- */

const KEY_COLS = 13;
const KEY_ROWS = 4;

function Laptop({ palette }: { palette: ScenePalette }) {
  // Mutable per-frame state lives in refs (the screen texture is created in
  // an effect and attached to the material imperatively).
  const screenMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const screen = useRef<ReturnType<typeof makeCanvasTexture> | null>(null);
  const keys = useRef<THREE.InstancedMesh>(null);
  const heat = useRef(new Float32Array(KEY_COLS * KEY_ROWS));
  const typing = useRef({ typed: 0, acc: 0, pause: 0, drawn: "" });
  const tmp = useMemo(() => new THREE.Object3D(), []);
  const baseKey = useMemo(() => new THREE.Color("#2a2c38"), []);
  const hotKey = useMemo(() => new THREE.Color(palette.primary), [palette.primary]);
  const keyColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const created = makeCanvasTexture(1024, 640);
    drawEditor(created.ctx, 0, true);
    created.texture.needsUpdate = true;
    screen.current = created;
    if (screenMaterial.current) {
      screenMaterial.current.map = created.texture;
      // Colour multiplies the map — reset the dark placeholder to white.
      screenMaterial.current.color.set("#ffffff");
      screenMaterial.current.needsUpdate = true;
    }
    return () => {
      created.texture.dispose();
      screen.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    const t = typing.current;
    // Type ~28 chars/sec, hold the finished file for 2.5s, then start over.
    if (t.typed >= TOTAL_CHARS) {
      t.pause += delta;
      if (t.pause > 2.5) {
        t.typed = 0;
        t.pause = 0;
      }
    } else {
      t.acc += delta * 28;
      while (t.acc >= 1 && t.typed < TOTAL_CHARS) {
        t.acc -= 1;
        t.typed += 1;
        heat.current[Math.floor(Math.random() * heat.current.length)] = 1;
      }
    }
    // Only redraw + re-upload the screen when something visible changed.
    const caretOn = Math.floor(state.clock.elapsedTime * 2.2) % 2 === 0;
    const key = `${t.typed}:${caretOn}`;
    const scr = screen.current;
    if (scr && key !== t.drawn) {
      t.drawn = key;
      drawEditor(scr.ctx, t.typed, caretOn);
      scr.texture.needsUpdate = true;
    }

    const mesh = keys.current;
    if (!mesh) return;
    const h = heat.current;
    for (let i = 0; i < h.length; i++) {
      h[i] = Math.max(0, h[i] - delta * 3.5);
      const col = i % KEY_COLS;
      const row = Math.floor(i / KEY_COLS);
      tmp.position.set(-1.32 + col * 0.22, 0.075 - h[i] * 0.025, -0.62 + row * 0.22);
      tmp.updateMatrix();
      mesh.setMatrixAt(i, tmp.matrix);
      mesh.setColorAt(i, keyColor.copy(baseKey).lerp(hotKey, h[i]));
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  const shell = (
    <meshStandardMaterial color={palette.surface} metalness={0.55} roughness={0.32} />
  );

  return (
    <group>
      {/* base */}
      <RoundedBox args={[3.2, 0.1, 2.1]} radius={0.05} smoothness={4}>
        {shell}
      </RoundedBox>
      <instancedMesh ref={keys} args={[undefined, undefined, KEY_COLS * KEY_ROWS]}>
        <boxGeometry args={[0.18, 0.04, 0.18]} />
        <meshStandardMaterial roughness={0.5} emissive={palette.primary} emissiveIntensity={0.15} />
      </instancedMesh>
      <mesh position={[0, 0.052, 0.62]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 0.5]} />
        <meshStandardMaterial color="#000" transparent opacity={0.25} />
      </mesh>

      {/* lid, hinged at the back edge and tipped open */}
      <group position={[0, 0.05, -1.03]} rotation={[-0.22, 0, 0]}>
        <RoundedBox args={[3.2, 2.05, 0.07]} radius={0.04} smoothness={4} position={[0, 1.02, 0]}>
          {shell}
        </RoundedBox>
        <mesh position={[0, 1.04, 0.037]}>
          <planeGeometry args={[3.0, 1.875]} />
          <meshBasicMaterial ref={screenMaterial} color="#0b0f19" toneMapped={false} />
        </mesh>
        <ScreenScan color={palette.secondary} width={3.0} height={1.875} position={[0, 1.04, 0.04]} />
        {/* screen glow spilling onto the keyboard */}
        <pointLight position={[0, 0.9, 0.8]} intensity={6} distance={4} color={palette.secondary} />
      </group>
    </group>
  );
}

/* ------------------------------------------------- floating decorations -- */

function SiteWindow({ accent, layout, ...props }: { accent: string; layout: 0 | 1 } & React.ComponentProps<"group">) {
  const tex = useMemo(() => {
    const t = makeCanvasTexture(512, 360);
    drawSite(t.ctx, accent, layout);
    t.texture.needsUpdate = true;
    return t.texture;
  }, [accent, layout]);
  useEffect(() => () => tex.dispose(), [tex]);

  return (
    <group {...props}>
      <mesh>
        <planeGeometry args={[1.7, 1.2]} />
        <meshBasicMaterial map={tex} transparent opacity={0.92} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Glyph({ text, color, position, size = 0.55 }: { text: string; color: string; position: [number, number, number]; size?: number }) {
  const tex = useMemo(() => {
    const t = makeCanvasTexture(256, 256);
    t.ctx.font = "bold 150px ui-monospace, Menlo, Consolas, monospace";
    t.ctx.textAlign = "center";
    t.ctx.textBaseline = "middle";
    t.ctx.shadowColor = color;
    t.ctx.shadowBlur = 28;
    t.ctx.fillStyle = color;
    t.ctx.fillText(text, 128, 132);
    t.texture.needsUpdate = true;
    return t.texture;
  }, [text, color]);
  useEffect(() => () => tex.dispose(), [tex]);

  return (
    <Float speed={2.2} rotationIntensity={0} floatIntensity={1.6}>
      <sprite position={position} scale={[size, size, size]}>
        <spriteMaterial map={tex} transparent depthWrite={false} toneMapped={false} />
      </sprite>
    </Float>
  );
}

/* ------------------------------------------------------------- terminal -- */

const TERMINAL: { text: string; color: string }[] = [
  { text: "$ npm run build", color: "#d6deeb" },
  { text: "▲ Next.js 16 (Turbopack)", color: "#8b93a8" },
  { text: "✓ Compiled successfully", color: "#3de0c8" },
  { text: "✓ Generating static pages (22/22)", color: "#3de0c8" },
  { text: "$ git push origin master", color: "#d6deeb" },
  { text: "→ Deploying to production…", color: "#f5b83d" },
  { text: "✓ Ready in 41s", color: "#ff6b35" },
];

function drawTerminal(ctx: CanvasRenderingContext2D, lines: number, partial: number, caretOn: boolean) {
  const { width: W, height: H } = ctx.canvas;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "rgba(8, 10, 18, 0.92)";
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 22);
  ctx.fill();
  ctx.fillStyle = "#151a2b";
  ctx.beginPath();
  ctx.roundRect(0, 0, W, 40, [22, 22, 0, 0]);
  ctx.fill();
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(24 + i * 20, 20, 6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#6c7799";
  ctx.font = "15px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText("zsh — nirmal-portfolio", 100, 26);

  ctx.font = "19px ui-monospace, Menlo, Consolas, monospace";
  let y = 76;
  for (let i = 0; i <= lines && i < TERMINAL.length; i++) {
    const line = TERMINAL[i];
    const text = i === lines ? line.text.slice(0, partial) : line.text;
    ctx.fillStyle = line.color;
    ctx.fillText(text, 20, y);
    if (i === lines && caretOn) {
      ctx.fillStyle = "#ff6b35";
      ctx.fillRect(22 + ctx.measureText(text).width, y - 16, 10, 20);
    }
    y += 30;
  }
}

/** A floating terminal that runs the build and deploy on a loop. */
function Terminal(props: React.ComponentProps<"group">) {
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const term = useRef<ReturnType<typeof makeCanvasTexture> | null>(null);
  const run = useRef({ line: 0, chars: 0, acc: 0, hold: 0, drawn: "" });

  useEffect(() => {
    const created = makeCanvasTexture(512, 300);
    drawTerminal(created.ctx, 0, 0, true);
    created.texture.needsUpdate = true;
    term.current = created;
    if (material.current) {
      material.current.map = created.texture;
      material.current.color.set("#ffffff");
      material.current.needsUpdate = true;
    }
    return () => {
      created.texture.dispose();
      term.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    const r = run.current;
    if (r.line >= TERMINAL.length) {
      // Hold the finished deploy, then clear and run again.
      r.hold += delta;
      if (r.hold > 2.2) Object.assign(r, { line: 0, chars: 0, hold: 0 });
    } else {
      // Commands type out; output lines appear almost instantly.
      const isCommand = TERMINAL[r.line].text.startsWith("$");
      r.acc += delta * (isCommand ? 22 : 90);
      while (r.acc >= 1 && r.line < TERMINAL.length) {
        r.acc -= 1;
        r.chars += 1;
        if (r.chars > TERMINAL[r.line].text.length + (isCommand ? 6 : 14)) {
          r.line += 1;
          r.chars = 0;
          break;
        }
      }
    }
    const caretOn = Math.floor(state.clock.elapsedTime * 2.2) % 2 === 0;
    const key = `${r.line}:${r.chars}:${caretOn}`;
    const t = term.current;
    if (t && key !== r.drawn) {
      r.drawn = key;
      drawTerminal(t.ctx, r.line, r.chars, caretOn);
      t.texture.needsUpdate = true;
    }
  });

  return (
    <group {...props}>
      <mesh>
        <planeGeometry args={[1.6, 0.94]} />
        <meshBasicMaterial ref={material} color="#080a12" transparent toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------- rising tokens -- */

const TOKENS = ["const", "useState()", "=>", "async", "git push", "<div>", "await", "npm i", "{...props}", "return", "export", "</>"];

/** Code tokens drifting up behind the scene, fading in and out. */
function RisingTokens({ colors, count }: { colors: string[]; count: number }) {
  const sprites = useRef<(THREE.Sprite | null)[]>([]);
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const text = TOKENS[i % TOKENS.length];
        const color = colors[i % colors.length];
        const { ctx, texture } = makeCanvasTexture(512, 96);
        ctx.font = "600 56px ui-monospace, Menlo, Consolas, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = color;
        ctx.shadowBlur = 18;
        ctx.fillStyle = color;
        ctx.fillText(text, 256, 52);
        texture.needsUpdate = true;
        // Deterministic spread, so re-mounts look the same.
        const rand = (n: number) => {
          const x = Math.sin((i + 1) * n) * 43758.5453;
          return x - Math.floor(x);
        };
        return {
          texture,
          // Kept to the right so tokens never drift over the hero text.
          x: -1.6 + rand(12.9898) * 5.6,
          y: -2.6 + rand(78.233) * 6,
          z: -3 - rand(3.7) * 2,
          speed: 0.18 + rand(9.1) * 0.22,
          width: 0.35 + text.length * 0.09,
        };
      }),
    [colors, count]
  );
  useEffect(() => () => items.forEach((it) => it.texture.dispose()), [items]);

  useFrame((_, delta) => {
    sprites.current.forEach((sprite, i) => {
      if (!sprite) return;
      const it = items[i];
      sprite.position.y += delta * it.speed;
      if (sprite.position.y > 3.6) sprite.position.y = -2.6;
      // Fade in at the bottom, out at the top.
      const y = sprite.position.y;
      const fade = Math.min(1, (y + 2.6) / 1.2, (3.6 - y) / 1.2);
      (sprite.material as THREE.SpriteMaterial).opacity = Math.max(0, fade) * 0.55;
    });
  });

  return (
    <>
      {items.map((it, i) => (
        <sprite
          key={i}
          ref={(el) => {
            sprites.current[i] = el;
          }}
          position={[it.x, it.y, it.z]}
          scale={[it.width, it.width * (96 / 512) * 2.2, 1]}
        >
          <spriteMaterial map={it.texture} transparent depthWrite={false} toneMapped={false} opacity={0} />
        </sprite>
      ))}
    </>
  );
}

// Data paths (scene-local): laptop screen to each floating window / the terminal.
const STREAMS_TO_SITES: [number, number, number][][] = [
  [[0.1, 1.15, -0.55], [-0.4, 1.9, -1.3], [-0.9, 2.05, -2.4]],
  [[0.6, 1.1, -0.55], [1.6, 1.85, -0.9], [2.35, 1.55, -1.6]],
];
const STREAM_TO_TERMINAL: [number, number, number][][] = [[[-0.2, 0.25, 0.3], [-0.6, -0.5, -0.2], [-0.8, -1.0, -1.1]]];

/* ------------------------------------------------------------------ rig -- */

export function WorkstationRig({ palette, compact }: { palette: ScenePalette; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const scrollGroup = useRef<THREE.Group>(null);
  const tokenColors = useMemo(
    () => [palette.primary, palette.secondary, palette.tertiary],
    [palette.primary, palette.secondary, palette.tertiary]
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      const k = 1 - Math.pow(0.001, delta);
      // Idle sway plus pointer parallax.
      const idle = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, -0.5 + idle + state.pointer.x * 0.35, k);
      g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.32 - state.pointer.y * 0.15, k);
    }
    // Scroll: the desk sinks and turns away as you leave the hero.
    const s = scrollGroup.current;
    if (s) {
      const p = Math.min(window.scrollY / window.innerHeight, 1.2);
      s.position.y = THREE.MathUtils.lerp(s.position.y, (compact ? 1.4 : -0.25) - p * 2.2, 0.1);
      s.rotation.z = THREE.MathUtils.lerp(s.rotation.z, p * 0.35, 0.1);
    }
  });

  return (
    <group ref={scrollGroup} position={[compact ? 0.4 : 1.85, compact ? 1.4 : -0.25, compact ? -1.5 : 0]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <group ref={group} scale={compact ? 0.85 : 0.92}>
          <Laptop palette={palette} />
        </group>
      </Float>

      <NeonGrid near={palette.primary} far={palette.tertiary} position={[compact ? 0 : 0.9, -1.35, -1.5]} width={compact ? 10 : 8} depth={12} speed={0.5} opacity={compact ? 0.35 : 0.5} />
      {/* On phones the scene sits behind the text, so skip the extra clutter. */}
      {!compact && <RisingTokens colors={tokenColors} count={12} />}

      {!compact && (
        <>
          <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.8}>
            <Terminal position={[-0.8, -1.0, -1.1]} rotation={[0, 0.4, 0]} />
          </Float>
          <DataStreams paths={STREAMS_TO_SITES} color={palette.secondary} />
          <DataStreams paths={STREAM_TO_TERMINAL} color={palette.primary} perPath={14} speed={0.45} />
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
            <SiteWindow accent={palette.primary} layout={0} position={[-0.9, 2.05, -2.4]} rotation={[0, 0.35, 0.04]} />
          </Float>
          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1.2}>
            <SiteWindow accent={palette.tertiary} layout={1} position={[2.35, 1.55, -1.6]} rotation={[0, -0.5, -0.04]} />
          </Float>
        </>
      )}

      <Glyph text="</>" color={palette.primary} position={compact ? [1.3, 0.2, 0.6] : [-0.4, -1.55, 0.6]} size={0.75} />
      <Glyph text="{ }" color={palette.secondary} position={[1.6, 0.9, 0.9]} size={0.6} />
      <Glyph text="=>" color={palette.tertiary} position={[-0.6, 2.25, 0.2]} />
      {!compact && (
        <>
          <Glyph text="()" color={palette.secondary} position={[2.2, -1.5, 0.3]} size={0.45} />
          <Glyph text="#" color={palette.primary} position={[0.9, 2.5, -0.8]} size={0.4} />
          <Glyph text=";" color={palette.tertiary} position={[-1.1, -2.0, 0.2]} size={0.45} />
        </>
      )}
    </group>
  );
}
