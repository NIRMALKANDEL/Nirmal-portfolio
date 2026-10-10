import { Hero } from "@/components/hero/hero";
import { Intro } from "@/components/home/intro";
import { FeaturedProjects } from "@/components/projects/featured-projects";
import { SkillsSection } from "@/components/skills/skills-section";
import { SkillsTimeline } from "@/components/skills/skills-timeline";
import { ExperiencePreview } from "@/components/experience/experience-preview";
import { ContactCta } from "@/components/contact/contact-cta";
import { getAllProjectStats, getProfileStats } from "@/lib/github";

export default async function Home() {
  // Live repo data from GitHub (cached, refreshed hourly).
  const [profile, stats] = await Promise.all([getProfileStats(), getAllProjectStats()]);

  return (
    <>
      <Hero />
      <Intro profile={profile} />
      <FeaturedProjects stats={stats} />
      <SkillsSection />
      <SkillsTimeline />
      <ExperiencePreview />
      <ContactCta />
    </>
  );
}
