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
import {
  SidebarClientBlockComponent
} from "@core/components/sidebar/sidebar-client-block/sidebar-client-block.component";
import {DialogModule} from "primeng/dialog";
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [SidebarPageWrapperComponent, PageNotFoundComponent, ThemeSwitcherComponent, SidebarClientBlockComponent],
  exports: [SidebarPageWrapperComponent, PageNotFoundComponent, ThemeSwitcherComponent, SidebarClientBlockComponent],
  providers: [ThemeService, ClientService],
  imports: [CommonModule, RouterLink, NgOptimizedImage, OverlayPanelModule, MenuModule, DialogModule, FileUploadModule, FormsModule],
})
export class CoreModule {}
