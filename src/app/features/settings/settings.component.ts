import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  private readonly service = inject(ExpenseService);
  readonly ask = signal(false);
  readonly done = signal(false);
  reset(): void {
    this.service.resetExamples();
    this.ask.set(false);
    this.done.set(true);
  }
}
