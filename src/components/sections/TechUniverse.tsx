"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { orbitTechs } from "@/data/orbit";
import type { OrbitTech } from "@/types";

// Import các Icon chất lượng cao đại diện cho bộ kỹ năng trong CV của bạn
import {
  SiNestjs,
  SiLaravel,
  SiTypescript,
  SiPhp,
  SiPostgresql,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiSocketdotio,
  SiInertia,
  SiNodedotjs,
  SiDocker,
  SiRedis,
  SiPrisma,
  SiFilament,
  SiTailwindcss,
  SiMantine,
  SiWordpress,
} from "react-icons/si";

const ORBIT_CONFIGS = {
  1: { radius: 120, duration: 18, size: 56 },
  2: { radius: 200, duration: 28, size: 48 },
  3: { radius: 275, duration: 38, size: 42 },
};

const ORBIT_COLORS = {
  1: { stroke: "rgba(0, 217, 255, 0.12)", glow: "rgba(0, 217, 255, 0.06)" },
  2: { stroke: "rgba(124, 58, 237, 0.10)", glow: "rgba(124, 58, 237, 0.05)" },
  3: { stroke: "rgba(79, 70, 229, 0.08)", glow: "rgba(79, 70, 229, 0.04)" },
};

/* ── Decorative stars scattered in the background ── */
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

/* ── Bộ ánh xạ chuỗi nhận diện sang SVG Component thực tế ── */
function TechIcon({ name }: { name: string }) {
  const classes =
    "w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-110";

  switch (name) {
    case "nestjs":
      return <SiNestjs className={`${classes} text-[#E0234E]`} />;
    case "laravel":
      return <SiLaravel className={`${classes} text-[#FF2D20]`} />;
    case "typescript":
      return <SiTypescript className={`${classes} text-[#3178C6]`} />;
    case "php":
      return <SiPhp className={`${classes} text-[#777BB4] p-1`} />;
    case "postgresql":
      return <SiPostgresql className={`${classes} text-[#4169E1]`} />;
    case "mysql":
      return <SiMysql className={`${classes} text-[#4479A1] p-1`} />;
    case "react":
      return (
        <SiReact
          className={`${classes} text-[#61DAFB] animate-[spin_20s_linear_infinite]`}
        />
      );
    case "nextjs":
      return (
        <SiNextdotjs
          className={`${classes} text-white bg-black rounded-full`}
        />
      );
    case "socketio":
      return <SiSocketdotio className={`${classes} text-white`} />;
    case "inertia":
      return <SiInertia className={`${classes} text-[#9553E8]`} />;
    case "nodejs":
      return <SiNodedotjs className={`${classes} text-[#339933]`} />;
    case "docker":
      return <SiDocker className={`${classes} text-[#2496ED]`} />;
    case "redis":
      return <SiRedis className={`${classes} text-[#DC382D]`} />;
    case "prisma":
      return <SiPrisma className={`${classes} text-white`} />;
    case "filament":
      return <SiFilament className={`${classes} text-[#F59E0B]`} />;
    case "tailwind":
      return <SiTailwindcss className={`${classes} text-[#06B6D4]`} />;
    case "mantine":
      return <SiMantine className={`${classes} text-[#339AF0]`} />;
    case "wordpress":
      return <SiWordpress className={`${classes} text-[#21759B]`} />;
    default:
      return <span className="text-xs font-mono text-white/40">DEV</span>;
  }
}

