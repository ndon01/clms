import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseHomePageComponent } from './course-home-page.component';

describe('CourseHomePageComponent', () => {
  let component: CourseHomePageComponent;
  let fixture: ComponentFixture<CourseHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
