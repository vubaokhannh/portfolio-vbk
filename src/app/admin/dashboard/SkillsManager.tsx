"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { skillGroupsEn } from "@/data/skills";
import { clearBlogCache } from "@/lib/data-fetchers";
import ColorInputPicker from "./ColorInputPicker";
import { Trash2, Edit3, Plus, X, Cpu } from "lucide-react";
import ConfirmModal from "./ConfirmModal";

interface SkillItemDb {
  id: string;
  name: string;
  icon: string;
  category: string;
  level: number;
  description_en: string;
  description_vi: string;
  color: string;
  sort_order: number;
}

interface Props {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function SkillsManager({ showToast }: Props) {
  const [skills, setSkills] = useState<SkillItemDb[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<SkillItemDb | null>(null);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("⚡");
  const [category, setCategory] = useState("frontend");
  const [level, setLevel] = useState(4);
  const [descEn, setDescEn] = useState("");
  const [descVi, setDescVi] = useState("");
  const [color, setColor] = useState("#00D9FF");
  const [sortOrder, setSortOrder] = useState(1);

  // Track which skill is pending delete confirmation (replaces window.confirm)
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  // Confirm modal — shared with other managers
  const [confirmItem, setConfirmItem] = useState<SkillItemDb | null>(null);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error || !data || data.length === 0) {
        // Fallback static skills from local data
        const staticList: SkillItemDb[] = [];
        let order = 1;
        for (const group of skillGroupsEn) {
          for (const s of group.skills) {
            staticList.push({
              id: s.id,
              name: s.name,
              icon: s.icon,
              category: s.category,
              level: s.level,
              description_en: s.description,
              description_vi: s.description,
              color: s.color,
              sort_order: order++,
            });
          }
        }
        setSkills(staticList);
      } else {
        setSkills(data);
      }
    } catch {
      // Fallback silently
    } finally {
      setLoading(false);
    }
  }

  function handleStartNew() {
    setEditingItem(null);
    setId("");
    setName("");
    setIcon("⚡");
    setCategory("frontend");
    setLevel(4);
    setDescEn("");
    setDescVi("");
    setColor("#00D9FF");
    setSortOrder(skills.length + 1);
    setShowForm(true);
  }

  function handleStartEdit(item: SkillItemDb) {
    setEditingItem(item);
    setId(item.id);
    setName(item.name);
    setIcon(item.icon);
    setCategory(item.category);
    setLevel(item.level);
    setDescEn(item.description_en);
    setDescVi(item.description_vi);
    setColor(item.color);
    setSortOrder(item.sort_order);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const generatedId = id.trim().toLowerCase().replace(/\s+/g, "-") || name.toLowerCase().replace(/\s+/g, "-");

    const payload = {
      id: generatedId,
      name,
      icon,
      category,
      level: Number(level),
      description_en: descEn,
      description_vi: descVi,
      color,
      sort_order: Number(sortOrder),
    };

    try {
      const { error } = await supabase.from("skills").upsert(payload);
      if (error && !error.message.includes("does not exist")) throw error;

      clearBlogCache();
      showToast(`Skill ${editingItem ? "updated" : "created"} successfully!`, "success");
      setShowForm(false);
      loadSkills();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Saved to local cache.", "info");
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: SkillItemDb) {
    // Proceed with actual delete (called from ConfirmModal)
    setConfirmItem(null);
    try {
      showToast("Deleting skill...", "info");
      const { error } = await supabase.from("skills").delete().eq("id", item.id);
      if (error && !error.message.includes("does not exist")) throw error;

      clearBlogCache();
      showToast(`Skill "${item.name}" deleted successfully!`, "success");
      loadSkills();
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to delete skill.", "error");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-mono text-xs text-white/50">
        <span className="w-4 h-4 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mr-2.5" />
        LOADING TECHNICAL SKILLS MANAGER...
      </div>
    );
  }

  return (
    <>
    <div className="space-y-6 font-mono text-xs select-text">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00D9FF]" />
            TECHNICAL SKILLS & STACK MANAGER
          </h2>
          <p className="text-[10px] text-white/40 mt-0.5">
            Manage your frontend, backend, database, devops, and developer tools stack.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={handleStartNew}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold tracking-wider transition-all cursor-pointer shadow-lg shadow-[#00D9FF]/10"
          >
            <Plus className="w-4 h-4" />
            ADD NEW SKILL
          </button>
        )}
      </div>

      {/* Edit / Create Form Modal Card */}
      {showForm && (
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-black/40 space-y-4 relative select-text">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <span className="text-xs font-bold text-[#00D9FF] uppercase tracking-wider">
              {editingItem ? `EDIT SKILL: ${editingItem.name}` : "ADD NEW TECHNICAL SKILL"}
            </span>
            <button
              onClick={() => setShowForm(false)}
              className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">SKILL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="React"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">ICON (EMOJI / SYMBOL)</label>
                <input
                  type="text"
                  required
                  placeholder="⚛️"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none cursor-pointer"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="database">Database</option>
                  <option value="devops">DevOps & Cloud</option>
                  <option value="tools">Tools & Productivity</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">PROFICIENCY LEVEL (1-5)</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none cursor-pointer"
                >
                  <option value={5}>Level 5 - Expert / Advanced</option>
                  <option value={4}>Level 4 - Proficient / High</option>
                  <option value={3}>Level 3 - Intermediate</option>
                  <option value={2}>Level 2 - Basic</option>
                  <option value={1}>Level 1 - Learning</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">DESCRIPTION (ENGLISH)</label>
                <input
                  type="text"
                  placeholder="Component-driven UIs with hooks & state"
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">DESCRIPTION (VIETNAMESE)</label>
                <input
                  type="text"
                  placeholder="Phát triển giao diện React với hooks & context"
                  value={descVi}
                  onChange={(e) => setDescVi(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorInputPicker
                label="BRAND ICON COLOR (HEX)"
                value={color}
                onChange={setColor}
                placeholder="#61DAFB"
              />

              <div className="space-y-1.5">
                <label className="text-white/40 font-bold block">SORT ORDER</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold tracking-wider cursor-pointer disabled:opacity-50"
              >
                {saving ? "SAVING..." : "SAVE SKILL"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Full Skills Management Table */}
      {!showForm && (
        <div className="rounded-2xl border border-white/[0.06] overflow-x-auto select-text">
          <table className="w-full border-collapse text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#0A0C10]/80 border-b border-white/[0.06] text-white/40 font-bold select-none">
                <th className="p-4 w-16">ORDER</th>
                <th className="p-4">SKILL & ICON</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">LEVEL</th>
                <th className="p-4">DESCRIPTION</th>
                <th className="p-4 text-center w-28">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((item) => (
                <tr key={item.id} className="border-b border-white/[0.04] hover:bg-white/[0.01] transition-colors select-text">
                  <td className="p-4 text-white/40 font-bold">#{item.sort_order}</td>
                  <td className="p-4 flex items-center gap-2.5 font-bold text-white">
                    <span className="text-base">{item.icon}</span>
                    <span style={{ color: item.color }}>{item.name}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-white/[0.04] border border-white/[0.08] text-white/70">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-[#00D9FF] font-bold">★ {item.level}/5</span>
                  </td>
                  <td className="p-4 text-white/60">
                    <div>{item.description_en}</div>
                    <div className="text-white/35 text-[11px]">{item.description_vi}</div>
                  </td>
                    <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 select-none">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="p-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-[#00D9FF] hover:border-[#00D9FF]/20 transition-all cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setConfirmItem(item)}
                        className="p-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-red-400 hover:border-red-400/20 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={!!confirmItem}
        title="Delete Skill?"
        itemName={confirmItem ? `${confirmItem.icon} ${confirmItem.name}` : undefined}
        onConfirm={() => {
          if (confirmItem) handleDelete(confirmItem);
        }}
        onCancel={() => setConfirmItem(null)}
      />
    </>
  );
}
