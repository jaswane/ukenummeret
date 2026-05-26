import type { Metadata } from "next";
import SimplePageHeader from "@/components/SimplePageHeader";

export const metadata: Metadata = {
  title: "Om Ukenummeret.no",
  description:
    "Hva Ukenummeret.no er, hvorfor siden finnes, og hvilken kalenderstandard den bruker.",
  alternates: { canonical: "/om" },
};

export default function OmPage() {
  return (
    <>
      <SimplePageHeader
        eyebrow="Om"
        title="Et lite verktøy for ukenummer"
        crumbs={[{ href: "/", label: "Forside" }, { label: "Om" }]}
      />
      <article className="mx-auto max-w-prose px-5 py-12 text-[17px] leading-relaxed text-ink sm:px-8 sm:py-16">
        <p>
          Ukenummeret.no svarer på ett spørsmål: hvilken uke er det nå? Resten
          av siden – kalender, helligdager, dato- og ukeverktøy – finnes for å
          gjøre den enkle handlingen «slå opp en uke eller en dato» raskere og
          tydeligere enn alternativene.
        </p>
        <p className="mt-5 text-muted">
          Alle ukenummer er beregnet etter ISO 8601, som er standarden Norge
          bruker. Uken starter på mandag og slutter på søndag, og uke 1 er
          uken som inneholder årets første torsdag. Datoer er beregnet i norsk
          tidssone, Europe/Oslo.
        </p>
        <p className="mt-5 text-muted">
          Siden er bygget og drevet av Swane Creative. Den er reklamefri,
          inneholder ingen sporing i denne versjonen, og er bygget for å
          fungere år etter år uten manuell oppdatering av kalenderdata.
        </p>
      </article>
    </>
  );
}
