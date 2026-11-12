import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
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
    return { title: "Project not found | Zohaib Umer" };
  }

  const title = `${project.fullTitle ?? project.title} | Zohaib Umer`;
  const description = project.summary || project.description;
  const image = project.cover || project.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image
        ? [{ url: image, width: 1600, height: 640, alt: project.coverAlt ?? project.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <main className="min-h-screen bg-[#0b0b0c] text-[#ededed]">
      <div className="relative z-10">
        <ProjectDetailContent project={project} prevProject={prev} nextProject={next} />
      </div>
    </main>
  );
}
