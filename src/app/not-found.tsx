import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NotFoundScene } from "@/components/three/not-found-scene";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden pt-24">
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid mask-radial opacity-70" />
      <NotFoundScene />
      <Container className="flex flex-col items-center gap-5 text-center">
        <span className="font-display text-[clamp(7rem,26vw,18rem)] font-bold leading-none tracking-[-0.06em] text-gradient">
          404
        </span>
        <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">Lost in space</h1>
        <p className="max-w-sm text-sm text-[var(--muted)]">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <LinkButton href="/" className="h-12 px-7">
          Back to Home
        </LinkButton>
      </Container>
    </section>
  );
}
