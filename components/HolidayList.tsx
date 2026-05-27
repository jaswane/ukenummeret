import {
  decorateHoliday,
  type Holiday,
} from "@/lib/norwegianHolidays";
import { capitalize } from "@/lib/weekUtils";

export default function HolidayList({
  holidays,
  today = null,
}: {
  holidays: Holiday[];
  today?: Date | null;
}) {
  return (
    <ul className="divide-y divide-rule border-y border-rule">
      {holidays.map((h, i) => {
        const meta = decorateHoliday(h, today);
        return (
          <li key={i} className="grid gap-2 py-4 sm:grid-cols-[160px_1fr_auto] sm:items-baseline sm:gap-6">
            <span className="text-[15px] tnum text-ink">{meta.formattedDate}</span>
            <span className="text-[17px] text-ink">
              <span className={h.kind === "public" ? "text-ink" : "text-muted"}>
                {h.name}
              </span>
              <span className="ml-3 text-[13px] uppercase tracking-[0.14em] text-subtle">
                {capitalize(meta.weekday)} · uke {meta.isoWeek}
              </span>
            </span>
            <span className="text-[13px] uppercase tracking-[0.14em] text-subtle sm:text-right">
              {meta.daysUntil === null
                ? ""
                : meta.daysUntil === 0
                ? "I dag"
                : meta.daysUntil === 1
                ? "I morgen"
                : `Om ${meta.daysUntil} dager`}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
