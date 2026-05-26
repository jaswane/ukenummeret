import type { Metadata } from "next";
import Link from "next/link";
import SimplePageHeader from "@/components/SimplePageHeader";

export const metadata: Metadata = {
  title: "Personvern",
  description:
    "Hvordan Ukenummeret.no håndterer (eller ikke håndterer) data om besøkende.",
  alternates: { canonical: "/personvern" },
};

export default function PersonvernPage() {
  return (
    <>
      <SimplePageHeader
        eyebrow="Personvern"
        title="Personvernerklæring"
        crumbs={[{ href: "/", label: "Forside" }, { label: "Personvern" }]}
      />
      <article className="mx-auto max-w-prose px-5 py-12 text-[17px] leading-relaxed text-ink sm:px-8 sm:py-16">
        <p>
          Ukenummeret.no er et enkelt verktøy. Vi prøver å samle inn så lite
          informasjon som mulig om deg.
        </p>

        <h2 className="mt-10 text-[15px] uppercase tracking-[0.18em] text-muted">
          Hva vi samler inn
        </h2>
        <p className="mt-3 text-muted">
          I denne versjonen av Ukenummeret.no kjører vi ingen analyseverktøy
          som Google Analytics, og vi setter ingen sporingsinformasjonskapsler.
          Hvis vi senere legger til analyse for å forstå bruksmønstre, vil
          dette dokumentet bli oppdatert med tydelig informasjon om hvilket
          verktøy som brukes og hvilke data som samles inn.
        </p>

        <h2 className="mt-10 text-[15px] uppercase tracking-[0.18em] text-muted">
          Logger
        </h2>
        <p className="mt-3 text-muted">
          Vår hostingleverandør kan logge tekniske detaljer som IP-adresse og
          forespørselstidspunkt for å sikre stabil drift. Disse loggene brukes
          ikke til markedsføring eller profilering.
        </p>

        <h2 className="mt-10 text-[15px] uppercase tracking-[0.18em] text-muted">
          E-post
        </h2>
        <p className="mt-3 text-muted">
          Hvis du sender oss en e-post via vår{" "}
          <Link
            href="/kontakt"
            className="underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
          >
            kontaktside
          </Link>
          , bruker vi innholdet kun til å svare deg. Vi deler ikke
          e-postinnhold med tredjeparter.
        </p>

        <h2 className="mt-10 text-[15px] uppercase tracking-[0.18em] text-muted">
          Endringer
        </h2>
        <p className="mt-3 text-muted">
          Denne erklæringen kan oppdateres. Vesentlige endringer beskrives på
          denne siden.
        </p>
      </article>
    </>
  );
}
