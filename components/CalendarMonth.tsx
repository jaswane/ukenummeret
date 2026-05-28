import Link from "next/link";
import {
  civilDate,
  getIsoWeek,
  isoWeekday,
  isSameCivilDay,
  MONTH_NAMES,
} from "@/lib/weekUtils";
import { getNorwegianPublicHolidays } from "@/lib/norwegianHolidays";
import { getHolidayInfoByName } from "@/lib/holidayInfo";

const WEEKDAY_HEADS = ["M", "T", "O", "T", "F", "L", "S"];

export default function CalendarMonth({
  year,
  month,
  today = null,
}: {
  year: number;
  month: number;
  today?: Date | null;
}) {
  const first = civilDate(year, month, 1);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const startWeekday = isoWeekday(first);
  const leadingBlanks = startWeekday - 1;
  const cells: Array<{ day: number | null; date: Date | null }> = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push({ day: null, date: null });
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, date: civilDate(year, month, d) });
  }
  while (cells.length % 7 !== 0) cells.push({ day: null, date: null });

  const holidays = new Map<string, { name: string; slug: string | null }>(
    getNorwegianPublicHolidays(year).map((h) => [
      `${h.date.getUTCMonth() + 1}-${h.date.getUTCDate()}`,
      { name: h.name, slug: getHolidayInfoByName(h.name)?.slug ?? null },
    ])
  );

  // Split cells into weeks (rows of 7).
  const rows: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <section className="break-inside-avoid">
      <h3 className="text-[15px] font-medium uppercase tracking-[0.14em] text-ink">
        {MONTH_NAMES[month - 1]}
      </h3>
      <table className="mt-3 w-full border-collapse text-[13px] tnum">
        <thead>
          <tr className="text-muted">
            <th className="w-7 py-1 text-left font-normal text-[11px] uppercase tracking-[0.14em]">
              Uke
            </th>
            {WEEKDAY_HEADS.map((d, i) => (
              <th
                key={i}
                className={
                  "py-1 text-center font-normal text-[11px] uppercase " +
                  (i >= 5 ? "text-muted" : "text-muted")
                }
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const firstDateCell = row.find((c) => c.date);
            const isoWeek = firstDateCell?.date
              ? getIsoWeek(firstDateCell.date).isoWeek
              : null;
            return (
              <tr key={rowIdx} className="border-t border-rule/70">
                <td className="py-1.5 pr-1 text-left text-[11px] uppercase tracking-[0.14em] text-subtle">
                  {isoWeek ?? ""}
                </td>
                {row.map((cell, colIdx) => {
                  if (!cell.date) {
                    return <td key={colIdx} className="py-1.5" />;
                  }
                  const key = `${cell.date.getUTCMonth() + 1}-${cell.date.getUTCDate()}`;
                  const holiday = holidays.get(key) ?? null;
                  const isWeekend = colIdx >= 5;
                  const isToday = today && isSameCivilDay(today, cell.date);

                  let inner: React.ReactNode;
                  if (isToday) {
                    const square = (
                      <span className="inline-flex h-6 w-6 items-center justify-center bg-accent text-paper">
                        {cell.day}
                      </span>
                    );
                    inner = holiday?.slug ? (
                      <Link href={`/helligdager/${holiday.slug}`} title={holiday.name}>
                        {square}
                      </Link>
                    ) : (
                      square
                    );
                  } else if (holiday?.slug) {
                    inner = (
                      <Link
                        href={`/helligdager/${holiday.slug}`}
                        title={holiday.name}
                        className="text-holiday underline decoration-transparent underline-offset-2 transition-colors hover:text-holidayHover hover:decoration-holidayHover"
                      >
                        {cell.day}
                      </Link>
                    );
                  } else {
                    inner = (
                      <span
                        title={holiday?.name}
                        className={
                          holiday
                            ? "text-holiday"
                            : isWeekend
                            ? "text-subtle"
                            : "text-ink"
                        }
                      >
                        {cell.day}
                      </span>
                    );
                  }

                  return (
                    <td key={colIdx} className="py-1.5 text-center">
                      {inner}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
