import type { ReactNode } from "react";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

export default function SimplePageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        {eyebrow && (
          <p className="mb-4 text-[13px] uppercase tracking-[0.18em] text-muted">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance text-[40px] font-medium leading-[1.05] tracking-tightest sm:text-[52px]">
          {title}
        </h1>
        {intro && (
          <div className="mt-6 max-w-prose text-[17px] leading-relaxed text-muted">
            {intro}
          </div>
        )}
      </div>
    </header>
  );
}
