"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { experienceEn, experienceVi } from "@/data/experience";
import { clearBlogCache } from "@/lib/data-fetchers";
import { Trash2, Edit3, Plus, X } from "lucide-react";
import ColorInputPicker from "./ColorInputPicker";
import ConfirmModal from "./ConfirmModal";

interface ExperienceDb {
  id: string;
  company: string;
  role_en: string;
  role_vi: string;
  duration_en: string;
  duration_vi: string;
  description_en: string;
  description_vi: string;
  tags: string[];
  color: string;
  sort_order: number;
}

interface Props {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function ExperienceManager({ showToast }: Props) {
  const [experiences, setExperiences] = useState<ExperienceDb[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [editingItem, setEditingItem] = useState<ExperienceDb | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLang, setFormLang] = useState<"en" | "vi">("en");

  const [id, setId] = useState("");
  const [company, setCompany] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [roleVi, setRoleVi] = useState("");
  const [durationEn, setDurationEn] = useState("");
  const [durationVi, setDurationVi] = useState("");
  const [startMonth, setStartMonth] = useState("2026-01");
  const [endMonth, setEndMonth] = useState("");
  const [isCurrentJob, setIsCurrentJob] = useState(true);
  const [descEn, setDescEn] = useState("");
  const [descVi, setDescVi] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [color, setColor] = useState("#7C3AED");
  const [sortOrder, setSortOrder] = useState(0);

  // Confirm modal state
  const [confirmItem, setConfirmItem] = useState<ExperienceDb | null>(null);

  function handleMonthPickerChange(startVal: string, endVal: string, isCurrent: boolean) {
    setStartMonth(startVal);
    setEndMonth(endVal);
    setIsCurrentJob(isCurrent);

    if (startVal) {
      const [startYearStr, startMonthStr] = startVal.split("-");
      const startDate = new Date(Number(startYearStr), Number(startMonthStr) - 1, 1);
      const startEn = startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
      const startVi = `Tháng ${Number(startMonthStr)} ${startYearStr}`;

      let endEn = "Present";
      let endVi = "Hiện tại";

      if (!isCurrent && endVal) {
        const [endYearStr, endMonthStr] = endVal.split("-");
        const endDate = new Date(Number(endYearStr), Number(endMonthStr) - 1, 1);
        endEn = endDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        endVi = `Tháng ${Number(endMonthStr)} ${endYearStr}`;
      }

      setDurationEn(`${startEn} - ${endEn}`);
      setDurationVi(`${startVi} - ${endVi}`);
    }
  }

  useEffect(() => {
    loadExperiences();
  }, []);

