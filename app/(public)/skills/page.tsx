import Link from "next/link";
import { 
  Code2, 
  Terminal, 
  Globe, 
  Cpu, 
  Palette, 
  CheckCircle2,
  ArrowRight,
  Download,
  Sparkles,
  Layers,
  Database
} from "lucide-react";

export const metadata = {
  title: "Technical Expertise & Skills | Fekadu Markos",
  description: "Comprehensive technical competencies, programming languages, web development, software engineering, and graphic design toolset of Fekadu Markos.",
};

const skillCategories = [
  {
    number: "01.",
    title: "Programming Languages",
    icon: Terminal,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    badgeColor: "bg-blue-950/70 text-blue-400 border-blue-800/70",
    description: "Core languages used for building software applications, algorithms, dynamic web backends, and mobile systems.",
    skills: [
      { name: "Java", level: "Advanced", percentage: "88%", experience: "Academic & Desktop Projects", notes: "Core Java, OOP, Java Swing, Collections, Multi-threading" },
      { name: "Python", level: "Proficient", percentage: "82%", experience: "Scripting & Data", notes: "Automation, algorithms, backend scripting, logic problem solving" },
      { name: "C++", level: "Proficient", percentage: "80%", experience: "Foundational CS", notes: "Object-oriented programming, data structures, computational logic" },
      { name: "JavaScript", level: "Advanced", percentage: "86%", experience: "Full-Stack Web Dev", notes: "ES6+, asynchronous programming, DOM APIs, dynamic interfaces" },
      { name: "PHP", level: "Proficient", percentage: "80%", experience: "Server-side Web Dev", notes: "Backend scripts, MySQL integration, REST endpoints, MVC patterns" },
      { name: "Dart", level: "Proficient", percentage: "78%", experience: "Mobile Applications", notes: "Flutter framework, widget logic, reactive mobile architecture" },
      { name: "SQL", level: "Advanced", percentage: "85%", experience: "Database Systems", notes: "Complex queries, joins, relational schema design, data normalization" },
    ],
  },
  {
    number: "02.",
    title: "Web Development",
    icon: Globe,
    color: "text-zinc-300 bg-zinc-500/10 border-zinc-500/20",
    badgeColor: "bg-zinc-800/90 text-zinc-200 border-zinc-700/70",
    description: "End-to-end web technologies for engineering interactive, accessible, and high-performance digital experiences.",
    skills: [
      { name: "HTML5", level: "Advanced", percentage: "92%", experience: "Web Standards", notes: "Semantic document structure, web accessibility (a11y), SEO-friendly markup" },
      { name: "CSS3", level: "Advanced", percentage: "90%", experience: "Modern Layouts", notes: "Flexbox, CSS Grid, media queries, keyframe animations, responsive theming" },
      { name: "JavaScript", level: "Advanced", percentage: "86%", experience: "Client Interactivity", notes: "Dynamic DOM rendering, event handling, async data fetching, web APIs" },
      { name: "Responsive Design", level: "Advanced", percentage: "90%", experience: "Multi-Device UI", notes: "Mobile-first workflows, fluid grid scaling, cross-browser compatibility" },
      { name: "PHP", level: "Proficient", percentage: "80%", experience: "Backend Architecture", notes: "Server-side logic, session management, secure form processing" },
      { name: "MySQL", level: "Advanced", percentage: "85%", experience: "Relational Persistence", notes: "Database normalization, relational integrity, indexing, CRUD pipelines" },
    ],
  },
  {
    number: "03.",
    title: "Software & Application Development",
    icon: Cpu,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeColor: "bg-emerald-950/70 text-emerald-400 border-emerald-800/70",
    description: "Robust software engineering methodologies, cross-platform mobile apps, desktop systems, and collaborative development tools.",
    skills: [
      { name: "Java Swing", level: "Advanced", percentage: "86%", experience: "Desktop Applications", notes: "Graphical user interface engineering, event listeners, layout managers" },
      { name: "Flutter", level: "Proficient", percentage: "80%", experience: "Android Mobile", notes: "Cross-platform mobile apps, reactive widget tree, navigation & state" },
      { name: "Database Design", level: "Advanced", percentage: "85%", experience: "System Architecture", notes: "Entity-Relationship (ER) diagrams, relational modeling, 3NF schemas" },
      { name: "OOP", level: "Advanced", percentage: "90%", experience: "Software Design", notes: "Encapsulation, inheritance, polymorphism, abstraction, SOLID design principles" },
      { name: "REST APIs", level: "Advanced", percentage: "84%", experience: "Network Services", notes: "HTTP methods, JSON serialization, API integration, client-server contract" },
      { name: "Git & GitHub", level: "Advanced", percentage: "88%", experience: "Source Control", notes: "Branching workflows, commits, pull requests, collaborative versioning" },
    ],
  },
  {
    number: "04.",
    title: "Graphic Design & Creative Tools",
    icon: Palette,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    badgeColor: "bg-purple-950/70 text-purple-300 border-purple-800/70",
    description: "Visual branding, digital graphic art, layout composition, and intuitive user interface design.",
    skills: [
      { name: "Adobe Photoshop", level: "Advanced", percentage: "92%", experience: "Creative Production", notes: "Photo manipulation, raster graphics, asset optimization, visual retouching" },
      { name: "Logo Design", level: "Advanced", percentage: "88%", experience: "Brand Identity", notes: "Memorable brand emblems, typographic identity, geometric precision" },
      { name: "Poster Design", level: "Advanced", percentage: "90%", experience: "Promotional Media", notes: "Visual hierarchy, striking typography, color balance, marketing impact" },
      { name: "Social Media Design", level: "Advanced", percentage: "90%", experience: "Digital Marketing", notes: "High-engagement social banners, campaign visuals, story designs" },
      { name: "Visual Branding", level: "Advanced", percentage: "88%", experience: "Creative Direction", notes: "Brand guidelines, color theory, typography pairing, aesthetic consistency" },
      { name: "UI Design", level: "Proficient", percentage: "84%", experience: "Interface Layouts", notes: "User-centered wireframing, component mockups, digital product flows" },
    ],
  },
];

