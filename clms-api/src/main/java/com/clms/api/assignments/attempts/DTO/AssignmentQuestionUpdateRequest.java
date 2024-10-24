package com.clms.api.assignments.attempts.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentQuestionUpdateRequest {

        private int questionId;
        private String selectedAnswerId;
        private int assignmentId;
}
