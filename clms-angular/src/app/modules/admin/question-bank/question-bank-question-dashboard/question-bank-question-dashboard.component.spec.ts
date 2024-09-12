import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankQuestionDashboardComponent } from './question-bank-question-dashboard.component';

describe('QuestionBankQuestionDashboardComponent', () => {
  let component: QuestionBankQuestionDashboardComponent;
  let fixture: ComponentFixture<QuestionBankQuestionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionBankQuestionDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionBankQuestionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
