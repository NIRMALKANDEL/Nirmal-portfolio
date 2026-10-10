"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Check,
  Heart,
  MapPin,
  Play,
  Search,
  ShoppingBag,
  Sparkles,
  Sun,
  Upload,
  X,
  Zap,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

// Each project gets a small layered "UI mock" drawn from what the app actually
// does (see src/data/projects.ts). Layers sit at different translateZ depths,
// so inside a <TiltCard> they separate in 3D as the card tilts.

function Layer({
  z,
  className,
  children,
  style,
}: {
  z: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={cn("absolute preserve-3d", className)} style={{ transform: `translateZ(${z}px)`, ...style }}>
      {children}
    </div>
  );
}

const glass = "rounded-xl border border-white/10 bg-white/[0.07] backdrop-blur-md shadow-2xl shadow-black/40";

export function ProjectVisual({
  project,
  className,
  rounded = "rounded-t-3xl",
}: {
  project: Project;
  className?: string;
  /** Corner rounding for the clipped background. */
  rounded?: string;
}) {
  const { accent, deep } = project.theme;
  const Mock = MOCKS[project.slug] ?? DefaultMock;

  // Only the background is clipped. The mock layers stay unclipped so they
  // keep real 3D depth — overflow:hidden would flatten preserve-3d.
  return (
    <div className={cn("relative h-full w-full preserve-3d", className)} style={{ "--p": accent } as React.CSSProperties}>
      <div
        aria-hidden
        className={cn("absolute inset-0 overflow-hidden", rounded)}
        style={{
          background: `radial-gradient(120% 90% at 85% 0%, color-mix(in srgb, ${accent} 38%, ${deep}) 0%, ${deep} 55%, #04040a 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] mask-radial" />
        <div className="absolute -bottom-16 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full opacity-50 blur-3xl" style={{ background: accent }} />
      </div>
      <Mock />
    </div>
  );
}

/**
 * Renders the mock at its designed size (640×400) and scales it to fit, so
 * the layout and text stay in proportion on large showcases.
 */
export function ScaledProjectVisual({ project, rounded }: { project: Project; rounded?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 640));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-[16/10] w-full preserve-3d">
      <div className="absolute left-0 top-0 h-[400px] w-[640px] origin-top-left preserve-3d" style={{ transform: `scale(${scale})` }}>
        <ProjectVisual project={project} rounded={rounded} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Paylog -- */
function PaylogMock() {
  const bars = [40, 65, 30, 80, 55, 92, 48];
  return (
    <>
      <Layer z={20} className="left-[12%] top-[10%] h-[86%] w-[38%] rounded-[1.6rem] border border-white/15 bg-black/60 p-3 shadow-2xl">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/20" />
        <p className="text-[9px] uppercase tracking-widest text-white/50">This month</p>
        <p className="font-display text-lg font-bold text-white">₹48,250</p>
        <div className="mt-3 flex h-14 items-end gap-1">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-[var(--p)]" style={{ height: `${h}%`, opacity: 0.45 + i * 0.08 }} />
          ))}
        </div>
        <div className="mt-3 space-y-1.5">
          {["Groceries", "Rent", "Lunch"].map((item, i) => (
            <div key={item} className="flex items-center justify-between rounded-md bg-white/5 px-2 py-1.5 text-[9px] text-white/80">
              <span>{item}</span>
              <span className="text-white/50">−₹{[1240, 18000, 250][i]}</span>
            </div>
          ))}
        </div>
      </Layer>
      <Layer z={80} className={cn(glass, "right-[8%] top-[18%] w-[44%] p-3")}>
        <p className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-white/50">
          <Zap size={10} className="text-[var(--p)]" /> Quick note
        </p>
        <p className="mt-1.5 font-mono text-sm text-white">
          250 lunch<span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[var(--p)] align-middle" />
        </p>
        <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-[var(--p)]/20 px-2 py-0.5 text-[9px] text-[var(--p)]">
          <Check size={10} /> Saved · Food
        </p>
      </Layer>
      <Layer z={50} className={cn(glass, "bottom-[12%] right-[14%] w-[36%] animate-float p-2.5")}>
        <p className="text-[9px] text-white/50">Budget · Food</p>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-[var(--p)]" />
        </div>
        <p className="mt-1 text-[9px] text-white/70">68% used</p>
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------- DevTinder -- */
function DevTinderMock() {
  return (
    <>
      {[
        { z: 0, rot: -10, x: "22%" },
        { z: 25, rot: 6, x: "30%" },
      ].map((c, i) => (
        <Layer
          key={i}
          z={c.z}
          className="top-[12%] h-[74%] w-[40%] rounded-2xl border border-white/10 bg-white/5"
          style={{ left: c.x, transform: `translateZ(${c.z}px) rotate(${c.rot}deg)` }}
        />
      ))}
      <Layer z={60} className="left-[30%] top-[10%] h-[76%] w-[40%] overflow-hidden rounded-2xl border border-white/15 bg-[#0f1726] shadow-2xl">
        <div className="h-[55%] bg-gradient-to-br from-[var(--p)]/60 to-indigo-500/40" />
        <div className="absolute left-3 top-[42%] h-12 w-12 rounded-full border-2 border-[#0f1726] bg-gradient-to-br from-amber-300 to-pink-500" />
        <div className="p-3 pt-6">
          <p className="text-xs font-semibold text-white">dev_aisha, 24</p>
          <p className="text-[9px] text-white/50">Backend · Node.js</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {["React", "MongoDB", "JWT"].map((s) => (
              <span key={s} className="rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] text-white/80">
                {s}
              </span>
            ))}
          </div>
        </div>
      </Layer>
      <Layer z={110} className="bottom-[6%] left-1/2 flex -translate-x-1/2 gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-rose-400 shadow-xl">
          <X size={16} />
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--p)] text-black shadow-xl shadow-[var(--p)]/40">
          <Heart size={16} fill="currentColor" />
        </span>
      </Layer>
      <Layer z={90} className={cn(glass, "right-[5%] top-[14%] animate-float px-2.5 py-1.5 text-[9px] text-white")}>
        Request sent ✓
      </Layer>
    </>
  );
}

/* ---------------------------------------------------------------- Nibblr -- */
function NibblrMock() {
  return (
    <>
      <Layer z={15} className="left-[8%] top-[12%] grid w-[58%] grid-cols-2 gap-2">
        {["Spice Route", "Pizza Hub", "Green Bowl", "Tandoor Co."].map((name, i) => (
          <div key={name} className="overflow-hidden rounded-lg border border-white/10 bg-black/40">
            <div className="h-10" style={{ background: `linear-gradient(135deg, var(--p), hsl(${i * 40 + 10} 70% 40%))`, opacity: 0.75 }} />
            <div className="p-1.5">
              <p className="truncate text-[9px] font-semibold text-white">{name}</p>
              <p className="text-[8px] text-white/50">★ 4.{3 + i} · 30 min</p>
            </div>
          </div>
        ))}
      </Layer>
      <Layer z={60} className={cn(glass, "right-[7%] top-[16%] w-[30%] overflow-hidden p-0")}>
        <div className="relative h-20 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.12),transparent_60%)]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:12px_12px]" />
          <MapPin size={20} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full animate-bounce text-[var(--p)]" fill="currentColor" />
        </div>
        <p className="p-2 text-[8px] text-white/70">Deliver to · Vijay Nagar</p>
      </Layer>
      <Layer z={100} className="bottom-[10%] right-[10%] flex items-center gap-2 rounded-full bg-[var(--p)] px-3 py-2 text-[10px] font-semibold text-black shadow-2xl shadow-[var(--p)]/40">
        <ShoppingBag size={13} /> 3 items · ₹548
      </Layer>
      <Layer z={70} className={cn(glass, "bottom-[14%] left-[12%] px-2.5 py-1.5 text-[9px] text-white")}>
        Coupon <span className="font-mono text-[var(--p)]">NIBBLR50</span> applied
      </Layer>
    </>
  );
}

/* ----------------------------------------------------------- Netflix GPT -- */
function NetflixMock() {
  return (
    <>
      {[0, 1].map((row) => (
        <Layer key={row} z={10 + row * 20} className="left-[6%] flex w-[90%] gap-2" style={{ top: `${44 + row * 26}%` }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-14 flex-1 rounded-md border border-white/10"
              style={{
                background: `linear-gradient(160deg, hsl(${(i * 47 + row * 90) % 360} 50% ${22 + i * 3}%), #0a0a0a)`,
              }}
            />
          ))}
        </Layer>
      ))}
      <Layer z={20} className="left-[6%] top-[12%] text-[var(--p)]">
        <p className="font-display text-xl font-black tracking-tight">NETFLIX<span className="text-white">GPT</span></p>
      </Layer>
      <Layer z={90} className={cn(glass, "right-[6%] top-[12%] flex w-[56%] items-center gap-2 px-3 py-2")}>
        <Sparkles size={13} className="shrink-0 text-[var(--p)]" />
        <span className="truncate font-mono text-[10px] text-white">funny sci-fi movies from the 90s</span>
        <span className="ml-auto rounded bg-[var(--p)] px-1.5 py-0.5 text-[8px] font-bold text-white">GPT</span>
      </Layer>
      <Layer z={60} className="right-[14%] top-[30%] flex h-8 w-8 animate-float items-center justify-center rounded-full bg-white text-black shadow-2xl">
        <Play size={14} fill="currentColor" />
      </Layer>
    </>
  );
}

