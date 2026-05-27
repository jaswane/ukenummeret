import Link from "next/link";

type Item = { href: string; label: string };

export default function PageCrossLinks({ items }: { items: Item[] }) {
  return (
    <nav
      aria-label="Relaterte sider"
      className="mt-12 border-t border-rule pt-6 text-[14px] text-subtle"
    >
      <p className="flex flex-wrap gap-x-6 gap-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {item.label}
          </Link>
        ))}
      </p>
    </nav>
  );
}
