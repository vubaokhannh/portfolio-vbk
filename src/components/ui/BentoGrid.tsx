"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-[minmax(160px,auto)]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  glowColor?: "cyan" | "violet" | "indigo";
  delay?: number;
}

const colSpanMap = {
  1: "col-span-1 md:col-span-3 lg:col-span-4",
  2: "col-span-1 md:col-span-6 lg:col-span-8",
  3: "col-span-1 md:col-span-6 lg:col-span-12",
};

const rowSpanMap = {
  1: "",
  2: "row-span-2",
};

const glowHoverMap = {
  cyan: "group-hover:shadow-[0_0_40px_rgba(0,217,255,0.15)] group-hover:border-[rgba(0,217,255,0.25)]",
  violet:
    "group-hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] group-hover:border-[rgba(124,58,237,0.25)]",
  indigo:
    "group-hover:shadow-[0_0_40px_rgba(79,70,229,0.15)] group-hover:border-[rgba(79,70,229,0.25)]",
};

export function BentoItem({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  glowColor = "cyan",
  delay = 0,
}: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "group min-w-0",
        colSpanMap[colSpan],
        rowSpanMap[rowSpan]
      )}
    >
      <div
        className={cn(
          "h-full relative rounded-2xl border border-white/[0.06] bg-[#0F1117]/80",
          "backdrop-blur-xl p-6 overflow-hidden",
          "transition-all duration-300",
          glowHoverMap[glowColor],
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}
