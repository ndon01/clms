package com.clms.api.questionBank.api.projections.converters;

import com.clms.api.assignments.api.projections.converters.AssignmentQuestionProjectionConverter;
import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.questionBank.api.projections.QuestionBankCategoryProjection;
import com.clms.api.questionBank.api.entity.QuestionBankCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionBankCategoryProjectionConverter implements GenericConverter<QuestionBankCategory, QuestionBankCategoryProjection> {

    private final AssignmentQuestionProjectionConverter assignmentQuestionProjectionConverter;
    @Override
    public QuestionBankCategoryProjection convert(QuestionBankCategory from) {
        return QuestionBankCategoryProjection.builder()
                .id(from.getId())
                .categoryName(from.getCategoryName())
                .parentId(from.getParentId())
                .build();
    }
}