/* ── Individual orbiting tech item ── */
function OrbitItem({
  tech,
  index,
  totalInOrbit,
}: {
  tech: OrbitTech;
  index: number;
  totalInOrbit: number;
}) {
  const config = ORBIT_CONFIGS[tech.orbit];
  const angleOffset = (360 / totalInOrbit) * index;

  return (
    <div
      className="absolute"
      style={{
        width: config.radius * 2,
        height: config.radius * 2,
        top: "50%",
        left: "50%",
        marginTop: -config.radius,
        marginLeft: -config.radius,
        transform: `rotate(${angleOffset}deg)`,
      }}
    >
      {/* Thẻ chuyển động xoay quanh tâm quỹ đạo */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: config.duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Thẻ đặt vị trí phần tử lên đỉnh vòng tròn và triệt tiêu góc quay quỹ đạo */}
        <motion.div
          className="absolute"
          style={{
            top: 0,
            left: "50%",
            marginLeft: -config.size / 2,
            marginTop: -config.size / 2,
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: config.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Thẻ bọc nội dung nhằm triệt tiêu nốt góc nghiêng phân bổ (angleOffset) để chữ không bị lệch */}
          <motion.div
            whileHover={{ scale: 1.25 }}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
            style={{ transform: `rotate(${-angleOffset}deg)` }}
          >
            {/* Tech icon card */}
            <div
              className="relative flex items-center justify-center rounded-2xl border backdrop-blur-md font-mono font-bold transition-all duration-300 group-hover:shadow-lg"
              style={{
                width: config.size,
                height: config.size,
                backgroundColor: `${tech.color}12`,
                borderColor: `${tech.color}30`,
                boxShadow: `0 0 24px ${tech.color}15, inset 0 1px 0 ${tech.color}10`,
              }}
            >
              {/* Gọi component hiển thị SVG linh hoạt theo chuỗi định danh */}
              <TechIcon name={tech.icon} />

              {/* Subtle inner glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${tech.color}20, transparent 70%)`,
                }}
              />
            </div>

            {/* Tech name label */}
            <span
              className="font-mono font-semibold tracking-wide opacity-70 group-hover:opacity-100 transition-opacity duration-300 select-none"
              style={{
                fontSize: config.size === 56 ? 11 : 10,
                color: tech.color,
              }}
            >
              {tech.name}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── SVG Orbit Ring with dashed animated border ── */
function OrbitRing({
  radius,
  orbitLevel,
}: {
  radius: number;
  orbitLevel: 1 | 2 | 3;
}) {
  const colors = ORBIT_COLORS[orbitLevel];
  const circumference = 2 * Math.PI * radius;

  return (
    <svg
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        width: radius * 2 + 4,
        height: radius * 2 + 4,
        marginTop: -(radius + 2),
        marginLeft: -(radius + 2),
      }}
    >
      {/* Glow ring */}
      <circle
        cx={radius + 2}
        cy={radius + 2}
        r={radius}
        fill="none"
        stroke={colors.glow}
        strokeWidth={8}
      />
      {/* Dashed orbit line */}
      <motion.circle
        cx={radius + 2}
        cy={radius + 2}
        r={radius}
        fill="none"
        stroke={colors.stroke}
        strokeWidth={1}
        strokeDasharray={`${circumference * 0.03} ${circumference * 0.04}`}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60 + orbitLevel * 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}

export default function TechUniverse() {
  const orbit1 = orbitTechs.filter((t) => t.orbit === 1);
  const orbit2 = orbitTechs.filter((t) => t.orbit === 2);
  const orbit3 = orbitTechs.filter((t) => t.orbit === 3);

  return (
    <section
      id="universe"
      className="relative section-padding overflow-hidden bg-[#030307]"
      aria-label="Tech universe section"
    >
      {/* Deep space radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(79,70,229,0.06) 0%, rgba(0,217,255,0.02) 40%, transparent 70%)",
        }}
      />

      {/* Starfield particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {STARS.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container-custom">
        <SectionHeading
          eyebrow="Tech Universe"
          title="My Solar System"
          description="Technologies orbiting around my core expertise — the closer to the center, the stronger the mastery."
          className="mb-16"
        />

        {/* Universe container */}
        <div className="flex justify-center items-center w-full h-[320px] sm:h-[480px] md:h-[540px] lg:h-[620px] overflow-hidden">
          <div
            className="relative scale-[0.5] sm:scale-[0.75] md:scale-[0.9] lg:scale-100 transition-transform duration-500 origin-center shrink-0"
            style={{ width: 620, height: 620 }}
            role="img"
            aria-label="Tech universe visualization"
          >
            {/* SVG Orbit rings */}
            <OrbitRing radius={120} orbitLevel={1} />
            <OrbitRing radius={200} orbitLevel={2} />
            <OrbitRing radius={275} orbitLevel={3} />

            {/* Center — Developer Core */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(0,217,255,0.15), 0 0 80px rgba(0,217,255,0.05)",
                  "0 0 60px rgba(124,58,237,0.2), 0 0 120px rgba(124,58,237,0.08)",
                  "0 0 40px rgba(0,217,255,0.15), 0 0 80px rgba(0,217,255,0.05)",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ borderRadius: "50%" }}
            >
              <div className="relative flex flex-col items-center justify-center w-28 h-28 rounded-full bg-[#0a0a12]">
                {/* Gradient border ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #00D9FF, #7C3AED, #4F46E5, #00D9FF)",
                    padding: 2,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Pulsating outer ring */}
                <motion.div
                  className="absolute inset-[-8px] rounded-full border border-[#00D9FF]/8"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-[-16px] rounded-full border border-[#7C3AED]/5"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />

                {/* Center text */}
                <p className="text-[10px] font-mono text-white/50 uppercase tracking-wider text-center leading-tight z-10 select-none">
                  VU BAO
                  <br />
                  <span className="text-gradient-cyan font-bold text-xs tracking-widest">
                    KHANH
                  </span>
                </p>
              </div>
            </motion.div>

            {/* Orbit 1 items */}
            {orbit1.map((tech, i) => (
              <OrbitItem
                key={tech.name}
                tech={tech}
                index={i}
                totalInOrbit={orbit1.length}
              />
            ))}

            {/* Orbit 2 items */}
            {orbit2.map((tech, i) => (
              <OrbitItem
                key={tech.name}
                tech={tech}
                index={i}
                totalInOrbit={orbit2.length}
              />
            ))}

            {/* Orbit 3 items */}
            {orbit3.map((tech, i) => (
              <OrbitItem
                key={tech.name}
                tech={tech}
                index={i}
                totalInOrbit={orbit3.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
