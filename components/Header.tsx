import Link from "next/link";
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
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-medium tracking-tight text-ink"
        >
          Ukenummeret<span className="text-muted">.no</span>
        </Link>
        <nav>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-muted">
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
      </div>
    </header>
  );
}
