import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects/project-grid";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects built by Nirmal Kandel, including Netflix GPT, DevTinder and a MERN Todo app.",
};

export default function ProjectsPage() {
  return <ProjectGrid />;
}
