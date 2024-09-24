import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ThemeService } from './services/theme/theme.service';
import { ClientService } from './services/client/client.service';
import {SidebarPageWrapperComponent} from "@core/components/sidebar-page-wrapper/sidebar-page-wrapper.component";
import {RouterLink} from "@angular/router";
import {PageNotFoundComponent} from "@core/pages/page-not-found/page-not-found.component";
import {OverlayPanelModule} from "primeng/overlaypanel";

@NgModule({
  declarations: [SidebarPageWrapperComponent, PageNotFoundComponent],
  exports: [SidebarPageWrapperComponent, PageNotFoundComponent],
  providers: [ThemeService, ClientService],
  imports: [CommonModule, RouterLink, NgOptimizedImage, OverlayPanelModule],
})
export class CoreModule {}
