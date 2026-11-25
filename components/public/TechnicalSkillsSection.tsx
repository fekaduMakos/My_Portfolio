"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Terminal, 
  Globe, 
  Cpu, 
  Palette, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface SkillItem {
  name: string;
  level: "Advanced" | "Proficient";
  percentage: number;
  experience: string;
  highlight: string;
}

interface SkillCategory {
  number: string;
  title: string;
  icon: React.ElementType;
  cardBorder: string;
  iconBox: string;
  badgeStyle: {
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
    hoverBorder: string;
    glow: string;
  };
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    number: "01.",
    title: "Programming Languages",
    icon: Terminal,
    cardBorder: "border-blue-500/35 hover:border-blue-400/65",
    iconBox: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    badgeStyle: {
      bg: "bg-[#0b1c38]/90",
      text: "text-[#38bdf8]",
      border: "border-[#1e3a8a]/70",
      hoverBg: "hover:bg-[#0f274d]",
      hoverBorder: "hover:border-[#38bdf8]/80",
      glow: "hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]",
    },
    skills: [
      { name: "Java", level: "Advanced", percentage: 88, experience: "Core Java, OOP, Java Swing, Data Structures", highlight: "Academic & Desktop Projects" },
      { name: "Python", level: "Proficient", percentage: 82, experience: "Scripting, Automation, Algorithms & Problem Solving", highlight: "Data & Systems Logic" },
      { name: "C++", level: "Proficient", percentage: 80, experience: "Object-Oriented Programming & Computational Logic", highlight: "Foundational CS" },
      { name: "JavaScript", level: "Advanced", percentage: 86, experience: "Modern ES6+, Async/Await, DOM & Dynamic Interfaces", highlight: "Full-Stack Web Dev" },
      { name: "PHP", level: "Proficient", percentage: 80, experience: "Server-side scripting, API endpoints & MySQL integration", highlight: "Dynamic Web Apps" },
      { name: "Dart", level: "Proficient", percentage: 78, experience: "Mobile application logic & widget-based development", highlight: "Flutter Mobile Apps" },
      { name: "SQL", level: "Advanced", percentage: 85, experience: "Relational Queries, Joins, Schema Modeling & Optimization", highlight: "Database Architecture" },
    ],
  },
  {
    number: "02.",
    title: "Web Development",
    icon: Globe,
    cardBorder: "border-zinc-500/35 hover:border-zinc-400/65",
    iconBox: "bg-zinc-500/15 text-zinc-200 border-zinc-500/25",
    badgeStyle: {
      bg: "bg-[#18181b]/95",
      text: "text-[#f4f4f5]",
      border: "border-[#2e2e36]",
      hoverBg: "hover:bg-[#27272a]",
      hoverBorder: "hover:border-[#71717a]",
      glow: "hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    },
    skills: [
      { name: "HTML5", level: "Advanced", percentage: 92, experience: "Semantic markup, accessibility & modern web structure", highlight: "Web Standards" },
      { name: "CSS3", level: "Advanced", percentage: 90, experience: "Responsive Flexbox, Grid, custom styling & animations", highlight: "Modern Layouts" },
      { name: "JavaScript", level: "Advanced", percentage: 86, experience: "Interactive client-side logic, events & dynamic rendering", highlight: "Rich User Experience" },
      { name: "Responsive Design", level: "Advanced", percentage: 90, experience: "Mobile-first architecture, breakpoints & fluid UI", highlight: "Multi-Device Compatibility" },
      { name: "PHP", level: "Proficient", percentage: 80, experience: "Backend web architecture, session handling & CRUD pipelines", highlight: "Server-Side Logic" },
      { name: "MySQL", level: "Advanced", percentage: 85, experience: "Relational tables, schema design & query execution", highlight: "Data Persistence" },
    ],
  },
  {
    number: "03.",
    title: "Software & Application Development",
    icon: Cpu,
    cardBorder: "border-emerald-500/35 hover:border-emerald-400/65",
    iconBox: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    badgeStyle: {
      bg: "bg-[#062417]/90",
      text: "text-[#34d399]",
      border: "border-[#065f46]/70",
      hoverBg: "hover:bg-[#0a3523]",
      hoverBorder: "hover:border-[#34d399]/80",
      glow: "hover:shadow-[0_0_15px_rgba(52,211,153,0.2)]",
    },
    skills: [
      { name: "Java Swing", level: "Advanced", percentage: 86, experience: "Desktop GUI development, MVC architecture & event handling", highlight: "Desktop Applications" },
      { name: "Flutter", level: "Proficient", percentage: 80, experience: "Cross-platform mobile apps for Android, responsive UI", highlight: "Mobile Engineering" },
      { name: "Database Design", level: "Advanced", percentage: 85, experience: "ER modeling, 3NF normalization, relational integrity", highlight: "System Modeling" },
      { name: "OOP", level: "Advanced", percentage: 90, experience: "Encapsulation, Inheritance, Polymorphism, Design Patterns", highlight: "Software Architecture" },
      { name: "REST APIs", level: "Advanced", percentage: 84, experience: "HTTP methods, JSON serialization, client-server integration", highlight: "API Services" },
      { name: "Git & GitHub", level: "Advanced", percentage: 88, experience: "Version control, branching, commits & collaborative workflow", highlight: "DevOps & Source Control" },
    ],
  },
  {
    number: "04.",
    title: "Graphic Design & Creative Tools",
    icon: Palette,
    cardBorder: "border-purple-500/35 hover:border-purple-400/65",
    iconBox: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    badgeStyle: {
      bg: "bg-[#200d36]/90",
      text: "text-[#c084fc]",
      border: "border-[#581c87]/70",
      hoverBg: "hover:bg-[#2c134a]",
      hoverBorder: "hover:border-[#c084fc]/80",
      glow: "hover:shadow-[0_0_15px_rgba(192,132,252,0.2)]",
    },
    skills: [
      { name: "Adobe Photoshop", level: "Advanced", percentage: 92, experience: "Photo manipulation, raster graphics, branding assets & retouching", highlight: "Creative Artistry" },
      { name: "Logo Design", level: "Advanced", percentage: 88, experience: "Vector emblems, brand identity marks & visual storytelling", highlight: "Brand Identity" },
      { name: "Poster Design", level: "Advanced", percentage: 90, experience: "High-impact visual hierarchy, typography & promotional art", highlight: "Visual Media" },
      { name: "Social Media Design", level: "Advanced", percentage: 90, experience: "Engaging social banners, campaign creative & digital ads", highlight: "Digital Marketing" },
      { name: "Visual Branding", level: "Advanced", percentage: 88, experience: "Brand guidelines, color theory & consistent identity design", highlight: "Brand Strategy" },
      { name: "UI Design", level: "Proficient", percentage: 84, experience: "User-centric wireframes, component layouts & prototyping", highlight: "Interface Design" },
    ],
  },
];

