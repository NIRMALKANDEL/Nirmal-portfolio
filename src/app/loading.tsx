export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div
        aria-label="Loading"
        role="status"
        className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"
      />
    </div>
  );
}
