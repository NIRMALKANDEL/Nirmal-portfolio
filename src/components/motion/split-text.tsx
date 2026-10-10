"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Splits text into letters that flip up into place in 3D, one after another.
 * The full string stays available to screen readers via aria-label.
 */
export function SplitText({
  text,
  className,
  letterClassName,
  delay = 0,
  stagger = 0.035,
  as: Tag = "span",
  inView = false,
  gradient = false,
}: {
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "p";
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
  /**
   * Gradient text: animate whole words, each carrying its own gradient.
   * background-clip:text drops glyphs that live on separately composited
   * child layers, so letters can't be split under a shared gradient.
   */
  gradient?: boolean;
}) {
  const words = text.split(" ");
  let index = 0;
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } }
    : { animate: "show" };

  if (gradient) {
    return (
      <Tag aria-label={text} className={cn(!/\b(block|flex)\b/.test(className ?? "") && "inline-block", className)}>
        <motion.span aria-hidden initial="hidden" {...trigger} className="inline-block" style={{ perspective: 800 }}>
          {words.map((word, w) => (
            <motion.span
              key={`${word}-${w}`}
              className={cn("text-gradient inline-block origin-bottom pr-[0.08em]", letterClassName)}
              variants={{
                hidden: { opacity: 0, y: "0.5em", rotateX: -90 },
                show: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: { delay: delay + w * 0.12, type: "spring", stiffness: 120, damping: 16 },
                },
              }}
            >
              {word}
              {w < words.length - 1 && " "}
            </motion.span>
          ))}
        </motion.span>
      </Tag>
    );
  }

  return (
    <Tag aria-label={text} className={cn(!/\b(block|flex)\b/.test(className ?? "") && "inline-block", className)}>
      <motion.span
        aria-hidden
        initial="hidden"
        {...trigger}
        className="inline-block"
        style={{ perspective: 800 }}
      >
        {words.map((word, w) => (
          <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const i = index++;
              return (
                <motion.span
                  key={i}
                  className={cn("inline-block origin-bottom preserve-3d", letterClassName)}
                  variants={{
                    hidden: { opacity: 0, y: "0.6em", rotateX: -95 },
                    show: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: { delay: delay + i * stagger, type: "spring", stiffness: 160, damping: 16 },
                    },
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
            {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
