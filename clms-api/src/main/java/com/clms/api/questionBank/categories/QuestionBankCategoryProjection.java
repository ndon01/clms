package com.clms.api.questionBank.categories;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class QuestionBankCategoryProjection {
    private int id;
    private String categoryName;
    private Integer parentId;
}
