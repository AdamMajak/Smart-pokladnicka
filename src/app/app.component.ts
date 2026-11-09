import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  menuOpen = false;
  readonly today = new Intl.DateTimeFormat('sk-SK', { weekday: 'short', day: 'numeric', month: 'long' }).format(new Date());
}
