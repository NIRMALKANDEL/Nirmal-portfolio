import { Hero } from "@/components/hero/hero";
import { SkillsSection } from "@/components/skills/skills-section";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { ExperiencePreview } from "@/components/experience/experience-preview";
import { EducationPreview } from "@/components/education/education-preview";
import { BeyondCodeTeaser } from "@/components/beyond-code/beyond-code-teaser";
import { ContactCta } from "@/components/contact/contact-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsSection />
      <FeaturedProjects />
      <ExperiencePreview />
      <EducationPreview />
      <BeyondCodeTeaser />
      <ContactCta />
    </>
  );
}
