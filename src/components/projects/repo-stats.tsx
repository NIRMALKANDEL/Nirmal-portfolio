import { GitCommitHorizontal, Star } from "lucide-react";
import type { RepoStats } from "@/lib/github";
import { cn } from "@/lib/utils";

// GitHub's own language colours for the languages used across the repos.
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#663399",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Ruby: "#701516",
  "Objective-C": "#438eff",
};

export function languageColor(name: string) {
  return LANGUAGE_COLORS[name] ?? "#8b8b99";
}

/** Formats an ISO date as "Oct 2026" — deterministic, so SSR and client agree. */
export function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

/** Merges stats from a project's repos (DevTinder has two) into one summary. */
export function summarizeStats(stats: RepoStats[] | undefined) {
  if (!stats?.length) return null;
  const totals = new Map<string, number>();
  for (const repo of stats) {
    for (const lang of repo.languages) totals.set(lang.name, (totals.get(lang.name) ?? 0) + lang.percent / stats.length);
  }
  return {
    stars: stats.reduce((n, s) => n + s.stars, 0),
    pushedAt: stats.map((s) => s.pushedAt).sort().at(-1)!,
    languages: [...totals.entries()]
      .map(([name, percent]) => ({ name, percent }))
      .sort((a, b) => b.percent - a.percent),
  };
}

export function LanguageBar({ stats, className, showLegend = true }: { stats: RepoStats[] | undefined; className?: string; showLegend?: boolean }) {
  const summary = summarizeStats(stats);
  if (!summary || !summary.languages.length) return null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        {summary.languages.map((lang) => (
          <span
            key={lang.name}
            title={`${lang.name} ${lang.percent.toFixed(1)}%`}
            style={{ width: `${lang.percent}%`, background: languageColor(lang.name) }}
          />
        ))}
      </div>
      {showLegend && (
        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-[var(--muted)]">
          {summary.languages.slice(0, 4).map((lang) => (
            <span key={lang.name} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: languageColor(lang.name) }} />
              {lang.name} {lang.percent.toFixed(0)}%
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function RepoMeta({ stats, updatedLabel, className }: { stats: RepoStats[] | undefined; updatedLabel: string; className?: string }) {
  const summary = summarizeStats(stats);
  if (!summary) return null;
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)]", className)}>
      <span className="inline-flex items-center gap-1">
        <Star size={11} /> {summary.stars}
      </span>
      <span className="inline-flex items-center gap-1">
        <GitCommitHorizontal size={12} /> {updatedLabel} {formatMonth(summary.pushedAt)}
      </span>
    </div>
  );
}
