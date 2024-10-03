import { effect, Injectable, OnInit, signal, WritableSignal } from '@angular/core';

export const storageKey = "theme";

export enum AppTheme {
  Dark = "dark",
  Light = "light"
}

function isValidTheme(theme: String) {
  return Object.values(AppTheme).includes(theme as AppTheme);
}

const themeUrlMap = {
  [AppTheme.Dark]: "assets/themes/lara-dark-green/theme.css",
  [AppTheme.Light]: "assets/themes/lara-light-green/theme.css"
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnInit {
  #path: string = "/assets/themes";
  #stylesheet: HTMLLinkElement | null = document.getElementById(
    "theme"
  ) as HTMLLinkElement;

  themeSignal: WritableSignal<AppTheme> = signal<AppTheme>(AppTheme.Dark);

  ngOnInit() {
    console.log("Themeservice mounted")
  }

  constructor() {
    console.log("Theme Service loaded")
    this.initializeThemeFromPreferences();
    this.updateRenderedTheme()

    effect(() => {
      this.updateRenderedTheme();
    });
  }

  setTheme(appTheme: AppTheme): void {
    this.themeSignal.set(appTheme);
  }

  getTheme(): AppTheme {
    return this.themeSignal();
  }

  private initializeThemeFromPreferences(): void {
    if (!this.#stylesheet) {
      this.initializeStylesheet();
    }

    const storedTheme = localStorage.getItem(storageKey);

    if (storedTheme && isValidTheme(storedTheme)) {
      this.themeSignal.update(() => storedTheme as AppTheme);
    }
  }

  private initializeStylesheet(): void {
    this.#stylesheet = document.createElement("link");
    this.#stylesheet.id = "theme";
    this.#stylesheet.rel = "stylesheet";

    document.head.appendChild(this.#stylesheet);
  }

  private updateRenderedTheme(): void {
    if (this.#stylesheet) {
      this.#stylesheet.href = `${themeUrlMap[this.themeSignal()]}`;
    }

    localStorage.setItem(storageKey, this.themeSignal());
  }
}
