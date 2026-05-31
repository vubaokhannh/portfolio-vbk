"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { personal } from "@/data/personal";
import { floatAnimation } from "@/animations/variants";
import { ArrowRight, Download, Github, Sparkles } from "lucide-react";

// Hệ thống thẻ công nghệ mở rộng từ CV - sử dụng ký tự text hình học cao cấp để đổi màu neon động
const TECH_CARDS = [
  { name: "Laravel", icon: "⬡", color: "#FF2D20", delay: 0 },
  { name: "NestJS", icon: "⬢", color: "#E0234E", delay: 0.4 },
  { name: "React", icon: "⚛", color: "#61DAFB", delay: 0.2 },
  { name: "Next.js", icon: "▲", color: "#FFFFFF", delay: 0.8 },
  { name: "TypeScript", icon: "⭓", color: "#3178C6", delay: 0.6 },
  { name: "Filament", icon: "⚡", color: "#F59E0B", delay: 1.0 },
  { name: "Docker", icon: "⛃", color: "#2496ED", delay: 1.2 },
  { name: "Redis", icon: "⬓", color: "#DC382D", delay: 1.4 },
  { name: "MySQL", icon: "⛁", color: "#4479A1", delay: 0.3 },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030307]"
      aria-label="Hero section"
    >
      <AuroraBackground intensity="medium" />

      {/* Floating tech cards — Bố trí tọa độ hình học so le bất đối xứng quanh tâm chữ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {TECH_CARDS.map((tech, i) => {
          const positions = [
            { top: "15%", left: "6%" }, // Laravel
            { top: "22%", right: "8%" }, // NestJS
            { top: "45%", left: "3%" }, // React
            { top: "35%", right: "22%" }, // Next.js
            { top: "12%", left: "24%" }, // TypeScript
            { top: "68%", right: "5%" }, // Filament
            { top: "72%", left: "8%" }, // Docker
            { top: "52%", right: "9%" }, // Redis
            { top: "82%", left: "26%" }, // MySQL
          ];
          const pos = positions[i % positions.length];

          return (
            <motion.div
              key={tech.name}
              className="absolute hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-white/[0.04] bg-[#0C0E14]/60 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-colors duration-300 hover:border-white/[0.12]"
              style={pos}
              variants={floatAnimation(tech.delay)}
              initial="initial"
              animate="animate"
            >
              {/* Icon tự phát sáng neon theo màu thương hiệu */}
              <span
                className="text-sm font-semibold select-none filter drop-shadow-[0_0_6px_currentColor]"
                style={{ color: tech.color }}
              >
                {tech.icon}
              </span>
              <span
                className="text-xs font-mono font-bold tracking-wide"
                style={{ color: tech.color }}
              >
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10 flex flex-col items-center text-center gap-8 pt-20">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00D9FF] animate-pulse" />
          <span className="text-xs font-mono text-white/50 tracking-widest uppercase font-semibold">
            Available for opportunities
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] animate-pulse shadow-[0_0_8px_#28C840]" />
        </motion.div>

        {/* Name với Animation mượt mà */}
        <div className="overflow-hidden py-1">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="text-6xl md:text-8xl lg:text-[96px] font-black tracking-tight leading-[0.9] select-none"
          >
            <span className="text-gradient-main bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
              VU BAO
            </span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #00D9FF 0%, #7C3AED 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              KHANH
            </span>
          </motion.h1>
        </div>

        {/* Role Sub-heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-3.5"
        >
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-white/10" />
            <span className="font-mono text-xs sm:text-sm text-white/40 tracking-[0.35em] uppercase font-bold">
              Fullstack Developer
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 max-w-xl">
            {personal.stack.map((tech, i) => (
              <span key={tech} className="flex items-center">
                <span className="text-white/60 hover:text-white transition-colors duration-150 font-mono text-xs sm:text-sm font-medium">
                  {tech}
                </span>
                {i < personal.stack.length - 1 && (
                  <span className="text-white/15 mx-2.5 text-xs select-none">
                    •
                  </span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tagline miêu tả mục tiêu */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-sm sm:text-base md:text-lg text-white/45 max-w-xl leading-relaxed font-sans"
        >
          {personal.tagline}
        </motion.p>

        {/* Cụm Action Buttons (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <MagneticButton
            href="#projects"
            variant="primary"
            size="lg"
            id="hero-view-projects"
          >
            <ArrowRight className="w-4 h-4" />
            View Projects
          </MagneticButton>

          <MagneticButton
            href={personal.cvUrl}
            variant="secondary"
            size="lg"
            download
            id="hero-download-cv"
          >
            <Download className="w-4 h-4" />
            Download CV
          </MagneticButton>

          <MagneticButton
            href={personal.github}
            variant="ghost"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-github"
          >
            <Github className="w-4 h-4" />
            GitHub
          </MagneticButton>
        </motion.div>

        {/* Bottom Scroll Indicator Detail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 select-none"
        >
          <span className="font-mono text-[9px] font-bold text-white/20 tracking-[0.2em] uppercase">
            Scroll
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
