"use client";

import Link from "next/link";
import { ArrowUpRight, Briefcase, Gamepad2, GraduationCap, Sparkles } from "lucide-react";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { nonTechExperience } from "@/data/non-tech";
import { aboutContent } from "@/data/about";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TiltCard } from "@/components/motion/tilt-card";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Bento grid: experience, education, Beyond Code and what I'm doing now. */
export function ExperiencePreview() {
  const { t } = useLanguage();
  const roles = experience.filter((e) => e.featuredOnHome);
  const degree = education.find((e) => e.level === "primary");

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading eyebrow={t.experience.eyebrow} title={t.experience.title} subtitle={t.experience.subtitle} />

        <div className="mt-14 grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-6">
          {/* Experience — big tile */}
          <Reveal tilt className="md:col-span-4 md:row-span-2">
            <BentoTile href="/experience" label={t.experience.viewAll} icon={<Briefcase size={18} />} accent="var(--accent)">
              <ul className="flex flex-col divide-y divide-[var(--border)]">
                {roles.map((role) => (
                  <li key={role.company} className="flex flex-col gap-3 py-6 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
                        {role.company}
                      </h3>
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">{role.duration}</span>
                    </div>
                    <p className="text-sm font-medium text-[var(--accent)]">{role.role}</p>
                    <ul className="grid gap-1.5 text-sm text-[var(--muted)] sm:grid-cols-2">
                      {role.bulletList.slice(0, 2).map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--muted)]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </BentoTile>
          </Reveal>

          {/* Education */}
          {degree && (
            <Reveal tilt delay={0.1} className="md:col-span-2">
              <BentoTile href="/education" label={t.education.viewAll} icon={<GraduationCap size={18} />} accent="var(--accent-3)">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">{degree.duration}</p>
                <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-[var(--foreground)]">{degree.degree}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{degree.institution}</p>
              </BentoTile>
            </Reveal>
          )}

          {/* Now */}
          <Reveal tilt delay={0.15} className="md:col-span-2">
            <BentoTile icon={<Sparkles size={18} />} accent="var(--accent-2)">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-2)]">Now</p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{aboutContent.now}</p>
            </BentoTile>
          </Reveal>

          {/* Beyond code */}
          <Reveal tilt delay={0.1} className="md:col-span-6">
            <BentoTile href="/non-tech" label={t.beyondCode.viewMore} icon={<Gamepad2 size={18} />} accent="#f5b83d">
              <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#f5b83d]">{t.beyondCode.eyebrow}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">{t.beyondCode.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t.beyondCode.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {nonTechExperience.map((entry) => (
                    <span key={entry.title} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--foreground)]">
                      {entry.title}
                    </span>
                  ))}
                </div>
              </div>
            </BentoTile>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function BentoTile({
  children,
  href,
  label,
  icon,
  accent,
}: {
  children: React.ReactNode;
  href?: string;
  label?: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <TiltCard max={5} glow={accent} className="rounded-3xl">
      <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: accent }}
        />
        <div className="flex items-center justify-between">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)]"
            style={{ color: accent }}
          >
            {icon}
          </span>
          {href && label && (
            <Link
              href={href}
              className={cn(
                "group/link inline-flex items-center gap-1 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]",
                "after:absolute after:inset-0"
              )}
            >
              {label}
              <ArrowUpRight size={14} className="transition-transform group-hover/link:rotate-45" />
            </Link>
          )}
        </div>
        <div className="relative">{children}</div>
      </div>
    </TiltCard>
  );
}
