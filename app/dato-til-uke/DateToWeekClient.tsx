"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  capitalize,
  civilDate,
  formatNorwegianDate,
  formatNorwegianDateRange,
  getIsoWeekInfo,
} from "@/lib/weekUtils";

export default function DateToWeekClient({
  initialDateIso,
}: {
  initialDateIso: string;
}) {
  const [iso, setIso] = useState(initialDateIso);

  const info = useMemo(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
    const [y, m, d] = iso.split("-").map(Number);
    const date = civilDate(y, m, d);
    if (
      date.getUTCFullYear() !== y ||
      date.getUTCMonth() !== m - 1 ||
      date.getUTCDate() !== d
    )
      return null;
    return { date, info: getIsoWeekInfo(date) };
  }, [iso]);

  return (
    <div className="space-y-10">
      <div>
        <label
          htmlFor="dato-input"
          className="block text-[14px] uppercase tracking-[0.18em] text-subtle"
        >
          Velg dato
        </label>
        <input
          id="dato-input"
          type="date"
          value={iso}
          onChange={(e) => setIso(e.target.value)}
          className="mt-3 w-full max-w-xs border border-rule bg-panel px-4 py-3 text-[16px] tnum text-ink focus:border-accent focus:outline-none"
        />
      </div>

      {!info ? (
        <p className="text-[15px] text-accent">Ugyldig dato.</p>
      ) : (
        <div className="space-y-6">
          <p className="text-[28px] leading-tight text-ink sm:text-[34px]">
            {formatNorwegianDate(info.date)} er i{" "}
            <span className="text-accent">uke {info.info.isoWeek}</span>.
          </p>
          <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-12">
            {[
              ["Ukedag", capitalize(info.info.weekdayName)],
              ["ISO-år", String(info.info.isoYear)],
              [
                "Uken varer",
                formatNorwegianDateRange(info.info.start, info.info.end),
              ],
              [
                "Dag i uken",
                `${info.info.dayOfWeek} av 7`,
              ],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-t border-rule pt-3 sm:justify-start"
              >
                <dt className="text-[13px] uppercase tracking-[0.14em] text-subtle">
                  {k}
                </dt>
                <dd className="text-[16px] tnum text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[14px]">
            <Link
              href={`/uke-til-dato?ar=${info.info.isoYear}&uke=${info.info.isoWeek}`}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Se uke {info.info.isoWeek} i {info.info.isoYear}
            </Link>
            <Link
              href={`/kalender-${info.info.isoYear}`}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Kalender {info.info.isoYear}
            </Link>
            <Link
              href={`/uker/${info.info.isoYear}`}
              className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Alle uker i {info.info.isoYear}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
