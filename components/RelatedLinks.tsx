import Link from "next/link";

export type RelatedLink = { href: string; label: string; hint?: string };

export default function RelatedLinks({
  items,
  title = "Relatert",
}: {
  items: RelatedLink[];
  title?: string;
}) {
  return (
    <section aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="text-[14px] uppercase tracking-[0.18em] text-muted"
      >
        {title}
      </h2>
      <ul className="mt-4 divide-y divide-rule border-y border-rule">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent"
            >
              <span className="text-[17px] text-ink group-hover:text-accent">
                {item.label}
              </span>
              {item.hint && (
                <span className="text-[13px] uppercase tracking-[0.14em] text-muted">
                  {item.hint}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
