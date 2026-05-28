import { describe, it, expect } from "vitest";
import {
  civilDate,
  formatNorwegianDate,
  formatNorwegianDateRange,
  getCurrentNorwegianDate,
  getIsoWeek,
  getIsoWeekInfo,
  getWeekDateRange,
  getWeeksInIsoYear,
  parseDateOrWeekInput,
} from "./weekUtils";

describe("ISO-ukeberegning", () => {
  it("2026-05-26 ligger i uke 22", () => {
    const info = getIsoWeekInfo(civilDate(2026, 5, 26));
    expect(info.isoWeek).toBe(22);
    expect(info.isoYear).toBe(2026);
    expect(info.weekdayName).toBe("tirsdag");
    expect(info.dayOfWeek).toBe(2);
  });

  it("Uke 22 i 2026 varer fra mandag 25. mai til søndag 31. mai", () => {
    const { start, end } = getWeekDateRange(2026, 22);
    expect(start.getUTCFullYear()).toBe(2026);
    expect(start.getUTCMonth()).toBe(4); // mai
    expect(start.getUTCDate()).toBe(25);
    expect(end.getUTCDate()).toBe(31);
    expect(formatNorwegianDateRange(start, end)).toBe("25.–31. mai 2026");
  });

  it("2021-01-01 tilhører ISO-uke 53 i 2020", () => {
    const info = getIsoWeek(civilDate(2021, 1, 1));
    expect(info.isoYear).toBe(2020);
    expect(info.isoWeek).toBe(53);
  });

  it("2020 har 53 ISO-uker", () => {
    expect(getWeeksInIsoYear(2020)).toBe(53);
  });

  it("2025 har 52 ISO-uker (ingen uke 53)", () => {
    expect(getWeeksInIsoYear(2025)).toBe(52);
  });

  it("2026 har 53 ISO-uker (starter på torsdag)", () => {
    // ISO 8601: et år har 53 uker når 1. januar er torsdag,
    // eller når 31. desember er torsdag (skuddår som starter på onsdag).
    expect(getWeeksInIsoYear(2026)).toBe(53);
  });

  it("2027 har 52 ISO-uker", () => {
    expect(getWeeksInIsoYear(2027)).toBe(52);
  });

  it("Skuddår håndteres korrekt (2024)", () => {
    // 2024 er skuddår, 29. februar finnes.
    const feb29 = civilDate(2024, 2, 29);
    expect(feb29.getUTCMonth()).toBe(1);
    expect(feb29.getUTCDate()).toBe(29);
    // 2024-02-29 er en torsdag → uke 9.
    const info = getIsoWeekInfo(feb29);
    expect(info.weekdayName).toBe("torsdag");
    expect(info.isoWeek).toBe(9);
  });
});

describe("Årsskifte og ISO-uke rundt nyttår", () => {
  it("2026-12-31 ligger i uke 53 av 2026", () => {
    const info = getIsoWeek(civilDate(2026, 12, 31));
    expect(info.isoYear).toBe(2026);
    expect(info.isoWeek).toBe(53);
  });

  it("2027-01-01 tilhører fortsatt uke 53 av ISO-året 2026", () => {
    const info = getIsoWeek(civilDate(2027, 1, 1));
    expect(info.isoYear).toBe(2026);
    expect(info.isoWeek).toBe(53);
  });

  it("2027-01-04 er mandag i uke 1 av 2027", () => {
    const info = getIsoWeekInfo(civilDate(2027, 1, 4));
    expect(info.isoYear).toBe(2027);
    expect(info.isoWeek).toBe(1);
    expect(info.weekdayName).toBe("mandag");
  });

  it("nyttårsdag 2025 (onsdag) ligger i uke 1 av 2025", () => {
    const info = getIsoWeek(civilDate(2025, 1, 1));
    expect(info.isoYear).toBe(2025);
    expect(info.isoWeek).toBe(1);
  });
});

