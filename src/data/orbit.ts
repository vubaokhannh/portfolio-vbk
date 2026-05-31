import type { OrbitTech } from "@/types";

export const orbitTechs: OrbitTech[] = [
  // ── ORBIT 1: THE CORE (Mặt trời chính - Nền tảng Backend quyết định) ──
  {
    name: "NestJS",
    icon: "nestjs", // Khuyên dùng: Map chuỗi này với Component SVG NestJS trong UI của bạn
    color: "#E0234E",
    orbit: 1,
    size: "lg",
  },
  {
    name: "Laravel",
    icon: "laravel",
    color: "#FF2D20",
    orbit: 1,
    size: "lg",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    color: "#3178C6",
    orbit: 1,
    size: "lg",
  },
  {
    name: "PHP",
    icon: "php",
    color: "#777BB4",
    orbit: 1,
    size: "lg",
  },

  // ── ORBIT 2: ECOSYSTEM (Hệ thống dữ liệu & Render giao diện) ──
  {
    name: "PostgreSQL",
    icon: "postgresql",
    color: "#4169E1",
    orbit: 2,
    size: "md",
  },
  {
    name: "MySQL",
    icon: "mysql",
    color: "#4479A1",
    orbit: 2,
    size: "md",
  },
  {
    name: "React",
    icon: "react",
    color: "#61DAFB",
    orbit: 2,
    size: "md",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    color: "#FFFFFF",
    orbit: 2,
    size: "md",
  },
  {
    name: "Socket.IO",
    icon: "socketio",
    color: "#010101",
    orbit: 2,
    size: "md",
  },
  {
    name: "InertiaJS",
    icon: "inertia",
    color: "#9553E8",
    orbit: 2,
    size: "md",
  },

  // ── ORBIT 3: INFRASTRUCTURE & TOOLS (Vòng ngoài bổ trợ vận hành) ──
  {
    name: "Node.js",
    icon: "nodejs",
    color: "#339933",
    orbit: 3,
    size: "sm",
  },
  {
    name: "Docker",
    icon: "docker",
    color: "#2496ED",
    orbit: 3,
    size: "sm",
  },
  {
    name: "Redis",
    icon: "redis",
    color: "#DC382D",
    orbit: 3,
    size: "sm",
  },
  {
    name: "Prisma",
    icon: "prisma",
    color: "#5A67D8",
    orbit: 3,
    size: "sm",
  },
  {
    name: "Filament",
    icon: "filament",
    color: "#F59E0B",
    orbit: 3,
    size: "sm",
  },
  {
    name: "Tailwind",
    icon: "tailwind",
    color: "#06B6D4",
    orbit: 3,
    size: "sm",
  },
  {
    name: "Mantine UI",
    icon: "mantine",
    color: "#339AF0",
    orbit: 3,
    size: "sm",
  },
  {
    name: "WordPress",
    icon: "wordpress",
    color: "#21759B",
    orbit: 3,
    size: "sm",
  },
];
export const githubStats = {
  totalContributions: 847,
  currentStreak: 12,
  totalRepos: 24,
  totalStars: 38,
  topLanguages: [
    { name: "PHP", percentage: 45, color: "#8892BF" },
    { name: "TypeScript", percentage: 25, color: "#3178C6" },
    { name: "JavaScript", percentage: 18, color: "#F7DF1E" },
    { name: "CSS", percentage: 8, color: "#563D7C" },
    { name: "Other", percentage: 4, color: "#6B7280" },
  ],
};