export function TechnicalSkillsSection() {
  const [showProficiency, setShowProficiency] = useState(false);
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  return (
    <section className="relative w-full border-y border-border/50 bg-[#020817]">
      
      {/* Top Visual Image Frame: Matched to About Me Image Size (Zero Cards Overlapping Face) */}
      <div className="relative w-full min-h-[70vh] sm:min-h-[640px] lg:min-h-[780px] overflow-hidden flex items-start">
        {/* Background Skills Image on the Left */}
        <div className="pointer-events-none absolute inset-0 flex justify-center md:justify-start">
          <div
            className="relative h-full w-full md:w-auto flex justify-center md:justify-start"
            style={{
              WebkitMaskImage:
                "linear-gradient(to left, transparent 0%, black 24%, black 100%)",
              maskImage:
                "linear-gradient(to left, transparent 0%, black 24%, black 100%)",
            }}
          >
            <img
              src="/images/skills-bg.jpg"
              alt="Fekadu Markos Technical Expertise Workspace"
              style={{ opacity: 0.65 }}
              className="h-full w-auto max-w-full object-contain object-top md:object-left -translate-x-4 sm:-translate-x-6"
            />
          </div>
          {/* Subtle Top, Bottom & Right Vignette for Title Readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-[#020817] via-[#020817]/80 md:via-[#020817]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/60 via-transparent to-[#020817]" />
        </div>

        {/* Section Header Positioned Toward Top-Right */}
        <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 pt-8 sm:pt-12 pb-8 flex justify-end">
          <div className="w-full max-w-xl space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-primary font-mono backdrop-blur-sm">
              03. TECHNICAL EXPERTISE / SKILLS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Technical Expertise / Skills
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              A versatile skill set spanning software development, modern web technologies, database systems, and graphic design. I combine technical knowledge with creative problem-solving to build functional digital experiences, develop practical solutions, and create visually engaging designs.
            </p>
            <div className="pt-1">
              <Link
                href="/skills"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline"
              >
                Explore Full Matrix
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 2x2 Grid: Completely Outside & Below the Image Frame */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 pb-10 sm:pb-12 pt-4 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        
        {/* Categories 01 to 04 */}
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.number}
              className={`group rounded-2xl border ${category.cardBorder} bg-[#040914]/85 backdrop-blur-md p-4 sm:p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-3.5`}
            >
              {/* Category Title with Icon Box like My Mission */}
              <div className="flex items-center gap-2.5">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${category.iconBox}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                  <span className="font-mono text-slate-400 mr-1">{category.number}</span>
                  {category.title}
                </h3>
              </div>

              {/* Badges / Pills Row */}
              <div className="flex flex-wrap items-center gap-1.5">
                {category.skills.map((skill) => {
                  const isSelected = activeSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => setActiveSkill(isSelected ? null : skill)}
                      type="button"
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer ${category.badgeStyle.bg} ${category.badgeStyle.text} border ${category.badgeStyle.border} ${category.badgeStyle.hoverBg} ${category.badgeStyle.hoverBorder} ${category.badgeStyle.glow} ${
                        isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105" : ""
                      }`}
                      title={`Click to view proficiency details for ${skill.name}`}
                    >
                      <span>{skill.name}</span>
                      {showProficiency && (
                        <span className="text-[10px] font-mono opacity-80 pl-1 border-l border-current/30">
                          {skill.percentage}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
          </div>

        {/* Selected Skill Quick Detail Card (if clicked) */}
        {activeSkill && (
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-4 sm:p-5 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm sm:text-base font-bold text-foreground">
                  {activeSkill.name}
                </span>
                <span className="rounded-full bg-primary/20 text-primary px-2 py-0.5 text-xs font-semibold">
                  {activeSkill.level} ({activeSkill.percentage}%)
                </span>
              </div>
              <button
                onClick={() => setActiveSkill(null)}
                className="text-xs text-muted-foreground hover:text-foreground self-end sm:self-auto cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <strong className="text-foreground font-medium">Hands-on Experience: </strong>
              {activeSkill.experience} — <span className="text-primary font-medium">{activeSkill.highlight}</span>
            </p>
          </div>
        )}

        {/* Bottom Toggle Arrow Button (as requested in screenshot) */}
        <div className="pt-4 flex flex-col items-center justify-center space-y-3">
          <button
            onClick={() => setShowProficiency(!showProficiency)}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-secondary/80 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md group cursor-pointer"
            title={showProficiency ? "Hide detailed proficiency levels" : "Show detailed proficiency levels"}
            aria-label="Toggle proficiency levels"
          >
            {showProficiency ? (
              <ChevronUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            ) : (
              <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            )}
          </button>

          {/* Screenshot Note / Caption */}
          <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-xl font-medium">
            Only include technologies and tools you have actually worked with. Add proficiency levels if you can support
          </p>
        </div>

        {/* Expandable Proficiency Breakdown Panel */}
        {showProficiency && (
          <div className="mt-6 pt-6 border-t border-border/50 animate-in fade-in slide-in-from-top-3 duration-300 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider font-mono">
                Verified Proficiency Breakdown
              </h4>
              <span className="text-xs text-primary font-medium">25 Verified Competencies</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillCategories.flatMap((cat) => cat.skills).map((skill) => (
                <div 
                  key={skill.name}
                  className="rounded-lg border border-border/60 bg-background/50 p-3 space-y-2 hover:border-border transition"
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-mono">{skill.level}</span>
                      <span className="font-mono text-primary font-bold">{skill.percentage}%</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-500"
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {skill.experience}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
