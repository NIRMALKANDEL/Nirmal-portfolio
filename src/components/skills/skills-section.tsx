"use client";

import { skillGroups } from "@/data/skills";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { SkillsTimeline } from "@/components/skills/skills-timeline";

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="bg-[var(--surface)] py-16 sm:py-20">
      <Container>
        <SectionHeading title={t.skills.title} subtitle={t.skills.subtitle} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <div
              key={group.key}
              className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] card-elevated"
            >
              <div
                className="h-1"
                style={{
                  background: index % 2 === 0 ? "var(--accent)" : "var(--accent-2)",
                }}
              />
              <div className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--foreground)]">
                  {t.skills[group.key]}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <SkillsTimeline />
      </Container>
    </section>
  );
}
