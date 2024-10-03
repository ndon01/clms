import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ThemeService } from './services/theme/theme.service';
import { ClientService } from './services/client/client.service';
import {SidebarPageWrapperComponent} from "@core/components/sidebar-page-wrapper/sidebar-page-wrapper.component";
import {RouterLink} from "@angular/router";
import {PageNotFoundComponent} from "@core/pages/page-not-found/page-not-found.component";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {ThemeSwitcherComponent} from "@core/components/theme-switcher/theme-switcher.component";
import {MenuModule} from "primeng/menu";

@NgModule({
  declarations: [SidebarPageWrapperComponent, PageNotFoundComponent, ThemeSwitcherComponent],
  exports: [SidebarPageWrapperComponent, PageNotFoundComponent, ThemeSwitcherComponent],
  providers: [ThemeService, ClientService],
    imports: [CommonModule, RouterLink, NgOptimizedImage, OverlayPanelModule, MenuModule],
})
export class CoreModule {}
