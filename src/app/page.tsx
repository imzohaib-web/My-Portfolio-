import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ScrollToTopOnLoad } from "@/components/ScrollToTopOnLoad";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ScrollToTopOnLoad />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
