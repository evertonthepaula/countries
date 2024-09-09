import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../../core/store/theme/theme.state';
import { ThemesTypes } from '../../../core/store/theme/theme.state.model';
import { ToggleTheme } from '../../../core/store/theme/theme.actions';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  imports: [
    RouterModule,
    FontAwesomeModule,
    AsyncPipe
  ]
})
export class NavBarComponent {
  themeState$!: Observable<ThemesTypes>;

  faMoon: IconProp = faMoon;
  faSun: IconProp = faSun;

  constructor(
    private readonly store: Store
  ) {
    this.themeState$ = this.store.select(ThemeState.getCurrent);
  }

  toogleTheme() {
    this.store.dispatch(new ToggleTheme());
  }
}
