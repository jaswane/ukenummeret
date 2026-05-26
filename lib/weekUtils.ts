/**
 * Kalender- og ISO 8601-ukelogikk for Ukenummeret.no.
 *
 * Vi opererer på "sivile datoer" representert som Date-objekter konstruert
 * via Date.UTC(...). Det vil si: vi bruker UTC-feltene som om de var
 * Europe/Oslo-feltene, og ignorerer timezone-offset for ren kalendermatte.
 */

export const OSLO_TZ = "Europe/Oslo";

const MS_PER_DAY = 86_400_000;

export type IsoWeekInfo = {
  isoYear: number;
  isoWeek: number;
  weekday: number; // 1 = mandag, 7 = søndag
  weekdayName: string;
  dayOfWeek: number; // alias for weekday (1-7)
  start: Date;
  end: Date;
};

export const WEEKDAY_NAMES = [
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
  "søndag",
] as const;

export const MONTH_NAMES = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
] as const;

export const MONTH_SHORT = [
  "jan",
  "feb",
  "mar",
  "apr",
  "mai",
  "jun",
  "jul",
  "aug",
  "sep",
  "okt",
  "nov",
  "des",
] as const;

const MONTH_INPUT_MAP: Record<string, number> = {
  januar: 1, jan: 1,
  februar: 2, feb: 2,
  mars: 3, mar: 3,
  april: 4, apr: 4,
  mai: 5,
  juni: 6, jun: 6,
  juli: 7, jul: 7,
  august: 8, aug: 8,
  september: 9, sep: 9, sept: 9,
  oktober: 10, okt: 10, oct: 10,
  november: 11, nov: 11,
  desember: 12, des: 12, dec: 12,
};

/**
 * Returnerer en sivil-dato (UTC-felt = Oslo-felt) for nåtid i Oslo.
 */
export function getCurrentNorwegianDate(now: Date = new Date()): Date {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: OSLO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(now);
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);
  const y = get("year");
  const m = get("month");
  const d = get("day");
  return new Date(Date.UTC(y, m - 1, d));
}

/** Lager en sivil-dato fra Y/M/D (1-indeksert måned). */
export function civilDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month - 1, day));
}

export function isoWeekday(date: Date): number {
  // Date.getUTCDay(): 0=søndag..6=lørdag. ISO: 1=mandag..7=søndag.
  const day = date.getUTCDay();
  return day === 0 ? 7 : day;
}

/** Kjernen i ISO-ukeberegning. */
export function getIsoWeek(date: Date): { isoYear: number; isoWeek: number } {
  const d = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const dayNum = isoWeekday(d);
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const isoYear = d.getUTCFullYear();
  const jan1 = Date.UTC(isoYear, 0, 1);
  const isoWeek = Math.ceil(((d.getTime() - jan1) / MS_PER_DAY + 1) / 7);
  return { isoYear, isoWeek };
}

/** Mandag–søndag for gitt ISO-år og ukenummer. */
export function getWeekDateRange(
  isoYear: number,
  isoWeek: number
): { start: Date; end: Date } {
  // Jan 4 ligger alltid i ISO-uke 1.
  const jan4 = civilDate(isoYear, 1, 4);
  const jan4Weekday = isoWeekday(jan4);
  const mondayWeek1 = new Date(jan4);
  mondayWeek1.setUTCDate(jan4.getUTCDate() - (jan4Weekday - 1));
  const start = new Date(mondayWeek1);
  start.setUTCDate(start.getUTCDate() + (isoWeek - 1) * 7);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 6);
  return { start, end };
}

/** Returnerer 52 eller 53 ISO-uker for gitt ISO-år. */
export function getWeeksInIsoYear(isoYear: number): number {
  // Et ISO-år har 53 uker hvis 1. januar er torsdag, eller hvis
  // 31. desember er torsdag (skuddår som starter på onsdag).
  const jan1 = civilDate(isoYear, 1, 1);
  const dec31 = civilDate(isoYear, 12, 31);
  return isoWeekday(jan1) === 4 || isoWeekday(dec31) === 4 ? 53 : 52;
}

export function getIsoWeekInfo(date: Date): IsoWeekInfo {
  const { isoYear, isoWeek } = getIsoWeek(date);
  const { start, end } = getWeekDateRange(isoYear, isoWeek);
  const weekday = isoWeekday(date);
  return {
    isoYear,
    isoWeek,
    weekday,
    dayOfWeek: weekday,
    weekdayName: WEEKDAY_NAMES[weekday - 1],
    start,
    end,
  };
}

export function formatNorwegianDate(date: Date): string {
  const d = date.getUTCDate();
  const m = MONTH_NAMES[date.getUTCMonth()];
  const y = date.getUTCFullYear();
  return `${d}. ${m} ${y}`;
}

