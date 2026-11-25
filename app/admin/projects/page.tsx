"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  ExternalLink,
  Star,
  Loader2,
  FolderKanban,
  AlertCircle,
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  category: string;
  tags: string[];
  featured: boolean;
  created_at: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function fetchProjects() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load projects.");
      setProjects(data.projects || []);
    } catch (err: any) {
      setError(err?.message || "Could not load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function toggleFeatured(project: ProjectItem) {
    setBusyId(project.id);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === project.id ? { ...p, featured: !p.featured } : p
          )
        );
      }
    } finally {
      setBusyId(null);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="max-w-6xl space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Project Portfolio
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Create, feature, and manage projects displayed on your public portfolio.
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex h-10 sm:h-9 w-full sm:w-auto items-center justify-center rounded-lg bg-primary px-4 sm:px-3 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
        >
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Add New Project
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-12 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            Loading projects from Supabase...
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center space-y-3">
            <FolderKanban className="h-8 w-8 text-muted-foreground" />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                No projects published yet
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Click &ldquo;Add New Project&rdquo; to publish your first project to your portfolio.
              </p>
            </div>
            <Link
              href="/admin/projects/new"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
            >
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Add New Project
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 transition hover:bg-muted/40"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono font-bold text-xs sm:text-sm">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold truncate">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold text-amber-400 border border-amber-500/30">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      Category: {project.category} • Slug: {project.slug}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => toggleFeatured(project)}
                    disabled={busyId === project.id}
                    className={`rounded-lg p-2 transition ${
                      project.featured
                        ? "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    title={
                      project.featured
                        ? "Remove from Featured Homepage"
                        : "Feature on Homepage"
                    }
                  >
                    <Star className="h-4 w-4" />
                  </button>

                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    title="View Live on Portfolio"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>

                  <button
                    onClick={() => deleteProject(project.id)}
                    disabled={busyId === project.id}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition"
                    title="Delete Project"
                  >
                    {busyId === project.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
