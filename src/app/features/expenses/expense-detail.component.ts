import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { categoryFor } from '../../core/data/categories';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page-heading"><div><a routerLink="/vydavky" class="back-link">← Všetky výdavky</a><span class="eyebrow">PODROBNOSTI NÁKUPU</span><h1>{{ expense()?.title ?? 'Výdavok sa nenašiel' }}</h1><p>Tu nájdeš podrobnosti o tomto zázname.</p></div>@if (expense(); as item) { <div class="heading-actions"><a class="button button-soft" [routerLink]="['/vydavky', item.id, 'upravit']">✎ Upraviť</a><button class="button button-danger" type="button" (click)="confirmDelete.set(true)">Odstrániť</button></div> }</section>
    @if (expense(); as item) {
      <section class="card detail-card"><div class="detail-hero"><span class="detail-emoji" [style.background-color]="category(item.category).color + '22'">{{ category(item.category).icon }}</span><div><span class="detail-category">{{ category(item.category).name }}</span><strong class="detail-amount">−{{ item.amount | currency:'EUR':'symbol':'1.2-2':'sk' }}</strong></div></div><div class="detail-divider"></div><dl class="detail-list"><div><dt>Dátum nákupu</dt><dd>{{ item.date | date:'EEEE, d. MMMM yyyy':'':'sk' }}</dd></div><div><dt>Obchod alebo miesto</dt><dd>{{ item.merchant || 'Neuvedené' }}</dd></div><div><dt>Poznámka</dt><dd>{{ item.note || 'Bez poznámky' }}</dd></div><div><dt>ID záznamu</dt><dd class="id-value">{{ item.id }}</dd></div></dl></section>
      @if (confirmDelete()) { <div class="confirm-scrim"><section class="confirm-dialog" role="alertdialog" aria-labelledby="delete-title"><span class="confirm-icon">?</span><h2 id="delete-title">Odstrániť výdavok?</h2><p>„{{ item.title }}“ bude odstránený zo zoznamu. Túto akciu nemožno vrátiť späť.</p><div class="form-actions"><button class="button button-quiet" (click)="confirmDelete.set(false)">Zrušiť</button><button class="button button-danger" (click)="remove(item.id)">Áno, odstrániť</button></div></section></div> }
    } @else { <section class="card empty-state"><span>🔎</span><strong>Výdavok sa nenašiel</strong><p>Možno bol odstránený alebo adresa nie je správna.</p><a class="button button-primary" routerLink="/vydavky">Späť na výdavky</a></section> }
  `,
})
export class ExpenseDetailComponent {
  private readonly service = inject(ExpenseService);
  private readonly router = inject(Router);
  readonly id = inject(ActivatedRoute).snapshot.paramMap.get('id') ?? '';
  readonly expense = computed(() => this.service.getById(this.id));
  readonly confirmDelete = signal(false);
  category = categoryFor;
  remove(id: string): void {
    this.service.remove(id);
    void this.router.navigate(['/vydavky']);
  }
}
