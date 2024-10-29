package com.clms.api.assignments.api.projections;

import com.clms.api.assignments.attempts.models.AssignmentAttemptStatus;
import com.clms.api.users.api.projections.UserProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
public class AssignmentAttemptProjection {
    private String id;
    private AssignmentProjection assignment;
    private UserProjection user;
    private AssignmentAttemptStatus status;
    private Date startedAt;
    private List<AttemptQuestionAnswerProjection> answers;
    private Double scorePercentage;
    private Integer answersCorrect;
}
