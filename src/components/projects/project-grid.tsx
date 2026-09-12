"use client";

import { projects } from "@/data/projects";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";

export function ProjectGrid() {
  const { t } = useLanguage();

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.viewAllProjects} subtitle={t.projects.subtitle} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
