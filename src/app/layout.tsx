import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { personal } from "@/data/personal";
import { LanguageProvider } from "@/hooks/useLanguage";
import { getSeoConfig, getPersonalInfo, getServices, getProjects } from "@/lib/data-fetchers";
import { generateAllSchemas } from "@/lib/schema-builder";
import ThemeInjector from "@/components/ui/ThemeInjector";

const sansFont = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// ── Explicit viewport export (Next.js App Router standard) ──
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoConfig();
  const keywordsList = seo.keywordsInput
    ? seo.keywordsInput.split(",").map((k) => k.trim()).filter(Boolean)
    : [];

  return {
    metadataBase: new URL(seo.canonicalUrl || "https://vubaokhanh.tech"),
    title: {
      default: seo.seoTitle,
      template: `%s | ${seo.authorName || personal.name}`,
    },
    description: seo.seoDescription,
    alternates: {
      canonical: seo.canonicalUrl,
      // Note: hreflang removed — vi/en share the same URL, duplicate hreflang confuses Google.
      // Add back only when separate /vi/* and /en/* URL paths exist.
    },
    keywords: keywordsList,
    authors: [{ name: seo.authorName || personal.name, url: seo.canonicalUrl }],
    creator: seo.authorName || personal.name,
    publisher: seo.organization || personal.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["vi_VN"],
      url: seo.canonicalUrl,
      title: seo.seoTitle,
      description: seo.seoDescription,
      siteName: `${seo.authorName || personal.name} Portfolio`,
      images: [
        {
          url: seo.ogImageUrl || "/og-image.png",
          width: 1200,
          height: 630,
          alt: seo.seoTitle,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.seoTitle,
      description: seo.seoDescription,
      images: [{ url: seo.ogImageUrl || "/og-image.png", alt: seo.seoTitle }],
      creator: seo.twitterHandle || "@vubaokhannh",
    },
    robots: {
      index: seo.allowIndexing ?? true,
      follow: seo.allowIndexing ?? true,
      googleBot: {
        index: seo.allowIndexing ?? true,
        follow: seo.allowIndexing ?? true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      other: [{ rel: "mask-icon", url: "/favicon.svg" }],
    },
    manifest: "/site.webmanifest",
    verification: {
      google: seo.googleVerification || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
    other: {
      "content-language": "en, vi",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [seoConfig, personalInfo, services, projects] = await Promise.all([
    getSeoConfig(),
    getPersonalInfo("en"),
    getServices("en"),
    getProjects("en"),
  ]);

  const allSchemas = generateAllSchemas({
    seoConfig,
    personalInfo,
    services,
    projects,
    faqList: seoConfig.faqSchema,
    personCustom: seoConfig.personSchemaCustom,
    customRawJsonLd: seoConfig.customRawJsonLd,
  });

  return (
    <html lang="en" suppressHydrationWarning className={`${sansFont.variable} ${monoFont.variable}`}>
      <head>
        {/* Author */}
        <meta name="author" content={seoConfig.authorName || "Vu Bao Khanh"} />
        {/* Preconnect for Google Fonts to improve LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch for external domains used in content */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//web.krello.biz" />
        <link rel="dns-prefetch" href="//caodang.fpt.edu.vn" />

        {/* ── Dynamic Google Schema.org JSON-LD Structured Data ── */}
        {allSchemas.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}

        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var s = localStorage.getItem("vubaokhanh_seo_config");
                if (s) {
                  var p = JSON.parse(s);
                  if (p && p.seoTitle && !location.pathname.startsWith("/admin")) {
                    document.title = p.seoTitle;
                  }
                }
                // Apply full theme_config to prevent FOUC on all CSS variables
                var settings = localStorage.getItem("vubaokhanh_site_settings");
                if (settings) {
                  var t = JSON.parse(settings);
                  var r = document.documentElement;
                  if (t.themeColor) { r.style.setProperty("--accent-cyan", t.themeColor); r.style.setProperty("--accent-cyan-glow", t.themeColor + "25"); }
                  if (t.secondaryColor) { r.style.setProperty("--accent-violet", t.secondaryColor); r.style.setProperty("--accent-violet-glow", t.secondaryColor + "25"); }
                  if (t.bgColor) { r.style.setProperty("--bg-primary", t.bgColor); }
                  if (t.cardBgColor) { r.style.setProperty("--bg-card", t.cardBgColor); }
                  if (t.blurStrength) { r.style.setProperty("--glass-blur", t.blurStrength); }
                  if (t.borderRadius) { r.style.setProperty("--radius-xl", t.borderRadius); }
                } else {
                  // Fallback: apply just theme color from legacy key
                  var c = localStorage.getItem("vubaokhanh_theme_color");
                  if (c && c.startsWith("#")) {
                    document.documentElement.style.setProperty("--accent-cyan", c);
                    document.documentElement.style.setProperty("--accent-cyan-glow", c + "25");
                  }
                }
              } catch(e){}
            })();`,
          }}
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">
        {/* ── Skip Navigation — WCAG 2.1 Level A ── */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:text-black focus:bg-[#00D9FF] focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <LanguageProvider>
          <ThemeInjector />
          {children}
        </LanguageProvider>

        {/* ── Google Analytics 4 (only loads when GA_ID is set in env) ── */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
