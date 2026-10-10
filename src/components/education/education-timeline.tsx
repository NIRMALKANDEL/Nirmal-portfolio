"use client";

import { GraduationCap, School } from "lucide-react";
import { education } from "@/data/education";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";

export function EducationTimeline() {
  const { t } = useLanguage();
  const primary = education.filter((e) => e.level === "primary");
  const secondary = education.filter((e) => e.level === "secondary");

  return (
    <>
      <PageHeader eyebrow={t.education.eyebrow} title={t.education.title} subtitle={t.education.subtitle} scene="knot" />

      <Container className="flex flex-col gap-6 pb-24">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">{t.education.primaryLabel}</span>
        {primary.map((item) => (
          <Reveal key={item.degree} tilt>
            <TiltCard max={5} className="rounded-[2rem]">
              <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 sm:p-12">
                <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--accent-3)] opacity-20 blur-3xl" />
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <GraduationCap size={26} />
                </span>
                {item.duration && (
                  <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">{item.duration}</p>
                )}
                <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-[var(--foreground)] sm:text-5xl">
                  {item.degree}
                </h2>
                <p className="mt-4 text-base text-[var(--muted)]">{item.institution}</p>
                {item.university && <p className="mt-1 text-sm text-[var(--muted)]">{item.university}</p>}
              </div>
            </TiltCard>
          </Reveal>
        ))}

        <span className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">{t.education.supportingLabel}</span>
        <div className="grid gap-4 sm:grid-cols-2">
          {secondary.map((item, i) => (
            <Reveal key={item.degree} tilt delay={i * 0.1}>
              <TiltCard max={7} glow="var(--accent-2)" className="rounded-3xl">
                <div className="flex h-full items-center gap-4 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--accent-2)]">
                    <School size={18} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[var(--foreground)]">{item.degree}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.institution}</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
