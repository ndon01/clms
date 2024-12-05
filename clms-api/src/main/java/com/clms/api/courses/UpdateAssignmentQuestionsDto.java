package com.clms.api.courses;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.assignments.api.entity.AssignmentQuestion;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAssignmentQuestionsDto {
    private Assignment assignment;
    private AssignmentQuestion[] questions;
}
