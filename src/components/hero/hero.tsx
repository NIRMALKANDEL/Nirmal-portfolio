"use client";

import { ArrowDown, Download } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(50%_55%_at_20%_0%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent),radial-gradient(45%_50%_at_90%_10%,color-mix(in_srgb,var(--accent-2)_18%,transparent),transparent)]"
      />
      <Container>
        <div className="flex flex-col gap-6 animate-fade-up">
          <span className="inline-flex w-fit items-center rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
            {t.hero.eyebrow}
          </span>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
            {site.name}
          </h1>

          <p className="max-w-xl text-lg text-[var(--foreground)] sm:text-xl">
            {t.hero.tagline}
          </p>

          <p className="max-w-xl text-[15px] text-[var(--muted)] sm:text-base">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <LinkButton href="/projects">{t.hero.viewProjects}</LinkButton>
            <LinkButton href={site.github} variant="secondary">
              <GithubIcon size={16} />
              {t.hero.github}
            </LinkButton>
            <LinkButton href={site.linkedin} variant="secondary">
              <LinkedinIcon size={16} />
              {t.hero.linkedin}
            </LinkButton>
            <LinkButton href={site.resumeUrl} variant="ghost" target="_blank">
              <Download size={16} />
              {t.hero.resume}
            </LinkButton>
          </div>
        </div>

        <a
          href="#skills"
          className="mt-16 hidden w-fit items-center gap-2 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] sm:flex"
        >
          {t.common.scrollDown}
          <ArrowDown size={14} />
        </a>
      </Container>
    </section>
  );
}
