import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://ukenummeret.no/sitemap.xml",
    host: "https://ukenummeret.no",
  };
}
