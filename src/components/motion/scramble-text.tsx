"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

/**
 * Cycles through a list of phrases, decoding each one from random glyphs.
 * Screen readers get the first phrase only (aria-live would be noisy).
 */
export function ScrambleText({
  phrases,
  className,
  hold = 2600,
}: {
  phrases: string[];
  className?: string;
  hold?: number;
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [output, setOutput] = useState(phrases[0]);

  useEffect(() => {
    if (reduce || phrases.length < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % phrases.length), hold);
    return () => window.clearTimeout(id);
  }, [index, hold, phrases.length, reduce]);

  useEffect(() => {
    if (reduce) return;
    const target = phrases[index];
    let frame = 0;
    const total = 28;
    let raf = 0;
    const tick = () => {
      frame++;
      const revealed = Math.floor((frame / total) * target.length);
      setOutput(
        target
          .split("")
          .map((c, i) =>
            i < revealed || c === " " ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );
      if (frame < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, phrases, reduce]);

  return (
    <span className={className}>
      <span className="sr-only">{phrases[0]}</span>
      <span aria-hidden>{reduce ? phrases[0] : output}</span>
    </span>
  );
}
