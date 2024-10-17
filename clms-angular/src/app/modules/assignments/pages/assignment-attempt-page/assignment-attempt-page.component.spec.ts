import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentAttemptPageComponent } from './assignment-attempt-page.component';

describe('AssignmentAttemptPageComponent', () => {
  let component: AssignmentAttemptPageComponent;
  let fixture: ComponentFixture<AssignmentAttemptPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentAttemptPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentAttemptPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
