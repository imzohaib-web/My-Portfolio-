import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/data/projects";
import { ProjectDetailContent } from "@/components/projects/ProjectDetailContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Zohaib Umer",
    };
  }

  return {
    title: `${project.title} — Case Study | Zohaib Umer`,
    description: project.summary || project.description,
    openGraph: {
      title: `${project.title} — Case Study | Zohaib Umer`,
      description: project.summary || project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.title} architecture overview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | Zohaib Umer`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <ProjectDetailContent
        project={project}
        prevProject={prev}
        nextProject={next}
      />
    </main>
  );
}
