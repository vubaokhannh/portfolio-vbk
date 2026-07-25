"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/AnimatedText";
import { skillGroupsEn, skillGroupsVi } from "@/data/skills";
import { getSkills } from "@/lib/data-fetchers";
import { useLanguage } from "@/hooks/useLanguage";
import type { Skill, SkillGroup } from "@/types";
import {
  Folder,
  FolderOpen,
  X,
  ChevronRight,
  ChevronDown,
  GitBranch,
  Terminal,
  FileCode,
  Menu,
} from "lucide-react";
import { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiLaravel,
  SiPhp,
  SiNodedotjs,
  SiFilament,
  SiMysql,
  SiRedis,
  SiDocker,
  SiGit,
  SiPostman,
  SiFigma,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const skillIconMap: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  nextjs: SiNextdotjs,
  laravel: SiLaravel,
  php: SiPhp,
  nodejs: SiNodedotjs,
  filament: SiFilament,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  redis: SiRedis,
  docker: SiDocker,
  git: SiGit,
  vscode: VscVscode,
  postman: SiPostman,
  figma: SiFigma,
  nestjs: SiNestjs,
  prisma: SiPrisma,
};

function getFileExtension(skillId: string): string {
  switch (skillId) {
    case "laravel":
    case "php":
    case "filament":
      return "php";
    case "react":
    case "nextjs":
      return "tsx";
    case "typescript":
    case "nestjs":
    case "prisma":
      return "ts";
    case "nodejs":
      return "js";
    case "mysql":
    case "postgresql":
      return "sql";
    case "redis":
      return "conf";
    case "docker":
      return "yml";
    case "git":
      return "sh";
    case "figma":
      return "fig";
    default:
      return "json";
  }
}

function getLanguageName(ext: string): string {
  switch (ext) {
    case "php":
      return "PHP";
    case "tsx":
      return "TypeScript React";
    case "ts":
      return "TypeScript";
    case "js":
      return "JavaScript";
    case "sql":
      return "SQL";
    case "yml":
      return "YAML";
    case "conf":
      return "Configuration";
    default:
      return "JSON";
  }
}

function generateSkillCode(
  skill: Skill,
  ext: string,
  language: string
): string {
  const isVi = language === "vi";
  const levelText = "★".repeat(skill.level) + "☆".repeat(5 - skill.level);
  const status =
    skill.level === 5
      ? (isVi ? "Chuyên gia" : "Expert")
      : skill.level === 4
      ? (isVi ? "Cao cấp" : "Advanced")
      : (isVi ? "Trung cấp" : "Intermediate");

  if (ext === "php") {
    return `<?php

namespace Portfolio\\Skills\\${skill.category.charAt(0).toUpperCase() + skill.category.slice(1)};

/**
 * ${isVi ? `Định nghĩa kỹ năng chuyên môn cho ${skill.name}` : `Technical skill definition for ${skill.name}`}
 * ${isVi ? `Trình độ` : `Level`}: ${status} (${skill.level}/5)
 */
class ${skill.name.replace(/\s+/g, "")}Developer implements SkillInterface {
    public string $name = "${skill.name}";
    public string $level = "${levelText}";
    public string $status = "${status}";
    public string $description = "${skill.description}";
    
    public function getProficiency(): array {
        return [
            "experience" => "${isVi ? "Lập trình mã nguồn cấp doanh nghiệp" : "Enterprise-ready code implementation"}",
            "clean_code" => true,
            "status" => "${isVi ? "Sẵn sàng bàn giao cho production" : "Ready for production deployments"}"
        ];
    }
}`;
  }

  if (ext === "ts" || ext === "tsx" || ext === "js") {
    return `import { Skill } from "@/types/portfolio";

// ${isVi ? `Hồ sơ kỹ năng: ${skill.name}` : `Skill profile: ${skill.name}`}
// ${isVi ? `Trình độ` : `Level`}: ${status} (${skill.level}/5)
export const ${skill.id}Skill: Skill = {
  id: "${skill.id}",
  name: "${skill.name}",
  icon: "${skill.icon}",
  rating: "${levelText}",
  status: "${status}",
  description: "${skill.description}",
  isReadyForDeploy: true,
  
  getSummary() {
    return \`${isVi ? `Thành thạo \${this.name} để xây dựng các ứng dụng web mở rộng.` : `Proficient in \${this.name} for building scalable web apps.`}\`;
  }
};`;
  }

  if (ext === "sql") {
    return `-- ${isVi ? `Truy vấn kỹ năng cho ${skill.name}` : `Skill Query for ${skill.name}`}
-- ${isVi ? `Trình độ` : `Proficiency`}: ${status} (${skill.level}/5)

SELECT 
    id, name, level, description, status 
FROM 
    skills 
WHERE 
    name = '${skill.name}' 
    AND category = '${skill.category}';

/* ${isVi ? "Kết quả truy vấn" : "Query Result"}:
{
  "id": "${skill.id}",
  "name": "${skill.name}",
  "rating": "${levelText}",
  "status": "${status}",
  "description": "${skill.description}"
}
*/`;
  }

  if (ext === "yml") {
    return `# ${isVi ? `Cấu hình triển khai Docker cho ${skill.name}` : `Docker deployment stack for ${skill.name}`}
version: "3.8"

services:
  ${skill.id}-skill:
    image: vubaokhanh/skills:${skill.id}
    environment:
      - SKILL_NAME=${skill.name}
      - PROFICIENCY=${levelText}
      - STATUS=${status}
      - DESCRIPTION=${skill.description}
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure`;
  }

  // Fallback JSON
  return `{
  "id": "${skill.id}",
  "name": "${skill.name}",
  "level": "${levelText}",
  "status": "${status}",
  "description": "${skill.description}",
  "category": "${skill.category}"
}`;
}

