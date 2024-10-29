package com.clms.api.assignments.api.projections.converters;

import com.clms.api.assignments.api.projections.AttemptQuestionAnswerProjection;
import com.clms.api.assignments.attempts.models.AttemptQuestionAnswer;
import com.clms.api.common.interfaces.GenericConverter;
import org.springframework.stereotype.Service;

@Service
public class AttemptQuestionAnswerProjectionConverter implements GenericConverter<AttemptQuestionAnswer, AttemptQuestionAnswerProjection> {
    @Override
    public AttemptQuestionAnswerProjection convert(AttemptQuestionAnswer from) {
        return AttemptQuestionAnswerProjection.builder()
                .questionId(from.getQuestionId())
                .selectedAnswerId(from.getSelectedAnswerId())
                .selectedAnswerCorrect(from.isSelectedAnswerCorrect())
                .build();
    }
}
