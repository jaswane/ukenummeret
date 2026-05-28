"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  capitalize,
  formatNorwegianDate,
  formatNorwegianDateRange,
  getWeekDateRange,
  getWeeksInIsoYear,
  WEEKDAY_NAMES,
  isoWeekday,
  addDays,
} from "@/lib/weekUtils";

export default function WeekToDateClient({
  initialYear,
  initialWeek,
  years,
}: {
  initialYear: number;
  initialWeek: number;
  years: number[];
}) {
  const [year, setYear] = useState(initialYear);
  const [week, setWeek] = useState(initialWeek);

  const maxWeeks = useMemo(() => getWeeksInIsoYear(year), [year]);
  const isValid = week >= 1 && week <= maxWeeks;
  const range = useMemo(
    () => (isValid ? getWeekDateRange(year, week) : null),
    [year, week, isValid]
  );

  const days = useMemo(() => {
    if (!range) return [];
    return Array.from({ length: 7 }, (_, i) => addDays(range.start, i));
  }, [range]);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_1fr] sm:gap-8">
        <div>
          <label
            htmlFor="year-input"
            className="block text-[14px] uppercase tracking-[0.18em] text-subtle"
          >
            År
          </label>
          <select
            id="year-input"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="mt-3 w-full border border-rule bg-panel px-4 py-3 text-[16px] tnum text-ink focus:border-accent focus:outline-none"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="week-input"
            className="block text-[14px] uppercase tracking-[0.18em] text-subtle"
          >
            Ukenummer (1–{maxWeeks})
          </label>
          <input
            id="week-input"
            type="number"
            min={1}
            max={53}
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            className="mt-3 w-full border border-rule bg-panel px-4 py-3 text-[16px] tnum text-ink focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {!isValid ? (
        <p role="alert" className="text-[15px] text-accent">
          {year} har ikke uke {week}. Velg en uke mellom 1 og {maxWeeks}.
        </p>
      ) : range ? (
        <div className="space-y-6">
          <p className="text-[24px] leading-snug text-ink sm:text-[28px]">
            Uke <span className="text-accent tnum">{week}</span> i{" "}
            <span className="tnum">{year}</span> varer fra mandag{" "}
            <span className="tnum">{formatNorwegianDate(range.start)}</span> til
            søndag <span className="tnum">{formatNorwegianDate(range.end)}</span>.
          </p>
          <p className="text-[16px] text-subtle">
            {formatNorwegianDateRange(range.start, range.end)}
          </p>

          <ol className="grid grid-cols-1 divide-y divide-rule border-y border-rule">
            {days.map((d, i) => (
              <li
                key={i}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <span className="text-[13px] uppercase tracking-[0.14em] text-subtle">
                  {capitalize(WEEKDAY_NAMES[isoWeekday(d) - 1])}
                </span>
                <span className="text-[15px] tnum text-ink">
                  {formatNorwegianDate(d)}
                </span>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[14px]">
            <Link
              href={`/kalender-${year}`}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Kalender {year}
            </Link>
            <Link
              href={`/uker/${year}`}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Alle uker i {year}
            </Link>
            <Link
              href={`/helligdager-${year}`}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Helligdager {year}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
