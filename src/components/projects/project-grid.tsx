"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { cn } from "@/lib/utils";

export function ProjectGrid({ stats }: { stats: Record<string, RepoStats[]> }) {
  const { t } = useLanguage();
  const categories = ["all", ...new Set(projects.map((p) => p.category))];
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader eyebrow={t.projects.eyebrow} title={t.projects.viewAllProjects} subtitle={t.projects.subtitle} scene="rings">
        <div role="tablist" aria-label="Filter projects" className="mt-10 flex flex-wrap gap-2">
          {categories.map((category) => {
            const count = category === "all" ? projects.length : projects.filter((p) => p.category === category).length;
            const active = filter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(category)}
                className={cn(
                  "relative min-h-10 rounded-full border px-4 py-2 text-sm transition-colors",
                  active ? "border-transparent text-[var(--accent-foreground)]" : "border-[var(--border)] bg-[var(--glass)] text-[var(--muted)] backdrop-blur hover:text-[var(--foreground)]"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {category === "all" ? t.projects.all : category}
                  <span className="ml-1.5 font-mono text-[10px] opacity-70">{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </PageHeader>

      <Container className="pb-24">
        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9, rotateX: 25, y: 40 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 1200 }}
              >
                <ProjectCard project={project} stats={stats[project.slug]} index={projects.indexOf(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </>
  );
}
