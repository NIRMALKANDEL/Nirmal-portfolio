"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { useLanguage } from "@/context/language-context";
import { GithubIcon } from "@/components/ui/brand-icons";
import { TiltCard } from "@/components/motion/tilt-card";
import { ProjectVisual } from "@/components/projects/project-visual";
import { LanguageBar, RepoMeta } from "@/components/projects/repo-stats";
import { cn } from "@/lib/utils";

export function ProjectMeta({ project, className }: { project: Project; className?: string }) {
  const { t } = useLanguage();
  const statusLabel = {
    live: t.projects.live,
    completed: t.projects.completed,
    "in-progress": t.projects.inProgress,
  }[project.status];

  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em]", className)}>
      <span style={{ color: project.theme.accent }}>{project.category}</span>
      <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
        <span className="relative flex h-1.5 w-1.5">
          {project.status === "live" && (
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[var(--accent-2)]" />
          )}
          <span
            className={cn(
              "relative h-1.5 w-1.5 rounded-full",
              project.status === "live" && "bg-[var(--accent-2)]",
              project.status === "completed" && "bg-[var(--muted)]",
              project.status === "in-progress" && "bg-[var(--accent)]"
            )}
          />
        </span>
        {statusLabel}
      </span>
      {project.builtWithClaude && (
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2 py-0.5 normal-case tracking-normal text-[var(--accent)]">
          <Sparkles size={11} />
          {t.projects.builtWithClaude}
        </span>
      )}
    </div>
  );
}

export function ProjectLinks({ project, size = "sm" }: { project: Project; size?: "sm" | "md" }) {
  const { t } = useLanguage();
  const links = [
    project.links.live && { href: project.links.live, label: t.projects.liveDemo, icon: <ExternalLink size={13} />, primary: true },
    project.links.github && { href: project.links.github, label: t.projects.githubLabel, icon: <GithubIcon size={13} /> },
    project.links.githubFrontend && { href: project.links.githubFrontend, label: t.projects.frontendRepo, icon: <GithubIcon size={13} /> },
    project.links.githubBackend && { href: project.links.githubBackend, label: t.projects.backendRepo, icon: <GithubIcon size={13} /> },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode; primary?: boolean }[];

  return (
    <div className="relative z-20 flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border font-medium transition-all duration-300 hover:-translate-y-0.5",
            size === "sm" ? "h-8 px-3 text-xs" : "h-10 px-4 text-sm",
            link.primary
              ? "border-transparent text-black"
              : "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--foreground)]"
          )}
          style={link.primary ? { background: project.theme.accent } : undefined}
        >
          {link.icon}
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function ProjectCard({ project, stats, index }: { project: Project; stats?: RepoStats[]; index: number }) {
  const { t } = useLanguage();

  return (
    <TiltCard max={7} glow={project.theme.accent} className="rounded-3xl">
      <article className="group relative flex h-full flex-col rounded-3xl border border-[var(--border)] bg-[var(--card)] preserve-3d transition-colors duration-500 hover:border-[color-mix(in_srgb,var(--p)_60%,transparent)]" style={{ "--p": project.theme.accent } as React.CSSProperties}>
        <Link href={`/projects/${project.slug}`} aria-label={`${project.title} — ${t.projects.caseStudy}`} className="relative block aspect-[16/10] preserve-3d">
          <ProjectVisual project={project} />
          <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60" style={{ transform: "translateZ(40px)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </Link>

        <div className="flex flex-1 flex-col gap-4 p-6" style={{ transform: "translateZ(30px)" }}>
          <ProjectMeta project={project} />
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]">
              <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 after:absolute after:inset-0 after:z-10">
                {project.title}
                <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: project.theme.accent }} />
              </Link>
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{project.tagline}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span key={tech} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] text-[var(--muted)]">
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="rounded-full border border-dashed border-[var(--border)] px-2.5 py-1 text-[11px] text-[var(--muted)]">
                +{project.technologies.length - 5} {t.projects.moreTech}
              </span>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-4 border-t border-[var(--border)] pt-4">
            <LanguageBar stats={stats} />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <ProjectLinks project={project} />
              <RepoMeta stats={stats} updatedLabel={t.projects.updated} />
            </div>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
