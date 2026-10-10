"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SplitText } from "@/components/motion/split-text";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--accent)]"
        >
          <span className="h-px w-8 bg-[var(--accent)]" />
          {eyebrow}
        </motion.span>
      )}
      <SplitText
        as={as}
        text={title}
        inView
        stagger={0.025}
        className={cn(
          "font-display font-bold tracking-[-0.03em] text-[var(--foreground)]",
          as === "h1" ? "text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.92]" : "text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.95]"
        )}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-base text-[var(--muted)]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
