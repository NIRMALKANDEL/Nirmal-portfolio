"use client";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Select language"
      className="inline-flex items-center rounded-full border border-[var(--border)] p-0.5 text-xs font-medium"
    >
      {(["en", "hi"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          aria-pressed={locale === code}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            locale === code
              ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          )}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
