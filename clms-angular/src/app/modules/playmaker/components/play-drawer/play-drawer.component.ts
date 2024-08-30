import { Component, Input } from '@angular/core';
import { Play } from '@modules/playmaker/domain/PlayProjection';
import {
  FootballBackgroundComponent
} from '@modules/playmaker/components/backgrounds/football-background/football-background.component';

@Component({
  selector: 'tiq-play-drawer',
  imports: [
    FootballBackgroundComponent
  ],
  templateUrl: './play-drawer.component.html',
  standalone: true,
  styleUrl: './play-drawer.component.css'
})
export class PlayDrawerComponent {
  @Input() play: Play | undefined | null;

  protected isNullish(isThis: any) {
    return isThis === undefined || isThis === null;
  }
}
