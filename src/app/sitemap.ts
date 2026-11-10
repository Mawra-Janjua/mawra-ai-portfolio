import type { MetadataRoute } from "next";
import { automationDetails } from "@/lib/automation-projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: new URL("/", base).toString(), changeFrequency: "monthly", priority: 1 },
    ...automationDetails.map((p) => ({ url: new URL(`/projects/${p.slug}`, base).toString(), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
