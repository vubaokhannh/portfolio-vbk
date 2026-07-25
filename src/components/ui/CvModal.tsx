"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  FileText,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Eye,
  GraduationCap,
  Briefcase,
  Code2,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl?: string;
}

export function CvModal({ isOpen, onClose, cvUrl = "/cv-vubaokhanh.pdf" }: CvModalProps) {
  const { language } = useLanguage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"pdf" | "summary">("pdf");

  const isVi = language === "vi";

  // Resolve targetUrl: ensure local URLs use relative path to prevent port mismatch errors (e.g. 3000 vs 3002)
  let targetUrl = cvUrl || "/cv-vubaokhanh.pdf";
  if (targetUrl.includes("localhost:") || targetUrl.includes("127.0.0.1")) {
    try {
      const parsed = new URL(targetUrl);
      targetUrl = parsed.pathname;
    } catch {
      targetUrl = "/cv-vubaokhanh.pdf";
    }
  }

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen, viewMode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 font-mono text-xs select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
            className={`relative w-full border border-white/[0.12] bg-[#0A0C12]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all duration-300 ${
              isFullscreen ? "h-[96vh] max-w-[98vw]" : "h-[85vh] max-w-5xl"
            }`}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-20"
              style={{ background: "radial-gradient(circle, #00D9FF 0%, #7C3AED 100%)" }}
            />

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0F121C]/90 relative z-10 shrink-0 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00D9FF]/20 to-[#7C3AED]/20 border border-[#00D9FF]/30 flex items-center justify-center text-[#00D9FF]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Curriculum Vitae — Vũ Bảo Khanh
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED 2026
                    </span>
                  </div>
                  <p className="text-[11px] text-white/40 font-mono">
                    PDF Document · 112 KB · Fullstack Developer
                  </p>
                </div>
              </div>

              {/* View Mode Toggle & Action Buttons */}
              <div className="flex items-center gap-2">
                {/* View Mode Switcher */}
                <div className="flex items-center gap-0.5 border border-white/[0.08] bg-black/40 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode("pdf")}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      viewMode === "pdf"
                        ? "bg-[#00D9FF] text-black font-extrabold shadow-sm"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    PDF VIEW
                  </button>
                  <button
                    onClick={() => setViewMode("summary")}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      viewMode === "summary"
                        ? "bg-[#7C3AED] text-white font-extrabold shadow-sm"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    SUMMARY
                  </button>
                </div>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hidden sm:flex p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-white/60 hover:text-white transition-all cursor-pointer"
                  title={isFullscreen ? "Restore size" : "Maximize"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#00D9FF]" />
                  {isVi ? "Mở thẻ mới" : "Open Tab"}
                </a>

                <a
                  href={targetUrl}
                  download="CV_VuBaoKhanh_Fullstack.pdf"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00D9FF] to-[#00c0e0] hover:opacity-90 text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#00D9FF]/20 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isVi ? "TẢI FILE PDF" : "DOWNLOAD PDF"}</span>
                </a>

                <button
                  onClick={onClose}
                  className="p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.1] text-white/60 hover:text-white transition-all cursor-pointer ml-1"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="relative flex-grow bg-[#05060A] overflow-hidden select-text">
              {/* Spinner while loading */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0A0C12] z-20 text-white/50 font-mono text-xs select-none">
                  <span className="w-6 h-6 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin" />
                  <span className="tracking-widest uppercase flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D9FF]" />
                    LOADING CV PREVIEW...
                  </span>
                </div>
              )}

              {viewMode === "pdf" ? (
                <div className="w-full h-full relative">
                  <iframe
                    src={targetUrl}
                    className="w-full h-full border-none min-h-[450px]"
                    title="CV Preview - Vu Bao Khanh"
                  />
                  {/* Localhost fallback banner if iframe is blocked by browser port security */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-white/10 bg-[#0F121C]/95 backdrop-blur-xl shadow-2xl">
                    <AlertCircle className="w-4 h-4 text-[#00D9FF] shrink-0" />
                    <span className="text-[11px] text-white/70 font-mono">
                      {isVi ? "Nếu trình duyệt chặn xem trực tiếp, hãy nhấn nút:" : "If preview is blocked, click:"}
                    </span>
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-lg bg-[#00D9FF]/15 border border-[#00D9FF]/30 text-[#00D9FF] font-bold text-[10px] hover:bg-[#00D9FF]/25 transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {isVi ? "Mở PDF Trong Thẻ Mới" : "Open PDF In New Tab"}
                    </a>
                  </div>
                </div>
              ) : (
                /* Summary Mode fallback */
                <div className="h-full overflow-y-auto p-6 md:p-10 space-y-8 max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 rounded-2xl border border-white/[0.08] bg-[#0F121C]/80 backdrop-blur-sm">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black text-white tracking-tight">Vũ Bảo Khanh</h2>
                      <p className="text-xs font-mono text-[#00D9FF] font-bold uppercase tracking-wider">
                        Fullstack Web Engineer · Laravel / React / NestJS
                      </p>
                      <p className="text-xs text-white/50 max-w-xl leading-relaxed font-sans">
                        {isVi
                          ? "Lập trình viên Fullstack với hơn 1 năm kinh nghiệm xây dựng các hệ thống web quy mô doanh nghiệp, admin ERP panels và ứng dụng thời gian thực."
                          : "Fullstack Engineer specializing in enterprise web applications, real-time systems, and scalable API architecture."}
                      </p>
                    </div>
                    <a
                      href={targetUrl}
                      download="CV_VuBaoKhanh_Fullstack.pdf"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00D9FF] text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer shrink-0"
                    >
                      <Download className="w-4 h-4" />
                      {isVi ? "TẢI FILE CV GỐC (PDF)" : "DOWNLOAD OFFICIAL PDF"}
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Education */}
                    <div className="p-6 rounded-2xl border border-white/[0.07] bg-[#0F121C]/60 space-y-3">
                      <h3 className="text-xs font-mono font-bold text-[#7C3AED] uppercase tracking-wider flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        {isVi ? "Học Vấn" : "Education"}
                      </h3>
                      <div>
                        <p className="font-bold text-white text-sm">FPT Polytechnic Cần Thơ</p>
                        <p className="text-xs text-white/50">Chuyên ngành Kỹ thuật Phần mềm (2022 — 2025)</p>
                      </div>
                    </div>

                    {/* Work Experience */}
                    <div className="p-6 rounded-2xl border border-white/[0.07] bg-[#0F121C]/60 space-y-3">
                      <h3 className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        {isVi ? "Kinh Nghiệm" : "Experience"}
                      </h3>
                      <div>
                        <p className="font-bold text-white text-sm">BM WEB — Fullstack PHP Developer</p>
                        <p className="text-xs text-white/50">Tháng 1/2026 — Hiện tại</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Status Bar */}
            <div className="px-6 py-3 border-t border-white/[0.06] bg-[#0F121C]/90 flex items-center justify-between shrink-0 text-[11px] text-white/40 font-mono select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
                <span>vubaokhanh.tech / cv-vubaokhanh.pdf</span>
              </div>
              <div className="hidden sm:flex items-center gap-4">
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/70 font-mono text-[10px]">ESC</kbd> to exit</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
