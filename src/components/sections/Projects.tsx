"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { projectsEn, projectsVi } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";
import type { Project } from "@/types";
import { ArrowUpRight, Github, Zap } from "lucide-react";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { t } = useLanguage();

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [6, -6]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-6, 6]), {
    stiffness: 200,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{ perspective: 1200 }}
      className="group min-w-0 h-full flex"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-2xl border border-white/[0.06] bg-[#0F1117]/90 backdrop-blur-xl overflow-hidden cursor-default flex flex-col justify-between w-full shadow-2xl transition-colors duration-300 group-hover:border-white/[0.12]"
      >
        <div>
          {/* Animated top border line */}
          <div
            className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
            }}
          />

          {/* Hover glow overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 40% at 50% 0%, ${project.accentColor || project.color + "15"}, transparent)`,
            }}
          />

          {/* Card header — mock browser preview */}
          <div
            className="relative h-44 overflow-hidden select-none"
            style={{ backgroundColor: `${project.color}08` }}
          >
            {/* Browser chrome */}
            <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-4 py-3 border-b border-white/[0.04] bg-black/10 z-10">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FF5F57]/80" />
                <div className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
                <div className="w-2 h-2 rounded-full bg-[#28C840]/80" />
              </div>
              <div className="flex-1 mx-2 h-5 rounded-md bg-white/[0.04] flex items-center px-2 border border-white/[0.02]">
                <span className="font-mono text-[9px] text-white/30 tracking-wide lowercase">
                  {project.id ||
                    project.title.toLowerCase().replace(/\s+/g, "-")}
                  .dev
                </span>
              </div>
            </div>

            {/* Mock UI grid template */}
            <div className="absolute inset-0 pt-12 p-4 flex flex-col gap-2 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
              <div className="flex gap-2">
                <div
                  className="h-12 flex-1 rounded-lg opacity-30"
                  style={{ backgroundColor: project.color }}
                />
                <div className="h-12 w-20 rounded-lg bg-white/[0.05]" />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="h-8 flex-1 rounded-md bg-white/[0.03]"
                  />
                ))}
              </div>
            </div>

            {/* Year badge */}
            <div className="absolute top-12 right-4 px-2 py-0.5 rounded-md border border-white/[0.08] bg-black/40 backdrop-blur-md z-10">
              <span className="font-mono text-[10px] font-medium text-white/45">
                {project.year}
              </span>
            </div>
          </div>

          {/* Core Body Content */}
          <div className="p-5 flex flex-col gap-4">
            {/* Title + status badge */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold text-white leading-snug tracking-wide group-hover:text-white transition-colors duration-200">
                {project.title}
              </h3>
              <span className="shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#28C840]/8 border border-[#28C840]/15 text-[#28C840] tracking-wider uppercase select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] animate-pulse" />
                Live
              </span>
            </div>

            <p className="text-white/50 text-xs sm:text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/[0.05] bg-white/[0.02] text-white/50 transition-all duration-200 group-hover:border-white/[0.1] group-hover:text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Highlighted core features */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 pt-2 border-t border-white/[0.04]">
              {project.features?.slice(0, 4).map((feature) => (
                <div key={feature} className="flex items-center gap-2 min-w-0">
                  <Zap
                    className="w-3 h-3 shrink-0"
                    style={{ color: project.color }}
                  />
                  <span className="text-[11px] text-white/40 truncate select-none">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button Container (CTA) */}
        <div className="p-5 pt-0">
          <div className="flex items-center gap-2.5 pt-4 border-t border-white/[0.04]">
            {/* Github Code Repository Button */}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-200 shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                {t("projects.sourceCode")}
              </motion.a>
            )}

            {/* Live Production Demo Button */}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 shadow-md shadow-black/20"
                style={{
                  backgroundColor: `${project.color}15`,
                  border: `1px solid ${project.color}25`,
                  color: project.color,
                }}
              >
                {t("projects.liveDemo")}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { language, t } = useLanguage();
  const projectsList = language === "en" ? projectsEn : projectsVi;

  return (
    <section
      id="projects"
      className="relative section-padding overflow-hidden bg-[#030307]"
      aria-label="Projects section"
    >
      {/* Background soft ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(79,70,229,0.03) 0%, transparent 75%)",
        }}
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          description={t("projects.description")}
          className="mb-16"
        />

        {/* Responsive Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-stretch">
          {projectsList.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
