package com.clms.api.questions.api.projections;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class QuestionAnswerProjection {
    private UUID id;
    private Integer order;
    private String text;
    private Boolean isCorrect;
}
