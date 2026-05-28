import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SimplePageHeader from "@/components/SimplePageHeader";
import HolidayList from "@/components/HolidayList";
import RelatedLinks from "@/components/RelatedLinks";
import { breadcrumbJsonLd } from "@/components/Breadcrumbs";
import {
  getNorwegianObservances,
  getNorwegianPublicHolidays,
} from "@/lib/norwegianHolidays";
import {
  capitalize,
  daysBetween,
  formatNorwegianDate,
  getCurrentNorwegianDate,
  getIsoWeek,
  isSameCivilDay,
  isoWeekday,
  WEEKDAY_NAMES,
} from "@/lib/weekUtils";
import {
  getHolidayInfoBySlug,
  HOLIDAY_SLUGS,
  type HolidayInfo,
} from "@/lib/holidayInfo";
import DayInfoPage, { type DayFact } from "@/components/DayInfoPage";
import { resolveRelatedDays } from "@/lib/dayLinks";

const SUPPORTED_YEARS = Array.from({ length: 11 }, (_, i) => 2025 + i);
const YEAR_SLUGS = SUPPORTED_YEARS.map(String);

// "Om X dager"-telling og "i år"-data krever oppdatert dato.
export const revalidate = 3600;

export function generateStaticParams() {
  return [...YEAR_SLUGS, ...HOLIDAY_SLUGS].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (YEAR_SLUGS.includes(slug)) {
    const year = Number(slug);
    const path = `/helligdager-${year}`;
    return {
      title: `Helligdager ${year} – norske fridager og merkedager`,
      description: `Komplett oversikt over norske offentlige helligdager i ${year}, med dato, ukedag og ukenummer. Egen liste med merkedager.`,
      alternates: { canonical: path },
      openGraph: {
        title: `Helligdager ${year} i Norge`,
        description: `Norske offentlige helligdager og merkedager i ${year}.`,
        url: `https://ukenummeret.no${path}`,
      },
    };
  }

  const info = getHolidayInfoBySlug(slug);
  if (info) {
    const today = getCurrentNorwegianDate();
    const year = today.getUTCFullYear();
    const holiday = getNorwegianPublicHolidays(year).find(
      (h) => h.name === info.name
    );
    const dateStr = holiday ? formatNorwegianDate(holiday.date) : "";
    const path = `/helligdager/${info.slug}`;
    return {
      title: `${info.name} – dato, ukenummer og forklaring`,
      description: `${info.name} i ${year}${dateStr ? ` er ${dateStr}` : ""}. ${info.intro}`,
      alternates: { canonical: path },
      openGraph: {
        title: `${info.name} – dato, ukenummer og forklaring`,
        description: info.intro,
        url: `https://ukenummeret.no${path}`,
      },
    };
  }

  return { title: "Ikke funnet" };
}

export default async function HolidaysSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (YEAR_SLUGS.includes(slug)) {
    return <YearView year={Number(slug)} />;
  }

  const info = getHolidayInfoBySlug(slug);
  if (info) {
    return <HolidayInfoView info={info} />;
  }

  notFound();
}

// =====================================================================
// Årsoversikt — uendret innhold, bare flyttet hit fra forrige [year]-rute.
// =====================================================================

