import { describe, it, expect } from "vitest";
import {
  FIRST_PUBLISHED_YEAR,
  getPublishedYears,
  isSupportedYear,
  maxSupportedYear,
} from "./years";
import { civilDate } from "./weekUtils";

describe("Årsspenn (framtidssikring)", () => {
  it("inkluderer currentYear - 1, currentYear og currentYear + 10", () => {
    const today = civilDate(2026, 6, 15);
    const years = getPublishedYears(today);
    expect(years).toContain(2025); // currentYear - 1
    expect(years).toContain(2026); // currentYear
    expect(years).toContain(2036); // currentYear + 10
  });

  it("flytter øvre grense med årsskiftet", () => {
    expect(maxSupportedYear(civilDate(2026, 1, 1))).toBe(2036);
    expect(maxSupportedYear(civilDate(2027, 1, 1))).toBe(2037);
  });

  it("isSupportedYear følger inneværende år", () => {
    const y2027 = civilDate(2027, 3, 1);
    expect(isSupportedYear(2037, y2027)).toBe(true); // currentYear + 10
    expect(isSupportedYear(2038, y2027)).toBe(false); // for langt fram
    expect(isSupportedYear(2025, y2027)).toBe(true); // historikk bevart
    expect(isSupportedYear(2024, y2027)).toBe(false); // før FIRST_PUBLISHED_YEAR
  });

  it("starter alltid ved FIRST_PUBLISHED_YEAR", () => {
    const years = getPublishedYears(civilDate(2030, 6, 1));
    expect(years[0]).toBe(FIRST_PUBLISHED_YEAR);
    expect(years).toContain(2040); // currentYear + 10
  });
});
