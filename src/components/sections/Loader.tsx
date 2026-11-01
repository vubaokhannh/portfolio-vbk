"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { isLoaderCompleted, setLoaderCompleted } from "@/lib/loaderState";

// Cycles quickly through greetings, then lands on the name.
const WORDS = [
  "Xin chào",
  "Hello",
  "你好",
  "こんにちは",
  "Bonjour",
  "안녕하세요",
  "Vu Bao Khanh",
];

const DURATION = 2200;
const WORD_INTERVAL = 270;

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  // Must be false on first render so client HTML matches the server's;
  // the effect below bails out immediately if the loader already ran.
  const [skip] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"boot" | "exit">("boot");

  useEffect(() => {
    // Only run loader once per session
    if (skip || isLoaderCompleted()) {
      setLoaderCompleted();
      onComplete();
      return;
    }

    let raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = Date.now();

    const tick = () => {
      const p = Math.min((Date.now() - start) / DURATION, 1);
      // ease-in-out so the counter feels weighty
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const interval = setInterval(() => {
      setWordIndex((i) => Math.min(i + 1, WORDS.length - 1));
    }, WORD_INTERVAL);

    timers.push(
      setTimeout(() => {
        setPhase("exit");
        timers.push(
          setTimeout(() => {
            setLoaderCompleted();
            onComplete();
          }, 900)
        );
      }, DURATION + 350)
    );

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [skip, onComplete]);

  if (skip) return null;

  const isFinalWord = wordIndex === WORDS.length - 1;

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-[#050505] text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading portfolio"
        >
          {/* Curved bottom edge that flattens as the panel slides away */}
          <svg
            className="absolute left-0 top-full w-full h-[10vw] pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              fill="#050505"
              initial={{ d: "M0 0 H100 Q50 100 0 0 Z" }}
              animate={{ d: "M0 0 H100 Q50 100 0 0 Z" }}
              exit={{ d: "M0 0 H100 Q50 0 0 0 Z" }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            />
          </svg>

          {/* Soft color wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(60% 50% at 15% 100%, rgba(0,217,255,0.12), transparent 70%), radial-gradient(50% 45% at 90% 0%, rgba(124,58,237,0.14), transparent 70%)",
            }}
          />

          {/* Top bar */}
          <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8 font-mono text-[11px] tracking-[0.3em] uppercase text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
              Portfolio
            </span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Greeting */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            {/* aria-hidden: loader is decorative, real h1 is in Hero section */}
            <p
              aria-hidden="true"
              key={wordIndex}
              className="flex items-center gap-4 font-bold tracking-tight text-4xl sm:text-6xl md:text-7xl"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25 }}
                className="w-3 h-3 md:w-4 md:h-4 rounded-full shrink-0"
                style={{ background: "linear-gradient(135deg, #00D9FF, #7C3AED)" }}
              />
              <span
                style={
                  isFinalWord
                    ? {
                        background: "linear-gradient(135deg, #00D9FF, #7C3AED)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }
                    : undefined
                }
              >
                {WORDS[wordIndex]}
              </span>
            </p>
          </div>

          {/* Bottom: giant counter + meta */}
          <div className="absolute bottom-0 inset-x-0 px-6 md:px-12 pb-8 md:pb-10 flex items-end justify-between gap-6">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-black leading-[0.8] tracking-tighter tabular-nums"
              style={{
                fontSize: "clamp(5rem, 18vw, 14rem)",
                background: "linear-gradient(180deg, #ffffff 20%, rgba(255,255,255,0.15) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {progress}
              <span className="text-[0.35em] align-top ml-1 tracking-normal">%</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:flex flex-col items-end gap-1 text-right font-mono text-[11px] tracking-[0.25em] uppercase text-white/40 pb-2"
            >
              <span className="text-white/70">Fullstack Developer</span>
              <span>Ho Chi Minh City, VN</span>
              <span>React · NestJS · PostgreSQL</span>
            </motion.div>
          </div>

          {/* Hairline progress */}
          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/[0.06]">
            <div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #4F46E5, #7C3AED, #00D9FF)",
                boxShadow: "0 0 14px rgba(0,217,255,0.6)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
