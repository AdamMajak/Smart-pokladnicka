import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CATEGORIES, categoryFor } from '../../core/data/categories';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './expense-list.component.html',
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
