import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SimplePageHeader from "@/components/SimplePageHeader";
import RelatedLinks from "@/components/RelatedLinks";
import { breadcrumbJsonLd } from "@/components/Breadcrumbs";
import {
  formatNorwegianDateRange,
  getCurrentNorwegianDate,
  getIsoWeek,
  getWeekDateRange,
  getWeeksInIsoYear,
} from "@/lib/weekUtils";
import {
  FIRST_PUBLISHED_YEAR,
  getPublishedYears,
  isSupportedYear,
  maxSupportedYear,
} from "@/lib/years";

// Markerer "nåværende uke" når året er inneværende. Re-bygg hver time.
export const revalidate = 3600;

export function generateStaticParams() {
  return getPublishedYears().map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  const path = `/uker/${year}`;
  return {
    title: `Uker i ${year} – alle ukenummer med datoer`,
    description: `Liste over alle ISO-uker i ${year}, med datoområde for hver uke. Mandag til søndag.`,
    alternates: { canonical: path },
    openGraph: {
      title: `Uker i ${year}`,
      description: `Alle ukenummer i ${year} med datoer.`,
      url: `https://ukenummeret.no${path}`,
    },
  };
}

export default async function WeeksYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  if (!isSupportedYear(year)) notFound();

  const today = getCurrentNorwegianDate();
  const { isoYear: currentIsoYear, isoWeek: currentIsoWeek } = getIsoWeek(today);
  const totalWeeks = getWeeksInIsoYear(year);
  const weeks = Array.from({ length: totalWeeks }, (_, i) => {
    const w = i + 1;
    return { week: w, ...getWeekDateRange(year, w) };
  });
  const prev = year > FIRST_PUBLISHED_YEAR ? year - 1 : null;
  const next = year < maxSupportedYear() ? year + 1 : null;

  const crumbs = [
    { href: "/", label: "Forside" },
    { label: `Uker i ${year}` },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Uker i ${year}`,
    url: `https://ukenummeret.no/uker/${year}`,
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
        eyebrow="Uker"
        title={`Uker i ${year}`}
        intro={
          <>
            {year} har {totalWeeks} ISO-uker. Uke 1 kan starte i forrige
            kalenderår, og siste uke kan slutte i påfølgende år.
          </>
        }
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <ol className="divide-y divide-rule border-y border-rule">
          {weeks.map(({ week, start, end }) => {
            const isCurrent = year === currentIsoYear && week === currentIsoWeek;
            return (
              <li key={week}>
                <Link
                  href={`/uke-til-dato?ar=${year}&uke=${week}`}
                  aria-current={isCurrent ? "true" : undefined}
                  className={
                    "flex items-baseline justify-between gap-4 py-3 transition-colors " +
                    (isCurrent ? "text-accent" : "text-ink hover:text-accent")
                  }
                >
                  <span className="text-[14px] uppercase tracking-[0.14em] text-subtle">
                    Uke <span className="tnum text-ink">{week}</span>
                    {isCurrent && (
                      <span className="ml-2 text-accent">· nå</span>
                    )}
                  </span>
                  <span className="text-[15px] tnum">
                    {formatNorwegianDateRange(start, end)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        <nav
          aria-label="År"
          className="mt-12 flex items-center justify-between border-t border-rule pt-6 text-[14px]"
        >
          {prev ? (
            <Link
              href={`/uker/${prev}`}
              className="text-subtle underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              ← Uker i {prev}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/uker/${next}`}
              className="text-subtle underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Uker i {next} →
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <div className="mt-16">
          <RelatedLinks
            items={[
              { href: `/kalender-${year}`, label: `Kalender ${year}`, hint: "Kalender" },
              { href: `/helligdager-${year}`, label: `Helligdager ${year}`, hint: "Fridager" },
              { href: "/uke-til-dato", label: "Uke til dato", hint: "Verktøy" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
