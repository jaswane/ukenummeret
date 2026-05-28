import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SimplePageHeader from "@/components/SimplePageHeader";
import CalendarMonth from "@/components/CalendarMonth";
import RelatedLinks from "@/components/RelatedLinks";
import { breadcrumbJsonLd } from "@/components/Breadcrumbs";
import {
  getCurrentNorwegianDate,
  getIsoWeek,
  getWeeksInIsoYear,
} from "@/lib/weekUtils";
import {
  FIRST_PUBLISHED_YEAR,
  getPublishedYears,
  isSupportedYear,
  maxSupportedYear,
} from "@/lib/years";

// Siden markerer "dagens dato" når året er inneværende. Re-bygg hver time.
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
  const path = `/kalender-${year}`;
  return {
    title: `Kalender ${year} med ukenummer og helligdager`,
    description: `Se hele kalenderen for ${year} med ukenummer, helger og norske offentlige helligdager.`,
    alternates: { canonical: path },
    openGraph: {
      title: `Kalender ${year} med ukenummer`,
      description: `Hele året ${year} med ukenummer og helligdager.`,
      url: `https://ukenummeret.no${path}`,
    },
  };
}

export default async function CalendarYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  if (!isSupportedYear(year)) notFound();

  const today = getCurrentNorwegianDate();
  const todayIsThisYear = today.getUTCFullYear() === year;
  const { isoYear: currentIsoYear, isoWeek: currentIsoWeek } =
    getIsoWeek(today);
  const weeks = getWeeksInIsoYear(year);
  const prev = year > FIRST_PUBLISHED_YEAR ? year - 1 : null;
  const next = year < maxSupportedYear() ? year + 1 : null;

  const crumbs = [
    { href: "/", label: "Forside" },
    { label: `Kalender ${year}` },
  ];

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Kalender ${year} med ukenummer`,
    url: `https://ukenummeret.no/kalender-${year}`,
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
        eyebrow="Kalender"
        title={`Kalender ${year} med ukenummer`}
        intro={
          <>
            Hele året {year} med ISO-ukenummer, helger og norske offentlige
            helligdager. {weeks === 53 && (
              <span>
                {year} har 53 ISO-uker.
              </span>
            )}
            {todayIsThisYear && (
              <>
                {" "}
                Dagens uke er{" "}
                <Link
                  href={`/uke-til-dato?ar=${currentIsoYear}&uke=${currentIsoWeek}`}
                  className="underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
                >
                  uke {currentIsoWeek}
                </Link>
                .
              </>
            )}
          </>
        }
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <CalendarMonth
              key={m}
              year={year}
              month={m}
              today={todayIsThisYear ? today : null}
            />
          ))}
        </div>

        <nav
          aria-label="År"
          className="mt-16 flex items-center justify-between border-t border-rule pt-6 text-[14px]"
        >
          {prev ? (
            <Link
              href={`/kalender-${prev}`}
              className="text-subtle underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              ← Kalender {prev}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/kalender-${next}`}
              className="text-subtle underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              Kalender {next} →
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <div className="mt-16">
          <RelatedLinks
            items={[
              { href: `/helligdager-${year}`, label: `Helligdager ${year}`, hint: "Fridager" },
              { href: `/uker/${year}`, label: `Alle uker i ${year}`, hint: "Oversikt" },
              { href: "/dato-til-uke", label: "Dato til ukenummer", hint: "Verktøy" },
              { href: "/uke-til-dato", label: "Uke til dato", hint: "Verktøy" },
            ]}
          />
        </div>
      </div>
    </>
  );
}