function YearView({ year }: { year: number }) {
  if (!SUPPORTED_YEARS.includes(year)) notFound();

  const today = getCurrentNorwegianDate();
  const isCurrent = today.getUTCFullYear() === year;
  const referenceDate = isCurrent ? today : null;
  const publicHolidays = getNorwegianPublicHolidays(year);
  const observances = getNorwegianObservances(year);
  const prev = year > SUPPORTED_YEARS[0] ? year - 1 : null;
  const next =
    year < SUPPORTED_YEARS[SUPPORTED_YEARS.length - 1] ? year + 1 : null;

  const crumbs = [
    { href: "/", label: "Forside" },
    { label: `Helligdager ${year}` },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Helligdager ${year} i Norge`,
    url: `https://ukenummeret.no/helligdager-${year}`,
    inLanguage: "nb-NO",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(crumbs)),
        }}
      />

      <SimplePageHeader
        eyebrow="Fridager"
        title={`Helligdager ${year}`}
        intro={`Norske offentlige helligdager og merkedager for ${year}, med dato, ukedag og ukenummer.`}
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <section>
          <h2 className="text-[14px] uppercase tracking-[0.18em] text-subtle">
            Offentlige helligdager
          </h2>
          <div className="mt-4">
            <HolidayList holidays={publicHolidays} today={referenceDate} />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-[14px] uppercase tracking-[0.18em] text-subtle">
            Merkedager
          </h2>
          <p className="mt-2 max-w-prose text-[15px] text-subtle">
            Merkedager er ikke offentlige fridager, men brukes ofte i hverdagen.
          </p>
          <div className="mt-4">
            <HolidayList holidays={observances} today={referenceDate} />
          </div>
        </section>

        <nav
          aria-label="År"
          className="mt-16 flex items-center justify-between border-t border-rule pt-6 text-[14px]"
        >
          {prev ? (
            <Link
              href={`/helligdager-${prev}`}
              className="text-subtle underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              ← Helligdager {prev}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/helligdager-${next}`}
              className="text-subtle underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Helligdager {next} →
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <div className="mt-16">
          <RelatedLinks
            items={[
              { href: `/kalender-${year}`, label: `Kalender ${year}`, hint: "Kalender" },
              { href: `/uker/${year}`, label: `Alle uker i ${year}`, hint: "Oversikt" },
              { href: "/dato-til-uke", label: "Dato til ukenummer", hint: "Verktøy" },
            ]}
          />
        </div>
      </div>
    </>
  );
}

// =====================================================================
// Infoside per helligdag.
// =====================================================================

function HolidayInfoView({ info }: { info: HolidayInfo }) {
  const today = getCurrentNorwegianDate();
  const year = today.getUTCFullYear();
  const thisYearHoliday = getNorwegianPublicHolidays(year).find(
    (h) => h.name === info.name
  );
  const nextYearHoliday = getNorwegianPublicHolidays(year + 1).find(
    (h) => h.name === info.name
  );

  // Hvis årets dato er passert, bruk neste års dato som "kommende".
  const upcoming =
    thisYearHoliday && thisYearHoliday.date.getTime() >= today.getTime()
      ? thisYearHoliday
      : nextYearHoliday ?? thisYearHoliday;

  const upcomingDays = upcoming
    ? isSameCivilDay(today, upcoming.date)
      ? 0
      : daysBetween(today, upcoming.date)
    : null;

  const facts: DayFact[] = [];
  if (thisYearHoliday) {
    const { isoWeek } = getIsoWeek(thisYearHoliday.date);
    const weekday = WEEKDAY_NAMES[isoWeekday(thisYearHoliday.date) - 1];
    facts.push({ k: `Dato i ${year}`, v: formatNorwegianDate(thisYearHoliday.date) });
    facts.push({ k: "Ukedag", v: capitalize(weekday) });
    facts.push({ k: "Ukenummer", v: `Uke ${isoWeek}` });
  }
  facts.push({ k: "Offentlig fridag", v: "Ja" });
  facts.push({
    k: "Type dato",
    v: info.fixed ? "Fast dato" : "Bevegelig (følger påsken)",
  });
  if (nextYearHoliday) {
    facts.push({
      k: `Dato i ${year + 1}`,
      v: formatNorwegianDate(nextYearHoliday.date),
    });
  }
  if (upcoming && upcomingDays !== null) {
    facts.push({
      k: "Til neste",
      v:
        upcomingDays === 0
          ? "I dag"
          : upcomingDays === 1
          ? "I morgen"
          : `Om ${upcomingDays} dager`,
    });
  }

  return (
    <DayInfoPage
      eyebrow="Helligdag"
      name={info.name}
      intro={info.intro}
      path={`/helligdager/${info.slug}`}
      crumbs={[
        { href: "/", label: "Forside" },
        { href: `/helligdager-${year}`, label: `Helligdager ${year}` },
        { label: info.name },
      ]}
      facts={facts}
      explanation={info.explanation}
      related={resolveRelatedDays(info.related)}
      backLink={{ href: `/helligdager-${year}`, label: `Alle helligdager i ${year}` }}
    />
  );
}
