"use client";

import { useState } from "react";
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  ExternalLink
} from "lucide-react";
import { BrandIcon } from "@/components/shared/BrandIcon";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message.");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred.");
    }
  }

  const directChannels = [
    {
      name: "LinkedIn",
      handle: "Connect & Network",
      url: "https://linkedin.com",
      iconKey: "linkedin",
      hoverBorder: "hover:border-[#0A66C2]",
    },
    {
      name: "GitHub",
      handle: "Repositories & Code",
      url: "https://github.com",
      iconKey: "github",
      hoverBorder: "hover:border-foreground/80",
    },
    {
      name: "Telegram",
      handle: "@fekadumark (Instant reply)",
      url: "https://t.me/fekadumark",
      iconKey: "telegram",
      hoverBorder: "hover:border-sky-400",
    },
    {
      name: "Instagram",
      handle: "@fekadu_markos",
      url: "https://www.instagram.com/fekadu_markos/?hl=en",
      iconKey: "instagram",
      hoverBorder: "hover:border-pink-500",
    },
    {
      name: "Facebook",
      handle: "fekadu.mark",
      url: "https://web.facebook.com/fekadu.mark",
      iconKey: "facebook",
      hoverBorder: "hover:border-blue-500",
    },
    {
      name: "Email",
      handle: "fekemark6@gmail.com",
      url: "mailto:fekemark6@gmail.com",
      iconKey: "mail",
      hoverBorder: "hover:border-emerald-500",
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-16 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Let's Connect</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Interested in discussing a software engineering role, architecture consulting, or global remote contracts?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Direct Channels Column */}
        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Direct Channels
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {directChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center justify-between rounded-lg border border-border/80 bg-background/80 p-2.5 text-sm font-medium transition-all duration-150 ${channel.hoverBorder} hover:shadow-sm active:bg-muted`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-card border border-border/60 p-1.5 shadow-sm">
                      {channel.iconKey === "mail" ? (
                        <Mail className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <BrandIcon iconKey={channel.iconKey} className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground group-hover:text-primary transition">
                        {channel.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {channel.handle}
                      </p>
                    </div>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 text-xs text-muted-foreground space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Clock className="h-4 w-4 text-primary" />
              Response Time
            </div>
            <p className="leading-relaxed">
              I usually respond within a few hours on Telegram / LinkedIn or within 24 hours via email.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          {status === "success" ? (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 sm:p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 mb-3" />
              <h3 className="text-lg font-bold text-emerald-400">Message Received!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you for reaching out. Your message has been saved to the database and forwarded to my inbox. I will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 rounded-xl border border-border bg-card p-4 sm:p-8">
              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 sm:p-4 text-xs text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Full-Stack Engineering Opportunity / Consultation"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-base sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell me about your team, tech stack, and project requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex h-12 w-full items-center justify-center rounded-xl sm:rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
              >
                {status === "loading" ? "Transmitting Message..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
