import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
};

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-300 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-foreground)] shadow-[0_10px_40px_-10px_var(--accent)] hover:shadow-[0_14px_50px_-8px_var(--accent)] before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-12 before:bg-white/30 before:transition-[left] before:duration-700 hover:before:left-[130%]",
  secondary:
    "border border-[var(--border)] bg-[var(--glass)] text-[var(--foreground)] backdrop-blur hover:border-[var(--accent)] hover:text-[var(--accent)]",
  ghost: "text-[var(--foreground)] hover:text-[var(--accent)]",
};

const sizes: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
};

type LinkButtonProps = BaseProps & {
  href: string;
  target?: string;
  rel?: string;
};

type ButtonElProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  target,
  rel,
}: LinkButtonProps) {
  const isExternal = href.startsWith("http");
  // Static assets (e.g. /resume.pdf) aren't app routes — next/link would try
  // to RSC-prefetch them and log a 404. Use a plain anchor for those instead.
  const isStaticAsset = !isExternal && /\.[a-z0-9]+$/i.test(href);

  if (isStaticAsset) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={target ?? (isExternal ? "_blank" : undefined)}
      rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonElProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
