"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Award, Code2, Compass, Rocket, Sparkles, Users, X } from "lucide-react";
import { aboutContent } from "@/data/about";
import { certifications } from "@/data/certifications";
import { education } from "@/data/education";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Button, LinkButton } from "@/components/ui/button";
import { ScrollWords } from "@/components/motion/scroll-words";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { SkillsTimeline } from "@/components/skills/skills-timeline";

export function AboutContent() {
  const { t } = useLanguage();
  const primary = education.find((e) => e.level === "primary");
  const [openCert, setOpenCert] = useState<(typeof certifications)[number] | null>(null);

  useEffect(() => {
    if (!openCert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCert(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openCert]);

  const chapters = [
    { icon: <Code2 size={18} />, title: "Focus", body: aboutContent.focus, color: "var(--accent)" },
    { icon: <Compass size={18} />, title: "Path", body: aboutContent.path, color: "var(--accent-3)" },
    { icon: <Sparkles size={18} />, title: "Now", body: aboutContent.now, color: "var(--accent-2)" },
    { icon: <Users size={18} />, title: "Outside code", body: aboutContent.interests, color: "#f5b83d" },
  ];

  return (
    <>
      <PageHeader eyebrow={t.about.eyebrow} title={`${t.about.title} — ${site.name.split(" ")[0]}`} scene="knot" />

      <Container className="pb-12">
        <ScrollWords
          text={aboutContent.intro}
          className="max-w-5xl font-display text-[clamp(1.6rem,3.6vw,3rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--foreground)]"
        />

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          {chapters.map((chapter, i) => (
            <Reveal key={chapter.title} tilt delay={(i % 2) * 0.1}>
              <TiltCard max={6} glow={chapter.color} className="rounded-3xl">
                <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7">
                  <div aria-hidden className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-15 blur-3xl" style={{ background: chapter.color }} />
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)]" style={{ color: chapter.color }}>
                      {chapter.icon}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">0{i + 1}</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]">{chapter.title}</h2>
                  <p className="text-[15px] leading-relaxed text-[var(--muted)]">{chapter.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {primary && (
          <Reveal className="mt-6">
            <div className="flex flex-col gap-5 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <Rocket size={20} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-[var(--foreground)]">{primary.degree}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {primary.institution} · {primary.duration}
                  </p>
                </div>
              </div>
              <LinkButton href="/education" variant="secondary" size="sm" className="group">
                {t.about.viewEducation}
                <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
              </LinkButton>
            </div>
          </Reveal>
        )}

        {certifications.map((cert) => (
          <Reveal key={cert.title} className="mt-4">
            <div className="flex flex-col gap-5 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <Award size={20} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-[var(--foreground)]">{cert.title}</p>
                  <p className="text-sm text-[var(--muted)]">
                    {cert.issuer}
                    {cert.instructor ? ` · ${cert.instructor}` : ""} · Certificate of Completion
                  </p>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="group" onClick={() => setOpenCert(cert)}>
                View Certificate
                <ArrowUpRight size={14} className="transition-transform group-hover:rotate-45" />
              </Button>
            </div>
          </Reveal>
        ))}
      </Container>

      {openCert &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${openCert.title} certificate`}
          onClick={() => setOpenCert(null)}
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpenCert(null)}
              aria-label="Close certificate"
              className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] shadow-md transition-transform hover:scale-110"
            >
              <X size={16} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={openCert.image}
              alt={`${openCert.title} certificate from ${openCert.issuer}`}
              className="h-auto max-h-[75vh] w-full rounded-xl object-contain"
            />
          </div>
        </div>,
          document.body,
        )}

      <SkillsTimeline />
    </>
  );
}
