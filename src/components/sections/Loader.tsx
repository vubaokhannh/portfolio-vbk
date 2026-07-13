"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_SEQUENCE = [
  { text: "Initializing Services...", delay: 250 },
  { text: "Loading Projects...", delay: 650 },
  { text: "Compiling Skills...", delay: 1050 },
  { text: "Injecting Experiences...", delay: 1450 },
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState<"boot" | "ready" | "exit">("boot");

  useEffect(() => {
    // Progress bar animation
    const start = Date.now();
    const duration = 2000;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      // Eased progress
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Boot sequence lines
    BOOT_SEQUENCE.forEach((item, i) => {
      setTimeout(() => setCurrentLine(i + 1), item.delay);
    });

    // Show READY
    setTimeout(() => setPhase("ready"), 1700);

    // Exit
    setTimeout(() => {
      setPhase("exit");
      setTimeout(onComplete, 600);
    }, 2200);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Scanline */}
          <div className="loader-scanline" />

          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,217,255,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#00D9FF]/30" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#00D9FF]/30" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#00D9FF]/30" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#00D9FF]/30" />

          <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-lg px-8">
            {/* OS Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#00D9FF]"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-mono text-xs text-white/30 tracking-[0.3em] uppercase">
                  System v1.0.0
                </span>
              </div>
              {/* aria-hidden: loader is decorative, real h1 is in Hero section */}
              <p
                aria-hidden="true"
                className="font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight"
              >
                BOOTING{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #00D9FF, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  VUBAOKHANH.TECH
                </span>
              </p>
            </motion.div>

            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full rounded-xl border border-white/[0.08] bg-[#0F1117]/90 backdrop-blur overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-2 font-mono text-xs text-white/30">
                  vubaokhanh@portfolio ~ init
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-4 font-mono text-sm space-y-1 min-h-[120px]">
                <p className="text-white/40">
                  <span className="text-[#00D9FF]">$</span> ./boot --system vubaokhanh.tech
                </p>
                {BOOT_SEQUENCE.slice(0, currentLine).map((item, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/60"
                  >
                    <span className="text-[#28C840] mr-2">✓</span>
                    {item.text}
                  </motion.p>
                ))}
                {phase === "ready" && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[#00D9FF] font-bold mt-2"
                  >
                    <span className="mr-2">⚡</span>
                    SYSTEM READY
                  </motion.p>
                )}
                {phase === "boot" && currentLine < BOOT_SEQUENCE.length && (
                  <span className="inline-block w-2 h-4 bg-[#00D9FF] animate-blink ml-1 align-middle" />
                )}
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs text-white/30">
                  Initializing...
                </span>
                <span className="font-mono text-xs text-[#00D9FF]">
                  {progress}%
                </span>
              </div>
              <div className="h-px w-full bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #4F46E5, #7C3AED, #00D9FF)",
                    width: `${progress}%`,
                    boxShadow: "0 0 10px rgba(0,217,255,0.5)",
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
