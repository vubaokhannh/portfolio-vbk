import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesClient from "./ServicesClient";

// ── Next.js Dynamic SEO Metadata for /services page ──
export const metadata: Metadata = {
  title: "Dịch vụ Thiết kế & Phát triển Web Chuyên nghiệp | Vũ Bảo Khanh",
  description:
    "Cung cấp giải pháp phát triển web toàn diện: Next.js/React, Laravel, hệ thống Admin/ERP, Thương mại điện tử E-Commerce và tối ưu hóa hiệu năng, SEO chuẩn kỹ thuật.",
  alternates: {
    canonical: "https://vubaokhanh.tech/services",
    languages: {
      "en": "https://vubaokhanh.tech/services",
      "vi": "https://vubaokhanh.tech/services",
      "x-default": "https://vubaokhanh.tech/services",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://vubaokhanh.tech/services",
    title: "Dịch vụ Thiết kế & Phát triển Web Chuyên nghiệp | Vũ Bảo Khanh",
    description:
      "Cung cấp giải pháp phát triển web toàn diện: Next.js/React, Laravel, hệ thống Admin/ERP, Thương mại điện tử E-Commerce và tối ưu hóa hiệu năng, SEO chuẩn kỹ thuật.",
    siteName: "Vũ Bảo Khanh Portfolio",
    images: [
      {
        url: "https://vubaokhanh.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vũ Bảo Khanh Web Development Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dịch vụ Thiết kế & Phát triển Web Chuyên nghiệp | Vũ Bảo Khanh",
    description:
      "Cung cấp giải pháp phát triển web toàn diện: Next.js/React, Laravel, hệ thống Admin/ERP, Thương mại điện tử E-Commerce và tối ưu hóa hiệu năng, SEO chuẩn kỹ thuật.",
    images: ["https://vubaokhanh.tech/og-image.png"],
    creator: "@vubaokhannh",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <h1 className="sr-only">Dịch vụ thiết kế web, lập trình hệ thống ERP và tối ưu SEO — Vũ Bảo Khanh</h1>
      <ServicesClient />
      <Footer />
    </>
  );
}
