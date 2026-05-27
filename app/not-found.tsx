import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
      <p className="text-[14px] uppercase tracking-[0.18em] text-subtle">
        404
      </p>
      <h1 className="mt-4 text-[40px] font-medium tracking-tightest sm:text-[52px]">
        Siden finnes ikke
      </h1>
      <p className="mt-4 text-[16px] text-subtle">
        Lenken stemmer ikke. Gå tilbake til{" "}
        <Link
          href="/"
          className="underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
        >
          forsiden
        </Link>
        .
      </p>
    </div>
  );
}
