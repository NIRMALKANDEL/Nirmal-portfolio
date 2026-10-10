"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { SplitText } from "@/components/motion/split-text";
import { ScrambleText } from "@/components/motion/scramble-text";
import { Magnetic } from "@/components/motion/magnetic";
import { SceneCanvas } from "@/components/three/scene-canvas";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const reduce = useReducedMotion();
  const [first, ...rest] = site.name.split(" ");

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      {/* Backdrop: blueprint grid + colour washes */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-radial opacity-70" />
      <div
        aria-hidden
        className="absolute -left-40 top-10 -z-20 h-[520px] w-[520px] rounded-full bg-[var(--accent)] opacity-[0.12] blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-20 bottom-0 -z-20 h-[480px] w-[480px] rounded-full bg-[var(--accent-3)] opacity-[0.14] blur-[120px]"
      />

      {/* The 3D scene fills the section; content sits on top. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease, delay: 0.2 }}
        className="absolute inset-0 -z-10"
      >
        <SceneCanvas variant="hero" className="h-full w-full opacity-45 md:opacity-100" />
      </motion.div>

      <Container className="relative">
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity, rotateX: contentRotate, transformPerspective: 1200 }}
          className="flex max-w-3xl flex-col gap-7"
        >
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--glass)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[var(--accent-2)]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-2)]" />
            </span>
            {t.hero.available}
          </motion.span>

          <h1 className="font-display text-[clamp(3.4rem,11vw,9rem)] font-bold leading-[0.88] tracking-[-0.04em] text-[var(--foreground)]">
            <SplitText text={first} delay={0.25} className="block" />
            <SplitText text={rest.join(" ")} delay={0.45} gradient className="block pb-2" />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="font-mono text-sm text-[var(--accent)] sm:text-base"
          >
            <span className="text-[var(--muted)]">~/</span>{" "}
            <ScrambleText phrases={[...t.hero.roles]} />
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[var(--accent)]" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease }}
            className="max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg"
          >
            <span className="text-[var(--foreground)]">{t.hero.tagline}</span> {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <LinkButton href="/projects" className="group h-12 px-7">
                {t.hero.viewProjects}
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
              </LinkButton>
            </Magnetic>
            <Magnetic>
              <LinkButton href={site.github} variant="secondary" className="h-12">
                <GithubIcon size={16} />
                {t.hero.github}
              </LinkButton>
            </Magnetic>
            <Magnetic>
              <LinkButton href={site.linkedin} variant="secondary" className="h-12">
                <LinkedinIcon size={16} />
                {t.hero.linkedin}
              </LinkButton>
            </Magnetic>
            <Magnetic>
              <LinkButton href={site.resumeUrl} variant="ghost" target="_blank" className="h-12">
                <Download size={16} />
                {t.hero.resume}
              </LinkButton>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 flex items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={13} className="text-[var(--accent)]" />
            {t.hero.basedIn} {site.location}
          </span>
          <a
            href="#intro"
            className="group hidden items-center gap-3 transition-colors hover:text-[var(--foreground)] sm:inline-flex"
          >
            {t.hero.scroll}
            <span className="relative flex h-9 w-5 justify-center rounded-full border border-current">
              <motion.span
                animate={{ y: [4, 16, 4] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="mt-0 h-1.5 w-1 rounded-full bg-[var(--accent)]"
              />
            </span>
            <ArrowDownRight size={14} />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
