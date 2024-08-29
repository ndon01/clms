import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme/theme.service';
import { ClientService } from './services/client/client.service';

@NgModule({
  declarations: [],
  exports: [],
  providers: [ThemeService, ClientService],
  imports: [CommonModule],
})
export class CoreModule {}
