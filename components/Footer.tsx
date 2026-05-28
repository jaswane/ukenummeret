import Link from "next/link";
import { getCurrentNorwegianDate } from "@/lib/weekUtils";

const LINKS = [
  { href: "/om", label: "Om Ukenummeret.no" },
  { href: "/personvern", label: "Personvern" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/datakilder-og-beregning", label: "Datakilder og beregning" },
  { href: "/ansvarsfraskrivelse", label: "Ansvarsfraskrivelse" },
];

export default function Footer() {
  const year = getCurrentNorwegianDate().getUTCFullYear();
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-3xl px-5 py-10 text-center text-[14px] text-subtle sm:px-8 sm:text-left">
        <ul className="flex flex-col items-center gap-y-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-6 sm:gap-y-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 sm:mt-6">
          © {year}{" "}
          <a
            href="https://swanecreative.no"
            className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            rel="noopener noreferrer"
          >
            Swane Creative
          </a>
        </p>
        <p className="mt-3">
          Andre enkle verktøy:{" "}
          <a
            href="https://utregn.no"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Utregn.no
          </a>
          {" · "}
          <a
            href="https://fridagene.no"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Fridagene.no
          </a>
        </p>
      </div>
    </footer>
  );
}
