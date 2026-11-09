import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { categoryFor, CATEGORIES } from '../../core/data/categories';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly service = inject(ExpenseService);
  readonly expenses = this.service.expenses;
  readonly thisMonth = new Date().getMonth();
  readonly thisYear = new Date().getFullYear();
  readonly monthExpenses = computed(() => this.expenses().filter((item) => {
    const date = new Date(item.date);
    return date.getMonth() === this.thisMonth && date.getFullYear() === this.thisYear;
  }));
  readonly monthTotal = computed(() => this.monthExpenses().reduce((sum, item) => sum + item.amount, 0));
  readonly monthCount = computed(() => this.monthExpenses().length);
  readonly weekTotal = computed(() => this.expenses().filter((item) => Date.now() - new Date(item.date).getTime() < 7 * 86400000).reduce((sum, item) => sum + item.amount, 0));
  readonly balance = computed(() => Math.max(0, 500 - this.monthTotal()));
  readonly recent = computed(() => [...this.expenses()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4));
  readonly weekBars = computed(() => {
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const amount = this.expenses().filter((item) => new Date(item.date).toDateString() === date.toDateString()).reduce((sum, item) => sum + item.amount, 0);
      return { label: new Intl.DateTimeFormat('sk-SK', { weekday: 'short' }).format(date).replace('.', ''), amount };
    });
    const max = Math.max(1, ...days.map((day) => day.amount));
    return days.map((day) => ({ ...day, percent: Math.max(day.amount ? 12 : 4, (day.amount / max) * 100) }));
  });
  readonly topCategories = computed(() => {
    const totals = new Map(CATEGORIES.map((category) => [category.id, this.monthExpenses().filter((item) => item.category === category.id).reduce((sum, item) => sum + item.amount, 0)]));
    const max = Math.max(1, ...totals.values());
    return CATEGORIES.map((category) => ({ ...category, amount: totals.get(category.id) ?? 0, percent: (totals.get(category.id) ?? 0) / max * 100 }))
      .filter((category) => category.amount > 0).sort((a, b) => b.amount - a.amount).slice(0, 4);
  });

  category = categoryFor;
}
