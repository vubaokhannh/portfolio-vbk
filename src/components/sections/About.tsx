"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoItem } from "@/components/ui/BentoGrid";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { personal } from "@/data/personal";
import {
  Calendar,
  Package,
  Cpu,
  GitCommit,
  MapPin,
  BookOpen,
  Zap,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="w-5 h-5" />,
  package: <Package className="w-5 h-5" />,
  cpu: <Cpu className="w-5 h-5" />,
  "git-commit": <GitCommit className="w-5 h-5" />,
};

const accentColors = ["#00D9FF", "#7C3AED", "#4F46E5", "#00D9FF"];

export default function About() {
  return (
    <section
      id="about"
      className="relative section-padding overflow-hidden"
      aria-label="About section"
    >
      <div className="container-custom">
        <SectionHeading
          eyebrow="About Me"
          title="Crafting Digital Excellence"
          description="Passionate about building systems that scale, code that breathes, and experiences that delight."
          className="mb-16"
        />

        <BentoGrid className="gap-4">
          {/* Bio card — spans 2 cols */}
          <BentoItem colSpan={2} glowColor="cyan" delay={0.1}>
            <div className="flex flex-col gap-6 h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#00D9FF]" />
                </div>
                <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
                  Introduction
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-white">
                  Hi, I&apos;m{" "}
                  <span className="text-gradient-cyan">Vu Bao Khanh</span>
                </h3>
                <p className="text-white/60 leading-relaxed">{personal.bio}</p>
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <MapPin className="w-4 h-4 text-[#00D9FF]" />
                <span className="text-sm text-white/40">
                  {personal.location}
                </span>
              </div>
            </div>

            {/* decorative gradient */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
              style={{ background: "#00D9FF" }}
            />
          </BentoItem>

          {/* Location / Status card */}
          <BentoItem glowColor="violet" delay={0.15}>
            <div className="flex flex-col gap-4 h-full">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <div>
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-1">
                  Current Focus
                </p>
                <h3 className="text-lg font-semibold text-white">
                  Learning Node.js &amp; System Design
                </h3>
              </div>
              <div className="mt-auto flex flex-wrap gap-2">
                {["Node.js", "Next.js", "Architecture"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-md text-xs font-mono border border-[#7C3AED]/20 text-[#7C3AED]/80 bg-[#7C3AED]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BentoItem>

          {/* Stats cards */}
          {personal.stats.map((stat, i) => (
            <BentoItem
              key={stat.id}
              glowColor={i % 2 === 0 ? "cyan" : "violet"}
              delay={0.2 + i * 0.08}
            >
              <div className="flex flex-col gap-4 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${accentColors[i]}10`,
                    border: `1px solid ${accentColors[i]}20`,
                    color: accentColors[i],
                  }}
                >
                  {iconMap[stat.icon]}
                </div>
                <div className="mt-auto">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.1,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="text-4xl font-black text-white"
                    style={{ color: accentColors[i] }}
                  >
                    {stat.value}
                    <span className="text-2xl">{stat.suffix}</span>
                  </motion.p>
                  <p className="text-sm text-white/40 mt-1">{stat.label}</p>
                </div>
              </div>
            </BentoItem>
          ))}

          {/* Stack preview card — spans 2 cols */}
          <BentoItem colSpan={2} glowColor="indigo" delay={0.4}>
            <div className="flex flex-col gap-4">
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest">
                Primary Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "PHP", color: "#8892BF" },
                  { name: "Laravel", color: "#FF2D20" },
                  { name: "React", color: "#61DAFB" },
                  { name: "TypeScript", color: "#3178C6" },
                  { name: "Tailwind CSS", color: "#06B6D4" },
                  { name: "Filament", color: "#F59E0B" },
                  { name: "MySQL", color: "#4479A1" },
                ].map((tech) => (
                  <motion.span
                    key={tech.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 rounded-lg text-sm font-mono font-medium border border-white/[0.06] bg-white/[0.03] cursor-default"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>

            <div
              className="absolute bottom-0 right-0 w-60 h-40 opacity-10 blur-3xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
              }}
            />
          </BentoItem>
        </BentoGrid>
      </div>
    </section>
  );
}
