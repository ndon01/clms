package com.clms.api.questionBank.api.projections;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.api.projections.AssignmentQuestionProjection;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class QuestionBankQuestionProjection {
    private Integer id;
    private String questionName;
    private AssignmentQuestionProjection question;
    private Set<Integer> categoryIds;
}
