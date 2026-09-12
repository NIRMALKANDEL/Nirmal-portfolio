import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience of Nirmal Kandel across software engineering roles.",
};

export default function ExperiencePage() {
  return <ExperienceTimeline />;
}
