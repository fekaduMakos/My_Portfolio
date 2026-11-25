"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

const CATEGORIES = [
  "Fullstack",
  "Frontend",
  "Backend",
  "Mobile",
  "Desktop App",
  "Graphic Design",
];

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState("Fullstack");
  const [description, setDescription] = useState("");
  const [caseStudy, setCaseStudy] = useState("");
  const [coverImage, setCoverImage] = useState("/images/about-workspace.png");
  const [tags, setTags] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [featured, setFeatured] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugEdited) {
      const autoSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(autoSlug);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Image upload failed.");
      }

      setCoverImage(data.url);
    } catch (err: any) {
      setError(err?.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          category,
          description,
          case_study: caseStudy,
          cover_image: coverImage,
          tags,
          demo_url: demoUrl,
          github_url: githubUrl,
          featured,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create project.");
      }

      setSuccess(true);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Projects
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Add New Project
          </h1>
          <p className="text-xs text-muted-foreground">
            Publish a new project or case study directly to your live portfolio.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs sm:text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-emerald-500/40 bg-card p-6 shadow-2xl space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">
                Project Published Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your project &ldquo;{title}&rdquo; is now live on your portfolio.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <Link
                href="/projects"
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-lg bg-primary px-5 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
              >
                View on Portfolio →
              </Link>
              <button
                type="button"
                onClick={() => {
                  router.push("/admin/projects");
                  router.refresh();
                }}
                className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-lg border border-border bg-background px-5 text-xs font-semibold text-foreground transition hover:bg-muted"
              >
                Go to Projects List
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm">
        {/* Title & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              Project Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g., Student Management System"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              URL Slug <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(e.target.value);
              }}
              placeholder="e.g., student-management-system"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm font-mono text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Category & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              Tech Stack / Tools (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., Java, Java Swing, MySQL"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">
            Short Summary <span className="text-red-400">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief overview displayed on your portfolio cards..."
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {/* Detailed Case Study */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-foreground">
            Detailed Case Study / Project Details (Optional)
          </label>
          <textarea
            rows={5}
            value={caseStudy}
            onChange={(e) => setCaseStudy(e.target.value)}
            placeholder="Describe the problem, architecture, features, and what you learned..."
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
          />
        </div>

        {/* Cover Image Upload or URL */}
        <div className="space-y-3 rounded-xl border border-border/80 bg-background/50 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <ImageIcon className="h-4 w-4 text-primary" />
              Project Cover Image
            </label>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition">
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-3.5 w-3.5" />
                  Upload Image File
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="/images/projects/cover.png or https://..."
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-mono text-foreground focus:border-primary focus:outline-none"
          />

          {coverImage && (
            <div className="mt-2 w-full overflow-hidden rounded-lg border border-border bg-[#040914] flex items-center justify-center">
              <img
                src={coverImage}
                alt="Cover preview"
                className="w-full h-auto max-h-72 object-contain"
              />
            </div>
          )}
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              Live Demo URL <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              placeholder="https://your-project-demo.com (leave blank if none)"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">
              GitHub Repository URL <span className="text-muted-foreground font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo (leave blank if none)"
              className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Featured Checkbox */}
        <label className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <div className="text-xs sm:text-sm">
            <span className="font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Feature on Portfolio Homepage
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              Show this project in the Featured Work section on your main homepage as well as the My Work page.
            </p>
          </div>
        </label>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-border/50">
          <Link
            href="/admin/projects"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-xs font-semibold text-muted-foreground hover:text-foreground transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90 disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Publish Project
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
