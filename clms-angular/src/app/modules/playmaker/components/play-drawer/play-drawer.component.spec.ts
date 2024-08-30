import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDrawerComponent } from './play-drawer.component';

describe('PlayDrawerComponent', () => {
  let component: PlayDrawerComponent;
  let fixture: ComponentFixture<PlayDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
