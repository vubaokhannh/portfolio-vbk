"use client";

import { useEffect, useState } from "react";
import { supabase, uploadFile } from "@/lib/supabase";
import { personalEn } from "@/data/personal";
import { clearBlogCache } from "@/lib/data-fetchers";

interface Props {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

export default function PersonalInfoManager({ showToast }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [formLang, setFormLang] = useState<"en" | "vi">("en");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [roleVi, setRoleVi] = useState("");
  const [taglineEn, setTaglineEn] = useState("");
  const [taglineVi, setTaglineVi] = useState("");
  const [bioEn, setBioEn] = useState("");
  const [bioVi, setBioVi] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [stackInput, setStackInput] = useState("");

  // Stats states (3 values)
  const [expVal, setExpVal] = useState("");
  const [expLblEn, setExpLblEn] = useState("");
  const [expLblVi, setExpLblVi] = useState("");
  const [projVal, setProjVal] = useState("");
  const [projLblEn, setProjLblEn] = useState("");
  const [projLblVi, setProjLblVi] = useState("");
  const [techVal, setTechVal] = useState("");
  const [techLblEn, setTechLblEn] = useState("");
  const [techLblVi, setTechLblVi] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data, error } = await supabase
          .from("personal_info")
          .select("*")
          .eq("key", "vubaokhanh")
          .maybeSingle();

        if (error) throw error;

        // If data exists in Supabase, load it, otherwise pre-fill with local static data
        const profile = data || {
          name: personalEn.name,
          first_name: personalEn.firstName,
          last_name: personalEn.lastName,
          role_en: personalEn.role,
          role_vi: "Nhà phát triển Fullstack",
          tagline_en: personalEn.tagline,
          tagline_vi: "Xây dựng trải nghiệm kỹ thuật số quy mô lớn và hệ thống doanh nghiệp.",
          bio_en: personalEn.bio,
          bio_vi: "Tôi là một nhà phát triển Fullstack đam mê kiến tạo các ứng dụng doanh nghiệp...",
          location: personalEn.location,
          email: personalEn.email,
          github: personalEn.github,
          linkedin: personalEn.linkedin,
          facebook: personalEn.facebook,
          cv_url: personalEn.cvUrl,
          stack: personalEn.stack,
          stats: personalEn.stats,
        };

        setName(profile.name);
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setRoleEn(profile.role_en);
        setRoleVi(profile.role_vi);
        setTaglineEn(profile.tagline_en);
        setTaglineVi(profile.tagline_vi);
        setBioEn(profile.bio_en);
        setBioVi(profile.bio_vi);
        setLocation(profile.location);
        setEmail(profile.email);
        setGithub(profile.github);
        setLinkedin(profile.linkedin);
        setFacebook(profile.facebook);
        setCvUrl(profile.cv_url);
        setStackInput(profile.stack ? profile.stack.join(", ") : "");

        // Load stats
        const stats = (profile.stats || []) as Array<{ id: string; value: string; label: string; labelVi?: string }>;
        const exp = stats.find((s) => s.id === "experience");
        setExpVal(exp?.value || "1");
        setExpLblEn(exp?.label || "Years Experience");
        setExpLblVi(exp?.labelVi || "Năm kinh nghiệm");

        const proj = stats.find((s) => s.id === "projects");
        setProjVal(proj?.value || "10");
        setProjLblEn(proj?.label || "Projects Delivered");
        setProjLblVi(proj?.labelVi || "Dự án hoàn thành");

