import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogListClient from "./BlogListClient";

// ── Next.js Dynamic SEO Metadata for /blog page ──
export const metadata: Metadata = {
  title: "Blog & Chia sẻ kỹ thuật | Vũ Bảo Khanh — Fullstack Web Engineer",
  description:
    "Các bài viết chia sẻ về tối ưu hiệu suất cơ sở dữ liệu, kiến trúc hệ thống thời gian thực (NestJS/Socket.io), lập trình Laravel/React và các dự án thực tế của Vũ Bảo Khanh.",
  alternates: {
    canonical: "https://vubaokhanh.tech/blog",
    languages: {
      "en": "https://vubaokhanh.tech/blog",
      "vi": "https://vubaokhanh.tech/blog",
      "x-default": "https://vubaokhanh.tech/blog",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://vubaokhanh.tech/blog",
    title: "Blog & Chia sẻ kỹ thuật | Vũ Bảo Khanh — Fullstack Web Engineer",
    description:
      "Các bài viết chia sẻ về tối ưu hiệu suất cơ sở dữ liệu, kiến trúc hệ thống thời gian thực (NestJS/Socket.io), lập trình Laravel/React và các dự án thực tế của Vũ Bảo Khanh.",
    siteName: "Vũ Bảo Khanh Portfolio",
    images: [
      {
        url: "https://vubaokhanh.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vũ Bảo Khanh Technical Blog",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Chia sẻ kỹ thuật | Vũ Bảo Khanh — Fullstack Web Engineer",
    description:
      "Các bài viết chia sẻ về tối ưu hiệu suất cơ sở dữ liệu, kiến trúc hệ thống thời gian thực (NestJS/Socket.io), lập trình Laravel/React và các dự án thực tế của Vũ Bảo Khanh.",
    images: ["https://vubaokhanh.tech/og-image.png"],
    creator: "@vubaokhannh",
  },
};

export default function BlogListPage() {
  return (
    <>
      <Navbar />
      {/* sr-only h1 ensures Google crawler always finds the primary heading in SSR HTML */}
      <h1 className="sr-only">Blog &amp; Chia sẻ kỹ thuật — Vũ Bảo Khanh Fullstack Developer</h1>
      <BlogListClient />
      <Footer />
    </>
  );
}
