import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { categoryFor } from '../../core/data/categories';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './expense-detail.component.html',
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
