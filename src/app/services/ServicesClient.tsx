"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesEn, servicesVi } from "@/data/services";
import { getServices } from "@/lib/data-fetchers";
import { useLanguage } from "@/hooks/useLanguage";
import type { ServiceItem } from "@/types";
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

export default function ServicesClient() {
  const { language, t } = useLanguage();
  const [servicesList, setServicesList] = useState<ServiceItem[]>(
    language === "en" ? servicesEn : servicesVi
  );
  const isVi = language === "vi";

  useEffect(() => {
    // Keep local static data in sync on language changes
    setServicesList(language === "en" ? servicesEn : servicesVi);

    getServices(language).then((data) => {
      setServicesList(data);
    });
  }, [language]);

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden select-none">
      {/* Background glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(0, 217, 255, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
              {isVi ? "Dịch vụ chuyên nghiệp" : "Professional Services"}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            {isVi ? "Dịch Vụ Của Tôi" : "What I Offer"}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed"
          >
            {isVi
              ? "Các giải pháp phát triển web hiệu năng cao, hiện đại và tối ưu hóa chuẩn SEO nhằm nâng tầm doanh nghiệp của bạn."
              : "High-performance, modern, and SEO-optimized web development services tailored to scale your business."}
          </motion.p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {servicesList.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.1 + 0.2,
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
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors group-hover/service:underline"
                  style={{ color: service.color }}
                >
                  {t("services.getStarted")}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/service:translate-x-0.5 group-hover/service:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 max-w-4xl mx-auto rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0F1117]/80 to-[#07080c]/80 backdrop-blur-xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Ambient glow inside CTA */}
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full opacity-10 blur-[80px]"
            style={{ backgroundColor: "#00D9FF" }}
          />
          <div
            className="absolute -left-20 -top-20 w-80 h-80 rounded-full opacity-10 blur-[80px]"
            style={{ backgroundColor: "#7C3AED" }}
          />

          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 relative z-10">
            {isVi ? "Bạn đang tìm kiếm một nhà phát triển đồng hành?" : "Looking for a development partner?"}
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto mb-8 relative z-10 leading-relaxed">
            {isVi
              ? "Hãy thảo luận về dự án tiếp theo của bạn. Tôi luôn sẵn sàng thiết kế và phát triển các sản phẩm đột phá."
              : "Let's collaborate on your next project. I am always open to discussing new ideas, designs, and high-performance development."}
          </p>
          <div className="relative z-10 flex justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] text-black font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02]"
              style={{ color: "#000" }}
            >
              {isVi ? "Bắt đầu ngay" : "Get in Touch"}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
