"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  variant?: "word" | "char" | "line";
  delay?: number;
  once?: boolean;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function AnimatedText({
  text,
  className,
  variant = "word",
  delay = 0,
  once = true,
  tag: Tag = "p",
}: AnimatedTextProps) {
  if (variant === "word") {
    const words = text.split(" ");

    return (
      <Tag className={cn("flex flex-wrap gap-[0.25em]", className)}>
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once }}
              transition={{
                duration: 0.6,
                delay: delay + i * 0.06,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  if (variant === "char") {
    const chars = text.split("");

    return (
      <Tag className={cn("flex flex-wrap", className)}>
        {chars.map((char, i) => (
          <span key={i} className="overflow-hidden inline-block">
            <motion.span
              className="inline-block"
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once }}
              transition={{
                duration: 0.5,
                delay: delay + i * 0.025,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  // Line variant
  return (
    <span className="overflow-hidden inline-block">
      <motion.span
        className={cn("inline-block", className)}
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.76, 0, 0.24, 1],
        }}
        tag-name={Tag}
      >
        {text}
      </motion.span>
    </span>
  );
}

// Section heading component
interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] w-fit"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
          <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
            {eyebrow}
          </span>
        </motion.div>
      )}

      <AnimatedText
        text={title}
        tag="h2"
        variant="word"
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-main"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-lg max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
