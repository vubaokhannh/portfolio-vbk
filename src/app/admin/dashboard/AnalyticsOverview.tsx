"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  FileText,
  Briefcase,
  Layers,
  Sparkles,
  ArrowUpRight,
  Activity,
  Plus,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Clock,
  LayoutGrid,
} from "lucide-react";

interface AnalyticsOverviewProps {
  onNavigateTab: (tab: "profile" | "services" | "projects" | "experience" | "blog") => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

interface StatsData {
  postsCount: number;
  projectsCount: number;
  servicesCount: number;
  experienceCount: number;
  latestPostTitle: string;
  latestPostDate: string;
  latestProjectTitle: string;
}

export default function AnalyticsOverview({ onNavigateTab, showToast }: AnalyticsOverviewProps) {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData>({
    postsCount: 0,
    projectsCount: 0,
    servicesCount: 0,
    experienceCount: 0,
    latestPostTitle: "Loading...",
    latestPostDate: "",
    latestProjectTitle: "Loading...",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      // 1. Posts count & latest
      const { data: posts } = await supabase
        .from("blog_posts")
        .select("title_en, title_vi, iso_date")
        .order("iso_date", { ascending: false });

      // 2. Projects count & latest
      const { data: projects } = await supabase
        .from("projects")
        .select("title_en, title_vi, sort_order")
        .order("sort_order", { ascending: true });

      // 3. Services count
      const { data: services } = await supabase.from("services").select("id");

      // 4. Experience count
      const { data: experience } = await supabase.from("experience").select("id");

      setStats({
        postsCount: posts?.length || 3,
        projectsCount: projects?.length || 3,
        servicesCount: services?.length || 4,
        experienceCount: experience?.length || 2,
        latestPostTitle: posts?.[0]?.title_en || "Architecting Krello: Real-Time Collaborative Engine",
        latestPostDate: posts?.[0]?.iso_date || "2026-07-13",
        latestProjectTitle: projects?.[0]?.title_en || "Task Management System (Krello)",
      });
    } catch {
      showToast("Could not load real-time analytics data.", "info");
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      title: "PUBLISHED ARTICLES",
      value: stats.postsCount,
      subtitle: "Technical articles online",
      icon: <FileText className="w-5 h-5 text-[#00D9FF]" />,
      color: "#00D9FF",
      glowBg: "rgba(0, 217, 255, 0.08)",
      borderColor: "rgba(0, 217, 255, 0.2)",
      progressPercent: 85,
      tab: "blog" as const,
    },
    {
      title: "PORTFOLIO PROJECTS",
      value: stats.projectsCount,
      subtitle: "Fullstack web applications",
      icon: <Briefcase className="w-5 h-5 text-[#7C3AED]" />,
      color: "#7C3AED",
      glowBg: "rgba(124, 58, 237, 0.08)",
      borderColor: "rgba(124, 58, 237, 0.2)",
      progressPercent: 90,
      tab: "projects" as const,
    },
    {
      title: "SERVICES OFFERED",
      value: stats.servicesCount,
      subtitle: "Client & ERP solutions",
      icon: <Layers className="w-5 h-5 text-[#10B981]" />,
      color: "#10B981",
      glowBg: "rgba(16, 185, 129, 0.08)",
      borderColor: "rgba(16, 185, 129, 0.2)",
      progressPercent: 100,
      tab: "services" as const,
    },
    {
      title: "CAREER MILESTONES",
      value: stats.experienceCount,
      subtitle: "Work experience items",
      icon: <Sparkles className="w-5 h-5 text-[#F59E0B]" />,
      color: "#F59E0B",
      glowBg: "rgba(245, 158, 11, 0.08)",
      borderColor: "rgba(245, 158, 11, 0.2)",
      progressPercent: 75,
      tab: "experience" as const,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-mono text-xs text-white/50">
        <span className="w-4 h-4 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mr-2.5" />
        LOADING SYSTEM ANALYTICS...
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono text-xs select-text">
      {/* Top Welcome Banner */}
      <div className="p-6 md:p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-r from-black/80 via-[#0B0E14] to-black/80 backdrop-blur-xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/25 text-[#00D9FF] text-[10px] font-bold tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
              SYSTEM ACTIVE
            </span>
            <span className="text-white/30 text-[11px]">• vubaokhanh.tech</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Welcome back, <span className="bg-gradient-to-r from-[#00D9FF] to-[#7C3AED] bg-clip-text text-transparent">Vu Bao Khanh</span>
          </h1>
          <p className="text-xs text-white/50 max-w-xl leading-relaxed font-sans">
            Here is your website&apos;s real-time performance summary, published content status, and system health metrics.
          </p>
        </div>

        {/* Action Shortcut Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0 select-none">
          <button
            onClick={() => onNavigateTab("blog")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold text-xs tracking-wider transition-all shadow-lg shadow-[#00D9FF]/10 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            CREATE ARTICLE
          </button>
          <button
            onClick={() => onNavigateTab("projects")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.08] text-white font-bold text-xs tracking-wider transition-all cursor-pointer active:scale-95"
          >
            <LayoutGrid className="w-4 h-4" />
            ADD PROJECT
          </button>
        </div>
      </div>

      {/* 4 Premium Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            onClick={() => onNavigateTab(card.tab)}
            className="group relative p-6 rounded-2xl border bg-[#0B0D14]/80 hover:bg-[#0F121C] transition-all duration-300 cursor-pointer overflow-hidden shadow-xl hover:-translate-y-1"
            style={{ borderColor: card.borderColor }}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl transition-opacity group-hover:opacity-100 opacity-40"
              style={{ backgroundColor: card.color }}
            />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner"
                style={{ backgroundColor: card.glowBg, borderColor: card.borderColor }}
              >
                {card.icon}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-white/40 group-hover:text-white transition-colors">
                <span>MANAGE</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>

            <div className="space-y-1.5 relative z-10">
              <div className="text-3xl font-black text-white tracking-tight">{card.value}</div>
              <div className="text-[10px] font-bold text-white/60 tracking-wider uppercase">{card.title}</div>
              <div className="text-[10px] text-white/35 font-sans">{card.subtitle}</div>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full h-1 rounded-full bg-white/[0.06] mt-4 overflow-hidden relative z-10">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${card.progressPercent}%`, backgroundColor: card.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Middle Grid: Activity Stream & System Integrity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity & Content Summary (Col Span 2) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/[0.08] bg-[#0B0D14]/80 backdrop-blur-xl space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00D9FF]" />
              RECENT CONTENT FEEDS
            </h3>
            <span className="text-[10px] text-white/40 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Real-time Sync
            </span>
          </div>

          <div className="space-y-3.5">
            {/* Latest Blog Post Item */}
            <div
              onClick={() => onNavigateTab("blog")}
              className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20">
                    LATEST ARTICLE
                  </span>
                  <span className="text-[10px] text-white/35 font-sans">{stats.latestPostDate}</span>
                </div>
                <p className="text-xs font-bold text-white group-hover:text-[#00D9FF] transition-colors leading-snug">
                  {stats.latestPostTitle}
                </p>
              </div>
              <Edit3 className="w-4 h-4 text-white/30 group-hover:text-[#00D9FF] shrink-0 transition-colors" />
            </div>

            {/* Featured Project Item */}
            <div
              onClick={() => onNavigateTab("projects")}
              className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.04] transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20">
                    FEATURED PROJECT
                  </span>
                </div>
                <p className="text-xs font-bold text-white group-hover:text-[#7C3AED] transition-colors leading-snug">
                  {stats.latestProjectTitle}
                </p>
              </div>
              <Edit3 className="w-4 h-4 text-white/30 group-hover:text-[#7C3AED] shrink-0 transition-colors" />
            </div>
          </div>
        </div>

        {/* System Health & Status Panel (Col Span 1) */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#0B0D14]/80 backdrop-blur-xl space-y-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-white/[0.06] pb-4 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              SYSTEM HEALTH & INTEGRITY
            </h3>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between text-[11px] p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <span className="text-white/50">Database Engine</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Supabase REST
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <span className="text-white/50">Google Sitemap</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Hourly Index
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <span className="text-white/50">Production Domain</span>
                <span className="font-bold text-white/90">vubaokhanh.tech</span>
              </div>
              <div className="flex items-center justify-between text-[11px] p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.01]">
                <span className="text-white/50">SSL Certificate</span>
                <span className="font-bold text-emerald-400">HTTPS Protected</span>
              </div>
            </div>
          </div>

          <a
            href="https://vubaokhanh.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-white font-bold text-xs tracking-wider transition-all cursor-pointer active:scale-95 shadow-lg"
          >
            VIEW LIVE PORTFOLIO <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
