import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { getProjectBySlug } from "@/lib/supabase/projects";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-16 sm:px-6 space-y-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to All Projects
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-xs font-semibold text-primary">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(project.created_at).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-xs sm:text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live Demo
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-card px-5 text-xs sm:text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              <Github className="mr-2 h-4 w-4" />
              Source Code
            </a>
          )}
        </div>
      </div>

      {/* Cover Image */}
      <div className="overflow-hidden rounded-2xl border border-border bg-[#040914] shadow-xl flex items-center justify-center">
        <img
          src={project.cover_image || "/images/about-workspace.png"}
          alt={project.title}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Tech Stack */}
      {project.tags && project.tags.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
            Technologies & Tools Used
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-secondary px-3 py-1 text-xs sm:text-sm font-mono font-medium text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Case Study Content */}
      {project.case_study && (
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Project Overview & Details
          </h2>
          <div className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.case_study}
          </div>
        </div>
      )}
    </div>
  );
}
