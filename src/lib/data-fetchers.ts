import { cache } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";
import { personalEn, personalVi } from "@/data/personal";
import { projectsEn, projectsVi } from "@/data/projects";
import { servicesEn, servicesVi } from "@/data/services";
import { experienceEn, experienceVi } from "@/data/experience";
import { postsEn, postsVi, BlogPost } from "@/data/posts";
import type { PersonalInfo, Project, ServiceItem, ExperienceItem } from "@/types";

interface BlogPostRaw {
  slug: string;
  title_en?: string;
  title_vi?: string;
  description_en?: string;
  description_vi?: string;
  content_en?: string;
  content_vi?: string;
  date_en?: string;
  date_vi?: string;
  iso_date?: string;
  updated_at?: string;
  tags?: string[];
  author_en?: string;
  author_vi?: string;
  read_time_en?: string;
  read_time_vi?: string;
  cover_image?: string;
}

interface PersonalInfoRaw {
  key: string;
  name: string;
  first_name?: string;
  last_name?: string;
  role_en?: string;
  role_vi?: string;
  tagline_en?: string;
  tagline_vi?: string;
  bio_en?: string;
  bio_vi?: string;
  location?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  cv_url?: string;
  stack?: string[];
  stats?: Array<{ id: string; value: string; label: string; labelVi?: string; suffix?: string; icon?: string }>;
  theme_color?: string;
  theme_config?: {
    themeColor?: string;
    secondaryColor?: string;
    bgColor?: string;
    cardBgColor?: string;
    blurStrength?: string;
    borderRadius?: string;
  };
}

interface ServiceRaw {
  id: string;
  title_en: string;
  title_vi: string;
  description_en?: string;
  description_vi?: string;
  icon?: string;
  color?: string;
  tags?: string[];
  sort_order?: number;
}

interface ProjectRaw {
  id: string;
  title_en: string;
  title_vi: string;
  description_en?: string;
  description_vi?: string;
  long_description_en?: string;
  long_description_vi?: string;
  tech?: string[];
  features_en?: string[];
  features_vi?: string[];
  image?: string;
  color?: string;
  accent_color?: string;
  status?: string;
  year?: string;
  github_url?: string;
  live_url?: string;
  sort_order?: number;
}

interface ExperienceRaw {
  id: string;
  company: string;
  role_en: string;
  role_vi: string;
  duration_en?: string;
  duration_vi?: string;
  description_en?: string;
  description_vi?: string;
  tags?: string[];
  color?: string;
  sort_order?: number;
}

// ── LIGHTWEIGHT IN-MEMORY TTL CACHE (Scoped to Next.js Server Instance) ──
const memoryCache = new Map<string, { data: unknown; expiry: number }>();
const CACHE_TTL_MS = 60_000; // Cache records for 60 seconds

function getCachedData<T>(key: string): T | null {
  const cached = memoryCache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data as T;
  }
  return null;
}

function setCachedData<T>(key: string, data: T): void {
  memoryCache.set(key, { data, expiry: Date.now() + CACHE_TTL_MS });
}

export function clearBlogCache(): void {
  memoryCache.clear();
}

// ── Direct REST API helpers (bypasses supabase-js client caching) ──
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

const isRestConfigured = !!(SUPABASE_URL && SUPABASE_KEY);

