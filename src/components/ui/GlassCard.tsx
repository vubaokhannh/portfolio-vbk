"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "indigo" | "none";
  hover?: boolean;
  gradient?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const glowMap = {
  none: "",
  cyan: "hover:border-[rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.15)]",
  violet:
    "hover:border-[rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]",
  indigo:
    "hover:border-[rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.15)]",
};

export function GlassCard({
  children,
  className,
  glowColor = "cyan",
  hover = true,
  gradient = false,
  padding = "md",
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl border border-white/[0.06] bg-[#0F1117]/80 backdrop-blur-xl",
        "transition-all duration-300",
        hover && "cursor-default",
        hover && glowMap[glowColor],
        gradient && "gradient-border",
        paddingMap[padding],
        className
      )}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
