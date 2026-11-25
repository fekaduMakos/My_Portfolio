import Link from "next/link";
import { ExternalLink, Github, FolderKanban } from "lucide-react";
import { getAllProjects } from "@/lib/supabase/projects";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects & My Work | Fekadu Markos",
  description:
    "Explore software engineering applications, full-stack websites, mobile apps, and creative graphic design work by Fekadu Markos.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-16 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <span className="text-xs font-extrabold uppercase tracking-widest text-primary font-mono">
          PORTFOLIO SHOWCASE
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mt-1">
          My Work & Projects
        </h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
          Software applications, responsive web platforms, mobile solutions, and creative design projects.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center space-y-3">
          <FolderKanban className="h-10 w-10 text-muted-foreground mx-auto" />
          <h2 className="text-lg font-bold text-foreground">
            Projects Showcase Ready
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Add projects from your Admin Dashboard and they will appear here automatically.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/projects/new"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
            >
              Add Project in Admin →
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition hover:border-primary/50 shadow-sm"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="relative w-full bg-[#040914] overflow-hidden border-b border-border flex items-center justify-center"
              >
                <img
                  src={project.cover_image || "/images/about-workspace.png"}
                  alt={project.title}
                  className="w-full h-auto max-h-80 object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[11px] font-mono text-amber-400">
                      ★ Featured
                    </span>
                  )}
                </div>

                <Link href={`/projects/${project.slug}`}>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </Link>

                <p className="mt-2 text-xs sm:text-sm text-muted-foreground flex-1 leading-relaxed">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40 text-xs font-semibold">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    View Project Details →
                  </Link>
                  <div className="flex items-center gap-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Code
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
