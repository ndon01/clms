package com.clms.api.questionBank.api.projections.converters;

import com.clms.api.assignments.api.projections.converters.AssignmentQuestionProjectionConverter;
import com.clms.api.common.interfaces.GenericConverter;
import com.clms.api.questionBank.api.projections.QuestionBankQuestionProjection;
import com.clms.api.questionBank.api.entity.QuestionBankCategory;
import com.clms.api.questionBank.api.entity.QuestionBankQuestion;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuestionBankQuestionProejctionConverter implements GenericConverter<QuestionBankQuestion, QuestionBankQuestionProjection> {

    private final AssignmentQuestionProjectionConverter assignmentQuestionProjectionConverter;

    @Override
    public QuestionBankQuestionProjection convert(QuestionBankQuestion from) {
        return QuestionBankQuestionProjection.builder()
                .id(from.getId())
                .question(assignmentQuestionProjectionConverter.convert(from.getSourceQuestion()))
                .questionName(from.getQuestionName())
                .categoryIds(from.getCategories().stream().map(QuestionBankCategory::getId).collect(Collectors.toSet()))
                .build();
    }
}
