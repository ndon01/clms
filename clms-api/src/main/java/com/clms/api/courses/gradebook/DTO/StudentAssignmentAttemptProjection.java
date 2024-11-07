package com.clms.api.courses.gradebook.DTO;

import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import com.clms.api.assignments.attempts.models.AssignmentAttemptStatus;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
@Builder
@Data
public class StudentAssignmentAttemptProjection {
    private String id;
    private AssignmentDetailsProjection assignment;//might be halucination
    private AssignmentAttemptStatus status;
    private Double scorePercentage;
    private Date submittedAt;
}
