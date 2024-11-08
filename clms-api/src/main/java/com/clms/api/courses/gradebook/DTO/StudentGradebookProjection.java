package com.clms.api.courses.gradebook.DTO;

import com.clms.api.assignments.api.projections.AssignmentDetailsProjection;
import lombok.Builder;
import lombok.Data;

import java.util.List;


@Data
@Builder
public class StudentGradebookProjection {
    private List<AssignmentDetailsProjection> assignments; // Assignment name and due date
    private List<StudentAssignmentAttemptProjection> attempts; // Status and grade
}