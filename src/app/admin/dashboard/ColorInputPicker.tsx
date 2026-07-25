"use client";

import { Palette } from "lucide-react";

interface ColorInputPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  placeholder?: string;
}

const PRESET_COLORS = [
  "#00D9FF", // Cyan
  "#7C3AED", // Violet
  "#E0234E", // Rose Red
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#3B82F6", // Blue
  "#EC4899", // Pink
  "#8B5CF6", // Purple
];

export default function ColorInputPicker({
  label,
  value,
  onChange,
  placeholder = "#00D9FF",
}: ColorInputPickerProps) {
  const currentHex = value?.startsWith("#") && value.length >= 4 ? value : placeholder;

  return (
    <div className="space-y-2 select-none">
      <label className="text-white/50 text-[10px] font-bold tracking-wider uppercase block">
        {label}
      </label>

      <div className="flex flex-col gap-2">
        {/* Main Input Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl border border-white/[0.08] bg-black/50 backdrop-blur-md hover:border-white/[0.18] transition-all">
          {/* Color Preview & Native Color Picker Trigger */}
          <div className="relative group shrink-0">
            <input
              type="color"
              value={currentHex}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-20"
              title="Click to open full color wheel"
            />
            <div
              className="w-8 h-8 rounded-xl border border-white/20 flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg"
              style={{
                backgroundColor: currentHex,
                boxShadow: `0 0 12px ${currentHex}40`,
              }}
            >
              <Palette className="w-3.5 h-3.5 text-black/70 group-hover:text-black transition-colors" />
            </div>
          </div>

          {/* HEX Code Text Field */}
          <input
            type="text"
            required
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2 py-1 bg-transparent text-white font-mono text-xs font-bold tracking-wider focus:outline-none placeholder:text-white/20"
          />
        </div>

        {/* Quick Palette Swatches */}
        <div className="flex items-center gap-1.5 pt-0.5">
          <span className="text-[9px] font-bold text-white/30 tracking-wider mr-1">PRESETS:</span>
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`w-5 h-5 rounded-lg border transition-all cursor-pointer hover:scale-125 ${
                value?.toLowerCase() === preset.toLowerCase()
                  ? "border-white scale-110 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              style={{ backgroundColor: preset }}
              title={`Use ${preset}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
