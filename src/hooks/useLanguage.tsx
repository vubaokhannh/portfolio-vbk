"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/data/translations";

export type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language;
    if (saved === "en" || saved === "vi") {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("portfolio_lang", lang);
  };

  const t = (keyPath: string): string => {
    const keys = keyPath.split(".");
    let current: unknown = translations[language];
    for (const key of keys) {
      if (current && typeof current === "object" && (current as Record<string, unknown>)[key] !== undefined) {
        current = (current as Record<string, unknown>)[key];
      } else {
        // Fallback to English if translation is missing in active language
        let englishFallback: unknown = translations["en"];
        for (const fKey of keys) {
          if (englishFallback && typeof englishFallback === "object" && (englishFallback as Record<string, unknown>)[fKey] !== undefined) {
            englishFallback = (englishFallback as Record<string, unknown>)[fKey];
          } else {
            return keyPath;
          }
        }
        return typeof englishFallback === "string" ? englishFallback : keyPath;
      }
    }
    return typeof current === "string" ? current : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
