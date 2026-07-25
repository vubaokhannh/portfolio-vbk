"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  target?: string;
  rel?: string;
  download?: boolean | string;
  id?: string;
}

const variantClasses = {
  primary:
    "bg-[#00D9FF] text-black font-semibold hover:bg-[#00c4e8] shadow-[0_0_30px_rgba(0,217,255,0.3)]",
  secondary:
    "bg-white/[0.06] text-white border border-white/10 hover:bg-white/10 hover:border-white/20",
  ghost: "text-white/70 hover:text-white hover:bg-white/[0.05]",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-sm gap-2.5",
  lg: "px-8 py-4 text-base gap-3",
};

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  href,
  onClick,
  variant = "primary",
  size = "md",
  target,
  rel,
  download,
  id,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) * strength;
      const y = (e.clientY - centerY) * strength;
      setPosition({ x, y });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const baseClass = cn(
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-colors duration-200 cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="magnetic-btn mt-4"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          download={download}
          id={id}
          className={baseClass}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <button id={id} className={baseClass} onClick={onClick} type="button">
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
