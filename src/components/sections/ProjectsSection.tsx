"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "RAG Knowledge Assistant",
    desc: "AI-powered Retrieval-Augmented Generation assistant using vector databases and LLMs for intelligent document-based Q&A.",
    tags: ["LangChain", "Vector DB", "LLMs", "Python"],
  },
  {
    title: "AI Powered Hybrid Movie Recommendation System",
    desc: "Intelligent recommendation engine combining collaborative and content-based filtering with AI-enhanced personalization.",
    tags: ["Machine Learning", "Python", "FastAPI"],
  },
  {
    title: "AI Job Hunting Agents",
    desc: "Autonomous AI agents that search jobs, analyze skills, optimize resumes, and automate job hunting workflows.",
    tags: ["AI Agents", "Automation", "Prompt Engineering"],
  },
  {
    title: "AI Powered Chatbot",
    desc: "Modern conversational chatbot integrating LLM APIs with contextual memory and real-time intelligent responses.",
    tags: ["React", "LLM APIs", "Contextual Memory"],
  }
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <SectionHeading title="Featured Projects" subtitle="A selection of my recent AI and Web engineering work." />
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <GlassCard className="h-full flex flex-col justify-between overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,255,0.05)] to-[rgba(176,38,255,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--color-neon-cyan)] transition-colors flex justify-between items-start">
                    {project.title}
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <ArrowUpRight size={24} />
                    </a>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{project.desc}</p>
                </div>
                
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-mono text-[var(--color-neon-cyan)] bg-[rgba(0,255,255,0.1)] px-3 py-1 rounded-md">
                      {tag}
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
