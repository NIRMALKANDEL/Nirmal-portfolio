"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ModeSwitch } from "@/components/mode/mode-switch";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    // Tuck the bar away while scrolling down, bring it back on scroll up.
    setHidden(y > 400 && y > prev);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const navLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/projects", label: t.nav.projects },
    { href: "/experience", label: t.nav.experience },
    { href: "/education", label: t.nav.education },
    { href: "/contact", label: t.nav.contact },
  ];
  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-4"
      >
        <motion.div
          initial={{ y: -40, opacity: 0, rotateX: -60 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformPerspective: 800 }}
          className={cn(
            "flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-500 sm:px-4",
            scrolled || open
              ? "border-[var(--border)] bg-[var(--glass)] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-transparent"
          )}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex shrink-0 items-center gap-2.5 pl-1"
            aria-label={`${site.name} — home`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[var(--foreground)] font-display text-sm font-bold text-[var(--background)] transition-transform duration-500 group-hover:rotate-[360deg]">
              NK
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-[var(--foreground)] sm:block">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onPointerEnter={() => setHovered(link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  isActive(link.href) ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
                )}
              >
                {(hovered ?? (navLinks.find((l) => isActive(l.href))?.href)) === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[var(--surface)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <ModeSwitch />
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-[var(--background)] px-6 pb-10 pt-28 lg:hidden"
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid mask-radial opacity-60" />
            <nav className="flex flex-col gap-1" aria-label="Mobile" style={{ perspective: 800 }}>
              {[{ href: "/", label: t.nav.home }, ...navLinks, { href: "/non-tech", label: t.nav.nonTech }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 40, rotateX: -70 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline gap-4 py-2 font-display text-4xl font-bold tracking-tight sm:text-5xl",
                      (link.href === "/" ? pathname === "/" : isActive(link.href))
                        ? "text-[var(--accent)]"
                        : "text-[var(--foreground)]"
                    )}
                  >
                    <span className="font-mono text-xs font-normal text-[var(--muted)]">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto flex flex-col gap-5 border-t border-[var(--border)] pt-6"
            >
              <ModeSwitch />
              <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                  <GithubIcon size={14} /> GitHub <ArrowUpRight size={12} />
                </a>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                  <LinkedinIcon size={14} /> LinkedIn <ArrowUpRight size={12} />
                </a>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
