import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaymakerComponent } from '@modules/playmaker/pages/playmaker/playmaker.component';

const routes: Routes = [
  { path: 'playmaker', component: PlaymakerComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PlaymakerRoutingModule { }
