package com.clms.api.courses;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentQuestion;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAssignmentQuestionsDto {
    private Assignment assignment;
    private AssignmentQuestion[] questions;
}
