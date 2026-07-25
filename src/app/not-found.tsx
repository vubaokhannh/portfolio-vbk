import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Vũ Bảo Khanh",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,217,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-lg">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono text-red-400/80 tracking-widest uppercase">
            ERROR 404 — PAGE NOT FOUND
          </span>
        </div>

        {/* Giant 404 */}
        <div className="relative select-none">
          <h1
            className="text-[140px] sm:text-[180px] font-black leading-none tracking-tighter"
            style={{
              background: "linear-gradient(135deg, #00D9FF 0%, #7C3AED 50%, #00D9FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(0,217,255,0.15))",
            }}
          >
            404
          </h1>
          {/* Glitch duplicate */}
          <h1
            aria-hidden="true"
            className="absolute inset-0 text-[140px] sm:text-[180px] font-black leading-none tracking-tighter opacity-10 text-[#00D9FF]"
            style={{ transform: "translate(3px, 2px)" }}
          >
            404
          </h1>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">
            {`Trang này không tồn tại`}
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto font-mono">
            {`The page you are looking for has been moved, deleted, or never existed. Let's get you back on track.`}
          </p>
        </div>

        {/* Navigation options */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-sm font-mono font-bold bg-[#00D9FF] text-black hover:bg-[#00D9FF]/80 transition-all hover:scale-105 active:scale-95"
          >
            ← Go Back Home
          </Link>
          <Link
            href="/blog"
            className="px-6 py-2.5 rounded-full text-sm font-mono font-bold border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            Read Blog
          </Link>
        </div>

        {/* Breadcrumb hint */}
        <p className="text-white/20 text-xs font-mono">
          vubaokhanh.tech → <span className="text-red-400/60">404</span>
        </p>
      </div>
    </div>
  );
}
