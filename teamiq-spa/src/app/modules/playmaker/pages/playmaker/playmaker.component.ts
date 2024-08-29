import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playmaker',
  templateUrl: './playmaker.component.html',
  standalone: true,
  styleUrls: ['./playmaker.component.css']
})
export class PlaymakerComponent implements OnInit {
  startYard: number = 0; // example starting yard
  endYard: number = 120; // example ending yard

  clipPath: string = '';
  transform: string = '';
  height: string = '';

  ngOnInit() {
    this.updateFieldView();
  }

  updateFieldView() {
    const totalYards = 120; // Total length of the field in yards (0-120)
    const startPercentage = (this.startYard / totalYards) * 100;
    const endPercentage = (this.endYard / totalYards) * 100;

    this.clipPath = `inset(${startPercentage}% 0% ${100 - endPercentage}% 0%)`;
    this.height = `${endPercentage - startPercentage}%`;
    this.transform = `translateY(-${startPercentage}%)`;
  }
}
