"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { GlassCard } from "../ui/GlassCard";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectItem {
  title: string;
  badge?: string;
  desc: string;
  longDesc?: string[];
  tags: string[];
}

const projects: ProjectItem[] = [
  {
    title: "AI-Powered Adaptive Learning Platform (FBISE Curriculum)",
    badge: "Final Year Project — In Progress",
    desc: "A self-paced learning platform built around the FBISE Math and Science curriculum, combining a textbook-grounded RAG tutor, AI-generated adaptive quizzes, and mastery tracking driven by real past-paper weightage.",
    longDesc: [
      "Students pick a subject (Physics, Biology, Math) and progress through chapters that unlock sequentially, broken into topics with set deadlines. Each topic surfaces the best-matched explanatory video (selected via engagement/comment signals) alongside AI-generated notes from a RAG model trained specifically on the textbook, so explanation depth and language match the book exactly. The same RAG model powers a book-grounded chat assistant for topic-level Q&A at any time.",
      "Completing a topic requires passing a short AI-generated quiz; if it reveals a weak concept, a revision step is inserted before the student can continue. A per-topic mastery score — based on accuracy, time taken, and repeated mistakes, weighted by that topic's importance in FBISE past papers — drives which topics get flagged for review. Finishing a chapter unlocks a larger topic test before the next chapter begins.",
      "At the end of a subject, the system generates a full mock exam modeled on real FBISE past-paper question distribution and weightage, followed by a readiness report showing subject-wide and topic-wise preparedness rather than a single predicted score. A separate past-paper intelligence module surfaces which topics repeat most often and how chapter weightage has shifted over the years."
    ],
    tags: ["RAG", "Adaptive Learning", "LLMs", "Vector DB", "FastAPI"],
  },
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="projects" className="py-12 md:py-16 relative z-10">
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
                  {project.badge && (
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[rgba(176,38,255,0.15)] text-[var(--color-neon-purple)] border border-[rgba(176,38,255,0.3)] mb-3">
                      {project.badge}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--color-neon-cyan)] transition-colors flex justify-between items-start gap-2">
                    <span>{project.title}</span>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex-shrink-0 mt-1">
                      <ArrowUpRight size={24} />
                    </a>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.desc}</p>

                  {project.longDesc && (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleExpand(idx)}
                        className="inline-flex items-center gap-1.5 text-xs text-[var(--color-neon-cyan)] hover:underline mb-4 font-mono font-medium cursor-pointer"
                        aria-expanded={expandedIndex === idx}
                      >
                        {expandedIndex === idx ? "Hide details" : "Read more details"}
                        {expandedIndex === idx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      <AnimatePresence>
                        {expandedIndex === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 mb-4 text-gray-300 text-xs md:text-sm leading-relaxed border-t border-[rgba(255,255,255,0.08)] pt-4 overflow-hidden"
                          >
                            {project.longDesc.map((paragraph, pIdx) => (
                              <p key={pIdx}>{paragraph}</p>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
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
