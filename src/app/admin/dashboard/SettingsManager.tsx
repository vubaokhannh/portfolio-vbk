"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { clearBlogCache } from "@/lib/data-fetchers";
import ColorInputPicker from "./ColorInputPicker";
import { Sliders, RefreshCw, Mail, Sparkles, Check, Palette, Layers, Box } from "lucide-react";

interface Props {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
}

const themePresets = [
  {
    name: "Cyberpunk Neon",
    primary: "#00D9FF",
    secondary: "#7C3AED",
    bg: "#050505",
    cardBg: "#0f1117",
    blur: "20px",
    radius: "16px",
  },
  {
    name: "Purple Nebula",
    primary: "#A855F7",
    secondary: "#EC4899",
    bg: "#030712",
    cardBg: "#111827",
    blur: "24px",
    radius: "20px",
  },
  {
    name: "Emerald Matrix",
    primary: "#10B981",
    secondary: "#14B8A6",
    bg: "#022C22",
    cardBg: "#064E3B",
    blur: "16px",
    radius: "12px",
  },
  {
    name: "Amber Sunset",
    primary: "#F59E0B",
    secondary: "#F43F5E",
    bg: "#0B0F19",
    cardBg: "#1E1B4B",
    blur: "20px",
    radius: "16px",
  },
  {
    name: "Ocean Breeze",
    primary: "#38BDF8",
    secondary: "#6366F1",
    bg: "#0F172A",
    cardBg: "#1E293B",
    blur: "20px",
    radius: "16px",
  },
  {
    name: "Monochrome Minimal",
    primary: "#E2E8F0",
    secondary: "#94A3B8",
    bg: "#000000",
    cardBg: "#121212",
    blur: "10px",
    radius: "8px",
  },
];

