import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CATEGORIES, categoryFor } from '../../core/data/categories';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  template: `
    <section class="page-heading"><div><span class="eyebrow">TVOJE PENIAZE, TVOJ PREHĽAD</span><h1>Moje výdavky</h1><p>Všetky tvoje nákupy pekne pokope. Kedykoľvek môžeš niečo upraviť.</p></div><a class="button button-primary" routerLink="/vydavky/novy">＋ Pridať výdavok</a></section>
    <section class="summary-grid list-stats"><article class="card mini-stat"><span>Výdavky tento mesiac</span><strong>{{ monthTotal() | currency:'EUR':'symbol':'1.2-2':'sk' }}</strong></article><article class="card mini-stat"><span>Počet záznamov</span><strong>{{ filtered().length }} <small>výdavkov</small></strong></article><article class="card mini-stat"><span>Priemerný nákup</span><strong>{{ average() | currency:'EUR':'symbol':'1.2-2':'sk' }}</strong></article></section>
    <section class="card list-card"><div class="toolbar"><label class="search-box"><span>⌕</span><input type="search" placeholder="Hľadať výdavok…" aria-label="Hľadať výdavok" [value]="query()" (input)="query.set($any($event.target).value)"></label><select class="select-field" aria-label="Filtrovať podľa kategórie" [value]="filter()" (change)="filter.set($any($event.target).value)"><option value="all">Všetky kategórie</option>@for (category of categories; track category.id) { <option [value]="category.id">{{ category.icon }} {{ category.name }}</option> }</select><span class="result-count">{{ filtered().length }} záznamov</span></div>
      <div class="expense-table"><div class="table-header"><span>POLOŽKA</span><span>KATEGÓRIA</span><span>DÁTUM</span><span>SUMA</span></div>
        @for (expense of filtered(); track expense.id) {
          <a class="expense-row" [routerLink]="['/vydavky', expense.id]"><span class="item-cell"><i class="item-emoji" [style.background-color]="category(expense.category).color + '22'">{{ category(expense.category).icon }}</i><span><strong>{{ expense.title }}</strong><small>{{ expense.merchant || 'Bez obchodníka' }}</small></span></span><span class="category-cell">{{ category(expense.category).name }}</span><span class="date-cell">{{ expense.date | date:'d. MMM yyyy':'':'sk' }}</span><strong class="amount-cell">−{{ expense.amount | currency:'EUR':'symbol':'1.2-2':'sk' }}</strong></a>
        } @empty { <div class="empty-state"><span>🧾</span><strong>Nenašli sa žiadne výdavky</strong><p>Skús zmeniť filter alebo pridaj nový nákup.</p><a class="button button-soft" routerLink="/vydavky/novy">Pridať výdavok</a></div> }
      </div>
    </section>
  `,
})
export class ExpenseListComponent {
  private readonly service = inject(ExpenseService);
  readonly categories = CATEGORIES;
  readonly query = signal('');
  readonly filter = signal('all');
  readonly filtered = computed(() => this.service.expenses().filter((item) => {
    const text = `${item.title} ${item.merchant} ${item.note}`.toLocaleLowerCase('sk');
    return text.includes(this.query().trim().toLocaleLowerCase('sk')) && (this.filter() === 'all' || item.category === this.filter());
  }).sort((a, b) => b.date.localeCompare(a.date)));
  readonly monthTotal = computed(() => this.filtered().filter((item) => new Date(item.date).getMonth() === new Date().getMonth()).reduce((sum, item) => sum + item.amount, 0));
  readonly average = computed(() => this.filtered().length ? this.filtered().reduce((sum, item) => sum + item.amount, 0) / this.filtered().length : 0);
  category = categoryFor;
}
