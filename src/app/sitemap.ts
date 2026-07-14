import { MetadataRoute } from "next";
import { postsEn } from "@/data/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vubaokhanh.tech";

  // Base routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date("2025-07-13"),
      changeFrequency: "monthly" as const,
      priority: 1,
      images: [`${baseUrl}/og-image.png`],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2025-07-13"),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic Blog Post routes
  const blogRoutes = postsEn.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
