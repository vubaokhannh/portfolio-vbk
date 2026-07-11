"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleNavClick(href: string) {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[60] origin-left"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #4F46E5, #7C3AED, #00D9FF)",
          boxShadow: "0 0 8px rgba(0,217,255,0.5)",
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={cn(
          "fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4",
          "transition-all duration-300",
        )}
        aria-label="Main navigation"
      >
        <div
          className={cn(
            "flex items-center justify-between px-5 py-3 rounded-2xl border transition-all duration-300",
            scrolled
              ? "bg-[#0F1117]/90 border-white/[0.08] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent border-transparent",
          )}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-2"
            aria-label="Go to top"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] flex items-center justify-center">
              <span className="text-xs font-black text-black">K</span>
            </div>
            <span className="font-mono font-bold text-sm text-white/80">
              VUBAOKHANH<span className="text-[#00D9FF]">.TECH</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.05] transition-all duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#00D9FF]/10 border border-[#00D9FF]/20 text-[#00D9FF] hover:bg-[#00D9FF]/20 transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl border border-white/[0.08] bg-[#0F1117]/95 backdrop-blur-xl p-3 flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/[0.05] transition-all duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-white/[0.05] mt-2 pt-2">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#contact");
                  }}
                  className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-medium bg-[#00D9FF]/10 border border-[#00D9FF]/20 text-[#00D9FF]"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
