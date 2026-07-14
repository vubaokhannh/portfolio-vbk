import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/data/personal";
import { LanguageProvider } from "@/hooks/useLanguage";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://vubaokhanh.tech"),
  title: {
    default: `${personal.name} — Fullstack Developer`,
    template: `%s | ${personal.name}`,
  },
  description:
    "Trang web cá nhân và dịch vụ phát triển web của Vũ Bảo Khanh (Vu Bao Khanh) — Lập trình viên Fullstack chuyên nghiệp (Laravel, NestJS, React, Next.js) tại Việt Nam.",
  alternates: {
    canonical: "https://vubaokhanh.tech",
    languages: {
      "en": "https://vubaokhanh.tech",
      "vi": "https://vubaokhanh.tech",
      "x-default": "https://vubaokhanh.tech",
    },
  },
  keywords: [
    "Vu Bao Khanh",
    "Vũ Bảo Khanh",
    "Vũ Bảo Khanh PC08901",
    "Vu Bao Khanh Developer",
    "vubaokhanh.tech",
    "vubaokhanh",
    "vubaokhannh",
    "vu bao khanh developer",
    "vũ bảo khanh lập trình viên",
    "lập trình viên fullstack",
    "nhà phát triển web",
    "tuyển dụng laravel developer",
    "laravel developer vietnam",
    "nestjs developer vietnam",
    "react developer vietnam",
    "custom web development",
    "thiết kế website chuẩn seo",
    "Fullstack Developer",
    "Laravel Developer",
    "React Developer",
    "NestJS",
    "TypeScript",
    "Node.js",
    "Vietnam Developer",
    "Portfolio",
  ],
  authors: [{ name: personal.name, url: "https://vubaokhanh.tech" }],
  creator: personal.name,
  publisher: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["vi_VN"],
    url: "https://vubaokhanh.tech",
    title: `${personal.name} — Fullstack Developer `,
    description:
      "Portfolio và dịch vụ thiết kế phát triển website của Vũ Bảo Khanh (Vu Bao Khanh) — Lập trình viên Fullstack Laravel, React & NestJS.",
    siteName: `${personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personal.name} — Fullstack Developer `,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — Fullstack Developer `,
    description:
      "Portfolio và dịch vụ thiết kế phát triển website của Vũ Bảo Khanh.",
    images: [{ url: "/og-image.png", alt: `${personal.name} — Fullstack Developer` }],
    creator: "@vubaokhannh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  other: {
    "content-language": "en, vi",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sansFont.variable} ${monoFont.variable}`}>
      <head>
        {/* Author */}
        <meta name="author" content="Vu Bao Khanh" />
        {/* Preconnect for Google Fonts to improve LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch for external domains used in content */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//web.krello.biz" />
        <link rel="dns-prefetch" href="//caodang.fpt.edu.vn" />

        {/* ── Person Schema ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://vubaokhanh.tech/#person",
              name: personal.name,
              alternateName: "Vũ Bảo Khanh",
              givenName: "Bao Khanh",
              familyName: "Vu",
              url: "https://vubaokhanh.tech",
              image: "https://vubaokhanh.tech/og-image.png",
              jobTitle: personal.role,
              description: "Vu Bao Khanh (Vũ Bảo Khanh) — Fullstack Developer portfolio specializing in custom web development, backend engineering (Laravel, NestJS) and frontend frameworks.",
              email: "vubaokhanh2311@gmail.com",
              sameAs: [personal.github, personal.linkedin, personal.facebook],
              worksFor: {
                "@type": "Organization",
                name: "BM WEB",
              },
              hasOccupation: [
                {
                  "@type": "Role",
                  roleName: "Fullstack PHP Developer",
                  startDate: "2026-01",
                  worksFor: { "@type": "Organization", name: "BM WEB" },
                },
                {
                  "@type": "Role",
                  roleName: "Frontend Developer (Intern)",
                  startDate: "2025-05",
                  endDate: "2025-08",
                  worksFor: {
                    "@type": "Organization",
                    name: "Cantho University Software Center (CUSC)",
                    url: "https://www.ctu.edu.vn",
                  },
                },
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "FPT Polytechnic",
                url: "https://caodang.fpt.edu.vn",
              },
              knowsAbout: [
                "PHP", "Laravel", "React", "TypeScript", "NestJS",
                "Node.js", "MySQL", "PostgreSQL", "Next.js", "Docker",
                "Redis", "Prisma", "Web Development", "Backend Engineering",
                "Frontend Development", "RESTful APIs", "System Design",
              ],
              nationality: {
                "@type": "Country",
                name: "Vietnam",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Can Tho",
                addressCountry: "VN",
              },
              subjectOf: [
                {
                  "@type": "NewsArticle",
                  name: "Dự án tốt nghiệp: Xây dựng website hệ thống đặt vé xe bus tích hợp hệ thống bản đồ định vị",
                  url: "https://caodang.fpt.edu.vn/tin-tuc-poly/du-an-tot-nghiep-xay-dung-website-he-thong-dat-ve-xe-bus-tich-hop-he-thong-ban-do-dinh-vi.html"
                },
                {
                  "@type": "NewsArticle",
                  name: "Ấn tượng với dự án Xưởng phần mềm: Website quản lý sinh viên tích hợp Google Drive API",
                  url: "https://caodang.fpt.edu.vn/tin-tuc-poly/an-tuong-voi-du-an-xuong-phan-mem-website-quan-ly-sinh-vien-tich-hop-google-drive-api.html"
                },
                {
                  "@type": "NewsArticle",
                  name: "Sinh viên FPT Polytechnic Cần Thơ thiết kế và xây dựng hệ thống bán hàng laptop trực tuyến",
                  url: "https://caodang.fpt.edu.vn/tin-tuc-poly/sinh-vien-fpt-polytechnic-can-tho-thiet-ke-va-xay-dung-he-thong-ban-hang-laptop-truc-tuyen.html"
                }
              ]
            }),
          }}
        />

        {/* ── WebSite Schema ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://vubaokhanh.tech/#website",
              name: `${personal.name} — Portfolio & Services`,
              url: "https://vubaokhanh.tech",
              description: "Official portfolio of Vu Bao Khanh (Vũ Bảo Khanh), Fullstack Developer and Web Engineer.",
              author: { "@id": "https://vubaokhanh.tech/#person" },
              inLanguage: ["en", "vi"],
            }),
          }}
        />

        {/* ── ProfessionalService Schema ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: `${personal.name} Web Development Services`,
              image: "https://vubaokhanh.tech/og-image.png",
              url: "https://vubaokhanh.tech",
              priceRange: "$$",
              telephone: "",
              email: "vubaokhanh2311@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Can Tho",
                addressCountry: "VN",
              },
              areaServed: "Worldwide",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Web Development Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Custom Web Development",
                      description: "Building fast, standard-compliant, responsive, and SEO-friendly websites tailored to your brand identity.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "E-Commerce Solutions",
                      description: "Creating high-converting online stores with secure carts, checkout pipelines, and popular payment gateways.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Admin & ERP Panels",
                      description: "Tailoring back-office management dashboards and databases to automate and streamline your operations.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Performance & SEO Optimization",
                      description: "Auditing user experience, optimizing page loading speed, and structuring metadata for top search rankings.",
                    },
                  },
                ],
              },
            }),
          }}
        />

        {/* ── SoftwareApplication Schema — Projects ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Portfolio Projects by Vu Bao Khanh",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "Task Management System (Krello)",
                    applicationCategory: "BusinessApplication",
                    operatingSystem: "Web",
                    url: "https://web.krello.biz/",
                    author: { "@id": "https://vubaokhanh.tech/#person" },
                    description: "A real-time collaborative workspace inspired by Trello, featuring live data sync, role-based access control (RBAC), and mobile push notifications.",
                    programmingLanguage: ["TypeScript", "NestJS", "React", "PostgreSQL", "Socket.IO"],
                    dateCreated: "2025",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "Online Vehicle Ticketing System",
                    applicationCategory: "TravelApplication",
                    operatingSystem: "Web",
                    author: { "@id": "https://vubaokhanh.tech/#person" },
                    description: "An intelligent bus booking platform featuring live route tracking maps, automated IoT smart cameras, and digital wallet payments.",
                    programmingLanguage: ["Laravel", "React", "InertiaJS", "MySQL"],
                    dateCreated: "2025",
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "E-commerce Platform for Wine Sales",
                    applicationCategory: "ShoppingApplication",
                    operatingSystem: "Web",
                    author: { "@id": "https://vubaokhanh.tech/#person" },
                    description: "A premium custom-built online wine store with AI-powered voice search, behavioral recommendations, and dynamic multi-variant product handling.",
                    programmingLanguage: ["PHP", "JavaScript", "MySQL"],
                    dateCreated: "2024",
                  },
                },
              ],
            }),
          }}
        />

        {/* ── FAQPage Schema — Services (enables Google Rich Results) ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Vũ Bảo Khanh chuyên xây dựng loại website nào?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Tôi chuyên xây dựng website doanh nghiệp tùy biến, hệ thống thương mại điện tử, admin & ERP panel và tối ưu hóa hiệu năng SEO. Các công nghệ chính bao gồm Laravel, React, Next.js, NestJS và TypeScript.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What technologies does Vu Bao Khanh use for web development?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Vu Bao Khanh specializes in fullstack development using Laravel (PHP), NestJS (Node.js), React, Next.js, TypeScript, MySQL, PostgreSQL, and Docker for enterprise-grade web applications.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Vũ Bảo Khanh có nhận làm website thương mại điện tử không?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Có. Tôi xây dựng các cửa hàng trực tuyến tỷ lệ chuyển đổi cao với giỏ hàng bảo mật, quy trình thanh toán mượt mà và tích hợp các cổng thanh toán phổ biến như VNPay, Momo, và Stripe.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How can I contact Vu Bao Khanh for a web development project?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can reach Vu Bao Khanh via email at vubaokhanh2311@gmail.com, connect on LinkedIn at linkedin.com/in/vubaokhannh, or browse the portfolio at vubaokhanh.tech.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Vũ Bảo Khanh có kinh nghiệm làm việc tại công ty nào?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Hiện tại tôi đang làm Fullstack PHP Developer tại BM WEB (từ tháng 1/2026). Trước đó tôi thực tập Frontend Developer tại Trung tâm Phần mềm Đại học Cần Thơ (CUSC) từ tháng 5 đến tháng 8 năm 2025.",
                  },
                },
              ],
            }),
          }}
        />

        {/* ── SiteNavigationElement Schema ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Site Navigation",
              itemListElement: [
                { "@type": "SiteNavigationElement", position: 1, name: "About", url: "https://vubaokhanh.tech/#about" },
                { "@type": "SiteNavigationElement", position: 2, name: "Services", url: "https://vubaokhanh.tech/#services" },
                { "@type": "SiteNavigationElement", position: 3, name: "Projects", url: "https://vubaokhanh.tech/#projects" },
                { "@type": "SiteNavigationElement", position: 4, name: "Skills", url: "https://vubaokhanh.tech/#skills" },
                { "@type": "SiteNavigationElement", position: 5, name: "Experience", url: "https://vubaokhanh.tech/#experience" },
                { "@type": "SiteNavigationElement", position: 6, name: "Contact", url: "https://vubaokhanh.tech/#contact" },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
