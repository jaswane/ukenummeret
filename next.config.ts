import type { NextConfig } from "next";

const yearSlugs = (prefix: string) =>
  Array.from({ length: 11 }, (_, i) => 2025 + i).map((year) => ({
    source: `/${prefix}-${year}`,
    destination: `/${prefix}/${year}`,
  }));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [...yearSlugs("kalender"), ...yearSlugs("helligdager")];
  },
};

export default nextConfig;
