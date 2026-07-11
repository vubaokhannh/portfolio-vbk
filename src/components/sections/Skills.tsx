"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { skillGroups } from "@/data/skills";
import { SkillGroup } from "@/types";
import { Monitor, Server, Database, Cloud, Wrench } from "lucide-react";
import { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiFilament,
  SiMysql,
  SiRedis,
  SiDocker,
  SiGit,
  SiPostman,
  SiFigma,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Monitor className="w-4 h-4" />,
  backend: <Server className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  devops: <Cloud className="w-4 h-4" />,
  tools: <Wrench className="w-4 h-4" />,
};

const skillIconMap: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  laravel: SiLaravel,
  php: SiPhp,
  nodejs: SiNodedotjs,
  filament: SiFilament,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  redis: SiRedis,
  docker: SiDocker,
  git: SiGit,
  vscode: VscVscode,
  postman: SiPostman,
  figma: SiFigma,
  nestjs: SiNestjs,
  prisma: SiPrisma,
};

// Reorder skill groups for a perfectly balanced Bento layout:
// Row 1: Frontend (colSpan=2, 8 cols) + Database (colSpan=1, 4 cols) = 12 cols
// Row 2: Backend (colSpan=2, 8 cols) + DevOps (colSpan=1, 4 cols) = 12 cols
// Row 3: Tools (colSpan=3, 12 cols) = 12 cols
const ORDERED_CATEGORIES = ["frontend", "database", "backend", "devops", "tools"];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const orderedGroups = ORDERED_CATEGORIES.map((cat) =>
    skillGroups.find((group) => group.category === cat)
  ).filter(Boolean) as SkillGroup[];

  return (
    <section
      id="skills"
      className="relative section-padding overflow-hidden"
      aria-label="Skills section"
    >
      {/* Background radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(79,70,229,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom">
        <SectionHeading
          eyebrow="Skills"
          title="Tools of the Trade"
          description="A curated stack I use to build fast, scalable, and maintainable software."
          className="mb-16"
        />

        <BentoGrid className="gap-6">
          {orderedGroups.map((group, gi) => {
            // Determine colSpan and grid cols for skill items based on category
            let colSpan: 1 | 2 | 3 = 1;
            let skillsGridClass = "flex flex-col gap-4";

            if (group.category === "frontend" || group.category === "backend") {
              colSpan = 2; // Spans 8 cols
              skillsGridClass = "grid grid-cols-1 md:grid-cols-2 gap-4";
            } else if (group.category === "tools") {
              colSpan = 3; // Spans 12 cols (Full Width)
              skillsGridClass = "grid grid-cols-1 md:grid-cols-3 gap-4";
            }

            return (
              <BentoItem
                key={group.category}
                colSpan={colSpan}
                glowColor={
                  group.category === "frontend"
                    ? "cyan"
                    : group.category === "backend"
                    ? "violet"
                    : "indigo"
                }
                delay={gi * 0.1}
                className="flex flex-col justify-between relative overflow-hidden"
              >
                {/* Blueprint Dot Grid Background Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                />

                <div className="flex flex-col gap-6 relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: `${group.color}12`,
                        border: `1px solid ${group.color}25`,
                        color: group.color,
                        boxShadow: `0 0 15px ${group.color}10`,
                      }}
                    >
                      {categoryIcons[group.category]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base tracking-wide">
                        {group.label}
                      </h3>
                      <p className="text-xs text-white/40 font-medium">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className={skillsGridClass}>
                    {group.skills.map((skill, si) => {
                      const levelPercentage = (skill.level / 5) * 100;
                      const levelLabel =
                        skill.level === 5
                          ? "Expert"
                          : skill.level === 4
                          ? "Advanced"
                          : "Intermediate";

                      const IconComponent = skillIconMap[skill.id];

                      return (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: gi * 0.08 + si * 0.05,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                          whileHover={{ y: -2, scale: 1.01 }}
                          onMouseEnter={() => setHoveredSkill(skill.id)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className="group/skill relative rounded-xl border border-white/[0.04] bg-[#0A0C10]/40 p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02]"
                          style={{
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        >
                          <div className="flex items-center gap-4">
                            {/* Glowing Brand Icon Box */}
                            <div
                              className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center transition-all duration-300 group-hover/skill:scale-110 flex-shrink-0"
                              style={{
                                color: skill.color,
                                borderColor: hoveredSkill === skill.id ? `${skill.color}40` : "rgba(255,255,255,0.06)",
                                boxShadow: hoveredSkill === skill.id ? `0 0 15px ${skill.color}15` : "none",
                              }}
                            >
                              {IconComponent ? (
                                <IconComponent
                                  className="w-5 h-5 transition-all duration-300"
                                  style={{
                                    filter: hoveredSkill === skill.id ? `drop-shadow(0 0 8px ${skill.color})` : "none",
                                  }}
                                />
                              ) : (
                                <span className="text-xl">{skill.icon}</span>
                              )}
                            </div>

                            <div className="flex-grow flex flex-col gap-1.5 min-w-0">
                              <div className="flex justify-between items-baseline gap-2">
                                <span className="text-sm font-semibold text-white/90 group-hover/skill:text-white transition-colors truncate">
                                  {skill.name}
                                </span>
                                <span
                                  className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border tracking-wider uppercase flex-shrink-0"
                                  style={{
                                    color: skill.color,
                                    borderColor: `${skill.color}30`,
                                    backgroundColor: `${skill.color}08`,
                                  }}
                                >
                                  {levelLabel}
                                </span>
                              </div>
                              <p className="text-[11px] text-white/45 leading-relaxed font-medium truncate">
                                {skill.description}
                              </p>
                              
                              {/* Energy progress bar */}
                              <div className="h-1 w-full rounded-full bg-white/[0.04] overflow-hidden relative mt-1">
                                <motion.div
                                  className="h-full rounded-full relative"
                                  style={{
                                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                                  }}
                                  initial={{ width: 0 }}
                                  whileInView={{
                                    width: `${levelPercentage}%`,
                                  }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 1.2,
                                    delay: gi * 0.08 + si * 0.05 + 0.2,
                                    ease: "easeOut",
                                  }}
                                >
                                  {/* Pulsing glow point at the end edge */}
                                  <span
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full animate-pulse"
                                    style={{
                                      backgroundColor: skill.color,
                                      boxShadow: `0 0 8px ${skill.color}, 0 0 16px ${skill.color}`,
                                    }}
                                  />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Background accent glow */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.03] blur-3xl pointer-events-none"
                  style={{ background: group.color }}
                />
              </BentoItem>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
