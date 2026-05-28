import { HOLIDAY_INFO } from "./holidayInfo";
import { OBSERVANCE_INFO } from "./observanceInfo";

export type RelatedDayLink = {
  href: string;
  label: string;
  hint: "Helligdag" | "Merkedag";
};

/**
 * Løser opp en liste med slugger til lenker. Slugger kan peke på enten
 * en offentlig helligdag (/helligdager/...) eller en merkedag
 * (/merkedager/...).
 */
export function resolveRelatedDays(slugs: string[]): RelatedDayLink[] {
  const out: RelatedDayLink[] = [];
  for (const slug of slugs) {
    const h = HOLIDAY_INFO.find((x) => x.slug === slug);
    if (h) {
      out.push({ href: `/helligdager/${h.slug}`, label: h.name, hint: "Helligdag" });
      continue;
    }
    const o = OBSERVANCE_INFO.find((x) => x.slug === slug);
    if (o) {
      out.push({ href: `/merkedager/${o.slug}`, label: o.name, hint: "Merkedag" });
    }
  }
  return out;
}
