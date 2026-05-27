import type { Metadata } from "next";
import SimplePageHeader from "@/components/SimplePageHeader";
import PageCrossLinks from "@/components/PageCrossLinks";

export const metadata: Metadata = {
  title: "Ansvarsfraskrivelse",
  description:
    "Ukenummeret.no er et praktisk verktøy. Sjekk alltid mot offisielle kilder ved viktige frister.",
  alternates: { canonical: "/ansvarsfraskrivelse" },
};

export default function AnsvarsfraskrivelsePage() {
  return (
    <>
      <SimplePageHeader
        eyebrow="Ansvar"
        title="Ansvarsfraskrivelse"
        crumbs={[
          { href: "/", label: "Forside" },
          { label: "Ansvarsfraskrivelse" },
        ]}
      />
      <article className="mx-auto max-w-prose px-5 py-12 text-[17px] leading-relaxed text-ink sm:px-8 sm:py-16">
        <p>
          Ukenummeret.no er et praktisk verktøy. Vi har lagt mye arbeid i å
          beregne ukenummer, datoer og helligdager korrekt, men kan ikke
          garantere at all informasjon alltid er feilfri.
        </p>
        <p className="mt-5 text-subtle">
          Dobbeltsjekk datoer mot offisielle kilder hvis du skal bruke dem til
          viktige juridiske, offentlige eller arbeidsrelaterte frister. Vi tar
          ikke ansvar for tap eller konsekvenser som følge av at innhold på
          siden brukes som beslutningsgrunnlag.
        </p>
        <p className="mt-5 text-subtle">
          Finner du en feil, hører vi gjerne fra deg.
        </p>

        <PageCrossLinks
          items={[
            { href: "/datakilder-og-beregning", label: "Datakilder og beregning" },
            { href: "/kontakt", label: "Kontakt" },
          ]}
        />
      </article>
    </>
  );
}
