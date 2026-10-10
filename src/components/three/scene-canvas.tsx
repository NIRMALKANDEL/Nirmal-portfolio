"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useTheme } from "@/context/theme-context";
import { cn } from "@/lib/utils";
import type { ScenePalette, SceneVariant } from "./scenes";

const Scene = dynamic(() => import("./scenes"), { ssr: false });

const palettes: Record<"dark" | "light", ScenePalette> = {
  dark: { primary: "#ff6b35", secondary: "#3de0c8", tertiary: "#8b7bff", particles: "#ffffff" },
  light: { primary: "#d9480f", secondary: "#0d8a7b", tertiary: "#5b47e0", particles: "#5b47e0" },
};

/**
 * Drop-in 3D scene. Lazy-loads three.js, pauses rendering when scrolled out
 * of view, swaps colours with the theme and drops detail on small screens.
 */
export function SceneCanvas({
  variant,
  className,
  palette,
}: {
  variant: SceneVariant;
  className?: string;
  /** Override the theme palette (e.g. a project's brand colour). */
  palette?: Partial<ScenePalette>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduced = useReducedMotion() ?? false;
  const { theme } = useTheme();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-auto", className)}>
      <Scene
        variant={variant}
        palette={{ ...palettes[theme], ...palette }}
        active={inView}
        reduced={reduced}
        compact={compact}
      />
    </div>
  );
}