async function supabaseRestFetch<T>(
  path: string,
  params?: Record<string, string>
): Promise<T | null> {
  if (!isRestConfigured) return null;

  const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ── Personal Info Fetcher ──
export async function getPersonalInfo(lang: "en" | "vi" = "en"): Promise<PersonalInfo> {
  const defaultData = lang === "vi" ? personalVi : personalEn;
  if (!isSupabaseConfigured) return defaultData;

  const cacheKey = `personal_info_${lang}`;
  const cached = getCachedData<PersonalInfo>(cacheKey);
  if (cached !== null) return cached;

  try {
    const restData = await supabaseRestFetch<PersonalInfoRaw[]>("personal_info", {
      select: "*",
      key: "eq.vubaokhanh",
      limit: "1",
    });

    const data = restData && restData.length > 0 ? restData[0] : null;

    if (!data) {
      const { data: dbData } = await supabase
        .from("personal_info")
        .select("*")
        .eq("key", "vubaokhanh")
        .maybeSingle();

      if (!dbData) return defaultData;
      return parsePersonalInfo(dbData, lang, cacheKey, defaultData);
    }

    return parsePersonalInfo(data, lang, cacheKey, defaultData);
  } catch {
    return defaultData;
  }
}

function parsePersonalInfo(
  data: PersonalInfoRaw,
  lang: "en" | "vi",
  cacheKey: string,
  defaultData: PersonalInfo
): PersonalInfo {
  const result: PersonalInfo = {
    name: data.name || defaultData.name,
    firstName: data.first_name || defaultData.firstName,
    lastName: data.last_name || defaultData.lastName,
    role: (lang === "vi" ? data.role_vi : data.role_en) || defaultData.role,
    tagline: (lang === "vi" ? data.tagline_vi : data.tagline_en) || defaultData.tagline,
    bio: (lang === "vi" ? data.bio_vi : data.bio_en) || defaultData.bio,
    location: data.location || defaultData.location,
    email: data.email || defaultData.email,
    github: data.github || defaultData.github,
    linkedin: data.linkedin || defaultData.linkedin,
    facebook: data.facebook || defaultData.facebook,
    cvUrl: data.cv_url || defaultData.cvUrl,
    stack: data.stack && data.stack.length > 0 ? data.stack : defaultData.stack,
    stats: (data.stats && data.stats.length > 0 ? data.stats : defaultData.stats).map((s) => ({
      id: s.id,
      value: s.value,
      label: s.label,
      suffix: s.suffix,
      icon: s.icon || "calendar",
    })),
    themeColor: data.theme_color || data.theme_config?.themeColor,
    themeConfig: data.theme_config,
  };
  setCachedData(cacheKey, result);
  return result;
}

// ── Services Fetcher ──
export async function getServices(lang: "en" | "vi" = "en"): Promise<ServiceItem[]> {
  const defaultData = lang === "vi" ? servicesVi : servicesEn;
  if (!isSupabaseConfigured) return defaultData;

  const cacheKey = `services_${lang}`;
  const cached = getCachedData<ServiceItem[]>(cacheKey);
  if (cached !== null) return cached;

  try {
    const restData = await supabaseRestFetch<ServiceRaw[]>("services", {
      select: "*",
      order: "sort_order.asc",
    });

    const data = restData && restData.length > 0 ? restData : null;

    if (!data) {
      const { data: dbData } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!dbData || dbData.length === 0) return defaultData;
      return parseServicesList(dbData, lang, cacheKey);
    }

    return parseServicesList(data, lang, cacheKey);
  } catch {
    return defaultData;
  }
}

function parseServicesList(data: ServiceRaw[], lang: "en" | "vi", cacheKey: string): ServiceItem[] {
  const result = data.map((item) => ({
    id: item.id,
    title: (lang === "vi" ? item.title_vi : item.title_en) || item.title_en,
    description: (lang === "vi" ? item.description_vi : item.description_en) || item.description_en || "",
    icon: item.icon || "code",
    color: item.color || "#00D9FF",
    tags: item.tags || [],
  }));
  setCachedData(cacheKey, result);
  return result;
}

// ── Projects Fetcher ──
export async function getProjects(lang: "en" | "vi" = "en"): Promise<Project[]> {
  const defaultData = lang === "vi" ? projectsVi : projectsEn;
  if (!isSupabaseConfigured) return defaultData;

  const cacheKey = `projects_${lang}`;
  const cached = getCachedData<Project[]>(cacheKey);
  if (cached !== null) return cached;

  try {
    const restData = await supabaseRestFetch<ProjectRaw[]>("projects", {
      select: "*",
      order: "sort_order.asc",
    });

    const data = restData && restData.length > 0 ? restData : null;

    if (!data) {
      const { data: dbData } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!dbData || dbData.length === 0) return defaultData;
      return parseProjectsList(dbData, lang, cacheKey);
    }

    return parseProjectsList(data, lang, cacheKey);
  } catch {
    return defaultData;
  }
}

function parseProjectsList(data: ProjectRaw[], lang: "en" | "vi", cacheKey: string): Project[] {
  const result = data.map((item) => ({
    id: item.id,
    title: (lang === "vi" ? item.title_vi : item.title_en) || item.title_en,
    description: (lang === "vi" ? item.description_vi : item.description_en) || item.description_en || "",
    longDescription: (lang === "vi" ? item.long_description_vi : item.long_description_en) || item.long_description_en || "",
    tech: item.tech || [],
    features: (lang === "vi" ? item.features_vi : item.features_en) || item.features_en || [],
    image: item.image || "/og-image.png",
    color: item.color || "#00D9FF",
    accentColor: item.accent_color || "rgba(0,217,255,0.15)",
    status: (item.status === "in-progress" || item.status === "planned" ? item.status : "completed") as Project["status"],
    year: item.year || "2025",
    githubUrl: item.github_url || "https://github.com/vubaokhannh",
    liveUrl: item.live_url || "https://vubaokhanh.tech",
  }));
  setCachedData(cacheKey, result);
  return result;
}

