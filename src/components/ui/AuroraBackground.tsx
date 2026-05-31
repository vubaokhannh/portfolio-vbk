"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";

interface AuroraBackgroundProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
}

export function AuroraBackground({
  className = "",
  intensity = "medium",
}: AuroraBackgroundProps) {
  const mouse = useMousePosition();

  const opacityMap = { low: 0.08, medium: 0.15, high: 0.25 };
  const opacity = opacityMap[intensity];

  return (
    <div className={`aurora-bg ${className}`} aria-hidden="true">
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Orb 1 — Cyan */}
      <motion.div
        className="aurora-orb"
        style={{
          width: "60vw",
          height: "60vw",
          background: "#00D9FF",
          opacity,
          top: "-20%",
          left: "-10%",
        }}
        animate={{
          x: mouse.normalizedX * 30,
          y: mouse.normalizedY * 30,
          scale: [1, 1.05, 1],
        }}
        transition={{
          x: { duration: 2, ease: "easeOut" },
          y: { duration: 2, ease: "easeOut" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Orb 2 — Violet */}
      <motion.div
        className="aurora-orb"
        style={{
          width: "50vw",
          height: "50vw",
          background: "#7C3AED",
          opacity,
          top: "30%",
          right: "-15%",
        }}
        animate={{
          x: -mouse.normalizedX * 20,
          y: -mouse.normalizedY * 20,
          scale: [1.05, 1, 1.05],
        }}
        transition={{
          x: { duration: 2.5, ease: "easeOut" },
          y: { duration: 2.5, ease: "easeOut" },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Orb 3 — Indigo */}
      <motion.div
        className="aurora-orb"
        style={{
          width: "40vw",
          height: "40vw",
          background: "#4F46E5",
          opacity: opacity * 0.7,
          bottom: "-10%",
          left: "30%",
        }}
        animate={{
          x: mouse.normalizedX * 15,
          y: -mouse.normalizedY * 15,
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          x: { duration: 3, ease: "easeOut" },
          y: { duration: 3, ease: "easeOut" },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(0, 217, 255, 0.04), transparent 60%)`,
        }}
      />
    </div>
  );
}
