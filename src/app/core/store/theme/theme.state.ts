import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';

// ACTIONS
import { ToggleTheme } from './theme.actions';

// MODELS
import { ThemesStateModel, ThemesTypes } from './theme.state.model';

// SERVICES
import { ThemeService } from '../../services/helpers/theme.service';
import { inject } from '@angular/core';

@State({
  name: 'theme',
  defaults: {
    current: 'Light',
  }
})
export class ThemeState implements NgxsOnInit {
  private themeService = inject(ThemeService);

  ngxsOnInit({ getState, patchState }: StateContext<ThemesStateModel>) {
    const initialSate = getState().current;
    this.themeService.setTheme(initialSate);
  }

  @Selector()
  static getCurrent(state: ThemesStateModel): ThemesTypes {
    return state.current;
  }

  @Action(ToggleTheme)
  toggleTheme({ getState, patchState }: StateContext<ThemesStateModel>) {
    const oldSate = getState().current;
    const newState = oldSate === 'Light' ? 'Dark' : 'Light';
    patchState({ current: newState });
    this.themeService.setTheme(newState);
  }
}
