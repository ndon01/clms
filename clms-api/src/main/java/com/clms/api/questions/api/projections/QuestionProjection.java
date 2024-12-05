package com.clms.api.questions.api.projections;

import com.clms.api.assignments.Assignment;
import com.clms.api.assignments.AssignmentQuestionAnswer;
import com.clms.api.assignments.AssignmentQuestionAnswerConverter;
import com.clms.api.questionBank.entity.QuestionBankQuestion;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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