        const tech = stats.find((s) => s.id === "technologies");
        setTechVal(tech?.value || "15");
        setTechLblEn(tech?.label || "Technologies");
        setTechLblVi(tech?.labelVi || "Công nghệ nắm vững");

      } catch (err) {
        showToast((err as { message?: string })?.message || "Failed to load profile.", "error");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [showToast]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const stack = stackInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const stats = [
      { id: "experience", value: expVal, suffix: "+", label: expLblEn, labelVi: expLblVi, icon: "calendar" },
      { id: "projects", value: projVal, suffix: "+", label: projLblEn, labelVi: projLblVi, icon: "package" },
      { id: "technologies", value: techVal, suffix: "+", label: techLblEn, labelVi: techLblVi, icon: "cpu" },
    ];

    const payload: Record<string, unknown> = {
      key: "vubaokhanh",
      name,
      first_name: firstName,
      last_name: lastName,
      role_en: roleEn,
      role_vi: roleVi,
      tagline_en: taglineEn,
      tagline_vi: taglineVi,
      bio_en: bioEn,
      bio_vi: bioVi,
      location,
      email,
      github,
      linkedin,
      facebook,
      cv_url: cvUrl,
      stack,
      stats,
      updated_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase.from("personal_info").upsert(payload, { onConflict: "key" });

      if (error) throw error;
      clearBlogCache();
      showToast("Profile settings updated successfully!", "success");
    } catch (err) {
      showToast((err as { message?: string })?.message || "Failed to save profile settings.", "error");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-mono text-xs text-white/50">
        <span className="w-4 h-4 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mr-2" />
        LOADING PROFILE CONFIGURATION...
      </div>
    );
  }

  return (
    <div className="space-y-6 font-mono text-xs select-text">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 select-text">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Profile Information Settings</h2>
          <p className="text-[10px] text-white/40 mt-0.5">Manage your bio, CV, locations, stats, and social links.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 select-text">
        {/* Core details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">FULL NAME</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">FIRST NAME</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">LAST NAME</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              <label className="text-white/40 font-bold block">ROLE (ENGLISH)</label>
              <input
                type="text"
                required={formLang === "en"}
                value={roleEn}
                onChange={(e) => setRoleEn(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">TAGLINE (ENGLISH)</label>
              <input
                type="text"
                required={formLang === "en"}
                value={taglineEn}
                onChange={(e) => setTaglineEn(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">BIO (ENGLISH)</label>
              <textarea
                required={formLang === "en"}
                rows={3}
                value={bioEn}
                onChange={(e) => setBioEn(e.target.value)}
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
                value={roleVi}
                onChange={(e) => setRoleVi(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">TAGLINE (VIETNAMESE)</label>
              <input
                type="text"
                required={formLang === "vi"}
                value={taglineVi}
                onChange={(e) => setTaglineVi(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">BIO (VIETNAMESE)</label>
              <textarea
                required={formLang === "vi"}
                rows={3}
                value={bioVi}
                onChange={(e) => setBioVi(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Contact links and stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">EMAIL ADDRESS</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">LOCATION</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">GITHUB LINK</label>
            <input
              type="url"
              required
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">LINKEDIN LINK</label>
            <input
              type="url"
              required
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">FACEBOOK LINK</label>
            <input
              type="url"
              required
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-white/40 font-bold block">CV / RESUME FILE PATH / URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={cvUrl}
                onChange={(e) => setCvUrl(e.target.value)}
                className="flex-grow px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              />
              <label className="px-4 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-white cursor-pointer font-bold flex items-center justify-center shrink-0 min-w-[100px] transition-colors relative">
                {uploading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "UPLOAD PDF"
                )}
                <input
                  type="file"
                  accept=".pdf"
                  disabled={uploading}
                  onChange={(e) => handleFileUpload(e, setCvUrl, "cv")}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-white/40 font-bold block">CORE STACK (COMMA-SEPARATED)</label>
          <input
            type="text"
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            placeholder="Laravel, React, TypeScript, Node.js"
            className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
          />
        </div>

        {/* Stats */}
        <div className="border-t border-white/[0.06] pt-4">
          <h3 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4">Quick Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="p-4 rounded-2xl border border-white/[0.04] bg-black/20 space-y-3">
              <label className="text-[10px] text-[#00D9FF] font-bold tracking-wider">EXPERIENCE STAT</label>
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Value (e.g. 1)"
                  value={expVal}
                  onChange={(e) => setExpVal(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                />
                {formLang === "en" ? (
                  <input
                    type="text"
                    placeholder="Label EN (e.g. Years Experience)"
                    value={expLblEn}
                    onChange={(e) => setExpLblEn(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Label VI (e.g. Năm kinh nghiệm)"
                    value={expLblVi}
                    onChange={(e) => setExpLblVi(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                  />
                )}
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 rounded-2xl border border-white/[0.04] bg-black/20 space-y-3">
              <label className="text-[10px] text-[#7C3AED] font-bold tracking-wider">PROJECTS STAT</label>
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Value (e.g. 10)"
                  value={projVal}
                  onChange={(e) => setProjVal(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                />
                {formLang === "en" ? (
                  <input
                    type="text"
                    placeholder="Label EN (e.g. Projects Delivered)"
                    value={projLblEn}
                    onChange={(e) => setProjLblEn(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Label VI (e.g. Dự án hoàn thành)"
                    value={projLblVi}
                    onChange={(e) => setProjLblVi(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                  />
                )}
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 rounded-2xl border border-white/[0.04] bg-black/20 space-y-3">
              <label className="text-[10px] text-[#4F46E5] font-bold tracking-wider">TECHNOLOGIES STAT</label>
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Value (e.g. 15)"
                  value={techVal}
                  onChange={(e) => setTechVal(e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                />
                {formLang === "en" ? (
                  <input
                    type="text"
                    placeholder="Label EN (e.g. Technologies)"
                    value={techLblEn}
                    onChange={(e) => setTechLblEn(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="Label VI (e.g. Công nghệ nắm vững)"
                    value={techLblVi}
                    onChange={(e) => setTechLblVi(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-white/[0.06] bg-black/40 text-white"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold tracking-widest transition-all cursor-pointer disabled:opacity-50"
        >
          {saving ? "SAVING SETTINGS..." : "SAVE PROFILE SETTINGS"}
        </button>
      </form>
    </div>
  );
}
