import Link from "next/link";
import SimplePageHeader from "@/components/SimplePageHeader";
import { breadcrumbJsonLd, type Crumb } from "@/components/Breadcrumbs";
import type { RelatedDayLink } from "@/lib/dayLinks";

export type DayFact = { k: string; v: string };

/**
 * Delt presentasjon for både helligdags- og merkedagsinfosider.
 * Holder fakta-, forklarings- og relatert-seksjonene like i utseende.
 */
export default function DayInfoPage({
  eyebrow,
  name,
  intro,
  path,
  crumbs,
  facts,
  explanation,
  related,
  backLink,
}: {
  eyebrow: string;
  name: string;
  intro: string;
  path: string;
  crumbs: Crumb[];
  facts: DayFact[];
  explanation: string[];
  related: RelatedDayLink[];
  backLink: { href: string; label: string };
}) {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: `https://ukenummeret.no${path}`,
    inLanguage: "nb-NO",
    description: intro,
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

      <SimplePageHeader eyebrow={eyebrow} title={name} intro={intro} crumbs={crumbs} />

      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <section aria-labelledby="fakta-heading">
          <h2
            id="fakta-heading"
            className="text-[14px] uppercase tracking-[0.18em] text-subtle"
          >
            Praktisk
          </h2>
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            {facts.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-[13px] uppercase tracking-[0.14em] text-subtle">
                  {f.k}
                </dt>
                <dd className="text-[15px] tnum text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 max-w-prose">
          <h2 className="text-[14px] uppercase tracking-[0.18em] text-subtle">
            Om dagen
          </h2>
          <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-subtle">
            {explanation.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[14px] uppercase tracking-[0.18em] text-subtle">
              Relaterte dager
            </h2>
            <ul className="mt-4 divide-y divide-rule border-y border-rule">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent"
                  >
                    <span className="text-[17px] text-ink group-hover:text-accent">
                      {r.label}
                    </span>
                    <span className="text-[13px] uppercase tracking-[0.14em] text-subtle">
                      {r.hint}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav
          aria-label="Tilbake"
          className="mt-16 border-t border-rule pt-6 text-[14px]"
        >
          <Link
            href={backLink.href}
            className="text-subtle underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            ← {backLink.label}
          </Link>
        </nav>
      </div>
    </>
  );
}
