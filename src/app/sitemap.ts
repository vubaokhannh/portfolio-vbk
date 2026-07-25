import { MetadataRoute } from "next";
import { fetchRawBlogPosts } from "@/lib/data-fetchers";
import { postsEn } from "@/data/posts";

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vubaokhanh.tech";

  // Base routes — lastModified set to last meaningful content update date
  // (not new Date() which changes every request and causes Google to distrust it)
  const SITE_LAST_UPDATED = new Date("2025-06-01"); // Update this when making major content changes

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [`${baseUrl}/opengraph-image`],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: SITE_LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(), // blog index updates frequently
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Fetch all posts from DB (fallback to postsEn)
  const dbPosts = await fetchRawBlogPosts();
  const allSlugs = new Set<string>();

  const blogRoutes: MetadataRoute.Sitemap = [];

  // Add DB posts
  if (dbPosts && dbPosts.length > 0) {
    for (const post of dbPosts) {
      if (post.slug) {
        allSlugs.add(post.slug);
        blogRoutes.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.iso_date ? new Date(post.iso_date) : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  // Add static fallback posts if not already present
  for (const post of postsEn) {
    if (!allSlugs.has(post.slug)) {
      blogRoutes.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.isoDate),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return [...routes, ...blogRoutes];
}
