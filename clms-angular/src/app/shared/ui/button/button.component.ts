import { Component, OnInit } from '@angular/core';
import {ThemeService} from "@core/services/theme/theme.service";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit{
  private themeService: ThemeService;
  constructor(themeService: ThemeService) {
    this.themeService = themeService
  }

  isDark: boolean = false;

  ngOnInit() {
    this.isDark = this.themeService.getTheme() == 'dark';
  }
}
