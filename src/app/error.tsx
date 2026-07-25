"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-md">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-pulse" />
          <span className="text-xs font-mono text-[#7C3AED]/80 tracking-widest uppercase">
            RUNTIME ERROR
          </span>
        </div>

        {/* Icon */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(0,217,255,0.05))",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          ⚡
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black text-white">Something Went Wrong</h1>
          <p className="text-white/40 text-sm leading-relaxed font-mono">
            An unexpected error occurred. This has been logged automatically.
          </p>

          {/* Error digest for support */}
          {error.digest && (
            <p className="text-xs font-mono text-white/20">
              Error ID:{" "}
              <code className="text-[#7C3AED]/60">{error.digest}</code>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-full text-sm font-mono font-bold bg-[#7C3AED] text-white hover:bg-[#7C3AED]/80 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            ↻ Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full text-sm font-mono font-bold border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            ← Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
