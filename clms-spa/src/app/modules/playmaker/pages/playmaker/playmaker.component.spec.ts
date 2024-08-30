import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaymakerComponent } from './playmaker.component';

describe('PlaymakerComponent', () => {
  let component: PlaymakerComponent;
  let fixture: ComponentFixture<PlaymakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaymakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaymakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
