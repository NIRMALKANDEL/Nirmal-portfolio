"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/context/theme-context";

type Star = { x: number; y: number; r: number; alpha: number; speed: number; phase: number; depth: number };

/**
 * The hero's ambient look — twinkling stars over warm/cool glows — as a fixed
 * layer behind every page. A plain 2D canvas (no extra WebGL context): ~150
 * dots per frame, paused in background tabs, a single static frame under
 * reduced motion.
 */
export function StarfieldBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const color = theme === "dark" ? "255, 255, 255" : "91, 71, 224";
    const maxAlpha = theme === "dark" ? 0.85 : 0.45;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(220, Math.round((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() < 0.85 ? 0.4 + Math.random() * 0.7 : 1.1 + Math.random() * 0.8,
        alpha: 0.25 + Math.random() * 0.75,
        speed: 0.6 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        depth: 0.02 + Math.random() * 0.08, // scroll parallax factor
      }));
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const scroll = window.scrollY;
      for (const s of stars) {
        const twinkle = reduce ? 1 : 0.55 + 0.45 * Math.sin(time * 0.001 * s.speed + s.phase);
        // Stars drift up gently as you scroll, wrapping around the viewport.
        const y = (((s.y - scroll * s.depth) % height) + height) % height;
        ctx.globalAlpha = s.alpha * twinkle * maxAlpha;
        ctx.fillStyle = `rgb(${color})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) draw(0);
      else raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    };
    const onScroll = () => reduce && draw(0);
    const onResize = () => {
      resize();
      start();
    };

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce, theme]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-20 h-[560px] w-[560px] rounded-full bg-[var(--accent)] opacity-[0.1] blur-[130px]" />
      <div className="absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full bg-[var(--accent-3)] opacity-[0.1] blur-[130px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
