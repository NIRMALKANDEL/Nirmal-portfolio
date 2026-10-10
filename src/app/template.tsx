"use client";

import { motion } from "motion/react";

// Re-mounts on every navigation, so each page fades up into place.
// Translate only: R3F canvases measure themselves with getBoundingClientRect
// on mount, so a scale/rotate here would size them wrong.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
