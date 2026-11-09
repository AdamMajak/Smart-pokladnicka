import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryId, ExpenseInput } from '../../core/models/expense.model';
import { CATEGORIES } from '../../core/data/categories';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './expense-form.component.html',
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
