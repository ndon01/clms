package com.clms.api.courses.gradebook.DTO;

import com.clms.api.assignments.api.projections.AssignmentAttemptProjection;
import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TutorGradebookProjection{
    private List<AssignmentDetailsProjection> allAssignments;
    private List<AssignmentAttemptProjection> allAttempts;
}
