import Link from "next/link";
import { Navbar } from "@/components/public/Navbar";
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Send as TelegramIcon 
} from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Responsive Top Navigation with Home, Skills, Projects, Experience, Articles, Contact */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">{children}</main>

      {/* Responsive Footer */}
      <footer className="border-t border-border/40 bg-card py-10 sm:py-14 text-sm text-muted-foreground">
        <div className="container mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border/40">
            <div>
              <p className="font-bold text-foreground text-base sm:text-lg">Fekadu Markos</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm sm:max-w-none">
                Full-Stack Software Engineer & Systems Architect • Built for international impact.
              </p>
            </div>

            {/* Quick Navigation Links in Footer */}
            <nav className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
              <Link href="/" className="hover:text-foreground transition">Home</Link>
              <Link href="/skills" className="hover:text-foreground transition">Expertise</Link>
              <Link href="/projects" className="hover:text-foreground transition">My Work</Link>
              <Link href="/experience" className="hover:text-foreground transition">Journey</Link>
              <Link href="/blog" className="hover:text-foreground transition">Insights</Link>
              <Link href="/contact" className="hover:text-foreground transition">Let's Talk</Link>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} Fekadu Markos. All rights reserved.</p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              <a
                href="https://t.me/fekadumark"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:border-sky-400 hover:text-sky-400 active:bg-muted"
                title="Telegram"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/fekadu_markos/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:border-pink-500 hover:text-pink-500 active:bg-muted"
                title="Instagram"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://web.facebook.com/fekadu.mark"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:border-blue-500 hover:text-blue-500 active:bg-muted"
                title="Facebook"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:text-foreground active:bg-muted"
                title="GitHub"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background transition hover:text-blue-400 active:bg-muted"
                title="LinkedIn"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <Link
                href="/admin"
                className="ml-2 rounded-md border border-border/80 px-2.5 py-1 text-[11px] text-muted-foreground/80 transition hover:text-foreground hover:bg-muted active:bg-muted"
              >
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
