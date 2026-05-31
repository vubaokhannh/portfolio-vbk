import { Variants } from "framer-motion";

// ─── Fade In ──────────────────────────────────────────────
export const fadeIn = (
  direction: "up" | "down" | "left" | "right" = "up",
  delay: number = 0
): Variants => ({
  initial: {
    opacity: 0,
    y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
    x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
});

// ─── Stagger Container ────────────────────────────────────
export const staggerContainer = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// ─── Text Reveal (word by word) ───────────────────────────
export const textReveal: Variants = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Scale In ─────────────────────────────────────────────
export const scaleIn = (delay: number = 0): Variants => ({
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] },
  },
});

// ─── Card Hover ───────────────────────────────────────────
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -6,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// ─── Glow Pulse ───────────────────────────────────────────
export const glowPulse: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

// ─── Float ────────────────────────────────────────────────
export const floatAnimation = (delay: number = 0): Variants => ({
  initial: { y: 0 },
  animate: {
    y: [-8, 8, -8],
    transition: {
      duration: 4 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

// ─── Loader Bar ───────────────────────────────────────────
export const loaderBar: Variants = {
  initial: { width: "0%" },
  animate: {
    width: "100%",
    transition: { duration: 1.8, ease: [0.87, 0, 0.13, 1] },
  },
};

// ─── Slide Up Reveal ─────────────────────────────────────
export const slideUpReveal: Variants = {
  initial: { y: "100%" },
  animate: {
    y: "0%",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

// ─── Orbit Rotation ──────────────────────────────────────
export const orbitRotate = (duration: number): Variants => ({
  animate: {
    rotate: 360,
    transition: { duration, repeat: Infinity, ease: "linear" },
  },
});

// ─── Counter Reveal ──────────────────────────────────────
export const counterReveal: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};
