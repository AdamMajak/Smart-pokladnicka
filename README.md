# Smart pokladnička

Jednostránková Angular aplikácia v slovenčine na prehľad osobných financií a evidenciu výdavkov. Ukážkové transakcie sú demo dáta; aplikácia zatiaľ nie je pripojená k fyzickej pokladničke ani k banke.

## Spustenie

```bash
npm install
npm start
```

Aplikácia sa otvorí na `http://localhost:4200`. Produkčnú verziu vytvoríš príkazom `npm run build`.

## Štruktúra

Funkcie sú zoskupené podľa oblasti v `src/app/features/` (prehľad, výdavky, kategórie). Zdieľané typy a ukladanie dát sú v `src/app/core/`. Routy sú v `src/app/app.routes.ts`.

## Routy

- `/prehľad` – mesačný prehľad a grafy
- `/vydavky` – zoznam výdavkov
- `/vydavky/novy` – vytvorenie výdavku
- `/vydavky/:id` – detail výdavku
- `/vydavky/:id/upravit` – úprava výdavku

Údaje sa ukladajú do `localStorage` tohto prehliadača. Tlačidlo „Obnoviť demo dáta“ v nastaveniach vráti ukážkové transakcie.
