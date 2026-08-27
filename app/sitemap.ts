import { MetadataRoute } from "next";
import { getEventSlugs } from "@/lib/cms";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://samirelgammal.com";
  const slugs = await getEventSlugs();

  const eventUrls = slugs.map((slug) => ({
    url: `${baseUrl}/events/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...eventUrls,
  ];
}
