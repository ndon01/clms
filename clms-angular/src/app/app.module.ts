import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ThemeService } from './core/services/theme/theme.service';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DialogService} from "primeng/dynamicdialog";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ClientService} from "@core/services/client/client.service";
import {SharedModule} from "@shared/shared.module";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {QuillModule} from "ngx-quill";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, ReactiveFormsModule, DialogModule, BrowserAnimationsModule, SharedModule, ToastModule, QuillModule.forRoot()],
  providers: [ThemeService, provideHttpClient(), DialogService, MessageService, ClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
