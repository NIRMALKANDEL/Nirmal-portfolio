export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="relative h-14 w-14" style={{ perspective: 400 }}>
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[var(--accent)]" />
        <div className="absolute inset-2 animate-spin-slow rounded-full border-2 border-transparent border-b-[var(--accent-3)]" />
        <div className="absolute inset-[22px] animate-pulse rounded-full bg-[var(--accent-2)]" />
      </div>
    </div>
  );
}
