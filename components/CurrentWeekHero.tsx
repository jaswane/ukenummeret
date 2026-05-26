import {
  capitalize,
  formatNorwegianDateRange,
  getCurrentNorwegianDate,
  getIsoWeekInfo,
} from "@/lib/weekUtils";
import { getNextHoliday } from "@/lib/norwegianHolidays";

export default function CurrentWeekHero() {
  const today = getCurrentNorwegianDate();
  const info = getIsoWeekInfo(today);
  const next = getNextHoliday(today);

  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
        <p className="text-[14px] uppercase tracking-[0.2em] text-muted">
          Denne uken
        </p>
        <h1 className="mt-6 text-[88px] font-medium leading-[0.9] tracking-tightest tnum text-ink sm:text-[140px]">
          Uke <span className="text-accent">{info.isoWeek}</span>
        </h1>
        <p className="mt-6 text-[20px] tnum text-ink sm:text-[24px]">
          {formatNorwegianDateRange(info.start, info.end)}
        </p>
        <dl className="mt-8 grid grid-cols-1 gap-y-3 text-[15px] text-muted sm:grid-cols-2 sm:gap-x-12">
          <div className="flex items-baseline justify-between gap-4 border-t border-rule pt-3 sm:justify-start">
            <dt className="uppercase tracking-[0.14em]">I dag</dt>
            <dd className="tnum text-ink">
              {capitalize(info.weekdayName)} · dag {info.dayOfWeek} av 7
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-t border-rule pt-3 sm:justify-start">
            <dt className="uppercase tracking-[0.14em]">År</dt>
            <dd className="tnum text-ink">{info.isoYear}</dd>
          </div>
          {next && (
            <div className="col-span-1 flex items-baseline justify-between gap-4 border-t border-rule pt-3 sm:col-span-2 sm:justify-start">
              <dt className="uppercase tracking-[0.14em]">Neste fridag</dt>
              <dd className="text-ink">
                <span className="text-accent">{next.name}</span>{" "}
                <span className="text-muted">
                  {next.daysUntil === 0
                    ? "i dag"
                    : next.daysUntil === 1
                    ? "i morgen"
                    : `om ${next.daysUntil} dager`}
                </span>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
