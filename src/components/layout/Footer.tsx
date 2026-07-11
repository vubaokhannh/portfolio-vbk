"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import { Github, Linkedin, Mail, Facebook, ArrowUp } from "lucide-react";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    icon: <Github className="w-4 h-4" />,
    href: personal.github,
    label: "GitHub",
  },
  {
    icon: <Linkedin className="w-4 h-4" />,
    href: personal.linkedin,
    label: "LinkedIn",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    href: `mailto:${personal.email}`,
    label: "Email",
  },
  {
    icon: <Facebook className="w-4 h-4" />,
    href: personal.facebook,
    label: "Facebook",
  },
];

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      className="relative border-t border-white/[0.05] bg-[#050505]"
      role="contentinfo"
    >
      {/* Top divider glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #00D9FF40, transparent)",
        }}
      />

      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] flex items-center justify-center">
                <span className="text-xs font-black text-black">K</span>
              </div>
              <span className="font-mono font-bold text-sm text-white/80">
                VUBAOKHANH<span className="text-[#00D9FF]">.TECH</span>
              </span>
            </div>
            <p className="text-xs text-white/30 max-w-xs font-mono">
              {personal.role} · {personal.location}
            </p>
            <p className="text-xs text-white/20">{personal.tagline}</p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Social + Back to top */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={
                  social.label !== "Email" ? "noopener noreferrer" : undefined
                }
                aria-label={social.label}
                className="w-9 h-9 rounded-xl border border-white/[0.06] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white hover:border-white/10 hover:bg-white/[0.06] transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl border border-[#00D9FF]/20 bg-[#00D9FF]/10 flex items-center justify-center text-[#00D9FF] hover:bg-[#00D9FF]/20 transition-all duration-200"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-8 pt-6 border-t border-white/[0.04]">
          <p className="text-xs text-white/20 font-mono">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/15 font-mono">
            Built with Next.js · TypeScript · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
