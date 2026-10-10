import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/project-grid";
import { getAllProjectStats } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects built by Nirmal Kandel, including Paylog, DevTinder, Nibblr, Netflix GPT, Nova AI, Brightway Solar, a Next.js video app and a MERN todo app.",
};

export default async function ProjectsPage() {
  const stats = await getAllProjectStats();
  return <ProjectGrid stats={stats} />;
}
