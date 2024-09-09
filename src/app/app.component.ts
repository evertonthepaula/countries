import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContentComponent } from './shared/templates/main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainContentComponent
  ],
  template: '<app-main-content><router-outlet></router-outlet></app-main-content>'
})
export class AppComponent { }
