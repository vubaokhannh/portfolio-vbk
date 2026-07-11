"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { personal } from "@/data/personal";
import { Github, Linkedin, Mail, Facebook, ArrowUpRight } from "lucide-react";

const SOCIAL_LINKS = [
  {
    id: "contact-github",
    label: "GitHub",
    href: personal.github,
    icon: <Github className="w-5 h-5" />,
    color: "#FFFFFF",
    description: "See my code",
  },
  {
    id: "contact-linkedin",
    label: "LinkedIn",
    href: personal.linkedin,
    icon: <Linkedin className="w-5 h-5" />,
    color: "#0A66C2",
    description: "Let's connect",
  },
  {
    id: "contact-email",
    label: "Email",
    href: `mailto:${personal.email}`,
    icon: <Mail className="w-5 h-5" />,
    color: "#00D9FF",
    description: "Send a message",
  },
  {
    id: "contact-facebook",
    label: "Facebook",
    href: personal.facebook,
    icon: <Facebook className="w-5 h-5" />,
    color: "#1877F2",
    description: "Say hello",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,217,255,0.05) 0%, rgba(124,58,237,0.03) 50%, transparent 70%)",
        }}
      />

      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] animate-pulse" />
            <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
              Available for work
            </span>
          </motion.div>

          {/* Headline */}
          <SectionHeading
            title="Let's Bring Your Vision to Life"
            align="center"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl leading-relaxed"
          >
            Available for full-time opportunities, freelance projects and
            collaborations. Let&apos;s create something extraordinary.
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
          >
            {SOCIAL_LINKS.map((social, i) => (
              <motion.a
                key={social.id}
                id={social.id}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel={
                  social.label !== "Email" ? "noopener noreferrer" : undefined
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.07 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/[0.06] bg-[#0F1117]/80 backdrop-blur-sm hover:border-white/10 transition-all duration-300 cursor-pointer min-w-0"
                aria-label={`${social.label} — ${social.description}`}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${social.color}10, transparent)`,
                    border: `1px solid ${social.color}20`,
                  }}
                />

                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300"
                  style={{
                    backgroundColor: `${social.color}15`,
                    border: `1px solid ${social.color}25`,
                    color: social.color,
                  }}
                >
                  {social.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">
                    {social.label}
                  </p>
                  <p className="text-xs text-white/30">{social.description}</p>
                </div>
                <ArrowUpRight className="absolute top-3 right-3 w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <MagneticButton
              href={`mailto:${personal.email}`}
              variant="primary"
              size="lg"
              id="contact-email-primary"
            >
              <Mail className="w-4 h-4" />
              Send me an email
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
