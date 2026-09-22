import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/project-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects built by Nirmal Kandel, including Netflix GPT, DevTinder, Nibblr, Brightway Solar and a Next.js video app.",
};

export default function ProjectsPage() {
  return <ProjectGrid />;
}
