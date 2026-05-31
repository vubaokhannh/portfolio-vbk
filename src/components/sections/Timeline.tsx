"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { timeline } from "@/data/timeline";

export default function Timeline() {
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
            start: "top 70%",
            end: "bottom 30%",
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
      id="timeline"
      className="relative section-padding overflow-hidden"
      aria-label="Experience timeline"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 0% 50%, rgba(79,70,229,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom">
        <SectionHeading
          eyebrow="Experience"
          title="My Journey"
          description="From first line of code to enterprise-grade systems."
          className="mb-16"
        />

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/[0.05]">
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

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className={`relative flex gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-6 w-4 h-4 rounded-full border-2 border-[#0F1117] z-10 flex-shrink-0"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}60` }}
                  />

                  {/* Card — positioned left or right */}
                  <div className={`ml-12 md:ml-0 ${isEven ? "md:mr-[calc(50%+24px)] md:text-right" : "md:ml-[calc(50%+24px)]"} flex-1`}>
                    <div
                      className="group relative rounded-xl border border-white/[0.06] bg-[#0F1117]/80 p-5 backdrop-blur-sm hover:border-white/10 transition-all duration-300"
                      style={{
                        ["--glow" as string]: item.color,
                      }}
                    >
                      <div className={`flex items-start gap-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="font-mono text-xs font-bold px-2 py-0.5 rounded-md"
                              style={{
                                color: item.color,
                                backgroundColor: `${item.color}15`,
                                border: `1px solid ${item.color}25`,
                              }}
                            >
                              {item.year}
                            </span>
                            <span
                              className="font-mono text-[10px] uppercase tracking-widest opacity-40"
                              style={{ color: item.color }}
                            >
                              {item.type}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-white/50 leading-relaxed">
                            {item.description}
                          </p>
                          <div className={`flex flex-wrap gap-1.5 mt-3 ${isEven ? "md:justify-end" : ""}`}>
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/[0.06] text-white/40"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${item.color}08, transparent)`,
                          border: `1px solid ${item.color}15`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