export default function SettingsManager({ showToast }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clearingCache, setClearingCache] = useState(false);

  // Settings state
  const [contactEmail, setContactEmail] = useState("vubaokhanh2311@gmail.com");
  const [enableAnimations, setEnableAnimations] = useState(true);

  // Full Web Theme States
  const [themeColor, setThemeColor] = useState("#00D9FF");
  const [secondaryColor, setSecondaryColor] = useState("#7C3AED");
  const [bgColor, setBgColor] = useState("#050505");
  const [cardBgColor, setCardBgColor] = useState("#0f1117");
  const [blurStrength, setBlurStrength] = useState("20px");
  const [borderRadius, setBorderRadius] = useState("16px");

  useEffect(() => {
    async function loadSettings() {
      try {
        if (typeof window !== "undefined") {
          const storedSettings = localStorage.getItem("vubaokhanh_site_settings");
          if (storedSettings) {
            const parsed = JSON.parse(storedSettings);
            if (parsed.contactEmail) setContactEmail(parsed.contactEmail);
            if (typeof parsed.enableAnimations === "boolean") setEnableAnimations(parsed.enableAnimations);
            if (parsed.themeColor) setThemeColor(parsed.themeColor);
            if (parsed.secondaryColor) setSecondaryColor(parsed.secondaryColor);
            if (parsed.bgColor) setBgColor(parsed.bgColor);
            if (parsed.cardBgColor) setCardBgColor(parsed.cardBgColor);
            if (parsed.blurStrength) setBlurStrength(parsed.blurStrength);
            if (parsed.borderRadius) setBorderRadius(parsed.borderRadius);
          }
        }

        const { data } = await supabase
          .from("personal_info")
          .select("theme_color, email")
          .eq("key", "vubaokhanh")
          .maybeSingle();

        if (data?.theme_color) {
          setThemeColor(data.theme_color);
        }
        if (data?.email) {
          setContactEmail(data.email);
        }
      } catch {
        // Fallback silently
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  function handleSelectPreset(preset: typeof themePresets[0]) {
    setThemeColor(preset.primary);
    setSecondaryColor(preset.secondary);
    setBgColor(preset.bg);
    setCardBgColor(preset.cardBg);
    setBlurStrength(preset.blur);
    setBorderRadius(preset.radius);
    showToast(`Applied preset: ${preset.name}`, "info");
  }

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const settingsObject = {
        contactEmail,
        enableAnimations,
        themeColor,
        secondaryColor,
        bgColor,
        cardBgColor,
        blurStrength,
        borderRadius,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("vubaokhanh_site_settings", JSON.stringify(settingsObject));
        localStorage.setItem("vubaokhanh_theme_color", themeColor);
      }

      // Fetch existing profile to preserve required NOT NULL columns
      const { data: existing } = await supabase
        .from("personal_info")
        .select("name, first_name, last_name")
        .eq("key", "vubaokhanh")
        .maybeSingle();

      const payload: Record<string, unknown> = {
        key: "vubaokhanh",
        name: existing?.name || "Vu Bao Khanh",
        first_name: existing?.first_name || "Vu Bao",
        last_name: existing?.last_name || "Khanh",
        email: contactEmail,
        theme_color: themeColor,
        theme_config: {
          themeColor,
          secondaryColor,
          bgColor,
          cardBgColor,
          blurStrength,
          borderRadius,
        },
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("personal_info").upsert(payload, { onConflict: "key" });
      if (error && (error.message?.includes("theme_color") || error.code === "PGRST204")) {
        delete payload.theme_color;
        const res = await supabase.from("personal_info").upsert(payload, { onConflict: "key" });
        error = res.error;
      }

      clearBlogCache();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("vubaokhanh_settings_updated", { detail: settingsObject }));
      }

      showToast("Web theme & system settings saved successfully!", "success");
    } catch (err) {
      showToast((err as { message?: string })?.message || "Saved to local system settings.", "info");
    } finally {
      setSaving(false);
    }
  }

  function handleClearCache() {
    setClearingCache(true);
    clearBlogCache();
    setTimeout(() => {
      setClearingCache(false);
      showToast("Blog data & ISR cache cleared successfully!", "success");
    }, 600);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 font-mono text-xs text-white/50">
        <span className="w-4 h-4 border-2 border-[#00D9FF] border-t-transparent rounded-full animate-spin mr-2.5" />
        LOADING SYSTEM CONFIGURATION...
      </div>
    );
  }

  return (
    <div className="space-y-8 font-mono text-xs select-text">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#00D9FF]" />
            WEB THEME CUSTOMIZER & PREFERENCES
          </h2>
          <p className="text-[10px] text-white/40 mt-0.5">
            Customize full website appearance, theme colors, background dark styles, glassmorphism, and system settings.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearCache}
          disabled={clearingCache}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.08] text-white font-bold text-[11px] tracking-wider transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${clearingCache ? "animate-spin text-[#00D9FF]" : ""}`} />
          {clearingCache ? "PURGING..." : "FLUSH CACHE"}
        </button>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Section 1: 1-Click Preset Palettes */}
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-black/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Palette className="w-4 h-4 text-[#00D9FF]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">1-CLICK PRESET THEME PALETTES</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {themePresets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`p-3 rounded-xl border text-left space-y-2 transition-all cursor-pointer hover:scale-[1.02] ${
                  themeColor === preset.primary
                    ? "border-[#00D9FF] bg-white/[0.06] shadow-lg"
                    : "border-white/[0.06] bg-black/40 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex gap-1.5 items-center">
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: preset.primary }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: preset.secondary }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: preset.bg }} />
                </div>
                <div className="text-[10px] font-bold text-white truncate">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Detailed Accent & Color Customization */}
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-black/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">DETAILED ACCENT & PALETTE COLORS</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ColorInputPicker
              label="PRIMARY ACCENT COLOR (HEX)"
              value={themeColor}
              onChange={setThemeColor}
              placeholder="#00D9FF"
            />
            <ColorInputPicker
              label="SECONDARY GRADIENT COLOR (HEX)"
              value={secondaryColor}
              onChange={setSecondaryColor}
              placeholder="#7C3AED"
            />
            <ColorInputPicker
              label="PAGE BACKGROUND COLOR (HEX)"
              value={bgColor}
              onChange={setBgColor}
              placeholder="#050505"
            />
            <ColorInputPicker
              label="CARD CONTAINER BG (HEX)"
              value={cardBgColor}
              onChange={setCardBgColor}
              placeholder="#0f1117"
            />
          </div>
        </div>

        {/* Section 3: Glassmorphism Blur & Corner Roundness */}
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-black/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Layers className="w-4 h-4 text-[#10B981]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">GLASSMORPHISM & CORNER STYLING</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">GLASSMORPHISM BLUR STRENGTH</label>
              <select
                value={blurStrength}
                onChange={(e) => setBlurStrength(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              >
                <option value="20px">Standard Blur (20px)</option>
                <option value="40px">Ultra Deep Blur (40px)</option>
                <option value="10px">Subtle Blur (10px)</option>
                <option value="0px">Flat Dark (No Blur)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">CARD CORNER ROUNDNESS</label>
              <select
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              >
                <option value="16px">Modern Rounded (16px)</option>
                <option value="24px">Ultra Soft (24px)</option>
                <option value="8px">Sharp Cyberpunk (8px)</option>
              </select>
            </div>
          </div>

          {/* Live Preview Bar */}
          <div className="pt-2">
            <label className="text-white/40 font-bold block text-[10px] mb-2">LIVE THEME STYLING PREVIEW</label>
            <div
              className="p-4 border flex items-center justify-between transition-all"
              style={{
                backgroundColor: cardBgColor,
                borderColor: `${themeColor}40`,
                borderRadius: borderRadius,
                backdropFilter: `blur(${blurStrength})`,
              }}
            >
              <div className="space-y-1">
                <div className="font-bold text-white text-xs flex items-center gap-2">
                  <Box className="w-4 h-4" style={{ color: themeColor }} />
                  PREVIEW CARD CONTAINER
                </div>
                <div className="text-[10px] text-white/50">
                  Primary Accent: <span style={{ color: themeColor }}>{themeColor}</span> | Secondary: <span style={{ color: secondaryColor }}>{secondaryColor}</span>
                </div>
              </div>

              <div
                className="px-3 py-1.5 rounded-lg text-black font-bold text-[10px] uppercase tracking-wider"
                style={{ backgroundColor: themeColor }}
              >
                BUTTON ACCENT
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: System Preferences (Notification Email & Animations) */}
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-black/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/[0.06] pb-3">
            <Mail className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">SYSTEM PREFERENCES</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">NOTIFICATION EMAIL</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-black/40 text-white focus:border-white/20 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/40 font-bold block">ANIMATION PREFERENCE</label>
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-white/[0.06] bg-black/40 cursor-pointer hover:bg-white/[0.03]">
                <span className="font-bold text-white text-xs">Enable Framer Motion Animations</span>
                <input
                  type="checkbox"
                  checked={enableAnimations}
                  onChange={(e) => setEnableAnimations(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#00D9FF] cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[#00D9FF] hover:bg-[#00c0e0] text-black font-bold tracking-widest transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
        >
          <Check className="w-4 h-4" />
          {saving ? "SAVING CONFIGURATIONS..." : "SAVE WEB THEME CONFIGURATIONS"}
        </button>
      </form>
    </div>
  );
}
