"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/context/language-context";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GithubIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const { locale, t } = useLanguage();

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] card-elevated transition-colors hover:border-[var(--accent)]",
        featured && "lg:flex-row"
      )}
    >
      <div className={cn("relative aspect-video w-full overflow-hidden", featured && "lg:w-1/2")}>
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          priority={featured}
        />
        {project.status === "in-progress" && (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
            {t.projects.inProgress}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-[var(--foreground)] sm:text-xl">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--muted)]">{project.tagline[locale]}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, featured ? 7 : 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {project.description[locale]}
        </p>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.links.live && (
            <LinkButton href={project.links.live} size="sm">
              <ExternalLink size={14} />
              {t.projects.liveDemo}
            </LinkButton>
          )}
          {project.links.github && (
            <LinkButton href={project.links.github} variant="secondary" size="sm">
              <GithubIcon size={14} />
              {t.projects.githubLabel}
            </LinkButton>
          )}
          {project.links.githubFrontend && (
            <LinkButton href={project.links.githubFrontend} variant="secondary" size="sm">
              <GithubIcon size={14} />
              {t.projects.frontendRepo}
            </LinkButton>
          )}
          {project.links.githubBackend && (
            <LinkButton href={project.links.githubBackend} variant="secondary" size="sm">
              <GithubIcon size={14} />
              {t.projects.backendRepo}
            </LinkButton>
          )}
          <LinkButton href={`/projects/${project.slug}`} variant="ghost" size="sm">
            {t.projects.caseStudy}
          </LinkButton>
        </div>
      </div>
    </article>
  );
}
