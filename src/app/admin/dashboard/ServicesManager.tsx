"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { servicesEn, servicesVi } from "@/data/services";
import { clearBlogCache } from "@/lib/data-fetchers";
import { Trash2, Edit3, Plus, X } from "lucide-react";
import ColorInputPicker from "./ColorInputPicker";
import ConfirmModal from "./ConfirmModal";

interface ServiceDb {
  id: string;
  title_en: string;
  title_vi: string;
  description_en: string;
  description_vi: string;
  icon: string;
  color: string;
  tags: string[];
  sort_order: number;
}

interface Props {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function ServicesManager({ showToast }: Props) {
  const [services, setServices] = useState<ServiceDb[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [editingItem, setEditingItem] = useState<ServiceDb | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formLang, setFormLang] = useState<"en" | "vi">("en");

  const [id, setId] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleVi, setTitleVi] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descVi, setDescVi] = useState("");
  const [icon, setIcon] = useState("globe");
  const [color, setColor] = useState("#00D9FF");
  const [tagsInput, setTagsInput] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  // Confirm modal state
  const [confirmItem, setConfirmItem] = useState<ServiceDb | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        // Pre-fill states from static JSON for visual clarity if database is empty
        const initial = servicesEn.map((item, idx) => {
          const viItem = servicesVi.find((v) => v.id === item.id);
          return {
            id: item.id,
            title_en: item.title,
            title_vi: viItem?.title || item.title,
            description_en: item.description,
            description_vi: viItem?.description || item.description,
            icon: item.icon,
            color: item.color,
            tags: item.tags,
            sort_order: idx * 10,
          };
        });
        setServices(initial);
      } else {
        setServices(data);
      }
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to load services.", "error");
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
    setIcon("globe");
    setColor("#00D9FF");
    setTagsInput("");
    setSortOrder(services.length * 10);
    setShowForm(true);
  }

  function handleStartEdit(item: ServiceDb) {
    setEditingItem(item);
    setId(item.id);
    setTitleEn(item.title_en);
    setTitleVi(item.title_vi);
    setDescEn(item.description_en);
    setDescVi(item.description_vi);
    setIcon(item.icon);
    setColor(item.color);
    setTagsInput(item.tags ? item.tags.join(", ") : "");
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
      title_en: titleEn,
      title_vi: titleVi,
      description_en: descEn,
      description_vi: descVi,
      icon,
      color,
      tags,
      sort_order: Number(sortOrder),
    };

    try {
      // If creating new, check if ID already exists (since ID is custom string)
      if (!editingItem) {
        const { data } = await supabase.from("services").select("id").eq("id", payload.id).maybeSingle();
        if (data) {
          throw new Error(`Service ID "${payload.id}" already exists. Please use a different name or edit the existing one.`);
        }
      }

      const { error } = await supabase.from("services").upsert(payload);
      if (error) throw error;
      clearBlogCache();
      showToast(`Service ${editingItem ? "updated" : "created"} successfully!`, "success");
      setShowForm(false);
      loadServices();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to save service.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: ServiceDb) {
    try {
      showToast("Deleting service...", "info");
      const { error } = await supabase.from("services").delete().eq("id", item.id);
      if (error) throw error;
      clearBlogCache();
      showToast(`Service "${item.title_en}" deleted successfully!`, "success");
      loadServices();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to delete service.", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-mono text-xs text-white/50">
        <span className="w-4 h-4 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mr-2" />
        LOADING SERVICES FROM DATABASE...
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6 font-mono text-xs select-text">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Services Manager</h2>
          <p className="text-[10px] text-white/40 mt-0.5">Manage services offered on your website.</p>
        </div>
        {!showForm && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D9FF] text-black font-bold tracking-wider hover:bg-[#00c0e0] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            ADD SERVICE
          </button>
        )}
      </div>



      {/* Form overlay/container */}
      {showForm && (
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-black/40 space-y-4 relative select-text">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            {editingItem ? `Edit Service: ${editingItem.title_en}` : "Create New Service"}
          </h3>

          <form onSubmit={handleSave} className="space-y-4 select-text">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">SERVICE IDENTIFIER (ID)</label>
                <input
                  type="text"
                  required
                  disabled={!!editingItem}
                  placeholder="e.g. web-dev"
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
                    placeholder="Custom Web Development"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">DESCRIPTION (ENGLISH)</label>
                  <textarea
                    required={formLang === "en"}
                    rows={2}
                    value={descEn}
                    onChange={(e) => setDescEn(e.target.value)}
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
                    placeholder="Phát triển Web Tùy biến"
                    value={titleVi}
                    onChange={(e) => setTitleVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-white/40 font-bold block">DESCRIPTION (VIETNAMESE)</label>
                  <textarea
                    required={formLang === "vi"}
                    rows={2}
                    value={descVi}
                    onChange={(e) => setDescVi(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">ICON TYPE</label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                >
                  <option value="globe">Globe (Web/Global)</option>
                  <option value="shopping-bag">Shopping Bag (Ecommerce)</option>
                  <option value="layers">Layers (Admin ERP panels)</option>
                  <option value="zap">Zap (Performance/Speed)</option>
                </select>
              </div>
              <ColorInputPicker
                label="HEX COLOR"
                value={color}
                onChange={setColor}
                placeholder="#00D9FF"
              />
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">COLOR PREVIEW</label>
                <div
                  className="h-10 rounded-xl border border-white/[0.06] flex items-center justify-center font-bold tracking-widest text-[10px]"
                  style={{ backgroundColor: `${color}15`, color, borderColor: `${color}25` }}
                >
                  PREVIEW
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">TAGS / TECH STACK (COMMA-SEPARATED)</label>
              <input
                type="text"
                placeholder="Next.js, React, Tailwind CSS"
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
                {saving ? "SAVING..." : "SAVE SERVICE"}
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

      {/* Services List Table */}
      {!showForm && (
        <div className="rounded-2xl border border-white/[0.06] overflow-x-auto select-text">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#0A0C10]/80 border-b border-white/[0.06] text-white/40 font-bold select-none">
                <th className="p-4 w-12 text-center">ORDER</th>
                <th className="p-4">TITLE (EN / VI)</th>
                <th className="p-4">ICON & COLOR</th>
                <th className="p-4">TAGS</th>
                <th className="p-4 text-center w-28">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/30">
                    No services found in database. Pre-filled fallbacks will be displayed on the website.
                  </td>
                </tr>
              ) : (
                services.map((item) => (
                  <tr key={item.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors select-text">
                    <td className="p-4 text-center text-white/40 font-bold">{item.sort_order}</td>
                    <td className="p-4 space-y-1">
                      <div className="text-white font-bold">{item.title_en}</div>
                      <div className="text-white/40 font-semibold">{item.title_vi}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}
                        >
                          {item.icon.charAt(0).toUpperCase()}
                        </span>
                        <code className="text-white/50 text-[10px]">{item.color}</code>
                      </div>
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
        title="Delete Service?"
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
