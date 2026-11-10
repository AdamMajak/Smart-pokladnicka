import { Expense } from '../models/expense.model';

const today = new Date();
const day = (offset: number, hour: number, minute: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() - offset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const SAMPLE_EXPENSES: Expense[] = [
  { id: 'place-1', title: 'Kaviareň Mlyn', amount: 5.4, category: 'jedlo', date: day(0, 8, 24), merchant: 'Kaviareň Mlyn', note: '' },
  { id: 'place-2', title: 'Dopravný podnik', amount: 24, category: 'doprava', date: day(1, 16, 12), merchant: 'Dopravný podnik', note: '' },
  { id: 'place-3', title: 'Lidl', amount: 18.72, category: 'jedlo', date: day(2, 17, 38), merchant: 'Lidl', note: '' },
  { id: 'place-4', title: 'Kino Lumière', amount: 9.5, category: 'zabava', date: day(4, 19, 5), merchant: 'Kino Lumière', note: '' },
  { id: 'place-5', title: 'Panta Rhei', amount: 7.9, category: 'nakupy', date: day(6, 13, 21), merchant: 'Panta Rhei', note: '' },
];
