"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Eye,
  Code2,
  Edit3,
  RemoveFormatting,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your article content here...",
  minHeight = "280px",
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"visual" | "html" | "preview">("visual");
  const [isFocused, setIsFocused] = useState(false);

  // Sync value into contentEditable when in visual mode
  useEffect(() => {
    if (editorRef.current && mode === "visual") {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, mode]);

  function execCommand(command: string, arg: string | undefined = undefined) {
    if (mode !== "visual") return;
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  function handleInput() {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }

  function handleInsertLink() {
    const url = prompt("Enter URL:", "https://");
    if (url) {
      execCommand("createLink", url);
    }
  }

  function handleInsertImage() {
    const url = prompt("Enter Image URL:", "/og-image.png");
    if (url) {
      execCommand("insertImage", url);
    }
  }

  function handleInsertCodeBlock() {
    const code = prompt("Enter code snippet:", "console.log('Hello World');");
    if (code) {
      const formatted = `<pre><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
      execCommand("insertHTML", formatted);
    }
  }

  function handleHeading(tag: "h2" | "h3" | "p") {
    execCommand("formatBlock", `<${tag}>`);
  }

  return (
    <div
      className={`rounded-xl border transition-all overflow-hidden bg-black/50 ${
        isFocused ? "border-white/30 shadow-lg shadow-black/50" : "border-white/[0.08]"
      }`}
    >
      {/* Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#0d0f14] border-b border-white/[0.06] select-none">
        {/* Formatting Actions (Only visible in Visual mode) */}
        {mode === "visual" ? (
          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              onClick={() => execCommand("bold")}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("italic")}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("underline")}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={() => handleHeading("h2")}
              className="px-2 py-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
              H2
            </button>
            <button
              type="button"
              onClick={() => handleHeading("h3")}
              className="px-2 py-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
              H3
            </button>

            <div className="w-[1px] h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={() => execCommand("insertUnorderedList")}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("insertOrderedList")}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => execCommand("formatBlock", "<blockquote>")}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Quote"
            >
              <Quote className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={handleInsertCodeBlock}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Code Snippet"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleInsertLink}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Insert Link"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleInsertImage}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Insert Image"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-4 bg-white/10 mx-1" />

            <button
              type="button"
              onClick={() => execCommand("removeFormat")}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Clear Formatting"
            >
              <RemoveFormatting className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider px-2">
            {mode === "html" ? "</> RAW HTML SOURCE EDITOR" : "👁 LIVE PREVIEW"}
          </div>
        )}

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/[0.06]">
          <button
            type="button"
            onClick={() => setMode("visual")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              mode === "visual"
                ? "bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20"
                : "text-white/40 hover:text-white"
            }`}
          >
            <Edit3 className="w-3 h-3" />
            VISUAL
          </button>
          <button
            type="button"
            onClick={() => setMode("html")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              mode === "html"
                ? "bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20"
                : "text-white/40 hover:text-white"
            }`}
          >
            <Code2 className="w-3 h-3" />
            HTML
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
              mode === "preview"
                ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20"
                : "text-white/40 hover:text-white"
            }`}
          >
            <Eye className="w-3 h-3" />
            PREVIEW
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div style={{ minHeight }} className="p-4 relative">
        {mode === "visual" && (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            data-placeholder={placeholder}
            className="w-full h-full outline-none text-white text-sm leading-relaxed font-sans prose prose-invert max-w-none focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-white/30"
            style={{ minHeight }}
          />
        )}

        {mode === "html" && (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="<p>Write raw HTML here...</p>"
            className="w-full h-full min-h-[280px] bg-transparent text-emerald-400 font-mono text-xs outline-none focus:outline-none resize-y"
          />
        )}

        {mode === "preview" && (
          <div
            className="prose prose-invert max-w-none text-white text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: value || "<p class='text-white/30 italic'>Nothing to preview yet...</p>" }}
          />
        )}
      </div>
    </div>
  );
}
