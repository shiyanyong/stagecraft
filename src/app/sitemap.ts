import type { MetadataRoute } from "next";

const baseUrl = "https://stagecraft-1u3.pages.dev";
const lastModified = new Date("2026-07-01");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
