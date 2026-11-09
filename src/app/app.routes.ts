import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'prehľad' },
  { path: 'prehľad', loadComponent: () => import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent), title: 'Prehľad · Smart pokladnička' },
  { path: 'vydavky', loadComponent: () => import('./features/expenses/expense-list.component').then((m) => m.ExpenseListComponent), title: 'Moje výdavky · Smart pokladnička' },
  { path: 'vydavky/novy', loadComponent: () => import('./features/expenses/expense-form.component').then((m) => m.ExpenseFormComponent), title: 'Pridať výdavok · Smart pokladnička' },
  { path: 'vydavky/:id/upravit', loadComponent: () => import('./features/expenses/expense-form.component').then((m) => m.ExpenseFormComponent), title: 'Upraviť výdavok · Smart pokladnička' },
  { path: 'vydavky/:id', loadComponent: () => import('./features/expenses/expense-detail.component').then((m) => m.ExpenseDetailComponent), title: 'Detail výdavku · Smart pokladnička' },
  { path: 'nastavenia', loadComponent: () => import('./features/settings/settings.component').then((m) => m.SettingsComponent), title: 'Nastavenia · Smart pokladnička' },
  { path: '**', redirectTo: 'prehľad' },
];
