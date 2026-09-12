import type { Metadata } from "next";
import { EducationTimeline } from "@/components/education/education-timeline";

export const metadata: Metadata = {
  title: "Education",
  description: "Educational background of Nirmal Kandel, including B.Tech in Computer Science Engineering.",
};

export default function EducationPage() {
  return <EducationTimeline />;
}
