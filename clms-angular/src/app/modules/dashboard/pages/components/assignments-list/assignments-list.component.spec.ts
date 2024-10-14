import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsListComponent } from './assignments-list.component';

describe('AssignmentsListComponent', () => {
  let component: AssignmentsListComponent;
  let fixture: ComponentFixture<AssignmentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
