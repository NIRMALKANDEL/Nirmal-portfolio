"use client";

import { getFeaturedProjects } from "@/data/projects";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";

export function FeaturedProjects() {
  const { t } = useLanguage();
  const featured = getFeaturedProjects();
  const bigCards = featured.slice(0, 2);
  const smallCards = featured.slice(2);

  return (
    <section id="projects" className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} subtitle={t.projects.subtitle} />
          <LinkButton href="/projects" variant="secondary" size="sm" className="shrink-0">
            {t.projects.viewAll}
          </LinkButton>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {bigCards.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
          {smallCards.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2">
              {smallCards.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
