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
import { getCurrentNorwegianDate } from "@/lib/weekUtils";

const SUPPORTED_YEARS = Array.from({ length: 11 }, (_, i) => 2025 + i);

export function generateStaticParams() {
  return SUPPORTED_YEARS.map((year) => ({ year: String(year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
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

export default async function HolidaysYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
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
          <h2 className="text-[14px] uppercase tracking-[0.18em] text-muted">
            Offentlige helligdager
          </h2>
          <div className="mt-4">
            <HolidayList holidays={publicHolidays} today={referenceDate} />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-[14px] uppercase tracking-[0.18em] text-muted">
            Merkedager
          </h2>
          <p className="mt-2 max-w-prose text-[15px] text-muted">
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
              className="text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            >
              ← Helligdager {prev}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/helligdager-${next}`}
              className="text-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
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
