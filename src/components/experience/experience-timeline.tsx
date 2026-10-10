"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { experience } from "@/data/experience";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { TiltCard } from "@/components/motion/tilt-card";
import { cn } from "@/lib/utils";

export function ExperienceTimeline() {
  const { t } = useLanguage();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <PageHeader eyebrow={t.experience.eyebrow} title={t.experience.title} subtitle={t.experience.subtitle} scene="rings" />

      <Container className="pb-24">
        <ol ref={ref} className="relative flex flex-col gap-10 pl-10 sm:pl-16">
          <div aria-hidden className="absolute left-3 top-2 h-full w-px bg-[var(--border)] sm:left-5" />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute left-3 top-2 h-full w-px origin-top bg-gradient-to-b from-[var(--accent)] via-[var(--accent-3)] to-[var(--accent-2)] shadow-[0_0_16px_1px_var(--accent)] sm:left-5"
          />

          {experience.map((item, i) => (
            <li key={`${item.company}-${item.role}`} className="relative">
              <span
                aria-hidden
                className={cn(
                  // Centred on the track: track sits at 0.75rem / 1.25rem, list padding is 2.5rem / 4rem.
                  "absolute -left-7 top-8 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-[var(--background)] sm:-left-11",
                  item.isEngineering ? "border-[var(--accent)]" : "border-[var(--muted)]"
                )}
              >
                <span className={cn("h-2 w-2 rounded-full", item.isEngineering ? "bg-[var(--accent)]" : "bg-[var(--muted)]")} />
              </span>

              <motion.div
                initial={{ opacity: 0, rotateY: -25, x: 60 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformPerspective: 1200, transformOrigin: "0% 50%" }}
              >
                <TiltCard max={4} glow={item.isEngineering ? "var(--accent)" : "var(--muted)"} className="rounded-3xl">
                  <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 sm:p-9">
                    <span aria-hidden className="pointer-events-none absolute -right-4 -top-6 select-none font-display text-[7rem] font-bold leading-none text-stroke opacity-40">
                      0{experience.length - i}
                    </span>
                    <div className="relative flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                      <span>{item.duration}</span>
                      {!item.isEngineering && (
                        <span className="rounded-full border border-[var(--border)] px-2 py-0.5 normal-case tracking-normal">
                          {t.experience.nonEngineering}
                        </span>
                      )}
                    </div>
                    <h2 className="relative mt-3 font-display text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
                      {item.company}
                    </h2>
                    <p className="relative mt-1 text-base font-medium text-[var(--accent)]">{item.role}</p>
                    <ul className="relative mt-6 grid gap-3 sm:grid-cols-2">
                      {item.bulletList.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-[var(--muted)]">
                          <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-[var(--accent)]" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
