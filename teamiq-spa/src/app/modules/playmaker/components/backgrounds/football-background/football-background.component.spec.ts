import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballBackgroundComponent } from './football-background.component';

describe('FootballBackgroundComponent', () => {
  let component: FootballBackgroundComponent;
  let fixture: ComponentFixture<FootballBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FootballBackgroundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FootballBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
