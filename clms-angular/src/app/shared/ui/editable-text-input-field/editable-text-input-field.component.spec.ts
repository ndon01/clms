import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTextInputFieldComponent } from './editable-text-input-field.component';

describe('EditableTextInputFieldComponent', () => {
  let component: EditableTextInputFieldComponent;
  let fixture: ComponentFixture<EditableTextInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableTextInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTextInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
