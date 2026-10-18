import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllProjects } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects | Zohaib Umer",
  description:
    "AI systems, full-stack MERN apps and learning platforms, each solving a real problem. From an AI career mentor to an e-commerce store and an enterprise LMS.",
  openGraph: {
    title: "Projects | Zohaib Umer",
    description:
      "AI systems, full-stack MERN apps and learning platforms, each solving a real problem. From an AI career mentor to an e-commerce store and an enterprise LMS.",
    images: [
      {
        url: "/projects/careerpilot-ai/cover.svg",
        width: 1600,
        height: 640,
        alt: "Zohaib Umer - Projects Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Zohaib Umer",
    description:
      "AI systems, full-stack MERN apps and learning platforms, each solving a real problem. From an AI career mentor to an e-commerce store and an enterprise LMS.",
    images: ["/projects/careerpilot-ai/cover.svg"],
  },
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] pt-28 pb-16">
      {/* Background ambient radial glows identical to home */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,#000_15%,transparent_100%)] opacity-30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -left-[15%] top-[10%] h-[min(400px,50vw)] w-[min(400px,50vw)] rounded-full bg-violet-600 opacity-[0.10] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -right-[12%] top-[20%] h-[min(420px,52vw)] w-[min(420px,52vw)] rounded-full bg-teal-400 opacity-[0.10] blur-[140px]"
      />

      {/* Header inside shared Container */}
      <Container className="relative z-10 pt-2 pb-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm mb-6"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to home</span>
        </Link>

        {/* Eyebrow // PROJECTS */}
        <p className="font-mono text-[13px] tracking-[0.22em] uppercase text-cyan-400">
          {"// PROJECTS"}
        </p>

        {/* Two-line H1 with hero gradient on 'shipped.' */}
        <h1 className="mt-3 text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight text-white text-balance">
          <span>Things I&apos;ve built </span>
          <br className="hidden sm:block" />
          <span>&amp; </span>
          <span
            className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent"
            style={{ textShadow: "0 0 40px rgba(34, 211, 238, 0.35)" }}
          >
            shipped.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-zinc-300 md:text-xl">
          AI systems, full-stack MERN apps and learning platforms, each solving a real problem.
          From an AI career mentor to an e-commerce store and an enterprise LMS.
        </p>
      </Container>

      {/* Filter bar + Projects List */}
      <ProjectsExplorer projects={allProjects} />

      {/* Page Footer CTA */}
      <Container className="relative z-10 mt-16 pt-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-zinc-950/40 p-6 md:p-8 backdrop-blur-sm">
          <div>
            <h3 className="text-xl font-bold text-white">Have a project in mind?</h3>
            <p className="mt-1 text-sm text-zinc-400">
              Let&apos;s build something intelligent and production-ready together.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>Get in touch</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-sm font-medium text-white transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
