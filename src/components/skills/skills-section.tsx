"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useInView, useReducedMotion } from "motion/react";
import { Code2, Database, Server, Wrench } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/data/skills";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const ICONS: Record<SkillGroup["key"], React.ReactNode> = {
  frontend: <Code2 size={16} />,
  backend: <Server size={16} />,
  database: <Database size={16} />,
  tools: <Wrench size={16} />,
};

const GROUP_COLORS: Record<SkillGroup["key"], string> = {
  frontend: "var(--accent)",
  backend: "var(--accent-2)",
  database: "var(--accent-3)",
  tools: "#f5b83d",
};

export function SkillsSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState<SkillGroup["key"]>("frontend");
  const activeGroup = skillGroups.find((g) => g.key === active)!;

  return (
    <section id="skills" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-radial opacity-60" />
      <Container>
        <SectionHeading eyebrow={t.nav.skills} title={t.skills.title} subtitle={t.skills.subtitle} />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <div role="tablist" aria-label={t.skills.title} className="grid grid-cols-2 gap-2">
              {skillGroups.map((group) => (
                <button
                  key={group.key}
                  role="tab"
                  type="button"
                  aria-selected={active === group.key}
                  onClick={() => setActive(group.key)}
                  className={cn(
                    "relative flex min-h-12 items-center gap-2.5 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                    active === group.key
                      ? "border-transparent text-[var(--foreground)]"
                      : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  )}
                >
                  {active === group.key && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 rounded-2xl border bg-[var(--card)]"
                      style={{ borderColor: GROUP_COLORS[group.key] }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative" style={{ color: GROUP_COLORS[group.key] }}>
                    {ICONS[group.key]}
                  </span>
                  <span className="relative">{t.skills[group.key]}</span>
                  <span className="relative ml-auto font-mono text-[10px] text-[var(--muted)]">{group.items.length}</span>
                </button>
              ))}
            </div>

            <motion.ul key={active} className="flex flex-wrap gap-2" role="tabpanel">
              {activeGroup.items.map((skill, i) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, y: 14, rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 260, damping: 20 }}
                  style={{ transformPerspective: 600 }}
                  className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--foreground)]"
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <SkillSphere active={active} />
        </div>
      </Container>
    </section>
  );
}

/**
 * Every skill placed on a sphere (Fibonacci lattice) and projected each frame.
 * Drift is automatic; the pointer steers it. The active group glows.
 */
function SkillSphere({ active }: { active: SkillGroup["key"] }) {
  const reduce = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);
  const angle = useRef({ x: 0.3, y: 0, vx: 0.0011, vy: 0.0024 });
  const inView = useInView(container, { margin: "100px" });

  const points = useMemo(() => {
    const all = skillGroups.flatMap((g) => g.items.map((label) => ({ label, group: g.key })));
    const n = all.length;
    return all.map((item, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return { ...item, x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) };
    });
  }, []);

  useAnimationFrame(() => {
    const el = container.current;
    // Skip all work while off-screen (after the first layout pass).
    if (!el || (!inView && el.dataset.ready)) return;
    el.dataset.ready = "1";
    const a = angle.current;
    if (!reduce) {
      a.x += a.vx;
      a.y += a.vy;
    }
    const radius = el.clientWidth * 0.38;
    const [sx, cx, sy, cy] = [Math.sin(a.x), Math.cos(a.x), Math.sin(a.y), Math.cos(a.y)];
    points.forEach((p, i) => {
      const tag = tags.current[i];
      if (!tag) return;
      // rotate around Y, then X
      const x1 = p.x * cy + p.z * sy;
      const z1 = -p.x * sy + p.z * cy;
      const y2 = p.y * cx - z1 * sx;
      const z2 = p.y * sx + z1 * cx;
      const depth = (z2 + 1) / 2; // 0 (back) .. 1 (front)
      const scale = 0.55 + depth * 0.65;
      tag.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale})`;
      tag.style.opacity = String(0.15 + depth * 0.85);
      tag.style.zIndex = String(Math.round(depth * 100));
    });
  });

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || !container.current) return;
    const r = container.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    angle.current.vy = dx * 0.02;
    angle.current.vx = -dy * 0.02;
  }

  return (
    <div
      ref={container}
      onPointerMove={onPointerMove}
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[560px] select-none"
    >
      {/* Orbit rings drawn in CSS 3D behind the cloud */}
      <div className="absolute inset-[6%]" style={{ perspective: 900 }}>
        {[0, 60, 120].map((rot, i) => (
          <motion.div
            key={rot}
            className="absolute inset-0 rounded-full border border-[var(--border)]"
            style={{ rotateX: 72, rotateZ: rot }}
            animate={reduce ? undefined : { rotateZ: rot + 360 }}
            transition={{ duration: 30 + i * 8, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-20 blur-3xl" />
      <div className="absolute inset-0">
        {points.map((p, i) => (
          <span
            key={p.label}
            ref={(el) => {
              tags.current[i] = el;
            }}
            className={cn(
              "absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs transition-[color,border-color,background-color] duration-500 will-change-transform",
              p.group === active
                ? "bg-[var(--card)] font-semibold text-[var(--foreground)]"
                : "border-transparent text-[var(--muted)]"
            )}
            style={p.group === active ? { borderColor: GROUP_COLORS[p.group], boxShadow: `0 0 24px -6px ${GROUP_COLORS[p.group]}` } : undefined}
          >
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}
