"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!supabase) {
      setError("Supabase is not configured in .env.local");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        if (typeof document !== "undefined") {
          document.cookie = `sb-admin-session=true; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        }
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError((err as { message?: string })?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden select-text">
      {/* Visual background glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 300px at 50% 50%, rgba(124, 58, 237, 0.05), transparent 70%)",
        }}
      />

      <div className="w-full max-w-md px-6 relative z-10 select-text">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/[0.06] bg-[#0F1117]/80 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top border neon line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF] to-transparent" />

          {/* Form Header */}
          <div className="flex flex-col items-center text-center mb-8 gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wider">ADMIN LOGIN</h1>
              <p className="text-[10px] font-mono text-white/30 tracking-widest mt-1">
                VUBAOKHANH.TECH BACKOFFICE
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-5 p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-xs font-mono text-red-400 select-text"
            >
              [ERROR]: {error}
            </motion.div>
          )}

          {/* Form fields */}
          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs select-text">
            <div className="space-y-1.5 select-text">
              <label className="text-white/40 font-bold tracking-wider block">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                placeholder="admin@vubaokhanh.tech"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-black/40 text-white placeholder-white/20 focus:border-[#00D9FF] focus:outline-none transition-colors"
              />
            </div>

            <div className="space-y-1.5 select-text">
              <label className="text-white/40 font-bold tracking-wider block">PASSWORD</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-black/40 text-white placeholder-white/20 focus:border-[#7C3AED] focus:outline-none transition-colors"
              />
            </div>

            <div className="pt-4 select-none">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-white text-black font-bold tracking-widest hover:bg-[#00D9FF] transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  "AUTHENTICATE"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
