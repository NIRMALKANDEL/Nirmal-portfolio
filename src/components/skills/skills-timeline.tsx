"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { skillsTimeline } from "@/data/timeline";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function SkillsTimeline() {
  const { t } = useLanguage();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const beam = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const beamHeight = useTransform(beam, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow={t.skills.timelineEyebrow}
          title={t.experience.journeyTitle}
          subtitle={t.skills.timelineSubtitle}
          align="center"
          className="mx-auto"
        />

        <ol ref={ref} className="relative mx-auto mt-20 max-w-5xl">
          {/* Track + scroll-driven beam */}
          <div aria-hidden className="absolute left-4 top-0 h-full w-px bg-[var(--border)] md:left-1/2" />
          <motion.div
            aria-hidden
            style={{ height: beamHeight }}
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent-3)] to-[var(--accent-2)] shadow-[0_0_18px_2px_var(--accent)] md:left-1/2"
          />

          {skillsTimeline.map((entry, i) => {
            const right = i % 2 === 1;
            return (
              <li key={entry.title} className="relative grid pb-14 pl-12 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0">
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-30% 0px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="absolute left-4 top-1.5 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--background)] md:left-1/2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </motion.span>

                <div className={cn("hidden md:block", right ? "md:order-1" : "md:order-2")}>
                  <p className={cn("pt-0.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]", !right && "text-left", right && "text-right")}>
                    {entry.period}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, rotateY: right ? -35 : 35, x: right ? -40 : 40 }}
                  whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformPerspective: 1000, transformOrigin: right ? "0% 50%" : "100% 50%" }}
                  className={cn(right ? "md:order-2" : "md:order-1")}
                >
                  <div className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors duration-300 hover:border-[var(--accent)] sm:p-6">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] md:hidden">{entry.period}</p>
                    <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-[var(--foreground)] md:mt-0">{entry.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{entry.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] text-[var(--muted)]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
