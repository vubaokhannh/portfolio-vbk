"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { personal } from "@/data/personal";
import {
  Calendar,
  Package,
  Cpu,
  MapPin,
  Mail,
  Download,
  Terminal,
  FileText,
  Code2,
} from "lucide-react";

interface TechItem {
  name: string;
  color: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

const techCategories: TechCategory[] = [
  {
    title: "Backend & Core",
    items: [
      { name: "Laravel", color: "#FF2D20" },
      { name: "Node.js", color: "#339933" },
      { name: "MySQL", color: "#00758F" },
      { name: "Filament", color: "#F59E0B" },
    ],
  },
  {
    title: "Frontend & UI",
    items: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#38BDF8" },
    ],
  },
  {
    title: "DevOps & Workflow",
    items: [
      { name: "Docker", color: "#2496ED" },
    ],
  },
];

type TabType = "profile" | "status" | "stack";

export default function About() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
          {/* Left Column: Typography & Quick Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-5 text-left">
              <div className="flex items-center gap-3">
                {/* Available for work badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Available for work
                </div>
                
                <span className="font-mono text-xs text-white/40 tracking-widest uppercase">
                  Introduction
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                  Hi, I&apos;m <span className="text-gradient-cyan">{personal.name}</span>
                </h3>
                <p className="text-base font-mono text-cyan-400/80 font-semibold uppercase tracking-wider">
                  {personal.role}
                </p>
                <p className="text-white/70 leading-relaxed text-sm md:text-base mt-2 font-medium">
                  {personal.bio}
                </p>
              </div>

              {personal.cvUrl && (
                <a
                  href={personal.cvUrl}
                  download
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold px-4 py-2.5 rounded-xl border border-white/[0.08] hover:border-cyan-500/30 bg-white/[0.02] hover:bg-cyan-500/5 text-white/70 hover:text-white transition-all duration-300 w-fit mt-2"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-auto">
              {personal.stats.map((stat, i) => {
                const colors = ["#00D9FF", "#7C3AED", "#4F46E5"];
                const icons = [
                  <Calendar className="w-4 h-4" key="cal" />,
                  <Package className="w-4 h-4" key="pkg" />,
                  <Cpu className="w-4 h-4" key="cpu" />,
                ];
                return (
                  <div
                    key={stat.id}
                    className="relative rounded-2xl border border-white/[0.05] bg-white/[0.01] p-4 flex flex-col gap-3 group/stat overflow-hidden"
                    style={{
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                  >
                    {/* Top colored line indicator */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                      style={{ backgroundColor: colors[i] }}
                    />
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/stat:scale-105"
                      style={{
                        backgroundColor: `${colors[i]}10`,
                        border: `1px solid ${colors[i]}20`,
                        color: colors[i],
                      }}
                    >
                      {icons[i]}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-xl md:text-2xl font-black tracking-tight text-white font-mono" style={{ color: colors[i] }}>
                          {stat.value}
                        </span>
                        <span className="text-xs font-bold text-white/50" style={{ color: colors[i] }}>
                          {stat.suffix}
                        </span>
                      </div>
                      <p className="text-[10px] md:text-xs text-white/40 font-medium leading-tight">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Dashboard Monitor */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-full relative rounded-2xl border border-white/[0.08] bg-[#0F1117]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col min-h-[360px]">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0A0C10]/80 border-b border-white/[0.05] select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                
                {/* Tab buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                      activeTab === "profile"
                        ? "text-cyan-400 bg-white/[0.03] border border-white/[0.05]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.01]"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    profile.json
                  </button>
                  <button
                    onClick={() => setActiveTab("status")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                      activeTab === "status"
                        ? "text-violet-400 bg-white/[0.03] border border-white/[0.05]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.01]"
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    status.log
                  </button>
                  <button
                    onClick={() => setActiveTab("stack")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                      activeTab === "stack"
                        ? "text-indigo-400 bg-white/[0.03] border border-white/[0.05]"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.01]"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    stack.sh
                  </button>
                </div>
                
                <div className="hidden sm:block text-[10px] text-white/20 font-mono">
                  vubaokhanh.tech
                </div>
              </div>

              {/* Tab Content Display */}
              <div className="flex-grow p-5 relative overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeTab === "profile" && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <pre className="font-mono text-xs leading-relaxed text-white/80 overflow-x-auto select-text">
                        <code>
                          {"{\n"}
                          {"  "}
                          <span className="text-[#9CDCFE]">&quot;name&quot;</span>: <span className="text-[#CE9178]">&quot;Vu Bao Khanh&quot;</span>,{"\n"}
                          {"  "}
                          <span className="text-[#9CDCFE]">&quot;role&quot;</span>: <span className="text-[#CE9178]">&quot;Fullstack Developer&quot;</span>,{"\n"}
                          {"  "}
                          <span className="text-[#9CDCFE]">&quot;location&quot;</span>: <span className="text-[#CE9178]">&quot;Vietnam&quot;</span>,{"\n"}
                          {"  "}
                          <span className="text-[#9CDCFE]">&quot;specialties&quot;</span>: [{"\n"}
                          {"    "}
                          <span className="text-[#CE9178]">&quot;Backend Architecture&quot;</span>,{"\n"}
                          {"    "}
                          <span className="text-[#CE9178]">&quot;API Development&quot;</span>,{"\n"}
                          {"    "}
                          <span className="text-[#CE9178]">&quot;Frontend UIs&quot;</span>{"\n"}
                          {"  "}],{"\n"}
                          {"  "}
                          <span className="text-[#9CDCFE]">&quot;traits&quot;</span>: [{"\n"}
                          {"    "}
                          <span className="text-[#CE9178]">&quot;Scalability-focused&quot;</span>,{"\n"}
                          {"    "}
                          <span className="text-[#CE9178]">&quot;Clean-code enthusiast&quot;</span>,{"\n"}
                          {"    "}
                          <span className="text-[#CE9178]">&quot;Continuous Learner&quot;</span>{"\n"}
                          {"  "}]{"\n"}
                          {"}"}
                        </code>
                      </pre>
                    </motion.div>
                  )}

                  {activeTab === "status" && (
                    <motion.div
                      key="status"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="h-full flex flex-col gap-4 justify-center"
                    >
                      <div className="font-mono text-xs space-y-3.5 select-text">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">[OK]</span>
                          <span className="text-white/40">Initializing diagnostic monitor...</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">[OK]</span>
                          <span className="text-white/80 font-bold">Host:</span>
                          <span className="text-cyan-400 font-semibold">vubaokhanh.tech</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">[OK]</span>
                          <span className="text-white/80 font-bold">Location:</span>
                          <span className="text-white/60">Vietnam (UTC+7)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">[OK]</span>
                          <span className="text-white/80 font-bold">Status:</span>
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px] tracking-wide uppercase">
                            Available for work
                          </span>
                        </div>
                        
                        {/* Learning Focus Progress Section */}
                        <div className="space-y-1.5 pt-2 border-t border-white/[0.05]">
                          <div className="flex items-center gap-2">
                            <span className="text-violet-400 font-bold">[ACTIVE]</span>
                            <span className="text-white/80 font-bold">Learning Focus:</span>
                            <span className="text-violet-400 font-semibold">Node.js &amp; Architecture</span>
                          </div>
                          <div className="space-y-1 pl-6">
                            <div className="flex items-center justify-between text-[10px] text-white/40">
                              <span>PROGRESS</span>
                              <span className="text-violet-400 font-bold">75%</span>
                            </div>
                            <div className="h-2 w-full bg-white/[0.03] border border-white/[0.05] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "75%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.05]">
                          <span className="text-emerald-400 font-bold">[OK]</span>
                          <span className="text-white/80 font-bold">Contact Email:</span>
                          <a
                            href={`mailto:${personal.email}`}
                            className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors"
                          >
                            {personal.email}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "stack" && (
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <div className="space-y-4 font-mono select-none">
                        {techCategories.map((cat) => (
                          <div key={cat.title} className="space-y-2">
                            <h5 className="text-[10px] text-white/30 uppercase tracking-widest">
                              {cat.title}
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {cat.items.map((tech) => (
                                <motion.div
                                  key={tech.name}
                                  whileHover={{ y: -1, scale: 1.03 }}
                                  className="px-3 py-1.5 rounded-lg border text-xs font-medium cursor-default transition-all duration-300 flex items-center gap-2"
                                  style={{
                                    backgroundColor:
                                      hoveredTech === tech.name
                                        ? `${tech.color}08`
                                        : "rgba(255,255,255,0.02)",
                                    borderColor:
                                      hoveredTech === tech.name
                                        ? `${tech.color}40`
                                        : "rgba(255,255,255,0.05)",
                                    color:
                                      hoveredTech === tech.name
                                        ? "#ffffff"
                                        : "rgba(255,255,255,0.7)",
                                    boxShadow:
                                      hoveredTech === tech.name
                                        ? `0 0 15px ${tech.color}10`
                                        : "none",
                                  }}
                                  onMouseEnter={() => setHoveredTech(tech.name)}
                                  onMouseLeave={() => setHoveredTech(null)}
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{
                                      backgroundColor: tech.color,
                                      boxShadow: `0 0 6px ${tech.color}`,
                                    }}
                                  />
                                  {tech.name}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
