"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

export default function MobileNav({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="px-2 py-1 text-[14px] text-subtle transition-colors hover:text-ink"
      >
        {open ? "Lukk" : "Meny"}
      </button>
      {open && (
        <nav
          id="mobile-nav-panel"
          aria-label="Mobilnavigasjon"
          className="absolute left-0 right-0 top-full z-20 border-b border-rule bg-paper"
        >
          <ul className="mx-auto flex max-w-3xl flex-col px-5 py-3 text-[16px]">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-ink transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
