import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryId, ExpenseInput } from '../../core/models/expense.model';
import { CATEGORIES } from '../../core/data/categories';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <section class="page-heading"><div><a routerLink="/vydavky" class="back-link">← Všetky výdavky</a><span class="eyebrow">{{ isEdit() ? 'UPRAV ZÁZNAM' : 'NOVÝ ZÁZNAM' }}</span><h1>{{ isEdit() ? 'Upraviť výdavok' : 'Pridať výdavok' }}</h1><p>{{ isEdit() ? 'Uprav podrobnosti svojho nákupu.' : 'Zaznamenaj nákup a maj prehľad, kam idú tvoje peniaze.' }}</p></div></section>
    <form class="card form-card" (ngSubmit)="save()" #expenseForm="ngForm">
      <div class="amount-entry"><label for="amount">Koľko si minul/a?</label><div class="amount-input-wrap"><span>€</span><input id="amount" name="amount" type="number" min="0.01" max="999999" step="0.01" required placeholder="0,00" [(ngModel)]="amount"><span class="amount-currency">EUR</span></div></div>
      <div class="form-divider"></div>
      <div class="form-group"><label for="title">Za čo to bolo?</label><input id="title" name="title" class="field" type="text" maxlength="70" required placeholder="napr. Nákup potravín" [(ngModel)]="title"></div>
      <div class="form-group"><span class="field-label">Kategória</span><div class="category-picker">@for (category of categories; track category.id) { <button type="button" class="category-option" [class.chosen]="selectedCategory() === category.id" (click)="selectedCategory.set(category.id)"><span>{{ category.icon }}</span>{{ category.name }}</button> }</div></div>
      <div class="form-row"><div class="form-group"><label for="date">Dátum</label><input id="date" name="date" class="field" type="date" required [(ngModel)]="date"></div><div class="form-group"><label for="merchant">Obchod alebo miesto <span class="optional">(nepovinné)</span></label><input id="merchant" name="merchant" class="field" type="text" maxlength="60" placeholder="napr. Lidl" [(ngModel)]="merchant"></div></div>
      <div class="form-group"><label for="note">Poznámka <span class="optional">(nepovinné)</span></label><textarea id="note" name="note" class="field textarea" maxlength="180" placeholder="Chceš si k výdavku niečo poznačiť?" [(ngModel)]="note"></textarea></div>
      @if (error()) { <p class="form-error" role="alert">{{ error() }}</p> }
      <div class="form-actions"><a class="button button-quiet" routerLink="/vydavky">Zrušiť</a><button class="button button-primary" type="submit" [disabled]="!expenseForm.form.valid">{{ isEdit() ? 'Uložiť zmeny' : 'Uložiť výdavok' }} <span>→</span></button></div>
    </form>
  `,
})
export class ExpenseFormComponent {
  private readonly service = inject(ExpenseService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  readonly categories = CATEGORIES;
  readonly id = this.route.snapshot.paramMap.get('id');
  readonly existing = this.id ? this.service.getById(this.id) : undefined;
  readonly isEdit = computed(() => !!this.id);
  readonly error = signal('');
  amount: number | null = this.existing?.amount ?? null;
  title = this.existing?.title ?? '';
  selectedCategory = signal<CategoryId>(this.existing?.category ?? 'jedlo');
  date = this.existing?.date.slice(0, 10) ?? new Date().toISOString().slice(0, 10);
  merchant = this.existing?.merchant ?? '';
  note = this.existing?.note ?? '';

  save(): void {
    const amount = Number(this.amount);
    if (!this.title.trim() || !Number.isFinite(amount) || amount <= 0) {
      this.error.set('Skontroluj názov a zadaj sumu vyššiu ako 0 €.');
      return;
    }
    const input: ExpenseInput = {
      title: this.title.trim(), amount: Math.round(amount * 100) / 100, category: this.selectedCategory(),
      date: new Date(`${this.date}T12:00:00`).toISOString(), merchant: this.merchant.trim(), note: this.note.trim(),
    };
    if (this.id) {
      if (!this.service.update(this.id, input)) {
        this.error.set('Tento výdavok sa už nenašiel. Vráť sa do zoznamu a skús to znova.');
        return;
      }
      void this.router.navigate(['/vydavky', this.id]);
    } else {
      const expense = this.service.add(input);
      void this.router.navigate(['/vydavky', expense.id]);
    }
  }
}
