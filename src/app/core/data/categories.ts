import { Category, CategoryId } from '../models/expense.model';

export const CATEGORIES: Category[] = [
  { id: 'jedlo', name: 'Jedlo a nápoje', color: '#85c9a3' },
  { id: 'doprava', name: 'Doprava', color: '#9b9be8' },
  { id: 'nakupy', name: 'Nákupy', color: '#e8a4a0' },
  { id: 'zabava', name: 'Zábava', color: '#edbd75' },
  { id: 'byvanie', name: 'Bývanie', color: '#77b7cc' },
  { id: 'ine', name: 'Ostatné', color: '#b5bcb7' },
];

export function categoryFor(id: CategoryId): Category {
  return CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[CATEGORIES.length - 1];
}
