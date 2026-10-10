"use client";

import { Gamepad2, Megaphone, Smartphone, Trophy } from "lucide-react";
import { nonTechExperience } from "@/data/non-tech";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";

const ICONS = [<Trophy key="t" size={20} />, <Gamepad2 key="g" size={20} />, <Smartphone key="s" size={20} />, <Megaphone key="m" size={20} />];
const COLORS = ["#f5b83d", "var(--accent)", "var(--accent-3)", "var(--accent-2)"];

export function NonTechContent() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t.beyondCode.eyebrow} title={t.beyondCode.title} subtitle={t.beyondCode.subtitle} scene="rings">
        <p className="mt-4 max-w-2xl text-sm text-[var(--muted)]">{t.beyondCode.description}</p>
      </PageHeader>

      <Container className="grid gap-5 pb-24 md:grid-cols-2">
        {nonTechExperience.map((entry, i) => (
          <Reveal key={entry.title} tilt delay={(i % 2) * 0.1}>
            <TiltCard max={8} glow={COLORS[i % COLORS.length]} className="rounded-3xl">
              <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 preserve-3d">
                <div aria-hidden className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20 blur-3xl" style={{ background: COLORS[i % COLORS.length] }} />
                <div className="flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-black"
                    style={{ background: COLORS[i % COLORS.length] }}
                  >
                    {ICONS[i % ICONS.length]}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">{entry.context}</span>
                </div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]">{entry.title}</h2>
                <p className="text-[15px] leading-relaxed text-[var(--muted)]">{entry.description}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {entry.highlights.map((h) => (
                    <span key={h} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--muted)]">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </Container>
    </>
  );
}