/* ------------------------------------------------------------- Nova AI -- */
function NovaMock() {
  return (
    <>
      <Layer z={10} className="left-[6%] top-[10%] h-[80%] w-[20%] space-y-1.5 rounded-xl border border-white/10 bg-black/40 p-2">
        <div className="rounded-md bg-[var(--p)]/30 px-1.5 py-1 text-[8px] text-white">+ New chat</div>
        {["Explain JWT", "Regex help", "React hooks"].map((c) => (
          <div key={c} className="truncate rounded-md bg-white/5 px-1.5 py-1 text-[8px] text-white/60">
            {c}
          </div>
        ))}
      </Layer>
      <Layer z={50} className="right-[8%] top-[12%] max-w-[50%] rounded-2xl rounded-br-sm bg-blue-600 px-3 py-2 text-[10px] text-white shadow-xl">
        How do I debounce a search input?
      </Layer>
      <Layer z={80} className={cn(glass, "left-[30%] top-[36%] w-[60%] p-2.5")}>
        <p className="flex items-center gap-1.5 text-[9px] font-semibold text-white">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--p)]">
            <Bot size={10} />
          </span>
          Nova AI
        </p>
        <pre className="mt-1.5 overflow-hidden rounded-md bg-black/60 p-2 font-mono text-[8px] leading-relaxed text-white/80">
          <span className="text-[var(--p)]">const</span> id = setTimeout(search, <span className="text-amber-300">300</span>);
        </pre>
      </Layer>
      <Layer z={110} className={cn(glass, "bottom-[12%] left-[34%] flex gap-1 px-3 py-2")}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--p)]" style={{ animationDelay: `${i * 120}ms` }} />
        ))}
      </Layer>
    </>
  );
}

