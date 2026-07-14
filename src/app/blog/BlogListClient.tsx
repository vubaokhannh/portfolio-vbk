"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { postsEn, postsVi } from "@/data/posts";
import { useLanguage } from "@/hooks/useLanguage";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

export default function BlogListClient() {
  const { language } = useLanguage();
  const posts = language === "en" ? postsEn : postsVi;
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  const isVi = language === "vi";

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header titles */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
              {isVi ? "Chia sẻ kiến thức" : "Knowledge Base"}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            {isVi ? "Blog & Bài viết" : "Technical Blog"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed"
          >
            {isVi
              ? "Các bài viết chia sẻ về tối ưu hiệu suất, hệ thống thời gian thực, kiến trúc backend và mẹo phát triển web."
              : "Deep dives on backend scaling, real-time systems, Laravel performance hacks, and frontend components."}
          </motion.p>
        </div>

        {/* Tags Filtering Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-1.5 rounded-xl font-mono text-xs border transition-all ${
              selectedTag === null
                ? "bg-[#00D9FF] text-black border-[#00D9FF] font-bold"
                : "bg-white/[0.02] border-white/[0.05] text-white/60 hover:text-white hover:border-white/10"
            }`}
          >
            {isVi ? "Tất cả" : "All Posts"}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-xl font-mono text-xs border transition-all flex items-center gap-1.5 ${
                selectedTag === tag
                  ? "bg-[#7C3AED] text-white border-[#7C3AED] font-bold"
                  : "bg-white/[0.02] border-white/[0.05] text-white/50 hover:text-white hover:border-white/10"
              }`}
            >
              <Tag className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Grid Layout of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto select-text">
          {filteredPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-[#0F1117]/80 backdrop-blur-xl overflow-hidden hover:border-white/12 transition-all duration-300"
            >
              {/* Visual Glow Header background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle 180px at 50% 0px, rgba(124,58,237,0.06), transparent 100%)`,
                }}
              />

              <div className="p-6 md:p-8 space-y-4">
                {/* Meta date & read time */}
                <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title & Desc */}
                <div className="space-y-2">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#00D9FF] transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Tags list */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/[0.05] bg-white/[0.02] text-white/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer read link */}
              <div className="p-6 md:p-8 pt-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-[#00D9FF] hover:text-[#00D9FF]/80 hover:underline transition-colors mt-2"
                >
                  {isVi ? "Đọc bài viết" : "Read Article"}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
