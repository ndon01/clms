import { Component } from '@angular/core';
import { AppTheme, ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  private themeService: ThemeService;
  constructor(themeService: ThemeService) {
    this.themeService = themeService;
  }


  toggleTheme() {
    this.themeService.setTheme(this.themeService.getTheme() == AppTheme.Dark ? AppTheme.Light : AppTheme.Dark)
  }
}
