"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SceneCanvas } from "@/components/three/scene-canvas";
import type { SceneVariant } from "@/components/three/scenes";

/** Header for inner pages: big kinetic title with a live 3D scene beside it. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  scene = "rings",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  scene?: SceneVariant;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pb-12 pt-36 sm:pb-16 sm:pt-44">
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-radial opacity-70" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        // Fills the header height so the scene always fits inside it.
        className="absolute inset-y-0 -right-16 -z-10 w-[75vw] sm:right-0 sm:w-[min(48vw,560px)] lg:right-[4%]"
      >
        <SceneCanvas variant={scene} className="h-full w-full opacity-60 sm:opacity-100" />
      </motion.div>
      <Container>
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} subtitle={subtitle} className="max-w-3xl" />
        {children}
      </Container>
    </section>
  );
}
