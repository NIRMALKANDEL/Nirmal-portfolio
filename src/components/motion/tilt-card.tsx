"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A card that tilts toward the pointer in 3D and lights up under it
 * (21st.dev "spotlight card" + 3D tilt). Children can pop out of the surface
 * with `style={{ transform: "translateZ(40px)" }}` because the card keeps
 * preserve-3d.
 */
export function TiltCard({
  children,
  className,
  max = 10,
  glow = "var(--accent)",
}: {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const lightX = useTransform(px, (v) => `${v * 100}%`);
  const lightY = useTransform(py, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${lightX} ${lightY}, color-mix(in srgb, ${glow} 22%, transparent), transparent 45%)`;
  const opacity = useSpring(0, { stiffness: 200, damping: 25 });

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    opacity.set(1);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
    opacity.set(0);
  }

  return (
    <div style={{ perspective: 1400 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX, rotateY }}
        className={cn("group/tilt relative h-full preserve-3d", className)}
      >
        {children}
        <motion.div
          aria-hidden
          style={{ background: spotlight, opacity }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
        />
      </motion.div>
    </div>
  );
}
