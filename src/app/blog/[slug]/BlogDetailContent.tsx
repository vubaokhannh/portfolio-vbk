"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import type { BlogPost } from "@/data/posts";
import { Calendar, Clock, ArrowLeft, User, ChevronRight } from "lucide-react";

interface BlogDetailContentProps {
  postEn?: BlogPost;
  postVi?: BlogPost;
}

export default function BlogDetailContent({ postEn, postVi }: BlogDetailContentProps) {
  const { language } = useLanguage();
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  const activePostEn = postEn && (postEn.title?.trim() || postEn.content?.trim()) ? postEn : null;
  const activePostVi = postVi && (postVi.title?.trim() || postVi.content?.trim()) ? postVi : null;

  const rawPost = language === "en"
    ? (activePostEn || activePostVi)
    : (activePostVi || activePostEn);

  // Fallback for content if content in selected language is empty
  const contentFallback = language === "en"
    ? (postEn?.content?.trim() || postVi?.content?.trim() || "")
    : (postVi?.content?.trim() || postEn?.content?.trim() || "");

  const post = useMemo(() => {
    if (!rawPost) return null;
    return {
      ...rawPost,
      content: rawPost.content?.trim() || contentFallback,
    };
  }, [rawPost, contentFallback]);

  const isVi = language === "vi";

  // Parse HTML content to inject IDs to headings and extract the heading list
  const { processedContent, headings } = useMemo(() => {
    if (!post || !post.content) return { processedContent: "", headings: [] };

    let contentToProcess = post.content;
    // Format plain text to HTML paragraphs if no HTML elements exist
    if (!/<[a-z][\s\S]*>/i.test(contentToProcess)) {
      contentToProcess = contentToProcess
        .split(/\n\s*\n/)
        .map((para) => `<p>${para.replace(/\n/g, "<br/>")}</p>`)
        .join("");
    }

    const headingsList: { id: string; text: string; level: number }[] = [];
    let headingCounter = 0;

    const processed = contentToProcess.replace(
      /<(h2|h3)([^>]*?)>([\s\S]*?)<\/\1>/gi,
      (match, tag, attributes, contentText) => {
        // Strip internal tags
        const cleanText = contentText.replace(/<[^>]+>/g, "").trim();

        // Create standard slug from Vietnamese/English text
        const slug = cleanText
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "") // remove accents
          .replace(/đ/g, "d")
          .replace(/Đ/g, "d")
          .replace(/[^a-z0-9\s-]/g, "") // remove special chars
          .trim()
          .replace(/\s+/g, "-") // spaces to hyphens
          .replace(/-+/g, "-");

        const id = slug || `heading-${headingCounter++}`;
        headingsList.push({
          id,
          text: cleanText,
          level: tag.toLowerCase() === "h2" ? 2 : 3,
        });

        if (attributes.includes("id=")) {
          return match;
        }
        return `<${tag}${attributes} id="${id}">${contentText}</${tag}>`;
      }
    );

    return { processedContent: processed, headings: headingsList };
  }, [post]);

  // Highlight active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const navbarHeight = 110;
      let currentActiveId = "";

      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const el = document.getElementById(heading.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= navbarHeight) {
            currentActiveId = heading.id;
          }
        }
      }

      if (!currentActiveId && headings.length > 0) {
        currentActiveId = headings[0].id;
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  // Update document lang attribute dynamically for SEO language signals
  useEffect(() => {
    document.documentElement.lang = language === "vi" ? "vi" : "en";
  }, [language]);

  if (!post) return null;

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="select-text">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-[11px] font-mono text-white/30 mb-8 select-none" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#00D9FF] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/blog" className="hover:text-[#00D9FF] transition-colors">Blog</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="truncate text-white/50">{post.title}</span>
      </nav>

      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-white/55 hover:text-white transition-colors mb-6 group select-none"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        {isVi ? "Quay lại danh sách" : "Back to Articles"}
      </Link>

      {/* Grid wrapper for Article & TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start select-text">

        {/* Left Column: Article (8 cols on desktop) */}
        <article
          className="lg:col-span-8 space-y-8 select-text w-full min-w-0"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          {/* Header info */}
          <header className="space-y-5 select-text">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 select-none">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-[#00D9FF]/10 border border-[#00D9FF]/20 text-[#00D9FF]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white select-text"
              itemProp="headline"
            >
              {post.title}
            </h1>

            {/* Author & Metas */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-3 border-y border-white/[0.05] py-4 font-mono text-xs text-white/50 select-none">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#00D9FF]" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-violet-400" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00D9FF]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Mobile/Tablet Table of Contents */}
          {headings.length > 0 && (
            <div className="lg:hidden bg-[#0f1117]/40 border border-white/[0.05] rounded-xl p-4 mb-6 glass">
              <button
                onClick={() => setIsTocOpen(!isTocOpen)}
                className="flex items-center justify-between w-full font-mono text-xs font-bold uppercase tracking-wider text-white/80 cursor-pointer"
              >
                <span className="flex items-center gap-2 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                  {isVi ? "Mục lục bài viết" : "Table of Contents"}
                </span>
                <span className="text-white/40 text-[10px]">
                  {isTocOpen ? (isVi ? "[ Đóng ]" : "[ Close ]") : (isVi ? "[ Mở ]" : "[ Open ]")}
                </span>
              </button>

              {isTocOpen && (
                <div className="mt-4 pt-3 border-t border-white/[0.05] space-y-2.5 max-h-[60vh] overflow-y-auto scrollbar-hide">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToHeading(heading.id);
                        setIsTocOpen(false);
                      }}
                      className={`block text-xs transition-colors py-1 ${heading.level === 3 ? "pl-4 text-white/50" : "font-medium text-white/85"
                        } ${activeId === heading.id ? "!text-[#00D9FF]" : "hover:text-white"
                        }`}
                    >
                      {heading.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Main content body */}
          <div
            className="blog-content select-text"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />
        </article>

        {/* Right Column: Sticky Table of Contents (4 cols on desktop) */}
        {headings.length > 0 && (
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6 select-none w-full min-w-0">
            <div className="bg-[#0f1117]/30 border border-white/[0.05] rounded-2xl p-6 glass">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#00D9FF] mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
                {isVi ? "Mục lục" : "Table of Contents"}
              </h3>

              <div className="relative border-l border-white/[0.05] pl-4 space-y-3">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToHeading(heading.id);
                    }}
                    className={`group flex items-start text-[13px] leading-relaxed transition-all duration-200 cursor-pointer whitespace-normal break-words ${heading.level === 3
                      ? "pl-3 text-white/45 hover:text-white/80"
                      : "font-semibold text-white/60 hover:text-white/90"
                      } ${activeId === heading.id
                        ? "!text-[#00D9FF] font-semibold translate-x-1"
                        : ""
                      } hover:translate-x-1`}
                  >
                    <span>{heading.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        )}

      </div>
    </div>
  );
}
