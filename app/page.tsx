import type { Metadata } from "next";
import CurrentWeekHero from "@/components/CurrentWeekHero";
import WeekSearch from "@/components/WeekSearch";
import YearWeekStrip from "@/components/YearWeekStrip";
import FAQ, { faqJsonLd } from "@/components/FAQ";
import RelatedLinks from "@/components/RelatedLinks";
import { getCurrentNorwegianDate, getIsoWeek } from "@/lib/weekUtils";

// Hold "i dag" oppdatert: re-bygg minst hver time så ukedag/uke ikke fryser.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Hvilken uke er det nå? Ukenummer i dag | Ukenummeret.no",
  description:
    "Se hvilken uke det er nå, datoene for uken, neste helligdag og kalender med ukenummer for 2026 og kommende år.",
  alternates: { canonical: "/" },
};

const FAQ_ITEMS = [
  {
    question: "Hvilken uke er det nå?",
    answer:
      "Ukenummeret du ser øverst på siden er det gjeldende ISO-ukenummeret beregnet i norsk tidssone (Europe/Oslo). Uken starter på mandag og slutter på søndag.",
  },
  {
    question: "Hvordan beregnes ukenummer i Norge?",
    answer:
      "Norge bruker ISO 8601 for ukenummerering. Uke 1 er uken som inneholder årets første torsdag, eller tilsvarende uken som inneholder 4. januar. En uke starter alltid på mandag.",
  },
  {
    question: "Hva er uke 53?",
    answer:
      "Enkelte år har 53 ISO-uker. Det skjer når 1. januar er en torsdag, eller når 31. desember er en torsdag (skuddår som starter på onsdag). 2020 og 2026 er eksempler på år med uke 53.",
  },
  {
    question: "Kan en dato tilhøre et annet ISO-år enn kalenderåret?",
    answer:
      "Ja. 1.–3. januar kan tilhøre siste ISO-uke i forrige år, og 29.–31. desember kan tilhøre uke 1 i påfølgende år. ISO-året følger uken, ikke kalenderåret.",
  },
  {
    question: "Hvilken uke er vi i nå?",
    answer:
      "Det står øverst på denne siden. Tallet oppdateres automatisk hver dag basert på norsk tidssone.",
  },
];

export default function HomePage() {
  const today = getCurrentNorwegianDate();
  const { isoYear, isoWeek } = getIsoWeek(today);

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ukenummeret.no",
    url: "https://ukenummeret.no",
    inLanguage: "nb-NO",
    description:
      "Norsk verktøy for ukenummer, kalender og helligdager – raskt, presist og uten støy.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_ITEMS)) }}
      />

      <CurrentWeekHero />

      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="space-y-16">
          <section aria-labelledby="search-heading">
            <h2
              id="search-heading"
              className="text-[14px] uppercase tracking-[0.18em] text-subtle"
            >
              Slå opp dato eller uke
            </h2>
            <div className="mt-4">
              <WeekSearch />
            </div>
            <p className="mt-3 text-[14px] text-subtle">
              Eksempler: <span className="tnum">26.05.2026</span>,{" "}
              <span className="tnum">2026-05-26</span>, 26 mai 2026, uke 22,
              uke 22 2027.
            </p>
          </section>

          <YearWeekStrip isoYear={isoYear} currentWeek={isoWeek} />

          <RelatedLinks
            items={[
              {
                href: `/kalender-${isoYear}`,
                label: `Kalender ${isoYear} med ukenummer`,
                hint: "Kalender",
              },
              {
                href: `/helligdager-${isoYear}`,
                label: `Helligdager ${isoYear}`,
                hint: "Fridager",
              },
              {
                href: "/dato-til-uke",
                label: "Dato til ukenummer",
                hint: "Verktøy",
              },
              {
                href: "/uke-til-dato",
                label: "Uke til dato",
                hint: "Verktøy",
              },
              {
                href: `/uker/${isoYear}`,
                label: `Alle uker i ${isoYear}`,
                hint: "Oversikt",
              },
            ]}
          />

          <FAQ items={FAQ_ITEMS} />
        </div>
      </div>
    </>
  );
}
