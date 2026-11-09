import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-heading"><div><span class="eyebrow">NASTAVENIA</span><h1>Tvoj priestor</h1><p>Jednoduché nastavenia a informácie o aplikácii.</p></div></section>
    <section class="card settings-card"><div class="settings-section"><span class="settings-icon">◉</span><div><strong>Osobný profil</strong><p>Zatiaľ používame ukážkový profil. Prihlasovanie nie je nastavené.</p></div><span class="settings-badge">Demo</span></div><div class="settings-section"><span class="settings-icon mint">▤</span><div><strong>Ukladanie údajov</strong><p>Tvoje záznamy sú uložené lokálne v tomto prehliadači.</p></div></div><div class="settings-section"><span class="settings-icon lilac">🐷</span><div><strong>Fyzická pokladnička</strong><p>Pripojenie zariadenia zatiaľ nie je implementované. Čísla na prehľade sú iba demo údaje.</p></div></div><div class="settings-section settings-reset"><span class="settings-icon">↺</span><div><strong>Obnoviť ukážkové výdavky</strong><p>Nahradí tvoje aktuálne záznamy pripravenými demo dátami.</p></div><button class="button button-soft" (click)="ask.set(true)">Obnoviť demo dáta</button></div></section>
    <p class="settings-footnote"><a routerLink="/prehľad">← Späť na prehľad</a> <span>Smart pokladnička · Školský projekt</span></p>
    @if (ask()) { <div class="confirm-scrim"><section class="confirm-dialog" role="alertdialog"><span class="confirm-icon">↺</span><h2>Obnoviť demo dáta?</h2><p>Aktuálne záznamy v tomto prehliadači budú nahradené ukážkovými výdavkami.</p><div class="form-actions"><button class="button button-quiet" (click)="ask.set(false)">Zrušiť</button><button class="button button-primary" (click)="reset()">Obnoviť</button></div></section></div> }
    @if (done()) { <div class="toast-message" role="status">Ukážkové dáta sú obnovené ✓ <button (click)="done.set(false)" aria-label="Zavrieť">×</button></div> }
  `,
})
export class SettingsComponent {
  private readonly service = inject(ExpenseService);
  readonly ask = signal(false);
  readonly done = signal(false);
  reset(): void {
    this.service.resetDemo();
    this.ask.set(false);
    this.done.set(true);
  }
}
