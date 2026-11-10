export type CategoryId = 'jedlo' | 'doprava' | 'nakupy' | 'zabava' | 'byvanie' | 'ine';

export interface Category {
  id: CategoryId;
  name: string;
  color: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: CategoryId;
  date: string;
  note: string;
  merchant: string;
}

export type ExpenseInput = Omit<Expense, 'id'>;
