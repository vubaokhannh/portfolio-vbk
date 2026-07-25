// ============================================================
// PORTFOLIO TYPES — Vu Bao Khanh Portfolio
// ============================================================

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  image: string;
  color: string;
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "completed" | "in-progress" | "planned";
  year: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: SkillCategory;
  level: number; // 1-5
  description: string;
  color: string;
}

export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "tools";

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  icon: string;
  description: string;
  color: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  tags: string[];
  color: string;
}


export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface ThemeConfig {
  themeColor?: string;
  secondaryColor?: string;
  bgColor?: string;
  cardBgColor?: string;
  blurStrength?: string;
  borderRadius?: string;
}

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  facebook: string;
  cvUrl: string;
  stack: string[];
  stats: Stat[];
  themeColor?: string;
  themeConfig?: ThemeConfig;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  suffix?: string;
  icon: string;
}

export interface OrbitTech {
  name: string;
  icon: string;
  color: string;
  orbit: 1 | 2 | 3;
  size: "sm" | "md" | "lg";
}

export interface GithubStats {
  totalContributions: number;
  currentStreak: number;
  totalRepos: number;
  totalStars: number;
  topLanguages: { name: string; percentage: number; color: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tags: string[];
}
