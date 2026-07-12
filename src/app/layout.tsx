import type { Metadata } from "next";
import "./globals.css";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  metadataBase: new URL("https://vubaokhanh.tech"),
  title: {
    default: `${personal.name} — Fullstack Developer`,
    template: `%s | ${personal.name}`,
  },
  description:
    "Vu Bao Khanh — Fullstack Developer specializing in custom web development, backend engineering (Laravel, NestJS), and frontend building (React, Next.js) for scalable products.",
  keywords: [
    "Vu Bao Khanh",
    "Vũ Bảo Khanh",
    "Vũ Bảo Khanh PC08901",
    "Vu Bao Khanh Developer",
    "vubaokhanh.tech",
    "vubaokhanh",
    "custom web development",
    "Fullstack Developer",
    "Laravel Developer",
    "React Developer",
    "NestJS",
    "TypeScript",
    "Node.js",
    "Vietnam Developer",
    "Portfolio",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vubaokhanh.tech",
    title: `${personal.name} — Fullstack Developer`,
    description:
      "Portfolio and custom web development services of Vu Bao Khanh — Fullstack Developer Laravel, React & NestJS.",
    siteName: `${personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${personal.name} — Fullstack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — Fullstack Developer`,
    description:
      "Portfolio and custom web development services of Vu Bao Khanh.",
    images: ["/og-image.png"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: personal.name,
              url: "https://vubaokhanh.tech",
              jobTitle: personal.role,
              description: "Vu Bao Khanh — Fullstack Developer portfolio specializing in custom web development, backend engineering (Laravel, NestJS) and frontend frameworks.",
              sameAs: [personal.github, personal.linkedin, personal.facebook],
            }),
          }}
        />
      </head>
      <body className="bg-[#050505] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
