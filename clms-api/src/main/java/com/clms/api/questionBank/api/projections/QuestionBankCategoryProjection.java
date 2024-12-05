package com.clms.api.questionBank.api.projections;

import com.clms.api.assignments.api.projections.AssignmentQuestionProjection;
import com.clms.api.questionBank.entity.QuestionBankQuestion;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
public class QuestionBankCategoryProjection {
    private Integer id;
    private String categoryName;
    private Integer parentId;
}
