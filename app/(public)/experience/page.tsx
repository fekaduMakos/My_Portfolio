import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function ExperiencePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-16 sm:px-6">
      <div className="mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Work Experience & Milestones</h1>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Track record of shipping software across international distributed teams.
        </p>
      </div>

      <div className="space-y-8 sm:space-y-12 border-l-2 border-border/60 pl-4 sm:pl-6 ml-2 sm:ml-4">
        <div className="relative">
          {/* Dot */}
          <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 border-primary bg-background" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
            <h3 className="text-lg sm:text-xl font-bold">Senior Full-Stack Engineer</h3>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" /> 2023 — Present
            </span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-primary font-medium mt-1">
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5" /> Global Tech Solutions
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> Remote (International)
            </span>
          </div>

          <ul className="mt-4 list-disc pl-4 sm:pl-5 space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <li>Architected and delivered low-latency microservices serving over 250,000 monthly active users.</li>
            <li>Reduced database query response times by 38% through indexing and caching optimizations in PostgreSQL.</li>
            <li>Collaborated across cross-functional engineering teams in North America and Europe.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
