import type { Metadata } from "next";
import SimplePageHeader from "@/components/SimplePageHeader";
import FAQ, { faqJsonLd } from "@/components/FAQ";
import { breadcrumbJsonLd } from "@/components/Breadcrumbs";
import DateToWeekClient from "./DateToWeekClient";
import {
  formatNorwegianDate,
  formatNorwegianDateRange,
  getCurrentNorwegianDate,
  getIsoWeekInfo,
  capitalize,
} from "@/lib/weekUtils";

export const metadata: Metadata = {
  title: "Dato til ukenummer – finn hvilken uke en dato er i",
  description:
    "Skriv inn en dato og se hvilken ISO-uke den tilhører, hvilken ukedag det er, og hvilket datoområde uken dekker.",
  alternates: { canonical: "/dato-til-uke" },
};

const FAQ_ITEMS = [
  {
    question: "Hvorfor kan 1. januar tilhøre forrige år?",
    answer:
      "ISO-året følger uken, ikke kalenderåret. Hvis 1. januar er fredag, lørdag eller søndag, så er den i siste ISO-uke (uke 52 eller 53) i forrige år. Tilsvarende kan 29.–31. desember havne i uke 1 i påfølgende år.",
  },
  {
    question: "Hva er ISO 8601-uker?",
    answer:
      "ISO 8601 er den internasjonale standarden Norge bruker. Uken starter på mandag, og uke 1 er uken som inneholder årets første torsdag (eller, ekvivalent, uken som inneholder 4. januar).",
  },
];

export default async function DateToWeekPage({
  searchParams,
}: {
  searchParams?: Promise<{ dato?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const today = getCurrentNorwegianDate();
  const initialIso = sp.dato;
  let initialInfo: ReturnType<typeof getIsoWeekInfo> | null = null;
  let initialDate: Date | null = null;
  if (initialIso && /^\d{4}-\d{2}-\d{2}$/.test(initialIso)) {
    const [y, m, d] = initialIso.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    if (
      date.getUTCFullYear() === y &&
      date.getUTCMonth() === m - 1 &&
      date.getUTCDate() === d
    ) {
      initialDate = date;
      initialInfo = getIsoWeekInfo(date);
    }
  }
  if (!initialDate) {
    initialDate = today;
    initialInfo = getIsoWeekInfo(today);
  }

  const crumbs = [
    { href: "/", label: "Forside" },
    { label: "Dato til uke" },
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
        title="Dato til ukenummer"
        intro="Skriv inn en dato og se hvilken ISO-uke den tilhører."
        crumbs={crumbs}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <DateToWeekClient
          initialDateIso={`${initialDate.getUTCFullYear()}-${String(
            initialDate.getUTCMonth() + 1
          ).padStart(2, "0")}-${String(initialDate.getUTCDate()).padStart(2, "0")}`}
        />

        {initialInfo && (
          <p className="sr-only">
            {formatNorwegianDate(initialDate)} er i uke {initialInfo.isoWeek}.
            Uken varer fra{" "}
            {formatNorwegianDateRange(initialInfo.start, initialInfo.end)}. Ukedag:{" "}
            {capitalize(initialInfo.weekdayName)}.
          </p>
        )}

        <section className="mt-16 max-w-prose space-y-4 text-[16px] leading-relaxed text-subtle">
          <h2 className="text-[14px] uppercase tracking-[0.18em] text-subtle">
            Om ISO-uker
          </h2>
          <p>
            Datoer tidlig i januar kan tilhøre den siste ISO-uken i forrige år.
            For eksempel ligger 1. januar 2021 i uke 53 av 2020, fordi den
            uken har sin torsdag i 2020.
          </p>
          <p>
            Datoer sent i desember kan tilsvarende tilhøre uke 1 i påfølgende
            år. Ukenummeret følger den uken som dekker den aktuelle datoen, ikke
            kalenderåret.
          </p>
        </section>

        <div className="mt-16">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </div>
    </>
  );
}
