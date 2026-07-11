"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { services } from "@/data/services";
import { Globe, ShoppingBag, Layers, Zap, ArrowUpRight } from "lucide-react";

function ServiceIcon({ icon, color }: { icon: string; color: string }) {
  const classes = "w-6 h-6 transition-transform duration-300 group-hover/service:scale-110";

  switch (icon) {
    case "globe":
      return <Globe className={classes} style={{ color }} />;
    case "shopping-bag":
      return <ShoppingBag className={classes} style={{ color }} />;
    case "layers":
      return <Layers className={classes} style={{ color }} />;
    case "zap":
      return <Zap className={classes} style={{ color }} />;
    default:
      return <Globe className={classes} style={{ color }} />;
  }
}

export default function Services() {
  function handleContactClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="services"
      className="relative section-padding overflow-hidden"
      aria-label="Services section"
    >
      {/* Background ambient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(79,70,229,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom">
        <SectionHeading
          eyebrow="Services"
          title="What I Offer"
          description="High-performance, modern, and SEO-optimized web development services tailored to scale your business."
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -6 }}
              className="group/service relative rounded-2xl border border-white/[0.06] bg-[#0F1117]/80 backdrop-blur-xl p-6 overflow-hidden cursor-default flex flex-col justify-between min-h-[380px] transition-all duration-300"
            >
              {/* Radial gradient hover glow background */}
              <div
                className="absolute inset-0 opacity-0 group-hover/service:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle 120px at 50% 0px, ${service.color}0c, transparent 100%)`,
                }}
              />
              {/* Hover border glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover/service:opacity-100 transition-opacity duration-500 rounded-2xl border pointer-events-none"
                style={{ borderColor: `${service.color}25` }}
              />

              <div className="relative z-10 flex flex-col gap-5">
                {/* Icon box */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/service:scale-105"
                  style={{
                    backgroundColor: `${service.color}12`,
                    border: `1px solid ${service.color}25`,
                    boxShadow: `0 0 15px ${service.color}0a`,
                  }}
                >
                  <ServiceIcon icon={service.icon} color={service.color} />
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg tracking-wide group-hover/service:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Tags & Action CTA */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.04] space-y-4">
                {/* Tech/feature tags */}
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono border"
                      style={{
                        borderColor: `${service.color}15`,
                        color: `${service.color}90`,
                        backgroundColor: `${service.color}05`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Get started link */}
                <a
                  href="#contact"
                  onClick={handleContactClick}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors group-hover/service:underline"
                  style={{ color: service.color }}
                >
                  Get Started
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/service:translate-x-0.5 group-hover/service:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