/* ------------------------------------------------------- Brightway Solar -- */
function SolarMock() {
  return (
    <>
      <Layer z={30} className="right-[12%] top-[8%]">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-[var(--p)]/50" />
          <Sun size={42} className="text-[var(--p)]" />
        </div>
      </Layer>
      <Layer z={10} className="bottom-[10%] left-[8%] grid w-[46%] grid-cols-4 gap-1" style={{ transform: "translateZ(10px) rotateX(35deg)" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-6 rounded-sm border border-sky-300/30 bg-gradient-to-br from-sky-500/50 to-indigo-900/80" />
        ))}
      </Layer>
      <Layer z={80} className={cn(glass, "left-[10%] top-[12%] w-[46%] p-3")}>
        <p className="text-[9px] uppercase tracking-widest text-white/50">Savings calculator</p>
        <p className="mt-1 font-display text-lg font-bold text-white">
          ₹2,400<span className="text-[10px] font-normal text-white/50"> / month</span>
        </p>
        <div className="mt-2 h-1 rounded-full bg-white/10">
          <div className="h-full w-3/4 rounded-full bg-[var(--p)]" />
        </div>
      </Layer>
      <Layer z={110} className="bottom-[14%] right-[8%] rounded-full bg-[var(--p)] px-3 py-2 text-[10px] font-bold text-black shadow-2xl shadow-[var(--p)]/40">
        Get Free Quote →
      </Layer>
    </>
  );
}

