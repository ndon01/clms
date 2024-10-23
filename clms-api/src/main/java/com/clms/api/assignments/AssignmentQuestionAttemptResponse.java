package com.clms.api.assignments;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.aspectj.weaver.patterns.TypePatternQuestions;

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
