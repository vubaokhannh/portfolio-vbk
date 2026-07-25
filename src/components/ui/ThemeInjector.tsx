"use client";

import { useEffect } from "react";
import { getPersonalInfo, getSeoConfig, type SeoConfig } from "@/lib/data-fetchers";

interface SiteSettings {
  siteTitle?: string;
  metaDesc?: string;
  contactEmail?: string;
  enableAnimations?: boolean;
  allowIndexing?: boolean;
  themeColor?: string;
  secondaryColor?: string;
  bgColor?: string;
  cardBgColor?: string;
  blurStrength?: string;
  borderRadius?: string;
}

export default function ThemeInjector() {
  useEffect(() => {
    // 1. Initial hydration from localStorage
    applyStoredSettings();
    applyStoredSeo();

    // 2. Fetch live theme_config & SEO config from Supabase
    getPersonalInfo("en").then((info) => {
      const config = info.themeConfig;
      const serverColor = config?.themeColor || info.themeColor;
      if (serverColor && serverColor.startsWith("#")) {
        applyThemeColor(
          serverColor,
          config?.secondaryColor,
          config?.bgColor,
          config?.cardBgColor,
          config?.blurStrength,
          config?.borderRadius
        );
        localStorage.setItem("vubaokhanh_theme_color", serverColor);
      }
    });

    getSeoConfig().then((serverSeo) => {
      if (serverSeo) {
        applySeoConfig(serverSeo);
        if (typeof window !== "undefined") {
          localStorage.setItem("vubaokhanh_seo_config", JSON.stringify(serverSeo));
        }
      }
    });

    // 3. Listen for dynamic settings & SEO update events from Admin Dashboard
    function handleSettingsUpdate(e: Event) {
      const customEvent = e as CustomEvent<SiteSettings>;
      if (customEvent.detail) {
        applyAllSettings(customEvent.detail);
      }
    }

    function handleSeoUpdate(e: Event) {
      const customEvent = e as CustomEvent<SeoConfig>;
      if (customEvent.detail) {
        applySeoConfig(customEvent.detail);
      }
    }

    window.addEventListener("vubaokhanh_settings_updated", handleSettingsUpdate);
    window.addEventListener("vubaokhanh_seo_updated", handleSeoUpdate);

    return () => {
      window.removeEventListener("vubaokhanh_settings_updated", handleSettingsUpdate);
      window.removeEventListener("vubaokhanh_seo_updated", handleSeoUpdate);
    };
  }, []);

  function applyStoredSettings() {
    if (typeof window === "undefined") return;

    try {
      const storedSettings = localStorage.getItem("vubaokhanh_site_settings");
      if (storedSettings) {
        const settings: SiteSettings = JSON.parse(storedSettings);
        applyAllSettings(settings);
      } else {
        const localColor = localStorage.getItem("vubaokhanh_theme_color");
        if (localColor && localColor.startsWith("#")) {
          applyThemeColor(localColor);
        }
      }
    } catch {
      // Fallback silently
    }
  }

  function applyStoredSeo() {
    if (typeof window === "undefined") return;

    try {
      const storedSeo = localStorage.getItem("vubaokhanh_seo_config");
      if (storedSeo) {
        const seo: SeoConfig = JSON.parse(storedSeo);
        applySeoConfig(seo);
      }
    } catch {
      // Fallback silently
    }
  }

  function applyAllSettings(settings: SiteSettings) {
    if (typeof document === "undefined") return;

    if (settings.themeColor) {
      applyThemeColor(
        settings.themeColor,
        settings.secondaryColor,
        settings.bgColor,
        settings.cardBgColor,
        settings.blurStrength,
        settings.borderRadius
      );
    }

    if (settings.siteTitle && !window.location.pathname.startsWith("/admin")) {
      document.title = settings.siteTitle;
    }

    if (settings.metaDesc) {
      setMetaTag("description", settings.metaDesc);
    }

    if (typeof settings.allowIndexing === "boolean") {
      setMetaTag(
        "robots",
        settings.allowIndexing ? "index, follow, max-image-preview:large" : "noindex, nofollow"
      );
    }

    if (typeof settings.enableAnimations === "boolean") {
      if (settings.enableAnimations) {
        document.documentElement.classList.remove("disable-animations");
      } else {
        document.documentElement.classList.add("disable-animations");
      }
    }
  }

  function applySeoConfig(seo: SeoConfig) {
    if (typeof document === "undefined") return;

    if (seo.seoTitle && !window.location.pathname.startsWith("/admin")) {
      document.title = seo.seoTitle;
      setMetaProperty("og:title", seo.seoTitle);
      setMetaProperty("twitter:title", seo.seoTitle);
    }

    if (seo.seoDescription) {
      setMetaTag("description", seo.seoDescription);
      setMetaProperty("og:description", seo.seoDescription);
      setMetaProperty("twitter:description", seo.seoDescription);
    }

    if (seo.canonicalUrl) {
      setCanonicalLink(seo.canonicalUrl);
      setMetaProperty("og:url", seo.canonicalUrl);
    }

    if (seo.keywordsInput) {
      setMetaTag("keywords", seo.keywordsInput);
    }

    if (seo.googleVerification) {
      setMetaTag("google-site-verification", seo.googleVerification);
    }

    if (seo.ogImageUrl) {
      setMetaProperty("og:image", seo.ogImageUrl);
      setMetaProperty("twitter:image", seo.ogImageUrl);
    }

    if (seo.twitterHandle) {
      setMetaTag("twitter:creator", seo.twitterHandle);
      setMetaTag("twitter:site", seo.twitterHandle);
    }

    if (typeof seo.allowIndexing === "boolean") {
      setMetaTag(
        "robots",
        seo.allowIndexing ? "index, follow, max-image-preview:large" : "noindex, nofollow"
      );
    }

    // Dynamic Schema.org JSON-LD structured data injection
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: seo.authorName || "Vũ Bảo Khanh",
      jobTitle: seo.jobTitle || "Fullstack Web Engineer",
      worksFor: {
        "@type": "Organization",
        name: seo.organization || "BM WEB",
      },
      url: seo.canonicalUrl || "https://vubaokhanh.tech",
    };

    let scriptEl = document.getElementById("dynamic-schema-jsonld");
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.setAttribute("id", "dynamic-schema-jsonld");
      scriptEl.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd);
  }

  function setMetaTag(name: string, content: string) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function setMetaProperty(property: string, content: string) {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function setCanonicalLink(url: string) {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      document.head.appendChild(el);
    }
    el.setAttribute("href", url);
  }

  function applyThemeColor(
    color: string,
    secondaryColor?: string,
    bgColor?: string,
    cardBgColor?: string,
    blurStrength?: string,
    borderRadius?: string
  ) {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (color && color.startsWith("#")) {
        root.style.setProperty("--accent-cyan", color);
        root.style.setProperty("--accent-cyan-glow", `${color}25`);
        root.style.setProperty("--shadow-glow-cyan", `0 0 40px ${color}35`);
      }
      if (secondaryColor && secondaryColor.startsWith("#")) {
        root.style.setProperty("--accent-violet", secondaryColor);
        root.style.setProperty("--accent-violet-glow", `${secondaryColor}25`);
        root.style.setProperty("--shadow-glow-violet", `0 0 40px ${secondaryColor}35`);
      }
      if (bgColor) {
        root.style.setProperty("--bg-primary", bgColor);
      }
      if (cardBgColor) {
        root.style.setProperty("--bg-card", cardBgColor);
      }
      if (blurStrength) {
        root.style.setProperty("--glass-blur", blurStrength);
      }
      if (borderRadius) {
        root.style.setProperty("--radius-xl", borderRadius);
      }
    }
  }

  return null;
}

