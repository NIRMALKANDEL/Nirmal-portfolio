"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Project } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SplitText } from "@/components/motion/split-text";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { ScaledProjectVisual } from "@/components/projects/project-visual";
import { ProjectLinks, ProjectMeta } from "@/components/projects/project-card";
import { LanguageBar, RepoMeta, formatMonth } from "@/components/projects/repo-stats";

export function ProjectDetail({ project, stats, next }: { project: Project; stats: RepoStats[]; next: Project }) {
  const { t } = useLanguage();
  const showcase = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: showcase, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const accent = project.theme.accent;
  const reduce = useReducedMotion();

  return (
    <article style={{ "--p": accent } as React.CSSProperties}>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-10 pt-32 sm:pt-40">
        <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-radial opacity-70" />
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-10 h-[420px] w-[70%] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
          style={{ background: accent }}
        />
        <Container>
          <Link
            href="/projects"
            className="group mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            {t.projects.backToProjects}
          </Link>
          <ProjectMeta project={project} />
          <h1 className="mt-5 font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.045em] text-[var(--foreground)]">
            <SplitText text={project.title} delay={0.1} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg text-[var(--muted)] sm:text-xl"
          >
            {project.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <ProjectLinks project={project} size="md" />
            <RepoMeta stats={stats} updatedLabel={t.projects.updated} />
          </motion.div>
        </Container>
      </section>

      {/* 3D showcase: tilted back, flattens as it reaches the middle of the screen */}
      <Container>
        <div ref={showcase} className="mx-auto max-w-5xl" style={{ perspective: 1400 }}>
          <motion.div style={reduce ? undefined : { rotateX, scale, transformOrigin: "50% 0%" }} className="preserve-3d">
            <TiltCard max={5} glow={accent} className="rounded-[2rem]">
              <div className="relative rounded-[2rem] border border-[var(--border)] shadow-[0_60px_140px_-40px_rgba(0,0,0,0.7)] preserve-3d">
                {/* Rounding is in the 640px design space, so it's scaled down with the mock. */}
                <ScaledProjectVisual project={project} rounded="rounded-[1.1rem]" />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </Container>

      {/* Body */}
      <Container className="grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.7fr_1fr]">
        <div className="flex flex-col gap-16">
          <Reveal>
            <SectionTitle index="01" title={t.projects.overview} />
            <p className="mt-5 text-base leading-relaxed text-[var(--muted)] sm:text-lg">{project.description}</p>
          </Reveal>

          <Reveal>
            <SectionTitle index="02" title={t.projects.problem} />
            <blockquote className="mt-5 border-l-2 pl-5 font-display text-xl leading-snug text-[var(--foreground)] sm:text-2xl" style={{ borderColor: accent }}>
              {project.problem}
            </blockquote>
          </Reveal>

          <div>
            <SectionTitle index="03" title={t.projects.keyFeatures} />
            <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2" stagger={0.05}>
              {project.features.map((feature) => (
                <RevealItem key={feature}>
                  <div className="flex h-full gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-sm leading-relaxed text-[var(--muted)] transition-colors hover:border-[var(--p)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-black" style={{ background: accent }}>
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {feature}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div>
            <SectionTitle index="04" title={t.projects.implementation} />
            <RevealGroup className="mt-6 flex flex-col" stagger={0.06}>
              {project.implementation.map((line, i) => (
                <RevealItem key={line}>
                  <div className="flex gap-5 border-b border-[var(--border)] py-5 last:border-0">
                    <span className="font-mono text-xs" style={{ color: accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-relaxed text-[var(--muted)]">{line}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <aside className="flex flex-col gap-4 self-start lg:sticky lg:top-28">
          <Reveal className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">{t.projects.technologies}</h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--foreground)]">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>

          {stats.length > 0 && (
            <Reveal delay={0.1} className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">{t.projects.languages}</h2>
              <LanguageBar stats={stats} className="mt-4" />
              <ul className="mt-5 flex flex-col gap-2 border-t border-[var(--border)] pt-4 font-mono text-[11px] text-[var(--muted)]">
                {stats.map((repo) => (
                  <li key={repo.fullName} className="flex items-center justify-between gap-3">
                    <a href={`https://github.com/${repo.fullName}`} target="_blank" rel="noopener noreferrer" className="truncate hover:text-[var(--foreground)]">
                      {repo.fullName}
                    </a>
                    <span className="shrink-0">{formatMonth(repo.createdAt)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.2} className="overflow-hidden rounded-3xl border border-[var(--border)]">
            <Image src={project.image} alt={`${project.title} preview`} width={1200} height={675} className="h-auto w-full" />
          </Reveal>
        </aside>
      </Container>

      {/* Next project */}
      <Container className="pb-24">
        <Link
          href={`/projects/${next.slug}`}
          className="group relative flex flex-col gap-3 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-12"
        >
          <span
            aria-hidden
            className="absolute inset-0 origin-left scale-x-0 opacity-15 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            style={{ background: next.theme.accent }}
          />
          <span className="relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">{t.projects.next}</span>
            <span className="mt-2 block font-display text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-6xl">{next.title}</span>
          </span>
          <span
            className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-black transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-45"
            style={{ background: next.theme.accent }}
          >
            <ArrowRight size={24} />
          </span>
        </Link>
      </Container>
    </article>
  );
}

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <h2 className="flex items-baseline gap-4 font-display text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
      <span className="font-mono text-xs font-normal" style={{ color: "var(--p)" }}>
        {index}
      </span>
      {title}
    </h2>
  );
}
