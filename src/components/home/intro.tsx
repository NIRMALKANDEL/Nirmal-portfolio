"use client";

import { useLanguage } from "@/context/language-context";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import type { ProfileStats } from "@/lib/github";
import { Container } from "@/components/ui/container";
import { ScrollWords } from "@/components/motion/scroll-words";
import { CountUp } from "@/components/motion/count-up";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";

export function Intro({ profile }: { profile: ProfileStats | null }) {
  const { t } = useLanguage();
  const engineeringRoles = experience.filter((e) => e.isEngineering).length;

  const stats = [
    { value: projects.length, suffix: "", label: t.intro.projects },
    // Live from the GitHub API; falls back to "—" if the API is unreachable.
    { value: profile?.publicRepos ?? null, suffix: "", label: t.intro.repos, live: true },
    { value: engineeringRoles, suffix: "", label: t.intro.experience },
    { value: skillGroups.reduce((n, g) => n + g.items.length, 0), suffix: "+", label: t.nav.skills },
  ];

  const allSkills = skillGroups.flatMap((g) => g.items);
  const half = Math.ceil(allSkills.length / 2);

  return (
    <section id="intro" className="relative py-28 sm:py-36">
      <Container>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">
          {"// "}
          {t.intro.eyebrow}
        </span>
        <ScrollWords
          text={t.intro.statement}
          className="mt-6 max-w-5xl font-display text-[clamp(1.9rem,4.6vw,3.9rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--foreground)]"
        />

        <RevealGroup className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--border)] lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="flex flex-col gap-2 bg-[var(--background)] p-6 sm:p-8">
              <span className="font-display text-5xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">
                {stat.value === null ? "—" : <CountUp value={stat.value} suffix={stat.suffix} />}
              </span>
              <span className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
                {stat.label}
                {stat.live && stat.value !== null && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--accent-2)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-2)]" />
                    {t.intro.live}
                  </span>
                )}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      {/* Two counter-scrolling skill tickers, skewed into 3D space. */}
      <div className="mt-24 flex flex-col gap-4" style={{ perspective: 900 }}>
        <div style={{ transform: "rotateX(14deg) rotateZ(-2deg)" }}>
          <Marquee duration={45}>
            {allSkills.slice(0, half).map((skill) => (
              <SkillChip key={skill} label={skill} />
            ))}
          </Marquee>
        </div>
        <div style={{ transform: "rotateX(14deg) rotateZ(-2deg)" }}>
          <Marquee duration={50} reverse>
            {allSkills.slice(half).map((skill) => (
              <SkillChip key={skill} label={skill} outline />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function SkillChip({ label, outline = false }: { label: string; outline?: boolean }) {
  return (
    <span className="mx-3 inline-flex items-center gap-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
      <span className={outline ? "text-stroke" : "text-[var(--foreground)]"}>{label}</span>
      <span className="text-[var(--accent)]" aria-hidden>
        ✦
      </span>
    </span>
  );
}
