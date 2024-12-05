package com.clms.api.assignments;

import com.clms.api.assignments.api.entity.AssignmentQuestion;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AssignmentQuestionAttemptResponse {
    private List<AssignmentQuestion> questions;
    private String questionType;
    private List<AssignmentQuestionAnswerAttempt> answers;
    private int assignmentId;
}
@Getter
@Setter
class AssignmentQuestionAnswerAttempt{
    private String text;
}
