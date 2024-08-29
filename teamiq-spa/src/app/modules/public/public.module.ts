import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';



@NgModule({
  declarations: [LandingPageComponent],
  exports: [LandingPageComponent],
  imports: [
    CommonModule, PublicRoutingModule, NavbarComponent
  ]
})
export class PublicModule { }
