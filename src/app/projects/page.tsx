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
    <main className="min-h-screen bg-[#0b0b0c] text-[#ededed] pt-28 pb-16">
      <Container className="relative z-10 pt-2 pb-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#8f8f94] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] rounded-sm mb-6"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-1"
          />
          <span>Back to home</span>
        </Link>

        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#8f8f94]">
          {"// PROJECTS"}
        </p>

        <h1 className="mt-3 font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[1.04] tracking-tight text-white text-balance">
          <span>Things I&apos;ve built </span>
          <br className="hidden sm:block" />
          <span>&amp; </span>
          <span className="italic text-[#c6f432]">shipped.</span>
        </h1>

        <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-[#8f8f94] md:text-lg">
          AI systems, full-stack MERN apps and learning platforms, each solving a real problem.
          From an AI career mentor to an e-commerce store and an enterprise LMS.
        </p>
      </Container>

      <ProjectsExplorer projects={allProjects} />

      <Container className="relative z-10 mt-16 pt-8 border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-xl border border-white/[0.08] bg-[#131315] p-6 md:p-8">
          <div>
            <h3 className="font-serif text-2xl font-normal text-white">Have a project in mind?</h3>
            <p className="mt-1 text-sm text-[#8f8f94]">
              Let&apos;s build something intelligent and production-ready together.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#c6f432] px-5 text-sm font-semibold text-[#0b0b0c] transition-colors hover:bg-[#b5e028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432]"
            >
              <span>Get in touch</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-white/[0.08] px-5 text-sm font-medium text-white transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432]"
            >
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
