# Smart pokladnička

Responzívne webové demo na správu úspor a finančných cieľov. Aplikácia funguje priamo v prehliadači a ukladá údaje do `localStorage`. Nepotrebuje server, databázu, API kľúč ani inštaláciu závislostí.

## Spustenie

Otvorte `index.html` v aktuálnom webovom prehliadači. Pre pohodlnejšie lokálne spustenie môžete v priečinku projektu použiť napríklad:

```bash
python -m http.server 8000
```

Potom otvorte `http://localhost:8000`.

## Funkcie

- Prehľad zostatku, vkladov za mesiac, zariadenia, grafu úspor a posledných transakcií.
- Vklady vlastnej sumy aj simulácia mincí 0,10 €, 0,20 €, 0,50 €, 1 € a 2 €; výbery s kontrolou dostupného zostatku.
- Finančné ciele s termínom, ikonou, úpravou a odstránením. Vklad možno priradiť ku konkrétnemu cieľu.
- História s vyhľadávaním, filtrovaním a zoradením od najnovších.
- Štatistiky vypočítavané z uložených transakcií a graf za 7 alebo 30 dní.
- Nastavenia mena, názvu pokladničky, tmavého režimu, vymazania a obnovenia demo údajov.
- Mobilné menu a adaptívne rozloženie.

Prvé otvorenie vytvorí ukážkové údaje. Ďalšie návštevy používajú údaje uložené v prehliadači. Obnovenie ukážky alebo vymazanie údajov je dostupné v Nastaveniach.

## Simulované zariadenie

Stav pripojenia a synchronizácie sú demonštračné. Vklady a výbery sa vykonávajú v aplikácii a nekomunikujú so skutočným hardvérom. Neskoršie pripojenie pokladničky by vyžadovalo hardvérové rozhranie, napríklad lokálny backend alebo Web Serial/Bluetooth API, protokol zariadenia a vrstvu, ktorá bezpečne premení potvrdené hardvérové udalosti na transakcie aplikácie. Aktuálna vrstva úloží aplikáciu v prehliadači.
