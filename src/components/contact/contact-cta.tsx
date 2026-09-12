"use client";

import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";

export function ContactCta() {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-center gap-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] card-elevated px-6 py-14 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] text-[var(--accent)]">
            <Mail size={20} />
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {t.contact.title}
          </h2>
          <p className="max-w-md text-sm text-[var(--muted)]">{t.contact.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <LinkButton href="/contact">{t.contact.send}</LinkButton>
            <LinkButton href={`mailto:${site.email}`} variant="secondary">
              {site.email}
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
