package com.clms.api.questionBank.api.projections;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class QuestionBankCategoryProjection {
    private Integer id;
    private String categoryName;
    private Integer parentId;
}
