export type FaqItem = { question: string; answer: string };

export default function FAQ({
  items,
  title = "Ofte stilte spørsmål",
}: {
  items: FaqItem[];
  title?: string;
}) {
  return (
    <section aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-[14px] uppercase tracking-[0.18em] text-muted"
      >
        {title}
      </h2>
      <dl className="mt-6 divide-y divide-rule border-y border-rule">
        {items.map((item, i) => (
          <div key={i} className="py-6">
            <dt className="text-[18px] font-medium text-ink">
              {item.question}
            </dt>
            <dd className="mt-2 max-w-prose text-[16px] leading-relaxed text-muted">
              {item.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
