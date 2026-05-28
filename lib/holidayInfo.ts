/**
 * Slug-mapping og kort, nøktern forklaringstekst for de 12 norske
 * offentlige helligdagene. Brukes både i HolidayList (lenker fra
 * helligdagsoversikten) og i /helligdager/[slug]-infosidene.
 */

export type HolidayInfo = {
  slug: string;
  /** Skal matche eksakt name-feltet fra getNorwegianPublicHolidays. */
  name: string;
  /** Veldig kort intro under H1. */
  intro: string;
  /** Kort forklaring, ett til tre korte avsnitt. */
  explanation: string[];
  /** Fast = samme dato hvert år. Bevegelig = følger påskeformelen. */
  fixed: boolean;
  /** Andre slugger som henger naturlig sammen (helligdag eller merkedag). */
  related: string[];
};

export const HOLIDAY_INFO: HolidayInfo[] = [
  {
    slug: "nyttarsdag",
    name: "1. nyttårsdag",
    intro: "1. januar markerer starten på det nye året.",
    explanation: [
      "1. nyttårsdag er en lovbestemt offentlig fridag i Norge. Datoen er fast – 1. januar hvert år.",
      "Dagen markerer starten på et nytt kalenderår, og er for mange en rolig fridag etter nyttårsfeiringen kvelden før.",
    ],
    fixed: true,
    related: ["nyttarsaften"],
  },
  {
    slug: "skjaertorsdag",
    name: "Skjærtorsdag",
    intro: "Torsdagen før påske.",
    explanation: [
      "Skjærtorsdag er en offentlig fridag i Norge og en del av påskehøytiden. Datoen er bevegelig og ligger tre dager før påskedag.",
      "I kristen tradisjon markerer dagen Jesu siste måltid med disiplene – det som kalles nattverden.",
    ],
    fixed: false,
    related: ["langfredag", "forste-paskedag", "andre-paskedag"],
  },
  {
    slug: "langfredag",
    name: "Langfredag",
    intro: "Fredagen før påske.",
    explanation: [
      "Langfredag er en offentlig fridag i Norge og en av de viktigste dagene i påsken. Datoen er bevegelig og ligger to dager før påskedag.",
      "I kristen tradisjon markerer dagen Jesu korsfestelse og død.",
    ],
    fixed: false,
    related: ["skjaertorsdag", "forste-paskedag", "andre-paskedag"],
  },
  {
    slug: "forste-paskedag",
    name: "1. påskedag",
    intro: "Selve hoveddagen i påsken.",
    explanation: [
      "1. påskedag er hoveddagen i påsken og en lovbestemt fridag i Norge. Datoen er bevegelig: påskedag er den første søndagen etter første fullmåne etter vårjevndøgn.",
      "I kristen tradisjon markerer dagen Jesu oppstandelse.",
    ],
    fixed: false,
    related: ["skjaertorsdag", "langfredag", "andre-paskedag"],
  },
  {
    slug: "andre-paskedag",
    name: "2. påskedag",
    intro: "Mandagen etter 1. påskedag.",
    explanation: [
      "2. påskedag er fridagen etter 1. påskedag og avslutter påskehelgen. Datoen er bevegelig og følger påsken.",
      "Mange bruker dagen til hvile eller reise hjem etter påskeferien.",
    ],
    fixed: false,
    related: ["skjaertorsdag", "langfredag", "forste-paskedag"],
  },
  {
    slug: "arbeidernes-dag",
    name: "Arbeidernes dag",
    intro: "1. mai – arbeidernes internasjonale dag.",
    explanation: [
      "1. mai er en lovbestemt offentlig høytidsdag i Norge. Datoen er fast.",
      "Dagen markeres internasjonalt som arbeidernes kamp- og solidaritetsdag, ofte med taler og tog.",
    ],
    fixed: true,
    related: ["grunnlovsdag"],
  },
  {
    slug: "grunnlovsdag",
    name: "Grunnlovsdag",
    intro: "17. mai – Norges nasjonaldag.",
    explanation: [
      "17. mai er Norges nasjonaldag og en offentlig fridag. Datoen er fast.",
      "Dagen markerer at Grunnloven ble undertegnet på Eidsvoll i 1814. Den feires med barnetog, flagg, korps og folkefest over hele landet.",
    ],
    fixed: true,
    related: ["arbeidernes-dag"],
  },
  {
    slug: "kristi-himmelfartsdag",
    name: "Kristi himmelfartsdag",
    intro: "Torsdag, 39 dager etter påskedag.",
    explanation: [
      "Kristi himmelfartsdag er en offentlig fridag i Norge. Datoen er bevegelig og ligger 39 dager etter påskedag, og faller alltid på en torsdag.",
      "I kristen tradisjon markerer dagen at Jesus fór opp til himmelen, regnet som den 40. dagen i påsketiden.",
    ],
    fixed: false,
    related: ["forste-pinsedag", "andre-pinsedag"],
  },
  {
    slug: "forste-pinsedag",
    name: "1. pinsedag",
    intro: "Søndag, 49 dager etter påskedag.",
    explanation: [
      "1. pinsedag er en offentlig fridag i Norge. Datoen er bevegelig og ligger 49 dager etter påskedag.",
      "I kristen tradisjon handler pinse om Den hellige ånd, og dagen regnes som kirkens fødselsdag.",
    ],
    fixed: false,
    related: ["andre-pinsedag", "kristi-himmelfartsdag"],
  },
  {
    slug: "andre-pinsedag",
    name: "2. pinsedag",
    intro: "Mandagen etter 1. pinsedag.",
    explanation: [
      "2. pinsedag er fridagen etter 1. pinsedag og avslutter pinsehelgen. Datoen er bevegelig og ligger 50 dager etter påskedag.",
    ],
    fixed: false,
    related: ["forste-pinsedag", "kristi-himmelfartsdag"],
  },
  {
    slug: "forste-juledag",
    name: "1. juledag",
    intro: "25. desember – hoveddagen i julen.",
    explanation: [
      "1. juledag er hoveddagen i julehøytiden og en lovbestemt fridag i Norge. Datoen er fast – 25. desember.",
      "I kristen tradisjon markerer dagen Jesu fødsel.",
    ],
    fixed: true,
    related: ["andre-juledag", "julaften"],
  },
  {
    slug: "andre-juledag",
    name: "2. juledag",
    intro: "26. desember – dagen etter jul.",
    explanation: [
      "2. juledag er andre dag i julehøytiden og en offentlig fridag i Norge. Datoen er fast – 26. desember.",
      "Dagen brukes ofte til besøk, hvile eller juletradisjoner.",
    ],
    fixed: true,
    related: ["forste-juledag", "julaften"],
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
