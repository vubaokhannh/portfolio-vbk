import type { Metadata } from "next";
import "./globals.css";
import { personal } from "@/data/personal";

export const metadata: Metadata = {
  metadataBase: new URL("https://vubaokhanh.dev"),
  title: {
    default: `${personal.name} — Fullstack Developer`,
    template: `%s | ${personal.name}`,
  },
  description:
    "Fullstack Developer specializing in Laravel, React, TypeScript and Node.js. Building scalable digital experiences and enterprise systems.",
  keywords: [
    "Vu Bao Khanh",
    "Fullstack Developer",
    "Laravel Developer",
    "React Developer",
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
    url: "https://vubaokhanh.dev",
    title: `${personal.name} — Fullstack Developer`,
    description:
      "Building scalable digital experiences and enterprise systems with Laravel, React & TypeScript.",
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
      "Building scalable digital experiences and enterprise systems.",
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
              url: "https://vubaokhanh.dev",
              jobTitle: personal.role,
              description: personal.bio,
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
