package com.clms.api.questions.api.projections;

import com.clms.api.assignments.api.entity.Assignment;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class QuestionProjection {
    private Integer id;
    private String title;
    private String question;
    private Date createdAt;
    private Date updatedAt;
    private String questionType;
    private Boolean keepAnswersOrdered;
    private Integer order;
    private List<QuestionAnswerProjection> answers;
    private Assignment assignment;
}

