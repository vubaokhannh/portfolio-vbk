"use client";

import { useEffect, useState } from "react";
import { supabase, uploadFile } from "@/lib/supabase";
import { projectsEn, projectsVi } from "@/data/projects";
import { clearBlogCache } from "@/lib/data-fetchers";
import { Trash2, Edit3, Plus, X } from "lucide-react";
import ColorInputPicker from "./ColorInputPicker";
import ConfirmModal from "./ConfirmModal";

interface ProjectDb {
  id: string;
  title_en: string;
  title_vi: string;
  description_en: string;
  description_vi: string;
  long_description_en: string;
  long_description_vi: string;
  tech: string[];
  features_en: string[];
  features_vi: string[];
  image: string;
  color: string;
  accent_color: string;
  status: string;
  year: string;
  github_url: string;
  live_url: string;
  sort_order: number;
}

interface Props {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function ProjectsManager({ showToast }: Props) {
  const [projects, setProjects] = useState<ProjectDb[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [editingItem, setEditingItem] = useState<ProjectDb | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLang, setFormLang] = useState<"en" | "vi">("en");

  const [id, setId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleVi, setTitleVi] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descVi, setDescVi] = useState("");
  const [longDescEn, setLongDescEn] = useState("");
  const [longDescVi, setLongDescVi] = useState("");
  const [techInput, setTechInput] = useState("");
  const [featuresEnInput, setFeaturesEnInput] = useState("");
  const [featuresViInput, setFeaturesViInput] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("#E0234E");
  const [accentColor, setAccentColor] = useState("rgba(224, 35, 78, 0.15)");
  const [status, setStatus] = useState("completed");
  const [year, setYear] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  // Confirm modal state
  const [confirmItem, setConfirmItem] = useState<ProjectDb | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        const initial = projectsEn.map((item, idx) => {
          const viItem = projectsVi.find((v) => v.id === item.id);
          return {
            id: item.id,
            title_en: item.title,
            title_vi: viItem?.title || item.title,
            description_en: item.description,
            description_vi: viItem?.description || item.description,
            long_description_en: item.longDescription || "",
            long_description_vi: viItem?.longDescription || "",
            tech: item.tech,
            features_en: item.features || [],
            features_vi: viItem?.features || [],
            image: item.image,
            color: item.color,
            accent_color: item.accentColor,
            status: item.status,
            year: item.year,
            github_url: item.githubUrl || "",
            live_url: item.liveUrl || "",
            sort_order: idx * 10,
          };
        });
        setProjects(initial);
      } else {
        setProjects(data);
      }
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to load projects.", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleStartCreate() {
    setEditingItem(null);
    setId("");
    setTitleEn("");
    setTitleVi("");
    setDescEn("");
    setDescVi("");
    setLongDescEn("");
    setLongDescVi("");
    setTechInput("");
    setFeaturesEnInput("");
    setFeaturesViInput("");
    setImage("/projects/placeholder.png");
    setColor("#00D9FF");
    setAccentColor("rgba(0, 217, 255, 0.15)");
    setStatus("completed");
    setYear(new Date().getFullYear().toString());
    setGithubUrl("");
    setLiveUrl("");
    setSortOrder(projects.length * 10);
    setShowForm(true);
  }

  function handleStartEdit(item: ProjectDb) {
    setEditingItem(item);
    setId(item.id);
    setTitleEn(item.title_en);
    setTitleVi(item.title_vi);
    setDescEn(item.description_en);
    setDescVi(item.description_vi);
    setLongDescEn(item.long_description_en || "");
    setLongDescVi(item.long_description_vi || "");
    setTechInput(item.tech ? item.tech.join(", ") : "");
    setFeaturesEnInput(item.features_en ? item.features_en.join("\n") : "");
    setFeaturesViInput(item.features_vi ? item.features_vi.join("\n") : "");
    setImage(item.image);
    setColor(item.color);
    setAccentColor(item.accent_color || "");
    setStatus(item.status);
    setYear(item.year);
    setGithubUrl(item.github_url || "");
    setLiveUrl(item.live_url || "");
    setSortOrder(item.sort_order || 0);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const tech = techInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const features_en = featuresEnInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const features_vi = featuresViInput
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      id: id.trim().toLowerCase().replace(/\s+/g, "-"),
      title_en: titleEn,
      title_vi: titleVi,
      description_en: descEn,
      description_vi: descVi,
      long_description_en: longDescEn,
      long_description_vi: longDescVi,
      tech,
      features_en,
      features_vi,
      image,
      color,
      accent_color: accentColor || `${color}15`,
      status,
      year,
      github_url: githubUrl,
      live_url: liveUrl,
      sort_order: Number(sortOrder),
    };

    try {
      if (!editingItem) {
        const { data } = await supabase.from("projects").select("id").eq("id", payload.id).maybeSingle();
        if (data) {
          throw new Error(`Project ID "${payload.id}" already exists. Please choose a different key.`);
        }
      }

      const { error } = await supabase.from("projects").upsert(payload);
      if (error) throw error;
      clearBlogCache();

      showToast(`Project ${editingItem ? "updated" : "created"} successfully!`, "success");
      setShowForm(false);
      loadProjects();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to save project.", "error");
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

  async function handleDelete(item: ProjectDb) {
    try {
      showToast("Deleting project...", "info");
      const { error } = await supabase.from("projects").delete().eq("id", item.id);
      if (error) throw error;
      clearBlogCache();

      showToast(`Project "${item.title_en}" deleted successfully!`, "success");
      loadProjects();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to delete project.", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-mono text-xs text-white/50">
        <span className="w-4 h-4 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mr-2" />
        LOADING PROJECTS FROM DATABASE...
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6 font-mono text-xs select-text">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Projects Manager</h2>
          <p className="text-[10px] text-white/40 mt-0.5">Manage details of projects showcased on your portfolio.</p>
        </div>
        {!showForm && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF] text-black font-bold tracking-wider hover:bg-[#00c0e0] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            ADD PROJECT
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
            {editingItem ? `Edit Project: ${editingItem.title_en}` : "Create New Project"}
          </h3>

          <form onSubmit={handleSave} className="space-y-4 select-text">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="text-white/40 font-bold block">PROJECT IDENTIFIER (ID/SLUG)</label>
                <input
                  type="text"
                  required
                  disabled={!!editingItem}
                  placeholder="e.g. krello-task-management"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">SORT ORDER</label>
                <input
                  type="number"
                  required
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
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
                    placeholder="Krello Task Management"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">SHORT DESCRIPTION (ENGLISH)</label>
                  <textarea
                    required={formLang === "en"}
                    rows={2}
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">LONG DESCRIPTION (ENGLISH)</label>
                  <textarea
                    rows={3}
                    value={longDescEn}
                    onChange={(e) => setLongDescEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">KEY FEATURES (ENGLISH, ONE PER LINE)</label>
                  <textarea
                    rows={3}
                    placeholder="Real-time UI syncing&#10;Fluid drag-and-drop"
                    value={featuresEnInput}
                    onChange={(e) => setFeaturesEnInput(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
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
                    placeholder="Hệ thống Quản lý Công việc Krello"
                    value={titleVi}
                    onChange={(e) => setTitleVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">SHORT DESCRIPTION (VIETNAMESE)</label>
                  <textarea
                    required={formLang === "vi"}
                    rows={2}
                    value={descVi}
                    onChange={(e) => setDescVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">LONG DESCRIPTION (VIETNAMESE)</label>
                  <textarea
                    rows={3}
                    value={longDescVi}
                    onChange={(e) => setLongDescVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">KEY FEATURES (VIETNAMESE, ONE PER LINE)</label>
                  <textarea
                    rows={3}
                    placeholder="Đồng bộ giao diện thời gian thực&#10;Kéo thả thẻ mượt mà"
                    value={featuresViInput}
                    onChange={(e) => setFeaturesViInput(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="text-white/40 font-bold block">IMAGE PATH / PREVIEW URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="/projects/krello.png"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
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
                      onChange={(e) => handleFileUpload(e, setImage, "projects")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">COMPLETION YEAR (YEAR PICKER)</label>
                <input
                  type="number"
                  min="2015"
                  max="2035"
                  step="1"
                  required
                  placeholder="2026"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none [color-scheme:dark]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">STATUS</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">GITHUB REPOSITORY URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">LIVE DEMO URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ColorInputPicker
                label="THEME COLOR (HEX)"
                value={color}
                onChange={(newColor) => {
                  setColor(newColor);
                  if (!accentColor || accentColor.includes("rgba")) {
                    setAccentColor(`${newColor}15`);
                  }
                }}
                placeholder="#E0234E"
              />
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">GLOW COLOR (RGBA/HEX)</label>
                <input
                  type="text"
                  required
                  placeholder="rgba(224, 35, 78, 0.15)"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">THEME PREVIEW</label>
                <div
                  className="h-10 rounded-xl border flex items-center justify-center font-bold tracking-widest text-[10px]"
                  style={{ backgroundColor: accentColor || `${color}15`, color, borderColor: `${color}25` }}
                >
                  PREVIEW CARD
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold tracking-wider cursor-pointer disabled:opacity-50"
              >
                {saving ? "SAVING..." : "SAVE PROJECT"}
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

      {/* Projects List Table */}
      {!showForm && (
        <div className="rounded-2xl border border-white/[0.06] overflow-x-auto select-text">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#0A0C10]/80 border-b border-white/[0.06] text-white/40 font-bold select-none">
                <th className="p-4 w-12 text-center">ORDER</th>
                <th className="p-4">PROJECT (EN / VI)</th>
                <th className="p-4 w-20">YEAR</th>
                <th className="p-4">TECH STACK</th>
                <th className="p-4 text-center w-28">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/30">
                    No projects found in database. Pre-filled fallbacks will be displayed on the website.
                  </td>
                </tr>
              ) : (
                projects.map((item) => (
                  <tr key={item.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors select-text">
                    <td className="p-4 text-center text-white/40 font-bold">{item.sort_order}</td>
                    <td className="p-4 space-y-1">
                      <div className="text-white font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.title_en}
                      </div>
                      <div className="text-white/40 font-semibold pl-4">{item.title_vi}</div>
                    </td>
                    <td className="p-4 text-white/60">{item.year}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.tech?.map((t: string) => (
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
        title="Delete Project?"
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
