import { Injectable, signal } from '@angular/core';
import { SAMPLE_EXPENSES } from '../data/sample-expenses';
import { Expense, ExpenseInput } from '../models/expense.model';

const STORAGE_KEY = 'smart-pokladnicka-expenses-v1';
const PLACE_EXPENSE_ID = /^place-\d+$/;
const OLD_SAMPLE_ID = /^(?:demo|seed)-\d+$/;

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

  resetExamples(): void {
    const personalExpenses = this.state().filter((expense) => !PLACE_EXPENSE_ID.test(expense.id) && !OLD_SAMPLE_ID.test(expense.id));
    this.state.set([...SAMPLE_EXPENSES, ...personalExpenses]);
    this.persist();
  }

  private load(): Expense[] {
    try {
      const stored: unknown = localStorage.getItem(STORAGE_KEY);
      if (typeof stored === 'string') {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const expenses = parsed as Expense[];
          const oldExamples = expenses.some((expense) => typeof expense?.id === 'string' && OLD_SAMPLE_ID.test(expense.id));
          if (oldExamples) {
            return [...SAMPLE_EXPENSES, ...expenses.filter((expense) => !OLD_SAMPLE_ID.test(expense.id))];
          }
          return expenses;
        }
      }
    } catch {
      
    }
    return [...SAMPLE_EXPENSES];
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    } catch {
      
    }
  }
}
