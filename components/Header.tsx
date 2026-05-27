import Link from "next/link";
import MobileNav from "./MobileNav";
import { getCurrentNorwegianDate, getIsoWeek } from "@/lib/weekUtils";

const NAV = [
  { href: "/", label: "Ukenummer" },
  { href: "/kalender", label: "Kalender" },
  { href: "/helligdager", label: "Helligdager" },
  { href: "/dato-til-uke", label: "Dato til uke" },
  { href: "/uke-til-dato", label: "Uke til dato" },
];

export default function Header() {
  const today = getCurrentNorwegianDate();
  const { isoYear } = getIsoWeek(today);
  const nav = NAV.map((n) =>
    n.href === "/kalender"
      ? { ...n, href: `/kalender-${isoYear}` }
      : n.href === "/helligdager"
      ? { ...n, href: `/helligdager-${isoYear}` }
      : n
  );

  return (
    <header className="relative border-b border-rule">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight text-ink"
        >
          Ukenummeret<span className="text-muted">.no</span>
        </Link>

        <nav className="hidden sm:block" aria-label="Hovedmeny">
          <ul className="flex items-center gap-x-5 text-[14px] text-subtle">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav items={nav} />
      </div>
    </header>
  );
}
