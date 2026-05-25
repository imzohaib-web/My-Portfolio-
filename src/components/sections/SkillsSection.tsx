"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";

const skillsData = [
  {
    category: "Frontend",
    skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    color: "var(--color-neon-cyan)"
  },
  {
    category: "Backend",
    skills: ["Node js", "Laravel", "FastAPI", "MySQL"],
    color: "var(--color-neon-purple)"
  },
   {
    category: "AI & ML",
    skills: ["LangChain", "LLM APIs", "NLP", "chatbot Development", "Recommendation systems"],
    color: "white"
  },
  {
    category: "Tools",
    skills: ["Git/ Github", "Google stitch", "vs code", "vercel ", "Render"],
    color: "white"
  }
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 md:py-16 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeading title="Technical Arsenal" subtitle="Technologies and tools I use to build digital solutions." />
        
        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard className="h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 rounded-full" style={{ backgroundColor: group.color }}></span>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-4 py-2 rounded-full text-sm font-medium border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.1)] transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
