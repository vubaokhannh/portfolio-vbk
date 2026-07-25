import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPersonalInfo } from "@/lib/data-fetchers";
import { Github, Linkedin, Mail, MapPin, Calendar, GraduationCap, Briefcase, Code } from "lucide-react";

export const metadata: Metadata = {
  title: "About Vũ Bảo Khanh — Fullstack Developer in Vietnam",
  description:
    "Learn about Vũ Bảo Khanh (Vu Bao Khanh), a Fullstack Developer from Vietnam specializing in Laravel, NestJS, React & Next.js. Graduated FPT Polytechnic, currently working at BM WEB.",
  alternates: {
    canonical: "https://vubaokhanh.tech/about",
    languages: {
      en: "https://vubaokhanh.tech/about",
      vi: "https://vubaokhanh.tech/about",
      "x-default": "https://vubaokhanh.tech/about",
    },
  },
  openGraph: {
    type: "profile",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://vubaokhanh.tech/about",
    title: "About Vũ Bảo Khanh — Fullstack Developer Vietnam",
    description:
      "Fullstack Developer specializing in Laravel, NestJS, React & Next.js. Learn about Khanh's journey, education, experience and technical skills.",
    siteName: "Vũ Bảo Khanh Portfolio",
    images: [{ url: "https://vubaokhanh.tech/og-image.png", width: 1200, height: 630, alt: "Vũ Bảo Khanh" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Vũ Bảo Khanh — Fullstack Developer Vietnam",
    description: "Fullstack Developer specializing in Laravel, NestJS, React & Next.js.",
    creator: "@vubaokhannh",
    images: ["https://vubaokhanh.tech/og-image.png"],
  },
};

// About page schema
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://vubaokhanh.tech/about",
  url: "https://vubaokhanh.tech/about",
  name: "About Vũ Bảo Khanh",
  description: "Personal and professional background of Vũ Bảo Khanh, a Fullstack Developer in Vietnam.",
  mainEntity: {
    "@type": "Person",
    "@id": "https://vubaokhanh.tech/#person",
    name: "Vũ Bảo Khanh",
    jobTitle: "Fullstack Web Engineer",
    url: "https://vubaokhanh.tech",
    email: "vubaokhanh2311@gmail.com",
    sameAs: [
      "https://github.com/vubaokhannh",
      "https://linkedin.com/in/vubaokhannh",
    ],
  },
};

const SKILLS = [
  { category: "Backend", items: ["Laravel (PHP)", "NestJS (Node.js)", "Express.js", "REST API Design"], color: "#E0234E" },
  { category: "Frontend", items: ["React 19", "Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"], color: "#61DAFB" },
  { category: "Database", items: ["MySQL", "PostgreSQL", "Redis", "Prisma ORM"], color: "#4479A1" },
  { category: "DevOps & Tools", items: ["Docker", "Git & GitHub", "Linux", "Postman", "Filament"], color: "#2496ED" },
];

const EXPERIENCE = [
  {
    role: "Fullstack PHP Developer",
    company: "BM WEB",
    period: "Tháng 1/2026 — Hiện tại",
    periodEn: "January 2026 — Present",
    description: "Phát triển các hệ thống web fullstack quy mô doanh nghiệp với Laravel và React. Xây dựng admin panels, tối ưu hiệu năng database, và triển khai CI/CD pipeline.",
    color: "#00D9FF",
  },
  {
    role: "Frontend Developer (Intern)",
    company: "Cantho University Software Center (CUSC)",
    period: "Tháng 5 — Tháng 8/2025",
    periodEn: "May — August 2025",
    description: "Thực tập phát triển giao diện người dùng với React. Tham gia xây dựng các module quản lý sinh viên và giao thức tích hợp Google Drive API.",
    color: "#7C3AED",
  },
];

export default async function AboutPage() {
  const info = await getPersonalInfo("vi");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
        {/* Background */}
        <div
          className="fixed inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(0,217,255,0.04) 0%, transparent 60%)" }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
          {/* Hero intro */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-5xl shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,58,237,0.1))", border: "1px solid rgba(0,217,255,0.2)" }}
            >
              👨‍💻
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-xs font-mono text-white/50 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#28C840] animate-pulse" />
                Available for opportunities
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                Vũ Bảo Khanh
              </h1>
              <p className="text-lg text-[#00D9FF] font-mono font-bold">Fullstack Web Engineer</p>
              <div className="flex flex-wrap gap-4 text-sm text-white/40 font-mono">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Cần Thơ, Việt Nam</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{info.email}</span>
              </div>
              <div className="flex gap-3 pt-1">
                <a href={info.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-sm text-white/70 hover:text-white transition-all">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href={info.linkedin} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-sm text-white/70 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center">
                <Code className="w-4 h-4 text-[#00D9FF]" />
              </span>
              About Me
            </h2>
            <div className="pl-11 space-y-4 text-white/60 leading-relaxed">
              <p>{info.bio}</p>
              <p className="text-white/40 text-sm font-mono">
                Hiện đang xây dựng và tối ưu các hệ thống web quy mô lớn tại BM WEB.
                Đam mê thiết kế hệ thống sạch, hiệu năng cao và trải nghiệm người dùng xuất sắc.
              </p>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#7C3AED]" />
              </span>
              Education
            </h2>
            <div className="pl-11">
              <div className="p-5 rounded-2xl border border-white/[0.07] bg-[#0F1117]/60 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-white">FPT Polytechnic — Cần Thơ</p>
                    <p className="text-sm text-white/50">Kỹ thuật phần mềm ứng dụng</p>
                  </div>
                  <span className="text-xs font-mono text-white/30 shrink-0 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> 2022 — 2025
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Laravel", "React", "PHP OOP", "Database Design", "Software Architecture"].map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] font-mono rounded border border-white/[0.06] text-white/40 bg-white/[0.02]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-[#F59E0B]" />
              </span>
              Work Experience
            </h2>
            <div className="pl-11 space-y-4">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="p-5 rounded-2xl border border-white/[0.07] bg-[#0F1117]/60 space-y-2"
                  style={{ borderLeftColor: `${exp.color}30`, borderLeftWidth: "3px" }}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">{exp.role}</p>
                      <p className="text-sm font-mono" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-white/30 shrink-0">{exp.period}</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Technical Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILLS.map((group) => (
                <div key={group.category} className="p-5 rounded-2xl border border-white/[0.07] bg-[#0F1117]/60 space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: group.color }}>
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 text-xs rounded-lg border border-white/[0.06] text-white/60 bg-white/[0.02]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 py-8 border-t border-white/[0.06]">
            <p className="text-white/40 text-sm">
              Bạn muốn cộng tác hoặc tìm hiểu thêm về dự án của tôi?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/#contact"
                className="px-6 py-2.5 rounded-full bg-[#00D9FF] text-black font-bold text-sm hover:bg-[#00c0e0] transition-all">
                Get in Touch
              </Link>
              <Link href="/blog"
                className="px-6 py-2.5 rounded-full border border-white/10 text-white/60 font-bold text-sm hover:text-white hover:border-white/20 transition-all">
                Read My Blog
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
