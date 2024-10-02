import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAssignmentPageComponent } from './course-assignment-page.component';

describe('CourseAssignmentPageComponent', () => {
  let component: CourseAssignmentPageComponent;
  let fixture: ComponentFixture<CourseAssignmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseAssignmentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseAssignmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
