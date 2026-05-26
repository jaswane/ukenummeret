import {
  addDays,
  civilDate,
  daysBetween,
  formatNorwegianDate,
  getIsoWeek,
  isoWeekday,
  isSameCivilDay,
  WEEKDAY_NAMES,
} from "./weekUtils";

export type HolidayKind = "public" | "observance";

export type Holiday = {
  name: string;
  date: Date;
  kind: HolidayKind;
};

export type HolidayWithMeta = Holiday & {
  weekday: string;
  isoWeek: number;
  isoYear: number;
  formattedDate: string;
  daysUntil: number | null;
};

/** Anonymous Gregorian (Meeus/Jones/Butcher) påskeformel. */
export function calculateEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = Math.floor((h + l - 7 * m + 114) / 31);
  const p = (h + l - 7 * m + 114) % 31;
  return civilDate(year, n, p + 1);
}

export function getNorwegianPublicHolidays(year: number): Holiday[] {
  const easter = calculateEaster(year);
  const make = (name: string, date: Date): Holiday => ({
    name,
    date,
    kind: "public",
  });
  return [
    make("1. nyttårsdag", civilDate(year, 1, 1)),
    make("Skjærtorsdag", addDays(easter, -3)),
    make("Langfredag", addDays(easter, -2)),
    make("1. påskedag", easter),
    make("2. påskedag", addDays(easter, 1)),
    make("Arbeidernes dag", civilDate(year, 5, 1)),
    make("Grunnlovsdag", civilDate(year, 5, 17)),
    make("Kristi himmelfartsdag", addDays(easter, 39)),
    make("1. pinsedag", addDays(easter, 49)),
    make("2. pinsedag", addDays(easter, 50)),
    make("1. juledag", civilDate(year, 12, 25)),
    make("2. juledag", civilDate(year, 12, 26)),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** Returnerer dato for n-te ukedag i gitt måned. */
function nthWeekdayOfMonth(
  year: number,
  month: number,
  isoTargetWeekday: number,
  n: number
): Date {
  const first = civilDate(year, month, 1);
  const firstWeekday = isoWeekday(first);
  let day = 1 + ((isoTargetWeekday - firstWeekday + 7) % 7);
  day += (n - 1) * 7;
  return civilDate(year, month, day);
}

export function getNorwegianObservances(year: number): Holiday[] {
  const make = (name: string, date: Date): Holiday => ({
    name,
    date,
    kind: "observance",
  });
  return [
    make("Valentinsdagen", civilDate(year, 2, 14)),
    // Morsdag i Norge: andre søndag i februar.
    make("Morsdag", nthWeekdayOfMonth(year, 2, 7, 2)),
    make("Sankthansaften", civilDate(year, 6, 23)),
    make("Halloween", civilDate(year, 10, 31)),
    // Farsdag i Norge: andre søndag i november.
    make("Farsdag", nthWeekdayOfMonth(year, 11, 7, 2)),
    make("Julaften", civilDate(year, 12, 24)),
    make("Nyttårsaften", civilDate(year, 12, 31)),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** Slår sammen offentlige helligdager og merkedager, med tydelig merking. */
export function getAllNorwegianHolidays(year: number): Holiday[] {
  return [
    ...getNorwegianPublicHolidays(year),
    ...getNorwegianObservances(year),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());
}

/** Neste offentlige helligdag/fridag fra og med gitt dato. */
export function getNextHoliday(
  fromDate: Date
): (Holiday & { daysUntil: number }) | null {
  const year = fromDate.getUTCFullYear();
  const candidates = [
    ...getNorwegianPublicHolidays(year),
    ...getNorwegianPublicHolidays(year + 1),
  ];
  for (const h of candidates) {
    if (h.date.getTime() >= fromDate.getTime()) {
      return { ...h, daysUntil: daysBetween(fromDate, h.date) };
    }
  }
  return null;
}

export function decorateHoliday(
  holiday: Holiday,
  today: Date | null = null
): HolidayWithMeta {
  const weekday = WEEKDAY_NAMES[isoWeekday(holiday.date) - 1];
  const { isoYear, isoWeek } = getIsoWeek(holiday.date);
  const daysUntil =
    today === null
      ? null
      : isSameCivilDay(today, holiday.date)
      ? 0
      : holiday.date.getTime() >= today.getTime()
      ? daysBetween(today, holiday.date)
      : null;
  return {
    ...holiday,
    weekday,
    isoWeek,
    isoYear,
    formattedDate: formatNorwegianDate(holiday.date),
    daysUntil,
  };
}