  async function loadExperiences() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        // Pre-fill states from static JSON for visual clarity if database is empty
        const initial = experienceEn.map((item, idx) => {
          const viItem = experienceVi.find((v) => v.id === item.id);
          return {
            id: item.id,
            company: item.company,
            role_en: item.role,
            role_vi: viItem?.role || item.role,
            duration_en: item.duration,
            duration_vi: viItem?.duration || item.duration,
            description_en: item.description,
            description_vi: viItem?.description || item.description,
            tags: item.tags,
            color: item.color,
            sort_order: idx * 10,
          };
        });
        setExperiences(initial);
      } else {
        setExperiences(data);
      }
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to load experiences.", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleStartCreate() {
    setEditingItem(null);
    setId("");
    setCompany("");
    setRoleEn("");
    setRoleVi("");
    setDurationEn("");
    setDurationVi("");
    setDescEn("");
    setDescVi("");
    setTagsInput("");
    setColor("#7C3AED");
    setSortOrder(experiences.length * 10);
    setShowForm(true);
  }

  function handleStartEdit(item: ExperienceDb) {
    setEditingItem(item);
    setId(item.id);
    setCompany(item.company);
    setRoleEn(item.role_en);
    setRoleVi(item.role_vi);
    setDurationEn(item.duration_en || "");
    setDurationVi(item.duration_vi || "");
    setDescEn(item.description_en);
    setDescVi(item.description_vi);
    setTagsInput(item.tags ? item.tags.join(", ") : "");
    setColor(item.color);
    setSortOrder(item.sort_order || 0);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const tags = tagsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      id: id.trim().toLowerCase().replace(/\s+/g, "-"),
      company,
      role_en: roleEn,
      role_vi: roleVi,
      duration_en: durationEn,
      duration_vi: durationVi,
      description_en: descEn,
      description_vi: descVi,
      tags,
      color,
      sort_order: Number(sortOrder),
    };

    try {
      if (!editingItem) {
        const { data } = await supabase.from("experience").select("id").eq("id", payload.id).maybeSingle();
        if (data) {
          throw new Error(`Experience ID "${payload.id}" already exists. Please choose a different key.`);
        }
      }

      const { error } = await supabase.from("experience").upsert(payload);
      if (error) throw error;
      clearBlogCache();
      showToast(`Work experience ${editingItem ? "updated" : "created"} successfully!`, "success");
      setShowForm(false);
      loadExperiences();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to save experience.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: ExperienceDb) {
    try {
      showToast("Deleting experience...", "info");
      const { error } = await supabase.from("experience").delete().eq("id", item.id);
      if (error) throw error;
      clearBlogCache();
      showToast(`Work experience item deleted successfully!`, "success");
      loadExperiences();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to delete experience.", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-mono text-xs text-white/50">
        <span className="w-4 h-4 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mr-2" />
        LOADING EXPERIENCES FROM DATABASE...
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6 font-mono text-xs select-text">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Experience Manager</h2>
          <p className="text-[10px] text-white/40 mt-0.5">Manage work experience details and timelines.</p>
        </div>
        {!showForm && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF] text-black font-bold tracking-wider hover:bg-[#00c0e0] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            ADD EXPERIENCE
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
            {editingItem ? `Edit Experience: ${editingItem.company}` : "Create New Experience"}
          </h3>

          <form onSubmit={handleSave} className="space-y-4 select-text">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5 col-span-2">
                <label className="text-white/40 font-bold block">EXPERIENCE ID</label>
                <input
                  type="text"
                  required
                  disabled={!!editingItem}
                  placeholder="e.g. bmweb-developer"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">COMPANY NAME</label>
                <input
                  type="text"
                  required
                  placeholder="BM WEB"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>
              <ColorInputPicker
                label="THEME COLOR (HEX)"
                value={color}
                onChange={setColor}
                placeholder="#7C3AED"
              />
            </div>

            {/* Calendar Month Picker for Experience Period */}
            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/30 space-y-3">
              <label className="text-white/40 font-bold block text-[10px]">WORK PERIOD CALENDAR SELECTOR (TỰ ĐỘNG ĐỊNH DẠNG NGÀY THÁNG)</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div>
                  <label className="text-[10px] text-white/40 block mb-1">START MONTH</label>
                  <input
                    type="month"
                    value={startMonth}
                    onChange={(e) => handleMonthPickerChange(e.target.value, endMonth, isCurrentJob)}
                    className="w-full px-3 py-2 rounded-lg border border-white/[0.06] bg-black/60 text-white text-xs [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-white/40 block mb-1">END MONTH</label>
                  <input
                    type="month"
                    disabled={isCurrentJob}
                    value={endMonth}
                    onChange={(e) => handleMonthPickerChange(startMonth, e.target.value, false)}
                    className="w-full px-3 py-2 rounded-lg border border-white/[0.06] bg-black/60 text-white text-xs disabled:opacity-30 [color-scheme:dark]"
                  />
                </div>
                <label className="flex items-center gap-2 pt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCurrentJob}
                    onChange={(e) => handleMonthPickerChange(startMonth, endMonth, e.target.checked)}
                    className="w-4 h-4 rounded accent-[#00D9FF] cursor-pointer"
                  />
                  <span className="text-[11px] font-bold text-white/80">CURRENT JOB (PRESENT)</span>
                </label>
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
                  <label className="text-white/40 font-bold block">ROLE (ENGLISH)</label>
                  <input
                    type="text"
                    required={formLang === "en"}
                    placeholder="Fullstack PHP Developer"
                    value={roleEn}
                    onChange={(e) => setRoleEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">DURATION / PERIOD (ENGLISH)</label>
                  <input
                    type="text"
                    required={formLang === "en"}
                    placeholder="Jan 2026 - Present"
                    value={durationEn}
                    onChange={(e) => setDurationEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">DESCRIPTION (ENGLISH)</label>
                  <textarea
                    required={formLang === "en"}
                    rows={3}
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">ROLE (VIETNAMESE)</label>
                  <input
                    type="text"
                    required={formLang === "vi"}
                    placeholder="Nhà phát triển Fullstack PHP"
                    value={roleVi}
                    onChange={(e) => setRoleVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">DURATION / PERIOD (VIETNAMESE)</label>
                  <input
                    type="text"
                    required={formLang === "vi"}
                    placeholder="Tháng 1 2026 - Hiện tại"
                    value={durationVi}
                    onChange={(e) => setDurationVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">DESCRIPTION (VIETNAMESE)</label>
                  <textarea
                    required={formLang === "vi"}
                    rows={3}
                    value={descVi}
                    onChange={(e) => setDescVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">TECHNOLOGY STACK / TAGS (COMMA-SEPARATED)</label>
              <input
                type="text"
                placeholder="PHP, Laravel, React, MySQL"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold tracking-wider cursor-pointer disabled:opacity-50"
              >
                {saving ? "SAVING..." : "SAVE EXPERIENCE"}
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

      {/* Experiences List Table */}
      {!showForm && (
        <div className="rounded-2xl border border-white/[0.06] overflow-x-auto select-text">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#0A0C10]/80 border-b border-white/[0.06] text-white/40 font-bold select-none">
                <th className="p-4 w-12 text-center">ORDER</th>
                <th className="p-4">COMPANY & ROLE (EN / VI)</th>
                <th className="p-4">DURATION</th>
                <th className="p-4">TAGS</th>
                <th className="p-4 text-center w-28">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/30">
                    No experiences found in database. Pre-filled fallbacks will be displayed on the website.
                  </td>
                </tr>
              ) : (
                experiences.map((item) => (
                  <tr key={item.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors select-text">
                    <td className="p-4 text-center text-white/40 font-bold">{item.sort_order}</td>
                    <td className="p-4 space-y-1">
                      <div className="text-white font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.company}
                      </div>
                      <div className="text-white/60 font-semibold pl-4">{item.role_en}</div>
                      <div className="text-white/30 font-medium pl-4">{item.role_vi}</div>
                    </td>
                    <td className="p-4 text-white/60 space-y-1">
                      <div>{item.duration_en}</div>
                      <div className="text-white/30">{item.duration_vi}</div>
                    </td>
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
        title="Delete Experience?"
        itemName={confirmItem ? `${confirmItem.company} — ${confirmItem.role_en}` : undefined}
        onConfirm={() => {
          if (confirmItem) handleDelete(confirmItem);
          setConfirmItem(null);
        }}
        onCancel={() => setConfirmItem(null)}
      />
    </>
  );
}
