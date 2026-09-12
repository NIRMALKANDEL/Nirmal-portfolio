"use client";

import { Mail } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/brand-icons";

export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <Container className="py-16 sm:py-20">
      <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] card-elevated p-6 sm:p-8">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-[var(--foreground)]">{t.contact.directly}</p>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] hover:border-[var(--accent)]"
          >
            <Mail size={16} />
            {site.email}
          </a>
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] hover:border-[var(--accent)]"
          >
            <WhatsappIcon size={16} />
            WhatsApp: +91 {site.whatsapp}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] hover:border-[var(--accent)]"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] hover:border-[var(--accent)]"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
        </div>
      </div>
    </Container>
  );
}
