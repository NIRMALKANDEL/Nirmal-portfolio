import { cn } from "@/lib/utils";

/** Infinite horizontal ticker. Content is duplicated once for a seamless loop. */
export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("group flex overflow-hidden mask-fade-x", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center will-change-transform group-hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
