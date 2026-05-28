import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DayInfoPage, { type DayFact } from "@/components/DayInfoPage";
import { resolveRelatedDays } from "@/lib/dayLinks";
import {
  getObservanceInfoBySlug,
  OBSERVANCE_SLUGS,
  type ObservanceInfo,
} from "@/lib/observanceInfo";
import { getNorwegianObservances } from "@/lib/norwegianHolidays";
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

// "Til neste"-telling krever oppdatert dato. Re-bygg hver time.
export const revalidate = 3600;

export function generateStaticParams() {
  return OBSERVANCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const info = getObservanceInfoBySlug(slug);
  if (!info) return { title: "Ikke funnet" };

  const today = getCurrentNorwegianDate();
  const year = today.getUTCFullYear();
  const obs = getNorwegianObservances(year).find((o) => o.name === info.name);
  const dateStr = obs ? formatNorwegianDate(obs.date) : "";
  const path = `/merkedager/${info.slug}`;
  return {
    title: `${info.name} – dato, ukenummer og kort forklaring`,
    description: `${info.name} i ${year}${dateStr ? ` er ${dateStr}` : ""}. ${info.intro} Ikke en offentlig fridag.`,
    alternates: { canonical: path },
    openGraph: {
      title: `${info.name} – dato, ukenummer og kort forklaring`,
      description: info.intro,
      url: `https://ukenummeret.no${path}`,
    },
  };
}

export default async function ObservancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const info = getObservanceInfoBySlug(slug);
  if (!info) notFound();

  return <ObservanceView info={info} />;
}

function ObservanceView({ info }: { info: ObservanceInfo }) {
  const today = getCurrentNorwegianDate();
  const year = today.getUTCFullYear();
  const thisYear = getNorwegianObservances(year).find(
    (o) => o.name === info.name
  );
  const nextYear = getNorwegianObservances(year + 1).find(
    (o) => o.name === info.name
  );

  const upcoming =
    thisYear && thisYear.date.getTime() >= today.getTime()
      ? thisYear
      : nextYear ?? thisYear;

  const upcomingDays = upcoming
    ? isSameCivilDay(today, upcoming.date)
      ? 0
      : daysBetween(today, upcoming.date)
    : null;

  const facts: DayFact[] = [];
  if (thisYear) {
    const { isoWeek } = getIsoWeek(thisYear.date);
    const weekday = WEEKDAY_NAMES[isoWeekday(thisYear.date) - 1];
    facts.push({ k: `Dato i ${year}`, v: formatNorwegianDate(thisYear.date) });
    facts.push({ k: "Ukedag", v: capitalize(weekday) });
    facts.push({ k: "Ukenummer", v: `Uke ${isoWeek}` });
  }
  facts.push({ k: "Offentlig fridag", v: "Nei" });
  facts.push({
    k: "Type dato",
    v: info.fixed ? "Fast dato" : "Bevegelig (følger ukedag)",
  });
  if (nextYear) {
    facts.push({ k: `Dato i ${year + 1}`, v: formatNorwegianDate(nextYear.date) });
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
      eyebrow="Merkedag"
      name={info.name}
      intro={info.intro}
      path={`/merkedager/${info.slug}`}
      crumbs={[
        { href: "/", label: "Forside" },
        { href: `/helligdager-${year}`, label: `Helligdager ${year}` },
        { label: info.name },
      ]}
      facts={facts}
      explanation={info.explanation}
      related={resolveRelatedDays(info.related)}
      backLink={{ href: `/helligdager-${year}`, label: `Alle helligdager og merkedager i ${year}` }}
    />
  );
}
