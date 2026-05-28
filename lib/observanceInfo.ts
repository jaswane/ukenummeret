/**
 * Slug-mapping og kort tekst for norske merkedager (ikke offentlige
 * fridager). Brukes i HolidayList (lenker fra helligdagsoversikten)
 * og i /merkedager/[slug]-infosidene.
 */

export type ObservanceInfo = {
  slug: string;
  /** Skal matche eksakt name-feltet fra getNorwegianObservances. */
  name: string;
  intro: string;
  explanation: string[];
  /** Fast = samme dato hvert år. Bevegelig = følger en ukedagsregel. */
  fixed: boolean;
  /** Relaterte slugger (kan peke på merkedager eller helligdager). */
  related: string[];
};

export const OBSERVANCE_INFO: ObservanceInfo[] = [
  {
    slug: "valentinsdagen",
    name: "Valentinsdagen",
    intro: "Kjærlighetens dag, 14. februar.",
    explanation: [
      "Valentinsdagen er en merkedag, ikke en offentlig fridag. Datoen er fast – 14. februar.",
      "Dagen brukes ofte til å vise kjærlighet og oppmerksomhet til noen man er glad i, gjerne med en hilsen, blomster eller en liten gave.",
    ],
    fixed: true,
    related: [],
  },
  {
    slug: "morsdag",
    name: "Morsdag",
    intro: "Dagen vi feirer mødre.",
    explanation: [
      "Morsdag er en merkedag, ikke en offentlig fridag. I Norge er den andre søndag i februar, så datoen flytter seg litt fra år til år.",
      "Mange markerer dagen med en hilsen, blomster eller en oppmerksomhet til mor.",
    ],
    fixed: false,
    related: ["farsdag"],
  },
  {
    slug: "sankthansaften",
    name: "Sankthansaften",
    intro: "Midtsommerfeiring, 23. juni.",
    explanation: [
      "Sankthansaften er en merkedag, ikke en offentlig fridag. Datoen er fast – 23. juni, kvelden før sankthans.",
      "Dagen markerer midtsommer og feires mange steder med bål, grilling og samvær utendørs i den lyse sommerkvelden.",
    ],
    fixed: true,
    related: [],
  },
  {
    slug: "halloween",
    name: "Halloween",
    intro: "Feires 31. oktober.",
    explanation: [
      "Halloween er en merkedag, ikke en offentlig fridag. Datoen er fast – 31. oktober.",
      "Dagen markeres særlig med utkledning, gresskar og «knask eller knep», spesielt blant barn og unge.",
    ],
    fixed: true,
    related: [],
  },
  {
    slug: "farsdag",
    name: "Farsdag",
    intro: "Dagen vi feirer fedre.",
    explanation: [
      "Farsdag er en merkedag, ikke en offentlig fridag. I Norge er den andre søndag i november, så datoen flytter seg litt fra år til år.",
      "Mange markerer dagen med en hilsen eller en oppmerksomhet til far.",
    ],
    fixed: false,
    related: ["morsdag"],
  },
  {
    slug: "julaften",
    name: "Julaften",
    intro: "24. desember – kvelden mange feirer jul.",
    explanation: [
      "Julaften er en merkedag, ikke en offentlig fridag i lovens forstand. Datoen er fast – 24. desember.",
      "Mange i Norge feirer selve julen om kvelden 24. desember, men de offentlige fridagene er 1. og 2. juledag. Mange arbeidsplasser har likevel fri eller kortere dag på julaften.",
    ],
    fixed: true,
    related: ["forste-juledag", "andre-juledag", "nyttarsaften"],
  },
  {
    slug: "nyttarsaften",
    name: "Nyttårsaften",
    intro: "31. desember – kvelden før det nye året.",
    explanation: [
      "Nyttårsaften er en merkedag, ikke en offentlig fridag. Datoen er fast – 31. desember.",
      "Dagen markerer slutten på året og feires ofte med fyrverkeri og samvær. Den offentlige fridagen er 1. nyttårsdag dagen etter.",
    ],
    fixed: true,
    related: ["julaften", "nyttarsdag"],
  },
];

const BY_SLUG = new Map(OBSERVANCE_INFO.map((o) => [o.slug, o]));
const BY_NAME = new Map(OBSERVANCE_INFO.map((o) => [o.name, o]));

export function getObservanceInfoBySlug(slug: string): ObservanceInfo | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getObservanceInfoByName(name: string): ObservanceInfo | null {
  return BY_NAME.get(name) ?? null;
}

export const OBSERVANCE_SLUGS: string[] = OBSERVANCE_INFO.map((o) => o.slug);