function CodeLine({ line, language }: { line: string; language: string }) {
  if (!line.trim()) return <span>&nbsp;</span>;

  // 1. Comments
  if (
    line.trim().startsWith("//") ||
    line.trim().startsWith("#") ||
    line.trim().startsWith("/*") ||
    line.trim().startsWith("*")
  ) {
    return <span className="text-[#6A9955] font-mono italic">{line}</span>;
  }

  // General token matching logic
  const tokenRegex =
    /("[^"]*"|'[^']*'|\b(?:const|let|var|class|interface|import|export|from|default|function|return|public|private|protected|namespace|use|SELECT|FROM|WHERE|AND|INSERT|INTO|VALUES|services|version|image|environment|ports|deploy|replicas|extends|implements|string|int|boolean|null|true|false)\b|\b\d+\b|[{}[\]().,;:=+\-*/&|<>!?]|[\w$]+|[^\w$\s]+)/g;

  const tokens = line.split(tokenRegex);

  return (
    <span className="font-mono">
      {tokens.map((token, i) => {
        if (!token) return null;

        // Check strings
        if (
          (token.startsWith('"') && token.endsWith('"')) ||
          (token.startsWith("'") && token.endsWith("'"))
        ) {
          return (
            <span key={i} className="text-[#CE9178]">
              {token}
            </span>
          );
        }

        // Check keywords
        const keywords = [
          "const",
          "let",
          "var",
          "class",
          "interface",
          "import",
          "export",
          "from",
          "default",
          "function",
          "return",
          "public",
          "private",
          "protected",
          "namespace",
          "use",
          "SELECT",
          "FROM",
          "WHERE",
          "AND",
          "INSERT",
          "INTO",
          "VALUES",
          "services",
          "version",
          "image",
          "environment",
          "ports",
          "deploy",
          "replicas",
          "extends",
          "implements",
          "string",
          "int",
          "boolean",
          "null",
          "true",
          "false",
        ];
        if (keywords.includes(token)) {
          return (
            <span key={i} className="text-[#569CD6]">
              {token}
            </span>
          );
        }

        // Check numbers
        if (/^\d+$/.test(token)) {
          return (
            <span key={i} className="text-[#B5CEA8]">
              {token}
            </span>
          );
        }

        // Check function names or types starting with uppercase
        if (
          /^[A-Z]\w*$/.test(token) &&
          language !== "yml" &&
          language !== "sql"
        ) {
          return (
            <span key={i} className="text-[#4EC9B0]">
              {token}
            </span>
          );
        }

        // Check punctuation
        if (/^[{}[\]().,;:=+\-*/&|<>!?]$/.test(token)) {
          return (
            <span key={i} className="text-[#D4D4D4]">
              {token}
            </span>
          );
        }

        // Default text
        return (
          <span key={i} className="text-[#9CDCFE]">
            {token}
          </span>
        );
      })}
    </span>
  );
}

