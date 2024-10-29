package com.clms.api.assignments.api.projections.converters;

import com.clms.api.assignments.AssignmentQuestion;
import com.clms.api.assignments.AssignmentQuestionAnswer;
import com.clms.api.assignments.AssignmentQuestionAnswerConverter;
import com.clms.api.assignments.api.projections.AssignmentQuestionAnswerProjection;
import com.clms.api.assignments.api.projections.AssignmentQuestionProjection;
import com.clms.api.common.interfaces.GenericConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssignmentQuestionProjectionConverter implements GenericConverter<AssignmentQuestion, AssignmentQuestionProjection> {

    private final GenericConverter<AssignmentQuestionAnswer, AssignmentQuestionAnswerProjection> assignmentQuestionAnswerConverter;


    @Override
    public AssignmentQuestionProjection convert(AssignmentQuestion from) {
        return AssignmentQuestionProjection.builder()
                .question(from.getQuestion())
                .title(from.getTitle())
                .createdAt(from.getCreatedAt())
                .updatedAt(from.getUpdatedAt())
                .questionType(from.getQuestionType())
                .keepAnswersOrdered(from.getKeepAnswersOrdered())
                .order(from.getOrder())
                .id(from.getId())
                .answers(from.getAnswers().stream().map(assignmentQuestionAnswerConverter::convert).toList())
                .build();
    }
}
