"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function ModeSwitch() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isNonTech = pathname?.startsWith("/non-tech");

  return (
    <div
      role="group"
      aria-label="Switch between Tech and Beyond Code"
      className="inline-flex items-center rounded-full border border-[var(--border)] p-0.5 text-xs font-medium"
    >
      <Link
        href="/"
        aria-pressed={!isNonTech}
        className={cn(
          "rounded-full px-3 py-1.5 transition-colors",
          !isNonTech
            ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        )}
      >
        {t.common.switchToTech}
      </Link>
      <Link
        href="/non-tech"
        aria-pressed={isNonTech}
        className={cn(
          "rounded-full px-3 py-1.5 transition-colors",
          isNonTech
            ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
            : "text-[var(--muted)] hover:text-[var(--foreground)]"
        )}
      >
        {t.common.switchToNonTech}
      </Link>
    </div>
  );
}
