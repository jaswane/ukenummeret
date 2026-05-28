import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // Matcher alle firesifrede år, så /kalender-YYYY og /helligdager-YYYY
    // fungerer uavhengig av hvilket år det er. Selve sidene validerer om
    // året er innenfor støttet spenn.
    return [
      { source: "/kalender-:year(\\d{4})", destination: "/kalender/:year" },
      { source: "/helligdager-:year(\\d{4})", destination: "/helligdager/:year" },
    ];
  },
};

export default nextConfig;
