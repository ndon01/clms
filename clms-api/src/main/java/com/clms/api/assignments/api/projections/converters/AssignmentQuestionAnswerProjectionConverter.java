package com.clms.api.assignments.api.projections.converters;

import com.clms.api.assignments.AssignmentQuestionAnswer;
import com.clms.api.assignments.api.projections.AssignmentQuestionAnswerProjection;
import com.clms.api.common.interfaces.GenericConverter;
import org.springframework.stereotype.Service;

@Service
public class AssignmentQuestionAnswerProjectionConverter implements GenericConverter<AssignmentQuestionAnswer, AssignmentQuestionAnswerProjection> {
    @Override
    public AssignmentQuestionAnswerProjection convert(AssignmentQuestionAnswer from) {
        return AssignmentQuestionAnswerProjection.builder()
                .id(from.getId())
                .order(from.getOrder())
                .text(from.getText())
                .build();
    }
}
