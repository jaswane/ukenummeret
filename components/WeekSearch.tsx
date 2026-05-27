"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseDateOrWeekInput } from "@/lib/weekUtils";

export default function WeekSearch({
  placeholder = "Skriv dato eller ukenummer",
  ariaLabel = "Søk etter dato eller ukenummer",
}: {
  placeholder?: string;
  ariaLabel?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = parseDateOrWeekInput(value);
    if (result.type === "date") {
      const iso = `${result.date.getUTCFullYear()}-${String(
        result.date.getUTCMonth() + 1
      ).padStart(2, "0")}-${String(result.date.getUTCDate()).padStart(2, "0")}`;
      router.push(`/dato-til-uke?dato=${iso}`);
    } else if (result.type === "week") {
      router.push(`/uke-til-dato?ar=${result.isoYear}&uke=${result.isoWeek}`);
    } else {
      setError(result.reason ?? "Forstod ikke verdien");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label htmlFor="ws-input" className="sr-only">
        {ariaLabel}
      </label>
      <div className="flex items-stretch border border-rule bg-panel transition-colors focus-within:border-accent">
        <input
          id="ws-input"
          type="text"
          inputMode="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-4 py-3 text-[16px] text-ink placeholder:text-muted focus:outline-none"
          autoComplete="off"
        />
        <button
          type="submit"
          className="border-l border-rule px-5 py-3 text-[14px] font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
        >
          Slå opp
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-[14px] text-accent">
          {error}
        </p>
      )}
    </form>
  );
}
