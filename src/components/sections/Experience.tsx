"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { experience } from "@/data/experience";
import { GitCommit, Terminal } from "lucide-react";

export default function Experience() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: typeof import("gsap") | null = null;
    let ScrollTrigger: unknown = null;

    async function initGSAP() {
      const gsapModule = await import("gsap");
      const { ScrollTrigger: ST } = await import("gsap/ScrollTrigger");
      gsap = gsapModule;
      gsapModule.default.registerPlugin(ST);
      ScrollTrigger = ST;

      if (!lineRef.current || !containerRef.current) return;

      gsapModule.default.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1,
          },
        }
      );
    }

    initGSAP();

    return () => {
      if (ScrollTrigger) {
        (ScrollTrigger as { getAll: () => { kill: () => void }[] })
          .getAll()
          .forEach((t) => t.kill());
      }
    };
  }, []);

  return (
    <section
      id="experience"
      className="relative section-padding overflow-hidden"
      aria-label="Work experience"
    >
      {/* Background radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,70,229,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom">
        <SectionHeading
          eyebrow="Journey"
          title="Work Experience"
          description="A summary of my professional development and engineer positions."
          align="center"
          className="mb-16"
        />

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Vertical track line (Git main branch) */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/[0.05] md:-translate-x-1/2">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 right-0 bottom-0"
              style={{
                background:
                  "linear-gradient(to bottom, #4F46E5, #7C3AED, #00D9FF)",
                boxShadow: "0 0 10px rgba(0,217,255,0.3)",
                transformOrigin: "top",
              }}
            />
          </div>

          <div className="flex flex-col gap-12 select-none">
            {experience.map((item, i) => {
              const isEven = i % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex gap-6 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } items-start`}
                >
                  {/* Horizontal Connector Line (desktop only) */}
                  <div
                    className="hidden md:block absolute top-[27px] h-[1.5px] w-[24px] z-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(${isEven ? "to left" : "to right"}, ${item.color}, transparent)`,
                      right: isEven ? "50%" : "auto",
                      left: isEven ? "auto" : "50%",
                      opacity: hoveredCard === item.id ? 0.6 : 0.15,
                    }}
                  />

                  {/* Node icon wrapper (Git Commit Node) */}
                  <div
                    className="absolute left-[19px] md:left-1/2 top-2 -translate-x-1/2 z-10 flex items-center justify-center rounded-full border-2 border-[#0F1117] transition-all duration-300"
                    style={{
                      width: 38,
                      height: 38,
                      backgroundColor: "#0F1117",
                      borderColor: item.color,
                      boxShadow: hoveredCard === item.id
                        ? `0 0 15px ${item.color}, inset 0 0 8px ${item.color}30`
                        : `0 0 12px ${item.color}30`,
                      transform: hoveredCard === item.id ? "translate(-50%) scale(1.1)" : "translate(-50%) scale(1)",
                    }}
                  >
                    <GitCommit
                      className="w-4 h-4 transition-transform duration-300 animate-pulse"
                      style={{
                        color: item.color,
                        transform: hoveredCard === item.id ? "scale(1.1)" : "scale(1)",
                      }}
                    />

                    {/* Double Pulsing rings */}
                    <span
                      className="absolute inset-0 rounded-full animate-ping opacity-15 pointer-events-none"
                      style={{
                        backgroundColor: item.color,
                        animationDuration: "3s",
                      }}
                    />
                    <span
                      className="absolute inset-[-6px] rounded-full animate-pulse opacity-10 pointer-events-none"
                      style={{
                        border: `1px solid ${item.color}`,
                        animationDuration: "2s",
                      }}
                    />
                  </div>

                  {/* Info Card Container */}
                  <div
                    className={`ml-12 md:ml-0 flex-1 ${isEven
                        ? "md:mr-[calc(50%+24px)] md:text-right"
                        : "md:ml-[calc(50%+24px)] md:text-left"
                      }`}
                  >
                    {/* Card Element (IDE Git Terminal Window) */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onMouseEnter={() => setHoveredCard(item.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      whileHover={{ y: -2 }}
                      className={`relative rounded-2xl border bg-[#0F1117]/90 backdrop-blur-xl transition-all duration-300 overflow-hidden ${isEven
                          ? "border-l-[3px] md:border-l-transparent md:border-r-[3px]"
                          : "border-l-[3px]"
                        }`}
                      style={{
                        borderColor: item.color,
                        boxShadow: hoveredCard === item.id ? `0 10px 30px ${item.color}08` : "0 4px 20px rgba(0,0,0,0.2)",
                      }}
                    >
                      {/* Window Header */}
                      <div className="flex items-center justify-between px-4 py-2 bg-[#0A0C10]/80 border-b border-white/[0.04] font-mono text-[9px] text-white/30 select-none">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/50" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
                          <span className="w-2 h-2 rounded-full bg-green-500/50" />
                        </div>

                      </div>

                      {/* Terminal Code Content */}
                      <div className="p-5 font-mono text-[11px] md:text-xs text-white/85 leading-relaxed text-left select-text">
                        {/* Date/Duration line */}
                        <div className="text-white/50 mb-3">
                          Date:   <span className="text-white/80 font-bold">{item.duration}</span>
                        </div>

                        {/* Company & Role */}
                        <div className="pl-3.5 border-l-2 border-white/10 mb-4 space-y-1 select-text">
                          <div className="text-white/50 text-xs font-mono">
                            Company:  <span className="text-white font-bold font-sans text-sm tracking-wide">{item.company}</span>
                          </div>
                          <div className="text-white/50 text-xs font-mono">
                            Position: <span className="font-bold text-xs" style={{ color: item.color }}>{item.role}</span>
                          </div>
                        </div>

                        {/* Description message (indented like commit body) */}
                        <div className="pl-3.5 text-white/60 font-sans text-xs leading-relaxed font-medium mb-5 whitespace-pre-line select-text">
                          {item.description}
                        </div>

                        {/* Diff Divider */}
                        <div className="text-white/20 border-t border-white/[0.04] pt-3.5 mt-2 text-[10px] tracking-wider uppercase font-bold select-none">
                          diff --git a/stack b/stack
                        </div>

                        {/* Technology tags styled as git diff additions (+ green) */}
                        <div className="flex flex-wrap gap-1.5 mt-2 select-none">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                            >
                              + {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