// ── Experience Fetcher ──
export async function getExperience(lang: "en" | "vi" = "en"): Promise<ExperienceItem[]> {
  const defaultData = lang === "vi" ? experienceVi : experienceEn;
  if (!isSupabaseConfigured) return defaultData;

  const cacheKey = `experience_${lang}`;
  const cached = getCachedData<ExperienceItem[]>(cacheKey);
  if (cached !== null) return cached;

  try {
    const restData = await supabaseRestFetch<ExperienceRaw[]>("experience", {
      select: "*",
      order: "sort_order.asc",
    });

    const data = restData && restData.length > 0 ? restData : null;

    if (!data) {
      const { data: dbData } = await supabase
        .from("experience")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!dbData || dbData.length === 0) return defaultData;
      return parseExperienceList(dbData, lang, cacheKey);
    }

    return parseExperienceList(data, lang, cacheKey);
  } catch {
    return defaultData;
  }
}

function parseExperienceList(data: ExperienceRaw[], lang: "en" | "vi", cacheKey: string): ExperienceItem[] {
  const result = data.map((item) => ({
    id: item.id,
    company: item.company,
    role: (lang === "vi" ? item.role_vi : item.role_en) || item.role_en,
    duration: (lang === "vi" ? item.duration_vi : item.duration_en) || item.duration_en || "",
    description: (lang === "vi" ? item.description_vi : item.description_en) || item.description_en || "",
    tags: item.tags || [],
    color: item.color || "#7C3AED",
  }));
  setCachedData(cacheKey, result);
  return result;
}

// ── Blog Fetchers ──
export const fetchRawBlogPosts = cache(async () => {
  const cacheKey = "raw_blog_posts";
  const cached = getCachedData<BlogPostRaw[]>(cacheKey);
  if (cached !== null) return cached;

  const data = await supabaseRestFetch<BlogPostRaw[]>("blog_posts", {
    select: "*",
    order: "iso_date.desc",
  });

  const result = data ?? [];
  if (result.length > 0) setCachedData(cacheKey, result);
  return result;
});

export const fetchRawBlogPostBySlug = cache(async (slug: string) => {
  const normalizedSlug = decodeURIComponent(slug || "").trim().toLowerCase();
  const cacheKey = `blog_post_${normalizedSlug}`;
  const cached = getCachedData<BlogPostRaw>(cacheKey);
  if (cached !== null) return cached;

  const data = await supabaseRestFetch<BlogPostRaw[]>("blog_posts", {
    select: "*",
    slug: `eq.${normalizedSlug}`,
    limit: "1",
  });

  const result = data && data.length > 0 ? data[0] : null;
  if (result) setCachedData(cacheKey, result);
  return result;
});

function parseBlogPostItem(item: BlogPostRaw, lang: "en" | "vi"): BlogPost {
  const isVi = lang === "vi";

  const title = isVi
    ? (item.title_vi?.trim() || item.title_en?.trim() || "")
    : (item.title_en?.trim() || item.title_vi?.trim() || "");

  const description = isVi
    ? (item.description_vi?.trim() || item.description_en?.trim() || "")
    : (item.description_en?.trim() || item.description_vi?.trim() || "");

  const content = isVi
    ? (item.content_vi?.trim() || item.content_en?.trim() || "")
    : (item.content_en?.trim() || item.content_vi?.trim() || "");

  const date = isVi
    ? (item.date_vi?.trim() || item.date_en?.trim() || "")
    : (item.date_en?.trim() || item.date_vi?.trim() || "");

  const author = isVi
    ? (item.author_vi?.trim() || item.author_en?.trim() || "")
    : (item.author_en?.trim() || item.author_vi?.trim() || "");

  const readTime = isVi
    ? (item.read_time_vi?.trim() || item.read_time_en?.trim() || "")
    : (item.read_time_en?.trim() || item.read_time_vi?.trim() || "");

  return {
    slug: item.slug,
    title,
    description,
    content,
    date,
    isoDate: item.iso_date || "",
    tags: item.tags || [],
    author,
    readTime,
    coverImage: item.cover_image || "/og-image.png",
  };
}

