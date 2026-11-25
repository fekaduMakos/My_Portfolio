"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  User, 
  Globe, 
  FileText, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  Send as TelegramIcon,
  Github, 
  Linkedin, 
  Mail,
  AlertCircle
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "Fekadu Markos",
    headline: "Senior Full-Stack Software Engineer & Systems Architect",
    bio: "Passionate software engineer building resilient, high-throughput cloud systems, distributed APIs, and modern web applications for the international market.",
    availability_status: "Available for Global Remote Roles & Architecture Consulting",
    location: "International / Remote",
    github_url: "https://github.com",
    linkedin_url: "https://linkedin.com",
    instagram_url: "https://www.instagram.com/fekadu_markos/?hl=en",
    facebook_url: "https://web.facebook.com/fekadu.mark",
    telegram_url: "https://t.me/fekadumark",
    email: "fekemark6@gmail.com",
    resume_url: "",
  });

  useEffect(() => {
    async function fetchSettings() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .eq("id", 1)
          .single();

        if (data && !error) {
          setFormData({
            full_name: data.full_name || "Fekadu Markos",
            headline: data.headline || "",
            bio: data.bio || "",
            availability_status: data.availability_status || "",
            location: data.location || "International / Remote",
            github_url: data.github_url || "https://github.com",
            linkedin_url: data.linkedin_url || "https://linkedin.com",
            instagram_url: data.instagram_url || "https://www.instagram.com/fekadu_markos/?hl=en",
            facebook_url: data.facebook_url || "https://web.facebook.com/fekadu.mark",
            telegram_url: data.telegram_url || "https://t.me/fekadumark",
            email: data.email || "fekemark6@gmail.com",
            resume_url: data.resume_url || "",
          });
        }
      } catch (e) {
        console.error("Failed to fetch settings from Supabase:", e);
      }
    }
    fetchSettings();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const supabase = createClient();
      const { error: upsertError } = await supabase
        .from("site_settings")
        .upsert({
          id: 1,
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (upsertError) throw upsertError;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save settings. Please verify your Supabase database schema.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Profile & Global Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Manage your personal details, availability status, and social channels (Instagram, Facebook, Telegram, GitHub, LinkedIn).
        </p>
      </div>

      {success && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 sm:p-4 text-xs font-medium text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Profile and social links updated successfully in Supabase!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 sm:p-4 text-xs font-medium text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-xl border border-border bg-card p-4 sm:p-6 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">Personal Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Primary Title / Engineering Role
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Professional Bio
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Availability Status Banner
              </label>
              <input
                type="text"
                value={formData.availability_status}
                onChange={(e) => setFormData({ ...formData, availability_status: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Location & Relocation Preference
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Social Media & Direct Channels */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">Social Links & Contact Channels</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Instagram */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                <Instagram className="h-3.5 w-3.5 text-pink-500" />
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                placeholder="https://www.instagram.com/fekadu_markos/?hl=en"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Facebook */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                <Facebook className="h-3.5 w-3.5 text-blue-500" />
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebook_url}
                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                placeholder="https://web.facebook.com/fekadu.mark"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Telegram */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                <TelegramIcon className="h-3.5 w-3.5 text-sky-400" />
                Telegram URL / Handle
              </label>
              <input
                type="url"
                value={formData.telegram_url}
                onChange={(e) => setFormData({ ...formData, telegram_url: e.target.value })}
                placeholder="https://t.me/fekadumark"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                <Mail className="h-3.5 w-3.5 text-emerald-400" />
                Primary Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* GitHub */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                <Github className="h-3.5 w-3.5" />
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                <Linkedin className="h-3.5 w-3.5 text-blue-400" />
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Resume / CV Manager */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Resume & CV Management
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Controls the destination of the "Download Resume" button in the top navigation bar.
              </p>
            </div>
            {formData.resume_url && (
              <a
                href={formData.resume_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-primary hover:bg-muted transition"
              >
                <FileText className="h-3.5 w-3.5" />
                Test Download Resume
              </a>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Resume PDF URL (Supabase Storage, Google Drive, or Local /resume.pdf)
            </label>
            <input
              type="text"
              value={formData.resume_url}
              onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
              placeholder="e.g. https://icxzfdviohtreuuarnqx.supabase.co/storage/v1/object/public/resumes/resume.pdf or /resume.pdf"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-xs"
            />
            <p className="text-[11px] text-muted-foreground mt-1.5">
              💡 Tip: You can host your CV in your Supabase Storage (under the <code className="rounded bg-muted px-1">resumes</code> bucket) or place a file named <code className="rounded bg-muted px-1">resume.pdf</code> directly in your <code className="rounded bg-muted px-1">public/</code> folder.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full sm:w-auto items-center justify-center rounded-lg bg-primary px-6 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            {loading ? "Saving to Supabase..." : "Save Profile Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
