"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { skillGroups } from "@/data/skills";
import { Monitor, Server, Database, Cloud, Wrench } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Monitor className="w-5 h-5" />,
  backend: <Server className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  devops: <Cloud className="w-5 h-5" />,
  tools: <Wrench className="w-5 h-5" />,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative section-padding overflow-hidden"
      aria-label="Skills section"
    >
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

        <BentoGrid>
          {skillGroups.map((group, gi) => (
            <BentoItem
              key={group.category}
              colSpan={
                group.category === "frontend" || group.category === "backend"
                  ? 1
                  : 1
              }
              glowColor={
                gi % 3 === 0 ? "cyan" : gi % 3 === 1 ? "violet" : "indigo"
              }
              delay={gi * 0.1}
            >
              {/* Category header */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${group.color}15`,
                      border: `1px solid ${group.color}25`,
                      color: group.color,
                    }}
                  >
                    {categoryIcons[group.category]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{group.label}</h3>
                    <p className="text-xs text-white/40">{group.description}</p>
                  </div>
                </div>

                {/* Skills list */}
                <div className="flex flex-col gap-3">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: gi * 0.1 + si * 0.07,
                      }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xl w-7 text-center shrink-0">
                        {skill.icon}
                      </span>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-white/80">
                            {skill.name}
                          </span>
                          <span
                            className="font-mono text-xs"
                            style={{ color: skill.color }}
                          >
                            {"●".repeat(skill.level)}
                            {"○".repeat(5 - skill.level)}
                          </span>
                        </div>
                        <p className="text-xs text-white/35">
                          {skill.description}
                        </p>
                        {/* skill bar */}
                        <div className="h-0.5 w-full rounded-full bg-white/[0.04] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: skill.color }}
                            initial={{ width: 0 }}
                            whileInView={{
                              width: `${(skill.level / 5) * 100}%`,
                            }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: gi * 0.1 + si * 0.1 + 0.3,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 blur-3xl pointer-events-none"
                style={{ background: group.color }}
              />
            </BentoItem>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
