import { Expense } from '../models/expense.model';

const today = new Date();
const day = (offset: number, hour: number, minute: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() - offset);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString();
};

export const DEMO_EXPENSES: Expense[] = [
  { id: 'demo-1', title: 'Káva a croissant', amount: 5.4, category: 'jedlo', date: day(0, 8, 24), merchant: 'Kaviareň Mlyn', note: 'Cestou do školy' },
  { id: 'demo-2', title: 'Mesačník na autobus', amount: 24, category: 'doprava', date: day(1, 16, 12), merchant: 'Dopravný podnik', note: '' },
  { id: 'demo-3', title: 'Nákup potravín', amount: 18.72, category: 'jedlo', date: day(2, 17, 38), merchant: 'Lidl', note: 'Ovocie, pečivo a mlieko' },
  { id: 'demo-4', title: 'Vstup do kina', amount: 9.5, category: 'zabava', date: day(4, 19, 5), merchant: 'Kino Lumière', note: 'Piatkový večer' },
  { id: 'demo-5', title: 'Nový zápisník', amount: 7.9, category: 'nakupy', date: day(6, 13, 21), merchant: 'Panta Rhei', note: '' },
  { id: 'demo-6', title: 'Obedové menu', amount: 8.6, category: 'jedlo', date: day(8, 12, 10), merchant: 'Bistro Záhrada', note: '' },
  { id: 'demo-7', title: 'Lístok na vlak', amount: 6.2, category: 'doprava', date: day(10, 9, 42), merchant: 'ZSSK', note: 'Cesta za rodinou' },
  { id: 'demo-8', title: 'Tričko', amount: 19.9, category: 'nakupy', date: day(12, 15, 3), merchant: 'Reserved', note: '' },
  { id: 'demo-9', title: 'Pizza s kamarátmi', amount: 13.5, category: 'jedlo', date: day(15, 20, 16), merchant: 'Pizzeria Roma', note: '' },
  { id: 'demo-10', title: 'Streamovacia služba', amount: 7.99, category: 'zabava', date: day(18, 7, 0), merchant: 'Predplatné', note: 'Mesačná platba' },
  { id: 'demo-11', title: 'Čistiace potreby', amount: 11.35, category: 'byvanie', date: day(22, 11, 48), merchant: 'dm drogerie', note: '' },
];
