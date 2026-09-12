"use client";

import { Gamepad2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export function BeyondCodeTeaser() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start gap-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent)]">
              <Gamepad2 size={20} />
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t.beyondCode.eyebrow}
              </span>
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {t.beyondCode.title} — {t.beyondCode.subtitle}
              </h3>
              <p className="max-w-xl text-sm text-[var(--muted)]">{t.beyondCode.description}</p>
            </div>
          </div>
          <LinkButton href="/non-tech" variant="secondary" size="sm" className="shrink-0">
            {t.beyondCode.viewMore}
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
