import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://vubaokhanh.tech",
      lastModified: new Date("2025-07-13"),
      changeFrequency: "monthly",
      priority: 1,
      // images for Google Images indexing
      images: ["https://vubaokhanh.tech/og-image.png"],
    },
  ];
}
