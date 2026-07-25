"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      alert("Supabase has not been configured in .env.local yet!");
      router.replace("/");
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/login");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-mono text-xs">
      <div className="flex flex-col items-center gap-3">
        <span className="w-5 h-5 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin" />
        <span className="tracking-widest opacity-60">VERIFYING ADMINISTRATIVE ACCESS...</span>
      </div>
    </div>
  );
}
