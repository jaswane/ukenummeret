/**
 * Slug-mapping og kort, nøktern forklaringstekst for de 12 norske
 * offentlige helligdagene. Brukes både i HolidayList (lenker fra
 * helligdagsoversikten) og i /helligdager/[slug]-infosidene.
 */

export type HolidayKindLabel = "Fast" | "Bevegelig";

export type HolidayInfo = {
  slug: string;
  /** Skal matche eksakt name-feltet fra getNorwegianPublicHolidays. */
  name: string;
  /** Veldig kort intro under H1. */
  intro: string;
  /** Kort forklaring av hva dagen markerer og hvorfor den er fridag. */
  explanation: string;
  /** Fast = samme dato hvert år. Bevegelig = følger påskeformelen. */
  fixed: boolean;
  /** Andre slugger som henger naturlig sammen. */
  related: string[];
};

export const HOLIDAY_INFO: HolidayInfo[] = [
  {
    slug: "nyttarsdag",
    name: "1. nyttårsdag",
    intro: "1. januar markerer starten på det nye året.",
    explanation:
      "1. nyttårsdag er en lovbestemt offentlig fridag i Norge etter helligdagsloven. Datoen er fast og faller alltid på 1. januar.",
    fixed: true,
    related: [],
  },
  {
    slug: "skjaertorsdag",
    name: "Skjærtorsdag",
    intro: "Torsdagen før påske.",
    explanation:
      "Skjærtorsdag er en kristen høytidsdag i påskeuken og en offentlig fridag i Norge. Datoen er bevegelig og ligger tre dager før påskedag.",
    fixed: false,
    related: ["langfredag", "forste-paskedag", "andre-paskedag"],
  },
  {
    slug: "langfredag",
    name: "Langfredag",
    intro: "Fredagen før påske.",
    explanation:
      "Langfredag er en kristen høytidsdag og en offentlig fridag i Norge. Datoen er bevegelig og ligger to dager før påskedag.",
    fixed: false,
    related: ["skjaertorsdag", "forste-paskedag", "andre-paskedag"],
  },
  {
    slug: "forste-paskedag",
    name: "1. påskedag",
    intro: "Selve påskedagen.",
    explanation:
      "1. påskedag er kristendommens viktigste høytidsdag og en lovbestemt fridag i Norge. Datoen er bevegelig: påskedag er den første søndagen etter første fullmåne etter vårjevndøgn.",
    fixed: false,
    related: ["skjaertorsdag", "langfredag", "andre-paskedag"],
  },
  {
    slug: "andre-paskedag",
    name: "2. påskedag",
    intro: "Mandagen etter 1. påskedag.",
    explanation:
      "2. påskedag er dagen etter påskedag og en offentlig fridag i Norge. Datoen er bevegelig og følger påsken.",
    fixed: false,
    related: ["skjaertorsdag", "langfredag", "forste-paskedag"],
  },
  {
    slug: "arbeidernes-dag",
    name: "Arbeidernes dag",
    intro: "1. mai – arbeidernes internasjonale dag.",
    explanation:
      "1. mai er en lovbestemt offentlig høytidsdag i Norge. Dagen markeres internasjonalt for arbeideres rettigheter. Datoen er fast.",
    fixed: true,
    related: ["grunnlovsdag"],
  },
  {
    slug: "grunnlovsdag",
    name: "Grunnlovsdag",
    intro: "17. mai – Norges nasjonaldag.",
    explanation:
      "17. mai markerer signeringen av Grunnloven på Eidsvoll i 1814. Dagen er en offentlig fridag og Norges nasjonaldag, kjent for barnetog over hele landet. Datoen er fast.",
    fixed: true,
    related: ["arbeidernes-dag"],
  },
  {
    slug: "kristi-himmelfartsdag",
    name: "Kristi himmelfartsdag",
    intro: "Torsdag, 39 dager etter påske.",
    explanation:
      "Kristi himmelfartsdag er en kristen høytidsdag og en offentlig fridag i Norge. Datoen er bevegelig og ligger 39 dager etter påskedag, og faller alltid på en torsdag.",
    fixed: false,
    related: ["forste-pinsedag", "andre-pinsedag"],
  },
  {
    slug: "forste-pinsedag",
    name: "1. pinsedag",
    intro: "Søndag, 49 dager etter påske.",
    explanation:
      "1. pinsedag er en kristen høytidsdag og en offentlig fridag i Norge. Datoen er bevegelig og ligger 49 dager etter påskedag.",
    fixed: false,
    related: ["andre-pinsedag", "kristi-himmelfartsdag"],
  },
  {
    slug: "andre-pinsedag",
    name: "2. pinsedag",
    intro: "Mandagen etter 1. pinsedag.",
    explanation:
      "2. pinsedag er dagen etter pinsedag og en offentlig fridag i Norge. Datoen er bevegelig og ligger 50 dager etter påskedag.",
    fixed: false,
    related: ["forste-pinsedag", "kristi-himmelfartsdag"],
  },
  {
    slug: "forste-juledag",
    name: "1. juledag",
    intro: "25. desember – selve juledagen.",
    explanation:
      "1. juledag er en kristen høytidsdag og en lovbestemt fridag i Norge. Dagen markerer feiringen av Jesu fødsel. Datoen er fast.",
    fixed: true,
    related: ["andre-juledag"],
  },
  {
    slug: "andre-juledag",
    name: "2. juledag",
    intro: "26. desember – dagen etter jul.",
    explanation:
      "2. juledag er en lovbestemt offentlig fridag i Norge. Dagen runder av julehøytiden for mange. Datoen er fast.",
    fixed: true,
    related: ["forste-juledag"],
  },
];

const BY_SLUG = new Map(HOLIDAY_INFO.map((h) => [h.slug, h]));
const BY_NAME = new Map(HOLIDAY_INFO.map((h) => [h.name, h]));

export function getHolidayInfoBySlug(slug: string): HolidayInfo | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getHolidayInfoByName(name: string): HolidayInfo | null {
  return BY_NAME.get(name) ?? null;
}

export const HOLIDAY_SLUGS: string[] = HOLIDAY_INFO.map((h) => h.slug);
