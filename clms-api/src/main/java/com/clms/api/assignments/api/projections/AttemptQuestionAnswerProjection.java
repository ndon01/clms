package com.clms.api.assignments.api.projections;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AttemptQuestionAnswerProjection {
    private int questionId;
    private String selectedAnswerId;
    private boolean selectedAnswerCorrect;
}
