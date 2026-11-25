import { Mail } from "lucide-react";

export default function AdminInboxPage() {
  return (
    <div className="max-w-5xl space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Inquiries & Leads</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review incoming messages submitted by recruiters, clients, and collaborators.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border/50 bg-muted/40 px-4 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Contact Submissions
        </div>
        <div className="p-8 sm:p-12 text-center text-sm text-muted-foreground">
          <Mail className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
          <p className="font-medium text-foreground">No messages received yet.</p>
          <p className="text-xs text-muted-foreground/75 mt-1 max-w-sm mx-auto">
            When recruiters use your public contact form, their inquiries will appear here in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
