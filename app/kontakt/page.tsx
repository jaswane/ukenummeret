import type { Metadata } from "next";
import SimplePageHeader from "@/components/SimplePageHeader";
import PageCrossLinks from "@/components/PageCrossLinks";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Send oss en e-post hvis du har innspill, korreksjoner eller forslag til Ukenummeret.no.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <SimplePageHeader
        eyebrow="Kontakt"
        title="Hei – ta gjerne kontakt"
        crumbs={[{ href: "/", label: "Forside" }, { label: "Kontakt" }]}
      />
      <article className="mx-auto max-w-prose px-5 py-12 text-[17px] leading-relaxed text-ink sm:px-8 sm:py-16">
        <p>
          Har du funnet en feil i datoer eller helligdager, eller et forslag
          til hvordan siden kan bli enklere å bruke?
        </p>
        <p className="mt-5">
          Send en e-post til{" "}
          <a
            href="mailto:kontakt@swanecreative.no"
            className="text-accent underline decoration-rule underline-offset-4 hover:decoration-accent"
          >
            kontakt@swanecreative.no
          </a>
          . Vi leser alt.
        </p>

        <PageCrossLinks
          items={[
            { href: "/om", label: "Om Ukenummeret.no" },
            { href: "/personvern", label: "Personvern" },
          ]}
        />
      </article>
    </>
  );
}
