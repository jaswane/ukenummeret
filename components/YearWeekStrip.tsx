import Link from "next/link";
import { getWeeksInIsoYear } from "@/lib/weekUtils";

export default function YearWeekStrip({
  isoYear,
  currentWeek,
}: {
  isoYear: number;
  currentWeek?: number;
}) {
  const total = getWeeksInIsoYear(isoYear);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-[14px] uppercase tracking-[0.18em] text-subtle">
          {isoYear} – {total} uker
        </p>
        <Link
          href={`/uker/${isoYear}`}
          className="text-[14px] text-subtle underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          Alle uker
        </Link>
      </div>
      <ol className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-[2px]">
        {Array.from({ length: total }, (_, i) => i + 1).map((w) => {
          const isCurrent = currentWeek === w;
          const isPast = currentWeek !== undefined && w < currentWeek;
          return (
            <li key={w}>
              <Link
                href={`/uke-til-dato?ar=${isoYear}&uke=${w}`}
                aria-current={isCurrent ? "true" : undefined}
                className={
                  "flex h-9 items-center justify-center text-[12px] font-medium tnum transition-colors " +
                  (isCurrent
                    ? "bg-accent text-paper hover:bg-accentHover"
                    : isPast
                    ? "border border-tintBlue bg-tintBlue text-accent hover:border-accent hover:text-accentHover"
                    : "border border-rule bg-panel text-subtle hover:border-accent hover:bg-tintBlue hover:text-accent")
                }
              >
                {w}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
