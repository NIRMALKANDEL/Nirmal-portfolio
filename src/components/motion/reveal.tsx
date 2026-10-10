"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Tilt back in 3D while entering. */
  tilt?: boolean;
  y?: number;
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades + lifts (optionally swings in from a 3D tilt) when scrolled into view. */
export function Reveal({ children, delay = 0, tilt = false, y = 40, style, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, rotateX: tilt ? 22 : 0, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay, ease }}
      style={{ transformPerspective: 1200, transformOrigin: "50% 100%", ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its direct <RevealItem> children. */
export function RevealGroup({
  children,
  stagger = 0.08,
  className,
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1000 }}
      variants={{
        hidden: { opacity: 0, y: 30, rotateX: 18 },
        show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}