export async function getBlogPosts(lang: "en" | "vi" = "en"): Promise<BlogPost[]> {
  const defaultData = lang === "vi" ? postsVi : postsEn;
  if (!isSupabaseConfigured) return defaultData;

  try {
    const data = await fetchRawBlogPosts();
    if (!data || data.length === 0) return defaultData;

    return data.map((item) => parseBlogPostItem(item, lang));
  } catch {
    return defaultData;
  }
}

export async function getBlogPostBySlug(slug: string, lang: "en" | "vi" = "en"): Promise<BlogPost | null> {
  const normalizedSlug = decodeURIComponent(slug || "").trim().toLowerCase();
  const defaultDataList = lang === "vi" ? postsVi : postsEn;
  const defaultPost = defaultDataList.find(p => p.slug.toLowerCase() === normalizedSlug) || null;
  if (!isSupabaseConfigured) return defaultPost;

  try {
    const data = await fetchRawBlogPostBySlug(normalizedSlug);
    if (!data) return defaultPost;

    return parseBlogPostItem(data, lang);
  } catch {
    return defaultPost;
  }
}

// ── Skills Fetcher ──
import { skillGroupsEn, skillGroupsVi } from "@/data/skills";
import type { SkillGroup, SkillCategory } from "@/types";

interface SkillRaw {
  id: string;
  name: string;
  icon: string;
  category: string;
  level: number;
  description_en?: string;
  description_vi?: string;
  color?: string;
  sort_order?: number;
}

export async function getSkills(lang: "en" | "vi" = "en"): Promise<SkillGroup[]> {
  const defaultData = lang === "vi" ? skillGroupsVi : skillGroupsEn;
  if (!isSupabaseConfigured) return defaultData;

  const cacheKey = `skills_${lang}`;
  const cached = getCachedData<SkillGroup[]>(cacheKey);
  if (cached !== null) return cached;

  try {
    const restData = await supabaseRestFetch<SkillRaw[]>("skills", {
      select: "*",
      order: "sort_order.asc",
    });

    const data = restData && restData.length > 0 ? restData : null;
    let list = data;

    if (!list) {
      const { data: dbData } = await supabase
        .from("skills")
        .select("*")
        .order("sort_order", { ascending: true });

      if (dbData && dbData.length > 0) {
        list = dbData;
      }
    }

    if (!list || list.length === 0) return defaultData;

    const categories: { category: SkillCategory; label: string; icon: string; description: string; color: string }[] = [
      { category: "frontend", label: "Frontend", icon: "monitor", description: lang === "vi" ? "Xây dựng giao diện mượt mà." : "Building pixel-perfect interfaces.", color: "#00D9FF" },
      { category: "backend", label: "Backend", icon: "server", description: lang === "vi" ? "Kiến trúc máy chủ mạnh mẽ." : "Architecting robust backend systems.", color: "#7C3AED" },
      { category: "database", label: "Database", icon: "database", description: lang === "vi" ? "Thiết kế & tối ưu CSDL." : "Data modeling and query optimization.", color: "#4F46E5" },
      { category: "devops", label: "DevOps", icon: "cloud", description: lang === "vi" ? "Đóng gói & tự động hóa." : "Deployment & CI/CD automation.", color: "#00D9FF" },
      { category: "tools", label: "Tools", icon: "wrench", description: lang === "vi" ? "Công cụ lập trình bổ trợ." : "Developer tools & productivity stack.", color: "#7C3AED" },
    ];

    const result: SkillGroup[] = categories.map((cat) => {
      const matchingSkills = list!
        .filter((item) => item.category === cat.category)
        .map((item) => ({
          id: item.id,
          name: item.name,
          icon: item.icon || "⚡",
          category: item.category as SkillCategory,
          level: item.level || 4,
          description: (lang === "vi" ? item.description_vi : item.description_en) || item.description_en || "",
          color: item.color || "#00D9FF",
        }));

      return {
        ...cat,
        skills: matchingSkills.length > 0 ? matchingSkills : (defaultData.find((g) => g.category === cat.category)?.skills || []),
      };
    });

    setCachedData(cacheKey, result);
    return result;
  } catch {
    return defaultData;
  }
}

