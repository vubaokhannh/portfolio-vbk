"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { githubStats } from "@/data/orbit";
import { GitBranch, Star, BookOpen, Flame } from "lucide-react";

// Generate a fake contribution grid (52 weeks x 7 days)
function generateContributions(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      // Weighted random to look realistic
      const r = Math.random();
      if (r < 0.3) days.push(0);
      else if (r < 0.55) days.push(1);
      else if (r < 0.75) days.push(2);
      else if (r < 0.9) days.push(3);
      else days.push(4);
    }
    weeks.push(days);
  }
  return weeks;
}

const contributions = generateContributions();

const INTENSITY_COLORS = [
  "bg-white/[0.04]",         // 0
  "bg-[#4F46E5]/40",         // 1
  "bg-[#7C3AED]/60",         // 2
  "bg-[#7C3AED]/80",         // 3
  "bg-[#00D9FF]",            // 4
];

const stats = [
  {
    icon: <Flame className="w-5 h-5 text-[#FF6B35]" />,
    label: "Current Streak",
    value: `${githubStats.currentStreak} days`,
    color: "#FF6B35",
  },
  {
    icon: <GitBranch className="w-5 h-5 text-[#00D9FF]" />,
    label: "Total Contributions",
    value: `${githubStats.totalContributions}`,
    color: "#00D9FF",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-[#7C3AED]" />,
    label: "Repositories",
    value: `${githubStats.totalRepos}`,
    color: "#7C3AED",
  },
  {
    icon: <Star className="w-5 h-5 text-[#F59E0B]" />,
    label: "Total Stars",
    value: `${githubStats.totalStars}`,
    color: "#F59E0B",
  },
];

export default function GithubActivity() {
  return (
    <section
      id="github"
      className="relative section-padding overflow-hidden"
      aria-label="GitHub activity section"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 100%, rgba(0,217,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom">
        <SectionHeading
          eyebrow="GitHub"
          title="Open Source Activity"
          description="Consistent shipping, constant learning — one commit at a time."
          className="mb-16"
        />

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-xl border border-white/[0.06] bg-[#0F1117]/80 p-5 backdrop-blur-sm hover:border-white/10 transition-all duration-300 text-center min-w-0"
            >
              <div className="flex flex-col items-center gap-2">
                {stat.icon}
                <motion.p
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="text-2xl font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-white/40 font-mono">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-white/[0.06] bg-[#0F1117]/80 backdrop-blur-xl p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Contribution Graph</h3>
            <span className="font-mono text-xs text-white/30">Last 12 months</span>
          </div>

          <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-max">
              {contributions.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((intensity, di) => (
                    <motion.div
                      key={di}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: wi * 0.01 + di * 0.005,
                      }}
                      whileHover={{ scale: 1.5 }}
                      className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-transform ${INTENSITY_COLORS[intensity]}`}
                      title={`${intensity} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-xs text-white/25 font-mono">Less</span>
            {INTENSITY_COLORS.map((color, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${color}`} />
            ))}
            <span className="text-xs text-white/25 font-mono">More</span>
          </div>

          {/* Languages */}
          <div className="mt-6 pt-6 border-t border-white/[0.05]">
            <p className="text-xs font-mono text-white/30 mb-3 uppercase tracking-widest">
              Top Languages
            </p>
            <div className="flex flex-col gap-2.5">
              {githubStats.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-3">
                  <span className="text-xs text-white/50 w-20 font-mono shrink-0">
                    {lang.name}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs text-white/30 font-mono w-8 shrink-0">
                    {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-80 h-40 blur-3xl opacity-5 pointer-events-none"
            style={{ background: "linear-gradient(135deg, #00D9FF, #7C3AED)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
