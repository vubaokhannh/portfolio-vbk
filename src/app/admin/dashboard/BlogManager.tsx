"use client";

import { useEffect, useState } from "react";
import { supabase, uploadFile } from "@/lib/supabase";
import { postsEn, postsVi } from "@/data/posts";
import { clearBlogCache } from "@/lib/data-fetchers";
import { Trash2, Edit3, Plus, X } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import ConfirmModal from "./ConfirmModal";

interface BlogPostDb {
  slug: string;
  title_en: string;
  title_vi: string;
  description_en: string;
  description_vi: string;
  content_en: string;
  content_vi: string;
  date_en: string;
  date_vi: string;
  iso_date: string;
  tags: string[];
  author_en: string;
  author_vi: string;
  read_time_en: string;
  read_time_vi: string;
  cover_image: string;
}

interface Props {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function BlogManager({ showToast }: Props) {
  const [posts, setPosts] = useState<BlogPostDb[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [editingItem, setEditingItem] = useState<BlogPostDb | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLang, setFormLang] = useState<"en" | "vi">("en");

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [slug, setSlug] = useState("");

  /** Convert any title string to a URL-safe slug */
  function generateSlug(title: string): string {
    return title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // strip diacritics (Vietnamese, etc.)
      .toLowerCase()
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "") // keep alphanumeric + spaces + hyphens
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-"); // collapse multiple hyphens
  }
  const [titleEn, setTitleEn] = useState("");
  const [titleVi, setTitleVi] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descVi, setDescVi] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentVi, setContentVi] = useState("");
  const [dateEn, setDateEn] = useState("");
  const [dateVi, setDateVi] = useState("");
  const [isoDate, setIsoDate] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [authorEn, setAuthorEn] = useState("Vu Bao Khanh");
  const [authorVi, setAuthorVi] = useState("Vũ Bảo Khanh");
  const [readTimeEn, setReadTimeEn] = useState("");
  const [readTimeVi, setReadTimeVi] = useState("");
  const [coverImage, setCoverImage] = useState("/og-image.png");

  // Confirm modal state
  const [confirmItem, setConfirmItem] = useState<BlogPostDb | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("iso_date", { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        const initial = postsEn.map((item) => {
          const viItem = postsVi.find((v) => v.slug === item.slug);
          return {
            slug: item.slug,
            title_en: item.title,
            title_vi: viItem?.title || item.title,
            description_en: item.description,
            description_vi: viItem?.description || item.description,
            content_en: item.content,
            content_vi: viItem?.content || item.content,
            date_en: item.date,
            date_vi: viItem?.date || item.date,
            iso_date: item.isoDate,
            tags: item.tags,
            author_en: item.author,
            author_vi: viItem?.author || item.author,
            read_time_en: item.readTime,
            read_time_vi: viItem?.readTime || item.readTime,
            cover_image: item.coverImage,
          };
        });
        setPosts(initial);
      } else {
        setPosts(data);
      }
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to load blog posts.", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleStartCreate() {
    setEditingItem(null);
    setSlugManuallyEdited(false);
    setSlug("");
    setTitleEn("");
    setTitleVi("");
    setDescEn("");
    setDescVi("");
    setContentEn("");
    setContentVi("");
    const today = new Date();
    setIsoDate(today.toISOString().split("T")[0]);
    setDateEn(today.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }));
    setDateVi(`${today.getDate()} Tháng ${today.getMonth() + 1}, ${today.getFullYear()}`);
    setTagsInput("");
    setAuthorEn("Vu Bao Khanh");
    setAuthorVi("Vũ Bảo Khanh");
    setReadTimeEn("10 min read");
    setReadTimeVi("10 phút đọc");
    setCoverImage("/og-image.png");
    setShowForm(true);
  }

  function handleStartEdit(item: BlogPostDb) {
    setEditingItem(item);
    setSlug(item.slug);
    setTitleEn(item.title_en);
    setTitleVi(item.title_vi);
    setDescEn(item.description_en);
    setDescVi(item.description_vi);
    setContentEn(item.content_en);
    setContentVi(item.content_vi);
    setDateEn(item.date_en);
    setDateVi(item.date_vi);
    setIsoDate(item.iso_date);
    setTagsInput(item.tags ? item.tags.join(", ") : "");
    setAuthorEn(item.author_en || "Vu Bao Khanh");
    setAuthorVi(item.author_vi || "Vũ Bảo Khanh");
    setReadTimeEn(item.read_time_en || "");
    setReadTimeVi(item.read_time_vi || "");
    setCoverImage(item.cover_image || "/og-image.png");
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const tags = tagsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const finalTitleEn = titleEn.trim() || titleVi.trim();
    const finalTitleVi = titleVi.trim() || titleEn.trim();
    const finalDescEn = descEn.trim() || descVi.trim();
    const finalDescVi = descVi.trim() || descEn.trim();
    const finalContentEn = contentEn.trim() || contentVi.trim();
    const finalContentVi = contentVi.trim() || contentEn.trim();
    const finalDateEn = dateEn.trim() || dateVi.trim();
    const finalDateVi = dateVi.trim() || dateEn.trim();
    const finalAuthorEn = authorEn.trim() || authorVi.trim();
    const finalAuthorVi = authorVi.trim() || authorEn.trim();
    const finalReadTimeEn = readTimeEn.trim() || readTimeVi.trim();
    const finalReadTimeVi = readTimeVi.trim() || readTimeEn.trim();

    if (!finalTitleEn) {
      showToast("Vui lòng nhập tiêu đề bài viết.", "error");
      setSaving(false);
      return;
    }

    const payload = {
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-"),
      title_en: finalTitleEn,
      title_vi: finalTitleVi,
      description_en: finalDescEn,
      description_vi: finalDescVi,
      content_en: finalContentEn,
      content_vi: finalContentVi,
      date_en: finalDateEn,
      date_vi: finalDateVi,
      iso_date: isoDate,
      tags,
      author_en: finalAuthorEn,
      author_vi: finalAuthorVi,
      read_time_en: finalReadTimeEn,
      read_time_vi: finalReadTimeVi,
      cover_image: coverImage,
    };

    try {
      if (!editingItem) {
        const { data } = await supabase.from("blog_posts").select("slug").eq("slug", payload.slug).maybeSingle();
        if (data) {
          throw new Error(`Blog slug "${payload.slug}" already exists. Please choose a different slug.`);
        }
      }

      const { error } = await supabase.from("blog_posts").upsert(payload);
      if (error) throw error;

      clearBlogCache();
      showToast(`Blog post ${editingItem ? "updated" : "created"} successfully!`, "success");
      setShowForm(false);
      loadPosts();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to save blog post.", "error");
    } finally {
      setSaving(false);
    }
  }

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void,
    folder: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    showToast("Uploading file...", "info");
    try {
      const url = await uploadFile(file, folder);
      setter(url);
      showToast("Uploaded successfully!", "success");
    } catch (err) {
      showToast((err as Error).message, "error");
    } finally {
      setUploading(false);
    }
  };
 
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // YYYY-MM-DD
    setIsoDate(val);
    if (val) {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        const enStr = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
        setDateEn(enStr);
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        setDateVi(`${day} Tháng ${month}, ${year}`);
      }
    }
  };

  async function handleDelete(item: BlogPostDb) {
    try {
      showToast("Deleting blog post...", "info");
      const { error } = await supabase.from("blog_posts").delete().eq("slug", item.slug);
      if (error) throw error;

      clearBlogCache();
      showToast(`Blog post "${item.title_en}" deleted successfully!`, "success");
      loadPosts();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to delete blog post.", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-mono text-xs text-white/50">
        <span className="w-4 h-4 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mr-2" />
        LOADING BLOG POSTS FROM DATABASE...
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6 font-mono text-xs select-text">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Blog Manager</h2>
          <p className="text-[10px] text-white/40 mt-0.5">Manage articles published on your technical blog.</p>
        </div>
        {!showForm && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF] text-black font-bold tracking-wider hover:bg-[#00c0e0] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            WRITE POST
          </button>
        )}
      </div>

      {/* Form Overlay */}
      {showForm && (
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-black/40 space-y-4 relative select-text">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            {editingItem ? `Edit Post: ${editingItem.title_en}` : "Create New Post"}
          </h3>

          <form onSubmit={handleSave} className="space-y-4 select-text">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">BLOG SLUG (URL PATHNAME)</label>
                <input
                  type="text"
                  required
                  disabled={!!editingItem}
                  placeholder="e.g. debugging-production-performance"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugManuallyEdited(true); // stop auto-fill once user edits manually
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">COVER IMAGE PATH</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="/og-image.png"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="flex-grow px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                  <label className="px-4 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-white cursor-pointer font-bold flex items-center justify-center shrink-0 min-w-[90px] transition-colors relative">
                    {uploading ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "UPLOAD"
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => handleFileUpload(e, setCoverImage, "blog")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* General Blog Fields (ISO Date & Tags) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">PUBLISH DATE (CALENDAR PICKER)</label>
                <input
                  type="date"
                  required
                  value={isoDate}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none [color-scheme:dark]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">TAGS (COMMA-SEPARATED)</label>
                <input
                  type="text"
                  placeholder="Laravel, PHP, Careers"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>
            </div>

            {/* Language Content Tabs */}
            <div className="flex gap-2 border-b border-white/[0.06] pb-3 mb-4 select-none">
              <button
                type="button"
                onClick={() => setFormLang("en")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-[10px] cursor-pointer ${
                  formLang === "en"
                    ? "bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20"
                    : "text-white/40 border border-transparent hover:text-white"
                }`}
              >
                ENGLISH CONTENT
              </button>
              <button
                type="button"
                onClick={() => setFormLang("vi")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all text-[10px] cursor-pointer ${
                  formLang === "vi"
                    ? "bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20"
                    : "text-white/40 border border-transparent hover:text-white"
                }`}
              >
                VIETNAMESE CONTENT
              </button>
            </div>

            {formLang === "en" ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">TITLE (ENGLISH)</label>
                  <input
                    type="text"
                    required={formLang === "en"}
                    placeholder="Who is Vu Bao Khanh?"
                    value={titleEn}
                    onChange={(e) => {
                      setTitleEn(e.target.value);
                      // Auto-generate slug from EN title when creating new post
                      if (!editingItem && !slugManuallyEdited) {
                        setSlug(generateSlug(e.target.value));
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">SUMMARY DESCRIPTION (ENGLISH)</label>
                  <textarea
                    required={formLang === "en"}
                    rows={2}
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/40 font-bold block">DATE (ENGLISH)</label>
                    <input
                      type="text"
                      required={formLang === "en"}
                      placeholder="July 13, 2026"
                      value={dateEn}
                      onChange={(e) => setDateEn(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/40 font-bold block">READ TIME (ENGLISH)</label>
                    <input
                      type="text"
                      required={formLang === "en"}
                      placeholder="15 min read"
                      value={readTimeEn}
                      onChange={(e) => setReadTimeEn(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/40 font-bold block">AUTHOR (ENGLISH)</label>
                    <input
                      type="text"
                      required={formLang === "en"}
                      value={authorEn}
                      onChange={(e) => setAuthorEn(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">ARTICLE CONTENT (ENGLISH)</label>
                  <RichTextEditor
                    value={contentEn}
                    onChange={setContentEn}
                    placeholder="Write English article content with headings, lists, code blocks, images..."
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">TITLE (VIETNAMESE)</label>
                  <input
                    type="text"
                    required={formLang === "vi"}
                    placeholder="Vũ Bảo Khanh Là Ai?"
                    value={titleVi}
                    onChange={(e) => {
                      setTitleVi(e.target.value);
                      // Auto-generate slug if EN title is empty and creating new post
                      if (!editingItem && !slugManuallyEdited && !titleEn) {
                        setSlug(generateSlug(e.target.value));
                      }
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">SUMMARY DESCRIPTION (VIETNAMESE)</label>
                  <textarea
                    required={formLang === "vi"}
                    rows={2}
                    value={descVi}
                    onChange={(e) => setDescVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-white/40 font-bold block">DATE (VIETNAMESE)</label>
                    <input
                      type="text"
                      required={formLang === "vi"}
                      placeholder="13 Tháng 7, 2026"
                      value={dateVi}
                      onChange={(e) => setDateVi(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/40 font-bold block">READ TIME (VIETNAMESE)</label>
                    <input
                      type="text"
                      required={formLang === "vi"}
                      placeholder="15 phút đọc"
                      value={readTimeVi}
                      onChange={(e) => setReadTimeVi(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-white/40 font-bold block">AUTHOR (VIETNAMESE)</label>
                    <input
                      type="text"
                      required={formLang === "vi"}
                      value={authorVi}
                      onChange={(e) => setAuthorVi(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">ARTICLE CONTENT (VIETNAMESE)</label>
                  <RichTextEditor
                    value={contentVi}
                    onChange={setContentVi}
                    placeholder="Viết nội dung bài viết tiếng Việt với tiêu đề, danh sách, đoạn code..."
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold tracking-wider cursor-pointer disabled:opacity-50"
              >
                {saving ? "PUBLISHING..." : "PUBLISH POST"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white hover:bg-white/[0.05] hover:border-white/[0.12] transition-colors cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog List Table */}
      {!showForm && (
        <div className="rounded-2xl border border-white/[0.06] overflow-x-auto select-text">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#0A0C10]/80 border-b border-white/[0.06] text-white/40 font-bold select-none">
                <th className="p-4">PUBLISHED DATE</th>
                <th className="p-4">TITLE (EN / VI)</th>
                <th className="p-4">SLUG</th>
                <th className="p-4">TAGS</th>
                <th className="p-4 text-center w-28">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/30">
                    No articles found in database. Pre-filled fallbacks will be displayed on the website.
                  </td>
                </tr>
              ) : (
                posts.map((item) => (
                  <tr key={item.slug} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors select-text">
                    <td className="p-4 text-white/60 font-bold">{item.iso_date}</td>
                    <td className="p-4 space-y-1">
                      <div className="text-white font-bold">{item.title_en}</div>
                      <div className="text-white/40 font-semibold">{item.title_vi}</div>
                    </td>
                    <td className="p-4 text-cyan-400 font-bold">/{item.slug}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.map((t: string) => (
                          <span key={t} className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[9px] text-white/45">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2 select-none">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-[#00D9FF] hover:border-[#00D9FF]/20 hover:bg-[#00D9FF]/5 transition-all cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setConfirmItem(item)}
                          className="p-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-red-400 hover:border-red-400/20 hover:bg-red-400/5 transition-all cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={!!confirmItem}
        title="Delete Blog Post?"
        itemName={confirmItem ? confirmItem.title_en : undefined}
        onConfirm={() => {
          if (confirmItem) handleDelete(confirmItem);
          setConfirmItem(null);
        }}
        onCancel={() => setConfirmItem(null)}
      />
    </>
  );
}