// ── SEO Config Fetcher ──
import type { FaqItem, PersonSchemaCustom } from "./schema-builder";

export interface SeoConfig {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  googleVerification: string;
  keywordsInput: string;
  ogImageUrl: string;
  twitterHandle: string;
  authorName: string;
  jobTitle: string;
  organization: string;
  allowIndexing?: boolean;
  faqSchema?: FaqItem[];
  personSchemaCustom?: PersonSchemaCustom;
  customRawJsonLd?: string;
}

interface SeoConfigRaw {
  key: string;
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  google_verification?: string;
  keywords_input?: string;
  og_image_url?: string;
  twitter_handle?: string;
  author_name?: string;
  job_title?: string;
  organization?: string;
  allow_indexing?: boolean;
  faq_schema?: FaqItem[];
  person_schema_custom?: PersonSchemaCustom;
  custom_raw_jsonld?: string;
}

export const defaultSeoConfig: SeoConfig = {
  seoTitle: "Vũ Bảo Khanh - Fullstack Developer",
  seoDescription:
    "Trang web cá nhân và dịch vụ phát triển web của Vũ Bảo Khanh (Vu Bao Khanh) - Lập trình viên Fullstack chuyên nghiệp (Laravel, NestJS, React, Next.js) tại Việt Nam.",
  canonicalUrl: "https://vubaokhanh.tech",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  keywordsInput:
    "Vu Bao Khanh, Vũ Bảo Khanh, Vũ Bảo Khanh PC08901, Vu Bao Khanh Developer, vubaokhanh.tech, vubaokhanh, vubaokhannh, vu bao khanh developer, vũ bảo khanh lập trình viên, lập trình viên fullstack, nhà phát triển web, tuyển dụng laravel developer, laravel developer vietnam, nestjs developer vietnam, react developer vietnam, custom web development, thiết kế website chuẩn seo, Fullstack Developer, Laravel Developer, React Developer, NestJS, TypeScript, Node.js, Vietnam Developer, Portfolio",
  ogImageUrl: "https://vubaokhanh.tech/og-image.png",
  twitterHandle: "@vubaokhannh",
  authorName: "Vũ Bảo Khanh",
  jobTitle: "Fullstack Web Engineer",
  organization: "BM WEB",
  allowIndexing: true,
};

export async function getSeoConfig(): Promise<SeoConfig> {
  if (!isSupabaseConfigured) return defaultSeoConfig;

  const cacheKey = "seo_config";
  const cached = getCachedData<SeoConfig>(cacheKey);
  if (cached !== null) return cached;

  try {
    const restData = await supabaseRestFetch<SeoConfigRaw[]>("seo_config", {
      select: "*",
      key: "eq.vubaokhanh",
      limit: "1",
    });

    const data = restData && restData.length > 0 ? restData[0] : null;
    let seoRaw = data;

    if (!seoRaw) {
      const { data: dbData } = await supabase
        .from("seo_config")
        .select("*")
        .eq("key", "vubaokhanh")
        .maybeSingle();

      if (dbData) {
        seoRaw = dbData;
      }
    }

    if (!seoRaw) {
      return defaultSeoConfig;
    }

    const result: SeoConfig = {
      seoTitle: seoRaw.seo_title || defaultSeoConfig.seoTitle,
      seoDescription: seoRaw.seo_description || defaultSeoConfig.seoDescription,
      canonicalUrl: seoRaw.canonical_url || defaultSeoConfig.canonicalUrl,
      googleVerification: seoRaw.google_verification || defaultSeoConfig.googleVerification,
      keywordsInput: seoRaw.keywords_input || defaultSeoConfig.keywordsInput,
      ogImageUrl: seoRaw.og_image_url || defaultSeoConfig.ogImageUrl,
      twitterHandle: seoRaw.twitter_handle || defaultSeoConfig.twitterHandle,
      authorName: seoRaw.author_name || defaultSeoConfig.authorName,
      jobTitle: seoRaw.job_title || defaultSeoConfig.jobTitle,
      organization: seoRaw.organization || defaultSeoConfig.organization,
      allowIndexing: seoRaw.allow_indexing ?? true,
      faqSchema: seoRaw.faq_schema || undefined,
      personSchemaCustom: seoRaw.person_schema_custom || undefined,
      customRawJsonLd: seoRaw.custom_raw_jsonld || undefined,
    };

    setCachedData(cacheKey, result);
    return result;
  } catch {
    return defaultSeoConfig;
  }
}


