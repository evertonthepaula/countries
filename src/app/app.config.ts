import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';

import { routes } from './app.routes';
import { ThemeState } from './core/store/theme/theme.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideHttpClient(),
    provideStore(
      [ThemeState],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsStoragePlugin({
        keys: '*'
      })
    ),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideRouter(routes, withViewTransitions()),
  ]
};
