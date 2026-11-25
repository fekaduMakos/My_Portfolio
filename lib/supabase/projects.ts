import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import path from "path";

export interface PublicProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  case_study?: string | null;
  cover_image: string;
  demo_url?: string | null;
  github_url?: string | null;
  tags: string[];
  category: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at?: string;
}

const LOCAL_PROJECTS_PATH = path.join(process.cwd(), "data", "projects.json");

export async function readLocalProjects(): Promise<PublicProject[]> {
  try {
    const raw = await fs.readFile(LOCAL_PROJECTS_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeLocalProjects(projects: PublicProject[]): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_PROJECTS_PATH), { recursive: true });
  await fs.writeFile(
    LOCAL_PROJECTS_PATH,
    JSON.stringify(projects, null, 2),
    "utf-8"
  );
}

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

export async function getAllProjects(): Promise<PublicProject[]> {
  const localProjects = await readLocalProjects();

  try {
    const supabase = getSupabaseClient();
    if (!supabase) return localProjects;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) {
      return localProjects;
    }

    // Merge Supabase projects with any local fallback projects (avoiding duplicate slugs)
    const remote = data as PublicProject[];
    const seenSlugs = new Set(remote.map((p) => p.slug));
    const merged = [...remote, ...localProjects.filter((p) => !seenSlugs.has(p.slug))];
    return merged.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  } catch {
    return localProjects;
  }
}

export async function getFeaturedProjects(limit = 4): Promise<PublicProject[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.featured);
  if (featured.length > 0) return featured.slice(0, limit);
  return all.slice(0, limit);
}

export async function getProjectBySlug(
  slug: string
): Promise<PublicProject | null> {
  try {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!error && data) return data as PublicProject;
    }
  } catch {
    // Fall back to local store
  }

  const localProjects = await readLocalProjects();
  return localProjects.find((p) => p.slug === slug) || null;
}
