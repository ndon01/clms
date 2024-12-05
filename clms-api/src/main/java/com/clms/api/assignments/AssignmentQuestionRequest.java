package com.clms.api.assignments;

import com.clms.api.assignments.api.entity.AssignmentQuestionAnswer;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class AssignmentQuestionRequest {
    private Integer id;
    private String question;
    private String title;
    private String questionType;
    private List<AssignmentQuestionAnswer> answers;
    private Date createdAt = new Date();
    private Date updatedAt = new Date();
    private Boolean keepAnswersOrdered;
    private Integer assignmentId;
    private Integer order;
}
