"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

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
  // 3D tilt + cursor-following glare (framer-motion springs)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-7, 7]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(260px circle at ${gx} ${gy}, rgba(255,255,255,0.10), transparent 70%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hover) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl border border-white/[0.06] bg-[#0F1117]/80 backdrop-blur-xl",
        "transition-[border-color,box-shadow] duration-300",
        hover && "cursor-default",
        hover && glowMap[glowColor],
        gradient && "gradient-border",
        paddingMap[padding],
        className
      )}
      style={hover ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {hover && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
      )}
      {children}
    </motion.div>
  );
}
