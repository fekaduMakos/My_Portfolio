import Link from "next/link";
import { 
  ArrowRight, 
  Cpu, 
  Globe2, 
  Layers, 
  ShieldCheck, 
  Mail, 
  Terminal, 
  Code2, 
  Server, 
  Cloud, 
  Sparkles,
  Palette,
  Smartphone,
  Target,
  Lightbulb,
  Compass,
  CheckCircle2
} from "lucide-react";
import { HeroTypingText } from "@/components/public/HeroTypingText";
import { AboutSection } from "@/components/public/AboutSection";
import { TechnicalSkillsSection } from "@/components/public/TechnicalSkillsSection";
import { getFeaturedProjects } from "@/lib/supabase/projects";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects(4);
  return (
    <div className="space-y-16 sm:space-y-24 pb-16 sm:pb-24">
      {/* 1. HERO SECTION - CUSTOMIZED TEXT & BUTTONS */}
      <section className="container mx-auto max-w-6xl px-4 pt-10 sm:pt-16 md:pt-20 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Intro, Headline, Subheadline, Bio, and Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-primary font-mono">
                HI, I'M FEKADU MARKOS
              </p>

              {/* Dynamic Typewriter Effect for Roles */}
              <HeroTypingText />

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground leading-[1.12]">
                Turning Ideas Into Digital Experiences.
              </h1>

              <p className="text-base sm:text-xl font-bold text-foreground/90">
                Building Innovative Solutions Through Technology & Creativity.
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              I'm a Software Engineering student, aspiring Full-Stack Developer, and Creative Graphic Designer passionate about transforming ideas into functional, beautiful, and user-friendly digital experiences. I enjoy solving problems, exploring emerging technologies, and building solutions that make a difference.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href="/projects"
                className="inline-flex h-12 sm:h-11 items-center justify-center rounded-xl sm:rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 active:scale-[0.98]"
              >
                Explore My Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/skills"
                className="inline-flex h-12 sm:h-11 items-center justify-center rounded-xl sm:rounded-lg border border-border bg-card px-6 text-sm font-semibold text-foreground transition hover:bg-muted active:scale-[0.98]"
              >
                <Code2 className="mr-2 h-4 w-4 text-primary" />
                Discover My Skills
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 sm:h-11 items-center justify-center rounded-xl sm:rounded-lg border border-border/80 bg-background px-6 text-sm font-semibold text-muted-foreground hover:text-foreground transition active:scale-[0.98]"
              >
                <Mail className="mr-2 h-4 w-4" />
                Let's Connect
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Executive Profile Card */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="relative w-full max-w-sm rounded-3xl border border-border/80 bg-gradient-to-b from-card via-card to-background p-3.5 shadow-2xl shadow-black/25 transition hover:border-primary/40">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-muted">
                <img 
                  src="/images/profile.png" 
                  alt="Fekadu Markos" 
                  className="h-full w-full object-cover object-top transition duration-300 hover:scale-105"
                />
              </div>

              <div className="pt-3.5 pb-1 px-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-base text-foreground">Fekadu Markos</p>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                    Developer & Designer
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Software Engineering • Technology & Creativity
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS & METRICS RIBBON */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 rounded-2xl border border-border bg-card/60 p-6 sm:p-8 backdrop-blur">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">SE</div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Software Engineering</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-primary">Full-Stack</div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Web & API Development</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-foreground">Creative</div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Graphic Design & UI/UX</p>
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">Android</div>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">Mobile Application Dev</p>
          </div>
        </div>
      </section>

      {/* 3. ABOUT ME - WORKSPACE PORTRAIT + FULL NARRATIVE + MISSION/VISION BELOW */}
      <div className="!mt-10 sm:!mt-12">
        <AboutSection />
      </div>

      {/* 4. TECHNICAL EXPERTISE / SKILLS SECTION */}
      <TechnicalSkillsSection />

      {/* 5. FEATURED PROJECTS CASE STUDIES */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Case Studies</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              Featured Work
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline"
          >
            View All Work →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition hover:border-primary/50 shadow-sm"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="w-full bg-[#040914] overflow-hidden border-b border-border flex items-center justify-center"
                >
                  <img
                    src={project.cover_image || "/images/about-workspace.png"}
                    alt={project.title}
                    className="w-full h-auto max-h-80 object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">Featured</span>
                  </div>
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground flex-1 leading-relaxed">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40 text-xs font-semibold">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      Explore Project →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Featured Project Card 1 (Default Fallback) */}
              <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition hover:border-primary/50 shadow-sm">
                <div className="h-48 sm:h-56 bg-muted/60 flex items-center justify-center border-b border-border text-muted-foreground text-xs sm:text-sm font-mono px-4 text-center">
                  [Full-Stack Web App Preview]
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">Fullstack</span>
                    <span className="text-xs text-muted-foreground">Web Application</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Interactive Systems Platform</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground flex-1 leading-relaxed">
                    Full-stack web application featuring real-time state management, secure database integrations, and dynamic user interfaces.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground">Next.js</span>
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground">TypeScript</span>
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground">PostgreSQL</span>
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground">Tailwind CSS</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40 text-xs font-semibold">
                    <Link href="/projects" className="text-primary hover:underline flex items-center gap-1">
                      Explore Project →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Featured Project Card 2 (Default Fallback) */}
              <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition hover:border-primary/50 shadow-sm">
                <div className="h-48 sm:h-56 bg-muted/60 flex items-center justify-center border-b border-border text-muted-foreground text-xs sm:text-sm font-mono px-4 text-center">
                  [Android Mobile & Creative UI Showcase]
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">Mobile & Design</span>
                    <span className="text-xs text-muted-foreground">Android / UI</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Mobile Solutions & Brand Identity</h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground flex-1 leading-relaxed">
                    Native Android application paired with a cohesive creative design system, providing intuitive user journeys and responsive UX.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground">Android</span>
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground">UI/UX</span>
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground">Graphic Design</span>
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs font-mono text-secondary-foreground">Figma</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/40 text-xs font-semibold">
                    <Link href="/projects" className="text-primary hover:underline flex items-center gap-1">
                      Explore Project →
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 via-card to-card p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Let's Collaborate
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground max-w-2xl mx-auto">
            Ready to bring creative digital solutions to life?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Whether you're looking for a passionate developer, a creative designer, or an enthusiastic software engineering collaborator, let's connect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-primary px-8 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 active:scale-95"
            >
              Let's Connect
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
