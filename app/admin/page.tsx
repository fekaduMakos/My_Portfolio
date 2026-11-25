import Link from "next/link";
import { FolderKanban, Inbox, BookOpen, Briefcase, Plus, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl space-y-6 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">System Overview</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your international engineering portfolio, projects, and contact leads.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex h-10 sm:h-9 w-full sm:w-auto items-center justify-center rounded-lg bg-primary px-4 sm:px-3 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New Project
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Published Projects</span>
            <FolderKanban className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 sm:mt-3 text-2xl font-bold">1</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Active in public showcase</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Inbound Messages</span>
            <Inbox className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2 sm:mt-3 text-2xl font-bold">0</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Awaiting your response</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Work Milestones</span>
            <Briefcase className="h-4 w-4 text-blue-400" />
          </div>
          <div className="mt-2 sm:mt-3 text-2xl font-bold">1</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Career timeline events</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Articles</span>
            <BookOpen className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2 sm:mt-3 text-2xl font-bold">0</div>
          <p className="mt-1 text-[11px] text-muted-foreground">Published blog posts</p>
        </div>
      </div>

      {/* Quick Setup Checklist */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <h2 className="text-sm font-bold tracking-tight mb-4">Quick Setup Checklist</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-xs">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-bold">✓</span>
            <div>
              <p className="font-semibold text-foreground">Scaffold Next.js & Responsive Architecture</p>
              <p className="text-muted-foreground">All phone, tablet, and desktop layouts with mobile drawer menus are active.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">2</span>
            <div>
              <p className="font-semibold text-foreground">Connect Supabase PostgreSQL & Auth</p>
              <p className="text-muted-foreground">Execute the SQL migration from <code className="rounded bg-muted px-1">supabase/migrations/001_initial_schema.sql</code>.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">3</span>
            <div>
              <p className="font-semibold text-foreground">Push to GitHub & Connect to Vercel</p>
              <p className="text-muted-foreground">Deploy directly on Vercel with automatic edge SSL and CDN caching.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
