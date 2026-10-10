"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

// Deterministic layout for the floating pixel blocks (same on every render).
const PIXELS = Array.from({ length: 16 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * n) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: `${4 + r(12.9898) * 92}%`,
    size: 6 + Math.round(r(78.233) * 3) * 4,
    duration: 14 + r(3.7) * 14,
    delay: -r(9.1) * 28,
    color: ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "#f5b83d"][i % 4],
  };
});

const subscribe = () => () => {};

/**
 * Retro-arcade backdrop for the Beyond Code page: a neon perspective grid
 * scrolling toward the viewer, pixel blocks drifting up, and faint CRT
 * scanlines. Pure CSS transform/opacity animations (GPU-composited). Portaled
 * to <body> so the page-transition transform can't offset the fixed layer.
 */
export function ArcadeBackdrop() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  if (!mounted) return null;

  return createPortal(
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      {/* Neon floor */}
      <div className="absolute inset-x-0 bottom-0 h-[46vh] [perspective:420px] [mask-image:linear-gradient(to_top,black_10%,transparent_95%)]">
        <div className="absolute inset-x-[-50%] bottom-0 h-[160%] origin-bottom [transform:rotateX(68deg)]">
          <div
            className="absolute inset-x-0 -top-16 bottom-0 animate-grid-scroll will-change-transform opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(color-mix(in srgb, var(--accent-3) 70%, transparent) 2px, transparent 2px), linear-gradient(90deg, color-mix(in srgb, var(--accent) 55%, transparent) 2px, transparent 2px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>
        {/* horizon glow */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-60 shadow-[0_0_24px_4px_var(--accent)]" />
      </div>

      {/* Floating pixels */}
      {PIXELS.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-[-24px] animate-pixel-rise will-change-transform"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 12px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* CRT scanlines */}
      <div className="absolute inset-0 opacity-[0.045] [background:repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_4px)] text-[var(--foreground)]" />
    </div>,
    document.body
  );
}
