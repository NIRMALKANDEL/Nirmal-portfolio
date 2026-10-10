"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getFeaturedProjects, projects, type Project } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/tilt-card";
import { Magnetic } from "@/components/motion/magnetic";
import { ProjectVisual } from "@/components/projects/project-visual";
import { ProjectLinks, ProjectMeta } from "@/components/projects/project-card";
import { LanguageBar, RepoMeta } from "@/components/projects/repo-stats";

/**
 * Featured projects as a sticky 3D deck: each card pins near the top while
 * the next one slides over it, and the cards underneath shrink and tip back
 * in 3D.
 */
export function FeaturedProjects({ stats }: { stats: Record<string, RepoStats[]> }) {
  const { t } = useLanguage();
  const featured = getFeaturedProjects();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} subtitle={t.projects.subtitle} />
          <span className="font-display text-[clamp(4rem,10vw,8rem)] font-bold leading-none text-stroke" aria-hidden>
            {String(featured.length).padStart(2, "0")}
          </span>
        </div>

        <div ref={ref} className="relative mt-14" style={{ perspective: 1600 }}>
          {featured.map((project, i) => (
            <StackCard
              key={project.slug}
              project={project}
              index={i}
              total={featured.length}
              progress={scrollYProgress}
              stats={stats[project.slug]}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-[var(--muted)]">
            + {projects.length - featured.length} more — {projects.filter((p) => !p.featured).map((p) => p.title).join(", ")}
          </p>
          <Magnetic>
            <LinkButton href="/projects" className="group h-12 px-7">
              {t.projects.viewAll}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </LinkButton>
          </Magnetic>
        </div>
      </Container>
    </section>
  );
}

function StackCard({
  project,
  index,
  total,
  progress,
  stats,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stats?: RepoStats[];
}) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const deck = useIsDesktop() && !reduce;
  const start = index / total;
  const targetScale = 1 - (total - index - 1) * 0.05;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const rotateX = useTransform(progress, [start, 1], [0, index === total - 1 ? 0 : -8]);
  // Same look as brightness(1 → 0.55), but opacity-only so it stays on the GPU.
  const dim = useTransform(progress, [start, 1], [0, index === total - 1 ? 0 : 0.45]);

  return (
    <div className="relative pb-6 lg:sticky lg:top-28 lg:flex lg:h-[min(78vh,720px)] lg:items-start lg:pb-10" style={{ zIndex: index + 1 }}>
      <motion.div
        // The 3D deck only runs where the cards are sticky (lg+).
        style={deck ? { scale, rotateX, top: index * 18, transformOrigin: "50% 0%" } : undefined}
        className="relative h-full w-full"
      >
        <TiltCard max={4} glow={project.theme.accent} className="rounded-[2rem]">
          <article
            className="relative grid h-full rounded-[2rem] border border-[var(--border)] bg-[var(--card)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] preserve-3d lg:grid-cols-[1.25fr_1fr]"
            style={{ "--p": project.theme.accent } as React.CSSProperties}
          >
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${project.title} — ${t.projects.caseStudy}`}
              className="relative block aspect-[16/11] preserve-3d lg:aspect-auto"
            >
              <ProjectVisual project={project} rounded="rounded-t-[2rem] lg:rounded-l-[2rem] lg:rounded-tr-none" />
            </Link>

            <div className="flex min-h-0 flex-col gap-4 p-6 sm:p-8 lg:overflow-hidden lg:p-10" style={{ transform: "translateZ(40px)" }}>
              <div className="flex items-center justify-between gap-4">
                <ProjectMeta project={project} />
                <span className="font-mono text-xs text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--muted)] sm:text-base">{project.tagline}</p>
              <div className="hidden flex-wrap gap-1.5 sm:flex">
                {project.technologies.slice(0, 6).map((tech) => (
                  <span key={tech} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] text-[var(--muted)]">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-4">
                <LanguageBar stats={stats} className="hidden sm:flex" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <ProjectLinks project={project} />
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/cs inline-flex items-center gap-1 text-sm font-medium text-[var(--foreground)]"
                  >
                    {t.projects.caseStudy}
                    <ArrowUpRight size={16} className="transition-transform group-hover/cs:rotate-45" style={{ color: project.theme.accent }} />
                  </Link>
                </div>
                <RepoMeta stats={stats} updatedLabel={t.projects.updated} />
              </div>
            </div>
          </article>
        </TiltCard>
        {deck && (
          <motion.div
            aria-hidden
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 z-30 rounded-[2rem] bg-black"
          />
        )}
      </motion.div>
    </div>
  );
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return desktop;
}
