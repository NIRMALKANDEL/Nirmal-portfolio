"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function ModeSwitch() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isNonTech = pathname?.startsWith("/non-tech");
  // Unique per instance — the switch renders in both the desktop bar and the mobile menu.
  const pillId = useId();

  const options = [
    { href: "/", label: t.common.switchToTech, active: !isNonTech },
    { href: "/non-tech", label: t.common.switchToNonTech, active: isNonTech },
  ];

  return (
    <div
      role="group"
      aria-label="Switch between Tech and Beyond Code"
      className="inline-flex w-fit items-center rounded-full border border-[var(--border)] p-0.5 text-xs font-medium"
    >
      {options.map((option) => (
        <Link
          key={option.href}
          href={option.href}
          aria-pressed={option.active}
          className={cn(
            "relative rounded-full px-3 py-1.5 transition-colors",
            option.active ? "text-[var(--accent-foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
          )}
        >
          {option.active && (
            <motion.span
              layoutId={pillId}
              className="absolute inset-0 rounded-full bg-[var(--accent)]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{option.label}</span>
        </Link>
      ))}
    </div>
  );
}