describe("parseDateOrWeekInput", () => {
  const today = civilDate(2026, 5, 26);

  it("forstår norsk punktdato 26.05.2026", () => {
    const r = parseDateOrWeekInput("26.05.2026", today);
    expect(r.type).toBe("date");
    if (r.type === "date") {
      expect(r.date.getUTCDate()).toBe(26);
      expect(r.date.getUTCMonth()).toBe(4);
      expect(r.date.getUTCFullYear()).toBe(2026);
    }
  });

  it("forstår ISO-dato 2026-05-26", () => {
    const r = parseDateOrWeekInput("2026-05-26", today);
    expect(r.type).toBe("date");
  });

  it("forstår '26 mai 2026'", () => {
    const r = parseDateOrWeekInput("26 mai 2026", today);
    expect(r.type).toBe("date");
  });

  it("forstår 'uke 22'", () => {
    const r = parseDateOrWeekInput("uke 22", today);
    expect(r.type).toBe("week");
    if (r.type === "week") {
      expect(r.isoWeek).toBe(22);
      expect(r.isoYear).toBe(2026);
    }
  });

  it("forstår 'uke 22 2027'", () => {
    const r = parseDateOrWeekInput("uke 22 2027", today);
    expect(r.type).toBe("week");
    if (r.type === "week") {
      expect(r.isoWeek).toBe(22);
      expect(r.isoYear).toBe(2027);
    }
  });

  it("forstår '2027 uke 5'", () => {
    const r = parseDateOrWeekInput("2027 uke 5", today);
    expect(r.type).toBe("week");
    if (r.type === "week") {
      expect(r.isoWeek).toBe(5);
      expect(r.isoYear).toBe(2027);
    }
  });

  it("forstår '22 2026'", () => {
    const r = parseDateOrWeekInput("22 2026", today);
    expect(r.type).toBe("week");
    if (r.type === "week") {
      expect(r.isoYear).toBe(2026);
      expect(r.isoWeek).toBe(22);
    }
  });

  it("avviser uke 53 i et år uten uke 53", () => {
    const r = parseDateOrWeekInput("uke 53 2025", today);
    expect(r.type).toBe("invalid");
    if (r.type === "invalid") {
      expect(r.reason).toContain("2025");
      expect(r.reason).toContain("52");
    }
  });

  it("godtar uke 53 i 2020", () => {
    const r = parseDateOrWeekInput("uke 53 2020", today);
    expect(r.type).toBe("week");
  });

  it("avviser tull", () => {
    expect(parseDateOrWeekInput("hei verden", today).type).toBe("invalid");
    expect(parseDateOrWeekInput("", today).type).toBe("invalid");
  });
});

describe("Norsk datoformat", () => {
  it("formatNorwegianDate('26. mai 2026')", () => {
    expect(formatNorwegianDate(civilDate(2026, 5, 26))).toBe("26. mai 2026");
  });

  it("formatNorwegianDateRange håndterer samme måned", () => {
    expect(
      formatNorwegianDateRange(civilDate(2026, 5, 25), civilDate(2026, 5, 31))
    ).toBe("25.–31. mai 2026");
  });

  it("formatNorwegianDateRange håndterer kryssende måned", () => {
    expect(
      formatNorwegianDateRange(civilDate(2026, 5, 25), civilDate(2026, 6, 1))
    ).toBe("25. mai – 1. juni 2026");
  });

  it("formatNorwegianDateRange håndterer kryssende år", () => {
    expect(
      formatNorwegianDateRange(civilDate(2025, 12, 29), civilDate(2026, 1, 4))
    ).toBe("29. desember 2025 – 4. januar 2026");
  });
});

describe("Europe/Oslo dato", () => {
  it("returnerer en Date for nåtid", () => {
    const d = getCurrentNorwegianDate();
    expect(d).toBeInstanceOf(Date);
    expect(d.getUTCHours()).toBe(0);
  });

  it("gir riktig Oslo-dato for en kjent UTC-tid", () => {
    // 2026-01-01 00:30 UTC er 01:30 Oslo (vintertid) → fortsatt 1. januar.
    const utc = new Date(Date.UTC(2026, 0, 1, 0, 30));
    const d = getCurrentNorwegianDate(utc);
    expect(d.getUTCFullYear()).toBe(2026);
    expect(d.getUTCMonth()).toBe(0);
    expect(d.getUTCDate()).toBe(1);
  });

  it("gir riktig Oslo-dato over midnatt-overgang", () => {
    // 2026-05-31 23:30 UTC = 2026-06-01 01:30 sommertid Oslo.
    const utc = new Date(Date.UTC(2026, 4, 31, 23, 30));
    const d = getCurrentNorwegianDate(utc);
    expect(d.getUTCMonth()).toBe(5);
    expect(d.getUTCDate()).toBe(1);
  });
});
