import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme/theme.service';
import { LoadingAmbianceService, LoadingAmbianceState } from '@core/services/loading-ambiance/loading-ambiance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  themeService: ThemeService;

  shouldShowLoading: boolean = false;

  constructor(themeService: ThemeService, public loadingAmbianceService: LoadingAmbianceService) {
    this.themeService = themeService;

    loadingAmbianceService.loadingAmbianceState$.subscribe((newState) => {
      this.shouldShowLoading = newState == LoadingAmbianceState.LOADING;
    })
  }

  changeLoading() {
    this.loadingAmbianceService.loadingAmbianceState = this.loadingAmbianceService.loadingAmbianceState == LoadingAmbianceState.NONE ? LoadingAmbianceState.LOADING : LoadingAmbianceState.NONE;
  }

  protected readonly LoadingAmbianceState = LoadingAmbianceState;
}
