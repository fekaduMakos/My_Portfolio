import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getAllProjects,
  getSupabaseClient,
  readLocalProjects,
  writeLocalProjects,
  type PublicProject,
} from "@/lib/supabase/projects";

export async function GET() {
  try {
    const projects = await getAllProjects();
    return NextResponse.json({ projects });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch projects." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      case_study,
      cover_image,
      demo_url,
      github_url,
      tags,
      category,
      featured,
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Project title and description are required." },
        { status: 400 }
      );
    }

    const baseSlug =
      (slug || title)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || `project-${Date.now()}`;

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean)
      : [];

    const normalizeOptionalUrl = (val?: string | null) => {
      const trimmed = val?.trim();
      if (!trimmed) return null;
      if (
        trimmed.startsWith("http://") ||
        trimmed.startsWith("https://") ||
        trimmed.startsWith("/")
      ) {
        return trimmed;
      }
      return `https://${trimmed}`;
    };

    const projectPayload = {
      title: title.trim(),
      slug: baseSlug,
      description: description.trim(),
      case_study: case_study?.trim() || null,
      cover_image: cover_image?.trim() || "/images/about-workspace.png",
      demo_url: normalizeOptionalUrl(demo_url),
      github_url: normalizeOptionalUrl(github_url),
      tags: parsedTags,
      category: category || "Fullstack",
      featured: Boolean(featured),
      sort_order: 0,
    };

    let savedProject: PublicProject | null = null;
    let storageMode: "supabase" | "local" = "local";

    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .insert([projectPayload])
        .select()
        .single();

      if (!error && data) {
        savedProject = data as PublicProject;
        storageMode = "supabase";
      } else if (error) {
        console.warn(
          "Supabase insert failed, using local fallback store:",
          error.message
        );
      }
    }

    // Fallback to local JSON store if Supabase returned a permission/table error
    if (!savedProject) {
      const existing = await readLocalProjects();
      const uniqueSlug = existing.some((p) => p.slug === baseSlug)
        ? `${baseSlug}-${Date.now().toString().slice(-4)}`
        : baseSlug;

      const now = new Date().toISOString();
      savedProject = {
        id: `local-${Date.now()}`,
        ...projectPayload,
        slug: uniqueSlug,
        created_at: now,
        updated_at: now,
      };
      await writeLocalProjects([savedProject, ...existing]);
      storageMode = "local";
    }

    // Revalidate public and admin pages immediately
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${savedProject.slug}`);
    revalidatePath("/admin");
    revalidatePath("/admin/projects");

    return NextResponse.json({
      success: true,
      storage: storageMode,
      project: savedProject,
    });
  } catch (err: any) {
    console.error("API projects POST error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error." },
      { status: 500 }
    );
  }
}
