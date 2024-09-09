import { Injectable } from '@angular/core';
import { ThemesTypes } from '../../store/theme/theme.state.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  root: Element | null
  rootCss: CSSStyleDeclaration;

  constructor() {
    this.root = document.querySelector(':root');
    this.rootCss = document.documentElement.style;
  }

  /**
   * Sets (Light/Dark) theme
   *
   * @param theme a string of type ThemesTypes
   *
   */
  setTheme(theme: ThemesTypes): void {
    theme === 'Light' ? this.setLight() : this.setDark();
  }

  /**
   * Sets Light theme in css :root
   */
  private setLight(): void {
    this.rootCss.setProperty('--color-shadow', getComputedStyle(this.root as Element).getPropertyValue('--color-black'));
    this.rootCss.setProperty('--color-body', getComputedStyle(this.root as Element).getPropertyValue('--color-snow'));
    this.rootCss.setProperty('--color-elements', getComputedStyle(this.root as Element).getPropertyValue('--color-white'));
    this.rootCss.setProperty('--color-text', getComputedStyle(this.root as Element).getPropertyValue('--color-dark'));
  }

  /**
   * Sets Dark theme in css :root
   */
  private setDark(): void {
    this.rootCss.setProperty('--color-shadow', getComputedStyle(this.root as Element).getPropertyValue('--color-black'));
    this.rootCss.setProperty('--color-body', getComputedStyle(this.root as Element).getPropertyValue('--color-dark-smoke'));
    this.rootCss.setProperty('--color-elements', getComputedStyle(this.root as Element).getPropertyValue('--color-smoke'));
    this.rootCss.setProperty('--color-text', getComputedStyle(this.root as Element).getPropertyValue('--color-white'));
  }
}
