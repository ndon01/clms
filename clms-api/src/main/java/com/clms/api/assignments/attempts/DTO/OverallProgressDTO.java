package com.clms.api.assignments.attempts.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OverallProgressDTO {
    Double overallPercentage;
    Double overallStudyTimeHours;
    Integer totalAssignmentsCompleted;
    Integer totalAssignments;
}
