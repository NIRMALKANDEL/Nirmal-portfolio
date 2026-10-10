"use client";

import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/brand-icons";

export function ContactPageContent() {
  const { t } = useLanguage();

  const channels = [
    { href: `mailto:${site.email}`, label: "Email", value: site.email, icon: <Mail size={18} />, color: "var(--accent)" },
    { href: site.whatsappLink, label: "WhatsApp", value: `+91 ${site.whatsapp}`, icon: <WhatsappIcon size={18} />, color: "#25d366" },
    { href: site.linkedin, label: "LinkedIn", value: "in/nirmal-kandel", icon: <LinkedinIcon size={18} />, color: "#0a8fdc" },
    { href: site.github, label: "GitHub", value: "@NIRMALKANDEL", icon: <GithubIcon size={18} />, color: "var(--accent-3)" },
  ];

  return (
    <>
      <PageHeader eyebrow={t.contact.eyebrow} title={t.contact.ctaTitle} subtitle={t.contact.subtitle} scene="knot" />

      <Container className="grid gap-8 pb-24 lg:grid-cols-[1.25fr_1fr]">
        <Reveal tilt>
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10">
            <div aria-hidden className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[var(--accent)] opacity-10 blur-3xl" />
            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">{t.contact.directly}</p>
          <RevealGroup className="flex flex-col gap-3">
            {channels.map((c) => (
              <RevealItem key={c.label}>
                <TiltCard max={8} glow={c.color} className="rounded-2xl">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--foreground)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: c.color }}>
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">{c.label}</span>
                      <span className="block truncate text-sm font-medium text-[var(--foreground)]">{c.value}</span>
                    </span>
                    <ArrowUpRight size={18} className="text-[var(--muted)] transition-transform duration-300 group-hover:rotate-45 group-hover:text-[var(--foreground)]" />
                  </a>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
            <MapPin size={14} className="text-[var(--accent)]" /> {site.location}
          </p>
        </div>
      </Container>
    </>
  );
}