/* ------------------------------------------------------ Next.js video app -- */
function VideoMock() {
  return (
    <>
      {[
        { z: 10, left: "14%", rot: -8 },
        { z: 60, left: "36%", rot: 0 },
        { z: 10, left: "58%", rot: 8 },
      ].map((v, i) => (
        <Layer
          key={i}
          z={v.z}
          className="top-[10%] flex h-[80%] w-[26%] items-center justify-center overflow-hidden rounded-xl border border-white/15 shadow-2xl"
          style={{
            left: v.left,
            transform: `translateZ(${v.z}px) rotate(${v.rot}deg)`,
            background: `linear-gradient(180deg, color-mix(in srgb, var(--p) ${30 + i * 15}%, #000), #050505)`,
          }}
        >
          {i === 1 && (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black">
              <Play size={14} fill="currentColor" />
            </span>
          )}
        </Layer>
      ))}
      <Layer z={110} className={cn(glass, "bottom-[10%] right-[6%] w-[38%] p-2.5")}>
        <p className="flex items-center gap-1 text-[9px] text-white">
          <Upload size={10} className="text-[var(--p)]" /> Uploading to ImageKit
        </p>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] animate-pulse rounded-full bg-[var(--p)]" />
        </div>
      </Layer>
    </>
  );
}

/* -------------------------------------------------------------- MERN Todo -- */
function TodoMock() {
  const items = [
    { text: "Design REST API", done: true },
    { text: "Connect MongoDB Atlas", done: true },
    { text: "Deploy on Vercel", done: false },
    { text: "Add toast alerts", done: false },
  ];
  return (
    <>
      <Layer z={30} className={cn(glass, "left-[16%] top-[10%] w-[58%] p-3")}>
        <p className="mb-2 text-[10px] font-semibold text-white">My Todos</p>
        <div className="space-y-1.5">
          {items.map((item) => (
            <div key={item.text} className="flex items-center gap-2 rounded-md bg-black/30 px-2 py-1.5">
              <span
                className={cn(
                  "flex h-3.5 w-3.5 items-center justify-center rounded border",
                  item.done ? "border-[var(--p)] bg-[var(--p)] text-black" : "border-white/30"
                )}
              >
                {item.done && <Check size={9} strokeWidth={3} />}
              </span>
              <span className={cn("text-[9px]", item.done ? "text-white/40 line-through" : "text-white/85")}>{item.text}</span>
            </div>
          ))}
        </div>
      </Layer>
      <Layer z={100} className="bottom-[12%] right-[8%] animate-float rounded-lg bg-[var(--p)] px-3 py-2 text-[10px] font-semibold text-black shadow-2xl">
        ✓ Todo added
      </Layer>
    </>
  );
}

function DefaultMock() {
  return (
    <Layer z={60} className={cn(glass, "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 text-white")}>
      <Search size={18} />
    </Layer>
  );
}

const MOCKS: Record<string, () => React.ReactElement> = {
  paylog: PaylogMock,
  devtinder: DevTinderMock,
  nibblr: NibblrMock,
  "netflix-gpt": NetflixMock,
  "nova-ai": NovaMock,
  "brightway-solar": SolarMock,
  "nextjs-video-app": VideoMock,
  "mern-todo": TodoMock,
};
