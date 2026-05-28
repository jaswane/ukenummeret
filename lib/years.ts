import { getCurrentNorwegianDate } from "./weekUtils";

/**
 * Sentralt år-spenn for hele siden. Spennet er relativt til
 * inneværende år (norsk tidssone), slik at siden følger med over
 * årsskifter uten manuell oppdatering.
 *
 * - FIRST_PUBLISHED_YEAR holder gamle årssider tilgjengelige (historikk
 *   og SEO bevares: /helligdager-2026 fungerer for alltid).
 * - YEARS_AHEAD bestemmer hvor langt fram vi publiserer/aksepterer år.
 */
export const FIRST_PUBLISHED_YEAR = 2025;
export const YEARS_AHEAD = 10;

export function currentNorwegianYear(
  today: Date = getCurrentNorwegianDate()
): number {
  return today.getUTCFullYear();
}

/** Øvre grense: inneværende år + YEARS_AHEAD. */
export function maxSupportedYear(
  today: Date = getCurrentNorwegianDate()
): number {
  return currentNorwegianYear(today) + YEARS_AHEAD;
}

/** Alle publiserte år: FIRST_PUBLISHED_YEAR .. inneværende år + YEARS_AHEAD. */
export function getPublishedYears(
  today: Date = getCurrentNorwegianDate()
): number[] {
  const max = maxSupportedYear(today);
  const years: number[] = [];
  for (let y = FIRST_PUBLISHED_YEAR; y <= max; y++) years.push(y);
  return years;
}

/**
 * Et gyldig år (ikke 404). Beregnes ved kalltidspunkt, slik at år
 * innenfor spennet kan rendres on-demand etter et årsskifte selv uten
 * ny deploy (Next.js dynamicParams).
 */
export function isSupportedYear(
  year: number,
  today: Date = getCurrentNorwegianDate()
): boolean {
  return (
    Number.isInteger(year) &&
    year >= FIRST_PUBLISHED_YEAR &&
    year <= maxSupportedYear(today)
  );
}