export function formatShortNorwegianDate(date: Date): string {
  const d = date.getUTCDate();
  const m = MONTH_SHORT[date.getUTCMonth()];
  const y = date.getUTCFullYear();
  return `${d}. ${m} ${y}`;
}

export function formatIsoDate(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Norsk datointervall. */
export function formatNorwegianDateRange(start: Date, end: Date): string {
  const sy = start.getUTCFullYear();
  const sm = start.getUTCMonth();
  const sd = start.getUTCDate();
  const ey = end.getUTCFullYear();
  const em = end.getUTCMonth();
  const ed = end.getUTCDate();

  if (sy === ey && sm === em) {
    return `${sd}.–${ed}. ${MONTH_NAMES[sm]} ${sy}`;
  }
  if (sy === ey) {
    return `${sd}. ${MONTH_NAMES[sm]} – ${ed}. ${MONTH_NAMES[em]} ${sy}`;
  }
  return `${sd}. ${MONTH_NAMES[sm]} ${sy} – ${ed}. ${MONTH_NAMES[em]} ${ey}`;
}

export function daysBetween(from: Date, to: Date): number {
  const a = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  const b = Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate());
  return Math.round((b - a) / MS_PER_DAY);
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

export function isSameCivilDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

export type ParsedInput =
  | { type: "date"; date: Date }
  | { type: "week"; isoYear: number; isoWeek: number }
  | { type: "invalid"; reason?: string };

/**
 * Forstår uttrykk som "26.05.2026", "2026-05-26", "26 mai 2026",
 * "uke 22", "uke 22 2026", "22 2026", "2026 uke 22".
 */
export function parseDateOrWeekInput(
  input: string,
  today: Date = getCurrentNorwegianDate()
): ParsedInput {
  const raw = (input ?? "").trim().toLowerCase();
  if (!raw) return { type: "invalid", reason: "Tom verdi" };

  // ISO-dato: 2026-05-26
  let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(raw);
  if (m) {
    return toDateResult(Number(m[1]), Number(m[2]), Number(m[3]));
  }

  // 26.05.2026 eller 26/05/2026
  m = /^(\d{1,2})[.\/](\d{1,2})[.\/](\d{4})$/.exec(raw);
  if (m) {
    return toDateResult(Number(m[3]), Number(m[2]), Number(m[1]));
  }

  // 26. mai 2026 / 26 mai 2026
  m = /^(\d{1,2})\.?\s+([a-zæøå]+)\.?\s+(\d{4})$/.exec(raw);
  if (m) {
    const monthName = m[2];
    const month = MONTH_INPUT_MAP[monthName];
    if (month) return toDateResult(Number(m[3]), month, Number(m[1]));
  }

  // uke 22 / uke 22 2026
  m = /^uke\s*(\d{1,2})(?:\s*[\/,\s]\s*(\d{4}))?$/.exec(raw);
  if (m) {
    const week = Number(m[1]);
    const year = m[2] ? Number(m[2]) : today.getUTCFullYear();
    return toWeekResult(year, week);
  }

  // 2026 uke 22
  m = /^(\d{4})\s*uke\s*(\d{1,2})$/.exec(raw);
  if (m) {
    return toWeekResult(Number(m[1]), Number(m[2]));
  }

  // 22 2026 / 22/2026 / uke-aktig "22-2026"
  m = /^(\d{1,2})[\s\-\/](\d{4})$/.exec(raw);
  if (m) {
    return toWeekResult(Number(m[2]), Number(m[1]));
  }

  // Kun et tall opp til 53: tolk som ukenummer i inneværende ISO-år.
  m = /^(\d{1,2})$/.exec(raw);
  if (m) {
    const week = Number(m[1]);
    if (week >= 1 && week <= 53) {
      return toWeekResult(getIsoWeek(today).isoYear, week);
    }
  }

  return { type: "invalid", reason: "Forstod ikke verdien" };
}

function toDateResult(year: number, month: number, day: number): ParsedInput {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return { type: "invalid", reason: "Ugyldig dato" };
  }
  const d = civilDate(year, month, day);
  if (
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== day
  ) {
    return { type: "invalid", reason: "Ugyldig dato" };
  }
  return { type: "date", date: d };
}

function toWeekResult(year: number, week: number): ParsedInput {
  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    return { type: "invalid", reason: "Ugyldig år" };
  }
  if (!Number.isInteger(week) || week < 1 || week > 53) {
    return { type: "invalid", reason: "Ukenummeret må være 1–53" };
  }
  const max = getWeeksInIsoYear(year);
  if (week > max) {
    return {
      type: "invalid",
      reason: `${year} har ikke uke ${week}. Velg en uke mellom 1 og ${max}.`,
    };
  }
  return { type: "week", isoYear: year, isoWeek: week };
}

export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}
