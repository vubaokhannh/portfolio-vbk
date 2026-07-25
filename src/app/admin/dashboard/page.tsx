"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut, User as UserIcon, Globe, Briefcase, BookOpen, Settings, Layout, CheckCircle, XCircle, Info, BarChart3, Sliders, Search, Cpu, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";

// Managers & Analytics
import AnalyticsOverview from "./AnalyticsOverview";
import ContactMessagesManager from "./ContactMessagesManager";
import PersonalInfoManager from "./PersonalInfoManager";
import ServicesManager from "./ServicesManager";
import ProjectsManager from "./ProjectsManager";
import ExperienceManager from "./ExperienceManager";
import SkillsManager from "./SkillsManager";
import BlogManager from "./BlogManager";
import SeoManager from "./SeoManager";
import SettingsManager from "./SettingsManager";

type Tab = "overview" | "messages" | "profile" | "services" | "projects" | "experience" | "skills" | "blog" | "seo" | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Toast notifications state
  interface ToastInfo {
    message: string;
    type: "success" | "error" | "info";
    id: number;
  }
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  useEffect(() => {
    if (!supabase) {
      router.replace("/");
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        if (typeof document !== "undefined") {
          document.cookie = "sb-admin-session=; path=/; max-age=0;";
        }
        router.replace("/admin/login");
      } else {
        if (typeof document !== "undefined") {
          document.cookie = `sb-admin-session=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }
        setUser(session.user);
        setLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        if (typeof document !== "undefined") {
          document.cookie = "sb-admin-session=; path=/; max-age=0;";
        }
        router.replace("/admin/login");
      } else {
        if (typeof document !== "undefined") {
          document.cookie = `sb-admin-session=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleSignOut() {
    if (typeof document !== "undefined") {
      document.cookie = "sb-admin-session=; path=/; max-age=0;";
    }
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-mono text-xs select-none">
        <div className="flex flex-col items-center gap-3">
          <span className="w-5 h-5 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
          <span className="tracking-widest opacity-60">LOADING SECURE ADMINISTRATIVE SYSTEM...</span>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "overview" as Tab, label: "OVERVIEW", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "messages" as Tab, label: "INBOX MESSAGES", icon: <Inbox className="w-4 h-4 text-[#00D9FF]" /> },
    { id: "profile" as Tab, label: "PROFILE INFO", icon: <UserIcon className="w-4 h-4" /> },
    { id: "services" as Tab, label: "SERVICES", icon: <Settings className="w-4 h-4" /> },
    { id: "projects" as Tab, label: "PROJECTS", icon: <Layout className="w-4 h-4" /> },
    { id: "experience" as Tab, label: "WORK TIMELINE", icon: <Briefcase className="w-4 h-4" /> },
    { id: "skills" as Tab, label: "SKILLS MANAGER", icon: <Cpu className="w-4 h-4" /> },
    { id: "blog" as Tab, label: "BLOG MANAGER", icon: <BookOpen className="w-4 h-4" /> },
    { id: "seo" as Tab, label: "SEO MANAGER", icon: <Search className="w-4 h-4" /> },
    { id: "settings" as Tab, label: "SETTINGS", icon: <Sliders className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row relative select-text">
      {/* Background soft ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 400px at 0% 0%, rgba(0, 217, 255, 0.03), transparent 70%), radial-gradient(circle 400px at 100% 100%, rgba(124, 58, 237, 0.03), transparent 70%)",
        }}
      />

      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#07090E]/90 backdrop-blur-2xl p-6 flex flex-col justify-between relative z-10 select-none">
        <div className="space-y-8">
          {/* Logo / Header */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#00D9FF]/20">
              <span className="text-xs font-black text-black">K</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-black text-xs tracking-wider">
                VUBAOKHANH<span className="text-[#00D9FF]">.TECH</span>
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-widest uppercase">
                ADMIN SYSTEM
              </span>
            </div>
          </div>

          {/* User badge */}
          <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.015] space-y-1">
            <div className="text-[9px] font-mono text-white/30 tracking-widest font-bold uppercase">LOGGED IN AS</div>
            <div className="text-[11px] font-mono text-white/80 truncate font-semibold" title={user?.email}>
              {user?.email}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 font-mono text-[10px] font-bold tracking-wider">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? "bg-[#00D9FF]/10 border-[#00D9FF]/30 text-[#00D9FF] shadow-[0_0_20px_rgba(0,217,255,0.08)] font-bold scale-[1.02]"
                    : "border-transparent text-white/50 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Action button at bottom */}
        <div className="mt-8 pt-4 border-t border-white/[0.06] flex flex-col gap-3 font-mono text-[10px] font-bold tracking-wider">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            VIEW LIVE SITE
          </a>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            SIGN OUT ADMIN
          </button>
        </div>
      </aside>

      {/* Main panel container */}
      <section className="flex-grow min-w-0 p-6 md:p-10 relative z-10 overflow-y-auto select-text">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full rounded-3xl border border-white/[0.08] bg-[#090B10]/90 backdrop-blur-2xl p-6 md:p-10 shadow-2xl min-h-[550px]"
        >
          {activeTab === "overview" && <AnalyticsOverview onNavigateTab={setActiveTab} showToast={showToast} />}
          {activeTab === "messages" && <ContactMessagesManager showToast={showToast} />}
          {activeTab === "profile" && <PersonalInfoManager showToast={showToast} />}
          {activeTab === "services" && <ServicesManager showToast={showToast} />}
          {activeTab === "projects" && <ProjectsManager showToast={showToast} />}
          {activeTab === "experience" && <ExperienceManager showToast={showToast} />}
          {activeTab === "skills" && <SkillsManager showToast={showToast} />}
          {activeTab === "blog" && <BlogManager showToast={showToast} />}
          {activeTab === "seo" && <SeoManager showToast={showToast} />}
          {activeTab === "settings" && <SettingsManager showToast={showToast} />}
        </motion.div>
      </section>

      {/* Floating Toast Notification Alerts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none select-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${
              toast.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : toast.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-blue-500/10 border-blue-500/20 text-blue-400"
            }`}
          >
            {toast.type === "success" && <CheckCircle className="w-4 h-4 shrink-0 text-green-400" />}
            {toast.type === "error" && <XCircle className="w-4 h-4 shrink-0 text-red-400" />}
            {toast.type === "info" && <Info className="w-4 h-4 shrink-0 text-blue-400" />}
            <span className="font-mono text-[10px] font-bold tracking-wider">{toast.message}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
