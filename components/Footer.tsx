import Link from "next/link";
import { getCurrentNorwegianDate } from "@/lib/weekUtils";

export default function Footer() {
  const year = getCurrentNorwegianDate().getUTCFullYear();
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto max-w-5xl px-5 py-10 text-[14px] text-muted sm:px-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Link href="/om" className="transition-colors hover:text-ink">
              Om Ukenummeret.no
            </Link>
          </li>
          <li>
            <Link href="/personvern" className="transition-colors hover:text-ink">
              Personvern
            </Link>
          </li>
          <li>
            <Link href="/kontakt" className="transition-colors hover:text-ink">
              Kontakt
            </Link>
          </li>
          <li>
            <Link
              href="/datakilder-og-beregning"
              className="transition-colors hover:text-ink"
            >
              Datakilder og beregning
            </Link>
          </li>
          <li>
            <Link
              href="/ansvarsfraskrivelse"
              className="transition-colors hover:text-ink"
            >
              Ansvarsfraskrivelse
            </Link>
          </li>
        </ul>
        <p className="mt-6">
          © {year}{" "}
          <a
            href="https://swanecreative.no"
            className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            rel="noopener noreferrer"
          >
            Swane Creative
          </a>
        </p>
      </div>
    </footer>
  );
}
