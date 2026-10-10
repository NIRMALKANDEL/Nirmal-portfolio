import "server-only";

import { site } from "@/data/site";
import { projects, getProjectRepos } from "@/data/projects";

// Live data pulled from the GitHub REST API. Cached by Next's data cache and
// refreshed hourly, so the site stays in sync with the repos without a
// rebuild. Every helper returns null / empty on failure — the UI always has
// the hand-written data in src/data to fall back on.

const REVALIDATE_SECONDS = 3600;
const API = "https://api.github.com";
const githubUser = site.github.replace("https://github.com/", "");

export type RepoStats = {
  fullName: string;
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
  createdAt: string;
  /** Language share in percent, largest first. */
  languages: { name: string; percent: number }[];
};

export type ProfileStats = {
  publicRepos: number;
  followers: number;
  since: string;
};

async function gh<T>(path: string): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: raises the rate limit from 60 to 5000 requests/hour.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const res = await fetch(`${API}${path}`, {
      headers,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type RawRepo = {
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  created_at: string;
};

export async function getRepoStats(fullName: string): Promise<RepoStats | null> {
  const [repo, langs] = await Promise.all([
    gh<RawRepo>(`/repos/${fullName}`),
    gh<Record<string, number>>(`/repos/${fullName}/languages`),
  ]);
  if (!repo) return null;

  const total = Object.values(langs ?? {}).reduce((sum, n) => sum + n, 0);
  const languages = Object.entries(langs ?? {})
    .map(([name, bytes]) => ({ name, percent: total ? (bytes / total) * 100 : 0 }))
    .filter((l) => l.percent >= 1)
    .sort((a, b) => b.percent - a.percent);

  return {
    fullName: repo.full_name,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    pushedAt: repo.pushed_at,
    createdAt: repo.created_at,
    languages,
  };
}

/** GitHub stats for every project, keyed by project slug. */
export async function getAllProjectStats(): Promise<Record<string, RepoStats[]>> {
  const entries = await Promise.all(
    projects.map(async (project) => {
      const stats = await Promise.all(getProjectRepos(project).map(getRepoStats));
      return [project.slug, stats.filter((s): s is RepoStats => s !== null)] as const;
    })
  );
  return Object.fromEntries(entries);
}

export async function getProfileStats(): Promise<ProfileStats | null> {
  const user = await gh<{ public_repos: number; followers: number; created_at: string }>(
    `/users/${githubUser}`
  );
  if (!user) return null;
  return { publicRepos: user.public_repos, followers: user.followers, since: user.created_at };
}
