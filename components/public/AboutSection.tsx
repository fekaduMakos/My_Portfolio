"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Target, Lightbulb, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function AboutSection() {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[780px] overflow-hidden border-y border-border/50 bg-[#020817] flex flex-col">
      
      {/* Full-Screen Background with Full Uncropped Workspace Portrait */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-0 flex justify-center md:justify-end"
      >
        <div
          className="relative h-full w-full md:w-auto flex justify-center md:justify-end"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 24%, black 95%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 24%, black 95%, transparent 100%)",
          }}
        >
          <img
            src="/images/about-workspace.png"
            alt="Fekadu Markos in Modern Developer Workspace"
            style={{ opacity: 0.52 }}
            className="h-full w-auto max-w-full object-contain object-top md:object-right"
          />
        </div>
        {/* Subtle Top, Bottom & Left Vignette for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/75 md:via-[#020817]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/70 via-transparent to-[#020817]/90" />
      </motion.div>

      {/* Foreground Content Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-between container mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8 pb-6 sm:pb-8 gap-10 sm:gap-12">
        
        {/* Top Content: Label, Balanced Heading, Concise Paragraphs & Timeline Link */}
        <div className="max-w-2xl space-y-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0}
            className="space-y-3 pt-1"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-primary font-mono backdrop-blur-sm">
              ABOUT ME
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold tracking-tight text-white leading-[1.2]">
              Passionate About Technology. Inspired by Creativity. Driven by Innovation.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0.1}
            className="space-y-3.5 text-sm sm:text-base text-slate-200 leading-relaxed"
          >
            <p>
              I'm <strong className="text-white font-semibold">Fekadu Markos</strong>, a Software Engineering student who blends technical expertise with creative thinking to build meaningful digital experiences.
            </p>
            <p>
              My work spans developing software applications, designing responsive websites, structuring database systems, and crafting engaging graphic designs.
            </p>
            <p>
              I believe great technology goes beyond writing code—it's about understanding real problems, designing effective solutions, and creating experiences people enjoy using.
            </p>
            <p>
              I'm continuously learning and experimenting with new technologies to grow as a versatile software developer and creative professional.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            custom={0.2}
            className="pt-1"
          >
            <Link
              href="/experience"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/90 transition-colors"
            >
              <span>Explore My Journey Timeline</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Bottom 3-Column Strip: My Mission, My Vision, Core Focus Areas */}
        <div className="w-full pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            
            {/* 1. My Mission Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0.1}
              className="group rounded-2xl border border-primary/35 bg-[#040914]/85 backdrop-blur-md p-5 sm:p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/65 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary border border-primary/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Target className="h-4 w-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">My Mission</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To transform creative ideas into practical digital solutions through continuous learning, innovation, and quality development.
                </p>
              </div>
            </motion.div>

            {/* 2. My Vision Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0.2}
              className="group rounded-2xl border border-emerald-500/35 bg-[#040914]/85 backdrop-blur-md p-5 sm:p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/65 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">My Vision</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To become a skilled software engineer and creative technologist, contributing to impactful projects and making a positive difference through technology.
                </p>
              </div>
            </motion.div>

            {/* 3. Core Focus Areas Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={0.3}
              className="group rounded-2xl border border-white/15 bg-[#040914]/85 backdrop-blur-md p-5 sm:p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Core Focus Areas
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    "Software Applications",
                    "Responsive Websites",
                    "Database Systems",
                    "Graphic & UI Design",
                    "Continuous Learning",
                  ].map((area) => (
                    <span
                      key={area}
                      className="rounded-lg bg-secondary/90 px-2.5 py-1 font-medium text-secondary-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
