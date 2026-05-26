import {
  civilDate,
  getIsoWeek,
  isoWeekday,
  isSameCivilDay,
  MONTH_NAMES,
} from "@/lib/weekUtils";
import { getNorwegianPublicHolidays } from "@/lib/norwegianHolidays";

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

  const holidays = new Map(
    getNorwegianPublicHolidays(year).map((h) => [
      `${h.date.getUTCMonth() + 1}-${h.date.getUTCDate()}`,
      h.name,
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
                <td className="py-1.5 pr-1 text-left text-[11px] uppercase tracking-[0.14em] text-muted">
                  {isoWeek ?? ""}
                </td>
                {row.map((cell, colIdx) => {
                  if (!cell.date) {
                    return <td key={colIdx} className="py-1.5" />;
                  }
                  const key = `${cell.date.getUTCMonth() + 1}-${cell.date.getUTCDate()}`;
                  const isHoliday = holidays.has(key);
                  const isWeekend = colIdx >= 5;
                  const isToday = today && isSameCivilDay(today, cell.date);
                  return (
                    <td
                      key={colIdx}
                      title={isHoliday ? holidays.get(key) : undefined}
                      className={
                        "py-1.5 text-center " +
                        (isToday
                          ? "font-medium text-paper"
                          : isHoliday
                          ? "text-accent"
                          : isWeekend
                          ? "text-muted"
                          : "text-ink")
                      }
                    >
                      {isToday ? (
                        <span className="inline-flex h-6 w-6 items-center justify-center bg-ink text-paper">
                          {cell.day}
                        </span>
                      ) : (
                        cell.day
                      )}
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
