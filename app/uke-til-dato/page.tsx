import type { Metadata } from "next";
import SimplePageHeader from "@/components/SimplePageHeader";
import FAQ, { faqJsonLd } from "@/components/FAQ";
import { breadcrumbJsonLd } from "@/components/Breadcrumbs";
import WeekToDateClient from "./WeekToDateClient";
import { getCurrentNorwegianDate, getIsoWeek } from "@/lib/weekUtils";

export const metadata: Metadata = {
  title: "Uke til dato – finn datoene for et ukenummer",
  description:
    "Velg år og ukenummer og se hvilke datoer ISO-uken dekker. Robust håndtering av uke 53 og årsskifter.",
  alternates: { canonical: "/uke-til-dato" },
};

const FAQ_ITEMS = [
  {
    question: "Hvilke år har uke 53?",
    answer:
      "Et ISO-år har 53 uker når 1. januar er en torsdag, eller når 31. desember er en torsdag i et skuddår. Eksempler i nær fremtid: 2020 og 2026.",
  },
  {
    question: "Hvorfor finnes ikke uke 53 hvert år?",
    answer:
      "ISO 8601 fordeler 365 (eller 366) dager på uker som starter mandag. De fleste år får 52 hele uker, men noen år får en ekstra uke for å håndtere overflødige dager.",
  },
];

export default async function WeekToDatePage({
  searchParams,
}: {
  searchParams?: Promise<{ ar?: string; uke?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const today = getCurrentNorwegianDate();
  const { isoYear, isoWeek } = getIsoWeek(today);
  const initialYear = Number(sp.ar) || isoYear;
  const initialWeek = Number(sp.uke) || isoWeek;

  const crumbs = [
    { href: "/", label: "Forside" },
    { label: "Uke til dato" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(FAQ_ITEMS)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(crumbs)),
        }}
      />

      <SimplePageHeader
        eyebrow="Verktøy"
        title="Uke til dato"
        intro="Velg år og ukenummer og se datoene uken dekker."
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <WeekToDateClient initialYear={initialYear} initialWeek={initialWeek} />

        <section className="mt-16 max-w-prose space-y-4 text-[16px] leading-relaxed text-muted">
          <h2 className="text-[14px] uppercase tracking-[0.18em] text-muted">
            Om uke 53
          </h2>
          <p>
            ISO 8601 gir noen år en uke 53. Det skjer for å fange opp dager som
            ellers ikke ville hatt plass innenfor 52 mandag-til-søndag-uker.
            Hvis du velger uke 53 i et år som ikke har den uken, får du en
            tydelig feilmelding.
          </p>
        </section>

        <div className="mt-16">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </div>
    </>
  );
}
