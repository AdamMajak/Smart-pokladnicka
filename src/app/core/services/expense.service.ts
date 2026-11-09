import { Injectable, signal } from '@angular/core';
import { DEMO_EXPENSES } from '../data/demo-expenses';
import { Expense, ExpenseInput } from '../models/expense.model';

const STORAGE_KEY = 'smart-pokladnicka-expenses-v1';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private readonly state = signal<Expense[]>(this.load());
  readonly expenses = this.state.asReadonly();

  getById(id: string): Expense | undefined {
    return this.state().find((expense) => expense.id === id);
  }

  add(input: ExpenseInput): Expense {
    const expense: Expense = { ...input, id: crypto.randomUUID() };
    this.state.update((items) => [expense, ...items]);
    this.persist();
    return expense;
  }

  update(id: string, input: ExpenseInput): boolean {
    if (!this.getById(id)) return false;
    this.state.update((items) => items.map((item) => item.id === id ? { ...input, id } : item));
    this.persist();
    return true;
  }

  remove(id: string): void {
    this.state.update((items) => items.filter((item) => item.id !== id));
    this.persist();
  }

  resetDemo(): void {
    this.state.set([...DEMO_EXPENSES]);
    this.persist();
  }

  private load(): Expense[] {
    try {
      const stored: unknown = localStorage.getItem(STORAGE_KEY);
      if (typeof stored === 'string') {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed as Expense[];
      }
    } catch {
      // Private browsing or malformed storage: use the local demo dataset.
    }
    return [...DEMO_EXPENSES];
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    } catch {
      // The app remains usable for the current session if storage is unavailable.
    }
  }
}
