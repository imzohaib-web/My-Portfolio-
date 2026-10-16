"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Mail, 
  Code2, 
  Sparkles, 
  Terminal, 
  BookOpen 
} from "lucide-react";

const strengths = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "Architecting responsive Next.js/React frontends with modular Node.js & FastAPI backends.",
  },
  {
    icon: Sparkles,
    title: "AI & RAG Engineering",
    desc: "Grounding LLMs with vector search, semantic embeddings, and multi-agent workflows.",
  },
  {
    icon: Terminal,
    title: "Systematic Problem Solving",
    desc: "Deconstructing complex system requirements into clean, maintainable, and type-safe code.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Iterating on cutting-edge generative frameworks, tool orchestration, and modern web standards.",
  },
];

export function AboutSection() {
  return (
    <section 
      id="about" 
      aria-label="About Me Section" 
      className="py-20 md:py-28 relative z-10 border-t border-zinc-800/60"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Eyebrow & Category */}
        <div className="mb-10 md:mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
            <span>01</span>
            <span className="text-zinc-600">{"//"}</span>
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-[1.15]">
            Bridging full-stack web engineering with intelligent AI systems.
          </h2>
        </div>

        {/* Two-Column Editorial Grid: Image on Left, Profile & Strengths on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Portrait Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 w-full flex justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-none aspect-[2/3] rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-2xl group">
              <Image
                src="/images/profile-image.jpeg"
                alt="Zohaib Umer - AI Engineer & Full Stack Developer"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 40vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />

              {/* Subtle bottom gradient to blend overlay */}
              <div 
                aria-hidden="true" 
                className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" 
              />

              {/* Bottom Identity Pill on the Image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs backdrop-blur-md bg-zinc-900/70 border border-white/10 px-3.5 py-2.5 rounded-xl text-zinc-300 shadow-lg">
                <div>
                  <span className="font-semibold text-white block">Zohaib Umer</span>
                  <span className="text-[11px] text-zinc-400 font-mono">Software Engineering @ COMSATS</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Available</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Specification Card, 4 Strengths & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col space-y-5"
          >
            {/* Profile Specification Card */}
            <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm text-left shadow-sm relative overflow-hidden">
              <div 
                aria-hidden="true" 
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zinc-700/10 via-transparent to-transparent pointer-events-none" 
              />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-white font-bold tracking-tight text-base shadow-sm">
                    ZU
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white tracking-tight leading-snug">Zohaib Umer</h3>
                    <p className="text-xs text-zinc-400 font-mono">Software Engineer &amp; AI Specialist</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Active</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-zinc-800/80 text-xs">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-zinc-400">Education</span>
                  <span className="text-zinc-200 font-medium text-right">BS Software Engineering @ COMSATS University Islamabad</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-zinc-400">Industry Experience</span>
                  <span className="text-zinc-200 font-medium text-right">Eziline (MERN Intern) • Erudite (Frontend Intern)</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-zinc-400">Final Year Project</span>
                  <span className="text-zinc-200 font-medium text-right">Adaptive Learning Platform (FBISE RAG Model)</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-zinc-400">Core Focus</span>
                  <span className="text-zinc-200 font-medium text-right">Generative AI • RAG Systems • AI Agents • Full-Stack Web</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-zinc-400">Location</span>
                  <span className="text-zinc-200 font-medium text-right">Wah Cantt / Islamabad, Pakistan</span>
                </div>
              </div>
            </div>

            {/* 4 Compact Core Strengths */}
            <div className="space-y-2.5">
              <p className="text-xs uppercase tracking-wider text-zinc-400 font-mono text-left px-1">
                Core Strengths &amp; Capabilities
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {strengths.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-3.5 rounded-xl border border-zinc-800/70 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700/70 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded-md bg-zinc-800/70 flex items-center justify-center border border-zinc-700/50 text-zinc-400 group-hover:text-zinc-200 transition-colors flex-shrink-0">
                          <Icon size={13} />
                        </div>
                        <span className="text-xs font-semibold text-zinc-200 tracking-tight">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Editorial Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href="#projects"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-all duration-200 shadow-sm cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.98]"
              >
                <span>Explore My Work</span>
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/60 hover:border-zinc-500 font-medium text-sm transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-[0.98]"
              >
                <Mail size={15} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                <span>Get in Touch</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
