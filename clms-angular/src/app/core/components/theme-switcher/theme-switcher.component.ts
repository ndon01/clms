import {Component, OnInit} from '@angular/core';
import {AppTheme, ThemeService} from "@core/services/theme/theme.service";

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.css'
})
export class ThemeSwitcherComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.getTheme() === 'dark';
  }

  onClick() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.setTheme(this.isDarkTheme ? AppTheme.Dark : AppTheme.Light);
  }


}
