import type { MetadataRoute } from "next";
import { LEGAL_ROTA } from "@/config/legal";
import { siteUrl } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}${LEGAL_ROTA}`,
    },
  ];
}
