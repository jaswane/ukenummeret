import type { MetadataRoute } from "next";
import { HOLIDAY_SLUGS } from "@/lib/holidayInfo";
import { OBSERVANCE_SLUGS } from "@/lib/observanceInfo";

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
  const holidayInfo = HOLIDAY_SLUGS.map((slug) => `/helligdager/${slug}`);
  const observanceInfo = OBSERVANCE_SLUGS.map((slug) => `/merkedager/${slug}`);
  return [...staticPaths, ...yearly, ...holidayInfo, ...observanceInfo].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
