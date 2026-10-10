"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUp, Mail } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/magnetic";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/brand-icons";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/projects", label: t.nav.projects },
    { href: "/experience", label: t.nav.experience },
    { href: "/education", label: t.nav.education },
    { href: "/non-tech", label: t.nav.nonTech },
    { href: "/contact", label: t.nav.contact },
  ];

  const socials = [
    { href: site.github, label: "GitHub profile", icon: <GithubIcon size={18} /> },
    { href: site.linkedin, label: "LinkedIn profile", icon: <LinkedinIcon size={18} /> },
    { href: `mailto:${site.email}`, label: "Send email", icon: <Mail size={18} /> },
    { href: site.whatsappLink, label: "WhatsApp", icon: <WhatsappIcon size={18} /> },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)]">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <p className="max-w-xs text-sm text-[var(--muted)]">{t.footer.tagline} · {site.location}</p>
          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <Magnetic key={s.label} strength={0.5}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                >
                  {s.icon}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">{t.footer.quickLinks}</span>
          <nav className="grid grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex w-fit items-center gap-2 text-sm text-[var(--foreground)]"
              >
                <span className="h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-3" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">{t.footer.getInTouch}</span>
          <a href={`mailto:${site.email}`} className="text-sm text-[var(--foreground)] hover:text-[var(--accent)]">
            {site.email}
          </a>
          <a href={site.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--foreground)] hover:text-[var(--accent)]">
            WhatsApp: +91 {site.whatsapp}
          </a>
        </div>
      </Container>

      {/* Oversized name that rises out of the floor in 3D */}
      <div className="relative" style={{ perspective: 900 }} aria-hidden>
        <motion.p
          initial={{ rotateX: 70, y: 60, opacity: 0 }}
          whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "50% 100%" }}
          className="select-none whitespace-nowrap text-center font-display text-[17vw] font-bold leading-[0.8] tracking-[-0.06em] text-gradient opacity-90"
        >
          {site.name.split(" ")[0].toUpperCase()}
        </motion.p>
      </div>

      <div className="border-t border-[var(--border)] py-5">
        <Container className="flex items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {year} {site.name}. {t.footer.rights}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] transition-transform duration-300 group-hover:-translate-y-1">
              <ArrowUp size={14} />
            </span>
          </button>
        </Container>
      </div>
    </footer>
  );
}