export default function SkillsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:py-16 sm:px-6">
      {/* Header */}
      <div className="max-w-3xl space-y-3 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Code2 className="h-3.5 w-3.5" />
          Technical Expertise & Creative Toolset
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Skills & Technical Matrix
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          Technologies and tools I have actively worked with as a Software Engineering student, aspiring Full-Stack Developer, and Creative Graphic Designer.
        </p>
      </div>

      {/* Skills Grid: 4 Core Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div 
              key={category.number} 
              className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm transition hover:border-primary/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${category.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">
                      <span className="font-mono text-muted-foreground mr-1.5">{category.number}</span>
                      {category.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">{category.skills.length} verified competencies</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill List with Proficiency */}
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="rounded-xl border border-border/70 bg-background/60 p-3 text-xs sm:text-sm transition hover:bg-muted/40 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-primary">{skill.percentage}</span>
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] sm:text-xs text-muted-foreground pl-6">
                        {skill.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering & Design Philosophy Ribbon */}
      <div className="mt-14 sm:mt-20 rounded-2xl border border-border bg-card p-6 sm:p-10">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-6 text-center">
          Core Principles Guiding My Work
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">1. Clean Code & Object-Oriented Design</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Writing maintainable, modular, and readable software backed by strong OOP fundamentals and data structures.
            </p>
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">2. Responsive & User-Centric Experiences</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ensuring digital applications and websites look polished, run smoothly, and adapt to all screen sizes.
            </p>
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-semibold text-foreground text-sm sm:text-base">3. Continuous Innovation & Visual Impact</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Fusing technical precision with graphic design and branding to turn complex ideas into engaging experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground">Want to see these skills in action?</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Explore my featured projects, applications, and creative designs.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/projects"
            className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-lg bg-primary px-5 text-xs font-semibold text-primary-foreground shadow transition hover:bg-primary/90"
          >
            Explore My Work
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 w-full sm:w-auto items-center justify-center rounded-lg border border-border bg-card px-5 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </div>
  );
}
