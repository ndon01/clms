import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDashboardPageComponent } from './courses-dashboard-page.component';

describe('CoursesDashboardPageComponent', () => {
  let component: CoursesDashboardPageComponent;
  let fixture: ComponentFixture<CoursesDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
