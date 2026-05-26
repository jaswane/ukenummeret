import type { MetadataRoute } from "next";

const BASE_URL = "https://ukenummeret.no";
const YEARS = Array.from({ length: 11 }, (_, i) => 2025 + i);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/dato-til-uke",
    "/uke-til-dato",
    "/om",
    "/kontakt",
    "/personvern",
    "/datakilder-og-beregning",
    "/ansvarsfraskrivelse",
  ];
  const yearly: string[] = [];
  for (const y of YEARS) {
    yearly.push(`/kalender-${y}`);
    yearly.push(`/helligdager-${y}`);
    yearly.push(`/uker/${y}`);
  }
  return [...staticPaths, ...yearly].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
