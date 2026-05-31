"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { focusItems } from "@/data/focus";
import { Target } from "lucide-react";

export default function CurrentFocus() {
  return (
    <section
      id="focus"
      className="relative section-padding overflow-hidden"
      aria-label="Current focus section"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom">
        <SectionHeading
          eyebrow="Current Focus"
          title="What I'm Building Now"
          description="Actively learning and building — always pushing the boundaries of what I can create."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {focusItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-[#0F1117]/80 backdrop-blur-xl p-6 overflow-hidden cursor-default min-w-0"
              style={{
                "--glow-color": item.color,
              } as React.CSSProperties}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${item.color}10, transparent 70%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl border"
                style={{ borderColor: `${item.color}25` }}
              />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                      style={{
                        backgroundColor: `${item.color}15`,
                        border: `1px solid ${item.color}25`,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Target className="w-3 h-3" style={{ color: item.color }} />
                        <span
                          className="font-mono text-xs"
                          style={{ color: item.color }}
                        >
                          {item.progress}% progress
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Progress bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="h-1 w-full rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-xs font-mono border"
                      style={{
                        borderColor: `${item.color}20`,
                        color: `${item.color}90`,
                        backgroundColor: `${item.color}08`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
