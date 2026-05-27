import type { Metadata } from "next";
import SimplePageHeader from "@/components/SimplePageHeader";
import PageCrossLinks from "@/components/PageCrossLinks";

export const metadata: Metadata = {
  title: "Datakilder og beregning",
  description:
    "Hvordan ukenummer, datoer og norske helligdager beregnes på Ukenummeret.no.",
  alternates: { canonical: "/datakilder-og-beregning" },
};

export default function DatakilderPage() {
  return (
    <>
      <SimplePageHeader
        eyebrow="Datakilder"
        title="Datakilder og beregning"
        crumbs={[
          { href: "/", label: "Forside" },
          { label: "Datakilder" },
        ]}
      />
      <article className="mx-auto max-w-prose px-5 py-12 text-[17px] leading-relaxed text-ink sm:px-8 sm:py-16">
        <p>
          Alt på Ukenummeret.no er beregnet i kode. Vi bruker ikke statiske
          årstabeller, og vi kopierer ikke kalenderdata fra tredjeparter.
        </p>

        <h2 className="mt-10 text-[15px] uppercase tracking-[0.18em] text-subtle">
          Ukenummer
        </h2>
        <p className="mt-3 text-subtle">
          Ukenummer beregnes etter ISO 8601. Uken starter på mandag, og uke 1
          er uken som inneholder årets første torsdag (alternativt:
          uken som inneholder 4. januar). Et ISO-år har 53 uker når 1. januar
          er torsdag, eller når 31. desember er torsdag i et skuddår.
        </p>

        <h2 className="mt-10 text-[15px] uppercase tracking-[0.18em] text-subtle">
          Tidssone
        </h2>
        <p className="mt-3 text-subtle">
          Dagens dato bestemmes i norsk tidssone (Europe/Oslo), inkludert
          sommertid og vintertid. Det betyr at «i dag» alltid er i tråd med
          klokken i Norge, uavhengig av hvor besøkende åpner siden fra.
        </p>

        <h2 className="mt-10 text-[15px] uppercase tracking-[0.18em] text-subtle">
          Norske helligdager
        </h2>
        <p className="mt-3 text-subtle">
          Faste helligdager (1. nyttårsdag, 1. mai, 17. mai, 1. og 2. juledag)
          beregnes direkte fra datoen. Bevegelige helligdager beregnes fra
          påskedag via den anonyme gregorianske påskeformelen (Meeus/Jones/
          Butcher). Skjærtorsdag og langfredag ligger tre og to dager før
          påskedag, andre påskedag er dagen etter, og Kristi himmelfartsdag,
          1. og 2. pinsedag er henholdsvis 39, 49 og 50 dager etter påskedag.
        </p>

        <h2 className="mt-10 text-[15px] uppercase tracking-[0.18em] text-subtle">
          Merkedager
        </h2>
        <p className="mt-3 text-subtle">
          Merkedager som julaften, sankthansaften, Halloween, morsdag og
          farsdag er ikke offentlige fridager i Norge. De vises i en egen
          seksjon, tydelig skilt fra de offentlige helligdagene. Morsdag er
          andre søndag i februar, farsdag er andre søndag i november.
        </p>

        <PageCrossLinks
          items={[
            { href: "/ansvarsfraskrivelse", label: "Ansvarsfraskrivelse" },
            { href: "/om", label: "Om Ukenummeret.no" },
          ]}
        />
      </article>
    </>
  );
}
