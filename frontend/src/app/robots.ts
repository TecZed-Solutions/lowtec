import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/perfil",
        "/checkout",
        "/entrar",
        "/confirmar-email",
        "/recuperar-senha",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
