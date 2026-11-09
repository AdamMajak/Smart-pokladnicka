import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeSk from '@angular/common/locales/sk';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

registerLocaleData(localeSk);

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }))],
}).catch((error: unknown) => console.error(error));
