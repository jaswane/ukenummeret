import { describe, it, expect } from "vitest";
import {
  calculateEaster,
  getNextHoliday,
  getNorwegianObservances,
  getNorwegianPublicHolidays,
} from "./norwegianHolidays";
import { civilDate, formatIsoDate } from "./weekUtils";

describe("Påske og bevegelige helligdager", () => {
  it("Påsken 2025 er 20. april", () => {
    expect(formatIsoDate(calculateEaster(2025))).toBe("2025-04-20");
  });
  it("Påsken 2026 er 5. april", () => {
    expect(formatIsoDate(calculateEaster(2026))).toBe("2026-04-05");
  });
  it("Påsken 2027 er 28. mars", () => {
    expect(formatIsoDate(calculateEaster(2027))).toBe("2027-03-28");
  });
});

describe("Norske offentlige helligdager", () => {
  it("inneholder 12 offentlige helligdager", () => {
    expect(getNorwegianPublicHolidays(2026)).toHaveLength(12);
  });

  it("17. mai er Grunnlovsdag (alle år)", () => {
    for (const year of [2024, 2025, 2026, 2027, 2030]) {
      const list = getNorwegianPublicHolidays(year);
      const may17 = list.find(
        (h) =>
          h.date.getUTCMonth() === 4 && h.date.getUTCDate() === 17
      );
      expect(may17?.name).toBe("Grunnlovsdag");
    }
  });

  it("25. desember er 1. juledag", () => {
    const list = getNorwegianPublicHolidays(2026);
    const dec25 = list.find(
      (h) => h.date.getUTCMonth() === 11 && h.date.getUTCDate() === 25
    );
    expect(dec25?.name).toBe("1. juledag");
  });

  it("Kristi himmelfartsdag 2026 er 14. mai", () => {
    const list = getNorwegianPublicHolidays(2026);
    const h = list.find((x) => x.name === "Kristi himmelfartsdag");
    expect(formatIsoDate(h!.date)).toBe("2026-05-14");
  });

  it("1. pinsedag 2026 er 24. mai", () => {
    const list = getNorwegianPublicHolidays(2026);
    const h = list.find((x) => x.name === "1. pinsedag");
    expect(formatIsoDate(h!.date)).toBe("2026-05-24");
  });

  it("Skjærtorsdag 2025 er 17. april", () => {
    const list = getNorwegianPublicHolidays(2025);
    const h = list.find((x) => x.name === "Skjærtorsdag");
    expect(formatIsoDate(h!.date)).toBe("2025-04-17");
  });

  it("alle har kind=public", () => {
    for (const h of getNorwegianPublicHolidays(2026)) {
      expect(h.kind).toBe("public");
    }
  });
});

describe("Norske merkedager", () => {
  it("Morsdag 2026 er andre søndag i februar (8. februar)", () => {
    const list = getNorwegianObservances(2026);
    const h = list.find((x) => x.name === "Morsdag");
    expect(formatIsoDate(h!.date)).toBe("2026-02-08");
  });

  it("Farsdag 2026 er andre søndag i november (8. november)", () => {
    const list = getNorwegianObservances(2026);
    const h = list.find((x) => x.name === "Farsdag");
    expect(formatIsoDate(h!.date)).toBe("2026-11-08");
  });

  it("Julaften, sankthansaften og nyttårsaften er merkedager (ikke offentlige)", () => {
    const list = getNorwegianObservances(2026);
    expect(list.find((x) => x.name === "Julaften")?.kind).toBe("observance");
    expect(list.find((x) => x.name === "Sankthansaften")?.kind).toBe(
      "observance"
    );
    expect(list.find((x) => x.name === "Nyttårsaften")?.kind).toBe(
      "observance"
    );
  });
});

describe("getNextHoliday", () => {
  it("finner neste offentlige helligdag", () => {
    // 26. mai 2026 → neste offentlige helligdag bør være Grunnlovsdag bak oss
    // og Kristi himmelfartsdag (14. mai) bak oss, så neste er 17. mai? Nei, bak.
    // Faktisk: 24. mai 1. pinsedag, 25. mai 2. pinsedag. Etter 26. mai er neste
    // 25. desember 1. juledag.
    const next = getNextHoliday(civilDate(2026, 5, 26));
    expect(next?.name).toBe("1. juledag");
    expect(next?.daysUntil).toBeGreaterThan(0);
  });

  it("krysser årsskifte hvis nødvendig", () => {
    const next = getNextHoliday(civilDate(2026, 12, 27));
    expect(next?.name).toBe("1. nyttårsdag");
    expect(next?.date.getUTCFullYear()).toBe(2027);
  });

  it("returnerer dagens helligdag hvis det er én", () => {
    const next = getNextHoliday(civilDate(2026, 5, 17));
    expect(next?.name).toBe("Grunnlovsdag");
    expect(next?.daysUntil).toBe(0);
  });
});
