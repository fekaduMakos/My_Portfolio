"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Download,
  Home,
  Code2,
  FolderKanban,
  Briefcase,
  BookOpen,
  Mail
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf");
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Fetch configured CV / Resume URL from Supabase site_settings
  useEffect(() => {
    async function loadResumeUrl() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("site_settings")
          .select("resume_url")
          .eq("id", 1)
          .single();

        if (data?.resume_url) {
          setResumeUrl(data.resume_url);
        }
      } catch (err) {
        // Fallback to /resume.pdf
      }
    }
    loadResumeUrl();
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Expertise", href: "/skills", icon: Code2 },
    { name: "My Work", href: "/projects", icon: FolderKanban },
    { name: "Journey", href: "/experience", icon: Briefcase },
    { name: "Insights", href: "/blog", icon: BookOpen },
    { name: "Let's Talk", href: "/contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 relative">
        
        {/* LEFT: Brand Logo with Profile Avatar */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 font-mono font-bold tracking-tight text-foreground transition hover:opacity-80 shrink-0 z-10"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl overflow-hidden border border-primary/40 bg-primary/10 shadow-sm">
            <img 
              src="/images/profile.png" 
              alt="Fekadu Markos" 
              className="h-full w-full object-cover" 
            />
          </div>
          <span className="text-sm sm:text-base font-bold tracking-tight text-foreground">Fekadu Markos</span>
        </Link>

        {/* CENTER: Navigation Links (Perfect Center) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition hover:text-foreground ${isActive ? "text-primary font-bold" : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT CORNER: Download Resume Button & Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0 z-10">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 px-3.5 text-xs font-bold text-primary shadow-sm transition hover:bg-primary hover:text-primary-foreground active:scale-95"
            title="Download Fekadu Markos's Resume"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download Resume
          </a>

          {/* Mobile & Tablet Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/80 text-foreground md:hidden transition hover:bg-muted focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 flex flex-col bg-background/95 backdrop-blur-xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col flex-1 px-6 py-6 justify-between overflow-y-auto">
            {/* Mobile Nav Links */}
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Navigation</p>
              <nav className="flex flex-col space-y-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold transition ${
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-primary" />
                        {link.name}
                      </span>
                      <span className="text-xs text-muted-foreground">→</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Download Resume Button */}
              <div className="pt-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground shadow-lg transition active:scale-95"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="pt-6 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <Link href="/admin" className="underline hover:text-foreground">
                Admin Console
              </Link>
              <span>© {new Date().getFullYear()} Fekadu Markos</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