export default function Skills() {
  const { language, t } = useLanguage();
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(
    language === "en" ? skillGroupsEn : skillGroupsVi
  );

  useEffect(() => {
    setSkillGroups(language === "en" ? skillGroupsEn : skillGroupsVi);

    getSkills(language).then((data) => {
      if (data && data.length > 0) setSkillGroups(data);
    });
  }, [language]);

  const allSkills = skillGroups.flatMap((group) => group.skills);

  const [openTabs, setOpenTabs] = useState<string[]>(["react.tsx"]);
  const [activeTab, setActiveTab] = useState<string>("react.tsx");
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({
    frontend: true,
    backend: false,
    database: false,
    devops: false,
    tools: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(true);
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFolder = (category: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const openFile = (filename: string) => {
    if (!openTabs.includes(filename)) {
      setOpenTabs((prev) => [...prev, filename]);
    }
    setActiveTab(filename);
  };

  const closeTab = (filename: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const index = openTabs.indexOf(filename);
    const newTabs = openTabs.filter((t) => t !== filename);
    setOpenTabs(newTabs);

    if (activeTab === filename && newTabs.length > 0) {
      setActiveTab(newTabs[Math.max(0, index - 1)]);
    }
  };

  // Find active skill information
  const activeSkill = allSkills.find(
    (s) => `${s.id}.${getFileExtension(s.id)}` === activeTab
  );

  const fileExtension = activeTab.split(".").pop() || "json";
  const skillCode = activeSkill
    ? generateSkillCode(activeSkill, fileExtension, language)
    : "";
  const codeLines = skillCode.split("\n");

  return (
    <section
      id="skills"
      className="relative section-padding overflow-hidden"
      aria-label="Skills section"
    >
      {/* Background radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(79,70,229,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          description={t("skills.description")}
          className="mb-16"
        />

        {/* IDE Simulator Box */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0A0D14]/90 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
          {/* Mock Window Header / Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#07090E] border-b border-white/[0.05] select-none shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_8px_rgba(255,95,87,0.4)]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.4)]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_8px_rgba(40,200,64,0.4)]" />
            </div>

            {/* Current Active File Title */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/40">
              <Terminal className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>vubaokhanh-workspace - {activeTab || "Welcome"}</span>
            </div>

            <div className="text-[10px] text-white/20 font-mono">VS Code v1.9.0</div>
          </div>

          {/* Main IDE Workspace (Split sidebar/editor) */}
          <div className="flex-grow flex relative overflow-hidden">
            {/* Backdrop overlay for mobile */}
            {sidebarOpen && (
              <div
                onClick={() => setSidebarOpen(false)}
                className="md:hidden absolute inset-0 bg-black/50 backdrop-blur-xs z-10 transition-opacity"
              />
            )}

            {/* Left Sidebar Explorer */}
            <AnimatePresence initial={false}>
              {sidebarOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 250, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="shrink-0 bg-[#080B10] border-r border-white/[0.05] flex flex-col overflow-y-auto select-none z-20 absolute left-0 top-0 bottom-0 md:relative h-full w-64 md:w-60"
                >
                  <div className="px-4 py-3 border-b border-white/[0.03] flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white/50 tracking-wider uppercase">
                      Explorer
                    </span>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="md:hidden text-white/40 hover:text-white"
                      aria-label="Close explorer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Folder Structure */}
                  <div className="p-3 space-y-1 font-mono text-xs">
                    {skillGroups.map((group) => {
                      const isFolderOpen = expandedFolders[group.category];

                      return (
                        <div key={group.category} className="space-y-1">
                          {/* Folder Row */}
                          <div
                            onClick={() => toggleFolder(group.category)}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.03] cursor-pointer transition-colors"
                          >
                            <span className="text-white/35">
                              {isFolderOpen ? (
                                <ChevronDown className="w-3.5 h-3.5" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5" />
                              )}
                            </span>
                            <span style={{ color: group.color }}>
                              {isFolderOpen ? (
                                <FolderOpen className="w-4 h-4" />
                              ) : (
                                <Folder className="w-4 h-4" />
                              )}
                            </span>
                            <span className="font-medium">{group.label}</span>
                          </div>

                          {/* Folder Files List */}
                          <AnimatePresence initial={false}>
                            {isFolderOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pl-6 border-l border-white/[0.03] ml-3.5 space-y-0.5 overflow-hidden"
                              >
                                {group.skills.map((skill) => {
                                  const ext = getFileExtension(skill.id);
                                  const filename = `${skill.id}.${ext}`;
                                  const isFileActive = activeTab === filename;
                                  const IconComponent = skillIconMap[skill.id];

                                  return (
                                    <div
                                      key={skill.id}
                                      onClick={() => openFile(filename)}
                                      className={`flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-all ${
                                        isFileActive
                                          ? "text-cyan-400 bg-cyan-500/5 font-semibold"
                                          : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <span
                                          className="shrink-0 w-3.5 h-3.5 flex items-center justify-center"
                                          style={{
                                            color: isFileActive
                                              ? "#00D9FF"
                                              : skill.color,
                                          }}
                                        >
                                          {IconComponent ? (
                                            <IconComponent className="w-3.5 h-3.5" />
                                          ) : (
                                            <FileCode className="w-3.5 h-3.5" />
                                          )}
                                        </span>
                                        <span className="truncate">
                                          {filename}
                                        </span>
                                      </div>

                                      {/* Small level rating */}
                                      <span
                                        className="text-[9px] font-mono px-1 rounded border opacity-50 flex-shrink-0"
                                        style={{
                                          color: skill.color,
                                          borderColor: `${skill.color}30`,
                                        }}
                                      >
                                        L{skill.level}
                                      </span>
                                    </div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right Main Editor Container */}
            <div className="flex-1 flex flex-col bg-[#07090D] overflow-hidden min-w-0">
              {/* Tab Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.04] bg-[#07090D] select-none shrink-0 overflow-x-auto overflow-y-hidden scrollbar-hide w-full">
                <div className="flex items-center flex-row flex-nowrap min-w-max">
                  {/* Menu Toggle for Mobile */}
                  {!sidebarOpen && (
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="px-3 py-3 border-r border-white/[0.04] text-white/50 hover:text-white bg-white/[0.01]"
                      aria-label="Open explorer"
                    >
                      <Menu className="w-4 h-4" />
                    </button>
                  )}

                  {/* Tabs List */}
                  {openTabs.map((filename) => {
                    const isTabActive = activeTab === filename;
                    const tabSkill = allSkills.find(
                      (s) =>
                        `${s.id}.${getFileExtension(s.id)}` === filename
                    );
                    const TabIcon = tabSkill ? skillIconMap[tabSkill.id] : null;

                    return (
                      <div
                        key={filename}
                        onClick={() => setActiveTab(filename)}
                        className={`group/tab flex items-center gap-2 px-4 py-2.5 text-xs font-mono border-r border-white/[0.03] cursor-pointer transition-colors relative ${
                          isTabActive
                            ? "text-[#00D9FF] bg-[#0B0D14] font-semibold"
                            : "text-white/40 hover:text-white/80 bg-[#080B10]"
                        }`}
                      >
                        {/* Tab Active Glow Line */}
                        {isTabActive && (
                          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_2px_8px_rgba(0,217,255,0.4)]" />
                        )}

                        <span
                          className="shrink-0"
                          style={{
                            color: isTabActive
                              ? "#00D9FF"
                              : tabSkill?.color || "#fff",
                          }}
                        >
                          {TabIcon ? (
                            <TabIcon className="w-3.5 h-3.5" />
                          ) : (
                            <FileCode className="w-3.5 h-3.5" />
                          )}
                        </span>

                        <span>{filename}</span>

                        <button
                          onClick={(e) => closeTab(filename, e)}
                          className="p-0.5 rounded-md text-white/20 hover:text-white hover:bg-white/10 opacity-60 group-hover/tab:opacity-100 transition-opacity ml-1.5"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Editor Workspace Panel */}
              <div className="flex-grow overflow-auto p-2.5 md:p-4 flex flex-col">
                {openTabs.length > 0 ? (
                  <div className="flex font-mono text-[10px] md:text-sm leading-relaxed select-text">
                    {/* Line numbers column */}
                    <div className="text-white/20 select-none text-right pr-2 md:pr-4 border-r border-white/[0.03] shrink-0 w-6 md:w-10">
                      {codeLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>

                    {/* Syntax Highlighted Code Display */}
                    <div className="pl-2 md:pl-4 flex-1 overflow-x-auto whitespace-pre">
                      {codeLines.map((line, i) => (
                        <div key={i} className="min-h-[1.5em] select-text">
                          <CodeLine line={line} language={fileExtension} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Welcome/Empty fallback state
                  <div className="flex-grow flex flex-col items-center justify-center text-center p-8 gap-4 select-none">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D9FF] to-[#7C3AED] flex items-center justify-center text-black font-black text-3xl shadow-[0_0_30px_rgba(0,217,255,0.2)]">
                      K
                    </div>
                    <h4 className="font-mono text-sm font-semibold text-white/70">
                      {language === "en" ? "IDE Workspace Empty" : "Không gian làm việc trống"}
                    </h4>
                    <p className="text-white/30 font-mono text-xs max-w-sm">
                      {language === "en"
                        ? "No skill files are currently open. Double-click a file in the Explorer panel on the left to read code metadata."
                        : "Không có tệp kỹ năng nào đang mở. Click hoặc bấm chọn một tệp tin ở cột Explorer bên trái để đọc thông tin."}
                    </p>
                    <button
                      onClick={() => openFile("react.tsx")}
                      className="px-4 py-1.5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 font-mono text-xs transition-colors"
                    >
                      {language === "en" ? "Open react.tsx" : "Mở tệp react.tsx"}
                    </button>
                  </div>
                )}
              </div>

              {/* Status bar */}
              <div className="bg-[#05060A] border-t border-white/[0.04] px-4 py-1.5 flex items-center justify-between text-[10px] text-white/40 font-mono shrink-0 select-none">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-[#00D9FF] font-semibold">
                    <GitBranch className="w-3 h-3" />
                    <span>main</span>
                  </div>
                  <div className="hidden sm:block">No problems</div>
                </div>
                <div className="flex items-center gap-4">
                  <div>UTF-8</div>
                  <div>
                    {activeTab ? getLanguageName(fileExtension) : "Text"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
