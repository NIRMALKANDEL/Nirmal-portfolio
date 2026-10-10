"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";
import { SceneCanvas } from "@/components/three/scene-canvas";

export function ContactCta() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // The whole panel swings up from a 3D tilt as it enters (21st.dev "container scroll").
  const rotateX = useTransform(scrollYProgress, [0, 0.7], [28, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [0.88, 1]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <Container>
        <div style={{ perspective: 1400 }}>
          <motion.div
            style={reduce ? undefined : { rotateX, scale, transformOrigin: "50% 100%" }}
            className="relative isolate overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-[var(--card)] px-6 py-16 sm:px-12 sm:py-24"
          >
            <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-radial" />
            <div
              aria-hidden
              className="absolute -bottom-40 left-1/2 -z-20 h-80 w-[80%] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-20 blur-[100px]"
            />
            <SceneCanvas
              variant="knot"
              className="absolute -right-24 top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 opacity-90 sm:right-0 sm:h-[520px] sm:w-[520px] lg:right-8"
            />

            <div className="relative max-w-2xl">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]">{t.contact.ctaEyebrow}</span>
              <h2 className="mt-5 font-display text-[clamp(2.6rem,7vw,5.8rem)] font-bold leading-[0.92] tracking-[-0.04em] text-[var(--foreground)]">
                <SplitText text={t.contact.ctaTitle} inView className="block" />
                <SplitText text={t.contact.ctaHighlight} inView delay={0.3} gradient className="block pb-2" />
              </h2>
              <p className="mt-6 max-w-md text-base text-[var(--muted)]">{t.contact.ctaBody}</p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <LinkButton href="/contact" className="group h-14 px-8 text-base">
                    {t.contact.ctaButton}
                    <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:rotate-45" />
                  </LinkButton>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex h-14 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--glass)] px-6 text-sm font-medium text-[var(--foreground)] backdrop-blur transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <Mail size={16} />
                    {site.email}
                  </a>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
