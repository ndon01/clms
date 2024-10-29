package com.clms.api.assignments.api.projections;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class AssignmentQuestionProjection {
    private Integer id;
    private String title;
    private String question;
    private Date createdAt;
    private Date updatedAt;
    private String questionType;
    private Boolean keepAnswersOrdered;
    private Integer order;
    private List<AssignmentQuestionAnswerProjection> answers;
}
