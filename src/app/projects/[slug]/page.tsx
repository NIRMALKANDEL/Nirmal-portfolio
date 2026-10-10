import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getProjectRepos } from "@/data/projects";
import { ProjectDetail } from "@/components/projects/project-detail";
import { getRepoStats, type RepoStats } from "@/lib/github";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const stats = (await Promise.all(getProjectRepos(project).map(getRepoStats))).filter(
    (s): s is RepoStats => s !== null
  );
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return <ProjectDetail project={project} stats={stats} next={next} />;
}
