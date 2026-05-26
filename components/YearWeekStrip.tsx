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
        <p className="text-[14px] uppercase tracking-[0.18em] text-muted">
          {isoYear} – {total} uker
        </p>
        <Link
          href={`/uker/${isoYear}`}
          className="text-[14px] text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
        >
          Alle uker
        </Link>
      </div>
      <ol className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-[2px]">
        {Array.from({ length: total }, (_, i) => i + 1).map((w) => {
          const isCurrent = currentWeek === w;
          return (
            <li key={w}>
              <Link
                href={`/uke-til-dato?ar=${isoYear}&uke=${w}`}
                aria-current={isCurrent ? "true" : undefined}
                className={
                  "flex h-9 items-center justify-center text-[12px] tnum transition-colors " +
                  (isCurrent
                    ? "bg-ink text-paper"
                    : "border border-rule text-muted hover:border-ink hover:text-ink")
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
