package com.clms.api.assignments.api.projections;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class AssignmentQuestionAnswerProjection {
    private UUID id;
    private Integer order;
    private String text;
    private Boolean isCorrect;

}
