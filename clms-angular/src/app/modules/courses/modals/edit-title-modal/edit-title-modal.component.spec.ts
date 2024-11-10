import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTitleModalComponent } from './edit-title-modal.component';

describe('EditTitleModalComponent', () => {
  let component: EditTitleModalComponent;
  let fixture: ComponentFixture<EditTitleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTitleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTitleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
