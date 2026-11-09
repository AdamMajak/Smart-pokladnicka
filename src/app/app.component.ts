import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-shell">
      <aside class="sidebar" [class.sidebar-open]="menuOpen">
        <a class="brand" routerLink="/prehľad" (click)="menuOpen = false" aria-label="Smart pokladnička, úvodná stránka">
          <span class="brand-icon">s<span>€</span></span><span class="brand-name">smart<span>pokladnička</span></span>
        </a>
        <div class="nav-label">TVOJE FINANCIE</div>
        <nav class="main-nav" aria-label="Hlavná navigácia">
          <a routerLink="/prehľad" routerLinkActive="active" (click)="menuOpen = false"><span class="nav-glyph">◫</span> Prehľad</a>
          <a routerLink="/vydavky" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="menuOpen = false"><span class="nav-glyph">↗</span> Moje výdavky</a>
          <a routerLink="/nastavenia" routerLinkActive="active" (click)="menuOpen = false"><span class="nav-glyph">⚙</span> Nastavenia</a>
        </nav>
        <div class="sidebar-note"><span class="note-emoji">🌱</span><p>Každé euro má svoj príbeh.</p><span>Sleduj, kam smerujú tvoje peniaze.</span></div>
        <div class="sidebar-user"><span class="avatar">A</span><span><strong>Adam</strong><small>Osobný prehľad</small></span><span class="user-more">···</span></div>
      </aside>
      <div class="mobile-scrim" [class.visible]="menuOpen" (click)="menuOpen = false"></div>
      <main class="main-area">
        <header class="topbar">
          <button class="menu-toggle" type="button" (click)="menuOpen = !menuOpen" aria-label="Otvoriť navigáciu">☰</button>
          <div class="breadcrumbs"><span>Moje financie</span><span class="slash">/</span><strong>Smart pokladnička</strong></div>
          <div class="topbar-right"><span class="today">{{ today }}</span><span class="top-avatar">A</span></div>
        </header>
        <div class="demo-banner"><span class="demo-dot"></span>Ukážkový režim <span class="banner-separator">·</span> Údaje si môžeš upraviť podľa seba</div>
        <div class="page-content"><router-outlet /></div>
        <footer class="footer">Smart pokladnička <span>·</span> Maj svoje peniaze pod kontrolou.</footer>
      </main>
    </div>
  `,
})
export class AppComponent {
  menuOpen = false;
  readonly today = new Intl.DateTimeFormat('sk-SK', { weekday: 'short', day: 'numeric', month: 'long' }).format(new Date());
}
