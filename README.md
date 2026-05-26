# Ukenummeret.no

Norsk verktøy for ukenummer, kalender og helligdager. Bygget med Next.js App
Router, TypeScript og Tailwind CSS.

## Kjør lokalt

```bash
npm install
npm run dev
```

Åpne http://localhost:3000.

## Scripts

```bash
npm run dev        # Lokal utvikling
npm run build      # Produksjonsbygg
npm run start      # Server prod-bygg
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
npm test           # Vitest-tester
```

## Struktur

- `app/` – ruter (App Router)
- `components/` – delte UI-byggeklosser
- `lib/weekUtils.ts` – ISO 8601 ukematematikk og datolesere
- `lib/norwegianHolidays.ts` – norske offentlige helligdager og merkedager
- `lib/*.test.ts` – Vitest-tester
- `next.config.ts` – rewrites for `/kalender-YYYY` og `/helligdager-YYYY`

## Kalenderlogikk

All kalenderlogikk er deterministisk i kode:

- ISO 8601-uker, mandag som første ukedag
- Norsk tidssone (Europe/Oslo) for «i dag»
- Påske via anonym gregoriansk påskeformel (Meeus/Jones/Butcher)
- 12 norske offentlige helligdager + egen liste for merkedager

## Domene

https://ukenummeret.no
